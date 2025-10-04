// Daily popup management for Truth Serum
// Tracks first app open of the day and manages popup state

export interface DailyPopupState {
  lastShownDate: string | null;
  hasShownToday: boolean;
  isEnabled: boolean;
}

const STORAGE_KEY = 'sungaze_daily_popup';

export function getDailyPopupState(): DailyPopupState {
  if (typeof window === 'undefined') {
    return {
      lastShownDate: null,
      hasShownToday: false,
      isEnabled: true
    };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      const today = new Date().toDateString();
      
      return {
        lastShownDate: parsed.lastShownDate,
        hasShownToday: parsed.lastShownDate === today,
        isEnabled: parsed.isEnabled !== false
      };
    }
  } catch (error) {
    console.error('Error reading daily popup state:', error);
  }

  return {
    lastShownDate: null,
    hasShownToday: false,
    isEnabled: true
  };
}

export function markDailyPopupShown(): void {
  if (typeof window === 'undefined') return;

  try {
    const today = new Date().toDateString();
    const state: DailyPopupState = {
      lastShownDate: today,
      hasShownToday: true,
      isEnabled: true
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving daily popup state:', error);
  }
}

export function shouldShowDailyPopup(): boolean {
  const state = getDailyPopupState();
  
  if (!state.isEnabled) {
    return false;
  }

  const today = new Date().toDateString();
  
  // Show if we haven't shown today
  if (state.lastShownDate !== today) {
    return true;
  }

  return false;
}

export function disableDailyPopup(): void {
  if (typeof window === 'undefined') return;

  try {
    const state = getDailyPopupState();
    state.isEnabled = false;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error disabling daily popup:', error);
  }
}

export function enableDailyPopup(): void {
  if (typeof window === 'undefined') return;

  try {
    const state = getDailyPopupState();
    state.isEnabled = true;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error enabling daily popup:', error);
  }
}

// Reset daily popup state (useful for testing)
export function resetDailyPopupState(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error resetting daily popup state:', error);
  }
}

