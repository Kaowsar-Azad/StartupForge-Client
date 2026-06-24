"use client";
import Link from "next/link";

export default function ErrorPage({ error, reset }) {
  return (
    <div className="error-page">
      <div className="error-content">
        <div className="error-illustration">⚠️</div>
        <h1>Something Went Wrong</h1>
        <p>{error?.message || "An unexpected error occurred. Please try again."}</p>
        <div className="error-actions">
          <button onClick={() => reset()} className="retry-btn">
            Try Again
          </button>
          <Link href="/" className="back-home-btn">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
