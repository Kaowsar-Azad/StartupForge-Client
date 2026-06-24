"use client";
import PrivateRoute from "@/components/shared/PrivateRoute";

export default function AdminUsersPage() {
  // TODO: Fetch all users from API
  // TODO: Show table with: Name, Email, Role, Status, Block/Unblock button

  return (
    <PrivateRoute allowedRoles={["admin"]}>
      <div className="admin-users-page">
        <h1>Manage Users</h1>
        {/* TODO: Implement users table with Block/Unblock actions */}
        <p>View and manage all registered users.</p>
      </div>
    </PrivateRoute>
  );
}
