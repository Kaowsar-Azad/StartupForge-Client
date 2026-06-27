"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth";
import axios from "axios";
import { toast } from "react-toastify";
import {
  ChartPie,
  Rocket,
  Plus,
  Briefcase,
  FileText,
  Envelope,
  Person,
  Persons,
  LayoutCellsLarge,
  CircleDollar,
  ArrowRightFromSquare
} from "@gravity-ui/icons";

const apiBase =
  typeof window !== "undefined" &&
  !(process.env.NEXT_PUBLIC_API_URL || "").includes("localhost")
    ? ""
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const founderLinks = [
  { href: "/dashboard/founder", label: "Overview", icon: ChartPie },
  { href: "/dashboard/founder/my-startup", label: "My Startup", icon: Rocket },
  { href: "/dashboard/founder/add-opportunity", label: "Add Opportunity", icon: Plus },
  { href: "/dashboard/founder/manage-opportunities", label: "Manage Opportunities", icon: Briefcase },
  { href: "/dashboard/founder/applications", label: "Applications", icon: FileText },
];

const collaboratorLinks = [
  { href: "/dashboard/collaborator", label: "Overview", icon: ChartPie },
  { href: "/dashboard/collaborator/my-applications", label: "My Applications", icon: Envelope },
  { href: "/dashboard/collaborator/profile", label: "Profile", icon: Person },
];

const adminLinks = [
  { href: "/dashboard/admin", label: "Overview", icon: ChartPie },
  { href: "/dashboard/admin/users", label: "Manage Users", icon: Persons },
  { href: "/dashboard/admin/startups", label: "Manage Startups", icon: LayoutCellsLarge },
  { href: "/dashboard/admin/transactions", label: "Transactions", icon: CircleDollar },
];

export default function DashboardSidebar() {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const links =
    user?.role === "admin"
      ? adminLinks
      : user?.role === "founder"
      ? founderLinks
      : collaboratorLinks;

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
      toast.error("Logout failed");
    }
  };

  return (
    <aside className="w-full md:w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 flex flex-col min-h-screen transition-colors duration-300">
      {/* User Info Header */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col items-center gap-3">
        <img
          src={user?.image || "/default-avatar.png"}
          alt={user?.name}
          className="w-20 h-20 rounded-full border-2 border-blue-500 object-cover shadow-lg"
        />
        <div className="text-center">
          <p className="text-slate-900 dark:text-white font-semibold text-lg">{user?.name}</p>
          <p className="text-slate-600 dark:text-slate-400 text-xs mt-0.5 capitalize bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full inline-block">
            {user?.role}
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/10"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-950 dark:hover:text-white"
              }`}
            >
              <Icon className="text-lg w-5 h-5 shrink-0" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout button at bottom */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 dark:text-red-400 rounded-xl text-sm font-medium transition cursor-pointer"
        >
          <ArrowRightFromSquare className="w-4 h-4 shrink-0" /> Logout
        </button>
      </div>
    </aside>
  );
}
