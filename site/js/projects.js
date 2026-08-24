/*
  projects.js
  Loads /content/projects.json (built at deploy time from content/projects/*.md via
  scripts/build.mjs) and renders the project grid on /projects.html.

  Falls back gracefully: if the JSON is missing or has no published entries,
  the hand-authored "coming soon" placeholder tiles remain visible.
*/
(async function () {
  const grid = document.getElementById("projects-grid");
  const footnote = document.getElementById("projects-footnote");
  if (!grid) return;

  const escapeHtml = (s) =>
    String(s || "").replace(/[<>&"']/g, (c) => ({
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      '"': "&quot;",
      "'": "&#39;",
    }[c]));

  try {
    const res = await fetch("/content/projects.json", { cache: "no-store" });
    if (!res.ok) throw new Error("no projects.json");
    const projects = await res.json();

    const published = (projects || [])
      .filter((p) => p && p.published !== false)
      .sort((a, b) => (a.order || 999) - (b.order || 999));

    if (published.length === 0) return; // keep placeholders

    grid.innerHTML = published
      .map((p) => {
        const room = escapeHtml(p.room || "");
        const hood = escapeHtml(p.neighborhood || "");
        const label = [room, hood].filter(Boolean).join(" · ");
        const title = escapeHtml(p.title || "");
        const alt = escapeHtml(p.image_alt || `${room} ${hood} lighting project`.trim());
        const img = p.image ? escapeHtml(p.image) : "";

        const media = img
          ? `<div style="position:absolute;inset:0;background:#0a0a0a;">
               <img src="${img}" alt="${alt}" loading="lazy"
                    style="width:100%;height:100%;object-fit:cover;opacity:0.85;">
             </div>
             <div style="position:absolute;inset:0;
                background:linear-gradient(180deg,rgba(10,10,10,0) 40%,rgba(10,10,10,0.85) 100%);
                pointer-events:none;"></div>`
          : `<div style="position:absolute;top:30%;left:35%;width:80px;height:80px;
               background:radial-gradient(circle,rgba(212,165,116,0.35) 0%,transparent 70%);
               pointer-events:none;"></div>`;

        return `
          <article class="project-tile" style="aspect-ratio:4/5;
              background:linear-gradient(160deg,#1a1a1a 0%,#0a0a0a 50%,#1a1a1a 100%);
              border-radius:8px;padding:1.5rem;display:flex;flex-direction:column;
              justify-content:space-between;position:relative;overflow:hidden;">
            ${media}
            <span style="font-family:var(--font-mono);font-size:0.68rem;
                letter-spacing:0.14em;text-transform:uppercase;color:#D4A574;
                position:relative;z-index:1;">${label}</span>
            <span style="font-family:var(--font-display);font-size:1.1rem;
                font-weight:600;color:#F5F5F4;line-height:1.3;position:relative;z-index:1;">
              ${title}
            </span>
          </article>`;
      })
      .join("");

    if (footnote) {
      footnote.textContent = "";
    }
  } catch (err) {
    // Silent fallback — placeholders remain in place.
    // console.debug("projects.js: falling back to placeholders", err);
  }
})();
