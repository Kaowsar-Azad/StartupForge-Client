"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function FeaturedStartups({ startups = [] }) {
  return (
    <section className="bg-background py-20 transition-colors duration-300"> 
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Featured Startups
          </h2>
          <p className="mt-4 max-w-2xl text-default-500">
            Explore the latest startup ideas posted by founders.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {startups.slice(0, 3).map((startup, index) => (
            <motion.div
              key={startup._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              {/* কার্ডের স্টাইল আপনার স্ক্রিনশটের মতো করে আপডেট করা হয়েছে */}
              <div className="flex h-full flex-col rounded-3xl border border-divider bg-white dark:bg-[#111111] p-6 shadow-xl transition-all duration-300 hover:border-blue-500/30">
                
                {/* Logo & Header */}
                <div className="mb-5 flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-2xl bg-default-100 dark:bg-white/5">
                    <img
                      src={startup.logo}
                      alt={startup.startup_name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      {startup.startup_name}
                    </h3>
                    <p className="text-sm text-default-500">
                      Founder: {startup.founder_name || "Founder"}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="mb-5 line-clamp-3 text-sm leading-6 text-default-600">
                  {startup.description}
                </p>

                {/* Tags */}
                <div className="mb-6 flex flex-wrap gap-2">
                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-[11px] font-medium text-blue-400">
                    {startup.industry}
                  </span>
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-400">
                    {startup.funding_stage}
                  </span>
                </div>

                {/* Team Size Needed */}
                <div className="mt-auto mb-6 rounded-2xl bg-default-100 dark:bg-[#1a1a1a] p-4 border border-divider">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-default-400">
                    TEAM SIZE NEEDED
                  </p>
                  <h4 className="mt-1 text-lg font-bold text-foreground">
                    {startup.team_size_needed || "3-5 Members"}
                  </h4>
                </div>

                {/* View Button */}
                <Link
                  href={`/startups/${startup._id}`}
                  className="flex w-full items-center justify-center rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 active:scale-[0.98]"
                >
                  View Startup
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {startups.length === 0 && (
          <div className="mt-10 rounded-3xl border border-dashed border-divider p-12 text-center text-default-500">
            No Featured Startups Found
          </div>
        )}

        {/* View More Button */}
        {startups.length > 0 && (
          <div className="mt-12 flex justify-center">
            <Link
              href="/startups"
              className="group flex items-center gap-2 rounded-full border border-divider bg-default-100 dark:bg-white/5 px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:bg-default-200 dark:hover:bg-white/10 hover:border-divider active:scale-[0.98]"
            >
              View More Startups
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}