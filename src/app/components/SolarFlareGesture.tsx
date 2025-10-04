"use client";

import React, { useState, useRef, useEffect } from 'react';

interface SolarFlareGestureProps {
  onFlareGesture: (direction: 'sunrise' | 'sunset' | 'weather-ne' | 'weather-nw' | 'weather-se' | 'weather-sw', intensity: number) => void;
  centerX?: number;
  centerY?: number;
  minRadius?: number;
  className?: string;
}

interface FlareTrail {
  id: number;
  x: number;
  y: number;
  opacity: number;
  size: number;
}

export function SolarFlareGesture({ 
  onFlareGesture, 
  centerX = 150, 
  centerY = 150, 
  minRadius = 30,
  className = ""
}: SolarFlareGestureProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const [flareTrails, setFlareTrails] = useState<FlareTrail[]>([]);
  const [intensity, setIntensity] = useState(0);
  const gestureRef = useRef<HTMLDivElement>(null);
  const trailIdRef = useRef(0);

  // Haptic feedback function
  const triggerHaptic = (intensity: number) => {
    if ('vibrate' in navigator) {
      // Map intensity (0-1) to vibration duration (10-100ms)
      const duration = Math.floor(10 + intensity * 90);
      navigator.vibrate(duration);
    }
  };

  // Calculate distance from center
  const getDistanceFromCenter = (x: number, y: number) => {
    const dx = x - centerX;
    const dy = y - centerY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Calculate angle from center (in radians)
  const getAngleFromCenter = (x: number, y: number) => {
    const dx = x - centerX;
    const dy = y - centerY;
    return Math.atan2(dy, dx);
  };

  // Determine gesture direction based on angle
  const getDirection = (angle: number): 'sunrise' | 'sunset' | 'weather-ne' | 'weather-nw' | 'weather-se' | 'weather-sw' => {
    // Convert angle to degrees and normalize to 0-360
    let degrees = (angle * 180 / Math.PI + 360) % 360;
    
    // Map directions:
    // 0-45°: East (sunrise)
    // 45-135°: South (sunset) 
    // 135-225°: West (sunset)
    // 225-315°: North (sunrise)
    // Diagonals for weather
    
    if (degrees >= 315 || degrees < 45) return 'sunrise'; // East
    if (degrees >= 45 && degrees < 90) return 'weather-se'; // Southeast
    if (degrees >= 90 && degrees < 135) return 'sunset'; // South
    if (degrees >= 135 && degrees < 180) return 'weather-sw'; // Southwest
    if (degrees >= 180 && degrees < 225) return 'sunset'; // West
    if (degrees >= 225 && degrees < 270) return 'weather-nw'; // Northwest
    if (degrees >= 270 && degrees < 315) return 'sunrise'; // North
    return 'weather-ne'; // Northeast
  };

  // Handle touch/mouse start
  const handleStart = (clientX: number, clientY: number) => {
    if (!gestureRef.current) return;
    
    const rect = gestureRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    const distance = getDistanceFromCenter(x, y);
    
    // Only start gesture if within the sun's core area
    if (distance <= minRadius) {
      setIsDragging(true);
      setStartPos({ x, y });
      setCurrentPos({ x, y });
      setFlareTrails([]);
      setIntensity(0);
      
      // Initial haptic feedback
      triggerHaptic(0.1);
    }
  };

  // Handle touch/mouse move
  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging || !gestureRef.current) return;
    
    const rect = gestureRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    setCurrentPos({ x, y });
    
    const distance = getDistanceFromCenter(x, y);
    const newIntensity = Math.min(1, Math.max(0, (distance - minRadius) / 100));
    setIntensity(newIntensity);
    
    // Add trail particle
    if (distance > minRadius) {
      setFlareTrails(prev => [...prev, {
        id: trailIdRef.current++,
        x,
        y,
        opacity: newIntensity,
        size: 2 + newIntensity * 4
      }].slice(-20)); // Keep only last 20 particles
      
      // Progressive haptic feedback based on intensity
      if (newIntensity > 0.2) {
        triggerHaptic(newIntensity);
      }
    }
  };

  // Handle touch/mouse end
  const handleEnd = () => {
    if (!isDragging) return;
    
    const distance = getDistanceFromCenter(currentPos.x, currentPos.y);
    
    if (distance > minRadius && intensity > 0.3) {
      const angle = getAngleFromCenter(currentPos.x, currentPos.y);
      const direction = getDirection(angle);
      
      // Strong release haptic
      triggerHaptic(1);
      
      // Trigger callback
      onFlareGesture(direction, intensity);
    }
    
    setIsDragging(false);
    setIntensity(0);
    
    // Fade out trails
    setTimeout(() => setFlareTrails([]), 500);
  };

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    handleEnd();
  };

  // Cleanup trails
  useEffect(() => {
    if (flareTrails.length > 0) {
      const timer = setInterval(() => {
        setFlareTrails(prev => prev.map(trail => ({
          ...trail,
          opacity: trail.opacity * 0.95,
          size: trail.size * 0.98
        })).filter(trail => trail.opacity > 0.05));
      }, 50);
      
      return () => clearInterval(timer);
    }
  }, [flareTrails]);

  return (
    <div
      ref={gestureRef}
      className={`relative touch-none select-none ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ width: '300px', height: '300px' }}
    >
      {/* Solar core area indicator */}
      <div 
        className={`absolute rounded-full transition-all duration-200 ${
          isDragging ? 'bg-yellow-300/30 border-yellow-400/50' : 'bg-yellow-200/20 border-yellow-300/30'
        } border-2 border-dashed`}
        style={{
          left: centerX - minRadius,
          top: centerY - minRadius,
          width: minRadius * 2,
          height: minRadius * 2,
        }}
      />
      
      {/* Gesture line */}
      {isDragging && (
        <svg className="absolute inset-0 pointer-events-none">
          <line
            x1={centerX}
            y1={centerY}
            x2={currentPos.x}
            y2={currentPos.y}
            stroke={`rgba(251, 191, 36, ${0.3 + intensity * 0.7})`}
            strokeWidth={2 + intensity * 6}
            strokeLinecap="round"
            filter="url(#glow)"
          />
          {/* Glow filter */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/> 
              </feMerge>
            </filter>
          </defs>
        </svg>
      )}
      
      {/* Flare trail particles */}
      {flareTrails.map(trail => (
        <div
          key={trail.id}
          className="absolute rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 pointer-events-none animate-pulse"
          style={{
            left: trail.x - trail.size / 2,
            top: trail.y - trail.size / 2,
            width: trail.size,
            height: trail.size,
            opacity: trail.opacity,
            boxShadow: `0 0 ${trail.size * 2}px rgba(251, 191, 36, ${trail.opacity * 0.8})`
          }}
        />
      ))}
      
      {/* Intensity indicator */}
      {isDragging && intensity > 0.1 && (
        <div 
          className="absolute rounded-full bg-gradient-radial from-yellow-300/40 to-transparent pointer-events-none animate-pulse"
          style={{
            left: centerX - (minRadius + intensity * 50),
            top: centerY - (minRadius + intensity * 50),
            width: (minRadius + intensity * 50) * 2,
            height: (minRadius + intensity * 50) * 2,
          }}
        />
      )}
      
      {/* Direction indicator */}
      {isDragging && intensity > 0.3 && (
        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
          {getDirection(getAngleFromCenter(currentPos.x, currentPos.y)).replace('-', ' ').toUpperCase()}
        </div>
      )}
    </div>
  );
}