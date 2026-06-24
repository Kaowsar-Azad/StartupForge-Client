"use client";
import { useState, useEffect } from "react";
import PrivateRoute from "@/components/shared/PrivateRoute";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function MyApplicationsPage() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user?.email) return;
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/applications/my/${user.email}`,
          { withCredentials: true }
        );
        setApplications(res.data);
      } catch (err) {
        console.error("Error fetching applications:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, [user]);

  if (loading) return <LoadingSpinner />;

  return (
    <PrivateRoute allowedRoles={["collaborator"]}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Applications</h1>
          <p className="text-gray-500 dark:text-slate-400 mt-1">
            Track all team opportunities you have applied to.
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-8 text-center text-gray-500">
            You haven't applied to any opportunities yet.
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-850 rounded-3xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-55 dark:bg-slate-850 border-b border-gray-100 dark:border-slate-800 text-gray-750 dark:text-slate-300 font-semibold">
                  <th className="p-4 sm:p-5">Opportunity & Startup</th>
                  <th className="p-4 sm:p-5">Applied Date</th>
                  <th className="p-4 sm:p-5">Motivation</th>
                  <th className="p-4 sm:p-5">Portfolio Link</th>
                  <th className="p-4 sm:p-5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                {applications.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-55 dark:hover:bg-slate-850/50 transition">
                    <td className="p-4 sm:p-5">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {app.opportunity_id?.role_title || "Unknown Role"}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {app.opportunity_id?.startup_id?.startup_name || "Unknown Startup"}
                      </p>
                    </td>
                    <td className="p-4 sm:p-5 text-gray-600 dark:text-slate-305">
                      {new Date(app.applied_at).toLocaleDateString()}
                    </td>
                    <td className="p-4 sm:p-5 text-gray-600 dark:text-slate-305 max-w-xs truncate" title={app.motivation}>
                      {app.motivation}
                    </td>
                    <td className="p-4 sm:p-5">
                      {app.portfolio_link ? (
                        <a
                          href={app.portfolio_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-450 hover:underline font-medium text-xs"
                        >
                          View Link 🔗
                        </a>
                      ) : (
                        <span className="text-gray-400 text-xs">None</span>
                      )}
                    </td>
                    <td className="p-4 sm:p-5 text-right">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${
                        app.status === "accepted"
                          ? "bg-emerald-500/10 text-emerald-500"
                          : app.status === "rejected"
                          ? "bg-red-500/10 text-red-500"
                          : "bg-amber-500/10 text-amber-500"
                      }`}>
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PrivateRoute>
  );
}
