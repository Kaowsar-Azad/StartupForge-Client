"use client";
import PrivateRoute from "@/components/shared/PrivateRoute";
import StatsCard from "@/components/dashboard/StatsCard";

export default function FounderOverviewPage() {
  // TODO: Fetch stats - total opportunities, total applications, accepted members

  return (
    <PrivateRoute allowedRoles={["founder"]}>
      <div className="dashboard-overview">
        <h1>Founder Dashboard</h1>
        <div className="stats-grid">
          <StatsCard title="Total Opportunities" value={0} icon="💼" color="#6366f1" />
          <StatsCard title="Total Applications" value={0} icon="📋" color="#22c55e" />
          <StatsCard title="Accepted Members" value={0} icon="✅" color="#f59e0b" />
        </div>
        {/* TODO: Add analytics chart here using recharts */}
      </div>
    </PrivateRoute>
  );
}
