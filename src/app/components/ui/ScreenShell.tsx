"use client";

import React from "react";

export function ScreenShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-[#40C4FF] via-[#4DD0E1] to-[#006064] text-white relative overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}



