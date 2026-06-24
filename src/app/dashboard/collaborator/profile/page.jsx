"use client";
import PrivateRoute from "@/components/shared/PrivateRoute";

export default function CollaboratorProfilePage() {
  // TODO: Fetch user profile from API
  // TODO: Update form with fields: Name, Image (imgbb upload), Skills (tags input), Bio

  return (
    <PrivateRoute allowedRoles={["collaborator"]}>
      <div className="collaborator-profile-page">
        <h1>My Profile</h1>
        {/* TODO: Implement profile update form */}
        <p>Update your name, image, skills, and bio.</p>
      </div>
    </PrivateRoute>
  );
}
