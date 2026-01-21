"use client";

import React, { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen bg-gradient-to-br from-amber-800 via-orange-700 to-orange-600 text-white flex items-center justify-center p-6">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.45)]">
            <div className="text-center">
              <div className="text-yellow-300 text-sm font-semibold tracking-widest uppercase mb-2">
                System error
              </div>
              <h1 className="text-2xl font-bold text-white mb-3">The app needs a restart.</h1>
              <p className="text-white/70 text-sm mb-6">
                Tap below to reload the app.
              </p>

              <button
                type="button"
                onClick={reset}
                className="w-full rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-semibold py-3 transition-all"
              >
                Reload
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
      </body>
    </html>
  );
}



