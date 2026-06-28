"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, Persons, Briefcase } from "@gravity-ui/icons";
import { useState, useEffect } from "react";

const slides = [
  {
    badge: "🚀 Startup Team Building",
    heading: (
      <>
        Build your startup
        <br className="hidden sm:block" />
        team,{" "}
        <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 dark:from-blue-400 dark:via-violet-400 dark:to-emerald-400 bg-clip-text text-transparent">
          faster & smarter.
        </span>
      </>
    ),
    desc: "Connect visionary founders with world-class developers, designers, and marketers. Build the future together.",
    mockup: "dashboard",
  },
  {
    badge: "⚡ Smart AI Matching",
    heading: (
      <>
        Find your perfect
        <br className="hidden sm:block" />
        co-founder &{" "}
        <span className="bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400 dark:from-violet-400 dark:via-pink-400 dark:to-orange-400 bg-clip-text text-transparent">
          dream team.
        </span>
      </>
    ),
    desc: "Our AI-powered matching connects you with talents who share your vision, skills, and ambition to succeed.",
    mockup: "matching",
  },
  {
    badge: "💼 Top Opportunities",
    heading: (
      <>
        Discover roles at
        <br className="hidden sm:block" />
        the most{" "}
        <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
          exciting startups.
        </span>
      </>
    ),
    desc: "Browse hundreds of opportunities at high-growth startups. Apply in seconds and get matched instantly.",
    mockup: "opportunities",
  },
];

