"use client";
import PrivateRoute from "@/components/shared/PrivateRoute";

export default function ProfilePage() {
  // TODO: Shared profile page accessible from navbar
  // Shows user info and redirects to role-specific profile update

  return (
    <PrivateRoute>
      <div className="profile-page">
        <h1>My Profile</h1>
        {/* TODO: Implement profile view and edit UI */}
      </div>
    </PrivateRoute>
  );
}
