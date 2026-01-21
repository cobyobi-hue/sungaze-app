"use client";

import React from 'react';
import { Globe, Search, Cloud, User } from 'lucide-react';

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
        <div className="w-10 h-10 relative flex items-center justify-center">
          {/* Sun44 Logo - luxury orb (dark core + bright gold ring) */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-200/55 via-yellow-300/35 to-transparent blur-xl" />
          <div className="absolute inset-0 rounded-full border-2 border-yellow-200/95 shadow-[0_0_22px_rgba(255,230,120,0.95),0_0_52px_rgba(255,215,0,0.55)]" />
          <div className="absolute inset-[6px] rounded-full bg-black/85 border border-yellow-100/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-14px_26px_rgba(0,0,0,0.55)]" />
          <div className="absolute inset-[7px] rounded-full border border-white/20" />
          <div className="w-full h-full relative flex items-center justify-center animate-pulse">
            <span className="text-[#FFEB3B] text-base font-extrabold tracking-tight drop-shadow-[0_6px_12px_rgba(0,0,0,0.75),0_0_16px_rgba(255,215,0,0.7)]">
              44
            </span>
          </div>
          {/* Orbital dots */}
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#FFF8E1] rounded-full shadow-[0_0_10px_rgba(255,248,225,0.95)]" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#FFEB3B] rounded-full shadow-[0_0_14px_rgba(255,235,59,0.98)]" />
          <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-[#FFEB3B] rounded-full shadow-[0_0_14px_rgba(255,235,59,0.98)]" />
        </div>
      ),
      label: 'TODAY'
    },
    {
      id: 'learn',
      icon: (
        <div className="w-6 h-6 relative">
          {/* Premium cloud icon with subtle glow */}
          <Cloud className="w-6 h-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8),0_0_8px_rgba(255,255,255,0.3)]" />
          {/* Subtle cloud glow effect */}
          <div className="absolute inset-0 w-6 h-6 rounded-full bg-gradient-to-br from-white/20 to-transparent blur-sm" />
        </div>
      ),
      label: 'LEARN'
    },
    {
      id: 'profile',
      icon: <User className="w-6 h-6" />,
      label: 'PROFILE'
    }
  ];

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 ${className}`}>
      {/* Tab bar background - More transparent */}
      <div className="bg-gradient-to-t from-[#006064]/70 via-[#4DD0E1]/45 to-[#40C4FF]/45 backdrop-blur-xl border-t border-white/15 shadow-[0_-4px_16px_rgba(0,0,0,0.2)]">
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
                    ? 'text-yellow-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]' 
                    : 'text-white hover:text-yellow-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]'
                  }
                `}>
                  {tab.icon}
                </div>
                
                {/* Label */}
                {isActive && tab.label && (
                  <div className="mt-1">
                    <span className="text-xs font-bold text-white tracking-wider uppercase drop-shadow-[0_3px_6px_rgba(0,0,0,0.9),0_2px_4px_rgba(0,0,0,0.7)]">
                      {tab.label}
                    </span>
                  </div>
                )}
                {/* Inactive labels - show with strong shadows for readability */}
                {!isActive && tab.label && (
                  <div className="mt-1">
                    <span className="text-xs font-semibold text-white tracking-wider uppercase drop-shadow-[0_3px_6px_rgba(0,0,0,0.8),0_2px_4px_rgba(0,0,0,0.6)]">
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
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-yellow-200/70 to-transparent rounded-full shadow-[0_0_4px_rgba(255,215,0,0.5)]" />
        </div>
      </div>
    </div>
  );
}
