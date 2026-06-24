"use client";
import { useState, useEffect } from "react";
import PrivateRoute from "@/components/shared/PrivateRoute";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function CollaboratorProfilePage() {
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
    const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY || "YOUR_IMGBB_API_KEY_HERE";
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
    <PrivateRoute allowedRoles={["collaborator"]}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Header Section */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            My Profile
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-slate-400 mt-2">
            Update your collaborator profile details, bio, and expertise.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-300">
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            
            {/* Image Upload Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 pb-6 sm:pb-8 border-b border-gray-100 dark:border-slate-800">
              <div className="shrink-0 relative">
                <img
                  src={imageUrl || "/default-avatar.png"}
                  alt={name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-md ring-2 ring-blue-500/30"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-semibold text-gray-800 dark:text-slate-200 mb-2">
                  Profile Picture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="block w-full text-sm text-gray-500 dark:text-slate-400 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 dark:file:bg-blue-900/30 file:px-5 file:py-2.5 file:text-sm file:font-semibold file:text-blue-600 dark:file:text-blue-400 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/50 cursor-pointer transition-colors"
                />
                <p className="mt-2 text-xs text-gray-400 dark:text-slate-500">
                  Recommended: Square image, max 2MB.
                </p>
              </div>
            </div>

            {/* Inputs Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 px-4 py-3 text-gray-900 dark:text-white text-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {/* Email (Disabled) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  disabled
                  value={user?.email || ""}
                  className="w-full rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-100 dark:bg-slate-900/50 px-4 py-3 text-gray-500 dark:text-slate-500 text-sm outline-none cursor-not-allowed opacity-80"
                />
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                Skills <span className="text-gray-400 font-normal">(Comma separated, e.g. React, UI/UX, SEO)</span>
              </label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="e.g. Next.js, Figma, Digital Marketing"
                className="w-full rounded-xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 px-4 py-3 text-gray-900 dark:text-white text-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                Short Bio
              </label>
              <textarea
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Write a brief description about your experience, achievements, and what you are looking for..."
                className="w-full rounded-xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 px-4 py-3 text-gray-900 dark:text-white text-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 resize-y"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
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
                    Saving Changes...
                  </>
                ) : (
                  "Save Profile Details"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </PrivateRoute>
  );
}