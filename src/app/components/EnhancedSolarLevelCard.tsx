"use client";

import React, { useState, useEffect } from 'react';
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
import { Crown, Star, Target, Calendar, Clock, TrendingUp, Award, Flame, Sparkles, CheckCircle, Zap } from 'lucide-react';

interface EnhancedSolarLevelCardProps {
  currentDay: number;
  completedMinutes: number;
}

export function EnhancedSolarLevelCard({ currentDay, completedMinutes }: EnhancedSolarLevelCardProps) {
  const [showQuestDetails, setShowQuestDetails] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // Initialize client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // SSR-safe progress loading
  let progress;
  let currentLevel;
  let nextLevel;
  let progressInLevel;
  let daysInLevel;
  let totalDaysInLevel;
  let minutesTarget;
  let motivation;
  
  try {
    if (isClient) {
      progress = getLevelProgress(currentDay, completedMinutes);
      ({ currentLevel, nextLevel, progressInLevel, daysInLevel, totalDaysInLevel, minutesTarget } = progress);
      const currentLevelForMotivation = getCurrentSolarLevel(currentDay);
      motivation = getLevelMotivation(currentLevelForMotivation, currentDay);
    } else {
      // Default values for SSR
      currentLevel = {
        id: 'cloud-gazer',
        level: 1,
        name: 'Cloud-Gazer',
        dayRange: [1, 10],
        timeRange: '10s - 1m 40s',
        description: 'Beginning your sacred journey',
        benefits: [],
        achievement: { name: 'Loading...', icon: '☁️', badge: '', auraColor: 'gray', visualEffect: '' },
        quest: { title: 'Loading...', description: '', requirement: '', trackingType: 'time' }
      };
      nextLevel = null;
      progressInLevel = 0;
      daysInLevel = 1;
      totalDaysInLevel = 10;
      minutesTarget = 0.17;
      motivation = { message: 'Loading...', author: '' };
    }
  } catch (error) {
    console.error('Error loading solar level progress:', error);
    // Fallback values
    currentLevel = {
      id: 'cloud-gazer',
      level: 1,
      name: 'Cloud-Gazer',
      dayRange: [1, 10],
      timeRange: '10s - 1m 40s',
      description: 'Beginning your sacred journey',
      benefits: [],
      achievement: { name: 'Error Loading', icon: '❌', badge: '', auraColor: 'gray', visualEffect: '' },
      quest: { title: 'Error Loading', description: '', requirement: '', trackingType: 'time' }
    };
    nextLevel = null;
    progressInLevel = 0;
    daysInLevel = 1;
    totalDaysInLevel = 10;
    minutesTarget = 0.17;
    motivation = { message: 'Error loading motivation', author: '' };
  }
  
  // Achievement and quest data - only load on client side
  const hasCurrentAchievement = isClient && currentLevel ? hasAchievement(currentLevel.id) : false;
  const questProgress = isClient && currentLevel?.quest ? getQuestProgress(currentLevel.quest.title) : null;
  const auraGlow = hasCurrentAchievement && currentLevel?.achievement ? getAuraGlow(currentLevel.achievement.auraColor) : '';
  const stillnessScore = isClient ? getTodayStillnessScore() : null;
  const gazingStreak = isClient ? getDailyStreak('gazing') : 0;

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
      case 4: return <Flame className="w-6 h-6" />;
      default: return <Star className="w-6 h-6" />;
    }
  };

  return (
    <div className={`bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl transition-all duration-500 ${auraGlow}`}>
      {/* Level Header with Achievement Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`relative p-3 rounded-full bg-gradient-to-r from-orange-500/20 to-yellow-500/20 ${currentLevel.color}`}>
            {getLevelIcon(currentLevel)}
            {hasCurrentAchievement && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-2.5 h-2.5 text-white" />
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{currentLevel.emoji}</span>
              <h2 className="text-white text-lg font-bold">{currentLevel.title}</h2>
              {hasCurrentAchievement && (
                <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-400/30">
                  <span className="text-sm">{currentLevel.achievement.icon}</span>
                  <span className="text-yellow-200 text-xs font-medium">{currentLevel.achievement.badge}</span>
                </div>
              )}
            </div>
            <p className="text-gray-300 text-sm">{currentLevel.subtitle}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-white text-sm font-medium">Level {currentLevel.levelNumber}</div>
          <div className="text-gray-400 text-xs">{currentLevel.timeline}</div>
        </div>
      </div>

      {/* Achievement Display */}
      {hasCurrentAchievement && (
        <div className="mb-4 p-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-400/20">
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-200 text-sm font-medium">
              Achievement Unlocked: {currentLevel.achievement.name}
            </span>
          </div>
          <p className="text-yellow-100/80 text-xs">{currentLevel.achievement.visualEffect}</p>
        </div>
      )}

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-300 text-sm">Level Progress</span>
          <span className="text-gray-300 text-sm">{Math.round(progressInLevel)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r from-orange-500 to-yellow-500 transition-all duration-500 ease-out relative`}
            style={{ width: `${progressInLevel}%` }}
          >
            {hasCurrentAchievement && (
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 animate-pulse" />
            )}
          </div>
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-400">
          <span>Day {daysInLevel}</span>
          <span>{totalDaysInLevel} days in level</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-black/40 rounded-lg p-3 border border-white/10">
          <div className="flex items-center gap-1 mb-1">
            <Calendar className="w-3 h-3 text-orange-400" />
            <span className="text-gray-300 text-xs">Day</span>
          </div>
          <div className="text-white text-sm font-bold">{currentDay}</div>
        </div>
        <div className="bg-black/40 rounded-lg p-3 border border-white/10">
          <div className="flex items-center gap-1 mb-1">
            <Clock className="w-3 h-3 text-yellow-400" />
            <span className="text-gray-300 text-xs">Target</span>
          </div>
          <div className="text-white text-sm font-bold">{formatTime(minutesTarget)}</div>
        </div>
        <div className="bg-black/40 rounded-lg p-3 border border-white/10">
          <div className="flex items-center gap-1 mb-1">
            <TrendingUp className="w-3 h-3 text-green-400" />
            <span className="text-gray-300 text-xs">Streak</span>
          </div>
          <div className="text-white text-sm font-bold">{gazingStreak} days</div>
        </div>
      </div>

      {/* Inner Stillness Score (Level 3+) */}
      {currentLevel.levelNumber >= 3 && (
        <div className="mb-4 p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-400/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-blue-200 text-sm font-medium">Inner Stillness Score</span>
            </div>
            <span className="text-blue-100 text-lg font-bold">
              {stillnessScore?.score || 0}/100
            </span>
          </div>
          {stillnessScore && (
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="text-blue-200">Focus: {stillnessScore.factors.focusIntensity}/100</div>
              <div className="text-blue-200">Breathing: {stillnessScore.factors.breathingStability}/100</div>
              <div className="text-blue-200">Body: {stillnessScore.factors.bodyRelaxation}/100</div>
              <div className="text-blue-200">Mind: {stillnessScore.factors.mindQuiet}/100</div>
            </div>
          )}
        </div>
      )}

      {/* Current Quest */}
      <div className="mb-4">
        <button
          onClick={() => setShowQuestDetails(!showQuestDetails)}
          className="w-full p-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg border border-purple-400/30 text-left transition-all hover:border-purple-400/50"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-400" />
              <span className="text-purple-200 text-sm font-medium">Current Quest</span>
            </div>
            <div className="text-purple-100 text-xs">
              {questProgress?.completed ? 'Complete!' : 'In Progress'}
            </div>
          </div>
        </button>
        
        {showQuestDetails && (
          <div className="mt-2 p-3 bg-black/40 rounded-lg border border-white/10">
            <h4 className="text-white text-sm font-medium mb-1">{currentLevel.quest.title}</h4>
            <p className="text-gray-300 text-xs mb-2">{currentLevel.quest.description}</p>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-400">Goal:</span>
              <span className="text-orange-200">{currentLevel.quest.requirement}</span>
            </div>
            {questProgress && (
              <div className="mt-2">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-2 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full transition-all duration-300"
                    style={{ width: `${(questProgress.progress / questProgress.maxProgress) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {questProgress.progress}/{questProgress.maxProgress} completed
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Motivation Message */}
      <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-lg p-4 border border-orange-500/20 mb-4">
        <p className="text-orange-200 text-sm italic leading-relaxed">
          "{typeof motivation === 'string' ? motivation : motivation?.message}"
        </p>
        {motivation?.author && (
          <p className="text-orange-300 text-xs mt-2 text-right">
            — {motivation.author}
          </p>
        )}
      </div>

      {/* Benefits List */}
      {hasCurrentAchievement && (
        <div className="mb-4">
          <h3 className="text-white text-sm font-medium mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            Unlocked Benefits
          </h3>
          <div className="space-y-1">
            {currentLevel.benefits.slice(0, 2).map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-green-300 text-xs">
                <CheckCircle className="w-3 h-3" />
                {benefit}
              </div>
            ))}
          </div>
        </div>
      )}

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
              <div className="text-xs text-gray-400 mt-1">
                Quest: {nextLevel.quest.title}
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

