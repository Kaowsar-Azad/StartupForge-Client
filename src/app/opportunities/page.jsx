"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function BrowseOpportunitiesPage() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [workType, setWorkType] = useState("");
  const [industry, setIndustry] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOpportunities = async () => {
    setLoading(true);
    try {
      const params = {
        search,
        page,
        limit: 6,
      };
      if (workType) params.work_type = workType;
      if (industry) params.industry = industry;

      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/opportunities`, {
        params,
      });
      setOpportunities(res.data.opportunities);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching opportunities:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchOpportunities();
    }, 300); // Debounce search
    return () => clearTimeout(timer);
  }, [search, workType, industry, page]);

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Browse <span className="text-blue-500">Opportunities</span>
          </h1>
          <p className="text-default-500 max-w-xl mx-auto text-base sm:text-lg">
            Find your next startup role. Connect with founder teams looking for developers, designers, and marketers.
          </p>
        </div>

        {/* Search and Filter Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white dark:bg-slate-900 border border-divider p-5 rounded-2xl">
          <input
            type="text"
            placeholder="Search roles or skills (e.g. React)..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-xl border border-divider bg-default-50 dark:bg-slate-950 px-4 py-3 text-foreground placeholder-default-400 text-sm outline-none focus:border-blue-500"
          />

          <select
            value={workType}
            onChange={(e) => {
              setWorkType(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-xl border border-divider bg-default-50 dark:bg-slate-950 px-4 py-3 text-default-600 text-sm outline-none focus:border-blue-500"
          >
            <option value="">All Work Types</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Onsite">Onsite</option>
          </select>

          <input
            type="text"
            placeholder="Filter by Industry (e.g. SaaS, Fintech)..."
            value={industry}
            onChange={(e) => {
              setIndustry(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-xl border border-divider bg-default-50 dark:bg-slate-950 px-4 py-3 text-foreground placeholder-default-400 text-sm outline-none focus:border-blue-500"
          />
        </div>

        {/* List of Opportunity Cards */}
        {loading ? (
          <LoadingSpinner />
        ) : opportunities.length === 0 ? (
          <div className="text-center py-16 text-default-500 bg-default-50 dark:bg-slate-900/50 border border-divider rounded-3xl">
            No opportunities found matching your criteria.
          </div>
        ) : (
          <>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {opportunities.map((opp) => (
                <div key={opp._id} className="bg-white dark:bg-slate-900 border border-divider rounded-2xl p-6 flex flex-col justify-between hover:border-blue-500/50 transition-all duration-300 shadow-xl group">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={opp.startup_id?.logo || "/default-startup.png"}
                        alt={opp.startup_id?.startup_name}
                        className="w-12 h-12 rounded-xl object-cover border border-divider"
                      />
                      <div>
                        <h3 className="font-bold text-lg text-foreground group-hover:text-blue-500 transition">
                          {opp.role_title}
                        </h3>
                        <p className="text-default-500 text-sm">
                          {opp.startup_id?.startup_name}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {(Array.isArray(opp.required_skills) ? opp.required_skills : (opp.required_skills || "").split(",")).map((skill, idx) => (
                        <span key={idx} className="bg-blue-500/10 text-blue-500 dark:text-blue-300 text-xs px-2.5 py-1 rounded-full font-medium">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-default-600 bg-default-100 dark:bg-slate-950/50 p-3 rounded-xl">
                      <p><span className="font-semibold text-default-800">Type:</span> {opp.work_type}</p>
                      <p><span className="font-semibold text-default-800">Commit:</span> {opp.commitment_level}</p>
                      <p className="col-span-2"><span className="font-semibold text-default-800">Deadline:</span> {new Date(opp.deadline).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-divider mt-5">
                    <Link
                      href={`/opportunities/${opp._id}`}
                      className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-xl transition text-sm cursor-pointer"
                    >
                      View Details & Apply
                    </Link>
                  </div>
                </div>
              ))}
            </div>

             {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 pt-6">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((prev) => prev - 1)}
                  className="bg-default-100 hover:bg-default-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-divider px-4 py-2 rounded-xl text-sm font-medium transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-foreground"
                >
                  ◀ Previous
                </button>
                <span className="text-sm font-semibold text-default-600">
                  Page {page} of {totalPages}
                </span>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((prev) => prev + 1)}
                  className="bg-default-100 hover:bg-default-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-divider px-4 py-2 rounded-xl text-sm font-medium transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-foreground"
                >
                  Next ▶
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
