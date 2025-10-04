// Local-first storage for offline practice
// Stores user progress, settings, and practice data locally

export interface UserProgress {
  currentDay: number;
  totalPractices: number;
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate: string | null;
  practiceHistory: PracticeSession[];
}

export interface PracticeSession {
  date: string;
  duration: number; // in seconds
  timeOfDay: 'sunrise' | 'sunset' | 'other';
  uvIndex?: number;
  location?: {
    lat: number;
    lng: number;
  };
  notes?: string;
}

export interface UserSettings {
  location?: {
    lat: number;
    lng: number;
    city?: string;
  };
  notifications: {
    sunriseReminder: boolean;
    sunsetReminder: boolean;
    dailyEncouragement: boolean;
  };
  safetySettings: {
    maxUVIndex: number;
    autoStopEnabled: boolean;
    locationBasedTiming: boolean;
  };
  theme: 'auto' | 'light' | 'dark';
}

// Local Storage Keys
const STORAGE_KEYS = {
  USER_PROGRESS: 'sungaze_user_progress',
  USER_SETTINGS: 'sungaze_user_settings',
  PRACTICE_QUEUE: 'sungaze_practice_queue', // For offline practices to sync later
} as const;

class LocalStorage {
  // User Progress Methods
  getUserProgress(): UserProgress {
    if (typeof window === 'undefined') {
      return this.getDefaultProgress();
    }

    try {
      const stored = window.localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
      if (!stored) return this.getDefaultProgress();
      
      const parsed = JSON.parse(stored);
      return {
        ...this.getDefaultProgress(),
        ...parsed,
      };
    } catch (error) {
      console.error('Error loading user progress:', error);
      return this.getDefaultProgress();
    }
  }

  saveUserProgress(progress: UserProgress): void {
    if (typeof window === 'undefined') return;

    try {
      window.localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(progress));
    } catch (error) {
      console.error('Error saving user progress:', error);
    }
  }

  getDefaultProgress(): UserProgress {
    return {
      currentDay: 1,
      totalPractices: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastPracticeDate: null,
      practiceHistory: [],
    };
  }

  // User Settings Methods
  getUserSettings(): UserSettings {
    if (typeof window === 'undefined') {
      return this.getDefaultSettings();
    }

    try {
      const stored = window.localStorage.getItem(STORAGE_KEYS.USER_SETTINGS);
      if (!stored) return this.getDefaultSettings();
      
      const parsed = JSON.parse(stored);
      return {
        ...this.getDefaultSettings(),
        ...parsed,
      };
    } catch (error) {
      console.error('Error loading user settings:', error);
      return this.getDefaultSettings();
    }
  }

  saveUserSettings(settings: UserSettings): void {
    if (typeof window === 'undefined') return;

    try {
      window.localStorage.setItem(STORAGE_KEYS.USER_SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving user settings:', error);
    }
  }

  getDefaultSettings(): UserSettings {
    return {
      notifications: {
        sunriseReminder: true,
        sunsetReminder: true,
        dailyEncouragement: true,
      },
      safetySettings: {
        maxUVIndex: 2,
        autoStopEnabled: true,
        locationBasedTiming: true,
      },
      theme: 'auto',
    };
  }

  // Practice Session Methods
  addPracticeSession(session: PracticeSession): void {
    const progress = this.getUserProgress();
    const today = new Date().toISOString().split('T')[0];
    
    // Add to history
    progress.practiceHistory.push(session);
    progress.totalPractices++;
    
    // Update streak
    if (progress.lastPracticeDate === today) {
      // Same day practice - don't update streak
    } else if (this.isConsecutiveDay(progress.lastPracticeDate, today)) {
      progress.currentStreak++;
      progress.longestStreak = Math.max(progress.longestStreak, progress.currentStreak);
    } else {
      progress.currentStreak = 1;
    }
    
    progress.lastPracticeDate = today;
    
    // Auto-advance day if they complete their target
    const todaysSessions = progress.practiceHistory.filter(p => p.date === today);
    const todaysTotal = todaysSessions.reduce((sum, p) => sum + p.duration, 0);
    const targetTime = progress.currentDay * 10; // 10 seconds per day
    
    if (todaysTotal >= targetTime && progress.currentDay < 270) {
      progress.currentDay++;
    }
    
    this.saveUserProgress(progress);
  }

  isConsecutiveDay(lastDate: string | null, currentDate: string): boolean {
    if (!lastDate) return true; // First practice
    
    const last = new Date(lastDate);
    const current = new Date(currentDate);
    const diffTime = current.getTime() - last.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays === 1;
  }

  // Offline Queue Methods (for when GPS/UV data isn't available)
  addToOfflineQueue(session: Omit<PracticeSession, 'uvIndex' | 'location'>): void {
    if (typeof window === 'undefined') return;

    try {
      const queue = this.getOfflineQueue();
      queue.push({
        ...session,
        id: Date.now().toString(),
        timestamp: Date.now(),
      });
      window.localStorage.setItem(STORAGE_KEYS.PRACTICE_QUEUE, JSON.stringify(queue));
    } catch (error) {
      console.error('Error adding to offline queue:', error);
    }
  }

  getOfflineQueue(): any[] {
    if (typeof window === 'undefined') return [];

    try {
      const stored = window.localStorage.getItem(STORAGE_KEYS.PRACTICE_QUEUE);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading offline queue:', error);
      return [];
    }
  }

  clearOfflineQueue(): void {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(STORAGE_KEYS.PRACTICE_QUEUE);
  }
}

export const localStorage = new LocalStorage();