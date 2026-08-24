/**
 * Vercel Serverless Function — GET /api/callback
 *
 * Step 2 of GitHub OAuth for Sveltia CMS. Exchanges the code for an
 * access token and posts it back to the /admin window.
 */
export default async function handler(req, res) {
  if (!process.env.OAUTH_GITHUB_CLIENT_ID || !process.env.OAUTH_GITHUB_CLIENT_SECRET) {
    return res.status(500).send("OAuth is not configured.");
  }

  const code = (req.query.code || "").toString();
  const state = (req.query.state || "").toString();
  const cookieHeader = req.headers.cookie || "";
  const cookies = Object.fromEntries(
    cookieHeader.split(/;\s*/).map((c) => {
      const i = c.indexOf("=");
      return i === -1 ? [c, ""] : [c.slice(0, i), c.slice(i + 1)];
    })
  );

  if (!code || !state || cookies.oauth_state !== state) {
    return res.status(400).send("Invalid OAuth state.");
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.OAUTH_GITHUB_CLIENT_ID,
      client_secret: process.env.OAUTH_GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const data = await tokenRes.json().catch(() => ({}));

  if (!tokenRes.ok || !data.access_token) {
    return res.status(500).send(`OAuth exchange failed: ${JSON.stringify(data)}`);
  }

  const payload = JSON.stringify({
    token: data.access_token,
    provider: "github",
  });

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
        window.opener && window.opener.postMessage('authorizing:github', '*');
      })();
    </script>
  </body>
</html>`;

  res.setHeader("Set-Cookie", "oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0");
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  return res.status(200).send(html);
}
