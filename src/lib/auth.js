"use client";
import { createAuthClient } from "better-auth/react";

const getBaseURL = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  if (typeof window !== "undefined") {
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      return `${apiUrl}/api/auth/better-auth`;
    }
    return `${window.location.origin}/api/auth/better-auth`;
  }
  return `${apiUrl}/api/auth/better-auth`;
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
  fetchOptions: {
    credentials: "include",
  },
});

export const { signIn, signOut, signUp, useSession } = authClient;