const DashboardMockup = () => (
  <div className="relative rounded-3xl border border-white/20 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-2xl shadow-2xl overflow-hidden">
    <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/30 dark:border-white/5 bg-white/40 dark:bg-white/5">
      <div className="flex items-center gap-1.5">
        <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      </div>
      <div className="flex items-center gap-2 rounded-full border border-blue-200/50 dark:border-blue-500/30 bg-blue-50/80 dark:bg-blue-500/10 px-3 py-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300">Founder Dashboard</span>
      </div>
      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Live ✦</span>
    </div>
    <div className="p-5 space-y-3.5">
      <div className="grid grid-cols-3 gap-2.5">
        {[
          { label: "Opportunities", value: "12", trend: "+3", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50/80 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/20" },
          { label: "Applicants", value: "48", trend: "+12", color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50/80 dark:bg-violet-500/10 border-violet-100 dark:border-violet-500/20" },
          { label: "Accepted", value: "8", trend: "+2", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50/80 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20" },
        ].map((s, i) => (
          <div key={i} className={`rounded-xl ${s.bg} p-3.5 border`}>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">{s.label}</p>
            <p className={`text-xl font-extrabold mt-1 ${s.color}`}>{s.value}</p>
            <p className="text-[9px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">{s.trend} this week</p>
          </div>
        ))}
      </div>
      <div className="relative rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-4 overflow-hidden shadow-lg shadow-indigo-500/20">
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/5 rounded-full" />
        <div className="flex items-center gap-3">
          <img src="https://i.pravatar.cc/100?img=36" className="w-12 h-12 rounded-xl object-cover ring-2 ring-white/30" />
          <div className="flex-1">
            <p className="text-[9px] font-bold text-blue-200 uppercase tracking-widest">⚡ Top Match</p>
            <h4 className="text-sm font-extrabold text-white">Alex Designer</h4>
            <div className="flex items-center gap-2 mt-1.5">
              <div className="flex-1 h-1 rounded-full bg-white/20">
                <div className="h-full w-[98%] rounded-full bg-emerald-400" />
              </div>
              <span className="text-[10px] font-bold text-emerald-300">98%</span>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        {[
          { name: "Sarah K.", role: "React Developer", img: 12, status: "Accepted", sc: "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20" },
          { name: "James R.", role: "Product Designer", img: 25, status: "Reviewing", sc: "text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20" },
          { name: "Mia T.", role: "Backend Engineer", img: 48, status: "New", sc: "text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20" },
        ].map((p, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-slate-100 dark:border-white/5 bg-white/60 dark:bg-white/5 px-3 py-2">
            <img src={`https://i.pravatar.cc/100?img=${p.img}`} className="w-7 h-7 rounded-full object-cover" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-800 dark:text-white truncate">{p.name}</p>
              <p className="text-[9px] text-slate-400 truncate">{p.role}</p>
            </div>
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-lg border ${p.sc}`}>{p.status}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-white/5">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1.5">
            {[12, 25, 36, 48].map(n => (
              <img key={n} src={`https://i.pravatar.cc/32?img=${n}`} className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900 object-cover" />
            ))}
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400">
            <span className="font-bold text-slate-800 dark:text-white">500+</span> joined this week
          </p>
        </div>
        <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-500/20">🟢 Live</span>
      </div>
    </div>
  </div>
);

const MatchingMockup = () => (
  <div className="relative rounded-3xl border border-white/20 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-2xl shadow-2xl overflow-hidden">
    <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/30 dark:border-white/5 bg-white/40 dark:bg-white/5">
      <div className="flex items-center gap-1.5">
        <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      </div>
      <div className="flex items-center gap-2 rounded-full border border-violet-200/50 dark:border-violet-500/30 bg-violet-50/80 dark:bg-violet-500/10 px-3 py-1">
        <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
        <span className="text-[10px] font-bold text-violet-700 dark:text-violet-300">AI Matching Engine</span>
      </div>
      <span className="text-[10px] text-slate-400 font-medium">98% ✦</span>
    </div>
    <div className="p-5 space-y-3">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Top Talent Matches</p>
      {[
        { name: "Alex Designer", role: "UI/UX Expert", img: 36, match: 98, color: "from-violet-500 to-pink-500" },
        { name: "Sarah K.", role: "React Developer", img: 12, match: 95, color: "from-blue-500 to-indigo-500" },
        { name: "James R.", role: "Product Designer", img: 25, match: 91, color: "from-emerald-500 to-teal-500" },
        { name: "Mia T.", role: "Backend Engineer", img: 48, match: 88, color: "from-amber-500 to-orange-500" },
      ].map((p, i) => (
        <div key={i} className="flex items-center gap-3 rounded-2xl border border-slate-100 dark:border-white/5 bg-white/60 dark:bg-white/5 p-3">
          <div className="relative">
            <img src={`https://i.pravatar.cc/100?img=${p.img}`} className="w-10 h-10 rounded-xl object-cover" />
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-br ${p.color} flex items-center justify-center`}>
              <span className="text-[7px] font-bold text-white">{i + 1}</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-800 dark:text-white">{p.name}</p>
            <p className="text-[9px] text-slate-400">{p.role}</p>
            <div className="flex items-center gap-2 mt-1.5">
              <div className="flex-1 h-1 rounded-full bg-slate-200 dark:bg-white/10">
                <div className={`h-full rounded-full bg-gradient-to-r ${p.color}`} style={{ width: `${p.match}%` }} />
              </div>
            </div>
          </div>
          <span className={`text-xs font-extrabold bg-gradient-to-r ${p.color} bg-clip-text text-transparent`}>{p.match}%</span>
        </div>
      ))}
      <div className="rounded-2xl bg-gradient-to-r from-violet-600 to-pink-600 p-3 flex items-center justify-between shadow-lg shadow-violet-500/20">
        <div>
          <p className="text-[9px] text-violet-200 font-semibold">AI-powered matching</p>
          <p className="text-sm font-bold text-white">2,400+ talents analyzed</p>
        </div>
        <div className="text-2xl">⚡</div>
      </div>
    </div>
  </div>
);

const OpportunitiesMockup = () => (
  <div className="relative rounded-3xl border border-white/20 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-2xl shadow-2xl overflow-hidden">
    <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/30 dark:border-white/5 bg-white/40 dark:bg-white/5">
      <div className="flex items-center gap-1.5">
        <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      </div>
      <div className="flex items-center gap-2 rounded-full border border-emerald-200/50 dark:border-emerald-500/30 bg-emerald-50/80 dark:bg-emerald-500/10 px-3 py-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300">Live Opportunities</span>
      </div>
      <span className="text-[10px] text-slate-400 font-medium">850+ ✦</span>
    </div>
    <div className="p-5 space-y-3">
      <div className="flex items-center gap-2">
        <div className="flex-1 rounded-xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 px-3 py-2">
          <p className="text-[10px] text-slate-400">🔍 Search roles, skills...</p>
        </div>
        <div className="rounded-xl bg-emerald-600 px-3 py-2">
          <p className="text-[10px] font-bold text-white">Filter</p>
        </div>
      </div>
      {[
        { title: "Senior React Developer", startup: "TechVision AI", tag: "Remote", pay: "$120k", color: "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20" },
        { title: "UI/UX Lead Designer", startup: "FinForge", tag: "Hybrid", pay: "$95k", color: "text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-500/10 border-violet-200 dark:border-violet-500/20" },
        { title: "Product Manager", startup: "GrowthLab", tag: "On-site", pay: "$110k", color: "text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20" },
        { title: "Backend Engineer", startup: "CloudBase", tag: "Remote", pay: "$130k", color: "text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20" },
      ].map((j, i) => (
        <div key={i} className="flex items-center gap-3 rounded-2xl border border-slate-100 dark:border-white/5 bg-white/60 dark:bg-white/5 p-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-white/10 dark:to-white/5 flex items-center justify-center font-bold text-sm text-slate-600 dark:text-white shrink-0">
            {j.startup[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-800 dark:text-white truncate">{j.title}</p>
            <p className="text-[9px] text-slate-400">{j.startup}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-lg border ${j.color}`}>{j.tag}</span>
            <span className="text-[9px] font-bold text-slate-600 dark:text-slate-300">{j.pay}</span>
          </div>
        </div>
      ))}
      <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-white/5">
        <p className="text-[10px] text-slate-400"><span className="font-bold text-slate-700 dark:text-white">850+</span> open roles</p>
        <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-500/20">🟢 Updated daily</span>
      </div>
    </div>
  </div>
);

export default function Banner() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 0;
        return prev + 1;
      });
    }, 40);
    const slideTimer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
      setProgress(0);
    }, 4000);
    return () => {
      clearInterval(progressTimer);
      clearInterval(slideTimer);
    };
  }, [current]);

  const slide = slides[current];

  return (
    <section className="relative overflow-hidden min-h-[95vh] flex items-center transition-colors duration-500">

      {/* Premium background — dark navy blue like your navbar */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-[#060d1f] transition-colors duration-500" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-indigo-50/40 to-slate-50 dark:from-[#0a1628]/90 dark:via-[#0d1635]/60 dark:to-[#060d1f] transition-colors duration-500" />

      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.65, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[50%] h-[60%] rounded-full bg-blue-400/25 dark:bg-blue-600/20 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[5%] right-[-5%] w-[45%] h-[65%] rounded-full bg-indigo-400/20 dark:bg-indigo-500/15 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-[-5%] left-[20%] w-[60%] h-[40%] rounded-full bg-violet-400/15 dark:bg-violet-600/10 blur-[100px]"
        />
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f610_1px,transparent_1px),linear-gradient(to_bottom,#3b82f610_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:64px_64px]" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-50 dark:from-[#060d1f] to-transparent" />
      </div>

      <div className="relative z-20 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 w-full">
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* LEFT */}
          <div className="space-y-8">

            <AnimatePresence mode="wait">
              <motion.div
                key={current + "badge"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-3 rounded-full border border-blue-200/60 dark:border-blue-500/20 bg-white/90 dark:bg-blue-500/10 backdrop-blur-xl px-5 py-2.5 text-sm font-semibold text-blue-800 dark:text-blue-300 shadow-lg"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                {slide.badge}
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.h1
                key={current + "heading"}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.5 }}
                className="text-5xl font-extrabold tracking-tighter sm:text-6xl lg:text-7xl leading-[1.1] text-slate-900 dark:text-white"
              >
                {slide.heading}
              </motion.h1>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p
                key={current + "desc"}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-400"
              >
                {slide.desc}
              </motion.p>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Link
                href="/startups"
                className="group relative inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-2">
                  Browse Startups
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                href="/opportunities"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-sm px-8 py-4 text-base font-bold text-slate-700 dark:text-white hover:bg-white dark:hover:bg-white/10 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
              >
                Find Opportunities
                <ArrowRight className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200/60 dark:border-white/8"
            >
              {[
                { icon: <Star className="w-4 h-4 text-amber-500" />, label: "Startups", value: "120+" },
                { icon: <Persons className="w-4 h-4 text-blue-500 dark:text-blue-400" />, label: "Talents", value: "2.4k" },
                { icon: <Briefcase className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />, label: "Jobs", value: "850+" },
              ].map((stat, i) => (
                <div key={i} className="group cursor-default">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-500 mb-1.5">
                    {stat.icon}
                    <span className="text-sm font-semibold">{stat.label}</span>
                  </div>
                  <p className="text-3xl font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {stat.value}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Progress indicators */}
            <div className="flex items-center gap-3 pt-1">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="relative h-1 rounded-full overflow-hidden cursor-pointer transition-all duration-300"
                  style={{ width: i === current ? "48px" : "24px", background: i === current ? "transparent" : "rgba(148,163,184,0.3)" }}
                >
                  {i === current && (
                    <>
                      <div className="absolute inset-0 rounded-full bg-slate-200 dark:bg-white/10" />
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400"
                        style={{ width: `${progress}%` }}
                      />
                    </>
                  )}
                </button>
              ))}
              <span className="text-xs text-slate-400 dark:text-slate-600 ml-1">
                {current + 1} / {slides.length}
              </span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative lg:ml-auto w-full max-w-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 via-indigo-500/10 to-violet-500/15 dark:from-blue-500/20 dark:via-indigo-500/10 dark:to-violet-500/20 blur-3xl rounded-3xl" />
            <AnimatePresence mode="wait">
              <motion.div
                key={current + "mockup"}
                initial={{ opacity: 0, x: 30, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -30, scale: 0.97 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative"
              >
                {slide.mockup === "dashboard" && <DashboardMockup />}
                {slide.mockup === "matching" && <MatchingMockup />}
                {slide.mockup === "opportunities" && <OpportunitiesMockup />}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}