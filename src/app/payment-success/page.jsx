"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { CircleCheck, CircleXmark } from "@gravity-ui/icons";

function PaymentSuccessContent() {
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
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-slate-950 px-4 py-12">
      <div className="w-full max-w-lg bg-slate-900/80 backdrop-blur-xl rounded-[2rem] border border-slate-800 p-8 sm:p-10 text-center shadow-2xl shadow-blue-900/10 transition-all duration-300">
        
        {error ? (
          /* ================= ERROR STATE ================= */
          <div className="animate-in fade-in zoom-in duration-500">
            <div className="mx-auto w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
              <CircleXmark className="text-red-500 w-10 h-10" />
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
              Verification Failed
            </h1>
            <p className="text-sm sm:text-base text-red-400/90 mb-8 px-4">
              {error}
            </p>
            
            <div className="pt-2">
              <Link
                href="/dashboard/founder"
                className="block w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3.5 sm:py-4 rounded-xl transition-all duration-200 shadow-sm active:scale-[0.98]"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        ) : (
          /* ================= SUCCESS STATE ================= */
          <div className="animate-in fade-in zoom-in duration-500">
            <div className="mx-auto w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 shadow-inner shadow-emerald-500/20">
              <CircleCheck className="text-emerald-500 w-10 h-10" />
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-4 tracking-tight">
              Payment Successful!
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8 px-2">
              Congratulations! You are now a Premium Founder. You can now post unlimited team opportunities on StartupForge.
            </p>
            
            {payment && (
              <div className="bg-slate-950/50 border border-slate-800/60 p-5 sm:p-6 rounded-2xl text-left text-sm space-y-4 mb-8 shadow-inner">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1.5">
                  <span className="text-slate-500 font-medium">Transaction ID</span>
                  <span className="font-mono text-blue-400 break-all bg-blue-500/10 px-2 py-0.5 rounded-md">
                    {payment.transaction_id}
                  </span>
                </div>
                
                <div className="flex justify-between items-center pt-2 border-t border-slate-800/50">
                  <span className="text-slate-500 font-medium">Amount Paid</span>
                  <span className="text-white font-bold text-base">
                    ${payment.amount}
                  </span>
                </div>
                
                <div className="flex justify-between items-center pt-2 border-t border-slate-800/50">
                  <span className="text-slate-500 font-medium">Date</span>
                  <span className="text-slate-300 font-medium">
                    {new Date(payment.paid_at).toLocaleString()}
                  </span>
                </div>
              </div>
            )}
            
            <div className="flex flex-col gap-3 sm:gap-4 pt-2">
              <Link
                href="/dashboard/founder/add-opportunity"
                className="block w-full flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 sm:py-4 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/20 active:scale-[0.98]"
              >
                Post an Opportunity Now
              </Link>
              <Link
                href="/dashboard/founder"
                className="block w-full flex items-center justify-center bg-transparent border border-slate-700 hover:bg-slate-800 hover:border-slate-600 text-slate-300 font-semibold py-3.5 sm:py-4 rounded-xl transition-all duration-200 active:scale-[0.98]"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PaymentSuccessContent />
    </Suspense>
  );
}