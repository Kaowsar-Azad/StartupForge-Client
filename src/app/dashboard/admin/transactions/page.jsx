"use client";
import PrivateRoute from "@/components/shared/PrivateRoute";

export default function AdminTransactionsPage() {
  // TODO: Fetch all payments from API
  // TODO: Show table with: User, Amount, Date, Payment Status

  return (
    <PrivateRoute allowedRoles={["admin"]}>
      <div className="admin-transactions-page">
        <h1>Transactions</h1>
        {/* TODO: Implement transactions table */}
        <p>View all premium payment transactions.</p>
      </div>
    </PrivateRoute>
  );
}
