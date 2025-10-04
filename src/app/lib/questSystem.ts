// Quest and Achievement Tracking System
// Handles streaks, challenges, and visual rewards

export interface QuestProgress {
  questId: string;
  levelId: string;
  started: boolean;
  completed: boolean;
  progress: number;
  maxProgress: number;
  streak: number;
  lastActivity: string; // ISO date string
  completedAt?: string;
}

export interface Achievement {
  id: string;
  levelId: string;
  name: string;
  icon: string;
  badge: string;
  auraColor: string;
  unlockedAt: string;
  benefits: string[];
}

export interface InnerStillnessScore {
  date: string;
  score: number; // 1-100
  factors: {
    breathingStability: number;
    focusIntensity: number;
    bodyRelaxation: number;
    mindQuiet: number;
  };
}

const QUEST_STORAGE_KEY = 'solar_quests';
const ACHIEVEMENT_STORAGE_KEY = 'solar_achievements';
const STILLNESS_STORAGE_KEY = 'inner_stillness_scores';

// Quest Management
export function getQuestProgress(questId: string): QuestProgress | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(QUEST_STORAGE_KEY);
    if (!stored) return null;
    const quests = JSON.parse(stored);
    return quests[questId] || null;
  } catch (error) {
    console.error('Error loading quest progress:', error);
    return null;
  }
}

export function updateQuestProgress(questId: string, progress: Partial<QuestProgress>): void {
  if (typeof window === 'undefined') return;
  
  try {
    const stored = localStorage.getItem(QUEST_STORAGE_KEY);
    const quests = stored ? JSON.parse(stored) : {};
    
    quests[questId] = {
      ...quests[questId],
      ...progress,
      lastActivity: new Date().toISOString()
    };
    
    localStorage.setItem(QUEST_STORAGE_KEY, JSON.stringify(quests));
  } catch (error) {
    console.error('Error updating quest progress:', error);
  }
}

export function incrementStreak(questId: string): number {
  const quest = getQuestProgress(questId);
  const today = new Date().toISOString().split('T')[0];
  
  let newStreak = 1;
  if (quest) {
    const lastDay = quest.lastActivity?.split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    // Continue streak if last activity was yesterday
    if (lastDay === yesterday) {
      newStreak = quest.streak + 1;
    } else if (lastDay === today) {
      // Already logged today, don't increment
      return quest.streak;
    }
  }
  
  updateQuestProgress(questId, {
    questId,
    streak: newStreak,
    progress: Math.min((quest?.progress || 0) + 1, quest?.maxProgress || 100),
    lastActivity: new Date().toISOString()
  });
  
  return newStreak;
}

// Achievement Management
export function unlockAchievement(levelId: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const stored = localStorage.getItem(ACHIEVEMENT_STORAGE_KEY);
    const achievements = stored ? JSON.parse(stored) : {};
    
    achievements[levelId] = {
      id: `achievement_${levelId}`,
      levelId,
      unlockedAt: new Date().toISOString()
    };
    
    localStorage.setItem(ACHIEVEMENT_STORAGE_KEY, JSON.stringify(achievements));
  } catch (error) {
    console.error('Error unlocking achievement:', error);
  }
}

export function getUnlockedAchievements(): Achievement[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(ACHIEVEMENT_STORAGE_KEY);
    if (!stored) return [];
    const achievements = JSON.parse(stored);
    return Object.values(achievements);
  } catch (error) {
    console.error('Error loading achievements:', error);
    return [];
  }
}

export function hasAchievement(levelId: string): boolean {
  const achievements = getUnlockedAchievements();
  return achievements.some(a => a.levelId === levelId);
}

