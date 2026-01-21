"use client";

import React, { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log for debugging; Next will also show overlay in dev.
    console.error("Route error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-800 via-orange-700 to-orange-600 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.45)]">
        <div className="text-center">
          <div className="text-yellow-300 text-sm font-semibold tracking-widest uppercase mb-2">
            Something went wrong
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">We hit a solar flare.</h1>
          <p className="text-white/70 text-sm mb-6">
            Please try again. If it keeps happening, refresh the page.
          </p>

          <button
            type="button"
            onClick={reset}
            className="w-full rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-semibold py-3 transition-all"
          >
            Try again
          </button>

          {process.env.NODE_ENV !== "production" && (
            <div className="mt-5 text-left">
              <div className="text-xs text-white/50 mb-1">Dev details:</div>
              <pre className="text-xs text-white/70 bg-black/40 border border-white/10 rounded-xl p-3 overflow-auto">
                {error?.message}
              </pre>
              {error?.digest && (
                <div className="text-xs text-white/40 mt-2">digest: {error.digest}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



