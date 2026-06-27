"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { authClient } from "@/lib/auth";
import axios from "axios";
import { toast } from "react-toastify";
import ThemeSwitcher from "./ThemeSwitcher";

const apiBase =
  typeof window !== "undefined" &&
  !(process.env.NEXT_PUBLIC_API_URL || "").includes("localhost")
    ? ""
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();

  const hiddenRoutes = ["/login", "/register"];

  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await axios.post(
        `${apiBase}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      await authClient.signOut();
      toast.success("Logged out successfully 🎉");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 dark:border-white/10 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-slate-900 dark:text-white tracking-wide">
          Startup<span className="text-blue-500">Forge</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className={`text-sm font-medium transition ${pathname === "/" ? "text-blue-600 dark:text-blue-400" : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}>
            Home
          </Link>
          <Link href="/startups" className={`text-sm font-medium transition ${pathname.startsWith("/startups") ? "text-blue-600 dark:text-blue-400" : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}>
            Browse Startups
          </Link>
          <Link href="/opportunities" className={`text-sm font-medium transition ${pathname.startsWith("/opportunities") ? "text-blue-600 dark:text-blue-400" : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}>
            Opportunities
          </Link>
          {isAuthenticated && (
            <>
              <Link href="/dashboard" className={`text-sm font-medium transition ${pathname.startsWith("/dashboard") ? "text-blue-600 dark:text-blue-400" : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}>
                Dashboard
              </Link>
              <Link href="/profile" className={`text-sm font-medium transition ${pathname === "/profile" ? "text-blue-600 dark:text-blue-400" : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}>
                Profile
              </Link>
            </>
          )}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-4 md:flex">
          <ThemeSwitcher />
          {loading ? (
            <span className="text-slate-400 text-sm">Loading...</span>
          ) : isAuthenticated ? (
            <div className="flex items-center gap-4 ml-2">
              <div className="flex items-center gap-2">
                <img
                  src={user?.image || "/default-avatar.png"}
                  alt={user?.name || "User"}
                  className="w-8 h-8 rounded-full border border-blue-500 object-cover"
                />
                <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-2 text-sm text-danger hover:bg-danger hover:text-white transition cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 ml-2">
              <Link
                href="/login"
                className="rounded-xl border border-slate-200 dark:border-white/10 px-4 py-2 text-sm text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Button */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeSwitcher />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-800 dark:text-white hover:text-blue-500 transition text-2xl focus:outline-none"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-slate-200 dark:border-white/10 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur md:hidden">
          <div className="flex flex-col px-4 py-4 gap-2">
            <Link href="/" onClick={() => setIsOpen(false)} className={`py-2 text-sm transition ${pathname === "/" ? "text-blue-600 dark:text-blue-400" : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}>
              Home
            </Link>
            <Link href="/startups" onClick={() => setIsOpen(false)} className={`py-2 text-sm transition ${pathname.startsWith("/startups") ? "text-blue-600 dark:text-blue-400" : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}>
              Browse Startups
            </Link>
            <Link href="/opportunities" onClick={() => setIsOpen(false)} className={`py-2 text-sm transition ${pathname.startsWith("/opportunities") ? "text-blue-600 dark:text-blue-400" : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}>
              Opportunities
            </Link>
            {isAuthenticated && (
              <>
                <Link href="/dashboard" onClick={() => setIsOpen(false)} className={`py-2 text-sm transition ${pathname.startsWith("/dashboard") ? "text-blue-600 dark:text-blue-400" : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}>
                  Dashboard
                </Link>
                <Link href="/profile" onClick={() => setIsOpen(false)} className={`py-2 text-sm transition ${pathname === "/profile" ? "text-blue-600 dark:text-blue-400" : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}>
                  Profile
                </Link>
              </>
            )}
            
            <div className="border-t border-slate-200 dark:border-white/10 my-2 pt-2">
              {isAuthenticated ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={user?.image || "/default-avatar.png"}
                      alt={user?.name || "User"}
                      className="w-8 h-8 rounded-full border border-blue-500 object-cover"
                    />
                    <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">{user?.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-center rounded-xl bg-danger py-2 text-sm font-medium text-white hover:bg-danger-600 transition cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center rounded-xl border border-slate-200 dark:border-white/10 py-2 text-sm text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center rounded-xl bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-500 transition"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}