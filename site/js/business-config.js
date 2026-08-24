/* ==========================================================================
   Perfect Light Chicago — centralized business information
   This is the single source of truth referenced throughout the site copy
   and structured data. Do NOT hard-code these facts elsewhere.

   Anything marked "[PENDING OWNER CONFIRMATION]" must not be published as
   fact anywhere on the live site until Cosimo confirms it. See
   /docs/unresolved-information-checklist.md for the full list and status.
   ========================================================================== */

window.PL_BUSINESS = {
  brandName: "Perfect Light Chicago",
  legalName: "Perfect Light Chicago, LLC",
  owner: "Cosimo Cortese",

  phone: {
    display: "(312) 478-6298",
    href: "tel:+13124786298"
  },
  email: "contact@perfectlightchicago.com",

  license: {
    supervisingElectrician: "[LICENSE NUMBER PENDING OWNER CONFIRMATION]",
    electricalContractor: "[LICENSE NUMBER PENDING OWNER CONFIRMATION]",
    issuingAuthority: "[PENDING OWNER CONFIRMATION]",
    // Whether to publish license numbers publicly at all is itself pending.
    publishNumbers: false
  },

  insurance: {
    statement: "Insured and bonded. Proof available upon request.",
    // Exact carrier / bonding amount intentionally not published.
    detailsConfirmed: false
  },

  hours: {
    statement: "By appointment. Appointments are available throughout the week.",
    emergencyStatement: "Emergency electrical service is available based on scheduling and location."
  },

  estimatePolicy: "Free estimates are available for straightforward, well-defined projects.",
  consultationPolicy:
    "For projects that require design planning \u2014 multiple rooms, fixture placement, layered lighting, or whole-home strategy \u2014 Perfect Light offers a Lighting Design Consultation. Any applicable design fee is explained in advance.",

  serviceArea: [
    "Edgewater",
    "Uptown",
    "Lakeview",
    "Wrigleyville",
    "Northalsted",
    "Lincoln Park",
    "Roscoe Village",
    "Lincoln Square",
    "West Town",
    "Ukrainian Village",
    "Oak Park",
    "Hyde Park"
  ],

  social: {
    // Google Business Profile confirmed by owner (review link).
    googleBusinessProfileUrl: "https://g.page/r/CWKha-9E9ZQiEAI",
    googleReviewUrl: "https://g.page/r/CWKha-9E9ZQiEAI/review",
    profiles: []
  },

  analytics: {
    ga4Id: null,          // [PENDING] set once provided, then enable loader in analytics.js
    gtmId: null           // [PENDING]
  },

  formDestination: {
    provider: null,       // [PENDING] e.g. "formspree" | "netlify" | "custom-webhook"
    endpoint: null,
    retentionPolicy: "[PENDING OWNER CONFIRMATION]"
  },

  founderBio: {
    // Publishable only once education/military-disclosure language is approved.
    approvedForPublish: false,
    marineCorpsYears: 7,
    university: "Penn State", // campus/program name pending confirmation
    publishRank: false
  }
};
