"use client";
import PrivateRoute from "@/components/shared/PrivateRoute";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <PrivateRoute>
      <div className="dashboard-layout">
        <DashboardSidebar />
        <div className="dashboard-content">
          {children}
        </div>
      </div>
    </PrivateRoute>
  );
}
