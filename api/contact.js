/**
 * Vercel Serverless Function — POST /api/contact
 * Emails a lead to contact@perfectlightchicago.com via Resend.
 *
 * Env vars: RESEND_API_KEY (required)
 */

const escapeHtml = (s) =>
  String(s || "").replace(/[<>&"']/g, (c) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, phone, message } = req.body || {};

    if (!name || !email || !phone) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY missing — skipping email send.");
      return res.status(200).json({ success: true, note: "Email service not configured on this environment." });
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
        authorization: `Bearer ${process.env.RESEND_API_KEY}`,
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
      return res.status(500).json({ error: "Failed to send email. Please try again later." });
    }

    return res.status(200).json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Contact form error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
