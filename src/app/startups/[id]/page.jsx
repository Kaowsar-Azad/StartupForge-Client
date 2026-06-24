"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import Link from "next/link";

export default function StartupDetailsPage() {
  const { id } = useParams();
  const [startup, setStartup] = useState(null);
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStartupDetails = async () => {
      try {
        // 1. Fetch startup details
        const startupRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/startups/${id}`);
        setStartup(startupRes.data);

        // 2. Fetch opportunities and filter for this startup
        const oppsRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/opportunities?limit=100`);
        const filteredOpps = (oppsRes.data.opportunities || []).filter(
          (opp) => opp.startup_id?._id === id
        );
        setOpportunities(filteredOpps);
      } catch (err) {
        console.error("Error fetching startup details:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchStartupDetails();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!startup) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center text-white p-4">
        <h1 className="text-2xl font-bold">Startup not found</h1>
        <Link href="/startups" className="text-blue-500 mt-4 underline">Back to Browse</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Startup Header card */}
        <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={startup.logo || "/default-startup.png"}
            alt={startup.startup_name}
            className="w-28 h-28 rounded-2xl object-cover border border-white/10 shadow-md"
          />
          <div className="text-center sm:text-left space-y-2 flex-1">
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold">{startup.startup_name}</h1>
                <p className="text-blue-400 font-semibold mt-1">{startup.industry}</p>
              </div>
              <span className="bg-blue-500/10 text-blue-300 text-xs px-3.5 py-1.5 rounded-full font-semibold capitalize">
                Funding: {startup.funding_stage}
              </span>
            </div>
            <p className="text-xs text-slate-450 pt-2">
              Founder contact: <span className="text-slate-300 font-mono">{startup.founder_email}</span>
            </p>
          </div>
        </div>

        {/* Details & description section */}
        <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-3">About {startup.startup_name}</h2>
            <p className="text-slate-305 text-sm leading-relaxed whitespace-pre-line">
              {startup.description}
            </p>
          </div>
        </div>

        {/* Opportunities posted by this startup */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Open Team Opportunities</h2>
          {opportunities.length === 0 ? (
            <div className="bg-slate-905 border border-white/5 p-8 rounded-3xl text-center text-slate-500">
              No open opportunities at the moment. Check back later!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {opportunities.map((opp) => (
                <div key={opp._id} className="bg-slate-900 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-500/50 transition-all duration-300 shadow-xl group">
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition">
                      {opp.role_title}
                    </h3>

                    <div className="flex flex-wrap gap-1.5">
                      {opp.required_skills.split(",").map((skill, idx) => (
                        <span key={idx} className="bg-blue-500/10 text-blue-300 text-xs px-2.5 py-1 rounded-full font-medium">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 bg-slate-950/40 p-3 rounded-xl">
                      <p><span className="font-semibold text-slate-350">Type:</span> {opp.work_type}</p>
                      <p><span className="font-semibold text-slate-350">Commit:</span> {opp.commitment_level}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 mt-4">
                    <Link
                      href={`/opportunities/${opp._id}`}
                      className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-xl transition text-sm cursor-pointer"
                    >
                      View Role Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4">
          <Link href="/startups" className="text-slate-400 hover:text-white transition text-sm">
            ← Back to Browse Startups
          </Link>
        </div>
      </div>
    </div>
  );
}
