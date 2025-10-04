// Milestone and title unlock system
// Updated to remove Cloud-Gazer and align with new level system

export interface Milestone {
  id: string;
  day: number;
  durationMinutes: number;
  title: string;
  content: {
    type: 'koan' | 'dhammapada' | 'upanishad' | 'graduation';
    text: string;
    source?: string;
  };
  unlocked: boolean;
  unlockedAt?: number; // timestamp
}

export const MILESTONES: Milestone[] = [
  {
    id: 'seeker-of-dawn',
    day: 1,
    durationMinutes: 0.17, // 10 seconds
    title: 'Seeker of Dawn',
    content: {
      type: 'koan',
      text: 'In trataka begins the journey — steady gaze, steady heart.',
      source: 'Ancient Gazing Tradition'
    },
    unlocked: false
  },
  {
    id: 'witness-of-horizon',
    day: 90, // ~Month 3 (15 minutes = 90 * 10 seconds)
    durationMinutes: 15,
    title: 'Witness of the Horizon',
    content: {
      type: 'dhammapada',
      text: 'The sun shines by day, but the awakened shines always.',
      source: 'The Dhammapada'
    },
    unlocked: false
  },
  {
    id: 'guardian-of-rays',
    day: 180, // ~Month 6 (30 minutes = 180 * 10 seconds)
    durationMinutes: 30,
    title: 'Guardian of Rays',
    content: {
      type: 'upanishad',
      text: 'As the sun illuminates the world, so does the awakened illuminate consciousness.',
      source: 'The Upanishads'
    },
    unlocked: false
  },
  {
    id: 'crowned-by-sun',
    day: 270, // ~Month 9 (44 minutes = 270 * 10 seconds)
    durationMinutes: 44,
    title: 'Crowned by Sun',
    content: {
      type: 'graduation',
      text: 'You have become one with the light. The journey continues, but you are now the teacher.',
      source: 'Solar Master Tradition'
    },
    unlocked: false
  }
];

const STORAGE_KEY = 'solar_milestones';

// Get all milestones
export function getAllMilestones(): Milestone[] {
  return MILESTONES;
}

// Get unlocked milestones
export function getUnlockedMilestones(): Milestone[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const unlockedIds = JSON.parse(stored);
    return MILESTONES.filter(milestone => unlockedIds.includes(milestone.id));
  } catch (error) {
    console.error('Error loading unlocked milestones:', error);
    return [];
  }
}

// Unlock a milestone
export function unlockMilestone(milestoneId: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const unlockedIds = stored ? JSON.parse(stored) : [];
    
    if (!unlockedIds.includes(milestoneId)) {
      unlockedIds.push(milestoneId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(unlockedIds));
      
      // Update the milestone in the array
      const milestone = MILESTONES.find(m => m.id === milestoneId);
      if (milestone) {
        milestone.unlocked = true;
        milestone.unlockedAt = Date.now();
      }
    }
  } catch (error) {
    console.error('Error unlocking milestone:', error);
  }
}

// Check if a milestone is unlocked
export function isMilestoneUnlocked(milestoneId: string): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return false;
    
    const unlockedIds = JSON.parse(stored);
    return unlockedIds.includes(milestoneId);
  } catch (error) {
    console.error('Error checking milestone status:', error);
    return false;
  }
}

// Get unlock statistics
export function getUnlockStats(): {
  totalMilestones: number;
  unlockedCount: number;
  percentageComplete: number;
  nextMilestone: Milestone | null;
} {
  const totalMilestones = MILESTONES.length;
  const unlockedCount = getUnlockedMilestones().length;
  const percentageComplete = totalMilestones > 0 ? (unlockedCount / totalMilestones) * 100 : 0;
  
  // Find the next milestone to unlock
  const nextMilestone = MILESTONES.find(milestone => !isMilestoneUnlocked(milestone.id)) || null;
  
  return {
    totalMilestones,
    unlockedCount,
    percentageComplete,
    nextMilestone
  };
}

// Check if user has graduated (unlocked all milestones)
export function isGraduated(): boolean {
  const stats = getUnlockStats();
  return stats.unlockedCount === stats.totalMilestones;
}

// Get milestone by ID
export function getMilestoneById(milestoneId: string): Milestone | null {
  return MILESTONES.find(milestone => milestone.id === milestoneId) || null;
}

// Get milestone by day
export function getMilestoneByDay(day: number): Milestone | null {
  return MILESTONES.find(milestone => milestone.day === day) || null;
}

// Get next milestone to unlock
export function getNextMilestone(): Milestone | null {
  return MILESTONES.find(milestone => !isMilestoneUnlocked(milestone.id)) || null;
}

// Clear all milestones (for testing/reset)
export function clearAllMilestones(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(STORAGE_KEY);
    MILESTONES.forEach(milestone => {
      milestone.unlocked = false;
      milestone.unlockedAt = undefined;
    });
  } catch (error) {
    console.error('Error clearing milestones:', error);
  }
}

// Initialize milestones on app start
export function initializeMilestones(): void {
  if (typeof window === 'undefined') return;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const unlockedIds = JSON.parse(stored);
      MILESTONES.forEach(milestone => {
        milestone.unlocked = unlockedIds.includes(milestone.id);
      });
    }
  } catch (error) {
    console.error('Error initializing milestones:', error);
  }
}

// Auto-unlock milestones based on progress
export function checkAndUnlockMilestones(currentDay: number, currentDurationMinutes: number): void {
  MILESTONES.forEach(milestone => {
    if (!milestone.unlocked && 
        currentDay >= milestone.day && 
        currentDurationMinutes >= milestone.durationMinutes) {
      unlockMilestone(milestone.id);
    }
  });
}