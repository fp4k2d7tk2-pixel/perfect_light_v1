/**
 * Cloudflare Pages Function — GET /oauth
 *
 * Step 1 of the GitHub OAuth flow for Sveltia CMS.
 * Redirects the browser to GitHub with the CMS's requested scope,
 * so GitHub can prompt the user to authorize and then bounce back
 * to /callback with a temporary `code`.
 *
 * Required env vars (Cloudflare Pages → Settings → Environment variables):
 *   - OAUTH_GITHUB_CLIENT_ID     (public — from your GitHub OAuth App)
 *   - OAUTH_GITHUB_CLIENT_SECRET (secret — from your GitHub OAuth App)
 *
 * See docs/CMS-SETUP.md for the one-time GitHub OAuth App creation.
 */

export async function onRequestGet({ request, env }) {
  if (!env.OAUTH_GITHUB_CLIENT_ID) {
    return new Response(
      "OAuth is not configured. Set OAUTH_GITHUB_CLIENT_ID and OAUTH_GITHUB_CLIENT_SECRET in Cloudflare Pages env vars. See docs/CMS-SETUP.md.",
      { status: 500, headers: { "content-type": "text/plain" } }
    );
  }

  const url = new URL(request.url);
  const scope = url.searchParams.get("scope") || "repo,user";
  const state = crypto.randomUUID();

  const redirectUri = `${url.origin}/callback`;

  const params = new URLSearchParams({
    client_id: env.OAUTH_GITHUB_CLIENT_ID,
    redirect_uri: redirectUri,
    scope,
    state,
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: `https://github.com/login/oauth/authorize?${params.toString()}`,
      // Store state in a cookie so /callback can verify it
      "Set-Cookie": `oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
    },
  });
}
