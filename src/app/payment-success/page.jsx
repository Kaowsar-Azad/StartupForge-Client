"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  // TODO: Verify payment with server using session_id
  // TODO: Show success message and transaction details

  return (
    <div className="payment-success-page">
      <div className="success-card">
        <div className="success-icon">🎉</div>
        <h1>Payment Successful!</h1>
        <p>
          Congratulations! You are now a Premium Founder. You can now post
          unlimited opportunities on StartupForge.
        </p>
        {sessionId && <p className="session-id">Session ID: {sessionId}</p>}
        <Link href="/dashboard/founder/add-opportunity" className="cta-button">
          Post an Opportunity Now
        </Link>
        <Link href="/dashboard/founder" className="secondary-btn">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
