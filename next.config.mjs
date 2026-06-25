/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // In production, proxy /api/* calls to the backend server
    // This makes all API calls same-origin, solving cross-domain cookie issues
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl || apiUrl.includes("localhost")) {
      return []; // In local dev, no rewrite needed
    }
    return [
      {
        source: "/api/:path*",
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
