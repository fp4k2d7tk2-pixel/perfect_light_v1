# Perfect Light Chicago — redesign preview branch

**This is a preview branch. It does not affect the live site until merged.**

- Live site (built from `main`): https://www.perfectlightchicago.com
- Preview site (built from this branch): auto-generated Vercel preview URL

## What's on this branch

A full 22-page static redesign of the site, plus:

- A lightweight admin at `/admin/` (Sveltia CMS) for adding project photos
- A Vercel Serverless Function at `/api/contact` that emails leads via Resend
- Vercel Serverless Functions at `/api/oauth` and `/api/callback` that broker
  Sveltia's GitHub sign-in (see `docs/CMS-SETUP.md`)
- A minimal Node build script that compiles project markdown into JSON

## Structure

```
perfect_light_v1/
├─ public/                    # Static site served at the domain root
│  ├─ index.html
│  ├─ projects.html           # Reads /content/projects.json at load
│  ├─ contact.html            # POSTs /api/contact
│  ├─ lighting/…
│  ├─ neighborhoods/…
│  ├─ css/styles.css
│  ├─ js/projects.js
│  ├─ js/script.js
│  ├─ admin/                  # Sveltia CMS admin (served at /admin/)
│  │  ├─ index.html
│  │  └─ config.yml
│  └─ content/projects.json   # Built at deploy from content/projects/*.md
├─ content/                   # Source-of-truth content edited via the CMS
│  └─ projects/*.md
├─ api/                       # Vercel Serverless Functions
│  ├─ contact.js              # POST /api/contact — Resend email
│  ├─ oauth.js                # GET  /api/oauth   — GitHub OAuth start
│  └─ callback.js             # GET  /api/callback — GitHub OAuth finish
├─ scripts/build.mjs          # Compiles content/projects/*.md → public/content/projects.json
├─ docs/CMS-SETUP.md          # One-time OAuth setup for Cosimo's login
├─ vercel.json                # Vercel build config
└─ package.json               # `npm run build` → node scripts/build.mjs
```

## Vercel build settings

- **Framework preset:** Other
- **Build command:** `npm run build`
- **Output directory:** `public`

## Required env vars

| Name                          | Purpose                                |
| ----------------------------- | -------------------------------------- |
| `RESEND_API_KEY`              | Contact form emails (already set)      |
| `OAUTH_GITHUB_CLIENT_ID`      | Sveltia CMS login (see docs/CMS-SETUP) |
| `OAUTH_GITHUB_CLIENT_SECRET`  | Sveltia CMS login (see docs/CMS-SETUP) |

## Local development

```
npm run build       # builds public/content/projects.json
npm run dev         # builds and serves public/ on http://localhost:8787
```
