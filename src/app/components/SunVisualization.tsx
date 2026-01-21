"use client";

import React, { useState } from "react";
import { SolarFlareGesture } from "./SolarFlareGesture";

interface SunVisualizationProps {
  isActive: boolean;
  progress: number;
  onFlareAction?: (action: string, intensity: number) => void;
  timeLeft?: number; // Add timeLeft prop for integrated timer
}

export function SunVisualization({ isActive, progress, onFlareAction, timeLeft }: SunVisualizationProps) {
  const [flareEffect, setFlareEffect] = useState<{ direction: string; intensity: number } | null>(null);

  const handleFlareGesture = (direction: string, intensity: number) => {
    setFlareEffect({ direction, intensity });
    
    // Trigger action based on direction
    let action = '';
    switch (direction) {
      case 'sunrise':
        action = `Sunrise mode activated with ${Math.round(intensity * 100)}% intensity`;
        break;
      case 'sunset':
        action = `Sunset mode activated with ${Math.round(intensity * 100)}% intensity`;
        break;
      case 'weather-ne':
      case 'weather-nw':
      case 'weather-se':
      case 'weather-sw':
        action = `Weather check initiated (${direction.split('-')[1].toUpperCase()}) - ${Math.round(intensity * 100)}% power`;
        break;
      default:
        action = `Solar flare detected: ${direction}`;
    }
    
    onFlareAction?.(action, intensity);
    
    // Clear effect after animation
    setTimeout(() => setFlareEffect(null), 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-center min-h-[400px] relative overflow-visible" style={{ filter: 'saturate(1.15)' }}>
      {/* Brighter kid-friendly sky background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#40C4FF] via-[#4DD0E1] to-[#B3E5FC]" />
      
      {/* Solar Flare Gesture Layer */}
      <div className="absolute inset-0 flex items-center justify-center z-5">
        <SolarFlareGesture
          onFlareGesture={handleFlareGesture}
          centerX={150}
          centerY={150}
          minRadius={80}
          className="z-5"
        />
      </div>
      
      <div className="relative">
        {/* Outer glow - seamless with background */}
        <div 
          className={`absolute inset-0 rounded-full transition-all duration-1000 ${
            flareEffect 
              ? 'bg-gradient-radial from-[#FFD54F]/55 via-[#FF7043]/35 to-transparent shadow-[0_0_220px_110px_rgba(255,112,67,0.35)] animate-pulse'
              : isActive 
                ? 'bg-gradient-radial from-[#FFD54F]/45 via-[#FF7043]/25 to-transparent shadow-[0_0_170px_90px_rgba(255,112,67,0.25)] animate-pulse' 
                : 'bg-gradient-radial from-[#FFD54F]/35 via-[#FF7043]/20 to-transparent shadow-[0_0_120px_70px_rgba(255,112,67,0.18)]'
          }`}
          style={{
            width: '500px',
            height: '500px',
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) scale(${1 + (progress / 100) * 0.3 + (flareEffect ? flareEffect.intensity * 0.4 : 0)})`,
          }}
        />
        
        {/* Main bright orb - rotating when active */}
        <div 
          className={`relative w-56 h-56 rounded-full transition-all duration-500 ${
            flareEffect
              ? 'bg-gradient-radial from-[#FFD54F] via-[#FFB74D] to-[#FF7043] animate-pulse'
              : 'bg-gradient-radial from-[#FFD54F] via-[#FFB74D] to-[#FF7043]'
          } ${isActive ? 'animate-spin' : ''}`}
          style={{
            transform: `scale(${1 + (progress / 100) * 0.2 + (flareEffect ? flareEffect.intensity * 0.3 : 0)})`,
            // Less white, more golden/orange (match reference)
            filter: `brightness(${1.12 + (progress / 100) * 0.28 + (flareEffect ? flareEffect.intensity * 0.35 : 0)}) saturate(1.22)`,
            boxShadow: `0 0 86px 34px rgba(255, 213, 79, 0.30), 0 0 150px 62px rgba(255, 112, 67, 0.22), inset 0 0 44px rgba(255, 183, 77, 0.35)`,
            animationDuration: isActive ? '20s' : '0s',
          }}
        >
          {/* Bright white ring around the orb */}
          <div 
            className="absolute inset-3 rounded-full border-4 border-white/35"
            style={{
              boxShadow: `0 0 22px rgba(255, 213, 79, 0.35), inset 0 0 22px rgba(255, 183, 77, 0.25)`,
            }}
          />
          
          {/* Central bright dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="w-6 h-6 rounded-full bg-[#FFE082]"
              style={{
                boxShadow: `0 0 14px rgba(255, 224, 130, 0.65), 0 0 26px rgba(255, 183, 77, 0.35)`,
              }}
            />
          </div>
        </div>

        {/* Colorful mountains band (keeps overall layout; adds vibrant base) */}
        <div className="pointer-events-none absolute -bottom-28 left-1/2 -translate-x-1/2 w-[640px] max-w-[120vw]">
          <svg viewBox="0 0 640 180" className="w-full h-auto" aria-hidden="true">
            <defs>
              <linearGradient id="m1" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#AB47BC" stopOpacity="0.95" />
                <stop offset="0.5" stopColor="#EC407A" stopOpacity="0.9" />
                <stop offset="1" stopColor="#FF8A65" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="m2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#7E57C2" stopOpacity="0.95" />
                <stop offset="0.6" stopColor="#AB47BC" stopOpacity="0.9" />
                <stop offset="1" stopColor="#FF8A65" stopOpacity="0.85" />
              </linearGradient>
              <linearGradient id="m3" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#5E35B1" stopOpacity="0.9" />
                <stop offset="0.5" stopColor="#EC407A" stopOpacity="0.85" />
                <stop offset="1" stopColor="#FF7043" stopOpacity="0.8" />
              </linearGradient>
              <filter id="mountGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feColorMatrix
                  in="blur"
                  type="matrix"
                  values="
                    1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 0.35 0"
                  result="glow"
                />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g filter="url(#mountGlow)">
              <path d="M0,150 C70,95 120,110 185,135 C245,95 305,70 365,120 C420,80 475,95 540,135 C590,110 615,115 640,125 L640,180 L0,180 Z" fill="url(#m1)" />
              <path d="M0,165 C60,135 120,150 200,165 C275,120 330,115 395,155 C455,120 515,135 640,160 L640,180 L0,180 Z" fill="url(#m2)" opacity="0.9" />
              <path d="M0,175 C90,160 160,170 245,175 C320,155 395,160 470,175 C540,165 590,170 640,175 L640,180 L0,180 Z" fill="url(#m3)" opacity="0.85" />
            </g>
          </svg>
        </div>
        
        {/* Flare action feedback */}
        {flareEffect && (
          <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-sm px-4 py-2 rounded-full backdrop-blur-sm animate-bounce border border-white/20">
            {flareEffect.direction.toUpperCase().replace('-', ' ')} ACTIVATED
          </div>
        )}
      </div>
    </div>
  );
}
