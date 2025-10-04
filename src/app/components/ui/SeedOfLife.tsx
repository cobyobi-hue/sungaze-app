"use client";

import React from 'react';

interface SeedOfLifeProps {
  size?: number;
  strokeWidth?: number;
  opacity?: number;
  className?: string;
  animated?: boolean;
}

export function SeedOfLife({ 
  size = 200, 
  strokeWidth = 1.5, 
  opacity = 1,
  className = "",
  animated = false 
}: SeedOfLifeProps) {
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size * 0.15; // 30% of total size
  const circleSpacing = radius * 1.732; // sqrt(3) for perfect hexagon spacing

  // Calculate positions for 7 circles (1 center + 6 surrounding)
  const circles = [
    { cx: centerX, cy: centerY }, // Center circle
    { cx: centerX, cy: centerY - circleSpacing }, // Top
    { cx: centerX + circleSpacing * 0.866, cy: centerY - circleSpacing * 0.5 }, // Top right
    { cx: centerX + circleSpacing * 0.866, cy: centerY + circleSpacing * 0.5 }, // Bottom right
    { cx: centerX, cy: centerY + circleSpacing }, // Bottom
    { cx: centerX - circleSpacing * 0.866, cy: centerY + circleSpacing * 0.5 }, // Bottom left
    { cx: centerX - circleSpacing * 0.866, cy: centerY - circleSpacing * 0.5 }, // Top left
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`${animated ? 'animate-pulse-slow' : ''} ${className}`}
      style={{ opacity }}
    >
      {circles.map((circle, index) => (
        <circle
          key={index}
          cx={circle.cx}
          cy={circle.cy}
          r={radius}
          fill="none"
          stroke="#DCD6CF"
          strokeWidth={strokeWidth}
          strokeOpacity={0.28}
          className={animated ? 'animate-pulse-slow' : ''}
          style={{
            animationDelay: `${index * 0.1}s`,
            animationDuration: '3s'
          }}
        />
      ))}
    </svg>
  );
}


