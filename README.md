# Perfect Light Chicago — redesign preview branch

**This is a preview branch. It does not affect the live site until merged.**

- Live site (built from `main`): https://www.perfectlightchicago.com
- Preview site (built from this branch): auto-generated Cloudflare Pages preview URL

## What's on this branch

A full 22-page static redesign of the site, plus:

- A lightweight admin at `/admin/` (Sveltia CMS) for adding project photos
- A Cloudflare Pages Function at `/api/contact` that emails leads via Resend
- A minimal Node build script that gathers CMS content into the static site

## Structure

```
perfect_light_v1/
├─ site/                     # The static site — every URL served from here
│  ├─ index.html
│  ├─ contact.html
│  ├─ projects.html
│  ├─ lighting/…
│  ├─ neighborhoods/…
│  ├─ css/styles.css
│  ├─ js/projects.js         # Renders /content/projects.json into the page
│  └─ js/script.js
├─ admin/                    # Sveltia CMS admin (served at /admin/)
│  ├─ index.html
│  └─ config.yml
├─ content/                  # Source-of-truth content edited via the CMS
│  └─ projects/*.md
├─ functions/                # Cloudflare Pages Functions (runtime endpoints)
│  ├─ api/contact.js         # POST /api/contact — Resend email
│  ├─ oauth.js               # GET /oauth      — Sveltia GitHub OAuth step 1
│  └─ callback.js            # GET /callback   — Sveltia GitHub OAuth step 2
├─ scripts/build.mjs         # Compiles content/ + site/ → dist/
├─ docs/CMS-SETUP.md         # One-time OAuth setup for Cosimo's login
└─ package.json              # `npm run build` → node scripts/build.mjs
```

## Cloudflare Pages settings for this branch

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Root directory:** (leave empty)

## Required env vars

| Name                          | Purpose                                |
| ----------------------------- | -------------------------------------- |
| `RESEND_API_KEY`              | Contact form emails                    |
| `OAUTH_GITHUB_CLIENT_ID`      | Sveltia CMS login (see docs/CMS-SETUP) |
| `OAUTH_GITHUB_CLIENT_SECRET`  | Sveltia CMS login (see docs/CMS-SETUP) |

## Local development

```
npm run build       # builds dist/
npm run dev         # builds and serves dist/ on http://localhost:8787
```
