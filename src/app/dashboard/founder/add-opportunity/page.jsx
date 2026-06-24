"use client";
import PrivateRoute from "@/components/shared/PrivateRoute";

export default function AddOpportunityPage() {
  // TODO: Check if founder has > 3 opportunities -> show premium payment prompt
  // TODO: Otherwise show form with fields:
  // role_title, required_skills (tags input), work_type, commitment_level, deadline

  return (
    <PrivateRoute allowedRoles={["founder"]}>
      <div className="add-opportunity-page">
        <h1>Add Opportunity</h1>
        {/* TODO: Implement Add Opportunity form */}
        {/* TODO: Premium gate - after 3 free posts, require Stripe payment */}
        <p>Post a new role for your startup team.</p>
      </div>
    </PrivateRoute>
  );
}
