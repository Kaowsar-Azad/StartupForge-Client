"use client";
import { useState, useEffect } from "react";
import PrivateRoute from "@/components/shared/PrivateRoute";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function AdminStartupsPage() {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStartups = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/startups/admin/all`,
        { withCredentials: true }
      );
      setStartups(res.data);
    } catch (err) {
      console.error("Error fetching startups:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStartups();
  }, []);

  const handleUpdateStatus = async (id, action) => {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/startups/${action}/${id}`,
        {},
        { withCredentials: true }
      );
      toast.success(`Startup ${action === "approve" ? "approved" : "rejected"} successfully!`);
      setStartups((prev) =>
        prev.map((s) => (s._id === id ? { ...s, status: res.data.status } : s))
      );
    } catch (err) {
      toast.error(`Failed to ${action} startup`);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <PrivateRoute allowedRoles={["admin"]}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Startups</h1>
          <p className="text-gray-500 dark:text-slate-400 mt-1">
            Review and moderate startup registrations on the platform.
          </p>
        </div>

        {startups.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-8 text-center text-gray-500">
            No startups registered yet.
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-55 dark:bg-slate-850 border-b border-gray-100 dark:border-slate-800 text-gray-750 dark:text-slate-300 font-semibold">
                  <th className="p-4 sm:p-5">Startup</th>
                  <th className="p-4 sm:p-5">Founder</th>
                  <th className="p-4 sm:p-5">Industry</th>
                  <th className="p-4 sm:p-5">Funding</th>
                  <th className="p-4 sm:p-5">Status</th>
                  <th className="p-4 sm:p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                {startups.map((s) => (
                  <tr key={s._id} className="hover:bg-gray-55 dark:hover:bg-slate-850/50 transition">
                    <td className="p-4 sm:p-5 flex items-center gap-3">
                      <img
                        src={s.logo || "/default-startup.png"}
                        alt={s.startup_name}
                        className="w-10 h-10 rounded-xl object-cover border border-gray-200 dark:border-slate-800"
                      />
                      <div>
                        <span className="font-semibold text-gray-900 dark:text-white block">{s.startup_name}</span>
                        <span className="text-xs text-gray-400 max-w-[200px] truncate block" title={s.description}>
                          {s.description}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-gray-650 dark:text-slate-300">{s.founder_email}</td>
                    <td className="p-4 sm:p-5 text-gray-655 dark:text-slate-300">{s.industry}</td>
                    <td className="p-4 sm:p-5 text-gray-655 dark:text-slate-300">{s.funding_stage}</td>
                    <td className="p-4 sm:p-5">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${
                        s.status === "approved"
                          ? "bg-emerald-500/10 text-emerald-500"
                          : s.status === "rejected"
                          ? "bg-red-500/10 text-red-500"
                          : "bg-amber-500/10 text-amber-500"
                      }`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="p-4 sm:p-5 text-right">
                      {s.status === "pending" && (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleUpdateStatus(s._id, "approve")}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-3 py-1.5 rounded-lg transition cursor-pointer"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(s._id, "reject")}
                            className="bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 font-semibold text-xs px-3 py-1.5 rounded-lg transition cursor-pointer"
                          >
                            Reject
                          </button>
                        </div>
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
