import { Capacitor } from '@capacitor/core';
import { weatherService } from './weatherService';

export type SolarReminderPreferences = {
  enabled: boolean;
  morningReminder: boolean;
  eveningReminder: boolean;
  reminderTime: number; // minutes before sunrise/sunset
};

const SUNRISE_NOTIFICATION_ID = 4401;
const SUNSET_NOTIFICATION_ID = 4402;

function computeNextOccurrence(target: Date, minutesBefore: number): Date {
  const now = Date.now();
  const scheduled = new Date(target.getTime() - minutesBefore * 60 * 1000);

  // If it's already passed for today, schedule for the next day.
  if (scheduled.getTime() <= now + 15_000) {
    return new Date(scheduled.getTime() + 24 * 60 * 60 * 1000);
  }

  return scheduled;
}

export async function requestNativeLocalNotificationPermission(): Promise<
  | { supported: false; granted: false }
  | { supported: true; granted: boolean }
> {
  if (!Capacitor.isNativePlatform()) return { supported: false, granted: false };

  try {
    const { LocalNotifications } = await import('@capacitor/local-notifications');
    const perm = await LocalNotifications.requestPermissions();
    return { supported: true, granted: perm.display === 'granted' };
  } catch (error) {
    console.warn('LocalNotifications permission request failed:', error);
    return { supported: true, granted: false };
  }
}

export async function checkNativeLocalNotificationPermission(): Promise<
  | { supported: false; granted: false }
  | { supported: true; granted: boolean }
> {
  if (!Capacitor.isNativePlatform()) return { supported: false, granted: false };

  try {
    const { LocalNotifications } = await import('@capacitor/local-notifications');
    const perm = await LocalNotifications.checkPermissions();
    return { supported: true, granted: perm.display === 'granted' };
  } catch (error) {
    console.warn('LocalNotifications permission check failed:', error);
    return { supported: true, granted: false };
  }
}

export async function syncNativeSolarReminders(preferences: SolarReminderPreferences): Promise<{
  supported: boolean;
  scheduled: boolean;
  reason?: 'not_native' | 'disabled' | 'permission_denied' | 'no_location' | 'no_solar_times';
}> {
  if (!Capacitor.isNativePlatform()) {
    return { supported: false, scheduled: false, reason: 'not_native' };
  }

  if (!preferences.enabled) {
    // If user disabled reminders, attempt to cancel any pending scheduled reminders.
    try {
      const { LocalNotifications } = await import('@capacitor/local-notifications');
      const pending = await LocalNotifications.getPending();
      const toCancel = pending.notifications
        .filter((n) => n.id === SUNRISE_NOTIFICATION_ID || n.id === SUNSET_NOTIFICATION_ID)
        .map((n) => ({ id: n.id }));
      if (toCancel.length) await LocalNotifications.cancel({ notifications: toCancel });
    } catch {
      // Best effort; ignore.
    }
    return { supported: true, scheduled: false, reason: 'disabled' };
  }

  const permission = await requestNativeLocalNotificationPermission();
  if (!permission.supported || !permission.granted) {
    return { supported: true, scheduled: false, reason: 'permission_denied' };
  }

  const location = await weatherService.initializeLocation();
  if (!location) return { supported: true, scheduled: false, reason: 'no_location' };

  const solarTimes = await weatherService.getSolarTimes(location);
  if (!solarTimes) return { supported: true, scheduled: false, reason: 'no_solar_times' };

  const minutesBefore = Math.max(5, Math.min(60, preferences.reminderTime));
  const sunriseAt = computeNextOccurrence(solarTimes.sunrise, minutesBefore);
  const sunsetAt = computeNextOccurrence(solarTimes.sunset, minutesBefore);

  const notifications: any[] = [];

  if (preferences.morningReminder) {
    notifications.push({
      id: SUNRISE_NOTIFICATION_ID,
      title: 'Sunrise is near',
      body: `Your solar window starts soon. ${minutesBefore} min reminder.`,
      schedule: { at: sunriseAt },
      sound: undefined,
      extra: { type: 'sunrise', minutesBefore }
    });
  }

  if (preferences.eveningReminder) {
    notifications.push({
      id: SUNSET_NOTIFICATION_ID,
      title: 'Sunset is near',
      body: `Your solar window starts soon. ${minutesBefore} min reminder.`,
      schedule: { at: sunsetAt },
      sound: undefined,
      extra: { type: 'sunset', minutesBefore }
    });
  }

  try {
    const { LocalNotifications } = await import('@capacitor/local-notifications');

    // Cancel existing scheduled reminders (best effort).
    try {
      const pending = await LocalNotifications.getPending();
      const toCancel = pending.notifications
        .filter((n) => n.id === SUNRISE_NOTIFICATION_ID || n.id === SUNSET_NOTIFICATION_ID)
        .map((n) => ({ id: n.id }));
      if (toCancel.length) await LocalNotifications.cancel({ notifications: toCancel });
    } catch {
      // ignore
    }

    if (notifications.length) {
      await LocalNotifications.schedule({ notifications });
    }

    return { supported: true, scheduled: true };
  } catch (error) {
    console.warn('Failed to schedule native solar reminders:', error);
    return { supported: true, scheduled: false, reason: 'permission_denied' };
  }
}


