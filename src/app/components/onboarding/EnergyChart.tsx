"use client";

import React from 'react';

interface EnergyChartProps {
  currentEnergy: number;
  targetEnergy: number;
  className?: string;
}

export function EnergyChart({ currentEnergy, targetEnergy, className = '' }: EnergyChartProps) {
  const energyPercentage = (currentEnergy / targetEnergy) * 100;
  const energyLevels = [
    { level: 'Low', value: 25, color: 'from-red-500 to-orange-500' },
    { level: 'Moderate', value: 50, color: 'from-orange-500 to-yellow-500' },
    { level: 'Good', value: 75, color: 'from-yellow-500 to-green-500' },
    { level: 'Optimal', value: 100, color: 'from-green-500 to-emerald-500' }
  ];

  const currentLevel = energyLevels.find(level => currentEnergy <= level.value) || energyLevels[energyLevels.length - 1];

  return (
    <div className={`bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6 ${className}`}>
      <h3 className="text-title-sm text-white font-semibold mb-4 text-center">Your Energy Transformation</h3>
      
      {/* Current Energy Level */}
      <div className="text-center mb-6">
        <div className="text-display-2xl text-white font-bold mb-2">{currentEnergy}%</div>
        <div className="text-body-md text-white/70">Current Energy Level</div>
        <div className={`text-body-sm font-semibold mt-1 bg-gradient-to-r ${currentLevel.color} bg-clip-text text-transparent`}>
          {currentLevel.level}
        </div>
      </div>

      {/* Energy Gauge */}
      <div className="relative w-32 h-32 mx-auto mb-6">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
          {/* Background Circle */}
          <circle
            cx="60"
            cy="60"
            r="50"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="8"
            fill="none"
          />
          {/* Progress Circle */}
          <circle
            cx="60"
            cy="60"
            r="50"
            stroke="url(#energyGradient)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 50}`}
            strokeDashoffset={`${2 * Math.PI * 50 * (1 - energyPercentage / 100)}`}
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="33%" stopColor="#f97316" />
              <stop offset="66%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-title-md text-white font-bold">{targetEnergy}%</div>
            <div className="text-caption text-white/60">Target</div>
          </div>
        </div>
      </div>

      {/* Energy Levels Legend */}
      <div className="grid grid-cols-2 gap-3">
        {energyLevels.map((level, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${level.color}`} />
            <span className="text-caption text-white/70">{level.level}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


