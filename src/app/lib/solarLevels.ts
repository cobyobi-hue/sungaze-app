// Solar Master Progression System - 4 Levels over 9 months
// Replaces the old milestone system with gamified progression

export interface SolarLevel {
  id: string;
  levelNumber: 1 | 2 | 3 | 4;
  title: string;
  subtitle: string;
  emoji: string;
  dayRange: [number, number]; // [start, end] inclusive
  durationRange: [number, number]; // [min, max] minutes
  description: string;
  practices: string[];
  unlocks: string[];
  goal: string;
  timeline: string;
  color: string; // CSS color class
  achievement: {
    name: string;
    icon: string;
    badge: string;
    auraColor: string;
    visualEffect: string;
  };
  benefits: string[];
  quest: {
    title: string;
    description: string;
    requirement: string;
    trackingType: 'streak' | 'duration' | 'milestone' | 'community';
  };
}

export const SOLAR_LEVELS: SolarLevel[] = [
  {
    id: 'solar-apprentice',
    levelNumber: 1,
    title: 'Solar Apprentice',
    subtitle: 'Foundation',
    emoji: '🟢',
    dayRange: [1, 90],
    durationRange: [0.17, 15], // 10 seconds to 15 minutes
    description: 'Your solar journey begins! Start with 10 seconds and add 10 seconds daily. Always barefoot on earth.',
    practices: [
      'Direct sun gazing at sunrise/sunset',
      'Always barefoot on earth',
      '+10 seconds daily progression',
      'Grounding connection ritual'
    ],
    unlocks: [
      'HRM education modules',
      'Light as food concepts',
      'Pineal activation guidance',
      'Barefoot walking timer'
    ],
    goal: 'Reach 15 minutes of safe daily gazing',
    timeline: 'Days 1-90',
    color: 'text-green-400',
    achievement: {
      name: 'First Rays',
      icon: '🌱',
      badge: 'Apprentice Badge',
      auraColor: 'green',
      visualEffect: 'Green aura glow with growing light effect'
    },
    benefits: [
      'HRM education modules (light as food, pineal activation)',
      'Barefoot tracker with solar soundscapes',
      'Grounding meditation library',
      'Solar nutrition guidance'
    ],
    quest: {
      title: 'Solar Foundation',
      description: 'Master the foundation of HRM practice with barefoot connection',
      requirement: 'Reach 15 minutes barefoot + gazing',
      trackingType: 'duration'
    }
  },
  {
    id: 'solar-adept',
    levelNumber: 2,
    title: 'Solar Adept',
    subtitle: 'Integration Master',
    emoji: '🟡',
    dayRange: [91, 180],
    durationRange: [15, 30], // 15 to 30 minutes
    description: 'Deepening your practice. Notice cellular changes, pineal activation, and light integration.',
    practices: [
      'Extended gazing sessions',
      'Pineal activation focus',
      'Light integration meditation',
      'Cellular reprogramming awareness'
    ],
    unlocks: [
      'Advanced pineal activation',
      'Cellular light integration',
      'Solar nutrition protocols',
      'Light-body meditation'
    ],
    goal: 'Reach 30 minutes and notice profound changes',
    timeline: 'Days 91-180',
    color: 'text-yellow-400',
    achievement: {
      name: 'Light Weaver',
      icon: '⚡',
      badge: 'Adept Badge',
      auraColor: 'yellow',
      visualEffect: 'Golden aura with electric sparkles'
    },
    benefits: [
      'Advanced pineal activation techniques',
      'Cellular light integration protocols',
      'Solar nutrition masterclass',
      'Light-body meditation library'
    ],
    quest: {
      title: 'Light Integration',
      description: 'Integrate solar light at the cellular level',
      requirement: 'Reach 30 minutes + log cellular changes',
      trackingType: 'milestone'
    }
  },
  {
    id: 'inner-sun-adept',
    levelNumber: 3,
    title: 'Inner Sun Adept',
    subtitle: 'Light Mastery',
    emoji: '🟠',
    dayRange: [181, 270],
    durationRange: [30, 44], // 30 to 44 minutes
    description: 'Approaching the sacred 44-minute threshold. Inner sun activation begins.',
    practices: [
      'Extended 30+ minute sessions',
      'Inner sun visualization',
      'Light-body activation',
      'Solar consciousness expansion'
    ],
    unlocks: [
      'Inner sun activation',
      'Light-body protocols',
      'Solar consciousness expansion',
      'Master-level guidance'
    ],
    goal: 'Reach 44 minutes and activate inner sun',
    timeline: 'Days 181-270',
    color: 'text-orange-400',
    achievement: {
      name: 'Inner Sun',
      icon: '☀️',
      badge: 'Light Master Badge',
      auraColor: 'orange',
      visualEffect: 'Orange aura with inner sun glow'
    },
    benefits: [
      'Inner sun activation techniques',
      'Light-body development protocols',
      'Solar consciousness expansion',
      'Master-level guidance and support'
    ],
    quest: {
      title: 'Inner Sun Activation',
      description: 'Activate your inner sun and reach the sacred 44-minute threshold',
      requirement: 'Reach 44 minutes + inner sun activation',
      trackingType: 'milestone'
    }
  },
  {
    id: 'solar-master',
    levelNumber: 4,
    title: 'Solar Master',
    subtitle: 'Light Integration',
    emoji: '🔴',
    dayRange: [271, 365],
    durationRange: [44, 44], // 44 minutes maintained
    description: 'You have reached the sacred 44-minute threshold. Now focus on integration and mastery.',
    practices: [
      'Maintain 44-minute sessions',
      'Light integration mastery',
      'Teaching and sharing wisdom',
      'Advanced solar consciousness'
    ],
    unlocks: [
      'Master-level content',
      'Teaching capabilities',
      'Advanced solar protocols',
      'Community leadership'
    ],
    goal: 'Master light integration and share wisdom',
    timeline: 'Days 271-365',
    color: 'text-red-400',
    achievement: {
      name: 'Solar Master',
      icon: '👑',
      badge: 'Master Badge',
      auraColor: 'red',
      visualEffect: 'Red aura with master crown effect'
    },
    benefits: [
      'Master-level content and protocols',
      'Teaching and mentorship capabilities',
      'Advanced solar consciousness techniques',
      'Community leadership opportunities'
    ],
    quest: {
      title: 'Master Integration',
      description: 'Master light integration and begin sharing wisdom with others',
      requirement: 'Maintain 44 minutes + help 3 others start',
      trackingType: 'community'
    }
  }
];

