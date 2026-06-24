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
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Profile</h1>
          <p className="text-gray-500 dark:text-slate-400 mt-1">
            Update your collaborator profile details, bio, and expertise.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-100 dark:border-slate-800">
              <img
                src={imageUrl || "/default-avatar.png"}
                alt={name}
                className="w-24 h-24 rounded-full object-cover border-2 border-blue-500 shadow-sm"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-350 mb-2">Change Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-blue-600 hover:file:bg-blue-100 cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-705 dark:text-slate-300 mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 px-4 py-3 text-gray-900 dark:text-white text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-705 dark:text-slate-300 mb-2">Email Address</label>
                <input
                  type="email"
                  disabled
                  value={user?.email || ""}
                  className="w-full rounded-xl border border-gray-300 dark:border-slate-800 bg-gray-100 dark:bg-slate-800/50 px-4 py-3 text-gray-500 text-sm outline-none cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-705 dark:text-slate-300 mb-2">Skills (Comma separated, e.g. React, UI/UX, SEO)</label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="e.g. Next.js, Figma, Digital Marketing"
                className="w-full rounded-xl border border-gray-300 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 px-4 py-3 text-gray-900 dark:text-white text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-705 dark:text-slate-300 mb-2">Short Bio</label>
              <textarea
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Write a brief description about your experience, achievements, and what you are looking for..."
                className="w-full rounded-xl border border-gray-300 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 px-4 py-3 text-gray-900 dark:text-white text-sm outline-none focus:border-blue-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitLoading}
              className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-3 rounded-xl transition text-sm disabled:bg-blue-400 flex items-center gap-2 cursor-pointer"
            >
              {submitLoading ? "Saving Changes..." : "Save Profile Details"}
            </button>
          </form>
        </div>
      </div>
    </PrivateRoute>
  );
}
