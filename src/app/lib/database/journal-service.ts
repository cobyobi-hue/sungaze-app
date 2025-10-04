"use client";

export interface JournalEntry {
  id: string;
  userId: string;
  date: string; // ISO string
  gazingType: 'sun' | 'cloud' | 'candle' | 'starlight';
  duration: number;
  condition: string;
  reflection: string;
  mood: 'energized' | 'peaceful' | 'centered' | 'transcendent' | 'grateful' | 'sleepy' | 'dreamy';
  insights: string;
  bodyExperience: string;
  gratitude?: string;
  dreamIntentions?: string;
  practiceType: 'day' | 'evening';
  photoUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface JournalStats {
  totalEntries: number;
  currentStreak: number;
  longestStreak: number;
  averageMood: number;
  totalPracticeTime: number;
  practiceTypeBreakdown: {
    sun: number;
    cloud: number;
    candle: number;
    starlight: number;
  };
}

// Mock journal database service - replace with actual Firebase/Supabase implementation
class JournalService {
  private entries = new Map<string, JournalEntry[]>();
  private readonly STORAGE_KEY = 'sungaze_journal_entries';

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): void {
    if (typeof window === 'undefined') return;
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        this.entries = new Map(Object.entries(data));
      }
    } catch (error) {
      console.error('Failed to load journal entries from localStorage:', error);
    }
  }

  private saveToLocalStorage(): void {
    if (typeof window === 'undefined') return;
    
    try {
      const data = Object.fromEntries(this.entries);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save journal entries to localStorage:', error);
    }
  }

  async createEntry(userId: string, entryData: Omit<JournalEntry, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<JournalEntry> {
    const now = new Date().toISOString();
    const entry: JournalEntry = {
      id: crypto.randomUUID(),
      userId,
      createdAt: now,
      updatedAt: now,
      ...entryData,
    };

    const userEntries = this.entries.get(userId) || [];
    userEntries.unshift(entry); // Add to beginning for latest first
    this.entries.set(userId, userEntries);
    
    this.saveToLocalStorage();
    return entry;
  }

  async getUserEntries(userId: string, limit?: number): Promise<JournalEntry[]> {
    const userEntries = this.entries.get(userId) || [];
    if (limit) {
      return userEntries.slice(0, limit);
    }
    return [...userEntries];
  }

  async getEntry(userId: string, entryId: string): Promise<JournalEntry | null> {
    const userEntries = this.entries.get(userId) || [];
    return userEntries.find(entry => entry.id === entryId) || null;
  }

  async updateEntry(userId: string, entryId: string, updates: Partial<JournalEntry>): Promise<JournalEntry | null> {
    const userEntries = this.entries.get(userId) || [];
    const entryIndex = userEntries.findIndex(entry => entry.id === entryId);
    
    if (entryIndex === -1) return null;

    const updatedEntry: JournalEntry = {
      ...userEntries[entryIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    userEntries[entryIndex] = updatedEntry;
    this.entries.set(userId, userEntries);
    this.saveToLocalStorage();
    
    return updatedEntry;
  }

  async deleteEntry(userId: string, entryId: string): Promise<boolean> {
    const userEntries = this.entries.get(userId) || [];
    const filteredEntries = userEntries.filter(entry => entry.id !== entryId);
    
    if (filteredEntries.length === userEntries.length) {
      return false; // Entry not found
    }

    this.entries.set(userId, filteredEntries);
    this.saveToLocalStorage();
    return true;
  }

  async getUserStats(userId: string): Promise<JournalStats> {
    const userEntries = this.entries.get(userId) || [];
    
    if (userEntries.length === 0) {
      return {
        totalEntries: 0,
        currentStreak: 0,
        longestStreak: 0,
        averageMood: 0,
        totalPracticeTime: 0,
        practiceTypeBreakdown: {
          sun: 0,
          cloud: 0,
          candle: 0,
          starlight: 0,
        },
      };
    }

    // Calculate practice type breakdown
    const practiceTypeBreakdown = userEntries.reduce(
      (acc, entry) => {
        acc[entry.gazingType]++;
        return acc;
      },
      { sun: 0, cloud: 0, candle: 0, starlight: 0 }
    );

    // Calculate total practice time
    const totalPracticeTime = userEntries.reduce((total, entry) => total + entry.duration, 0);

    // Calculate average mood (convert moods to numbers for averaging)
    const moodValues = {
      sleepy: 1,
      dreamy: 2,
      peaceful: 3,
      centered: 4,
      grateful: 5,
      energized: 6,
      transcendent: 7,
    };
    
    const averageMood = userEntries.reduce((sum, entry) => sum + moodValues[entry.mood], 0) / userEntries.length;

    // Calculate streaks (simplified - just count recent consecutive days)
    const sortedEntries = [...userEntries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    let lastDate: Date | null = null;

    for (const entry of sortedEntries) {
      const entryDate = new Date(entry.date);
      entryDate.setHours(0, 0, 0, 0); // Normalize to start of day

      if (!lastDate) {
        currentStreak = 1;
        tempStreak = 1;
        lastDate = entryDate;
        continue;
      }

      const dayDiff = Math.floor((lastDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (dayDiff === 1) {
        // Consecutive day
        if (currentStreak === tempStreak) {
          currentStreak++;
        }
        tempStreak++;
      } else if (dayDiff > 1) {
        // Gap in days - reset current streak tracking but continue temp streak calculation
        if (currentStreak === tempStreak - 1) {
          currentStreak = 0;
        }
        tempStreak = 1;
      }
      // dayDiff === 0 means same day, continue current counts

      longestStreak = Math.max(longestStreak, tempStreak);
      lastDate = entryDate;
    }

    return {
      totalEntries: userEntries.length,
      currentStreak,
      longestStreak,
      averageMood: Math.round(averageMood * 10) / 10, // Round to 1 decimal place
      totalPracticeTime,
      practiceTypeBreakdown,
    };
  }

  async uploadPhoto(file: File): Promise<string> {
    // Mock photo upload - in real implementation, upload to Firebase Storage/Supabase Storage
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        // In real implementation, this would return a cloud storage URL
        // For now, return the data URL (base64)
        resolve(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    });
  }

  // Migration helper to convert old localStorage entries
  async migrateFromOldFormat(userId: string): Promise<void> {
    if (typeof window === 'undefined') return;
    
    try {
      const oldEntries = localStorage.getItem('sungaze_journal');
      if (!oldEntries) return;

      const parsed = JSON.parse(oldEntries);
      const migratedEntries: JournalEntry[] = parsed.map((oldEntry: any) => ({
        id: oldEntry.id || crypto.randomUUID(),
        userId,
        date: typeof oldEntry.date === 'string' ? oldEntry.date : oldEntry.date.toISOString(),
        gazingType: oldEntry.gazingType,
        duration: oldEntry.duration,
        condition: oldEntry.condition,
        reflection: oldEntry.reflection,
        mood: oldEntry.mood,
        insights: oldEntry.insights,
        bodyExperience: oldEntry.bodyExperience,
        gratitude: oldEntry.gratitude,
        dreamIntentions: oldEntry.dreamIntentions,
        practiceType: oldEntry.practiceType,
        photoUrl: oldEntry.photoUrl,
        createdAt: typeof oldEntry.date === 'string' ? oldEntry.date : oldEntry.date.toISOString(),
        updatedAt: typeof oldEntry.date === 'string' ? oldEntry.date : oldEntry.date.toISOString(),
      }));

      this.entries.set(userId, migratedEntries);
      this.saveToLocalStorage();
      
      // Clean up old format
      localStorage.removeItem('sungaze_journal');
      console.log('Successfully migrated journal entries to new format');
    } catch (error) {
      console.error('Failed to migrate journal entries:', error);
    }
  }
}

// Export singleton instance
export const journalService = new JournalService();