const LEVEL_STORAGE_KEY = 'solar_level_progress';

export interface LevelProgress {
  currentDay: number;
  currentLevel: SolarLevel;
  unlockedLevels: string[];
  completedPractices: Record<string, boolean>;
  achievements: string[];
  startDate: string; // ISO date string
}

// Get current solar level based on day
export function getCurrentSolarLevel(day: number): SolarLevel {
  const level = SOLAR_LEVELS.find(level => 
    day >= level.dayRange[0] && day <= level.dayRange[1]
  );
  
  // Ensure we always return a valid level with dayRange
  if (!level || !level.dayRange) {
    return SOLAR_LEVELS[0]; // Default to Solar Apprentice
  }
  
  return level;
}

// Get next solar level
export function getNextSolarLevel(currentDay: number): SolarLevel | null {
  const currentLevel = getCurrentSolarLevel(currentDay);
  const nextLevelIndex = SOLAR_LEVELS.findIndex(l => l.id === currentLevel.id) + 1;
  return nextLevelIndex < SOLAR_LEVELS.length ? SOLAR_LEVELS[nextLevelIndex] : null;
}

// Get level progress from day and duration
export function getLevelProgress(day: number, completedMinutes: number): {
  currentLevel: SolarLevel;
  nextLevel: SolarLevel | null;
  progressPercent: number;
  daysInLevel: number;
  totalDaysInLevel: number;
  isLevelComplete: boolean;
} {
  const currentLevel = getCurrentSolarLevel(day);
  const nextLevel = getNextSolarLevel(day);
  
  const [levelStartDay, levelEndDay] = currentLevel.dayRange;
  const daysInLevel = Math.max(1, day - levelStartDay + 1);
  const totalDaysInLevel = levelEndDay - levelStartDay + 1;
  
  const progressPercent = Math.min(100, (daysInLevel / totalDaysInLevel) * 100);
  const isLevelComplete = day >= levelEndDay;
  
  return {
    currentLevel,
    nextLevel,
    progressPercent,
    daysInLevel,
    totalDaysInLevel,
    isLevelComplete
  };
}

