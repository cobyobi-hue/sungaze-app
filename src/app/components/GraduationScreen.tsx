"use client";

import React, { useState, useEffect } from "react";
import { Crown } from "lucide-react";

interface GraduationScreenProps {
  onComplete: () => void;
}

export function GraduationScreen({ onComplete }: GraduationScreenProps) {
  const [phase, setPhase] = useState<'ceremony' | 'white' | 'complete'>('ceremony');

  useEffect(() => {
    // Show ceremony for 5 seconds, then transition to white screen
    const ceremonyTimer = setTimeout(() => {
      setPhase('white');
    }, 5000);

    return () => clearTimeout(ceremonyTimer);
  }, []);

  useEffect(() => {
    if (phase === 'white') {
      // Show white screen for 10 seconds, then complete
      const whiteTimer = setTimeout(() => {
        setPhase('complete');
        onComplete();
      }, 10000);

      return () => clearTimeout(whiteTimer);
    }
  }, [phase, onComplete]);

  // Silent white screen phase
  if (phase === 'white') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        {/* Pure white silence */}
      </div>
    );
  }

  // Graduation ceremony phase
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Golden graduation background */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-200 via-orange-300 to-yellow-400" />
      
      {/* Radial golden glow */}
      <div className="absolute inset-0 bg-radial-gradient from-white/30 via-transparent to-transparent" />

      {/* Sacred light rays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-1 bg-gradient-to-t from-transparent via-white/20 to-transparent animate-pulse"
            style={{
              height: '200%',
              transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
              transformOrigin: 'center',
              animationDelay: `${i * 0.2}s`,
              animationDuration: '3s',
            }}
          />
        ))}
      </div>

      {/* Floating light particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/40 animate-pulse"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 4}s`,
              filter: "blur(0.5px)",
            }}
          />
        ))}
      </div>

      {/* Central content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center px-8">
          {/* Crown Icon */}
          <div className="mb-8">
            <div className="relative inline-flex items-center justify-center">
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-full bg-white/20 blur-3xl scale-150 animate-pulse" />
              
              {/* Main crown */}
              <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-yellow-200 to-orange-400 flex items-center justify-center shadow-[0_0_60px_rgba(255,215,0,0.8)] border-4 border-white/30">
                <Crown className="w-16 h-16 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]" />
              </div>
              
              {/* Pulsing rings */}
              <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping" style={{ animationDuration: '2s' }} />
              <div className="absolute inset-4 rounded-full border border-white/30 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl text-white font-thin mb-6 drop-shadow-[0_0_30px_rgba(255,255,255,0.8)] tracking-[0.3em]">
            CROWNED
          </h1>
          
          <h2 className="text-3xl text-white font-thin mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] tracking-[0.2em]">
            BY THE SUN
          </h2>

          {/* Sacred message */}
          <div className="max-w-md mx-auto">
            <p className="text-white text-lg leading-relaxed font-light tracking-wide drop-shadow-lg">
              You have completed the sacred 270-day journey.
            </p>
            <p className="text-white text-base leading-relaxed font-light tracking-wide drop-shadow-lg mt-4">
              The light within you now shines as bright as the sun itself.
            </p>
          </div>

          {/* Completion indicator */}
          <div className="mt-12">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full px-6 py-3">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
              <span className="text-white text-sm font-light tracking-wide">
                Journey Complete
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}