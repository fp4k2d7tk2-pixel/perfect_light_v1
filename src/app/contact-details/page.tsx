"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function ContactDetailsForm() {
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const name = searchParams.get("name") || "there";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name,
      email: formData.get("email")?.toString().trim(),
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
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <Link href="/" className="text-sm uppercase tracking-[0.25em] text-neutral-400 hover:text-white transition-colors">
          ← Back home
        </Link>

        <h1 className="mt-8 text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
          Tell us about your project
        </h1>
        <p className="mt-4 text-lg text-neutral-300 max-w-2xl leading-relaxed">
          Thanks, {name}. Share a few details so we can prepare a tailored plan for your next electrical project.
        </p>

        <form onSubmit={handleSubmit} className="mt-12 rounded-[2rem] border border-white/10 bg-white/10 p-8 md:p-10 backdrop-blur">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-neutral-300 mb-2">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="w-full rounded-2xl border border-white/15 bg-neutral-900/70 px-5 py-4 outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="block text-sm text-neutral-300 mb-2">Project type</label>
              <input
                type="text"
                name="projectType"
                placeholder="Residential, commercial, lighting..."
                required
                className="w-full rounded-2xl border border-white/15 bg-neutral-900/70 px-5 py-4 outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="block text-sm text-neutral-300 mb-2">Timeline</label>
              <input
                type="text"
                name="timeline"
                placeholder="When would you like to start?"
                required
                className="w-full rounded-2xl border border-white/15 bg-neutral-900/70 px-5 py-4 outline-none focus:border-white"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm text-neutral-300 mb-2">Project details</label>
            <textarea
              rows={6}
              name="projectDetails"
              placeholder="Describe the scope, goals, or challenges for your project..."
              required
              className="w-full rounded-2xl border border-white/15 bg-neutral-900/70 px-5 py-4 outline-none focus:border-white"
            />
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-white px-7 py-4 font-medium text-black hover:scale-[1.01] transition-transform disabled:opacity-60"
            >
              {loading ? "Sending..." : "Submit details"}
            </button>
            <a
              href="tel:+13124786298"
              className="rounded-2xl border border-white/20 px-7 py-4 font-medium hover:bg-white/10 transition-colors"
            >
              Call (312) 478-6298
            </a>
          </div>

          {error && (
            <div className="mt-8 rounded-2xl border border-red-400/30 bg-red-500/10 px-5 py-4 text-sm text-red-300">
              {error}
            </div>
          )}

          {submitted && (
            <div className="mt-8 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-300">
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
    <Suspense fallback={<div className="min-h-screen bg-neutral-950 text-white" />}> 
      <ContactDetailsForm />
    </Suspense>
  );
}
