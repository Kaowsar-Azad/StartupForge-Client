"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function FeaturedStartups({ startups = [] }) {
  return (
    // ব্যাকগ্রাউন্ড আপনার ওয়েবসাইটের ডার্ক থিমের সাথে মেলানো হয়েছে
    <section className="bg-[#0a0a0a] py-20"> 
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Featured Startups
          </h2>
          <p className="mt-4 max-w-2xl text-slate-400">
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
              <div className="flex h-full flex-col rounded-3xl border border-white/5 bg-[#111111] p-6 shadow-xl transition-all duration-300 hover:border-blue-500/30">
                
                {/* Logo & Header */}
                <div className="mb-5 flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-2xl bg-white/5">
                    <img
                      src={startup.logo}
                      alt={startup.startup_name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {startup.startup_name}
                    </h3>
                    <p className="text-sm text-slate-400">
                      Founder: {startup.founder_name || "Founder"}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="mb-5 line-clamp-3 text-sm leading-6 text-slate-300">
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
                <div className="mt-auto mb-6 rounded-2xl bg-[#1a1a1a] p-4 border border-white/5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    TEAM SIZE NEEDED
                  </p>
                  <h4 className="mt-1 text-lg font-bold text-white">
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
          <div className="mt-10 rounded-3xl border border-dashed border-white/10 p-12 text-center text-slate-400">
            No Featured Startups Found
          </div>
        )}

        {/* View More Button */}
        {startups.length > 0 && (
          <div className="mt-12 flex justify-center">
            <Link
              href="/startups"
              className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/20 active:scale-[0.98]"
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