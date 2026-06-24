"use client";
import { useState, useEffect } from "react";
import PrivateRoute from "@/components/shared/PrivateRoute";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function FounderApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/applications`,
        { withCredentials: true }
      );
      setApplications(res.data);
    } catch (err) {
      console.error("Error fetching applications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusUpdate = async (id, action) => {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/applications/${action}/${id}`,
        {},
        { withCredentials: true }
      );
      toast.success(`Application ${action === "accept" ? "accepted" : "rejected"} successfully!`);
      setApplications((prev) =>
        prev.map((app) => (app._id === id ? { ...app, status: res.data.status } : app))
      );
    } catch (err) {
      toast.error(`Failed to ${action} application`);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <PrivateRoute allowedRoles={["founder"]}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Applications</h1>
          <p className="text-gray-500 dark:text-slate-400 mt-1">
            Review and manage incoming applications for your startup opportunities.
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-8 text-center text-gray-505">
            No applications received yet.
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-55 dark:bg-slate-850 border-b border-gray-100 dark:border-slate-800 text-gray-750 dark:text-slate-300 font-semibold">
                  <th className="p-4 sm:p-5">Applicant</th>
                  <th className="p-4 sm:p-5">Role Applied For</th>
                  <th className="p-4 sm:p-5">Motivation</th>
                  <th className="p-4 sm:p-5">Portfolio</th>
                  <th className="p-4 sm:p-5">Status</th>
                  <th className="p-4 sm:p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                {applications.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50 dark:hover:bg-slate-850/50 transition">
                    <td className="p-4 sm:p-5">
                      <p className="font-semibold text-gray-900 dark:text-white">{app.applicant_email}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Applied: {new Date(app.applied_at).toLocaleDateString()}</p>
                    </td>
                    <td className="p-4 sm:p-5 text-gray-900 dark:text-white font-medium">
                      {app.opportunity_id?.role_title || "Unknown Role"}
                    </td>
                    <td className="p-4 sm:p-5 text-gray-600 dark:text-slate-350 max-w-xs truncate" title={app.motivation}>
                      {app.motivation}
                    </td>
                    <td className="p-4 sm:p-5">
                      {app.portfolio_link ? (
                        <a
                          href={app.portfolio_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline font-medium text-xs bg-blue-50 dark:bg-blue-500/10 dark:text-blue-400 px-2.5 py-1.5 rounded-lg inline-block"
                        >
                          View Portfolio 🔗
                        </a>
                      ) : (
                        <span className="text-gray-400 text-xs">No Link</span>
                      )}
                    </td>
                    <td className="p-4 sm:p-5">
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
                    <td className="p-4 sm:p-5 text-right">
                      {app.status === "pending" ? (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleStatusUpdate(app._id, "accept")}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition cursor-pointer"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(app._id, "reject")}
                            className="bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 font-semibold text-xs px-3.5 py-2 rounded-xl transition cursor-pointer"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">Closed</span>
                      )}
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
