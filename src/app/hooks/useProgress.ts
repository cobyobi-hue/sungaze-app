"use client";

import { useState, useEffect, useCallback } from 'react';
import { localStorage, UserProgress, PracticeSession } from '../lib/storage';
import { mapPracticeTimeOfDayToSessionType, upsertSungazingSession, updateSungazingSessionNotes } from '../lib/supabase/sungazingSessions';

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load progress on mount
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }

    let timeoutId: NodeJS.Timeout;
    
    try {
      // Add a small delay to ensure DOM is ready
      timeoutId = setTimeout(() => {
        try {
          const userProgress = localStorage.getUserProgress();
          setProgress(userProgress);
          setIsLoading(false);

          // Best-effort: flush any pending Supabase sync items after progress loads
          flushSupabaseSyncQueue().catch((e) => console.error('Error flushing Supabase sync queue:', e));
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
      }, 100);
    } catch (error) {
      console.error('Error setting up progress loader:', error);
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

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const generateClientSessionId = () => {
    try {
      // modern browsers
      if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
        return crypto.randomUUID() as string;
      }
    } catch {}
    return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
  };

  const getLocalDateKey = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const flushSupabaseSyncQueue = useCallback(async () => {
    if (typeof window === 'undefined') return;

    const queue = localStorage.getSupabaseSyncQueue();
    if (!Array.isArray(queue) || queue.length === 0) return;

    const remaining: any[] = [];

    for (const item of queue) {
      try {
        if (!item?.type || !item?.payload) {
          continue;
        }

        if (item.type === 'upsertSession') {
          const res = await upsertSungazingSession(item.payload);
          if (res?.id && item.payload?.clientSessionId) {
            localStorage.updatePracticeSession(item.payload.clientSessionId, {
              supabaseSessionId: res.id,
              syncedToSupabase: true,
            });
          } else {
            remaining.push(item);
          }
        } else if (item.type === 'updateNotes') {
          const ok = await updateSungazingSessionNotes(item.payload.clientSessionId, item.payload.notes ?? null);
          if (!ok) remaining.push(item);
        } else {
          // unknown job type
          remaining.push(item);
        }
      } catch (e) {
        remaining.push(item);
      }
    }

    localStorage.setSupabaseSyncQueue(remaining);
  }, []);

  // Save progress whenever it changes - with safety checks
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!progress || isLoading) return;
    
    // Use setTimeout to defer localStorage write to avoid blocking render
    const timeoutId = setTimeout(() => {
      try {
        localStorage.saveUserProgress(progress);
      } catch (error) {
        console.error('Error saving progress:', error);
        // Don't throw - just log the error to prevent panic
      }
    }, 0);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [progress, isLoading]);

  const completePractice = useCallback((duration: number, timeOfDay: 'sunrise' | 'sunset' | 'other') => {
    if (typeof window === 'undefined') {
      console.warn('Cannot complete practice: window is undefined');
      return null;
    }

    try {
      const now = new Date();
      const clientSessionId = generateClientSessionId();
      const session: PracticeSession = {
        clientSessionId,
        date: getLocalDateKey(now),
        duration,
        timeOfDay,
        sessionTime: `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`, // Save session time
      };

      // Add the session and let storage handle progress updates
      localStorage.addPracticeSession(session);

      // Best-effort background sync to Supabase (idempotent via clientSessionId)
      (async () => {
        const payload = {
          clientSessionId,
          sessionType: mapPracticeTimeOfDayToSessionType(timeOfDay),
          durationSeconds: duration,
          plannedDurationSeconds: duration,
          completed: true,
          sessionTime: session.sessionTime ?? null,
          sessionDate: now.toISOString(),
          locationLat: session.location?.lat ?? null,
          locationLng: session.location?.lng ?? null,
          notes: session.notes ?? null,
        };

        const res = await upsertSungazingSession(payload);
        if (res?.id) {
          localStorage.updatePracticeSession(clientSessionId, {
            supabaseSessionId: res.id,
            syncedToSupabase: true,
          });
        } else {
          localStorage.addToSupabaseSyncQueue({ type: 'upsertSession', payload, createdAt: Date.now() });
        }
      })().catch((e) => {
        console.error('Supabase session sync failed:', e);
      });
      
      // Reload progress from storage
      try {
        const updatedProgress = localStorage.getUserProgress();
        setProgress(updatedProgress);
      } catch (progressError) {
        console.error('Error reloading progress after completing practice:', progressError);
        // Try to reload from storage one more time
        setTimeout(() => {
          try {
            const retryProgress = localStorage.getUserProgress();
            setProgress(retryProgress);
          } catch (retryError) {
            console.error('Error on retry reloading progress:', retryError);
          }
        }, 100);
      }
      
      // Dispatch custom event to notify other components (like SessionLog)
      try {
        window.dispatchEvent(new Event('sessionCompleted'));
      } catch (eventError) {
        console.error('Error dispatching sessionCompleted event:', eventError);
      }

      return clientSessionId;
    } catch (error) {
      console.error('Error completing practice:', error);
      // Don't throw - just log the error to prevent panic
      return null;
    }
  }, []);

  const savePracticeNotes = useCallback(async (clientSessionId: string, notes: string) => {
    if (typeof window === 'undefined') return;
    const trimmed = notes.trim();

    // Local-first update
    localStorage.updatePracticeSession(clientSessionId, { notes: trimmed || undefined });

    // Best-effort sync
    try {
      const ok = await updateSungazingSessionNotes(clientSessionId, trimmed || null);
      if (!ok) {
        localStorage.addToSupabaseSyncQueue({
          type: 'updateNotes',
          payload: { clientSessionId, notes: trimmed || null },
          createdAt: Date.now(),
        });
      }
    } catch (e) {
      localStorage.addToSupabaseSyncQueue({
        type: 'updateNotes',
        payload: { clientSessionId, notes: trimmed || null },
        createdAt: Date.now(),
      });
    }

    try {
      window.dispatchEvent(new Event('sessionCompleted'));
    } catch {}
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
    savePracticeNotes,
    advanceDay,
    resetProgress,
    getTodaysPractices,
    getTodaysTotalTime,
    getCurrentDayTarget,
    hasCompletedToday,
  };
}