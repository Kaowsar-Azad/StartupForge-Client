"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Main dashboard redirect page - sends user to role-specific dashboard
export default function DashboardRedirectPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      if (user.role === "admin") router.replace("/dashboard/admin");
      else if (user.role === "founder") router.replace("/dashboard/founder");
      else router.replace("/dashboard/collaborator");
    }
  }, [user, loading, router]);

  return (
    <div className="dashboard-redirect">
      <p>Redirecting to your dashboard...</p>
    </div>
  );
}
