"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";

function ContactDetailsForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [contactSession, setContactSession] = useState({
    name: "there",
    email: "",
    phone: "",
  });

  useEffect(() => {
    async function loadContactSession() {
      try {
        const response = await fetch("/api/contact-session", {
          cache: "no-store",
        });

        if (!response.ok) {
          return;
        }

        const session = await response.json();
        setContactSession({
          name: session.name || "there",
          email: session.email || "",
          phone: session.phone || "",
        });
      } catch (err) {
        console.error("Failed to load contact session:", err);
      }
    }

    loadContactSession();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: contactSession.name,
      email: contactSession.email,
      phone: contactSession.phone,
      projectType: formData.get("projectType")?.toString().trim(),
      timeline: formData.get("timeline")?.toString().trim(),
      projectDetails: formData.get("projectDetails")?.toString().trim(),
    };

    try {
      const response = await fetch("/api/contact-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "We couldn’t send your project details right now.");
      } else {
        setSubmitted(true);
        if (e.currentTarget instanceof HTMLFormElement) {
          e.currentTarget.reset();
        }
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <Link href="/" className="text-sm uppercase tracking-[0.25em] text-neutral-600 hover:text-neutral-900 transition-colors">
          ← Back home
        </Link>

        <h1 className="mt-8 text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-neutral-900">
          Tell us about your project
        </h1>
        <p className="mt-4 text-lg text-neutral-700 max-w-3xl leading-relaxed">
          Whether replacing a fixture, adding lighting controls and outlets, or re-wiring an older building, Perfect Light is excited to give your home the beauty and functionality it deserves.
        </p>

        <form onSubmit={handleSubmit} className="mt-12 rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] md:p-10">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-neutral-700 mb-2">Project type</label>
              <input
                type="text"
                name="projectType"
                placeholder="Residential, commercial, lighting..."
                required
                className="w-full rounded-2xl border border-neutral-300 bg-white px-5 py-4 text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-500"
              />
            </div>

            <div>
              <label className="block text-sm text-neutral-700 mb-2">Timeline</label>
              <input
                type="text"
                name="timeline"
                placeholder="When would you like to start?"
                required
                className="w-full rounded-2xl border border-neutral-300 bg-white px-5 py-4 text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-500"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm text-neutral-700 mb-2">Project details</label>
            <textarea
              rows={6}
              name="projectDetails"
              placeholder="Describe the scope, goals, or challenges for your project..."
              required
              className="w-full rounded-2xl border border-neutral-300 bg-white px-5 py-4 text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-500"
            />
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-neutral-900 px-7 py-4 font-medium text-white hover:scale-[1.01] transition-transform disabled:opacity-60"
            >
              {loading ? "Sending..." : "Submit details"}
            </button>
            <a
              href="tel:+13124786298"
              className="rounded-2xl border border-neutral-300 px-7 py-4 font-medium text-neutral-900 hover:bg-neutral-100 transition-colors"
            >
              Call (312) 478-6298
            </a>
          </div>

          {error && (
            <div className="mt-8 rounded-2xl border border-red-400/30 bg-red-50 px-5 py-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {submitted && (
            <div className="mt-8 rounded-2xl border border-emerald-400/30 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
              Thanks for sharing your project details. We’ll be in touch shortly.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default function ContactDetailsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white text-neutral-900" />}> 
      <ContactDetailsForm />
    </Suspense>
  );
}
