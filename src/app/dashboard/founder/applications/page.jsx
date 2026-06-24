"use client";
import PrivateRoute from "@/components/shared/PrivateRoute";

export default function FounderApplicationsPage() {
  // TODO: Fetch all applications for founder's opportunities
  // TODO: Show table with applicant info, motivation, portfolio link
  // TODO: Accept / Reject buttons to update application status

  return (
    <PrivateRoute allowedRoles={["founder"]}>
      <div className="founder-applications-page">
        <h1>Applications</h1>
        {/* TODO: Implement applications table with Accept/Reject actions */}
        <p>Review and manage applications for your opportunities.</p>
      </div>
    </PrivateRoute>
  );
}
