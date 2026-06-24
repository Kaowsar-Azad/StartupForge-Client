"use client";
import { useState, useEffect } from "react";
import PrivateRoute from "@/components/shared/PrivateRoute";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function ManageOpportunitiesPage() {
  const { user } = useAuth();
  const [startup, setStartup] = useState(null);
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit form modal/state
  const [editingOpp, setEditingOpp] = useState(null);
  const [roleTitle, setRoleTitle] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [workType, setWorkType] = useState("");
  const [commitmentLevel, setCommitmentLevel] = useState("");
  const [deadline, setDeadline] = useState("");
  const [updating, setUpdating] = useState(false);

  const fetchOpportunities = async () => {
    if (!user?.email) return;
    try {
      const startupRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/startups/founder/${user.email}`,
        { withCredentials: true }
      );
      setStartup(startupRes.data);

      if (startupRes.data?._id) {
        const oppsRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/opportunities/startup/${startupRes.data._id}`,
          { withCredentials: true }
        );
        setOpportunities(oppsRes.data);
      }
    } catch (err) {
      if (err.response?.status !== 404) {
        console.error("Error fetching opportunities:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this opportunity?")) return;
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/opportunities/${id}`,
        { withCredentials: true }
      );
      toast.success("Opportunity deleted successfully");
      setOpportunities((prev) => prev.filter((opp) => opp._id !== id));
    } catch (err) {
      toast.error("Failed to delete opportunity");
    }
  };

  const handleEditClick = (opp) => {
    setEditingOpp(opp);
    setRoleTitle(opp.role_title);
    setRequiredSkills(opp.required_skills);
    setWorkType(opp.work_type);
    setCommitmentLevel(opp.commitment_level);
    setDeadline(opp.deadline ? opp.deadline.split("T")[0] : "");
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const payload = {
        role_title: roleTitle,
        required_skills: requiredSkills,
        work_type: workType,
        commitment_level: commitmentLevel,
        deadline,
      };

      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/opportunities/${editingOpp._id}`,
        payload,
        { withCredentials: true }
      );

      toast.success("Opportunity updated successfully! 🎉");
      setOpportunities((prev) =>
        prev.map((opp) => (opp._id === editingOpp._id ? res.data : opp))
      );
      setEditingOpp(null);
    } catch (err) {
      toast.error("Failed to update opportunity");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <PrivateRoute allowedRoles={["founder"]}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Opportunities</h1>
          <p className="text-gray-500 dark:text-slate-400 mt-1">
            View, edit, or delete the team roles you have posted.
          </p>
        </div>

        {!startup ? (
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl dark:bg-slate-900 dark:border-slate-800 text-amber-900 dark:text-white">
            Register your startup profile first.
          </div>
        ) : opportunities.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-8 text-center text-gray-500">
            No opportunities posted yet.
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-55 dark:bg-slate-850 border-b border-gray-100 dark:border-slate-800 text-gray-700 dark:text-slate-305 font-semibold">
                  <th className="p-4 sm:p-5">Role Title</th>
                  <th className="p-4 sm:p-5">Work Type</th>
                  <th className="p-4 sm:p-5">Commitment</th>
                  <th className="p-4 sm:p-5">Deadline</th>
                  <th className="p-4 sm:p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                {opportunities.map((opp) => (
                  <tr key={opp._id} className="hover:bg-gray-50 dark:hover:bg-slate-850/50 transition">
                    <td className="p-4 sm:p-5 font-semibold text-gray-900 dark:text-white">{opp.role_title}</td>
                    <td className="p-4 sm:p-5 text-gray-600 dark:text-slate-300">{opp.work_type}</td>
                    <td className="p-4 sm:p-5 text-gray-600 dark:text-slate-300">{opp.commitment_level}</td>
                    <td className="p-4 sm:p-5 text-gray-600 dark:text-slate-300">
                      {opp.deadline ? new Date(opp.deadline).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="p-4 sm:p-5 text-right flex justify-end gap-3">
                      <button
                        onClick={() => handleEditClick(opp)}
                        className="text-blue-600 hover:text-blue-500 font-medium cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(opp._id)}
                        className="text-red-500 hover:text-red-400 font-medium cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Edit Modal Dialog */}
        {editingOpp && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-xl">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Edit Opportunity</h2>
              <form onSubmit={handleUpdateSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase tracking-wider mb-2">Role Title *</label>
                  <input
                    type="text"
                    required
                    value={roleTitle}
                    onChange={(e) => setRoleTitle(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 px-4 py-3 text-gray-900 dark:text-white text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase tracking-wider mb-2">Required Skills *</label>
                  <input
                    type="text"
                    required
                    value={requiredSkills}
                    onChange={(e) => setRequiredSkills(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 px-4 py-3 text-gray-900 dark:text-white text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase tracking-wider mb-2">Work Type *</label>
                    <select
                      required
                      value={workType}
                      onChange={(e) => setWorkType(e.target.value)}
                      className="w-full rounded-xl border border-gray-300 dark:border-slate-805 bg-gray-50 dark:bg-slate-900 px-4 py-3 text-gray-900 dark:text-white text-sm outline-none focus:border-blue-500"
                    >
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Onsite">Onsite</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase tracking-wider mb-2">Commitment *</label>
                    <select
                      required
                      value={commitmentLevel}
                      onChange={(e) => setCommitmentLevel(e.target.value)}
                      className="w-full rounded-xl border border-gray-300 dark:border-slate-805 bg-gray-50 dark:bg-slate-900 px-4 py-3 text-gray-900 dark:text-white text-sm outline-none focus:border-blue-500"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase tracking-wider mb-2">Deadline *</label>
                  <input
                    type="date"
                    required
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 px-4 py-3 text-gray-900 dark:text-white text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={updating}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-2.5 rounded-xl transition text-sm disabled:bg-blue-400 cursor-pointer"
                  >
                    {updating ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingOpp(null)}
                    className="border border-gray-300 dark:border-slate-800 text-gray-700 dark:text-slate-350 font-medium px-5 py-2.5 rounded-xl transition text-sm cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </PrivateRoute>
  );
}
