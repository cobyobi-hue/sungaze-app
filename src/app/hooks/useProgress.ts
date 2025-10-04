"use client";

import { useState, useEffect, useCallback } from 'react';
import { localStorage, UserProgress, PracticeSession } from '../lib/storage';

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load progress on mount
  useEffect(() => {
    const loadProgress = () => {
      // Only run on client-side
      if (typeof window === 'undefined') {
        setIsLoading(false);
        return;
      }
      
      try {
        // Add a small delay to ensure DOM is ready
        setTimeout(() => {
          const userProgress = localStorage.getUserProgress();
          setProgress(userProgress);
          setIsLoading(false);
        }, 100);
      } catch (error) {
        console.error('Error loading progress:', error);
        // Fallback to default progress
        setProgress({
          currentDay: 1,
          totalPractices: 0,
          currentStreak: 0,
          longestStreak: 0,
          lastPracticeDate: null,
          practiceHistory: [],
        });
        setIsLoading(false);
      }
    };

    loadProgress();
  }, []);

  // Save progress whenever it changes
  useEffect(() => {
    if (progress && !isLoading) {
      localStorage.saveUserProgress(progress);
    }
  }, [progress, isLoading]);

  const completePractice = useCallback((duration: number, timeOfDay: 'sunrise' | 'sunset' | 'other') => {
    try {
      const session: PracticeSession = {
        date: new Date().toISOString().split('T')[0],
        duration,
        timeOfDay,
      };

      // Add the session and let storage handle progress updates
      localStorage.addPracticeSession(session);
      
      // Reload progress from storage
      const updatedProgress = localStorage.getUserProgress();
      setProgress(updatedProgress);
    } catch (error) {
      console.error('Error completing practice:', error);
    }
  }, []);

  const advanceDay = useCallback(() => {
    if (!progress || progress.currentDay >= 270) return;
    
    const newProgress = {
      ...progress,
      currentDay: progress.currentDay + 1,
    };
    
    setProgress(newProgress);
  }, [progress]);

  const resetProgress = useCallback(() => {
    const defaultProgress = localStorage.getDefaultProgress();
    setProgress(defaultProgress);
  }, []);

  const getTodaysPractices = useCallback(() => {
    if (!progress) return [];
    
    const today = new Date().toISOString().split('T')[0];
    return progress.practiceHistory.filter(session => session.date === today);
  }, [progress]);

  const getTodaysTotalTime = useCallback(() => {
    const todaysPractices = getTodaysPractices();
    return todaysPractices.reduce((total, session) => total + session.duration, 0);
  }, [getTodaysPractices]);

  const getCurrentDayTarget = useCallback(() => {
    if (!progress) return 10;
    return progress.currentDay * 10; // 10 seconds per day
  }, [progress]);

  const hasCompletedToday = useCallback(() => {
    const todaysTotal = getTodaysTotalTime();
    const target = getCurrentDayTarget();
    return todaysTotal >= target;
  }, [getTodaysTotalTime, getCurrentDayTarget]);

  return {
    progress,
    isLoading,
    completePractice,
    advanceDay,
    resetProgress,
    getTodaysPractices,
    getTodaysTotalTime,
    getCurrentDayTarget,
    hasCompletedToday,
  };
}