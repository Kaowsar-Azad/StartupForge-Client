"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.18),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.12),_transparent_30%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-blue-200 backdrop-blur"
            >
              StartupForge — Startup Team Builder Platform
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Build your startup team, faster.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg"
            >
              Connect founders with developers, designers, marketers, and other
              talented collaborators. Discover opportunities, apply to join teams,
              and grow together.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="/startups"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                Browse Startups
              </Link>
              <Link
                href="/opportunities"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Find Opportunities
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-3"
            >
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-2xl font-bold text-white">120+</p>
                <p className="mt-1 text-sm text-slate-300">Startups</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-2xl font-bold text-white">2.4k</p>
                <p className="mt-1 text-sm text-slate-300">Collaborators</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-2xl font-bold text-white">850+</p>
                <p className="mt-1 text-sm text-slate-300">Opportunities</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 24 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute -left-8 top-10 h-24 w-24 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="absolute -right-8 bottom-10 h-24 w-24 rounded-full bg-emerald-500/20 blur-3xl" />

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
              <div className="space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-300">Founder Dashboard</p>
                    <h3 className="text-xl font-semibold text-white">
                      StartupForge Overview
                    </h3>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm text-emerald-300">
                    Live
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-900/80 p-4">
                    <p className="text-sm text-slate-400">Open Opportunities</p>
                    <p className="mt-2 text-3xl font-bold text-white">08</p>
                  </div>
                  <div className="rounded-2xl bg-slate-900/80 p-4">
                    <p className="text-sm text-slate-400">Applications</p>
                    <p className="mt-2 text-3xl font-bold text-white">42</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                  <p className="text-sm text-slate-300">Top Match Today</p>
                  <div className="mt-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-white">Frontend Developer</p>
                      <p className="text-sm text-slate-400">BuildFlow</p>
                    </div>
                    <span className="rounded-full bg-blue-500/15 px-3 py-1 text-sm text-blue-300">
                      92% Match
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}