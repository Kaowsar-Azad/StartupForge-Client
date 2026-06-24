"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    const confirmPayment = async () => {
      if (!sessionId) {
        setError("Missing session ID");
        setLoading(false);
        return;
      }
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/payments/confirm`,
          { session_id: sessionId },
          { withCredentials: true }
        );
        setPayment(res.data.payment);
      } catch (err) {
        console.error("Payment confirmation failed:", err);
        setError("Failed to verify payment with the server. Please contact support.");
      } finally {
        setLoading(false);
      }
    };

    confirmPayment();
  }, [sessionId]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-gray-150 p-8 text-center shadow-lg space-y-6">
        {error ? (
          <>
            <div className="text-5xl">❌</div>
            <h1 className="text-2xl font-bold text-gray-900">Verification Failed</h1>
            <p className="text-sm text-red-500">{error}</p>
            <div className="flex flex-col gap-3 pt-4">
              <Link
                href="/dashboard/founder"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition text-sm cursor-pointer"
              >
                Back to Dashboard
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="text-5xl">🎉</div>
            <h1 className="text-2xl font-bold text-gray-905">Payment Successful!</h1>
            <p className="text-slate-500 text-sm leading-relaxed">
              Congratulations! You are now a Premium Founder. You can now post unlimited team opportunities on StartupForge.
            </p>
            {payment && (
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 p-4 rounded-2xl text-left text-xs space-y-1.5 text-gray-600">
                <p><span className="font-semibold">Transaction ID:</span> {payment.transaction_id}</p>
                <p><span className="font-semibold">Amount Paid:</span> ${payment.amount}</p>
                <p><span className="font-semibold">Date:</span> {new Date(payment.paid_at).toLocaleString()}</p>
              </div>
            )}
            <div className="flex flex-col gap-3 pt-2">
              <Link
                href="/dashboard/founder/add-opportunity"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition text-sm shadow-md shadow-blue-600/10 cursor-pointer"
              >
                Post an Opportunity Now
              </Link>
              <Link
                href="/dashboard/founder"
                className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 rounded-xl transition text-sm cursor-pointer"
              >
                Go to Dashboard
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
