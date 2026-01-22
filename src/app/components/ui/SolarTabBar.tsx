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
          {/* Sun44 Logo (gold disc + black 44 + orbit ring) */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-200/55 via-yellow-300/35 to-transparent blur-xl" />
          <div className="absolute inset-0 rounded-full border-[2px] border-[#FFEB3B]/80 shadow-[0_0_18px_rgba(255,235,59,0.35)]" />
          <div className="absolute inset-[5px] rounded-full bg-[radial-gradient(circle_at_45%_40%,#FFF8E1_0%,#FFEB3B_40%,#FFC107_75%)] shadow-[0_0_22px_rgba(255,215,0,0.20)]" />
          <div className="w-full h-full relative flex items-center justify-center">
            <span className="text-black text-base font-black tracking-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)]">
              44
            </span>
          </div>
          {/* Orbital dots (spin) */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '15s' }}>
            <div className="w-2.5 h-2.5 bg-[#FFEB3B] rounded-full absolute -top-1 right-2 shadow-[0_0_12px_rgba(255,235,59,0.7)]" />
            <div className="w-2 h-2 bg-[#FFEB3B] rounded-full absolute -bottom-1 left-2 shadow-[0_0_10px_rgba(255,235,59,0.65)]" />
            <div className="w-2 h-2 bg-[#FFEB3B] rounded-full absolute -bottom-1 right-1 shadow-[0_0_10px_rgba(255,235,59,0.65)]" />
          </div>
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
