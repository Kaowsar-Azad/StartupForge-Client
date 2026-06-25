"use client";
import { createAuthClient } from "better-auth/react";

// In production (Vercel), use relative URL - Next.js rewrites proxy /api/* to backend
// This makes cookies same-origin, fixing cross-domain cookie issues
// In local dev, use full URL directly (no proxy)
const getBaseURL = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  
  if (typeof window !== "undefined" && !apiUrl.includes("localhost")) {
    // Production browser: use relative URL through Next.js proxy
    return "/api/auth/better-auth";
  }
  // Local dev or server-side: use full URL
  return `${apiUrl}/api/auth/better-auth`;
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
  fetchOptions: {
    credentials: "include",
  },
});

export const { signIn, signOut, signUp, useSession } = authClient;
