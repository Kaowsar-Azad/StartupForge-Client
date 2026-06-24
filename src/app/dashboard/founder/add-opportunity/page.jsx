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

  // Form states
  const [roleTitle, setRoleTitle] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [workType, setWorkType] = useState("");
  const [commitmentLevel, setCommitmentLevel] = useState("");
  const [deadline, setDeadline] = useState("");

  const fetchData = async () => {
    if (!user?.email) return;
    try {
      // 1. Fetch startup
      const startupRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/startups/founder/${user.email}`,
        { withCredentials: true }
      );
      setStartup(startupRes.data);

      if (startupRes.data?._id) {
        // 2. Fetch opportunities count
        const oppsRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/opportunities/startup/${startupRes.data._id}`,
          { withCredentials: true }
        );
        setOppsCount(oppsRes.data.length);
      }

      // 3. Check premium status
      const premiumRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payments/check/${user.email}`,
        { withCredentials: true }
      );
      setIsPremium(premiumRes.data.isPremium);
    } catch (err) {
      if (err.response?.status !== 404) {
        console.error("Error fetching data:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleUpgrade = async () => {
    setUpgrading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payments/create-checkout-session`,
        {},
        { withCredentials: true }
      );
      if (res.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to initiate payment");
      setUpgrading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!startup) {
      toast.error("You must register a startup first!");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        startup_id: startup._id,
        role_title: roleTitle,
        required_skills: requiredSkills,
        work_type: workType,
        commitment_level: commitmentLevel,
        deadline,
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/opportunities`,
        payload,
        { withCredentials: true }
      );

      toast.success("Opportunity posted successfully! 🎉");
      setRoleTitle("");
      setRequiredSkills("");
      setWorkType("");
      setCommitmentLevel("");
      setDeadline("");
      // Refresh count
      setOppsCount((prev) => prev + 1);
    } catch (err) {
      if (err.response?.status === 402) {
        toast.warning("Free limit reached. Upgrade to Premium to post more!");
      } else {
        toast.error(err.response?.data?.message || "Failed to post opportunity");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  // Premium gate logic check
  const showPremiumGate = !isPremium && oppsCount >= 3;

  return (
    <PrivateRoute allowedRoles={["founder"]}>
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add Opportunity</h1>
          <p className="text-gray-500 dark:text-slate-400 mt-1">
            Post a new role for your startup team.
          </p>
        </div>

        {!startup ? (
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl dark:bg-slate-900 dark:border-slate-800">
            <h2 className="text-lg font-semibold text-amber-900 dark:text-white">Startup Profile Required</h2>
            <p className="text-sm text-amber-700 dark:text-slate-400 mt-2">
              You must register your startup profile first. Go to{" "}
              <Link href="/dashboard/founder/my-startup" className="underline font-semibold">
                My Startup
              </Link>{" "}
              to create it.
            </p>
          </div>
        ) : showPremiumGate ? (
          <div className="bg-slate-900 border border-blue-500/30 p-8 rounded-3xl text-center space-y-6 shadow-xl text-white">
            <div className="text-5xl">👑</div>
            <h2 className="text-2xl font-bold">Upgrade to Premium</h2>
            <p className="text-slate-350 max-w-md mx-auto text-sm leading-relaxed">
              You have used your 3 free opportunity listings. Upgrade to <span className="text-blue-450 font-semibold">Premium Lifetime Membership</span> for only <span className="font-bold text-white">$19.99</span> to post unlimited roles and attract top collaborators!
            </p>
            <button
              onClick={handleUpgrade}
              disabled={upgrading}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3.5 rounded-xl transition shadow-lg shadow-blue-600/25 disabled:bg-blue-400 cursor-pointer"
            >
              {upgrading ? "Redirecting..." : "Upgrade Now for $19.99"}
            </button>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Role Details</h2>
              <span className="text-xs text-gray-500 bg-gray-50 dark:bg-slate-850 px-3 py-1 rounded-full font-medium">
                {isPremium ? "Unlimited Mode (Premium)" : `${oppsCount}/3 Free Posts Used`}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Role Title *</label>
                  <input
                    type="text"
                    required
                    value={roleTitle}
                    onChange={(e) => setRoleTitle(e.target.value)}
                    placeholder="e.g. Frontend Developer"
                    className="w-full rounded-xl border border-gray-300 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 px-4 py-3 text-gray-900 dark:text-white text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Required Skills (Comma separated) *</label>
                  <input
                    type="text"
                    required
                    value={requiredSkills}
                    onChange={(e) => setRequiredSkills(e.target.value)}
                    placeholder="e.g. React, TailwindCSS, Node.js"
                    className="w-full rounded-xl border border-gray-300 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 px-4 py-3 text-gray-900 dark:text-white text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Work Type *</label>
                  <select
                    required
                    value={workType}
                    onChange={(e) => setWorkType(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 px-4 py-3 text-gray-900 dark:text-white text-sm outline-none focus:border-blue-500"
                  >
                    <option value="" disabled>Select Work Type</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Onsite">Onsite</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Commitment Level *</label>
                  <select
                    required
                    value={commitmentLevel}
                    onChange={(e) => setCommitmentLevel(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 px-4 py-3 text-gray-900 dark:text-white text-sm outline-none focus:border-blue-500"
                  >
                    <option value="" disabled>Select Commitment</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Application Deadline *</label>
                  <input
                    type="date"
                    required
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 px-4 py-3 text-gray-900 dark:text-white text-sm outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-3 rounded-xl transition text-sm disabled:bg-blue-400 flex items-center gap-2 cursor-pointer"
              >
                {submitting ? "Posting..." : "Post Opportunity"}
              </button>
            </form>
          </div>
        )}
      </div>
    </PrivateRoute>
  );
}
