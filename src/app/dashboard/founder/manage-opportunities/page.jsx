"use client";
import PrivateRoute from "@/components/shared/PrivateRoute";

export default function ManageOpportunitiesPage() {
  // TODO: Fetch founder's opportunities from API
  // TODO: Show table with View, Edit, Delete actions

  return (
    <PrivateRoute allowedRoles={["founder"]}>
      <div className="manage-opportunities-page">
        <h1>Manage Opportunities</h1>
        {/* TODO: Implement opportunities table with CRUD actions */}
        <p>View, update, or delete your posted opportunities.</p>
      </div>
    </PrivateRoute>
  );
}
