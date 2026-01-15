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
  clientSessionId?: string; // client-generated id for Supabase idempotent sync
  supabaseSessionId?: string; // Supabase row id once synced
  syncedToSupabase?: boolean;
  date: string;
  duration: number; // in seconds
  timeOfDay: 'sunrise' | 'sunset' | 'other';
  sessionTime?: string; // Format: "HH:MM" - when session started
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
  SUPABASE_SYNC_QUEUE: 'sungaze_supabase_sync_queue',
} as const;

class LocalStorage {
  private getLocalDateKey(d: Date = new Date()): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  private parseLocalDateKey(dateKey: string): Date {
    // Parse YYYY-MM-DD as a local date (avoid JS Date treating it as UTC midnight)
    const [y, m, d] = dateKey.split('-').map((v) => parseInt(v, 10));
    if (!y || !m || !d) return new Date();
    return new Date(y, m - 1, d);
  }

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
    if (typeof window === 'undefined') return;
    
    try {
      const progress = this.getUserProgress();
      const today = this.getLocalDateKey(new Date());
      
      // Create new progress object to avoid mutations
      const updatedProgress: UserProgress = {
        ...progress,
        practiceHistory: [...progress.practiceHistory, session],
        totalPractices: progress.totalPractices + 1,
      };
      
      // Update streak
      if (updatedProgress.lastPracticeDate === today) {
        // Same day practice - don't update streak
      } else if (this.isConsecutiveDay(updatedProgress.lastPracticeDate, today)) {
        updatedProgress.currentStreak = updatedProgress.currentStreak + 1;
        updatedProgress.longestStreak = Math.max(updatedProgress.longestStreak, updatedProgress.currentStreak);
      } else {
        updatedProgress.currentStreak = 1;
      }
      
      updatedProgress.lastPracticeDate = today;
      
      // Auto-advance day if they complete their target
      const todaysSessions = updatedProgress.practiceHistory.filter(p => p.date === today);
      const todaysTotal = todaysSessions.reduce((sum, p) => sum + p.duration, 0);
      const targetTime = updatedProgress.currentDay * 10; // 10 seconds per day
      
      if (todaysTotal >= targetTime && updatedProgress.currentDay < 270) {
        updatedProgress.currentDay = updatedProgress.currentDay + 1;
      }
      
      this.saveUserProgress(updatedProgress);
    } catch (error) {
      console.error('Error adding practice session:', error);
    }
  }

  updatePracticeSession(clientSessionId: string, patch: Partial<PracticeSession>): void {
    if (typeof window === 'undefined') return;
    try {
      const progress = this.getUserProgress();
      const idx = progress.practiceHistory.findIndex((s) => s.clientSessionId === clientSessionId);
      if (idx === -1) return;

      const updatedHistory = [...progress.practiceHistory];
      updatedHistory[idx] = { ...updatedHistory[idx], ...patch };

      const updatedProgress: UserProgress = { ...progress, practiceHistory: updatedHistory };
      this.saveUserProgress(updatedProgress);
    } catch (error) {
      console.error('Error updating practice session:', error);
    }
  }

  isConsecutiveDay(lastDate: string | null, currentDate: string): boolean {
    if (!lastDate) return true; // First practice
    
    const last = this.parseLocalDateKey(lastDate);
    const current = this.parseLocalDateKey(currentDate);
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

  // Supabase sync queue (for offline/failed DB writes)
  getSupabaseSyncQueue(): any[] {
    if (typeof window === 'undefined') return [];
    try {
      const stored = window.localStorage.getItem(STORAGE_KEYS.SUPABASE_SYNC_QUEUE);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading Supabase sync queue:', error);
      return [];
    }
  }

  addToSupabaseSyncQueue(item: any): void {
    if (typeof window === 'undefined') return;
    try {
      const queue = this.getSupabaseSyncQueue();
      queue.push(item);
      window.localStorage.setItem(STORAGE_KEYS.SUPABASE_SYNC_QUEUE, JSON.stringify(queue));
    } catch (error) {
      console.error('Error adding to Supabase sync queue:', error);
    }
  }

  setSupabaseSyncQueue(queue: any[]): void {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(STORAGE_KEYS.SUPABASE_SYNC_QUEUE, JSON.stringify(queue));
    } catch (error) {
      console.error('Error saving Supabase sync queue:', error);
    }
  }
}

export const localStorage = new LocalStorage();