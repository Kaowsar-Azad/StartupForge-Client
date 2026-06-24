"use client";

import PrivateRoute from "@/components/shared/PrivateRoute";
import StatsCard from "@/components/dashboard/StatsCard";
import { Person, Rocket, Briefcase, Palette } from "@gravity-ui/icons";

export default function AdminOverviewPage() {
  // TODO: Fetch admin stats - total users, startups, opportunities, total revenue

  return (
    <PrivateRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
        <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8 relative">
          {/* Header Section */}
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-violet-400">
                Admin Dashboard
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2 text-base">
                Platform overview and statistics.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Users"
              value={0}
              icon={<Person />}
              color="#6366f1"
            />
            <StatsCard
              title="Total Startups"
              value={0}
              icon={<Rocket />}
              color="#22c55e"
            />
            <StatsCard
              title="Total Opportunities"
              value={0}
              icon={<Briefcase />}
              color="#f59e0b"
            />
            <StatsCard
              title="Total Revenue"
              value="$0"
              icon={<Palette />}
              color="#ec4899"
            />
          </div>

         
          <div className="mt-8 rounded-[32px] border border-white/20 bg-white/80 backdrop-blur-xl p-8 shadow-2xl dark:bg-slate-900/80 dark:border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Analytics Overview
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                  Revenue and activity insights will appear here.
                </p>
              </div>
            </div>

            <div className="h-72 flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-blue-50 dark:border-slate-700 dark:from-slate-950 dark:to-slate-900">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
                Analytics Coming Soon
              </h3>
              <p className="mt-2 text-slate-500 dark:text-slate-400 text-center max-w-md">
                Revenue and activity charts will be added here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}