// Inner Stillness Score System
export function recordStillnessScore(score: number, factors: InnerStillnessScore['factors']): void {
  if (typeof window === 'undefined') return;
  
  try {
    const stored = localStorage.getItem(STILLNESS_STORAGE_KEY);
    const scores = stored ? JSON.parse(stored) : [];
    
    const today = new Date().toISOString().split('T')[0];
    const todayScore: InnerStillnessScore = {
      date: today,
      score,
      factors
    };
    
    // Remove any existing score for today
    const filteredScores = scores.filter((s: InnerStillnessScore) => s.date !== today);
    filteredScores.push(todayScore);
    
    localStorage.setItem(STILLNESS_STORAGE_KEY, JSON.stringify(filteredScores));
  } catch (error) {
    console.error('Error recording stillness score:', error);
  }
}

export function getStillnessScores(days: number = 30): InnerStillnessScore[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STILLNESS_STORAGE_KEY);
    if (!stored) return [];
    
    const scores = JSON.parse(stored);
    return scores
      .sort((a: InnerStillnessScore, b: InnerStillnessScore) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )
      .slice(0, days);
  } catch (error) {
    console.error('Error loading stillness scores:', error);
    return [];
  }
}

export function getTodayStillnessScore(): InnerStillnessScore | null {
  const today = new Date().toISOString().split('T')[0];
  const scores = getStillnessScores(1);
  return scores.find(s => s.date === today) || null;
}

export function getAverageStillnessScore(days: number = 7): number {
  const scores = getStillnessScores(days);
  if (scores.length === 0) return 0;
  
  const sum = scores.reduce((acc, score) => acc + score.score, 0);
  return Math.round(sum / scores.length);
}

// Quest Helpers
export function initializeQuest(questId: string, levelId: string, maxProgress: number): void {
  updateQuestProgress(questId, {
    questId,
    levelId,
    started: true,
    completed: false,
    progress: 0,
    maxProgress,
    streak: 0,
    lastActivity: new Date().toISOString()
  });
}

export function completeQuest(questId: string): void {
  updateQuestProgress(questId, {
    completed: true,
    completedAt: new Date().toISOString()
  });
}

// Aura Color Helpers
export function getAuraGlow(auraColor: string): string {
  const auraStyles = {
    white: 'shadow-[0_0_30px_rgba(255,255,255,0.8)] border-2 border-white/40',
    green: 'shadow-[0_0_30px_rgba(34,197,94,0.8)] border-2 border-green-400/60',
    golden: 'shadow-[0_0_30px_rgba(251,191,36,0.8)] border-2 border-yellow-400/60',
    red: 'shadow-[0_0_30px_rgba(239,68,68,0.8)] border-2 border-red-400/60',
    purple: 'shadow-[0_0_30px_rgba(147,51,234,0.8)] border-2 border-purple-400/60'
  };
  
  return auraStyles[auraColor as keyof typeof auraStyles] || '';
}

// Daily Activity Tracking
export function logDailyActivity(activityType: 'gazing' | 'barefoot' | 'fasting', duration: number): void {
  if (typeof window === 'undefined') return;
  
  const today = new Date().toISOString().split('T')[0];
  const key = `daily_${activityType}_${today}`;
  
  try {
    localStorage.setItem(key, JSON.stringify({
      type: activityType,
      duration,
      date: today,
      timestamp: new Date().toISOString()
    }));
  } catch (error) {
    console.error('Error logging daily activity:', error);
  }
}

export function getDailyStreak(activityType: 'gazing' | 'barefoot' | 'fasting'): number {
  if (typeof window === 'undefined') return 0;
  
  let streak = 0;
  let currentDate = new Date();
  
  while (streak < 365) { // Max 1 year check
    const dateStr = currentDate.toISOString().split('T')[0];
    const key = `daily_${activityType}_${dateStr}`;
    
    try {
      const activity = localStorage.getItem(key);
      if (!activity) break;
      
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } catch (error) {
      break;
    }
  }
  
  return streak;
}

// Clear data for testing
export function clearAllProgress(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(QUEST_STORAGE_KEY);
    localStorage.removeItem(ACHIEVEMENT_STORAGE_KEY);
    localStorage.removeItem(STILLNESS_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing progress:', error);
  }
}