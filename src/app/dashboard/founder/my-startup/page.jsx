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
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Startup</h1>
          <p className="text-gray-500 dark:text-slate-400 mt-1">
            Manage your startup profile and status.
          </p>
        </div>

        {startup && !isEditing ? (
          <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pb-6 border-b border-gray-100 dark:border-slate-800">
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <img
                  src={startup.logo || "/default-startup.png"}
                  alt={startup.startup_name}
                  className="w-24 h-24 rounded-2xl border border-gray-200 dark:border-slate-800 object-cover shadow-sm"
                />
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{startup.startup_name}</h2>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mt-0.5">{startup.industry}</p>
                  <p className="text-gray-400 text-xs mt-1 capitalize bg-gray-50 dark:bg-slate-850 px-2 py-0.5 rounded-full inline-block">
                    Funding: {startup.funding_stage}
                  </p>
                </div>
              </div>

              <div>
                <span className={`text-xs px-3 py-1.5 rounded-full font-semibold capitalize ${
                  startup.status === "approved"
                    ? "bg-emerald-500/10 text-emerald-500"
                    : startup.status === "rejected"
                    ? "bg-red-500/10 text-red-500"
                    : "bg-amber-500/10 text-amber-500"
                }`}>
                  Status: {startup.status}
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 dark:text-white text-base">About Startup</h3>
              <p className="text-gray-600 dark:text-slate-300 text-sm mt-2 leading-relaxed">
                {startup.description}
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-2.5 rounded-xl transition text-sm cursor-pointer"
              >
                Edit Profile
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500/10 hover:bg-red-550 hover:text-white text-red-400 font-medium px-5 py-2.5 rounded-xl transition text-sm cursor-pointer"
              >
                Delete Profile
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              {startup ? "Edit Startup Profile" : "Register New Startup"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Startup Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Acme Tech"
                    className="w-full rounded-xl border border-gray-300 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 px-4 py-3 text-gray-900 dark:text-white text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Industry *</label>
                  <input
                    type="text"
                    required
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="e.g. SaaS, Fintech, AI"
                    className="w-full rounded-xl border border-gray-300 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 px-4 py-3 text-gray-900 dark:text-white text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Funding Stage *</label>
                  <select
                    required
                    value={fundingStage}
                    onChange={(e) => setFundingStage(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 px-4 py-3 text-gray-900 dark:text-white text-sm outline-none focus:border-blue-500"
                  >
                    <option value="" disabled>Select Funding Stage</option>
                    <option value="Idea/Pre-Seed">Idea/Pre-Seed</option>
                    <option value="Seed">Seed</option>
                    <option value="Series A+">Series A+</option>
                    <option value="Bootstrapped">Bootstrapped</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Startup Logo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setLogoFile(e.target.files[0])}
                    className="w-full rounded-xl border border-gray-300 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 px-4 py-2.5 text-gray-750 text-sm outline-none file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-1.5 file:text-xs file:font-semibold file:text-blue-600 hover:file:bg-blue-100 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Description *</label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your startup idea, vision, and team goals..."
                  className="w-full rounded-xl border border-gray-300 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 px-4 py-3 text-gray-900 dark:text-white text-sm outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-3 rounded-xl transition text-sm disabled:bg-blue-400 flex items-center gap-2 cursor-pointer"
                >
                  {submitLoading ? "Saving..." : "Save Startup Profile"}
                </button>
                {startup && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="border border-gray-300 dark:border-slate-800 text-gray-700 dark:text-slate-300 font-medium px-6 py-3 rounded-xl transition text-sm cursor-pointer"
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
