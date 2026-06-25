"use client";
import { useEffect, useState } from "react";
import PrivateRoute from "@/components/shared/PrivateRoute";
import StatsCard from "@/components/dashboard/StatsCard";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import Link from "next/link";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function FounderOverviewPage() {
  const { user } = useAuth();
  const [startup, setStartup] = useState(null);
  const [opportunities, setOpportunities] = useState([]);
  const [applications, setApplications] = useState([]);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);

  const fetchFounderData = async () => {
    if (!user?.email) return;
    try {
      // Fetch startup
      const startupRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/startups/founder/${user.email}`,
        { withCredentials: true }
      );
      const startupData = startupRes.data;
      setStartup(startupData);

      if (startupData?._id) {
        // Fetch opportunities
        const oppsRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/opportunities/startup/${startupData._id}`,
          { withCredentials: true }
        );
        setOpportunities(oppsRes.data);
      }

      // Fetch applications
      const appsRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/applications`,
        { withCredentials: true }
      );
      setApplications(appsRes.data);

      // Fetch Premium Status
      const premiumRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payments/check/${user.email}`,
        { withCredentials: true }
      );
      setIsPremium(premiumRes.data.isPremium);
    } catch (err) {
      if (err.response?.status !== 404) {
        console.error("Error fetching founder data:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFounderData();
  }, [user]);

  const handleUpgrade = async (plan = "monthly") => {
    setUpgrading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payments/create-checkout-session`,
        { plan },
        { withCredentials: true }
      );
      if (res.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      console.error("Failed to upgrade:", err);
      setUpgrading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  const totalOpps = opportunities.length;
  const totalApps = applications.length;
  const acceptedMembers = applications.filter((app) => app.status === "accepted").length;

  return (
    <PrivateRoute allowedRoles={["founder"]}>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Founder Dashboard</h1>
            <p className="text-gray-500 dark:text-slate-400 mt-1">
              Overview of your startup: <span className="font-semibold text-blue-600 dark:text-blue-400">{startup?.startup_name || "Not registered yet"}</span>
            </p>
          </div>
          {startup && (
            <div className="flex items-center gap-2">
              {isPremium ? (
                <span className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white text-xs px-3.5 py-1.5 rounded-full font-semibold shadow-md flex items-center gap-1.5 animate-pulse">
                  👑 Premium Founder
                </span>
              ) : (
                <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs px-3.5 py-1.5 rounded-full font-medium">
                  Free Member (Limit: 3)
                </span>
              )}
            </div>
          )}
        </div>

        {!startup ? (
          <div className="bg-blue-50 border border-blue-150 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 dark:bg-slate-900 dark:border-slate-800">
            <div>
              <h2 className="text-lg font-semibold text-blue-900 dark:text-white">Register your Startup!</h2>
              <p className="text-sm text-blue-700 dark:text-slate-400 mt-1">
                You need to create your startup profile first before you can post team opportunities.
              </p>
            </div>
            <Link
              href="/dashboard/founder/my-startup"
              className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-2.5 rounded-xl transition shadow-lg shadow-blue-600/10 text-sm whitespace-nowrap cursor-pointer"
            >
              Get Started 🚀
            </Link>
          </div>
        ) : (
          <>
            {!isPremium && (
              <div className="bg-gradient-to-r from-blue-900/40 to-slate-900 border border-blue-500/20 p-6 rounded-2xl flex flex-col lg:flex-row justify-between items-center gap-4 text-white">
                <div>
                  <h3 className="text-lg font-bold">Get Unlimited Opportunity Postings! 👑</h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-xl">
                    Upgrade your account to post as many team opportunities as you need and find your dream startup crew.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                  <button
                    onClick={() => handleUpgrade("monthly")}
                    disabled={upgrading}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition shadow-md cursor-pointer disabled:bg-blue-800 whitespace-nowrap text-center"
                  >
                    {upgrading ? "Redirecting..." : "Monthly ($10/mo)"}
                  </button>
                  <button
                    onClick={() => handleUpgrade("yearly")}
                    disabled={upgrading}
                    className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-750 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition shadow-md cursor-pointer disabled:bg-amber-800 whitespace-nowrap text-center"
                  >
                    {upgrading ? "Redirecting..." : "Yearly ($100/yr)"}
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatsCard title="Total Opportunities" value={totalOpps} icon="💼" color="#3b82f6" />
              <StatsCard title="Total Applications" value={totalApps} icon="📋" color="#10b981" />
              <StatsCard title="Accepted Members" value={acceptedMembers} icon="✅" color="#f59e0b" />
            </div>

            {/* Recent activity list */}
            <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Applications</h2>
              {applications.length === 0 ? (
                <p className="text-gray-500 dark:text-slate-400 text-sm py-4">No applications received yet.</p>
              ) : (
                <div className="divide-y divide-gray-100 dark:divide-slate-800">
                  {applications.slice(0, 5).map((app) => (
                    <div key={app._id} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                          {app.opportunity_id?.role_title || "Unknown Role"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
                          Applicant: {app.applicant_email}
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
                          href="/dashboard/founder/applications"
                          className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium"
                        >
                          Manage →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </PrivateRoute>
  );
}
