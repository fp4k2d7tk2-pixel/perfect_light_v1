"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function ContactForm() {
  const router = useRouter();
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
      name: formData.get("name")?.toString().trim(),
      email: formData.get("email")?.toString().trim(),
      message: "Initial lead submitted from the homepage contact form.",
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Failed to send your request. Please try again.");
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Form submission error:", err);
    } finally {
      setLoading(false);
      form.reset();
      router.push(`/contact-details?name=${encodeURIComponent(data.name || "there")}`);
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm text-neutral-600 mb-2">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          required
          className="w-full rounded-2xl border border-neutral-300 bg-white px-5 py-4 outline-none focus:border-black transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm text-neutral-600 mb-2">Email</label>
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
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
          Thanks! We&apos;ll follow up and take you to the project details form.
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-black text-white px-7 py-4 font-medium hover:scale-[1.01] transition-transform disabled:opacity-50 disabled:hover:scale-100"
      >
        {loading ? "Contacting..." : "Contact Now"}
      </button>
    </form>
  );
}

export default ContactForm;