"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function OpportunityCard({ opportunity }) {
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
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35 }}
      viewport={{ once: true, amount: 0.2 }}
      className="h-full rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-blue-400/40 hover:bg-white/10 sm:p-6"
    >
      <div className="flex h-full flex-col justify-between gap-5">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold text-white sm:text-2xl">
                {role_title}
              </h3>
              <p className="mt-1 text-sm text-slate-400">{startup_name}</p>
            </div>

            <span className="shrink-0 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300">
              Open
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-medium text-blue-300">
              {work_type}
            </span>
            <span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs font-medium text-violet-300">
              {commitment_level}
            </span>
          </div>

          <div className="rounded-2xl bg-slate-900/70 p-4">
            <p className="text-sm font-medium text-slate-300">Required Skills</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {required_skills.slice(0, 4).map((skill, index) => (
                <span
                  key={index}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 text-sm text-slate-400">
            <span>Deadline</span>
            <span className="font-medium text-slate-200">
              {deadline || "Not set"}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 pt-2">
          <Link
            href={`/opportunities/${_id}`}
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            View Details
          </Link>

          <Link
            href={`/opportunities/${_id}`}
            className="text-sm font-medium text-blue-300 transition hover:text-blue-200"
          >
            Apply →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}