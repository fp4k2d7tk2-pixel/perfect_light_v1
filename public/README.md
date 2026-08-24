# Perfect Light Chicago — Website

This is a plain, dependency-free static site: HTML, one shared CSS file, one shared JS file, and a centralized business-info config. No framework, no build step. Open `index.html` in a browser, or serve the folder with any static file server, and it works.

## What's new (Aug 2026 SEO + conversion round)

- **Six neighborhood landing pages** under `/neighborhoods/` (Lakeview, Lincoln Park, Roscoe Village, Lincoln Square, Wrigleyville, Northalsted) — each with local Service schema and cross-links to nearby areas.
- **Three fixture-type pages** under `/lighting/` (Recessed Lighting, Chandelier & Pendant Installation, Dimmers & Smart Controls) — targeting high-intent installation searches.
- **New `/faq.html`** with FAQPage structured data for question-style search results.
- **Contact page reworked**: oversize phone number above the fold, Call/Text/Email trio, GBP review prompt, and clearer service-area guidance.
- **Google Business Profile linked** in `business-config.js` and homepage schema (`sameAs`).
- **Sitemap and internal links** updated to include all new pages.

## What's here

```
/
├── index.html                 Home
├── lighting-design.html
├── lighting-installation.html
├── electrical-services.html
├── about.html
├── projects.html
├── service-area.html
├── contact.html                Lead form (see "Form is not wired up" below)
├── privacy-policy.html
├── terms.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── css/styles.css              Full design system (tokens, components, responsive)
├── js/script.js                Mobile nav, form validation, analytics event hooks
├── js/business-config.js       Centralized business facts — single source of truth
└── assets/favicon.svg
```

## Why this isn't built into your existing GitHub repo

I don't have access to `github.com/fp4k2d7tk2-pixel/perfect_light_v1` — no connector is configured for it and my environment has no live network access, so I can't clone it. This build is a **fresh, standalone implementation** of the brief, not a diff against your existing code. Before this replaces the live site, someone will need to either merge this manually into the real repo, or replace its contents with this folder — your call.

## Content decisions already made, per the brief

- Removed all fabricated stats, superlatives, and testimonials that were on the live site ("10+ Years Experience," "500+ Projects," "Chicago's Finest Electricians," the three testimonials, the stock photography).
- No review/testimonial section exists anywhere on the new site — intentional, until real verified reviews exist.
- Projects page and homepage projects section show an honest "photography in progress" placeholder — no stock images stand in for project work.
- Owner bio (homepage + About) uses only the facts the brief explicitly confirmed: 7 years USMC, Penn State degree, apprenticeship, both licenses. It does **not** include rank, MOS, campus name, graduation year, or license numbers — those are flagged pending in every relevant spot.
- License numbers appear only as `[LICENSE NUMBER PENDING OWNER CONFIRMATION]` inside `business-config.js`, never as real-looking placeholder digits on the page itself.

## Things that are NOT done yet, on purpose

1. **The lead form does not send anywhere.** There's no confirmed form-processing provider (see Section 19 of the brief / `unresolved-information-checklist`). Submitting the form validates fields and shows the success message, but `script.js` explicitly logs a console warning instead of pretending to transmit data. Search `js/script.js` for `TODO` to find the exact spot to wire up once a provider (Formspree, a webhook, a CRM, etc.) is approved.
2. **No analytics scripts are loaded.** `business-config.js` has `analytics.ga4Id` / `analytics.gtmId` set to `null`. `script.js` already dispatches the event names from Section 29 of the brief (`phone_click`, `email_click`, `*_form_start`, `*_form_submit`, `service_cta_click`) as custom DOM events and pushes to `window.dataLayer` if present — so wiring up GTM/GA4 later is a drop-in, not a rebuild.
3. **No real photography.** Placeholder text only, per the brief's explicit instruction not to use stock images as project work.
4. **Structured data is minimal and conservative.** Only `Electrician` schema on the homepage and `Person` schema on the About page, using only confirmed fields (name, phone, email, service area). No aggregate rating, no review schema, no invented price beyond a generic `$$` range — remove even that if you'd rather not imply anything.

## Open items before this can go live

See the earlier audit document (`perfect-light-chicago-audit-and-plan.md`) for the full unresolved-information checklist. The short list that most directly blocks a real launch:

- Confirmed form-processing destination
- License numbers + whether to publish them at all
- Analytics account IDs
- Real project photography
- Verified, permissioned reviews (if/when available)
- Final sign-off on the owner-bio language

## Design notes

Palette and type are drawn from Section 21–22 of the brief: warm off-white background, charcoal text, a restrained amber accent, deep navy as the secondary color, Fraunces for display type paired with Inter for body/UI. The one deliberate signature element is the layered-circle "ambient / task / accent" diagram in the hero — it's a literal, honest illustration of the three-layers-of-light concept used in the Lighting Design copy, not a generic lightbulb icon or gradient blob.
