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
    <div className="flex items-center justify-center min-h-[400px] relative overflow-visible">
      {/* Purple background - seamless blend */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-blue-800" />
      
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
              ? 'bg-gradient-radial from-yellow-200/40 via-orange-300/30 to-transparent shadow-[0_0_200px_100px_rgba(255,215,0,0.3)] animate-pulse'
              : isActive 
                ? 'bg-gradient-radial from-yellow-200/30 via-orange-300/20 to-transparent shadow-[0_0_150px_80px_rgba(255,215,0,0.2)] animate-pulse' 
                : 'bg-gradient-radial from-yellow-200/20 via-orange-300/15 to-transparent shadow-[0_0_100px_60px_rgba(255,215,0,0.15)]'
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
              ? 'bg-gradient-radial from-white via-yellow-200 to-orange-300 animate-pulse'
              : 'bg-gradient-radial from-white via-yellow-100 to-orange-200'
          } ${isActive ? 'animate-spin' : ''}`}
          style={{
            transform: `scale(${1 + (progress / 100) * 0.2 + (flareEffect ? flareEffect.intensity * 0.3 : 0)})`,
            filter: `brightness(${1.2 + (progress / 100) * 0.4 + (flareEffect ? flareEffect.intensity * 0.6 : 0)})`,
            boxShadow: `0 0 80px 30px rgba(255, 255, 255, 0.4), 0 0 150px 60px rgba(255, 215, 0, 0.3), inset 0 0 50px rgba(255, 255, 255, 0.6)`,
            animationDuration: isActive ? '20s' : '0s',
          }}
        >
          {/* Bright white ring around the orb */}
          <div 
            className="absolute inset-3 rounded-full border-4 border-white/70"
            style={{
              boxShadow: `0 0 30px rgba(255, 255, 255, 0.6), inset 0 0 30px rgba(255, 255, 255, 0.4)`,
            }}
          />
          
          {/* Central bright dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="w-6 h-6 rounded-full bg-white"
              style={{
                boxShadow: `0 0 20px rgba(255, 255, 255, 1), 0 0 40px rgba(255, 255, 255, 0.8)`,
              }}
            />
          </div>
          
          {/* Radial light rays - subtle and elegant */}
          {Array.from({ length: 32 }).map((_, i) => (
            <div
              key={i}
              className={`absolute w-0.5 transition-all duration-500 ${
                flareEffect 
                  ? `bg-gradient-to-t from-white/80 to-yellow-200/60 opacity-100`
                  : isActive 
                    ? 'bg-gradient-to-t from-white/70 to-yellow-200/50 opacity-100' 
                    : 'bg-gradient-to-t from-white/50 to-yellow-200/30 opacity-80'
              }`}
              style={{
                height: `${25 + (progress / 100) * 20 + (flareEffect ? flareEffect.intensity * 25 : 0)}px`,
                left: '50%',
                top: '50%',
                transformOrigin: '0 0',
                transform: `translate(-50%, -50%) rotate(${i * 11.25}deg) translateY(-${140 + (progress / 100) * 25 + (flareEffect ? flareEffect.intensity * 35 : 0)}px)`,
                boxShadow: `0 0 10px rgba(255, 255, 255, 0.5)`,
              }}
            />
          ))}
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
