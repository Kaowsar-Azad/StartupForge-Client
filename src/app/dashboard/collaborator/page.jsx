"use client";
import { useState, useEffect } from "react";
import PrivateRoute from "@/components/shared/PrivateRoute";
import StatsCard from "@/components/dashboard/StatsCard";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import Link from "next/link";

export default function CollaboratorOverviewPage() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.email) return;
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/applications/my/${user.email}`,
          { withCredentials: true }
        );
        setApplications(res.data);
      } catch (err) {
        console.error("Error fetching collaborator stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [user]);

  if (loading) return <LoadingSpinner />;

  const totalApps = applications.length;
  const pendingApps = applications.filter((app) => app.status === "pending").length;
  const acceptedApps = applications.filter((app) => app.status === "accepted").length;

  return (
    <PrivateRoute allowedRoles={["collaborator"]}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Collaborator Dashboard</h1>
          <p className="text-gray-500 dark:text-slate-400 mt-1">
            Track your applications and match suggestions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard title="Total Applications" value={totalApps} icon="📋" color="#3b82f6" />
          <StatsCard title="Pending" value={pendingApps} icon="⏳" color="#f59e0b" />
          <StatsCard title="Accepted" value={acceptedApps} icon="✅" color="#10b981" />
        </div>

        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">My Applications</h2>
          {applications.length === 0 ? (
            <div className="py-6 text-center">
              <p className="text-gray-500 dark:text-slate-400 text-sm">You haven't applied to any opportunities yet.</p>
              <Link
                href="/opportunities"
                className="mt-3 inline-block bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition cursor-pointer"
              >
                Browse Opportunities
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-slate-800">
              {applications.slice(0, 5).map((app) => (
                <div key={app._id} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                      {app.opportunity_id?.role_title || "Unknown Role"}
                    </p>
                    <p className="text-xs text-gray-505 dark:text-slate-400 mt-0.5">
                      Startup: {app.opportunity_id?.startup_id?.startup_name || "Unknown"}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${
                      app.status === "accepted"
                        ? "bg-emerald-500/10 text-emerald-500"
                        : app.status === "rejected"
                        ? "bg-red-500/10 text-red-500"
                        : "bg-amber-500/10 text-amber-500"
                    }`}>
                      {app.status}
                    </span>
                    <Link
                      href="/dashboard/collaborator/my-applications"
                      className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium cursor-pointer"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PrivateRoute>
  );
}
