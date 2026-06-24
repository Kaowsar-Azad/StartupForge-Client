"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function FeaturedStartups({ startups = [] }) {
  return (
    <section className="bg-slate-950 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-blue-400">
              Featured Startups
            </p>

            <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
              Discover Innovative Startup Ideas
            </h2>

            <p className="mt-4 max-w-2xl text-slate-400">
              Explore the latest startup ideas posted by founders and find the
              perfect opportunity to join an exciting team.
            </p>
          </div>

          <Link
            href="/startups"
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            View All Startups →
          </Link>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {startups.map((startup, index) => (
            <motion.div
              key={startup._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              className="group h-full"
            >
              <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:border-blue-500/40 hover:bg-white/10">

                {/* Logo */}
                <div className="mb-5 flex items-center gap-4">
                  <img
                    src={startup.logo}
                    alt={startup.startup_name}
                    className="h-16 w-16 rounded-2xl object-cover ring-2 ring-white/10"
                  />

                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {startup.startup_name}
                    </h3>

                    <p className="text-sm text-slate-400">
                      Founder: {startup.founder_name || "Founder"}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="line-clamp-3 text-sm leading-6 text-slate-300">
                  {startup.description}
                </p>

                {/* Industry */}
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-medium text-blue-300">
                    {startup.industry}
                  </span>

                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300">
                    {startup.funding_stage}
                  </span>
                </div>

                {/* Team Needed */}
                <div className="mt-5 rounded-2xl bg-slate-900/70 p-4">
                  <p className="text-xs uppercase tracking-wider text-slate-400">
                    Team Size Needed
                  </p>

                  <h4 className="mt-2 text-lg font-bold text-white">
                    {startup.team_size_needed || "3-5 Members"}
                  </h4>
                </div>

                {/* Footer */}
                <div className="mt-auto pt-6">
                  <Link
                    href={`/startups/${startup._id}`}
                    className="flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
                  >
                    View Startup
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {startups.length === 0 && (
          <div className="mt-10 rounded-3xl border border-dashed border-white/10 p-12 text-center">
            <h3 className="text-xl font-semibold text-white">
              No Featured Startups Found
            </h3>

            <p className="mt-2 text-slate-400">
              New startup ideas will appear here soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}