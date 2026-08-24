/* ============================================================
   Perfect Light Chicago - Google Reviews renderer
   Loads /reviews.json and renders reviews of 4+ stars.
   Refreshed daily by a GitHub Actions cron; see docs/GBP-REVIEWS-INTEGRATION.md.
   ============================================================ */
(async function () {
  const container = document.getElementById("reviews-container");
  if (!container) return;

  const GBP_REVIEW_URL = "https://g.page/r/CWKha-9E9ZQiEAI/review";

  const safe = (s) => String(s || "").replace(/[<>&"']/g, (c) => ({
    "<": "&lt;", ">": "&gt;", "&": "amp;", '"': "&quot;", "'": "&#39;"
  }[c]));

  try {
    const res = await fetch("/reviews.json", { cache: "no-store" });
    if (!res.ok) throw new Error("no reviews.json");
    const data = await res.json();
    if (!data.reviews || data.reviews.length === 0) {
      container.remove();
      return;
    }
    const cards = data.reviews.slice(0, 6).map((r) => {
      const stars = "\u2605".repeat(r.stars) + '<span style="opacity:0.25">' + "\u2605".repeat(5 - r.stars) + "</span>";
      const date = r.date ? new Date(r.date).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "";
      return `
        <article class="review-card">
          <div class="review-stars" aria-label="${r.stars} out of 5 stars">${stars}</div>
          <p class="review-text">${safe(r.text)}</p>
          <footer class="review-meta"><span>${safe(r.author) || "Google User"}</span><span>${safe(date)}</span></footer>
        </article>`;
    }).join("");

    container.innerHTML = `
      <div class="container">
        <div class="reviews-header">
          <div>
            <p class="eyebrow">What clients say</p>
            <h2>Reviewed by Chicago homeowners.</h2>
          </div>
          <div class="g-badge">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.4c-.3 1.5-1.1 2.7-2.4 3.6v3h3.9c2.3-2.1 3.6-5.2 3.6-8.7z"/><path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1C3.4 21.3 7.4 24 12 24z"/><path fill="#FBBC05" d="M5.4 14.3c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3V6.6H1.4C.5 8.3 0 10.1 0 12s.5 3.7 1.4 5.4l4-3.1z"/><path fill="#EA4335" d="M12 4.8c1.8 0 3.4.6 4.6 1.8l3.4-3.4C17.9 1.2 15.2 0 12 0 7.4 0 3.4 2.7 1.4 6.6l4 3.1C6.3 6.9 8.9 4.8 12 4.8z"/></svg>
            <span>Sourced daily from Google</span>
          </div>
        </div>
        <div class="reviews-grid">${cards}</div>
        <p class="reviews-cta">
          <a href="${GBP_REVIEW_URL}" target="_blank" rel="noopener">Leave your own review on Google &rarr;</a>
        </p>
      </div>
    `;
  } catch (e) {
    // If reviews.json is missing or empty, hide the section entirely.
    container.remove();
  }
})();
