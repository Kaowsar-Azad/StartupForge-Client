import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        {/* TODO: Add proper illustration/SVG */}
        <div className="not-found-illustration">🔍</div>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>
          Oops! The page you are looking for doesn&apos;t exist or has been
          moved. Let&apos;s get you back on track.
        </p>
        <Link href="/" className="back-home-btn">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
