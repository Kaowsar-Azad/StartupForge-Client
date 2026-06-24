"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "@/lib/auth";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { data: session, isPending } = useSession();
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDbUser = async () => {
      if (session?.user?.email) {
        try {
          // Sync session to server JWT cookie
          await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/jwt`,
            {
              email: session.user.email,
              role: session.user.role || "collaborator",
            },
            { withCredentials: true }
          );

          // Now retrieve the user from the database
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/users/${session.user.email}`,
            { withCredentials: true }
          );
          setDbUser(res.data);
        } catch (error) {
          console.error("Failed to fetch user from DB:", error);
        }
      }
      setLoading(false);
    };
    if (!isPending) {
      fetchDbUser();
    }
  }, [session, isPending]);

  const user = dbUser || session?.user;
  const isAuthenticated = !!session;

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
