/**
 * Vercel Serverless Function — GET /api/oauth
 *
 * Step 1 of GitHub OAuth for Sveltia CMS. Redirects to GitHub.
 * Env: OAUTH_GITHUB_CLIENT_ID, OAUTH_GITHUB_CLIENT_SECRET
 */
import crypto from "node:crypto";

export default async function handler(req, res) {
  if (!process.env.OAUTH_GITHUB_CLIENT_ID) {
    return res
      .status(500)
      .send("OAuth not configured. Set OAUTH_GITHUB_CLIENT_ID and OAUTH_GITHUB_CLIENT_SECRET in Vercel env vars. See docs/CMS-SETUP.md.");
  }

  const scope = (req.query.scope || "repo,user").toString();
  const state = crypto.randomUUID();

  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const proto = (req.headers["x-forwarded-proto"] || "https").toString();
  const redirectUri = `${proto}://${host}/api/callback`;

  const params = new URLSearchParams({
    client_id: process.env.OAUTH_GITHUB_CLIENT_ID,
    redirect_uri: redirectUri,
    scope,
    state,
  });

  res.setHeader(
    "Set-Cookie",
    `oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`
  );
  res.redirect(302, `https://github.com/login/oauth/authorize?${params.toString()}`);
}
