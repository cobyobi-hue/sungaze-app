"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "./ui/button";
import { 
  getCurrentTruthSerum, 
  getProgressInfo,
  type TruthSerumEntry 
} from '../lib/truthSerum';
import { Sparkles, Sun, X, Gift, Clock, ChevronRight } from 'lucide-react';

interface TruthSerumDailyPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onViewAll: () => void;
  subscriptionStartDate?: Date;
}

export function TruthSerumDailyPopup({ 
  isOpen, 
  onClose, 
  onViewAll,
  subscriptionStartDate 
}: TruthSerumDailyPopupProps) {
  const [currentTeaching, setCurrentTeaching] = useState<TruthSerumEntry | null>(null);
  const [progressInfo, setProgressInfo] = useState({ 
    unlockedCount: 0, 
    totalCount: 0, 
    currentWeek: 0, 
    nextUnlockDate: null as Date | null 
  });

  useEffect(() => {
    if (isOpen && subscriptionStartDate) {
      const weeklyTeaching = getCurrentTruthSerum(subscriptionStartDate);
      const progress = getProgressInfo(subscriptionStartDate);
      
      setCurrentTeaching(weeklyTeaching);
      setProgressInfo(progress);
    }
  }, [isOpen, subscriptionStartDate]);

  if (!isOpen || !currentTeaching) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-xl border border-amber-400/30 rounded-3xl p-6 max-w-md w-full shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sun className="w-5 h-5 text-amber-400" />
            <span className="text-amber-300 text-sm font-medium">Daily Gem</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="bg-black/30 rounded-full h-1.5 mb-4">
          <div 
            className="bg-gradient-to-r from-amber-400 to-orange-400 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${(progressInfo.unlockedCount / progressInfo.totalCount) * 100}%` }}
          />
        </div>

        {/* Week Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-amber-400" />
            <span className="text-amber-200 text-sm">Week {progressInfo.currentWeek}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="text-amber-200 text-sm">
              {progressInfo.unlockedCount}/{progressInfo.totalCount} gems
            </span>
          </div>
        </div>

        {/* Teaching Content */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-400"></div>
            <span className="text-amber-400 text-sm font-medium">{currentTeaching.category}</span>
          </div>
          
          <h3 className="text-white text-lg font-medium leading-relaxed">
            {currentTeaching.title}
          </h3>
          
          <div className="text-amber-100 text-sm leading-relaxed font-light">
            {currentTeaching.teaching}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-amber-400/20">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sun className="w-4 h-4 text-amber-400" />
            <span className="text-amber-300 text-xs">
              From the fusion of revolutionary consciousness & solar science
            </span>
            <Sun className="w-4 h-4 text-amber-400" />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={onClose}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300"
            >
              Close
            </Button>
            <Button
              onClick={onViewAll}
              className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 rounded-xl px-4 py-2 text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300"
            >
              View All Gems
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Sparkle Effects */}
        <div className="absolute top-4 right-4">
          <Sparkles className="w-4 h-4 text-amber-400/50" />
        </div>
        <div className="absolute bottom-4 left-4">
          <Sparkles className="w-3 h-3 text-orange-400/50" />
        </div>
      </div>
    </div>
  );
}

