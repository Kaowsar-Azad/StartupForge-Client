"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function BrowseStartupsPage() {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/startups`);
        setStartups(res.data);
      } catch (err) {
        console.error("Error fetching startups:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStartups();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Browse <span className="text-blue-500">Startups</span>
          </h1>
          <p className="text-default-500 max-w-xl mx-auto text-base sm:text-lg">
            Explore exciting startups built by innovative founders. Connect with them and help build the future.
          </p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : startups.length === 0 ? (
          <div className="text-center py-16 text-default-500 bg-default-50 dark:bg-slate-900/50 border border-divider rounded-3xl">
            No startups registered or approved yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {startups.map((s) => (
              <div key={s._id} className="bg-white dark:bg-slate-900 border border-divider rounded-2xl p-6 flex flex-col justify-between hover:border-blue-500/50 transition-all duration-300 shadow-xl group">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={s.logo || "/default-startup.png"}
                      alt={s.startup_name}
                      className="w-14 h-14 rounded-xl object-cover border border-divider"
                    />
                    <div>
                      <h3 className="font-bold text-lg text-foreground group-hover:text-blue-500 transition">
                        {s.startup_name}
                      </h3>
                      <p className="text-blue-500 text-xs font-semibold uppercase tracking-wider">
                        {s.industry}
                      </p>
                    </div>
                  </div>

                  <p className="text-default-600 text-sm line-clamp-3">
                    {s.description}
                  </p>

                  <div className="text-xs bg-default-100 dark:bg-slate-950/50 px-3.5 py-2.5 rounded-xl inline-block text-default-600">
                    <span className="font-medium text-default-700">Funding:</span> {s.funding_stage}
                  </div>
                </div>

                <div className="pt-5 border-t border-divider mt-5 flex items-center justify-between">
                  <span className="text-xs text-default-400">
                    Founder: {s.founder_email.split("@")[0]}
                  </span>
                  <Link
                    href={`/startups/${s._id}`}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-xl transition text-xs cursor-pointer"
                  >
                    View details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
