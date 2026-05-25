"use client";

import { useState } from "react";

function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Failed to send message. Please try again.");
      } else {
        setSuccess(true);
        form.reset();
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Form submission error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm text-neutral-600 mb-2">
          Name
        </label>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          required
          className="w-full rounded-2xl border border-neutral-300 bg-white px-5 py-4 outline-none focus:border-black transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm text-neutral-600 mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          required
          className="w-full rounded-2xl border border-neutral-300 bg-white px-5 py-4 outline-none focus:border-black transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm text-neutral-600 mb-2">
          Project Details
        </label>
        <textarea
          name="message"
          placeholder="Tell us about your project..."
          rows={5}
          required
          className="w-full rounded-2xl border border-neutral-300 bg-white px-5 py-4 outline-none focus:border-black transition-colors"
        />
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-700">
          Message sent successfully! We'll be in touch soon.
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-black text-white px-7 py-4 font-medium hover:scale-[1.01] transition-transform disabled:opacity-50 disabled:hover:scale-100"
      >
        {loading ? "Sending..." : "Send Request"}
      </button>
    </form>
  );
}

export default ContactForm;