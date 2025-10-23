// Hook for managing solar window notifications and reminders
import { useState, useEffect, useCallback } from 'react';
import { weatherService } from '../lib/weatherService';

export interface NotificationPreferences {
  morningReminder: boolean;
  eveningReminder: boolean;
  reminderTime: number; // minutes before sunrise/sunset
  enabled: boolean;
}

const DEFAULT_PREFERENCES: NotificationPreferences = {
  morningReminder: true,
  eveningReminder: true,
  reminderTime: 15, // 15 minutes before
  enabled: true
};

const STORAGE_KEY = 'solar_window_notifications';

export function useSolarWindowNotifications() {
  const [preferences, setPreferences] = useState<NotificationPreferences>(DEFAULT_PREFERENCES);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [lastChecked, setLastChecked] = useState<number>(0);

  // Load preferences from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      console.log('Loading notification preferences from localStorage:', stored);
      if (stored) {
        const parsed = JSON.parse(stored);
        console.log('Parsed notification preferences:', parsed);
        setPreferences({ ...DEFAULT_PREFERENCES, ...parsed });
      } else {
        console.log('No stored preferences found, using defaults');
        setPreferences(DEFAULT_PREFERENCES);
      }
    } catch (error) {
      console.error('Failed to load notification preferences:', error);
      setPreferences(DEFAULT_PREFERENCES);
    }
  }, []);

  // Save preferences to localStorage
  const savePreferences = useCallback((newPreferences: NotificationPreferences) => {
    try {
      console.log('Saving notification preferences to localStorage:', newPreferences);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPreferences));
      setPreferences(newPreferences);
      console.log('Notification preferences saved successfully');
    } catch (error) {
      console.error('Failed to save notification preferences:', error);
    }
  }, []);

  // Request notification permission
  const requestNotificationPermission = useCallback(async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }, []);

  // Check if we should show a notification
  const checkForSolarWindow = useCallback(async () => {
    if (!preferences.enabled) return;

    // Don't check too frequently (max once per 5 minutes)
    const now = Date.now();
    if (now - lastChecked < 5 * 60 * 1000) return;

    try {
      const result = await weatherService.shouldTriggerSolarWindow();
      
      if (result.shouldTrigger) {
        // Check if this is a time we want to be reminded about
        const isMorning = result.isSunrise;
        const shouldRemind = (isMorning && preferences.morningReminder) || 
                           (!isMorning && preferences.eveningReminder);

        if (shouldRemind) {
          setIsNotificationVisible(true);
          
          // Trigger browser notification
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Sungazing Time!', {
              body: `Perfect conditions for ${isMorning ? 'sunrise' : 'sunset'} gazing`,
              icon: '/favicon.ico'
            });
          }
        }
      }
    } catch (error) {
      console.error('Failed to check solar window:', error);
    } finally {
      setLastChecked(now);
    }
  }, [preferences, lastChecked]);

  // Start periodic checking
  useEffect(() => {
    if (!preferences.enabled) return;

    // Check immediately
    checkForSolarWindow();

    // Set up interval for periodic checking
    const interval = setInterval(checkForSolarWindow, 5 * 60 * 1000); // Every 5 minutes

    return () => clearInterval(interval);
  }, [checkForSolarWindow, preferences.enabled]);

  // Handle notification close
  const closeNotification = useCallback(() => {
    setIsNotificationVisible(false);
  }, []);

  // Update preferences
  const updatePreferences = useCallback((updates: Partial<NotificationPreferences>) => {
    const newPreferences = { ...preferences, ...updates };
    savePreferences(newPreferences);
  }, [preferences, savePreferences]);

  // Enable/disable notifications
  const toggleNotifications = useCallback(() => {
    updatePreferences({ enabled: !preferences.enabled });
  }, [preferences.enabled, updatePreferences]);

  // Set reminder time
  const setReminderTime = useCallback((minutes: number) => {
    updatePreferences({ reminderTime: Math.max(5, Math.min(60, minutes)) });
  }, [updatePreferences]);

  // Toggle morning reminder
  const toggleMorningReminder = useCallback(() => {
    updatePreferences({ morningReminder: !preferences.morningReminder });
  }, [preferences.morningReminder, updatePreferences]);

  // Toggle evening reminder
  const toggleEveningReminder = useCallback(() => {
    updatePreferences({ eveningReminder: !preferences.eveningReminder });
  }, [preferences.eveningReminder, updatePreferences]);

  // Get cache statistics
  const getCacheStats = useCallback(() => {
    return weatherService.getCacheStats();
  }, []);

  // Clear caches (for testing)
  const clearCaches = useCallback(() => {
    weatherService.clearCaches();
  }, []);

  return {
    preferences,
    isNotificationVisible,
    lastChecked,
    updatePreferences,
    toggleNotifications,
    setReminderTime,
    toggleMorningReminder,
    toggleEveningReminder,
    closeNotification,
    checkForSolarWindow,
    requestNotificationPermission,
    getCacheStats,
    clearCaches
  };
}



