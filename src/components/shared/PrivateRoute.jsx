"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

// Protects routes - redirects to login if not authenticated
export default function PrivateRoute({ children, allowedRoles = [] }) {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (user?.role === "unassigned" && pathname !== "/onboarding") {
        router.push("/onboarding"); // Force onboarding
      } else if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
        router.push("/dashboard"); // Redirect to dashboard if wrong role
      }
    }
  }, [isAuthenticated, loading, user, router, allowedRoles, pathname]);

  if (loading) return <LoadingSpinner />;
  if (!isAuthenticated) return null;
  if (user?.role === "unassigned" && pathname !== "/onboarding") return null;
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) return null;

  return children;
}
