"use client";

import React, { useState, useMemo } from 'react';
import { Sun, Sunrise, Sunset, Calendar, Clock, ChevronRight, History } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';

interface SessionLogProps {
  maxItems?: number;
  showViewAll?: boolean;
}

export function SessionLog({ maxItems = 5, showViewAll = true }: SessionLogProps) {
  const { progress } = useProgress();
  const [showAll, setShowAll] = useState(false);

  const sessions = useMemo(() => {
    if (!progress?.practiceHistory) return [];
    
    // Sort by date (most recent first)
    const sorted = [...progress.practiceHistory].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    
    return showAll ? sorted : sorted.slice(0, maxItems);
  }, [progress?.practiceHistory, showAll, maxItems]);

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
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

  if (!progress || sessions.length === 0) {
    return (
      <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-400/20 flex items-center justify-center border border-yellow-400/30">
            <History className="w-4 h-4 text-yellow-300" />
          </div>
          <h2 className="text-title-sm text-white font-semibold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Session History
          </h2>
        </div>
        <p className="text-white/60 text-sm text-center py-4">
          No sessions yet. Start your first practice to see your journey here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-400/20 flex items-center justify-center border border-yellow-400/30 shadow-[0_0_8px_rgba(255,215,0,0.3)]">
            <History className="w-4 h-4 text-yellow-300" />
          </div>
          <h2 className="text-title-sm text-white font-semibold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Session History
          </h2>
        </div>
        {progress.practiceHistory.length > maxItems && showViewAll && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-yellow-300/80 text-xs font-medium hover:text-yellow-300 transition-colors"
          >
            {showAll ? 'Show Less' : `View All (${progress.practiceHistory.length})`}
          </button>
        )}
      </div>

      {/* Sessions List */}
      <div className="space-y-2">
        {sessions.map((session, index) => (
          <div
            key={`${session.date}-${index}`}
            className="bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl p-3 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                {/* Session Icon */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-400/20 flex items-center justify-center border border-yellow-400/20 group-hover:border-yellow-400/40 transition-colors">
                  {getSessionIcon(session.timeOfDay)}
                </div>

                {/* Session Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-medium text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                      {getSessionTypeLabel(session.timeOfDay)}
                    </span>
                    <span className="text-white/50 text-xs">•</span>
                    <span className="text-white/70 text-xs flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(session.date)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60 text-xs">
                    <Clock className="w-3 h-3" />
                    <span>{formatTime(session.duration)}</span>
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
              <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white/60 transition-colors flex-shrink-0" />
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      {sessions.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/60">Total Sessions</span>
            <span className="text-yellow-300 font-semibold">{progress.totalPractices}</span>
          </div>
          <div className="flex items-center justify-between text-xs mt-2">
            <span className="text-white/60">Current Streak</span>
            <span className="text-orange-400 font-semibold">{progress.currentStreak} days</span>
          </div>
        </div>
      )}
    </div>
  );
}

