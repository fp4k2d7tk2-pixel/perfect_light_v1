# Perfect Light Chicago — CMS setup (one-time)

The redesign preview ships a static site with a lightweight admin at `/admin`
powered by [Sveltia CMS](https://github.com/sveltia/sveltia-cms) — a modern,
free, drop-in replacement for Decap/Netlify CMS.

## What Cosimo can edit today

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
- **Authorization callback URL:** `https://www.perfectlightchicago.com/api/callback`
  - If Cosimo will test from the preview URL first, register a second OAuth App
    for the preview host with callback `https://<preview-host>/api/callback`
    (or add both to the same app if GitHub allows it in your account).

Click **Register application**. You'll get a **Client ID**. Then click
**Generate a new client secret** and copy the secret immediately.

### 2. Add secrets to Vercel

In the Vercel dashboard → your project → **Settings → Environment Variables**,
add these two variables (both Preview and Production):

| Name                          | Value                                    |
| ----------------------------- | ---------------------------------------- |
| `OAUTH_GITHUB_CLIENT_ID`      | (Client ID from step 1)                  |
| `OAUTH_GITHUB_CLIENT_SECRET`  | (Client Secret from step 1) — encrypted  |

`RESEND_API_KEY` should already be set (the contact form uses it).

### 3. Redeploy

Trigger a redeploy in Vercel so the new env vars take effect.

### 4. Have Cosimo sign in

Send him the admin URL: `https://www.perfectlightchicago.com/admin/`

He clicks **Sign in with GitHub**, authorizes the OAuth app, and lands in the
CMS. Everything he saves commits directly to `main` (or whichever branch
`admin/config.yml` points at).

---

## How it works under the hood

- `public/admin/index.html` loads the Sveltia CMS bundle from a CDN
- `public/admin/config.yml` describes the collections/fields Cosimo can edit
- `api/oauth.js` (Vercel Serverless Function) redirects him to GitHub with our OAuth Client ID
- GitHub bounces him back to `api/callback.js` with a temporary code
- `callback.js` exchanges the code for a GitHub access token and posts it back
  to the Sveltia window using its expected `postMessage` format
- Sveltia then uses that token to commit files to the repo on his behalf

The client secret never leaves the Vercel function — it's not embedded in the
client-side JavaScript.

---

## Adding more editable areas later

Each new editable area needs three things:

1. A source-of-truth content file (JSON or Markdown) in `content/`
2. A collection entry in `public/admin/config.yml` describing the fields
3. Either a build-time inject (edit `scripts/build.mjs`) or a runtime fetch
   (like `public/js/projects.js`) to display the content on the page

Ping Joe and he'll add the next area you want editable.
