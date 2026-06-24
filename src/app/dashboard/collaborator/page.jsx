"use client";
import PrivateRoute from "@/components/shared/PrivateRoute";
import StatsCard from "@/components/dashboard/StatsCard";

export default function CollaboratorOverviewPage() {
  // TODO: Fetch collaborator stats - total applications, pending, accepted

  return (
    <PrivateRoute allowedRoles={["collaborator"]}>
      <div className="dashboard-overview">
        <h1>Collaborator Dashboard</h1>
        <div className="stats-grid">
          <StatsCard title="Total Applications" value={0} icon="📋" color="#6366f1" />
          <StatsCard title="Pending" value={0} icon="⏳" color="#f59e0b" />
          <StatsCard title="Accepted" value={0} icon="✅" color="#22c55e" />
        </div>
      </div>
    </PrivateRoute>
  );
}
