"use client";
import { useState, useEffect } from "react";
import PrivateRoute from "@/components/shared/PrivateRoute";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function AddOpportunityPage() {
  const { user } = useAuth();
  const [startup, setStartup] = useState(null);
  const [oppsCount, setOppsCount] = useState(0);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [upgrading, setUpgrading] = useState(false);

  const [roleTitle, setRoleTitle] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [workType, setWorkType] = useState("");
  const [commitmentLevel, setCommitmentLevel] = useState("");
  const [deadline, setDeadline] = useState("");

  const fetchData = async () => {
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
        setOppsCount(oppsRes.data.length);
      }

      const premiumRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payments/check/${user.email}`,
        { withCredentials: true }
      );
      setIsPremium(premiumRes.data.isPremium);
    } catch (err) {
      if (err.response?.status !== 404) console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleUpgrade = async (plan = "monthly") => {
    setUpgrading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payments/create-checkout-session`,
        { plan },
        { withCredentials: true }
      );
      if (res.data?.url) window.location.href = res.data.url;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to initiate payment");
      setUpgrading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!startup) return toast.error("You must register a startup first!");
    setSubmitting(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/opportunities`, {
        startup_id: startup._id, role_title: roleTitle, required_skills: requiredSkills,
        work_type: workType, commitment_level: commitmentLevel, deadline
      }, { withCredentials: true });

      toast.success("Opportunity posted successfully! 🎉");
      setRoleTitle(""); setRequiredSkills(""); setWorkType(""); setCommitmentLevel(""); setDeadline("");
      setOppsCount((prev) => prev + 1);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to post opportunity");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  const showPremiumGate = !isPremium && oppsCount >= 3;

  return (
    <PrivateRoute allowedRoles={["founder"]}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Add Opportunity</h1>
          <p className="text-gray-500 dark:text-slate-400 mt-2">Post a new role for your startup team.</p>
        </div>

        {!startup ? (
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl dark:bg-slate-900/50 dark:border-amber-900/30">
            <h2 className="text-lg font-semibold text-amber-900 dark:text-amber-500">Startup Profile Required</h2>
            <p className="text-sm text-amber-700 dark:text-slate-400 mt-2">
              You must register your startup profile first. Go to{" "}
              <Link href="/dashboard/founder/my-startup" className="underline font-semibold">My Startup</Link> to create it.
            </p>
          </div>
        ) : showPremiumGate ? (
          <div className="bg-slate-950 border border-blue-500/30 p-10 rounded-3xl text-center space-y-6 shadow-2xl text-white">
            <div className="text-6xl">👑</div>
            <h2 className="text-3xl font-bold">Upgrade to Premium</h2>
            <p className="text-slate-300 max-w-md mx-auto text-sm leading-relaxed">
              You have used your 3 free opportunity listings. Select a premium subscription package to post unlimited opportunities.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto pt-2">
              <button
                onClick={() => handleUpgrade("monthly")}
                disabled={upgrading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3.5 rounded-xl transition shadow-lg shadow-blue-600/25 disabled:bg-blue-400 cursor-pointer"
              >
                {upgrading ? "Redirecting..." : "Monthly ($10/mo)"}
              </button>
              <button
                onClick={() => handleUpgrade("yearly")}
                disabled={upgrading}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-750 text-white font-semibold px-6 py-3.5 rounded-xl transition shadow-lg shadow-yellow-600/25 disabled:bg-amber-400 cursor-pointer"
              >
                {upgrading ? "Redirecting..." : "Yearly ($100/yr)"}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Role Details</h2>
              <span className="text-xs px-4 py-1.5 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 font-medium">
                {isPremium ? "Unlimited Mode (Premium)" : `${oppsCount}/3 Free Posts Used`}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {["Role Title", "Required Skills"].map((label, idx) => {
                  const stateMap = [roleTitle, requiredSkills];
                  const setterMap = [setRoleTitle, setRequiredSkills];
                  const names = ["roleTitle", "skills"];
                  return (
                    <div key={label}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">{label} *</label>
                      <input type="text" required value={stateMap[idx]} onChange={(e) => setterMap[idx](e.target.value)} placeholder={`e.g. ${idx === 0 ? "Frontend Dev" : "React, Node.js"}`} className="w-full rounded-xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 px-4 py-3 text-gray-900 dark:text-white text-sm outline-none focus:ring-4 focus:ring-blue-500/10 transition-all" />
                    </div>
                  );
                })}

                {["Work Type", "Commitment Level"].map((label, idx) => {
                  const options = idx === 0 ? ["Remote", "Hybrid", "Onsite"] : ["Full-time", "Part-time", "Contract", "Internship"];
                  const stateMap = [workType, commitmentLevel];
                  const setterMap = [setWorkType, setCommitmentLevel];
                  return (
                    <div key={label}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">{label} *</label>
                      <select required value={stateMap[idx]} onChange={(e) => setterMap[idx](e.target.value)} className="w-full rounded-xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 px-4 py-3 text-gray-900 dark:text-white text-sm outline-none focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer">
                        <option value="" disabled>Select {label}</option>
                        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    </div>
                  );
                })}

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Application Deadline *</label>
                  <input type="date" required value={deadline} onChange={(e) => setDeadline(e.target.value)} className="w-full rounded-xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 px-4 py-3 text-gray-900 dark:text-white text-sm outline-none focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer" />
                </div>
              </div>

              <button type="submit" disabled={submitting} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg disabled:bg-blue-400 flex items-center justify-center gap-2">
                {submitting ? "Posting..." : "Post Opportunity"}
              </button>
            </form>
          </div>
        )}
      </div>
    </PrivateRoute>
  );
}