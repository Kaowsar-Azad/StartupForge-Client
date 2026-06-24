"use client";

export default function LoadingSpinner() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-slate-950 px-4">
      <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-10 text-center shadow-xl backdrop-blur-md">
        <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-slate-700 border-t-blue-500" />
        <p className="mt-5 text-lg font-medium text-white">Loading...</p>
        <p className="mt-2 text-sm text-slate-400">
          Please wait while data is being prepared.
        </p>
      </div>
    </div>
  );
}