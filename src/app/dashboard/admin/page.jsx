"use client";

import { useEffect, useState } from "react";
import PrivateRoute from "@/components/shared/PrivateRoute";
import StatsCard from "@/components/dashboard/StatsCard";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Person, Rocket, Briefcase, Palette } from "@gravity-ui/icons";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function AdminOverviewPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStartups: 0,
    totalOpportunities: 0,
    totalRevenue: 0,
  });
  const [userRoleData, setUserRoleData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const fetchAdminStats = async () => {
      try {
        const [usersRes, startupsRes, oppsRes, paymentsRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, { withCredentials: true }),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/startups/admin/all`, { withCredentials: true }),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/opportunities`, { withCredentials: true }),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/payments`, { withCredentials: true }),
        ]);

        const users = usersRes.data || [];
        const startups = startupsRes.data || [];
        const oppsCount = oppsRes.data?.total || 0;
        const payments = paymentsRes.data || [];

        // Calculate total revenue
        const totalRev = payments.reduce((sum, payment) => sum + (payment.amount || 0), 0);

        setStats({
          totalUsers: users.length,
          totalStartups: startups.length,
          totalOpportunities: oppsCount,
          totalRevenue: totalRev,
        });

        // Group users by role for Pie Chart
        const roles = users.reduce((acc, user) => {
          const role = user.role || "collaborator";
          acc[role] = (acc[role] || 0) + 1;
          return acc;
        }, {});
        
        setUserRoleData([
          { name: "Founders", value: roles.founder || 0 },
          { name: "Collaborators", value: roles.collaborator || 0 },
          { name: "Admins", value: roles.admin || 0 },
        ]);

        // Group revenue by date for Bar Chart
        const revenueByDate = payments.reduce((acc, p) => {
          const dateStr = new Date(p.paid_at || p.createdAt || Date.now()).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
          acc[dateStr] = (acc[dateStr] || 0) + p.amount;
          return acc;
        }, {});

        // Convert to sorted array
        const sortedRevenue = Object.entries(revenueByDate)
          .map(([date, amount]) => ({ date, amount }))
          .slice(-7); // Last 7 transaction days

        setRevenueData(sortedRevenue);
      } catch (err) {
        console.error("Error fetching admin stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStats();
  }, []);

  const COLORS = ["#6366f1", "#10b981", "#f59e0b"];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <PrivateRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
        <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8 relative">
          {/* Header Section */}
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-violet-400">
                Admin Dashboard
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2 text-base">
                Platform overview and real-time statistics.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Users"
              value={stats.totalUsers}
              icon={<Person />}
              color="#6366f1"
            />
            <StatsCard
              title="Total Startups"
              value={stats.totalStartups}
              icon={<Rocket />}
              color="#22c55e"
            />
            <StatsCard
              title="Total Opportunities"
              value={stats.totalOpportunities}
              icon={<Briefcase />}
              color="#f59e0b"
            />
            <StatsCard
              title="Total Revenue"
              value={`$${stats.totalRevenue}`}
              icon={<Palette />}
              color="#ec4899"
            />
          </div>

          {/* Charts Section */}
          {isMounted && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Revenue Bar Chart */}
              <div className="rounded-[32px] border border-white/20 bg-white/80 backdrop-blur-xl p-8 shadow-2xl dark:bg-slate-900/80 dark:border-slate-800">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                  Revenue Analytics ($)
                </h2>
                <div className="h-80 w-full">
                  {revenueData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis dataKey="date" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(15, 23, 42, 0.9)",
                            borderColor: "#334155",
                            color: "#fff",
                            borderRadius: "16px",
                          }}
                        />
                        <Bar dataKey="amount" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-slate-400">
                      No revenue transactions recorded yet.
                    </div>
                  )}
                </div>
              </div>

              {/* User Roles Pie Chart */}
              <div className="rounded-[32px] border border-white/20 bg-white/80 backdrop-blur-xl p-8 shadow-2xl dark:bg-slate-900/80 dark:border-slate-800">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                  User Role Distribution
                </h2>
                <div className="h-80 w-full flex flex-col md:flex-row items-center justify-center">
                  <div className="h-64 w-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={userRoleData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {userRoleData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(15, 23, 42, 0.9)",
                            borderColor: "#334155",
                            color: "#fff",
                            borderRadius: "16px",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-col gap-3 mt-4 md:mt-0 md:ml-8">
                    {userRoleData.map((entry, index) => (
                      <div key={entry.name} className="flex items-center gap-2">
                        <span
                          className="w-3.5 h-3.5 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-slate-600 dark:text-slate-350 text-sm font-medium">
                          {entry.name}: {entry.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PrivateRoute>
  );
}