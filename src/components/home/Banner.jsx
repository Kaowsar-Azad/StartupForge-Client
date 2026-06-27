"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, Users, Briefcase } from "@gravity-ui/icons";

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 transition-colors duration-500 min-h-[90vh] flex items-center">
      {/* Background Animated Glowing Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 dark:bg-blue-600/30 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-emerald-500/20 dark:bg-emerald-500/20 blur-[120px]"
        />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 dark:from-[#030712] to-transparent z-10" />
      </div>

      <div className="relative z-20 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Content Area */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-900/20 px-5 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 backdrop-blur-md shadow-sm"
            >
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              StartupForge — The Ultimate Team Builder
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl leading-[1.1]"
            >
              Build your startup team, <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                faster & smarter.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-400"
            >
              Connect visionary founders with world-class developers, designers, and marketers. Discover high-potential opportunities, apply to join elite teams, and build the future together.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Link
                href="/startups"
                className="group relative inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25 overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none"></span>
                Browse Startups
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/opportunities"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/50 px-8 py-4 text-base font-semibold text-slate-700 dark:text-slate-300 transition-all hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-700 backdrop-blur-sm"
              >
                Find Opportunities
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200 dark:border-slate-800/60"
            >
              <div>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
                  <Star className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-medium">Startups</span>
                </div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">120+</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Talents</span>
                </div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">2.4k</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
                  <Briefcase className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-medium">Jobs</span>
                </div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">850+</p>
              </div>
            </motion.div>
          </div>

          {/* Right Floating Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
            className="relative lg:ml-auto w-full max-w-lg"
            style={{ perspective: 1000 }}
          >
            {/* Floating Elements for 3D effect */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-12 -top-12 z-30 rounded-2xl border border-white/20 bg-white/60 dark:bg-slate-800/60 p-4 shadow-xl backdrop-blur-xl hidden sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">New Application</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Frontend Developer</p>
                </div>
              </div>
            </motion.div>

            {/* Main Glass Mockup */}
            <div className="relative rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/40 p-2 shadow-2xl backdrop-blur-2xl">
              <div className="rounded-2xl border border-slate-100 dark:border-slate-800/50 bg-white dark:bg-[#0a0f1c] p-6 shadow-inner">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-amber-400" />
                    <div className="h-3 w-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="rounded-full bg-blue-50 dark:bg-blue-900/30 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
                    Founder Dashboard
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-5 transition hover:shadow-md">
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Opportunities</p>
                      <p className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">12</p>
                    </div>
                    <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-5 transition hover:shadow-md">
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Applicants</p>
                      <p className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">48</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-white shadow-lg shadow-blue-500/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm font-medium">Top Match Profile</p>
                        <h4 className="mt-1 text-xl font-bold">Alex Designer</h4>
                        <p className="text-sm text-blue-200">UI/UX Expert</p>
                      </div>
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                        <span className="text-lg font-bold">98%</span>
                      </div>
                    </div>
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