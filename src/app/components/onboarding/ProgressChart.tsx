"use client";

import React from 'react';

interface ProgressChartProps {
  currentDay: number;
  totalDays: number;
  className?: string;
}

export function ProgressChart({ currentDay, totalDays, className = '' }: ProgressChartProps) {
  const progress = (currentDay / totalDays) * 100;
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  return (
    <div className={`bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6 ${className}`}>
      <h3 className="text-title-sm text-white font-semibold mb-4 text-center">Your 273-Day Transformation Journey</h3>
      
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-caption text-white/60">Day {currentDay} of {totalDays}</span>
          <span className="text-caption text-white/60">{Math.round(progress)}% Complete</span>
        </div>
        <div className="h-3 bg-blue-500/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Day Grid */}
      <div className="grid grid-cols-10 gap-1 mb-4">
        {days.map((day) => (
          <div
            key={day}
            className={`h-2 rounded-sm transition-all duration-300 ${
              day <= currentDay
                ? 'bg-gradient-to-r from-yellow-400 to-amber-500'
                : day === currentDay + 1
                ? 'bg-blue-400/60'
                : 'bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Milestones */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="space-y-1">
          <div className="text-number-display text-yellow-400 font-bold">10s</div>
          <div className="text-caption text-white/60">Day 1</div>
        </div>
        <div className="space-y-1">
          <div className="text-number-display text-orange-400 font-bold">15m</div>
          <div className="text-caption text-white/60">Day 90</div>
        </div>
        <div className="space-y-1">
          <div className="text-number-display text-amber-400 font-bold">44m</div>
          <div className="text-caption text-white/60">Day 273</div>
        </div>
      </div>
    </div>
  );
}
