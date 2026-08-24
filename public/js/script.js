/* ==========================================================================
   Perfect Light Chicago — shared behavior
   No external dependencies. No frameworks.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var drawer = document.querySelector(".nav-drawer");
  if (toggle && drawer) {
    toggle.addEventListener("click", function () {
      var isOpen = drawer.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  /* ---------- Analytics event hooks ----------
     These fire custom DOM events that GA4 (via Google Tag Manager) can be
     wired to once analytics IDs are supplied. See /docs/analytics-events.md.
     No tracking scripts are loaded until real account IDs are confirmed. */
  function trackEvent(name, detail) {
    document.dispatchEvent(new CustomEvent("pl:" + name, { detail: detail || {} }));
    if (window.dataLayer) {
      window.dataLayer.push(Object.assign({ event: name }, detail || {}));
    }
  }

  document.querySelectorAll('a[href^="tel:"]').forEach(function (el) {
    el.addEventListener("click", function () { trackEvent("phone_click", { href: el.href }); });
  });
  document.querySelectorAll('a[href^="mailto:"]').forEach(function (el) {
    el.addEventListener("click", function () { trackEvent("email_click", { href: el.href }); });
  });
  document.querySelectorAll("[data-cta]").forEach(function (el) {
    el.addEventListener("click", function () { trackEvent("service_cta_click", { cta: el.dataset.cta }); });
  });

  /* ---------- Lead form handling ----------
     IMPORTANT: This site does not yet have a confirmed form-processing
     destination (see business-config.js: formDestination). Until that is
     configured, submissions are not sent anywhere and the visible notice
     below stays on screen. Replace handleFormSubmit's TODO block once a
     provider (e.g. a form endpoint, email service, or CRM webhook) is
     approved. */
  document.querySelectorAll("form[data-lead-form]").forEach(function (form) {
    var statusEl = form.querySelector(".form-status");
    var formName = form.dataset.leadForm;

    form.addEventListener("focusin", function (e) {
      if (!form.dataset.started) {
        form.dataset.started = "true";
        trackEvent(formName + "_form_start", {});
      }
    }, true);

    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Basic required-field validation
      var valid = true;
      form.querySelectorAll("[required]").forEach(function (input) {
        var field = input.closest(".field");
        var errored = !input.value || (input.type === "checkbox" && !input.checked);
        if (field) field.classList.toggle("has-error", errored);
        if (errored) valid = false;
      });

      if (!valid) {
        statusEl.textContent = "Please complete the required fields highlighted below.";
        statusEl.className = "form-status error";
        return;
      }

      // Collect form fields into a payload the /api/contact endpoint accepts.
      // Every meaningful non-file field gets folded into `message` so the
      // email delivered to contact@perfectlightchicago.com contains full context.
      var fd = new FormData(form);
      var name = fd.get("name") || fd.get("full_name") || "";
      var email = fd.get("email") || "";
      var phone = fd.get("phone") || "";

      // Build a labeled context block from all other fields
      var CORE = { name: 1, full_name: 1, email: 1, phone: 1, photo: 1 };
      var LABELS = {
        neighborhood: "Neighborhood",
        property_type: "Property type",
        service: "Service requested",
        rooms: "Rooms",
        fixtures_selected: "Fixtures already selected",
        working_with_designer: "Working with a designer",
        timing: "Timing",
        budget: "Budget",
        preferred_contact_method: "Preferred contact method",
        description: "Project description",
        message: "Message",
        details: "Details",
        project_details: "Project details",
        project_type: "Project type",
        timeline: "Timeline",
        address: "Address",
      };
      var contextLines = [];
      fd.forEach(function (value, key) {
        if (CORE[key]) return;
        if (typeof value !== "string") return; // skip files, etc
        var v = value.trim();
        if (!v) return;
        var label = LABELS[key] || key;
        contextLines.push(label + ": " + v);
      });
      // Note about photo upload (Resend API doesn't handle attachments here)
      var photoField = form.querySelector('input[type="file"][name="photo"]');
      if (photoField && photoField.files && photoField.files.length > 0) {
        contextLines.push(
          "Photo upload: " + photoField.files[0].name +
          " (attachment not delivered by web form \u2014 please request via reply)"
        );
      }

      var payload = {
        name: name,
        email: email,
        phone: phone,
        message: contextLines.length ? contextLines.join("\n") : "(no additional details provided)",
      };

      var submitBtn = form.querySelector("button[type=submit]");
      if (submitBtn) submitBtn.disabled = true;
      statusEl.textContent = "Sending\u2026";
      statusEl.className = "form-status";

      try {
        var res = await fetch("/api/contact", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        });
        var data = await res.json().catch(function () { return {}; });
        if (!res.ok) {
          throw new Error((data && data.error) || ("HTTP " + res.status));
        }
        trackEvent(formName + "_form_submit", {});
        statusEl.textContent =
          "Thank you. Your request has been received. Perfect Light Chicago will review the details and follow up using the contact information you provided.";
        statusEl.className = "form-status success";
        form.reset();
      } catch (err) {
        console.error("[Perfect Light] contact form failed:", err);
        statusEl.textContent =
          "Sorry \u2014 we couldn't send your request. Please call (312) 478-6298 or email contact@perfectlightchicago.com and we'll follow up personally.";
        statusEl.className = "form-status error";
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  });
});
