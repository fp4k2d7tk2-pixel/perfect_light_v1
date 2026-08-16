import ContactForm from "@/components/ContactForm";

export default function ServiceBusinessHomepage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <header className="sticky top-0 z-50 w-full border-b border-slate-300/40 bg-[linear-gradient(135deg,rgba(255,255,255,0.74),rgba(188,196,211,0.78),rgba(123,132,148,0.82),rgba(233,238,244,0.72))] shadow-[0_10px_40px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-12px_18px_rgba(0,0,0,0.12)] backdrop-blur-2xl backdrop-saturate-180">
        <div className="flex w-full items-center justify-between gap-3 px-3 py-2.5 sm:px-4 md:px-6 md:py-3">
          <img
            src="/logo.png"
            alt="Perfect Light Electrical logo"
            className="h-11 w-auto object-contain drop-shadow-[0_0_14px_rgba(255,255,255,0.45)] md:h-14"
          />

          <div className="flex flex-1 items-center justify-center border-l border-slate-300/70 pl-3 sm:pl-4 md:pl-5">
            <p className="text-center text-[10px] font-semibold tracking-[0.18em] text-slate-900 uppercase sm:text-xs md:text-sm [text-shadow:0_1px_0_rgba(255,255,255,0.7)]">
              Perfect Light - Chicago&apos;s Finest Electricians
            </p>
          </div>
        </div>
      </header>

      <section id="contact" className="border-b border-neutral-200 bg-white text-neutral-900">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-neutral-500 mb-4">
                Contact
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight text-neutral-900">
                Tell us about your project
              </h2>
              <p className="mt-6 text-lg text-neutral-700 max-w-2xl leading-relaxed">
                Whether replacing a fixture, adding lighting controls and outlets, or re-wiring an older building, Perfect Light is excited to give your home the beauty and functionality it deserves.
              </p>

              <div className="mt-8 rounded-3xl border border-neutral-300 bg-white p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.25em] text-neutral-500 mb-3">
                  Call now
                </p>
                <a
                  href="tel:+13124786298"
                  className="text-3xl md:text-4xl font-semibold text-neutral-900 hover:text-neutral-700 transition-colors"
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

      <section className="relative h-[80vh] min-h-[560px] w-full overflow-hidden border-b border-neutral-800 bg-black">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          poster="/Poster%20Image.png"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/Hero%20Video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-black/35" />
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
