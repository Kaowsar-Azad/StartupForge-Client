"use client";
import { useState, useEffect } from "react";
import PrivateRoute from "@/components/shared/PrivateRoute";
import axios from "axios";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Briefcase } from "@gravity-ui/icons"; // Banknote-এর পরিবর্তে Briefcase ব্যবহার করা হলো

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
      <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6 sm:space-y-8">
        
        {/* Header Section */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Transactions
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-slate-400 mt-2">
            View all premium registration and feature upgrade payments.
          </p>
        </div>

        {payments.length === 0 ? (
          /* ================= EMPTY STATE ================= */
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-12 text-center shadow-sm flex flex-col items-center justify-center">
            <div className="bg-gray-100 dark:bg-slate-800 p-4 rounded-full mb-4 text-gray-400 dark:text-slate-500">
              <Briefcase width={32} height={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">No Transactions Found</h3>
            <p className="text-gray-500 dark:text-slate-400 text-sm">No payments have been processed yet.</p>
          </div>
        ) : (
          /* ================= TABLE STATE ================= */
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl shadow-sm overflow-hidden w-full">
            <table className="w-full text-left border-collapse text-sm table-auto">
              <thead>
                <tr className="bg-gray-50 dark:bg-slate-800/50 border-b border-gray-200 dark:border-slate-800 text-gray-700 dark:text-slate-300 font-semibold tracking-wide">
                  <th className="p-4 sm:p-5">User Email</th>
                  <th className="p-4 sm:p-5">Transaction ID</th>
                  <th className="p-4 sm:p-5">Amount</th>
                  <th className="p-4 sm:p-5">Date</th>
                  <th className="p-4 sm:p-5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800/80">
                {payments.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50/80 dark:hover:bg-slate-800/30 transition-colors duration-200">
                    
                    {/* User Email */}
                    <td className="p-4 sm:p-5 align-middle text-gray-900 dark:text-white font-medium break-all sm:break-normal min-w-[150px]">
                      {p.user_email}
                    </td>
                    
                    {/* Transaction ID */}
                    <td className="p-4 sm:p-5 align-middle text-gray-500 dark:text-slate-400 font-mono text-xs break-all max-w-[200px] sm:max-w-xs">
                      {p.transaction_id}
                    </td>
                    
                    {/* Amount */}
                    <td className="p-4 sm:p-5 align-middle font-bold text-gray-900 dark:text-white whitespace-nowrap">
                      ${p.amount.toFixed(2)}
                    </td>
                    
                    {/* Date */}
                    <td className="p-4 sm:p-5 align-middle text-gray-600 dark:text-slate-300 min-w-[120px]">
                      {new Date(p.paid_at).toLocaleString()}
                    </td>
                    
                    {/* Status Badge */}
                    <td className="p-4 sm:p-5 align-middle text-right">
                      <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-bold tracking-wide capitalize shadow-sm border bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20">
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