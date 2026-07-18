import ContactForm from "@/components/ContactForm";

export default function ServiceBusinessHomepage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center">
            <img
              src="/logo.png"
              alt="Perfect Light Electrical logo"
              className="h-14 md:h-16 w-auto object-contain"
            />
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-600">
            <a href="#services" className="hover:text-black transition-colors">
              Services
            </a>
            <a href="#about" className="hover:text-black transition-colors">
              About
            </a>
            <a href="#contact" className="hover:text-black transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <section id="contact" className="border-b border-neutral-200 bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-neutral-400 mb-4">
                Contact
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight">
                Chicago&apos;s Finest Electricians
              </h2>
              <p className="mt-6 text-lg text-neutral-300 max-w-xl leading-relaxed">
                Fast response, clean work, and dependable service for homes and businesses across Chicago.
              </p>

              <div className="mt-8 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
                <p className="text-sm uppercase tracking-[0.25em] text-neutral-400 mb-3">
                  Call now
                </p>
                <a
                  href="tel:+13124786298"
                  className="text-3xl md:text-4xl font-semibold hover:text-neutral-200 transition-colors"
                >
                  (312) 478-6298
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-8 text-neutral-900 shadow-2xl">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-neutral-800">
        <div className="absolute inset-0 bg-gray-50" />

        <div className="relative max-w-7xl mx-auto px-6 py-28 lg:py-40">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center rounded-full border border-neutral-200 px-4 py-2 text-sm text-neutral-600 bg-white/70 mb-6 backdrop-blur">
                Licensed • Insured • Residential & Commercial
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-tight">
                Premium Electrical
                <span className="block text-neutral-500">Work Done Right.</span>
              </h1>

              <p className="mt-8 text-lg text-neutral-600 max-w-xl leading-relaxed">
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
                  href="tel:+13124786298"
                  className="rounded-2xl border border-neutral-300 px-7 py-4 font-medium hover:bg-neutral-100 transition-colors"
                >
                  Call (312) 478-6298
                </a>
              </div>
            </div>

            <div>
              <div className="rounded-3xl overflow-hidden border border-neutral-200 shadow-2xl bg-white">
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

      <section id="services" className="max-w-7xl mx-auto px-6 py-24">
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
              title: "Lighting Design & Installation",
              desc: "Architectural lighting, recessed lighting, dimming systems, and premium fixture installs.",
            },
            {
              title: "Service Upgrades",
              desc: "Panel upgrades, service replacements, grounding corrections, and code compliance.",
            },
            {
              title: "Troubleshooting & Repair",
              desc: "Efficient diagnosis and repair of electrical faults and intermittent issues.",
            },
            {
              title: "Commercial Buildouts",
              desc: "Tenant improvements, retail lighting, dedicated circuits, and infrastructure work.",
            },
            {
              title: "Smart Home Integration",
              desc: "Smart switches, automation systems, lighting scenes, and connected controls.",
            },
            {
              title: "EV Chargers",
              desc: "Level 2 charger installation with load calculations and clean professional finishes.",
            },
          ].map((service) => (
            <div
              key={service.title}
              className="rounded-3xl border border-neutral-200 bg-white p-8 hover:bg-gray-50 transition-colors"
            >
              <h3 className="text-2xl font-medium mb-4">{service.title}</h3>
              <p className="text-neutral-500 leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="border-y border-neutral-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1600&auto=format&fit=crop"
              alt="Professional electrician"
              className="rounded-3xl border border-neutral-200 object-cover h-[500px] w-full"
            />
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-neutral-500 mb-4">
              About
            </p>

            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
              Detail-oriented work with modern design sensibility.
            </h2>

            <p className="mt-8 text-neutral-600 text-lg leading-relaxed">
              We believe electrical work should be both technically excellent and
              visually clean. From lighting layouts to panel organization, every
              installation is approached with craftsmanship, precision, and long-term
              reliability in mind.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6">
              <div>
                <div className="text-4xl font-semibold">10+</div>
                <div className="text-neutral-500 mt-2">Years Experience</div>
              </div>

              <div>
                <div className="text-4xl font-semibold">500+</div>
                <div className="text-neutral-500 mt-2">Projects Completed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                "Extremely clean work and excellent communication. The lighting layout completely transformed our home.",
              name: "Sarah M.",
            },
            {
              quote:
                "Professional, punctual, and meticulous. One of the best contractors we have worked with.",
              name: "David R.",
            },
            {
              quote:
                "Solved a difficult intermittent issue other electricians could not diagnose.",
              name: "Michael T.",
            },
          ].map((item) => (
            <div
              key={item.name}
              className="rounded-3xl border border-neutral-200 p-8 bg-white"
            >
              <p className="text-lg leading-relaxed text-neutral-600">
                “{item.quote}”
              </p>

              <div className="mt-8 text-neutral-500">— {item.name}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto rounded-[2rem] border border-neutral-200 bg-gray-50 p-10 md:p-16">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
              Ready to start your project?
            </h2>

            <p className="mt-6 text-lg text-neutral-600 leading-relaxed">
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
                href="mailto:contact@perfectlightchicago.com"
                className="rounded-2xl border border-neutral-300 px-7 py-4 font-medium hover:bg-neutral-100 transition-colors"
              >
                contact@perfectlightchicago.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
