/**
 * Cloudflare Pages Function — GET /callback
 *
 * Step 2 of the GitHub OAuth flow for Sveltia CMS.
 * GitHub redirects the browser here with `?code=<temp>&state=<state>`.
 * We exchange the code for an access token, then post it back to the
 * opener window (the CMS admin at /admin) using the message format
 * Sveltia expects.
 */

export async function onRequestGet({ request, env }) {
  if (!env.OAUTH_GITHUB_CLIENT_ID || !env.OAUTH_GITHUB_CLIENT_SECRET) {
    return new Response("OAuth is not configured.", {
      status: 500,
      headers: { "content-type": "text/plain" },
    });
  }

  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const cookies = Object.fromEntries(
    (request.headers.get("cookie") || "").split(/;\s*/).map((c) => {
      const i = c.indexOf("=");
      return i === -1 ? [c, ""] : [c.slice(0, i), c.slice(i + 1)];
    })
  );

  if (!code || !state || cookies.oauth_state !== state) {
    return new Response("Invalid OAuth state.", {
      status: 400,
      headers: { "content-type": "text/plain" },
    });
  }

  // Exchange code for access token
  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      client_id: env.OAUTH_GITHUB_CLIENT_ID,
      client_secret: env.OAUTH_GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const data = await tokenRes.json().catch(() => ({}));

  if (!tokenRes.ok || !data.access_token) {
    return new Response(
      `OAuth exchange failed: ${JSON.stringify(data)}`,
      { status: 500, headers: { "content-type": "text/plain" } }
    );
  }

  const payload = JSON.stringify({
    token: data.access_token,
    provider: "github",
  });

  // Return an HTML page that posts the token to the CMS window.
  const html = `<!doctype html>
<html>
  <head><meta charset="utf-8" /><title>Signing in…</title></head>
  <body>
    <p style="font-family:system-ui;padding:2rem;color:#525252;">
      Signing in… If this window doesn't close automatically, you can close it.
    </p>
    <script>
      (function () {
        function receiveMessage(e) {
          window.opener.postMessage(
            'authorization:github:success:${payload.replace(/'/g, "\\'")}',
            e.origin
          );
          window.removeEventListener('message', receiveMessage, false);
        }
        window.addEventListener('message', receiveMessage, false);
        // Handshake — tell the opener we're ready.
        window.opener && window.opener.postMessage('authorizing:github', '*');
      })();
    </script>
  </body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "Set-Cookie": "oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0",
    },
  });
}
