"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Sun, Sunrise, Sunset, Calendar, Clock, ChevronRight, History, ChevronLeft, Grid3x3, List, Flame } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import { localStorage, type PracticeSession } from '../lib/storage';
import { listSungazingSessions, updateSungazingSessionNotesById, type SungazingSessionRow } from '../lib/supabase/sungazingSessions';
import { SessionDetailModal, type SessionDetailModalSession } from './SessionDetailModal';

interface SessionLogProps {
  maxItems?: number;
  showViewAll?: boolean;
  onOpenFullHistory?: () => void;
}

export function SessionLog({ maxItems = 3, showViewAll = true, onOpenFullHistory }: SessionLogProps) {
  const { progress } = useProgress();
  const [showAll, setShowAll] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [refreshKey, setRefreshKey] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [supabaseSessions, setSupabaseSessions] = useState<SungazingSessionRow[]>([]);
  const [supabaseLoading, setSupabaseLoading] = useState(false);
  const [selectedSession, setSelectedSession] = useState<SessionDetailModalSession | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Listen for storage changes to refresh when new sessions are added
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!isMounted) return; // Wait until component is mounted

    const handleSessionCompleted = () => {
      try {
        setRefreshKey(prev => prev + 1);
      } catch (error) {
        console.error('Error updating refresh key:', error);
      }
    };

    let interval: NodeJS.Timeout | null = null;

    try {
      window.addEventListener('sessionCompleted', handleSessionCompleted);

      // Poll for changes (fallback) - only after component is fully mounted
      interval = setInterval(() => {
        try {
          if (typeof window === 'undefined' || !isMounted) return;
          const latestProgress = localStorage.getUserProgress();
          const currentLength = progress?.practiceHistory?.length || 0;
          const latestLength = latestProgress?.practiceHistory?.length || 0;
          if (latestLength !== currentLength) {
            setRefreshKey(prev => prev + 1);
          }
        } catch (error) {
          console.error('Error polling for progress updates:', error);
          // Don't throw - just log the error
        }
      }, 3000); // Increased to 3 seconds to reduce load

      return () => {
        try {
          if (typeof window !== 'undefined') {
            window.removeEventListener('sessionCompleted', handleSessionCompleted);
          }
          if (interval) {
            clearInterval(interval);
          }
        } catch (error) {
          console.error('Error cleaning up session log listeners:', error);
        }
      };
    } catch (error) {
      console.error('Error setting up session log listeners:', error);
      // Clean up if setup fails
      if (interval) {
        clearInterval(interval);
      }
    }
  }, [progress?.practiceHistory?.length, isMounted]);

  // Get fresh data from localStorage - only on client side after mount
  const [currentProgress, setCurrentProgress] = useState<any>(null);
  
  // Initialize mounted state - set immediately on client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
    }
  }, []);

  // Use useEffect instead of useMemo for localStorage access to avoid render-time errors
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    
    if (!isMounted) {
      // Wait until mounted before accessing localStorage
      return;
    }
    
    // Use a small delay to ensure everything is ready
    const timeoutId = setTimeout(() => {
      try {
        const userProgress = localStorage.getUserProgress();
        // Ensure practiceHistory is an array
        if (!userProgress || !Array.isArray(userProgress.practiceHistory)) {
          setCurrentProgress({
            currentDay: 1,
            totalPractices: 0,
            currentStreak: 0,
            longestStreak: 0,
            lastPracticeDate: null,
            practiceHistory: [],
          });
        } else {
          setCurrentProgress(userProgress);
        }
      } catch (error) {
        console.error('Error getting user progress:', error);
        // Set default progress on error so component can still render
        setCurrentProgress({
          currentDay: 1,
          totalPractices: 0,
          currentStreak: 0,
          longestStreak: 0,
          lastPracticeDate: null,
          practiceHistory: [],
        });
      }
    }, 50); // Small delay to ensure DOM is ready
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [refreshKey, progress?.practiceHistory?.length, isMounted]);

  // Load recent sessions from Supabase (best-effort, merges with local)
  useEffect(() => {
    if (typeof window === 'undefined' || !isMounted) return;

    let cancelled = false;
    const run = async () => {
      try {
        setSupabaseLoading(true);
        const rows = await listSungazingSessions({ limit: 200 });
        if (!cancelled) setSupabaseSessions(rows);
      } catch (e) {
        // Ignore; local history still works.
      } finally {
        if (!cancelled) setSupabaseLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [isMounted, refreshKey]);

  const toLocalDateKey = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const parseLocalDateKey = (dateKey: string) => {
    // Parse YYYY-MM-DD as local time (avoid Date treating it as UTC midnight)
    const [y, m, d] = dateKey.split('-').map((v) => parseInt(v, 10));
    if (!y || !m || !d) return new Date();
    return new Date(y, m - 1, d);
  };

  const supabaseAsPracticeSessions = useMemo<PracticeSession[]>(() => {
    return (supabaseSessions || []).map((s) => {
      const dt = new Date(s.session_date);
      const dateKey = toLocalDateKey(dt);
      const sessionTime =
        s.session_time || `${String(dt.getHours()).padStart(2, '0')}:${String(dt.getMinutes()).padStart(2, '0')}`;

      return {
        clientSessionId: s.client_session_id ?? undefined,
        supabaseSessionId: s.id,
        syncedToSupabase: true,
        date: dateKey,
        duration: s.duration_seconds,
        timeOfDay: (s.session_type === 'practice' ? 'other' : s.session_type) as PracticeSession['timeOfDay'],
        sessionTime,
        location:
          s.location_lat != null && s.location_lng != null ? { lat: s.location_lat, lng: s.location_lng } : undefined,
        notes: s.notes ?? undefined,
      };
    });
  }, [supabaseSessions]);

  const mergedSessionsAll = useMemo<PracticeSession[]>(() => {
    const local = (currentProgress?.practiceHistory || []) as PracticeSession[];
    const merged: PracticeSession[] = [];
    const seen = new Set<string>();

    const stableKey = (s: PracticeSession) =>
      `stable:${s.date}:${s.sessionTime || ''}:${s.duration}:${s.timeOfDay}`;

    // Prefer Supabase version when clientSessionId matches (also seed stable keys)
    for (const s of supabaseAsPracticeSessions) {
      const primaryKey = s.clientSessionId || `supabase:${s.supabaseSessionId}`;
      // If we already saw an identical session (same day/time/duration/type), skip rendering duplicate
      if (seen.has(stableKey(s))) continue;
      seen.add(primaryKey);
      seen.add(stableKey(s));
      merged.push(s);
    }

    for (const s of local) {
      // Normalize local date into local timezone using its sessionTime (prevents UTC/local day mismatch)
      const normalizedDate = (() => {
        try {
          const dt = new Date(`${s.date}T${s.sessionTime || '00:00'}:00`);
          return toLocalDateKey(dt);
        } catch {
          return s.date;
        }
      })();

      const normalized: PracticeSession = { ...s, date: normalizedDate };
      const primaryKey =
        normalized.clientSessionId || `local:${normalized.date}:${normalized.sessionTime || ''}:${normalized.duration}:${normalized.timeOfDay}`;

      if (seen.has(primaryKey) || seen.has(stableKey(normalized))) continue;

      seen.add(primaryKey);
      seen.add(stableKey(normalized));
      merged.push(normalized);
    }

    merged.sort((a, b) => {
      const ad = new Date(`${a.date}T${a.sessionTime || '00:00'}:00`).getTime();
      const bd = new Date(`${b.date}T${b.sessionTime || '00:00'}:00`).getTime();
      return bd - ad;
    });

    // Final pass: remove any remaining duplicates by stableKey (covers old local + new Supabase duplicates)
    const final: PracticeSession[] = [];
    const finalSeen = new Set<string>();
    for (const s of merged) {
      const k = stableKey(s);
      if (finalSeen.has(k)) continue;
      finalSeen.add(k);
      final.push(s);
    }

    return final;
  }, [currentProgress?.practiceHistory, supabaseAsPracticeSessions]);

  const sessionsByDate = useMemo(() => {
    const map = new Map<string, PracticeSession[]>();
    // mergedSessionsAll is sorted descending, so the first session for a day is the most recent
    for (const s of mergedSessionsAll) {
      const arr = map.get(s.date);
      if (arr) arr.push(s);
      else map.set(s.date, [s]);
    }
    return map;
  }, [mergedSessionsAll]);

  const sessions = useMemo(() => {
    const sorted = mergedSessionsAll;
    return showAll ? sorted : sorted.slice(0, maxItems);
  }, [mergedSessionsAll, showAll, maxItems]);

  // Enhanced streak helpers
  const getStreakDays = useMemo(() => {
    if (typeof window === 'undefined') return new Set<string>();
    if (!mergedSessionsAll || mergedSessionsAll.length === 0) return new Set<string>();
    
    try {
      const streakDays = new Set<string>();
      const sortedDates = [...mergedSessionsAll]
        .map(s => s.date)
        .filter((v, i, a) => a.indexOf(v) === i)
        .sort((a, b) => parseLocalDateKey(b).getTime() - parseLocalDateKey(a).getTime());
      
      let lastDate: string | null = null;
      
      for (const dateStr of sortedDates) {
        if (!lastDate) {
          streakDays.add(dateStr);
          lastDate = dateStr;
          continue;
        }
        
        const date = parseLocalDateKey(dateStr);
        const last = parseLocalDateKey(lastDate);
        const diffDays = Math.floor((last.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          // Consecutive day
          streakDays.add(dateStr);
          lastDate = dateStr;
        } else if (diffDays === 0) {
          // Same day - continue streak
          continue;
        } else {
          // Gap - stop streak
          break;
        }
      }
      
      return streakDays;
    } catch (error) {
      console.error('Error calculating streak days:', error);
      return new Set<string>();
    }
  }, [mergedSessionsAll]);

  const currentStreakDays = useMemo(() => {
    return getStreakDays instanceof Set ? getStreakDays.size : 0;
  }, [getStreakDays]);

  const longestStreakDays = useMemo(() => {
    if (!mergedSessionsAll || mergedSessionsAll.length === 0) return 0;
    try {
      const uniqueDates = Array.from(new Set(mergedSessionsAll.map((s) => s.date))).sort(
        (a, b) => parseLocalDateKey(a).getTime() - parseLocalDateKey(b).getTime()
      );

      let best = 0;
      let run = 0;
      let prev: string | null = null;

      for (const d of uniqueDates) {
        if (!prev) {
          run = 1;
          best = 1;
          prev = d;
          continue;
        }

        const prevDt = parseLocalDateKey(prev);
        const curDt = parseLocalDateKey(d);
        const diffDays = Math.round((curDt.getTime() - prevDt.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          run += 1;
        } else if (diffDays === 0) {
          // same day (shouldn't happen due to Set)
        } else {
          run = 1;
        }

        best = Math.max(best, run);
        prev = d;
      }

      return best;
    } catch {
      return 0;
    }
  }, [mergedSessionsAll]);

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
  };

  const formatDate = (dateString: string) => {
    const date = parseLocalDateKey(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const getSessionIcon = (timeOfDay: string) => {
    switch (timeOfDay) {
      case 'sunrise':
        return <Sunrise className="w-4 h-4 text-yellow-300" />;
      case 'sunset':
        return <Sunset className="w-4 h-4 text-orange-400" />;
      default:
        return <Sun className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getSessionTypeLabel = (timeOfDay: string) => {
    switch (timeOfDay) {
      case 'sunrise':
        return 'Sunrise';
      case 'sunset':
        return 'Sunset';
      default:
        return 'Practice';
    }
  };

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const formatSessionTime = (time?: string) => {
    if (!time) return "";
    // If it already contains AM/PM, keep it
    if (/[AP]M/i.test(time)) return time;

    // Expect "HH:MM" (24h). If parsing fails, fall back to original.
    const match = time.match(/^(\d{1,2}):(\d{2})$/);
    if (!match) return time;

    const hours24 = parseInt(match[1], 10);
    const minutes = match[2];
    if (Number.isNaN(hours24)) return time;

    const isPM = hours24 >= 12;
    const hours12 = ((hours24 + 11) % 12) + 1;
    return `${hours12}:${minutes} ${isPM ? "PM" : "AM"}`;
  };

  const hasSessionOnDate = (date: Date) => {
    if (typeof window === 'undefined') return false;
    if (!mergedSessionsAll) return false;
    try {
      const dateStr = toLocalDateKey(date);
      return mergedSessionsAll.some(s => s.date === dateStr);
    } catch (error) {
      return false;
    }
  };

  const isStreakDay = (date: Date) => {
    if (typeof window === 'undefined') return false;
    if (!getStreakDays || !(getStreakDays instanceof Set)) return false;
    try {
      const dateStr = toLocalDateKey(date);
      return getStreakDays.has(dateStr);
    } catch (error) {
      return false;
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  // Show loading state while mounting (but still render something)
  // Always render something, even during SSR
  if (typeof window === 'undefined' || !isMounted) {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl p-6 shadow-[0_12px_40px_rgba(0,0,0,0.55)]">
        <div className="pointer-events-none absolute inset-0 opacity-50">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br from-yellow-400/20 via-orange-400/10 to-transparent blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-tr from-orange-500/15 via-yellow-400/10 to-transparent blur-3xl" />
        </div>
        <div className="relative flex items-center gap-3 mb-4">
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-300 to-orange-400 shadow-[0_0_20px_rgba(255,215,0,0.45),0_0_40px_rgba(255,165,0,0.18)] flex items-center justify-center">
            <History className="w-4 h-4 text-black" />
            <div className="absolute inset-0 rounded-full border border-yellow-300/50 shadow-[0_0_16px_rgba(255,215,0,0.35)]" />
          </div>
          <div className="flex-1">
            <h2 className="text-white font-semibold tracking-wide text-lg">Session History</h2>
            <p className="text-white/50 text-xs tracking-wider uppercase">Your solar record</p>
          </div>
        </div>
        <p className="relative text-white/60 text-sm text-center py-6">Loading session data...</p>
      </div>
    );
  }

  // Only call getDaysInMonth after window check and mount
  let daysInMonth = 0;
  let startingDayOfWeek = 0;
  let year = 0;
  let month = 0;
  let monthName = '';
  
  try {
    const monthData = getDaysInMonth(currentMonth);
    daysInMonth = monthData.daysInMonth;
    startingDayOfWeek = monthData.startingDayOfWeek;
    year = monthData.year;
    month = monthData.month;
    monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  } catch (error) {
    console.error('Error calculating month data:', error);
  }

  // Show empty state if no progress data yet or no sessions
  if (!currentProgress || !mergedSessionsAll || mergedSessionsAll.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl p-6 shadow-[0_12px_40px_rgba(0,0,0,0.55)]">
        <div className="pointer-events-none absolute inset-0 opacity-50">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br from-yellow-400/20 via-orange-400/10 to-transparent blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-tr from-orange-500/15 via-yellow-400/10 to-transparent blur-3xl" />
        </div>
        <div className="relative flex items-center gap-3 mb-4">
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-300 to-orange-400 shadow-[0_0_20px_rgba(255,215,0,0.45),0_0_40px_rgba(255,165,0,0.18)] flex items-center justify-center">
            <History className="w-4 h-4 text-black" />
            <div className="absolute inset-0 rounded-full border border-yellow-300/50 shadow-[0_0_16px_rgba(255,215,0,0.35)]" />
          </div>
          <div className="flex-1">
            <h2 className="text-white font-semibold tracking-wide text-lg">Session History</h2>
            <p className="text-white/50 text-xs tracking-wider uppercase">Begin your sungazing journey</p>
          </div>
        </div>
        <p className="relative text-white/60 text-sm text-center py-6">
          No sessions yet. Start your first practice to see your journey here.
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/55 backdrop-blur-xl p-6 shadow-[0_12px_40px_rgba(0,0,0,0.55)]">
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br from-yellow-400/20 via-orange-400/10 to-transparent blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-tr from-orange-500/15 via-yellow-400/10 to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(255,215,0,0.12),transparent_55%)]" />
      </div>
      {/* Header */}
      <div className="relative flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-300 to-orange-400 shadow-[0_0_20px_rgba(255,215,0,0.45),0_0_40px_rgba(255,165,0,0.18)] flex items-center justify-center">
            <span className="text-black text-xs font-bold tracking-tight">44</span>
            <div className="absolute inset-0 rounded-full border border-yellow-300/50 shadow-[0_0_16px_rgba(255,215,0,0.35)]" />
          </div>
          <div className="flex-1">
            <h2 className="text-white font-semibold tracking-wide text-lg">Session History</h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {supabaseLoading && (
            <span className="text-white/40 text-xs tracking-wide">Syncing…</span>
          )}
          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1.5 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'list'
                  ? 'bg-gradient-to-br from-yellow-400/25 to-orange-400/20 text-yellow-200 shadow-[0_0_14px_rgba(255,215,0,0.2)]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'calendar'
                  ? 'bg-gradient-to-br from-yellow-400/25 to-orange-400/20 text-yellow-200 shadow-[0_0_14px_rgba(255,215,0,0.2)]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
          </div>
          {viewMode === 'list' && mergedSessionsAll.length > maxItems && showViewAll && (
            <button
              onClick={() => {
                if (onOpenFullHistory) {
                  onOpenFullHistory();
                  return;
                }
                setShowAll(!showAll);
              }}
              className="text-yellow-300/80 text-xs font-medium hover:text-yellow-300 transition-colors"
            >
              {showAll ? 'Show Less' : `View All (${mergedSessionsAll.length})`}
            </button>
          )}
        </div>
      </div>

      {/* Calendar View with Streak Indicators */}
      {viewMode === 'calendar' && (
        <div className="mb-4">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigateMonth('prev')}
              type="button"
              aria-label="Previous month"
              className="rounded-xl p-[1px] bg-gradient-to-br from-yellow-400/20 via-white/10 to-orange-500/20 hover:from-yellow-400/30 hover:to-orange-500/30 transition-all"
            >
              <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-black/35 border border-white/10 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <ChevronLeft className="w-4 h-4 text-white/90" />
              </div>
            </button>
            <h3 className="text-white font-semibold text-sm tracking-wide">{monthName}</h3>
            <button
              onClick={() => navigateMonth('next')}
              type="button"
              aria-label="Next month"
              className="rounded-xl p-[1px] bg-gradient-to-br from-yellow-400/20 via-white/10 to-orange-500/20 hover:from-yellow-400/30 hover:to-orange-500/30 transition-all"
            >
              <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-black/35 border border-white/10 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <ChevronRight className="w-4 h-4 text-white/90" />
              </div>
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-white/50 text-[11px] py-1 tracking-wider uppercase">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: startingDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const date = new Date(year, month, day);
              const dateKey = toLocalDateKey(date);
              const sessionsForDay = sessionsByDate.get(dateKey) || [];
              const hasSession = sessionsForDay.length > 0;
              const isStreak = isStreakDay(date);
              const isToday = date.toDateString() === new Date().toDateString();
              const sessionCount = sessionsForDay.length;
              const mostRecentSession = sessionsForDay[0];
              
              return (
                <button
                  key={day}
                  type="button"
                  aria-label={
                    hasSession
                      ? `Open sessions for ${dateKey} (${sessionCount})`
                      : `No sessions for ${dateKey}`
                  }
                  onClick={() => {
                    if (!hasSession || !mostRecentSession) return;
                    setSelectedSession(mostRecentSession as any);
                    setDetailsOpen(true);
                  }}
                  className={`relative aspect-square rounded-xl p-[1px] transition-all ${
                    hasSession
                      ? isStreak
                        ? 'bg-gradient-to-br from-orange-500/35 via-yellow-400/20 to-yellow-400/30 shadow-[0_0_14px_rgba(255,140,0,0.25)]'
                        : 'bg-gradient-to-br from-yellow-400/28 via-white/10 to-orange-500/22 shadow-[0_0_12px_rgba(255,215,0,0.18)]'
                      : 'bg-white/10'
                  } ${isToday ? 'ring-2 ring-yellow-400/40' : ''} ${hasSession ? 'cursor-pointer hover:brightness-110' : 'cursor-default opacity-90'}`}
                >
                  <div
                    className={`relative h-full w-full rounded-xl border border-white/10 bg-black/35 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] flex flex-col items-center justify-center transition-colors ${
                      hasSession ? 'bg-black/30' : 'bg-black/35'
                    }`}
                  >
                    {sessionCount > 1 && (
                      <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-[10px] font-bold shadow-[0_6px_18px_rgba(255,165,0,0.22)]">
                        {sessionCount}
                      </div>
                    )}

                    <span
                      className={`text-xs font-semibold tracking-wide ${
                        hasSession
                          ? isStreak
                            ? 'text-orange-200'
                            : 'text-yellow-200'
                          : isToday
                            ? 'text-white'
                            : 'text-white/55'
                      }`}
                    >
                      {day}
                    </span>

                    {hasSession && (
                      <div className="flex items-center gap-0.5 mt-0.5">
                        {isStreak && <Flame className="w-2 h-2 text-orange-400" />}
                        <Sun className={`w-2.5 h-2.5 ${isStreak ? 'text-orange-200' : 'text-yellow-200'}`} />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-white/60">
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 rounded bg-gradient-to-br from-yellow-400/25 to-orange-400/20 border border-yellow-400/35 shadow-[0_0_8px_rgba(255,215,0,0.12)]"></div>
              <span>Session</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 rounded bg-gradient-to-br from-orange-500/30 to-yellow-400/25 border border-orange-400/50 shadow-[0_0_10px_rgba(255,140,0,0.18)]"></div>
              <Flame className="w-3 h-3 text-orange-400" />
              <span>Streak</span>
            </div>
          </div>
        </div>
      )}

      {/* List View with Session Time */}
      {viewMode === 'list' && (
        <div className={`space-y-3 ${showAll ? 'max-h-[420px] overflow-y-auto pr-1' : ''}`}>
          {sessions.map((session, index) => (
            <button
              key={`${session.date}-${index}-${session.sessionTime || ''}`}
              onClick={() => {
                setSelectedSession(session as any);
                setDetailsOpen(true);
              }}
              className="w-full text-left rounded-2xl p-[1px] bg-gradient-to-br from-yellow-400/20 via-white/5 to-orange-500/15 hover:from-yellow-400/30 hover:to-orange-500/25 transition-all duration-300 group"
            >
              <div className="rounded-2xl bg-black/35 backdrop-blur-md border border-white/10 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  {/* Session Icon */}
                  <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-300 to-orange-400 shadow-[0_0_18px_rgba(255,215,0,0.28)] flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border border-yellow-300/40" />
                    <div className="text-black">
                      {getSessionIcon(session.timeOfDay)}
                    </div>
                  </div>

                  {/* Session Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-white font-semibold text-sm tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                        {getSessionTypeLabel(session.timeOfDay)}
                      </span>
                      <span className="text-white/50 text-xs">•</span>
                      <span className="text-white/70 text-xs flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(session.date)}
                      </span>
                      {session.sessionTime && (
                        <>
                          <span className="text-white/50 text-xs">•</span>
                          <span className="text-white/70 text-xs flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatSessionTime(session.sessionTime)}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-xs">
                      <Clock className="w-3 h-3" />
                      <span className="text-yellow-200/90 font-medium">{formatTime(session.duration)}</span>
                      {session.notes && (
                        <>
                          <span className="text-white/30">•</span>
                          <span className="truncate">{session.notes}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Chevron */}
                <ChevronRight className="w-4 h-4 text-white/35 group-hover:text-white/70 transition-colors flex-shrink-0" />
              </div>
              </div>
            </button>
          ))}
        </div>
      )}

      <SessionDetailModal
        isOpen={detailsOpen}
        session={selectedSession}
        onClose={() => {
          setDetailsOpen(false);
          setSelectedSession(null);
        }}
        onSaveNotes={async (notes) => {
          const s = selectedSession;
          if (!s) return;
          const trimmed = notes.trim();

          // Always update local copy if possible
          if (s.clientSessionId) {
            localStorage.updatePracticeSession(s.clientSessionId, { notes: trimmed || undefined });
          }

          // Update Supabase by row id if present (covers older sessions without clientSessionId)
          if (s.supabaseSessionId) {
            await updateSungazingSessionNotesById(s.supabaseSessionId, trimmed || null);
          }

          // Trigger re-fetch / refresh
          try {
            window.dispatchEvent(new Event('sessionCompleted'));
          } catch {}
        }}
      />

      {/* Summary Stats */}
      {sessions.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-white/60">Total Sessions</span>
                <span className="text-yellow-300 font-semibold">{mergedSessionsAll.length}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/60 flex items-center gap-1">
              <Flame className="w-3 h-3 text-orange-400" />
              Current Streak
            </span>
            <span className="text-orange-400 font-semibold">{currentStreakDays} days</span>
          </div>
          {Math.max(currentProgress?.longestStreak || 0, longestStreakDays) > 0 && (
            <div className="flex items-center justify-between text-xs mt-2">
              <span className="text-white/60">Longest Streak</span>
              <span className="text-yellow-300 font-semibold">{Math.max(currentProgress?.longestStreak || 0, longestStreakDays)} days</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
