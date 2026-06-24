"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // এটি ইমপোর্ট করা হয়েছে

export default function Footer() {
  const pathname = usePathname(); // বর্তমান রুট পাওয়ার জন্য

  // যেসব রুটে Footer দেখাতে চান না, সেগুলোর লিস্ট
  const hiddenRoutes = ["/login", "/register"];

  // কারেন্ট রুট যদি লিস্টের মধ্যে থাকে, তাহলে Footer হাইড হয়ে যাবে
  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  return (
    <footer className="border-t border-white/10 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="text-2xl font-bold text-white">
              StartupForge
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
              Connecting founders with collaborators to build startup teams,
              explore opportunities, and grow together.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/startups" className="hover:text-white">
                  Browse Startups
                </Link>
              </li>
              <li>
                <Link href="/opportunities" className="hover:text-white">
                  Browse Opportunities
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Social Links
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li>
                <a href="#" className="hover:text-white">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Twitter / X
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Contact Info
            </h3>
            <div className="mt-4 space-y-3 text-sm text-slate-400">
              <p>Email: support@startupforge.com</p>
              <p>Phone: +880 1XXXXXXXXX</p>
              <p>Location: Bangladesh</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} StartupForge. All rights reserved.
        </div>
      </div>
    </footer>
  );
}