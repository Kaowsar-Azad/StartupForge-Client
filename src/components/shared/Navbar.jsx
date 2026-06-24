"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white">
          StartupForge
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-slate-300 hover:text-white">
            Home
          </Link>

          <Link
            href="/startups"
            className="text-slate-300 hover:text-white"
          >
            Browse Startups
          </Link>

          <Link
            href="/opportunities"
            className="text-slate-300 hover:text-white"
          >
            Opportunities
          </Link>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white hover:bg-white/10"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
          >
            Register
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white md:hidden"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-white/10 bg-slate-950 md:hidden">
          <div className="flex flex-col px-4 py-4">
            <Link href="/" className="py-2 text-slate-300">
              Home
            </Link>

            <Link href="/startups" className="py-2 text-slate-300">
              Browse Startups
            </Link>

            <Link href="/opportunities" className="py-2 text-slate-300">
              Opportunities
            </Link>

            <Link href="/login" className="py-2 text-slate-300">
              Login
            </Link>

            <Link href="/register" className="py-2 text-slate-300">
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}