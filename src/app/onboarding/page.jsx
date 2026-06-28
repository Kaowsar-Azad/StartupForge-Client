"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { Briefcase, Persons, Check, ArrowRight } from "@gravity-ui/icons";

const apiBase =
  typeof window !== "undefined" &&
  !(process.env.NEXT_PUBLIC_API_URL || "").includes("localhost")
    ? ""
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function OnboardingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const [selectedRole, setSelectedRole] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user && user.role !== "unassigned") {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  const handleRoleSelection = async () => {
    if (!selectedRole) {
      toast.error("Please select a role to continue.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await axios.put(`${apiBase}/api/users/${user?.email}`, 
        { role: selectedRole },
        { withCredentials: true }
      );
      
      if (response.data) {
        toast.success(`Welcome aboard as a ${selectedRole}! 🎉`);
        window.location.href = `/dashboard/${selectedRole}`;
      }
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Failed to setup your account. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (user.role !== "unassigned") {
    return null; 
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#FAFAFA] dark:bg-slate-950 font-sans">
      
      <div className="w-full max-w-[800px] relative z-10 p-6 md:p-10">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
            Choose your journey
          </h1>
          <p className="text-base md:text-lg text-slate-500 dark:text-slate-400">
            Select how you plan to use StartupForge to personalize your experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 max-w-2xl mx-auto mb-10">
          
          {/* Founder Card */}
          <div 
            onClick={() => setSelectedRole("founder")}
            className={`
              group cursor-pointer rounded-2xl p-6 border transition-all duration-200 flex flex-col relative
              ${selectedRole === "founder" 
                ? "border-blue-500 bg-blue-50/30 dark:bg-blue-900/10 shadow-md shadow-blue-500/5 ring-1 ring-blue-500" 
                : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm"
              }
            `}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center transition-colors
                ${selectedRole === "founder" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 dark:group-hover:bg-slate-800 dark:group-hover:text-blue-400"}
              `}>
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Founder</h3>
              
              <div className="ml-auto">
                <div className={`
                  w-6 h-6 rounded-full border flex items-center justify-center transition-all
                  ${selectedRole === "founder" ? "border-blue-600 bg-blue-600" : "border-slate-300 dark:border-slate-600"}
                `}>
                  <Check className={`w-3.5 h-3.5 text-white transition-opacity ${selectedRole === "founder" ? "opacity-100" : "opacity-0"}`} />
                </div>
              </div>
            </div>
            
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Publish startup ideas, build teams, and recruit talented professionals to bring your vision to life.
            </p>
          </div>

          {/* Collaborator Card */}
          <div 
            onClick={() => setSelectedRole("collaborator")}
            className={`
              group cursor-pointer rounded-2xl p-6 border transition-all duration-200 flex flex-col relative
              ${selectedRole === "collaborator" 
                ? "border-emerald-500 bg-emerald-50/30 dark:bg-emerald-900/10 shadow-md shadow-emerald-500/5 ring-1 ring-emerald-500" 
                : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm"
              }
            `}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center transition-colors
                ${selectedRole === "collaborator" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 dark:group-hover:bg-slate-800 dark:group-hover:text-emerald-400"}
              `}>
                <Persons className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Collaborator</h3>
              
              <div className="ml-auto">
                <div className={`
                  w-6 h-6 rounded-full border flex items-center justify-center transition-all
                  ${selectedRole === "collaborator" ? "border-emerald-600 bg-emerald-600" : "border-slate-300 dark:border-slate-600"}
                `}>
                  <Check className={`w-3.5 h-3.5 text-white transition-opacity ${selectedRole === "collaborator" ? "opacity-100" : "opacity-0"}`} />
                </div>
              </div>
            </div>
            
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Explore startup opportunities, apply for roles, and join exciting teams as a talented professional.
            </p>
          </div>

        </div>

        <div className="flex justify-center">
          <button
            onClick={handleRoleSelection}
            disabled={!selectedRole || isSubmitting}
            className={`
              px-8 py-3.5 rounded-xl font-medium text-sm transition-all flex items-center gap-2
              ${!selectedRole 
                ? "bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500 cursor-not-allowed" 
                : "bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 shadow-sm active:scale-[0.98]"
              }
            `}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                Continue to Dashboard
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
