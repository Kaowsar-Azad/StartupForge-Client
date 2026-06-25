"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function FeaturedOpportunities({ opportunities = [] }) {
  return (
    <section className="bg-[#0a0a0a] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Featured Opportunities
          </h2>
          <p className="mt-4 max-w-2xl text-slate-400">
            Find the perfect role in an exciting startup and join the journey.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {opportunities.slice(0, 3).map((opportunity, index) => {
            const {
              _id,
              role_title,
              startup_name,
              required_skills = [],
              work_type,
              commitment_level,
              deadline,
            } = opportunity || {};

            return (
              <motion.div
                key={_id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="flex h-full flex-col justify-between rounded-3xl border border-white/5 bg-[#111111] p-6 shadow-xl transition-all duration-300 hover:border-blue-500/30">
                  <div className="space-y-5">
                    
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-bold text-white sm:text-2xl">
                          {role_title}
                        </h3>
                        <p className="mt-1 text-sm text-slate-400">{startup_name}</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-400">
                        Open
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-blue-500/10 px-3 py-1 text-[11px] font-medium text-blue-400">
                        {work_type}
                      </span>
                      <span className="rounded-full bg-violet-500/10 px-3 py-1 text-[11px] font-medium text-violet-400">
                        {commitment_level}
                      </span>
                    </div>

                    {/* Required Skills */}
                    <div className="rounded-2xl bg-[#1a1a1a] p-4 border border-white/5">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">
                        REQUIRED SKILLS
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {required_skills.slice(0, 4).map((skill, idx) => (
                          <span
                            key={idx}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Deadline */}
                    <div className="flex items-center justify-between gap-3 text-sm text-slate-400">
                      <span className="font-medium">Deadline</span>
                      <span className="text-slate-300">
                        {deadline || "Not set"}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-white/5">
                    <Link
                      href={`/opportunities/${_id}`}
                      className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 active:scale-[0.98]"
                    >
                      View Details
                    </Link>
                    <Link
                      href={`/opportunities/${_id}`}
                      className="flex shrink-0 items-center justify-center px-4 py-3 text-sm font-medium text-blue-400 transition hover:text-blue-300"
                    >
                      Apply →
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {opportunities.length === 0 && (
          <div className="mt-10 rounded-3xl border border-dashed border-white/10 p-12 text-center text-slate-400">
            No Featured Opportunities Found
          </div>
        )}

        {/* View More Button */}
        {opportunities.length > 0 && (
          <div className="mt-12 flex justify-center">
            <Link
              href="/opportunities"
              className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/20 active:scale-[0.98]"
            >
              View More Opportunities
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