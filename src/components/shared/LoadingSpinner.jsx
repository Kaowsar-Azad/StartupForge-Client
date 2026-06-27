"use client";

import { Spinner } from "@heroui/react";

export default function LoadingSpinner() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4 transition-colors duration-300">
      <div className="rounded-3xl border border-divider bg-white dark:bg-slate-900/80 px-10 py-12 text-center shadow-xl backdrop-blur-md w-full max-w-sm transition-all duration-300">
        <div className="flex justify-center">
          <Spinner size="lg" color="primary" />
        </div>
        <p className="mt-6 text-lg font-semibold text-foreground">Loading...</p>
        <p className="mt-2 text-sm text-default-500">
          Please wait while data is being prepared.
        </p>
      </div>
    </div>
  );
}