"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Find Startup Opportunities",
    description:
      "Explore exciting startup roles posted by founders and join projects that match your skills and interests.",
    icon: "🚀",
  },
  {
    title: "Build Your Dream Team",
    description:
      "Founders can discover talented developers, designers, marketers, and collaborators in one place.",
    icon: "🤝",
  },
  {
    title: "Grow Your Network",
    description:
      "Connect with ambitious founders and professionals to create meaningful startup partnerships.",
    icon: "🌐",
  },
  {
    title: "Track Applications",
    description:
      "Monitor application progress, get status updates, and stay organized throughout the hiring process.",
    icon: "📊",
  },
];

export default function WhyJoin() {
  return (
    <section className="bg-slate-950 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-blue-400">
            Why Join StartupForge
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-5xl">
            Everything You Need To Build & Join Startups
          </h2>

          <p className="mt-5 text-slate-400">
            StartupForge connects founders and collaborators through a modern
            platform designed for startup growth, recruitment, and networking.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
              }}
              viewport={{ once: true }}
              className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:border-blue-500/40 hover:bg-white/10"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/15 text-3xl">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold text-white">
                {feature.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-300">
                {feature.description}
              </p>

              <div className="mt-6 h-[2px] w-0 bg-blue-500 transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 p-8 text-center backdrop-blur-md"
        >
          <h3 className="text-2xl font-bold md:text-3xl">
            Ready to build something amazing?
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Whether you're a founder searching for talent or a collaborator
            looking for opportunities, StartupForge is the perfect place to
            start your journey.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <button className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500">
              Browse Startups
            </button>

            <button className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
              Explore Opportunities
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}