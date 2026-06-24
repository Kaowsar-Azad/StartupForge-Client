"use client";
import PrivateRoute from "@/components/shared/PrivateRoute";

export default function MyStartupPage() {
  // TODO: Fetch founder's startup from API
  // TODO: If no startup, show Create Startup form
  // TODO: If startup exists, show startup details with Edit/Delete options
  // Fields: startup_name, logo (imgbb upload), industry, description, funding_stage, founder_email

  return (
    <PrivateRoute allowedRoles={["founder"]}>
      <div className="my-startup-page">
        <h1>My Startup</h1>
        {/* TODO: Implement Create/View/Edit/Delete Startup UI */}
        <p>Manage your startup profile here.</p>
      </div>
    </PrivateRoute>
  );
}
