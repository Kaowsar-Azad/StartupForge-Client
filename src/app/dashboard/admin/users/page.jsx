"use client";
import { useState, useEffect } from "react";
import PrivateRoute from "@/components/shared/PrivateRoute";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
        withCredentials: true,
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleBlock = async (user) => {
    const action = user.isBlocked ? "unblock" : "block";
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${action}/${user._id}`,
        {},
        { withCredentials: true }
      );
      toast.success(`User ${action}ed successfully!`);
      setUsers((prev) =>
        prev.map((u) => (u._id === user._id ? { ...u, isBlocked: res.data.isBlocked } : u))
      );
    } catch (err) {
      toast.error(`Failed to ${action} user`);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <PrivateRoute allowedRoles={["admin"]}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Users</h1>
          <p className="text-gray-500 dark:text-slate-400 mt-1">
            View and manage all registered users on the platform.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-55 dark:bg-slate-850 border-b border-gray-100 dark:border-slate-800 text-gray-750 dark:text-slate-300 font-semibold">
                <th className="p-4 sm:p-5">User</th>
                <th className="p-4 sm:p-5">Email</th>
                <th className="p-4 sm:p-5">Role</th>
                <th className="p-4 sm:p-5">Status</th>
                <th className="p-4 sm:p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-gray-55 dark:hover:bg-slate-850/50 transition">
                  <td className="p-4 sm:p-5 flex items-center gap-3">
                    <img
                      src={u.image || "/default-avatar.png"}
                      alt={u.name}
                      className="w-8 h-8 rounded-full object-cover border border-gray-200 dark:border-slate-800"
                    />
                    <span className="font-semibold text-gray-900 dark:text-white">{u.name}</span>
                  </td>
                  <td className="p-4 sm:p-5 text-gray-600 dark:text-slate-300">{u.email}</td>
                  <td className="p-4 sm:p-5 text-gray-600 dark:text-slate-300 capitalize">{u.role}</td>
                  <td className="p-4 sm:p-5">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      u.isBlocked
                        ? "bg-red-500/10 text-red-500"
                        : "bg-emerald-500/10 text-emerald-500"
                    }`}>
                      {u.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td className="p-4 sm:p-5 text-right">
                    {u.role !== "admin" && (
                      <button
                        onClick={() => handleToggleBlock(u)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition cursor-pointer ${
                          u.isBlocked
                            ? "bg-emerald-500/10 hover:bg-emerald-500 hover:text-white text-emerald-500"
                            : "bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500"
                        }`}
                      >
                        {u.isBlocked ? "Unblock" : "Block"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PrivateRoute>
  );
}
