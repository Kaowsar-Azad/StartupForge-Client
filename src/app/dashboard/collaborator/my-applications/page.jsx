"use client";
import PrivateRoute from "@/components/shared/PrivateRoute";

export default function MyApplicationsPage() {
  // TODO: Fetch collaborator's applications from API
  // TODO: Show table with: Opportunity Name, Startup Name, Applied Date, Status (badge)

  return (
    <PrivateRoute allowedRoles={["collaborator"]}>
      <div className="my-applications-page">
        <h1>My Applications</h1>
        {/* TODO: Implement applications list with status badges */}
        <p>Track the status of all your submitted applications.</p>
      </div>
    </PrivateRoute>
  );
}
