"use client";
import PrivateRoute from "@/components/shared/PrivateRoute";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <PrivateRoute>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-slate-950">
        <DashboardSidebar />
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </PrivateRoute>
  );
}
