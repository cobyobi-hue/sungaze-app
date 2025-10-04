"use client";

import React from "react";
import { Shield } from "lucide-react";

export function SafeConditionsOnly() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl text-white font-thin tracking-wide mb-3 drop-shadow-lg">
          Practice Guidelines
        </h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-4" />
        <p className="text-white text-sm leading-relaxed font-light tracking-wide">
          Essential condition for safe practice
        </p>
      </div>

      {/* Single Safety Guideline - Safe Conditions Only */}
      <div className="space-y-4">
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-5 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-orange-400 to-yellow-400 shadow-lg flex-shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg text-white font-medium mb-1 drop-shadow-md">
                Safe Conditions
              </h4>
              <p className="text-white text-sm leading-relaxed">
                Practice only when the sun is low on the horizon and appears orange/red.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
