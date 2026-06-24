import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* SVG Illustration */}
        <div className="flex justify-center mb-8">
          <svg viewBox="0 0 400 300" className="w-72 h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Stars */}
            <circle cx="30" cy="40" r="2" fill="#3b82f6" opacity="0.6"/>
            <circle cx="370" cy="60" r="2" fill="#6366f1" opacity="0.6"/>
            <circle cx="80" cy="100" r="1.5" fill="#3b82f6" opacity="0.4"/>
            <circle cx="330" cy="30" r="1.5" fill="#6366f1" opacity="0.4"/>
            <circle cx="200" cy="20" r="2" fill="#60a5fa" opacity="0.5"/>
            <circle cx="50" cy="200" r="1.5" fill="#3b82f6" opacity="0.3"/>
            <circle cx="350" cy="180" r="2" fill="#6366f1" opacity="0.5"/>
            {/* Planet */}
            <ellipse cx="310" cy="230" rx="55" ry="45" fill="#1e293b" stroke="#334155" strokeWidth="1.5"/>
            <ellipse cx="310" cy="230" rx="80" ry="14" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.5"/>
            <circle cx="295" cy="218" r="6" fill="#334155"/>
            <circle cx="318" cy="238" r="4" fill="#1e40af" opacity="0.6"/>
            {/* Astronaut body */}
            <g transform="translate(130, 70)">
              {/* helmet */}
              <circle cx="70" cy="55" r="35" fill="#1e293b" stroke="#3b82f6" strokeWidth="2.5"/>
              <circle cx="70" cy="55" r="25" fill="#0f172a" opacity="0.8"/>
              <ellipse cx="62" cy="48" rx="7" ry="5" fill="#3b82f6" opacity="0.3"/>
              {/* body */}
              <rect x="45" y="88" width="50" height="55" rx="14" fill="#1e293b" stroke="#334155" strokeWidth="1.5"/>
              {/* arms */}
              <rect x="15" y="95" width="32" height="14" rx="7" fill="#1e293b" stroke="#334155" strokeWidth="1.5" transform="rotate(-20,31,102)"/>
              <rect x="93" y="95" width="32" height="14" rx="7" fill="#1e293b" stroke="#334155" strokeWidth="1.5" transform="rotate(20,109,102)"/>
              {/* legs */}
              <rect x="48" y="138" width="16" height="30" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1.5"/>
              <rect x="76" y="138" width="16" height="30" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1.5"/>
              {/* chest detail */}
              <rect x="57" y="100" width="26" height="16" rx="5" fill="#1e40af" opacity="0.5"/>
              <circle cx="65" cy="108" r="2.5" fill="#3b82f6"/>
              <circle cx="75" cy="108" r="2.5" fill="#60a5fa"/>
            </g>
            {/* 404 text stylized */}
            <text x="200" y="290" textAnchor="middle" fill="#334155" fontSize="11" fontFamily="monospace">error · not found</text>
          </svg>
        </div>

        <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-white mb-3">Page Not Found</h2>
        <p className="text-slate-400 text-sm leading-relaxed mb-8">
          Oops! The page you are looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3.5 rounded-xl transition text-sm shadow-lg shadow-blue-600/20"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
