"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // List of routes where Footer should be hidden
  const hiddenRoutes = ["/login", "/register"];

  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  return (
    <footer className="border-t border-slate-200/80 dark:border-white/10 bg-slate-100 dark:bg-slate-950 text-foreground transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="text-2xl font-bold text-slate-900 dark:text-white">
              StartupForge
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-400">
              Connecting founders with collaborators to build startup teams,
              explore opportunities, and grow together.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-200">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/startups" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Browse Startups
                </Link>
              </li>
              <li>
                <Link href="/opportunities" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Browse Opportunities
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-200">
              Social Links
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Twitter / X
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-200">
              Contact Info
            </h3>
            <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <p>Email: support@startupforge.com</p>
              <p>Phone: +880 1XXXXXXXXX</p>
              <p>Location: Bangladesh</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 dark:border-white/10 pt-6 text-center text-sm text-default-400">
          © {new Date().getFullYear()} StartupForge. All rights reserved.
        </div>
      </div>
    </footer>
  );
}