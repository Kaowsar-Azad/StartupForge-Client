"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth";
import { authClient } from "@/lib/auth";
import axios from "axios";

const AuthContext = createContext(null);

// Resolve API base URL: use relative path in production browser (via Next.js proxy),
// full URL in local dev or server-side
const apiBase =
  typeof window !== "undefined" &&
  !(process.env.NEXT_PUBLIC_API_URL || "").includes("localhost")
    ? "" // relative in production browser
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const [token, setToken] = useState(null);

  // Set up Axios request interceptor for Bearer token
  useEffect(() => {
    const interceptor = axios.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, [token]);

  useEffect(() => {
    const fetchDbUser = async () => {
      if (session?.user?.email) {
        try {
          // Retrieve the signed JWT token from the Better Auth server endpoint
          const tokenRes = await axios.get(
            `${apiBase}/api/auth/token`,
            { withCredentials: true }
          );
          const jwtToken = tokenRes.data?.token;
          setToken(jwtToken);

          // Now retrieve the user from the database using Bearer token
          const res = await axios.get(
            `${apiBase}/api/users/${session.user.email}`,
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            }
          );
          setDbUser(res.data);
          setAuthError(false);
        } catch (error) {
          const status = error?.response?.status;
          if (status === 401 || status === 403) {
            setAuthError(true);
            try {
              await axios.post(
                `${apiBase}/api/auth/logout`,
                {},
                { withCredentials: true }
              );
            } catch (logoutError) {
              console.error("Failed to clear server auth cookie:", logoutError);
            }
            try {
              await authClient.signOut();
            } catch (signOutError) {
              console.error("Failed to sign out blocked user:", signOutError);
            }
            router.push("/login");
          }
          console.error("Failed to fetch user from DB:", error);
        }
      }
      setLoading(false);
    };
    if (!isPending) {
      if (!session) {
        setToken(null);
        setDbUser(null);
        setLoading(false); // FIXED: Add setLoading(false) so it doesn't spin forever
      } else {
        fetchDbUser();
      }
    }
  }, [session, isPending, router]);

  const user = authError || loading ? null : dbUser || session?.user;
  const isAuthenticated = !!session && !authError && !loading;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading: isPending || loading, session }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
