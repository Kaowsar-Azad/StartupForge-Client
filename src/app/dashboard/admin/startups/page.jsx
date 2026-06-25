"use client";
import { useState, useEffect } from "react";
import PrivateRoute from "@/components/shared/PrivateRoute";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Check, Xmark, Briefcase } from "@gravity-ui/icons";

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
      <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6 sm:space-y-8">
        
        {/* Header Section */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Manage Startups
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-slate-400 mt-2">
            Review and moderate startup registrations on the platform.
          </p>
        </div>

        {startups.length === 0 ? (
          /* ================= EMPTY STATE ================= */
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-12 text-center shadow-sm flex flex-col items-center justify-center">
            <div className="bg-gray-100 dark:bg-slate-800 p-4 rounded-full mb-4 text-gray-400 dark:text-slate-500">
              <Briefcase width={32} height={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">No Startups Found</h3>
            <p className="text-gray-500 dark:text-slate-400 text-sm">There are currently no startup registrations to review.</p>
          </div>
        ) : (
          /* ================= TABLE STATE (NO SCROLLBAR) ================= */
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl shadow-sm overflow-hidden w-full">
            <table className="w-full text-left border-collapse text-sm table-auto">
              <thead>
                <tr className="bg-gray-50 dark:bg-slate-800/50 border-b border-gray-200 dark:border-slate-800 text-gray-700 dark:text-slate-300 font-semibold tracking-wide">
                  <th className="p-4 sm:p-5">Startup</th>
                  <th className="p-4 sm:p-5">Founder</th>
                  <th className="p-4 sm:p-5">Industry</th>
                  <th className="p-4 sm:p-5">Funding</th>
                  <th className="p-4 sm:p-5">Status</th>
                  <th className="p-4 sm:p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800/80">
                {startups.map((s) => (
                  <tr key={s._id} className="hover:bg-gray-50/80 dark:hover:bg-slate-800/30 transition-colors duration-200">
                    
                    {/* Startup Info */}
                    <td className="p-4 sm:p-5 align-middle">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <img
                          src={s.logo || "/default-startup.png"}
                          alt={s.startup_name}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover border border-gray-200 dark:border-slate-700 shadow-sm shrink-0"
                        />
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-900 dark:text-white text-base leading-tight mb-1 break-words">
                            {s.startup_name}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-slate-400 line-clamp-2" title={s.description}>
                            {s.description}
                          </span>
                        </div>
                      </div>
                    </td>
                    
                    {/* Founder */}
                    <td className="p-4 sm:p-5 align-middle text-gray-600 dark:text-slate-300 font-medium break-all">
                      {s.founder_email}
                    </td>
                    
                    {/* Industry */}
                    <td className="p-4 sm:p-5 align-middle text-gray-600 dark:text-slate-300">
                      <span className="line-clamp-2 leading-relaxed break-words">
                        {s.industry}
                      </span>
                    </td>
                    
                    {/* Funding Stage */}
                    <td className="p-4 sm:p-5 align-middle text-gray-600 dark:text-slate-300 font-medium whitespace-normal">
                      {s.funding_stage}
                    </td>
                    
                    {/* Status Badge */}
                    <td className="p-4 sm:p-5 align-middle">
                      <span className={`inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-bold tracking-wide capitalize shadow-sm border ${
                        s.status === "approved"
                          ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20"
                          : s.status === "rejected"
                          ? "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/20"
                          : "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20"
                      }`}>
                        {s.status}
                      </span>
                    </td>
                    
                    {/* Actions */}
                    <td className="p-4 sm:p-5 align-middle text-right">
                      {s.status === "pending" ? (
                        <div className="flex justify-end items-center gap-2 flex-wrap">
                          <button
                            onClick={() => handleUpdateStatus(s._id, "approve")}
                            className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs px-3.5 py-2 rounded-lg transition-all shadow-sm active:scale-95"
                            title="Approve"
                          >
                            <Check width={14} height={14} />
                            Approve
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(s._id, "reject")}
                            className="flex items-center gap-1.5 bg-red-50 dark:bg-red-500/10 hover:bg-red-500 hover:text-white text-red-600 dark:text-red-400 font-semibold text-xs px-3.5 py-2 rounded-lg transition-all border border-red-200 dark:border-transparent active:scale-95"
                            title="Reject"
                          >
                            <Xmark width={14} height={14} />
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400 dark:text-slate-500 text-sm font-medium italic">
                          Reviewed
                        </span>
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