"use client";
import PrivateRoute from "@/components/shared/PrivateRoute";
import StatsCard from "@/components/dashboard/StatsCard";

export default function AdminOverviewPage() {
  // TODO: Fetch admin stats - total users, startups, opportunities, total revenue

  return (
    <PrivateRoute allowedRoles={["admin"]}>
      <div className="dashboard-overview">
        <h1>Admin Dashboard</h1>
        <div className="stats-grid">
          <StatsCard title="Total Users" value={0} icon="👥" color="#6366f1" />
          <StatsCard title="Total Startups" value={0} icon="🚀" color="#22c55e" />
          <StatsCard title="Total Opportunities" value={0} icon="💼" color="#f59e0b" />
          <StatsCard title="Total Revenue" value="$0" icon="💰" color="#ec4899" />
        </div>
        {/* TODO: Add revenue/activity charts using recharts */}
      </div>
    </PrivateRoute>
  );
}
