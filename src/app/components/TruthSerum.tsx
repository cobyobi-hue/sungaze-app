"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "./ui/button";
import { 
  getCurrentTruthSerum, 
  getUnlockedTeachingsByCategory, 
  getRandomUnlockedTruthSerum,
  getNextWeekPreview,
  getProgressInfo,
  isTeachingUnlocked,
  type TruthSerumEntry 
} from '../lib/truthSerum';
import { Sparkles, Sun, BookOpen, Shuffle, Calendar, ChevronDown, ChevronUp, Lock, Gift, Clock } from 'lucide-react';

interface TruthSerumProps {
  className?: string;
}

export function TruthSerum({ className = "" }: TruthSerumProps) {
  // Mock subscription start date - in real app, this would come from user data
  // Set to recent date to test week 1 progression
  const [subscriptionStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 3); // 3 days ago, so we're in week 1
    return date;
  });
  
  const [currentTeaching, setCurrentTeaching] = useState<TruthSerumEntry | null>(null);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedTeaching, setExpandedTeaching] = useState<string | null>(null);
  const [unlockedTeachings, setUnlockedTeachings] = useState<Record<string, TruthSerumEntry[]>>({});
  const [progressInfo, setProgressInfo] = useState({ unlockedCount: 0, totalCount: 0, currentWeek: 0, nextUnlockDate: null as Date | null });
  const [nextWeekPreview, setNextWeekPreview] = useState<string | null>(null);

  useEffect(() => {
    // Load current week's teaching and progress info
    const weeklyTeaching = getCurrentTruthSerum(subscriptionStartDate);
    const unlocked = getUnlockedTeachingsByCategory(subscriptionStartDate);
    const progress = getProgressInfo(subscriptionStartDate);
    const preview = getNextWeekPreview(subscriptionStartDate);
    
    setCurrentTeaching(weeklyTeaching);
    setUnlockedTeachings(unlocked);
    setProgressInfo(progress);
    setNextWeekPreview(preview);
  }, [subscriptionStartDate]);

  const handleRandomTeaching = () => {
    const randomTeaching = getRandomUnlockedTruthSerum(subscriptionStartDate);
    setCurrentTeaching(randomTeaching);
    setShowAllCategories(false);
    setSelectedCategory(null);
  };

  const handleCurrentWeek = () => {
    const weeklyTeaching = getCurrentTruthSerum(subscriptionStartDate);
    setCurrentTeaching(weeklyTeaching);
    setShowAllCategories(false);
    setSelectedCategory(null);
  };

  const handleCategorySelect = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const handleTeachingSelect = (teaching: TruthSerumEntry) => {
    setCurrentTeaching(teaching);
    setShowAllCategories(false);
    setSelectedCategory(null);
  };

  const toggleExpandedTeaching = (teachingId: string) => {
    setExpandedTeaching(expandedTeaching === teachingId ? null : teachingId);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header with Progress */}
      <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-amber-400/30 shadow-2xl">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Sun className="w-6 h-6 text-amber-400" />
          <h2 className="text-xl text-white font-medium text-center">
            Gems from the Sun
          </h2>
          <Sparkles className="w-6 h-6 text-amber-400" />
        </div>
        <p className="text-amber-200 text-sm text-center mb-3">
          Weekly gems of wisdom from revolutionary consciousness merged with solar science
        </p>
        
        {/* Progress Bar */}
        <div className="bg-black/30 rounded-full h-2 mb-2">
          <div 
            className="bg-gradient-to-r from-amber-400 to-orange-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(progressInfo.unlockedCount / progressInfo.totalCount) * 100}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-amber-300">
            <Gift className="w-3 h-3 inline mr-1" />
            Week {progressInfo.currentWeek} • {progressInfo.unlockedCount}/{progressInfo.totalCount} gems unlocked
          </span>
          {progressInfo.nextUnlockDate && (
            <span className="text-amber-200">
              <Clock className="w-3 h-3 inline mr-1" />
              Next: {progressInfo.nextUnlockDate.toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Button
          onClick={handleCurrentWeek}
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 rounded-xl px-4 py-2 text-sm font-medium flex items-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          Week {progressInfo.currentWeek}
        </Button>
        <Button
          onClick={handleRandomTeaching}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 rounded-xl px-4 py-2 text-sm font-medium flex items-center gap-2"
        >
          <Shuffle className="w-4 h-4" />
          Random Gem
        </Button>
        <Button
          onClick={() => setShowAllCategories(!showAllCategories)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 rounded-xl px-4 py-2 text-sm font-medium flex items-center gap-2"
        >
          <BookOpen className="w-4 h-4" />
          Browse Gems
          {showAllCategories ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </Button>
      </div>

      {/* Next Week Preview */}
      {nextWeekPreview && !showAllCategories && (
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-md border border-purple-400/30 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Gift className="w-4 h-4 text-purple-300" />
            <span className="text-purple-200 text-sm font-medium">Coming Soon</span>
          </div>
          <p className="text-purple-100 text-xs">{nextWeekPreview}</p>
        </div>
      )}

      {/* Current Teaching Display */}
      {currentTeaching && !showAllCategories && (
        <div className="bg-black/50 backdrop-blur-md border border-amber-400/30 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-amber-400"></div>
            <span className="text-amber-400 text-sm font-medium">{currentTeaching.category}</span>
            {currentTeaching.week && (
              <span className="text-amber-300 text-xs">Week {currentTeaching.week}</span>
            )}
          </div>
          
          <h3 className="text-white text-lg font-medium mb-4 leading-relaxed">
            {currentTeaching.title}
          </h3>
          
          <div className="text-amber-100 text-base leading-relaxed font-light">
            {currentTeaching.teaching}
          </div>
          
          <div className="mt-6 pt-4 border-t border-amber-400/20">
            <div className="flex items-center justify-center gap-2">
              <Sun className="w-4 h-4 text-amber-400" />
              <span className="text-amber-300 text-xs">
                From the fusion of revolutionary consciousness & solar science
              </span>
              <Sun className="w-4 h-4 text-amber-400" />
            </div>
          </div>
        </div>
      )}

      {/* Browse Unlocked Gems */}
      {showAllCategories && (
        <div className="space-y-4">
          {Object.entries(unlockedTeachings).map(([category, teachings]) => (
            <div key={category} className="bg-black/40 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden">
              <button
                onClick={() => handleCategorySelect(category)}
                className="w-full px-6 py-4 text-left hover:bg-white/5 transition-all duration-300 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                  <span className="text-white font-medium">{category}</span>
                  <span className="text-gray-400 text-sm">({teachings.length} gems)</span>
                </div>
                {selectedCategory === category ? 
                  <ChevronUp className="w-4 h-4 text-amber-400" /> : 
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                }
              </button>
              
              {selectedCategory === category && (
                <div className="border-t border-white/10">
                  {teachings.map((teaching) => (
                    <div key={teaching.id} className="border-b border-white/5 last:border-b-0">
                      <button
                        onClick={() => toggleExpandedTeaching(teaching.id)}
                        className="w-full px-6 py-4 text-left hover:bg-white/5 transition-all duration-300"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-amber-200 font-medium text-sm">{teaching.title}</h4>
                          <div className="flex items-center gap-2">
                            {teaching.week && (
                              <span className="text-xs text-gray-400">Week {teaching.week}</span>
                            )}
                            {expandedTeaching === teaching.id ? 
                              <ChevronUp className="w-4 h-4 text-amber-400" /> : 
                              <ChevronDown className="w-4 h-4 text-gray-400" />
                            }
                          </div>
                        </div>
                        
                        {expandedTeaching === teaching.id ? (
                          <div className="text-amber-100 text-sm leading-relaxed mb-3">
                            {teaching.teaching}
                          </div>
                        ) : (
                          <p className="text-gray-300 text-xs">
                            {teaching.teaching.slice(0, 100)}...
                          </p>
                        )}
                      </button>
                      
                      {expandedTeaching === teaching.id && (
                        <div className="px-6 pb-4">
                          <Button
                            onClick={() => handleTeachingSelect(teaching)}
                            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 rounded-lg px-4 py-2 text-xs"
                          >
                            Show as Featured Gem
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="text-center">
        <p className="text-gray-400 text-xs">
          {Object.keys(unlockedTeachings).length} unlocked categories • {progressInfo.unlockedCount} of {progressInfo.totalCount} gems received
        </p>
        <p className="text-amber-300 text-xs mt-1">
          Authentic wisdom from the depths of solar consciousness
        </p>
        <p className="text-purple-300 text-xs mt-1">
          <Gift className="w-3 h-3 inline mr-1" />
          New gems unlock weekly as gifts to deepen your practice
        </p>
      </div>
    </div>
  );
}