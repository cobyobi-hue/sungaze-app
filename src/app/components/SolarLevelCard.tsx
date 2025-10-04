"use client";

import React, { useState } from 'react';
import { 
  getCurrentSolarLevel, 
  getLevelProgress, 
  getNextSolarLevel,
  getLevelMotivation,
  type SolarLevel 
} from '../lib/solarLevels';
import { 
  getQuestProgress, 
  hasAchievement, 
  getAuraGlow,
  getTodayStillnessScore,
  getDailyStreak
} from '../lib/questSystem';
import { Crown, Star, Target, Calendar, Clock, TrendingUp, Award, Flame, Sparkles, CheckCircle } from 'lucide-react';

interface SolarLevelCardProps {
  currentDay: number;
  completedMinutes: number;
}

export function SolarLevelCard({ currentDay, completedMinutes }: SolarLevelCardProps) {
  const [showQuestDetails, setShowQuestDetails] = useState(false);
  
  const progress = getLevelProgress(currentDay, completedMinutes);
  const { currentLevel, nextLevel, progressPercent, daysInLevel, totalDaysInLevel } = progress;
  const motivation = getLevelMotivation(currentLevel, currentDay);
  
  // Achievement and quest data
  const hasCurrentAchievement = hasAchievement(currentLevel.id);
  const questProgress = getQuestProgress(currentLevel.quest.title);
  const auraGlow = hasCurrentAchievement ? getAuraGlow(currentLevel.achievement.auraColor) : '';
  const stillnessScore = getTodayStillnessScore();
  const gazingStreak = getDailyStreak('gazing');

  const formatTime = (minutes: number) => {
    const totalSeconds = Math.round(minutes * 60);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${secs}s`;
  };

  const getLevelIcon = (level: SolarLevel) => {
    switch (level.levelNumber) {
      case 1: return <Crown className="w-6 h-6" />;
      case 2: return <Star className="w-6 h-6" />;
      case 3: return <Target className="w-6 h-6" />;
      case 4: return <TrendingUp className="w-6 h-6" />;
      default: return <Star className="w-6 h-6" />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl">
      {/* Current Level Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-full bg-gradient-to-r from-orange-500/20 to-yellow-500/20 ${currentLevel.color}`}>
            {getLevelIcon(currentLevel)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{currentLevel.emoji}</span>
              <h2 className="text-white text-lg font-bold">{currentLevel.title}</h2>
            </div>
            <p className="text-gray-300 text-sm">{currentLevel.subtitle}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-white text-sm font-medium">Level {currentLevel.levelNumber}</div>
          <div className="text-gray-400 text-xs">{currentLevel.timeline}</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-300 text-sm">Level Progress</span>
          <span className="text-gray-300 text-sm">{Math.round(progressPercent)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r from-orange-500 to-yellow-500 transition-all duration-500 ease-out`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-400">
          <span>Day {daysInLevel}</span>
          <span>{totalDaysInLevel} days in level</span>
        </div>
      </div>

      {/* Current Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-black/40 rounded-lg p-3 border border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-4 h-4 text-orange-400" />
            <span className="text-gray-300 text-xs">Journey Day</span>
          </div>
          <div className="text-white text-lg font-bold">{currentDay}</div>
        </div>
        <div className="bg-black/40 rounded-lg p-3 border border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-yellow-400" />
            <span className="text-gray-300 text-xs">Today's Target</span>
          </div>
          <div className="text-white text-lg font-bold">{formatTime(currentLevel.durationRange[0] * 60)}</div>
        </div>
      </div>

      {/* Motivation Message */}
      <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-lg p-4 border border-orange-500/20 mb-4">
        <p className="text-orange-200 text-sm italic leading-relaxed">
          "{motivation}"
        </p>
      </div>

      {/* Current Practices */}
      <div className="mb-4">
        <h3 className="text-white text-sm font-medium mb-2">Current Practices</h3>
        <div className="space-y-1">
          {currentLevel.practices.slice(0, 2).map((practice, index) => (
            <div key={index} className="flex items-center gap-2 text-gray-300 text-xs">
              <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
              {practice}
            </div>
          ))}
        </div>
      </div>

      {/* Next Level Preview */}
      {nextLevel && (
        <div className="border-t border-gray-700 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white text-sm font-medium mb-1">Next Level</h3>
              <div className="flex items-center gap-2">
                <span className="text-lg">{nextLevel.emoji}</span>
                <span className="text-gray-300 text-sm">{nextLevel.title}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-gray-400 text-xs">Day {nextLevel.dayRange[0]}</div>
              <div className="text-gray-400 text-xs">{formatTime(nextLevel.durationRange[0])} min</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SolarLevelCard;