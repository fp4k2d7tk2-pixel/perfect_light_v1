# Perfect Light Chicago — CMS setup (one-time)

This branch (`redesign-preview`) ships a static site with a lightweight admin at
`/admin` powered by [Sveltia CMS](https://github.com/sveltia/sveltia-cms).
Sveltia is a modern, free, drop-in replacement for Decap/Netlify CMS.

## What the CMS lets Cosimo do today

- **Projects** — add a new project entry with a photo, room, neighborhood,
  and a short caption. Publish/unpublish. Reorder.

More editable fields (home hero, about, service copy, FAQ) can be added later —
this first pass ships the highest-value area (project photos) so Cosimo can
see the redesign and start using it immediately.

---

## One-time setup — do this BEFORE Cosimo signs in

### 1. Register a GitHub OAuth App

Go to **github.com → Settings → Developer settings → OAuth Apps → New OAuth App**.

- **Application name:** `Perfect Light Chicago CMS`
- **Homepage URL:** `https://www.perfectlightchicago.com`
- **Authorization callback URL:** `https://www.perfectlightchicago.com/callback`
  - Add a second callback for the preview URL too, if you have Cosimo test
    from the preview branch: `https://redesign-preview.perfect-light-v1.pages.dev/callback`

Click **Register application**. You'll get a **Client ID**. Then click
**Generate a new client secret** and copy the secret immediately.

### 2. Add secrets to Cloudflare Pages

In the Cloudflare dashboard → **Pages → `perfect-light-v1` (or your project name)
→ Settings → Environment variables**, add these two variables for BOTH
Production and Preview environments:

| Name                          | Value                            |
| ----------------------------- | -------------------------------- |
| `OAUTH_GITHUB_CLIENT_ID`      | (Client ID from step 1)          |
| `OAUTH_GITHUB_CLIENT_SECRET`  | (Client Secret from step 1) — mark as encrypted |

`RESEND_API_KEY` should already be set (the contact form uses it).

### 3. Redeploy

Trigger a redeploy from the Cloudflare dashboard so the new env vars take effect.

### 4. Have Cosimo sign in

Send Cosimo the admin URL: `https://www.perfectlightchicago.com/admin/` (or the
preview URL: `https://redesign-preview.perfect-light-v1.pages.dev/admin/`).

He clicks **Sign in with GitHub**, authorizes the OAuth app, and lands in the
CMS. Everything he saves commits directly to the `main` branch (or whichever
branch we point him at in `admin/config.yml`).

---

## How it works under the hood

- `admin/index.html` loads the Sveltia CMS JavaScript bundle from a CDN
- `admin/config.yml` describes the collections/fields Cosimo can edit
- `functions/oauth.js` redirects Cosimo to GitHub with our OAuth Client ID
- GitHub bounces him back to `functions/callback.js` with a temporary code
- `callback.js` exchanges the code for a GitHub access token, then passes it
  back to the Sveltia window using its expected `postMessage` format
- Sveltia then uses that token to commit files to the repo on his behalf

The client secret never leaves the Cloudflare Pages function — it's not
embedded in the client-side JavaScript.

---

## Adding more editable areas later

Each new editable area needs three things:

1. A source-of-truth content file (JSON or Markdown) in `content/`
2. A collection entry in `admin/config.yml` describing the fields
3. Either a build-time inject (edit `scripts/build.mjs`) or a runtime fetch
   (like `site/js/projects.js`) to display the content on the page

Ping Joe and he'll add the next area you want editable.
