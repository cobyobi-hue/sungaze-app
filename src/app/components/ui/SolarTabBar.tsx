"use client";

import React from 'react';
import { Globe, Search, Cloud, Circle } from 'lucide-react';

interface TabItem {
  id: string;
  icon: React.ReactNode;
  label?: string;
  isActive?: boolean;
}

interface SolarTabBarProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function SolarTabBar({ activeTab, onTabChange, className = '' }: SolarTabBarProps) {
  const tabs: TabItem[] = [
    {
      id: 'home',
      icon: <Globe className="w-6 h-6" />,
      label: 'HOME'
    },
    {
      id: 'rituals',
      icon: <Search className="w-6 h-6" />,
      label: 'DISCOVER'
    },
    {
      id: 'gaze',
      icon: (
        <div className="w-8 h-8 relative flex items-center justify-center">
          {/* Sun44 Logo - bright glowing orb with 44 */}
          <div className="w-full h-full relative rounded-full bg-gradient-to-br from-yellow-400 via-yellow-300 to-orange-400 shadow-[0_0_20px_rgba(255,215,0,0.8),0_0_40px_rgba(255,165,0,0.4)] flex items-center justify-center animate-pulse">
            <span className="text-black text-sm font-bold tracking-tight">44</span>
          </div>
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full border-2 border-yellow-300/60 shadow-[0_0_15px_rgba(255,215,0,0.6)]" />
          {/* Orbital dots */}
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_8px_rgba(255,215,0,0.8)]" />
          <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-orange-400 rounded-full shadow-[0_0_6px_rgba(255,165,0,0.8)]" />
          <div className="absolute -bottom-1 -right-1 w-1 h-1 bg-yellow-300 rounded-full shadow-[0_0_6px_rgba(255,235,59,0.8)]" />
        </div>
      ),
      label: 'TODAY'
    },
    {
      id: 'learn',
      icon: (
        <div className="w-6 h-6 relative">
          {/* Premium cloud icon with subtle glow */}
          <Cloud className="w-6 h-6 text-white/90 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
          {/* Subtle cloud glow effect */}
          <div className="absolute inset-0 w-6 h-6 rounded-full bg-gradient-to-br from-white/20 to-transparent blur-sm" />
        </div>
      ),
      label: 'LEARN'
    },
    {
      id: 'profile',
      icon: <Circle className="w-6 h-6 fill-orange-500 text-orange-500" />,
      label: 'PROFILE'
    }
  ];

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 ${className}`}>
      {/* Tab bar background */}
      <div className="bg-black/98 backdrop-blur-2xl">
        {/* Content */}
        <div className="flex items-center justify-around px-6 py-4 pb-safe">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  flex flex-col items-center justify-center py-2 px-1
                  transition-all duration-300 ease-out
                  ${isActive ? 'transform scale-105' : 'transform scale-100'}
                `}
              >
                {/* Icon */}
                <div className={`
                  transition-all duration-300
                  ${isActive 
                    ? 'text-white' 
                    : 'text-white/60 hover:text-white/80'
                  }
                `}>
                  {tab.icon}
                </div>
                
                {/* Label */}
                {isActive && tab.label && (
                  <div className="mt-1">
                    <span className="text-xs font-semibold text-white tracking-wider uppercase">
                      {tab.label}
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
        
        {/* Home indicator */}
        <div className="flex justify-center pb-2">
          <div className="w-32 h-1 bg-white/30 rounded-full" />
        </div>
      </div>
    </div>
  );
}
