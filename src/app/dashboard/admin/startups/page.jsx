"use client";
import PrivateRoute from "@/components/shared/PrivateRoute";

export default function AdminStartupsPage() {
  // TODO: Fetch all startups from API
  // TODO: Show table with: Startup Name, Founder, Industry, Status, Approve/Remove buttons

  return (
    <PrivateRoute allowedRoles={["admin"]}>
      <div className="admin-startups-page">
        <h1>Manage Startups</h1>
        {/* TODO: Implement startups table with Approve/Remove actions */}
        <p>Review and moderate startup listings on the platform.</p>
      </div>
    </PrivateRoute>
  );
}
