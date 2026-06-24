"use client";
import { useState, useEffect } from "react";
import PrivateRoute from "@/components/shared/PrivateRoute";
import axios from "axios";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function AdminTransactionsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payments`,
        { withCredentials: true }
      );
      setPayments(res.data);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <PrivateRoute allowedRoles={["admin"]}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-905 dark:text-white">Transactions</h1>
          <p className="text-gray-500 dark:text-slate-400 mt-1">
            View all premium registration and feature upgrade payments.
          </p>
        </div>

        {payments.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-805 rounded-3xl p-8 text-center text-gray-500">
            No transactions found.
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-805 rounded-3xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-55 dark:bg-slate-850 border-b border-gray-100 dark:border-slate-800 text-gray-750 dark:text-slate-300 font-semibold">
                  <th className="p-4 sm:p-5">User Email</th>
                  <th className="p-4 sm:p-5">Transaction ID</th>
                  <th className="p-4 sm:p-5">Amount</th>
                  <th className="p-4 sm:p-5">Date</th>
                  <th className="p-4 sm:p-5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                {payments.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-55 dark:hover:bg-slate-850/50 transition">
                    <td className="p-4 sm:p-5 font-medium text-gray-900 dark:text-white">{p.user_email}</td>
                    <td className="p-4 sm:p-5 text-gray-500 dark:text-slate-400 font-mono text-xs">{p.transaction_id}</td>
                    <td className="p-4 sm:p-5 font-semibold text-gray-900 dark:text-white">${p.amount.toFixed(2)}</td>
                    <td className="p-4 sm:p-5 text-gray-600 dark:text-slate-300">
                      {new Date(p.paid_at).toLocaleString()}
                    </td>
                    <td className="p-4 sm:p-5 text-right">
                      <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-emerald-500/10 text-emerald-500 capitalize">
                        {p.payment_status}
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
