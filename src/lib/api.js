// API helper - resolves the correct base URL for API calls
// In production (non-localhost), Next.js rewrites proxy /api/* to the backend
// So we use relative /api paths to avoid cross-domain cookie issues
// In local dev, we use the full NEXT_PUBLIC_API_URL

export const getApiUrl = (path) => {
  // path should start with /api/... 
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  
  // If running in browser context and API URL is not localhost, use relative URL
  // (Next.js rewrites will proxy it to the backend)
  if (typeof window !== "undefined" && !apiUrl.includes("localhost")) {
    return path; // relative URL, e.g., /api/users
  }
  
  // Server-side or local dev: use full URL
  return `${apiUrl}${path}`;
};
