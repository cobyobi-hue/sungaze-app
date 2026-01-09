"use client";

import React, { useState } from 'react';
import { X, Save, Sparkles } from 'lucide-react';
import { localStorage } from '../lib/storage';

interface PostSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  duration: number;
  sessionType: 'sunrise' | 'sunset' | 'other';
  onSave?: (notes: string) => void;
}

export function PostSessionModal({ 
  isOpen, 
  onClose, 
  duration, 
  sessionType,
  onSave 
}: PostSessionModalProps) {
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleSave = async () => {
    setIsSaving(true);
    
    // Update the most recent session with notes
    const progress = localStorage.getUserProgress();
    if (progress.practiceHistory.length > 0) {
      // Get today's date
      const today = new Date().toISOString().split('T')[0];
      
      // Find the most recent session from today
      const todaySessions = progress.practiceHistory
        .filter(s => s.date === today)
        .sort((a, b) => {
          // Sort by index (most recent last)
          return progress.practiceHistory.indexOf(b) - progress.practiceHistory.indexOf(a);
        });
      
      if (todaySessions.length > 0) {
        const mostRecentSession = todaySessions[0];
        const sessionIndex = progress.practiceHistory.findIndex(
          s => s.date === mostRecentSession.date && 
               s.duration === mostRecentSession.duration &&
               s.timeOfDay === mostRecentSession.timeOfDay
        );
        
        if (sessionIndex !== -1) {
          progress.practiceHistory[sessionIndex] = {
            ...progress.practiceHistory[sessionIndex],
            notes: notes.trim() || undefined
          };
          localStorage.saveUserProgress(progress);
        }
      }
    }
    
    if (onSave) {
      onSave(notes);
    }
    
    setIsSaving(false);
    setNotes('');
    onClose();
  };

  const handleSkip = () => {
    setNotes('');
    onClose();
  };

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-6">
      <div className="bg-black/60 backdrop-blur-lg border border-white/20 rounded-2xl p-6 max-w-md w-full shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-400/20 flex items-center justify-center border border-yellow-400/30">
              <Sparkles className="w-4 h-4 text-yellow-300" />
            </div>
            <h2 className="text-title-sm text-white font-semibold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Record Session
            </h2>
          </div>
          <button
            onClick={handleSkip}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Session Info */}
        <div className="bg-white/5 rounded-xl p-4 mb-4 border border-white/10">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/70">Duration</span>
            <span className="text-yellow-300 font-semibold">{formatTime(duration)}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-white/70">Type</span>
            <span className="text-orange-400 font-semibold capitalize">{sessionType}</span>
          </div>
        </div>

        {/* Notes Input */}
        <div className="mb-4">
          <label className="block text-white/80 text-sm mb-2">
            Add notes (optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="How did you feel? Any insights or observations?"
            className="w-full bg-black/40 backdrop-blur-md border border-yellow-400/50 rounded-xl p-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/70 transition-colors resize-none"
            rows={4}
            maxLength={500}
          />
          <p className="text-white/50 text-xs mt-1 text-right">{notes.length}/500</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleSkip}
            className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-colors"
          >
            Skip
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSaving ? (
              'Saving...'
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