// Check if user should level up
export function checkLevelUp(previousDay: number, currentDay: number): SolarLevel | null {
  const previousLevel = getCurrentSolarLevel(previousDay);
  const currentLevel = getCurrentSolarLevel(currentDay);
  
  if (previousLevel.id !== currentLevel.id) {
    return currentLevel;
  }
  
  return null;
}

// Get motivation message for current level
export function getLevelMotivation(level: SolarLevel, day: number): string {
  if (!level || !level.dayRange || !Array.isArray(level.dayRange)) {
    return "Continue your solar journey with dedication.";
  }
  
  const [levelStartDay] = level.dayRange;
  const daysInLevel = day - levelStartDay + 1;
  
  switch (level.id) {
    case 'solar-apprentice':
      if (daysInLevel <= 7) {
        return "You're building the foundation of your solar journey. Each day strengthens your connection to the sun.";
      } else if (daysInLevel <= 30) {
        return "Your practice is deepening. Notice how your eyes and body are adapting to the light.";
      } else {
        return "You're approaching the 15-minute milestone. Your solar foundation is becoming strong.";
      }
    
    case 'solar-adept':
      if (daysInLevel <= 30) {
        return "Welcome to the Adept level! You're now experiencing deeper light integration.";
      } else {
        return "Your pineal gland is activating. You're becoming a true light worker.";
      }
    
    case 'inner-sun-adept':
      if (daysInLevel <= 30) {
        return "The sacred 44-minute threshold approaches. Your inner sun is awakening.";
      } else {
        return "You're in the final stretch to 44 minutes. Your light-body is developing.";
      }
    
    case 'solar-master':
      return "You have achieved the sacred 44-minute threshold. Now focus on integration and sharing your wisdom.";
    
    default:
      return "Continue your solar journey with dedication and awareness.";
  }
}

// Get level-specific content
export function getLevelContent(levelId: string) {
  // This would typically fetch from a content database
  // For now, return basic level info
  const level = SOLAR_LEVELS.find(l => l.id === levelId);
  return level ? {
    practices: level.practices,
    unlocks: level.unlocks,
    benefits: level.benefits,
    quest: level.quest
  } : null;
}

// Save level progress to localStorage
export function saveLevelProgress(progress: LevelProgress): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LEVEL_STORAGE_KEY, JSON.stringify(progress));
  }
}

// Load level progress from localStorage
export function loadLevelProgress(): LevelProgress | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(LEVEL_STORAGE_KEY);
    if (!stored) return null;
    
    const parsed = JSON.parse(stored);
    // Ensure currentLevel is properly reconstructed
    if (parsed.currentLevel && parsed.currentDay) {
      parsed.currentLevel = getCurrentSolarLevel(parsed.currentDay);
    }
    
    return parsed;
  } catch (error) {
    console.error('Error loading level progress:', error);
    return null;
  }
}

// Initialize default level progress
export function getDefaultLevelProgress(): LevelProgress {
  const startDate = new Date().toISOString();
  const currentLevel = getCurrentSolarLevel(1);
  
  return {
    currentDay: 1,
    currentLevel,
    unlockedLevels: [currentLevel.id],
    completedPractices: {},
    achievements: [],
    startDate
  };
}