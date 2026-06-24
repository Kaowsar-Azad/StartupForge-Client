"use client";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api/auth/better-auth",
});

export const { signIn, signOut, signUp, useSession } = authClient;
