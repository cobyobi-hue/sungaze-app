"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { 
  Crown, 
  Eye, 
  Sun, 
  Lock, 
  Unlock, 
  Calendar,
  Trophy,
  ArrowLeft,
  Sparkles
} from "lucide-react";
import { 
  getUnlockedMilestones, 
  getUnlockStats, 
  type Milestone 
} from "../lib/milestones";

interface UnlocksScreenProps {
  onBack: () => void;
}

export function UnlocksScreen({ onBack }: UnlocksScreenProps) {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [stats, setStats] = useState({
    totalMilestones: 0,
    unlockedCount: 0,
    percentageComplete: 0,
    nextMilestone: null as Milestone | null
  });
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);

  useEffect(() => {
    const loadData = () => {
      const unlockedMilestones = getUnlockedMilestones();
      const unlockStats = getUnlockStats();
      
      setMilestones(unlockedMilestones);
      setStats(unlockStats);
    };
    
    loadData();
  }, []);

  const getMilestoneIcon = (milestone: Milestone) => {
    switch (milestone.id) {
      case 'seeker-of-dawn':
        return <Eye className="w-6 h-6" />;
      case 'witness-of-horizon':
        return <Sun className="w-6 h-6" />;
      case 'guardian-of-rays':
        return <Sparkles className="w-6 h-6" />;
      case 'crowned-by-sun':
        return <Crown className="w-6 h-6" />;
      default:
        return <Trophy className="w-6 h-6" />;
    }
  };

  const getMilestoneColor = (milestone: Milestone) => {
    switch (milestone.id) {
      case 'seeker-of-dawn':
        return 'from-orange-400 to-yellow-400';
      case 'witness-of-horizon':
        return 'from-blue-400 to-cyan-400';
      case 'guardian-of-rays':
        return 'from-purple-400 to-pink-400';
      case 'crowned-by-sun':
        return 'from-yellow-300 to-orange-500';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const formatUnlockDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (selectedMilestone) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/70 via-purple-500/60 to-orange-400/70" />
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 max-w-sm mx-auto min-h-screen px-6 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              onClick={() => setSelectedMilestone(null)}
              className="bg-white/20 hover:bg-white/30 text-white border border-white/20 backdrop-blur-xl rounded-2xl p-3 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-2xl text-white font-light tracking-wide">
              Sacred Wisdom
            </h1>
          </div>

          {/* Milestone Detail */}
          <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-[0_8px_32px_rgba(255,255,255,0.1)]">
            {/* Icon */}
            <div className="text-center mb-6">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${getMilestoneColor(selectedMilestone)} shadow-[0_0_30px_rgba(255,255,255,0.3)] mb-4`}>
                {getMilestoneIcon(selectedMilestone)}
              </div>
              
              <h2 className="text-2xl text-white font-light mb-2 tracking-wide">
                {selectedMilestone.title}
              </h2>
              
              <div className="text-white text-sm">
                Day {selectedMilestone.day} • {selectedMilestone.durationMinutes >= 1 
                  ? `${selectedMilestone.durationMinutes} min` 
                  : `${Math.round(selectedMilestone.durationMinutes * 60)}s`}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-white text-xs uppercase tracking-wider mb-3 font-light">
                  {selectedMilestone.content.source}
                </div>
                
                <blockquote className="text-white text-lg leading-relaxed font-light italic tracking-wide">
                  "{selectedMilestone.content.text}"
                </blockquote>
              </div>
              
              {selectedMilestone.unlockedAt && (
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4">
                  <div className="flex items-center gap-3 text-white">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      Unlocked on {formatUnlockDate(selectedMilestone.unlockedAt)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/70 via-purple-500/60 to-orange-400/70" />
      <div className="absolute inset-0 bg-black/40" />

      {/* Sacred rings */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-purple-300/20 animate-pulse" 
             style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-blue-200/30 animate-pulse" 
             style={{ animationDuration: '6s', animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-sm mx-auto min-h-screen px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={onBack}
            className="bg-white/20 hover:bg-white/30 text-white border border-white/20 backdrop-blur-xl rounded-2xl p-3 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl text-white font-light tracking-wide">
            Sacred Unlocks
          </h1>
        </div>

        {/* Progress Overview */}
        <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-[0_8px_32px_rgba(255,255,255,0.1)] mb-6">
          <div className="text-center mb-4">
            <div className="text-3xl text-white font-light mb-1">
              {stats.unlockedCount} / {stats.totalMilestones}
            </div>
            <div className="text-white text-sm">Sacred Titles Earned</div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-2 mb-4">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${stats.percentageComplete}%` }}
            />
          </div>
          
          {stats.nextMilestone && (
            <div className="text-center text-white text-xs">
              Next: {stats.nextMilestone.title} (Day {stats.nextMilestone.day})
            </div>
          )}
        </div>

        {/* Milestones Grid */}
        <div className="space-y-4">
          {milestones.map((milestone) => (
            <div
              key={milestone.id}
              onClick={() => milestone.unlocked && setSelectedMilestone(milestone)}
              className={`backdrop-blur-xl border rounded-2xl p-4 shadow-[0_8px_32px_rgba(255,255,255,0.1)] transition-all duration-300 ${
                milestone.unlocked 
                  ? 'bg-white/20 border-white/30 hover:bg-white/25 cursor-pointer' 
                  : 'bg-white/10 border-white/20'
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  milestone.unlocked 
                    ? `bg-gradient-to-br ${getMilestoneColor(milestone)} shadow-[0_0_20px_rgba(255,255,255,0.3)]`
                    : 'bg-gray-600/30'
                }`}>
                  {milestone.unlocked ? (
                    getMilestoneIcon(milestone)
                  ) : (
                    <Lock className="w-6 h-6 text-gray-300" />
                  )}
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-medium ${
                      milestone.unlocked ? 'text-white' : 'text-gray-300'
                    }`}>
                      {milestone.title}
                    </h3>
                    {milestone.unlocked && (
                      <Unlock className="w-4 h-4 text-green-400" />
                    )}
                  </div>
                  
                  <p className={`text-xs mb-2 ${
                    milestone.unlocked ? 'text-white' : 'text-gray-400'
                  }`}>
                    Day {milestone.day} • {milestone.durationMinutes >= 1 
                      ? `${milestone.durationMinutes} min` 
                      : `${Math.round(milestone.durationMinutes * 60)}s`}
                  </p>
                  
                  {milestone.unlocked && milestone.unlockedAt && (
                    <p className="text-white text-xs">
                      Unlocked {formatUnlockDate(milestone.unlockedAt)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {stats.unlockedCount === 0 && (
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 text-center">
            <Lock className="w-12 h-12 text-white mx-auto mb-4" />
            <p className="text-white text-sm leading-relaxed">
              Complete your first sungazing session to unlock your first sacred title.
            </p>
          </div>
        )}

        <div className="h-8" />
      </div>
    </div>
  );
}
