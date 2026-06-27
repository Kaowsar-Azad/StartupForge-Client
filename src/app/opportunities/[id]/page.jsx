"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import Link from "next/link";

export default function OpportunityDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);

  // Apply form states
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [portfolioLink, setPortfolioLink] = useState("");
  const [motivation, setMotivation] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/opportunities/${id}`);
        setOpportunity(res.data);
      } catch (err) {
        console.error("Error fetching opportunity details:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetails();
  }, [id]);

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (!motivation) {
      toast.error("Please explain your motivation to join!");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        opportunity_id: id,
        portfolio_link: portfolioLink,
        motivation,
      };

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/applications`, payload, {
        withCredentials: true,
      });

      toast.success("Application submitted successfully! 🎉");
      setShowApplyModal(false);
      setPortfolioLink("");
      setMotivation("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!opportunity) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-center items-center text-foreground p-4">
        <h1 className="text-2xl font-bold">Opportunity not found</h1>
        <Link href="/opportunities" className="text-blue-500 mt-4 underline">Back to Browse</Link>
      </div>
    );
  }

  const isCollaborator = user?.role === "collaborator";

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 bg-white dark:bg-slate-900 border border-divider rounded-3xl p-6 sm:p-10 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pb-6 border-b border-divider">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <img
              src={opportunity.startup_id?.logo || "/default-startup.png"}
              alt={opportunity.startup_id?.startup_name}
              className="w-20 h-20 rounded-2xl object-cover border border-divider"
            />
            <div className="text-center sm:text-left space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold">{opportunity.role_title}</h1>
              <p className="text-default-500 font-medium">
                at <span className="text-blue-500">{opportunity.startup_id?.startup_name}</span>
              </p>
              <span className="inline-block bg-blue-500/10 text-blue-550 dark:text-blue-300 text-xs px-2.5 py-1 rounded-full font-medium mt-1">
                {opportunity.startup_id?.industry}
              </span>
            </div>
          </div>

          <div className="text-center sm:text-right space-y-1">
            <p className="text-xs text-default-500">Application Deadline</p>
            <p className="font-semibold text-red-500">
              {new Date(opportunity.deadline).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-foreground mb-2">About Startup</h2>
            <p className="text-default-600 text-sm leading-relaxed">
              {opportunity.startup_id?.description || "No description provided."}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-default-100 dark:bg-slate-950/40 p-5 rounded-2xl text-sm border border-divider">
            <div>
              <span className="text-xs text-default-500 block">Work Type</span>
              <span className="font-semibold text-default-800">{opportunity.work_type}</span>
            </div>
            <div>
              <span className="text-xs text-default-500 block">Commitment</span>
              <span className="font-semibold text-default-800">{opportunity.commitment_level}</span>
            </div>
            <div>
              <span className="text-xs text-default-500 block">Funding Stage</span>
              <span className="font-semibold text-default-800">{opportunity.startup_id?.funding_stage}</span>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-foreground mb-2">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {(Array.isArray(opportunity.required_skills) ? opportunity.required_skills : (opportunity.required_skills || "").split(",")).map((skill, idx) => (
                <span key={idx} className="bg-default-100 text-default-600 dark:bg-slate-800 dark:text-slate-200 text-sm px-3.5 py-1.5 rounded-xl font-medium">
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-divider flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link href="/opportunities" className="text-default-500 hover:text-foreground transition text-sm">
            ← Back to opportunities
          </Link>

          {!isAuthenticated ? (
            <Link
              href={`/login?callbackUrl=/opportunities/${id}`}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition text-sm"
            >
              Log in to Apply
            </Link>
          ) : isCollaborator ? (
            <button
              onClick={() => setShowApplyModal(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3.5 rounded-xl transition text-sm cursor-pointer shadow-lg shadow-blue-600/10"
            >
              Apply for this role
            </button>
          ) : (
            <span className="text-xs text-default-500 bg-default-100 dark:bg-slate-950/60 px-4 py-2 rounded-xl">
              Only Collaborators can apply.
            </span>
          )}
        </div>
      </div>

      {/* Apply Form Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-divider rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl text-foreground">
            <h2 className="text-xl font-bold text-foreground mb-2">Submit Application</h2>
            <p className="text-xs text-default-500 mb-6">Apply for {opportunity.role_title} at {opportunity.startup_id?.startup_name}</p>
            
            <form onSubmit={handleApplySubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-default-500 uppercase tracking-wider mb-2">Portfolio Link (Optional)</label>
                <input
                  type="url"
                  value={portfolioLink}
                  onChange={(e) => setPortfolioLink(e.target.value)}
                  placeholder="https://github.com/yourusername or behance.net/..."
                  className="w-full rounded-xl border border-divider bg-default-50 dark:bg-slate-950 px-4 py-3 text-foreground placeholder-default-400 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-default-500 uppercase tracking-wider mb-2">Motivation Letter *</label>
                <textarea
                  required
                  rows={5}
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  placeholder="Why are you a good fit for this role? What value can you bring to the startup?"
                  className="w-full rounded-xl border border-divider bg-default-50 dark:bg-slate-950 px-4 py-3 text-foreground placeholder-default-400 text-sm outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-3 rounded-xl transition text-sm disabled:bg-blue-400 cursor-pointer"
                >
                  {submitting ? "Submitting..." : "Submit Application"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="border border-divider text-foreground hover:bg-default-100 font-medium px-6 py-3 rounded-xl transition text-sm cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
