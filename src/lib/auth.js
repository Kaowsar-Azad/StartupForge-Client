"use client";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000") + "/api/auth/better-auth",
  fetchOptions: {
    credentials: "include",
  },
});

export const { signIn, signOut, signUp, useSession } = authClient;
