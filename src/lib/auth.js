"use client";
import { createAuthClient } from "better-auth/react";

// Determine the better-auth base URL:
// - In the browser on production: use relative path (/api/auth/better-auth)
//   so Next.js rewrites proxy it to the backend (same-origin cookies work).
// - In local dev browser OR server-side (SSR/build): use the full backend URL.
//
// NOTE: createAuthClient is called once at module load.
// On the server side, window is undefined, so we always fall through to full URL.
// The "use client" directive ensures this module only runs in the browser at runtime,
// but during SSR/static generation Next.js may still evaluate it.
const getBaseURL = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // Browser only: if production (not localhost), use relative proxy path
  if (typeof window !== "undefined" && !apiUrl.includes("localhost")) {
    return "/api/auth/better-auth";
  }

  // Server-side or local dev: use full URL
  return `${apiUrl}/api/auth/better-auth`;
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
  fetchOptions: {
    credentials: "include",
  },
});

export const { signIn, signOut, signUp, useSession } = authClient;
