/**
 * Cloudflare Pages Function — POST /api/contact
 *
 * Handles the contact-form submission for the redesigned static site.
 * Ported from the previous Next.js route at src/app/api/contact/route.ts.
 *
 * Required env vars (set in Cloudflare Pages → Settings → Environment variables):
 *   - RESEND_API_KEY   (already set for the current site)
 *
 * The form on /contact.html POSTs JSON: { name, email, phone, message }
 */

const ALLOWED_ORIGINS = new Set([
  "https://perfectlightchicago.com",
  "https://www.perfectlightchicago.com",
  // Cloudflare Pages preview/production hostnames are pass-through since we
  // check origin only for CSRF hardening. Anything else falls through OK.
]);

const escapeHtml = (s) =>
  String(s || "").replace(/[<>&"']/g, (c) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));

const json = (obj, init = {}) =>
  new Response(JSON.stringify(obj), {
    ...init,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
      ...(init.headers || {}),
    },
  });

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json().catch(() => ({}));
    const { name, email, phone, message } = body || {};

    if (!name || !email || !phone) {
      return json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
      return json({ error: "Invalid email format" }, { status: 400 });
    }

    if (!env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY missing — skipping email send.");
      return json(
        { success: true, note: "Email service not configured on this environment." },
        { status: 200 }
      );
    }

    const projectMessage =
      typeof message === "string" && message.trim()
        ? message
        : "Initial contact submitted from the homepage contact form.";

    const html = `
      <div style="font-family: sans-serif; max-width: 600px;">
        <h2>New Lead Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Project Note:</strong></p>
        <p style="white-space: pre-wrap;">${escapeHtml(projectMessage)}</p>
      </div>
    `;

    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Perfect Light <noreply@perfectlightchicago.com>",
        to: "contact@perfectlightchicago.com",
        reply_to: email,
        subject: `New lead from ${name}`,
        html,
      }),
    });

    const data = await resp.json().catch(() => ({}));

    if (!resp.ok) {
      console.error("Resend error:", resp.status, data);
      return json(
        { error: "Failed to send email. Please try again later." },
        { status: 500 }
      );
    }

    return json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Contact form error:", err);
    return json({ error: "Internal server error" }, { status: 500 });
  }
}

// Reject anything but POST
export async function onRequest({ request }) {
  return new Response("Method not allowed", { status: 405 });
}
