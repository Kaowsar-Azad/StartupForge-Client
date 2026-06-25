/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // In production, proxy /api/* calls to the backend server
    // This makes all API calls same-origin, solving cross-domain cookie issues
    // IMPORTANT: Use BACKEND_URL (server-only) for rewrites — NEXT_PUBLIC_API_URL
    // is embedded at build time and may be 'localhost' in some build environments.
    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL;
    if (!backendUrl || backendUrl.includes("localhost")) {
      return []; // In local dev, no rewrite needed
    }
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
