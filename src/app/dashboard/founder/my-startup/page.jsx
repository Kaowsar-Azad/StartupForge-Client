"use client";
import { useState, useEffect } from "react";
import PrivateRoute from "@/components/shared/PrivateRoute";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function MyStartupPage() {
  const { user } = useAuth();
  const [startup, setStartup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [description, setDescription] = useState("");
  const [fundingStage, setFundingStage] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [logoUrl, setLogoUrl] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  const fetchStartup = async () => {
    if (!user?.email) return;
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/startups/founder/${user.email}`,
        { withCredentials: true }
      );
      setStartup(res.data);
      if (res.data) {
        setName(res.data.startup_name);
        setIndustry(res.data.industry);
        setDescription(res.data.description);
        setFundingStage(res.data.funding_stage);
        setLogoUrl(res.data.logo);
      }
    } catch (err) {
      if (err.response?.status !== 404) {
        console.error("Error fetching startup:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStartup();
  }, [user]);

  const uploadLogo = async () => {
    if (!logoFile) return logoUrl;
    const formData = new FormData();
    formData.append("image", logoFile);
    const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY || "YOUR_IMGBB_API_KEY_HERE";
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.success) {
      return data.data.display_url;
    } else {
      throw new Error("Logo upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      let finalLogoUrl = logoUrl;
      if (logoFile) {
        toast.info("Uploading startup logo...");
        finalLogoUrl = await uploadLogo();
      }

      const payload = {
        startup_name: name,
        logo: finalLogoUrl,
        industry,
        description,
        funding_stage: fundingStage,
      };

      if (startup) {
        // Update
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/startups/${startup._id}`,
          payload,
          { withCredentials: true }
        );
        toast.success("Startup profile updated! 🎉");
        setStartup(res.data);
        setIsEditing(false);
      } else {
        // Create
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/startups`,
          payload,
          { withCredentials: true }
        );
        toast.success("Startup registered! Under admin review. 🚀");
        setStartup(res.data);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
      console.error(err);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your startup profile? This action is permanent!")) return;
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/startups/${startup._id}`,
        { withCredentials: true }
      );
      toast.success("Startup profile deleted successfully.");
      setStartup(null);
      setName("");
      setIndustry("");
      setDescription("");
      setFundingStage("");
      setLogoUrl("");
      setLogoFile(null);
    } catch (err) {
      toast.error("Failed to delete startup");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <PrivateRoute allowedRoles={["founder"]}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        
        {/* Header Section */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            My Startup
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-slate-400 mt-2">
            Manage your startup profile and status.
          </p>
        </div>

        {startup && !isEditing ? (
          /* ================= VIEW MODE ================= */
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-300 space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 sm:pb-8 border-b border-gray-100 dark:border-slate-800">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 w-full sm:w-auto">
                <img
                  src={startup.logo || "/default-startup.png"}
                  alt={startup.startup_name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-white dark:border-slate-800 object-cover shadow-md ring-2 ring-blue-500/20"
                />
                <div className="text-center sm:text-left flex flex-col justify-center h-full mt-2 sm:mt-0">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    {startup.startup_name}
                  </h2>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm sm:text-base mt-1">
                    {startup.industry}
                  </p>
                  <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-2">
                    <span className="text-gray-600 dark:text-slate-300 text-xs font-medium capitalize bg-gray-100 dark:bg-slate-800 px-3 py-1.5 rounded-full border border-gray-200 dark:border-slate-700">
                      Funding: {startup.funding_stage}
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full sm:w-auto flex justify-center sm:justify-end">
                <span className={`text-sm px-4 py-2 rounded-full font-bold capitalize flex items-center gap-2 shadow-sm ${
                  startup.status === "approved"
                    ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20"
                    : startup.status === "rejected"
                    ? "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20"
                    : "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20"
                }`}>
                  <span className={`w-2 h-2 rounded-full ${startup.status === "approved" ? "bg-emerald-500" : startup.status === "rejected" ? "bg-red-500" : "bg-amber-500 animate-pulse"}`}></span>
                  Status: {startup.status}
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg">About Startup</h3>
              <p className="text-gray-600 dark:text-slate-400 text-sm sm:text-base mt-3 leading-relaxed whitespace-pre-wrap">
                {startup.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6">
              <button
                onClick={() => setIsEditing(true)}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 text-sm shadow-sm hover:shadow-md"
              >
                Edit Profile
              </button>
              <button
                onClick={handleDelete}
                className="w-full sm:w-auto bg-red-50 dark:bg-red-500/10 hover:bg-red-600 hover:text-white text-red-600 dark:text-red-400 font-semibold px-6 py-3 rounded-xl transition-all duration-200 text-sm border border-red-200 dark:border-transparent hover:border-transparent shadow-sm"
              >
                Delete Profile
              </button>
            </div>
          </div>
        ) : (
          /* ================= EDIT / CREATE MODE ================= */
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
              {startup ? "Edit Startup Profile" : "Register New Startup"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Startup Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                    Startup Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Acme Tech"
                    className="w-full rounded-xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 px-4 py-3 text-gray-900 dark:text-white text-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                {/* Industry */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                    Industry <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="e.g. SaaS, Fintech, AI"
                    className="w-full rounded-xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 px-4 py-3 text-gray-900 dark:text-white text-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                {/* Funding Stage */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                    Funding Stage <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={fundingStage}
                    onChange={(e) => setFundingStage(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 px-4 py-3 text-gray-900 dark:text-white text-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 cursor-pointer"
                  >
                    <option value="" disabled>Select Funding Stage</option>
                    <option value="Idea/Pre-Seed">Idea/Pre-Seed</option>
                    <option value="Seed">Seed</option>
                    <option value="Series A+">Series A+</option>
                    <option value="Bootstrapped">Bootstrapped</option>
                  </select>
                </div>

                {/* Startup Logo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                    Startup Logo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setLogoFile(e.target.files[0])}
                    className="w-full rounded-xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 px-4 py-2.5 text-gray-500 dark:text-slate-400 text-sm outline-none file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 dark:file:bg-blue-900/30 file:px-5 file:py-1.5 file:text-xs file:font-semibold file:text-blue-600 dark:file:text-blue-400 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/50 cursor-pointer transition-colors"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your startup idea, vision, and team goals..."
                  className="w-full rounded-xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 px-4 py-3 text-gray-900 dark:text-white text-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 resize-y"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 text-sm disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                >
                  {submitLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    "Save Startup Profile"
                  )}
                </button>
                {startup && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="w-full sm:w-auto bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300 font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 text-sm shadow-sm"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </PrivateRoute>
  );
}