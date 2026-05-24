export default function ServiceBusinessHomepage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-neutral-800">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black opacity-100" />

        <div className="relative max-w-7xl mx-auto px-6 py-28 lg:py-40">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center rounded-full border border-neutral-700 px-4 py-2 text-sm text-neutral-300 mb-6 backdrop-blur">
                Licensed • Insured • Residential & Commercial
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-tight">
                Premium Electrical
                <span className="block text-neutral-400">Work Done Right.</span>
              </h1>

              <p className="mt-8 text-lg text-neutral-300 max-w-xl leading-relaxed">
                Modern electrical installations, lighting design, troubleshooting,
                and service upgrades for homes and businesses throughout the
                Chicago area.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a
                  href="#contact"
                  className="rounded-2xl bg-white text-black px-7 py-4 font-medium hover:scale-[1.02] transition-transform"
                >
                  Request Estimate
                </a>

                <a
                  href="tel:+13125551234"
                  className="rounded-2xl border border-neutral-700 px-7 py-4 font-medium hover:bg-neutral-900 transition-colors"
                >
                  Call (312) 555-1234
                </a>
              </div>
            </div>

            <div>
              <div className="rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900">
                <img
                  src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1600&auto=format&fit=crop"
                  alt="Modern electrical work"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-2xl mb-14">
          <p className="text-sm uppercase tracking-[0.25em] text-neutral-500 mb-4">
            Services
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Professional electrical services.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Lighting Design & Installation',
              desc: 'Architectural lighting, recessed lighting, dimming systems, and premium fixture installs.',
            },
            {
              title: 'Service Upgrades',
              desc: 'Panel upgrades, service replacements, grounding corrections, and code compliance.',
            },
            {
              title: 'Troubleshooting & Repair',
              desc: 'Efficient diagnosis and repair of electrical faults and intermittent issues.',
            },
            {
              title: 'Commercial Buildouts',
              desc: 'Tenant improvements, retail lighting, dedicated circuits, and infrastructure work.',
            },
            {
              title: 'Smart Home Integration',
              desc: 'Smart switches, automation systems, lighting scenes, and connected controls.',
            },
            {
              title: 'EV Chargers',
              desc: 'Level 2 charger installation with load calculations and clean professional finishes.',
            },
          ].map((service) => (
            <div
              key={service.title}
              className="rounded-3xl border border-neutral-800 bg-neutral-900/50 p-8 hover:bg-neutral-900 transition-colors"
            >
              <h3 className="text-2xl font-medium mb-4">{service.title}</h3>
              <p className="text-neutral-400 leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="border-y border-neutral-800 bg-neutral-900/40">
        <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1600&auto=format&fit=crop"
              alt="Professional electrician"
              className="rounded-3xl border border-neutral-800 object-cover h-[500px] w-full"
            />
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-neutral-500 mb-4">
              About
            </p>

            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
              Detail-oriented work with modern design sensibility.
            </h2>

            <p className="mt-8 text-neutral-300 text-lg leading-relaxed">
              We believe electrical work should be both technically excellent and
              visually clean. From lighting layouts to panel organization, every
              installation is approached with craftsmanship, precision, and long-term
              reliability in mind.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6">
              <div>
                <div className="text-4xl font-semibold">10+</div>
                <div className="text-neutral-400 mt-2">Years Experience</div>
              </div>

              <div>
                <div className="text-4xl font-semibold">500+</div>
                <div className="text-neutral-400 mt-2">Projects Completed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-2xl mb-14">
          <p className="text-sm uppercase tracking-[0.25em] text-neutral-500 mb-4">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Trusted by homeowners and businesses.
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {[
            {
              quote:
                'Extremely clean work and excellent communication. The lighting layout completely transformed our home.',
              name: 'Sarah M.',
            },
            {
              quote:
                'Professional, punctual, and meticulous. One of the best contractors we have worked with.',
              name: 'David R.',
            },
            {
              quote:
                'Solved a difficult intermittent issue other electricians could not diagnose.',
              name: 'Michael T.',
            },
          ].map((item) => (
            <div
              key={item.name}
              className="rounded-3xl border border-neutral-800 p-8 bg-neutral-900/40"
            >
              <p className="text-lg leading-relaxed text-neutral-300">
                “{item.quote}”
              </p>

              <div className="mt-8 text-neutral-500">— {item.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto rounded-[2rem] border border-neutral-800 bg-gradient-to-br from-neutral-900 to-black p-10 md:p-16">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
              Ready to start your project?
            </h2>

            <p className="mt-6 text-lg text-neutral-300 leading-relaxed">
              Get in touch for consultations, troubleshooting, upgrades, and
              lighting projects throughout the Chicago area.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="rounded-2xl bg-white text-black px-7 py-4 font-medium hover:scale-[1.02] transition-transform"
              >
                Request Estimate
              </a>

              <a
                href="mailto:hello@yourdomain.com"
                className="rounded-2xl border border-neutral-700 px-7 py-4 font-medium hover:bg-neutral-900 transition-colors"
              >
                hello@yourdomain.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-neutral-800 bg-black">
        <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-neutral-500 mb-4">
              Contact
            </p>

            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
              Let’s talk about your project.
            </h2>

            <div className="mt-10 space-y-6 text-neutral-300 text-lg">
              <div>
                <div className="text-neutral-500 mb-1">Phone</div>
                <div>(312) 555-1234</div>
              </div>

              <div>
                <div className="text-neutral-500 mb-1">Email</div>
                <div>hello@yourdomain.com</div>
              </div>

              <div>
                <div className="text-neutral-500 mb-1">Service Area</div>
                <div>Chicago & Surrounding Suburbs</div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-8">
            <form className="space-y-6">
              <div>
                <label className="block text-sm text-neutral-400 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-2xl border border-neutral-700 bg-black px-5 py-4 outline-none focus:border-white transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm text-neutral-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full rounded-2xl border border-neutral-700 bg-black px-5 py-4 outline-none focus:border-white transition-colors"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm text-neutral-400 mb-2">
                  Project Details
                </label>
                <textarea
                  rows={5}
                  className="w-full rounded-2xl border border-neutral-700 bg-black px-5 py-4 outline-none focus:border-white transition-colors"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-white text-black px-7 py-4 font-medium hover:scale-[1.01] transition-transform"
              >
                Send Request
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
