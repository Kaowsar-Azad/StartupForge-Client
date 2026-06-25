"use client";
import { useState, useEffect } from "react";
import PrivateRoute from "@/components/shared/PrivateRoute";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.email) return;
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/${user.email}`,
          { withCredentials: true }
        );
        setProfile(res.data);
        if (res.data) {
          setName(res.data.name || "");
          setBio(res.data.bio || "");
          setSkills(res.data.skills || "");
          setImageUrl(res.data.image || "");
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const uploadImage = async () => {
    if (!imageFile) return imageUrl;
    const formData = new FormData();
    formData.append("image", imageFile);
    const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY || "e519280d0d80c3546700c0a597bf6db2"; // Default fallback key if not set
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.success) {
      return data.data.display_url;
    } else {
      throw new Error("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      let finalImageUrl = imageUrl;
      if (imageFile) {
        toast.info("Uploading image...");
        finalImageUrl = await uploadImage();
      }

      const payload = {
        name,
        bio,
        skills,
        image: finalImageUrl,
      };

      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${user.email}`,
        payload,
        { withCredentials: true }
      );

      toast.success("Profile updated successfully! 🎉");
      setProfile(res.data);
      setImageUrl(res.data.image);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
      console.error(err);
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <PrivateRoute>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 min-h-screen text-white">
        {/* Header Section */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Profile Settings
          </h1>
          <p className="text-slate-400 mt-2 text-sm">
            Manage your personal profile details, bio, and experience level.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Image Upload Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-8 border-b border-slate-800">
              <div className="shrink-0 relative">
                <img
                  src={imageUrl || "/default-avatar.png"}
                  alt={name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-slate-800 shadow-xl ring-2 ring-blue-500/30"
                />
              </div>
              <div className="w-full space-y-2">
                <label className="block text-sm font-semibold text-slate-200">
                  Profile Picture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="block w-full text-sm text-slate-400 file:mr-4 file:rounded-xl file:border-0 file:bg-blue-600/10 file:px-5 file:py-2.5 file:text-sm file:font-semibold file:text-blue-400 hover:file:bg-blue-600/20 cursor-pointer transition-colors"
                />
                <p className="text-xs text-slate-500">
                  Recommended: Square aspect ratio, max 2MB.
                </p>
              </div>
            </div>

            {/* Inputs Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-slate-350 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white text-sm outline-none transition duration-250 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {/* Email (Disabled) */}
              <div>
                <label className="block text-sm font-medium text-slate-350 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  disabled
                  value={user?.email || ""}
                  className="w-full rounded-xl border border-slate-850 bg-slate-950/50 px-4 py-3 text-slate-500 text-sm outline-none cursor-not-allowed opacity-60"
                />
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-slate-350 mb-2">
                Skills <span className="text-slate-500 font-normal">(Comma separated, e.g. React, Node.js, Design)</span>
              </label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="e.g. Next.js, Figma, Marketing"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white text-sm outline-none transition duration-250 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-slate-350 mb-2">
                Short Bio
              </label>
              <textarea
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself, your background, or your startup interests..."
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white text-sm outline-none transition duration-250 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 resize-y"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitLoading}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3.5 rounded-xl transition shadow-lg shadow-blue-600/20 text-sm disabled:bg-blue-800 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {submitLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving Changes...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </PrivateRoute>
  );
}