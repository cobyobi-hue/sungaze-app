// Sun times calculation using SunCalc library alternative
// For web apps, we'll implement a simple sun calculation

export interface SunTimes {
  sunrise: Date;
  sunset: Date;
  solarNoon: Date;
  civilTwilightMorning: Date;
  civilTwilightEvening: Date;
  goldenHourMorning: Date;
  goldenHourEvening: Date;
  dayLength: number; // in milliseconds
}

export interface SafeGazingWindows {
  morning: {
    start: Date;
    end: Date;
    duration: number; // in minutes
  };
  evening: {
    start: Date;
    end: Date;
    duration: number; // in minutes
  };
}

// Simplified sun position calculation
// Based on https://gml.noaa.gov/grad/solcalc/calcdetails.html
export function calculateSunTimes(latitude: number, longitude: number, date: Date = new Date()): SunTimes {
  // Convert to radians
  const lat = latitude * Math.PI / 180;
  const lng = longitude * Math.PI / 180;
  
  // Day of year
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  // Solar declination
  const declination = 23.45 * Math.PI / 180 * Math.sin(2 * Math.PI * (284 + dayOfYear) / 365.25);
  
  // Hour angle for sunrise/sunset
  const hourAngle = Math.acos(-Math.tan(lat) * Math.tan(declination));
  
  // Equation of time (simplified)
  const eot = 4 * (longitude - 15 * date.getTimezoneOffset() / 60);
  
  // Solar noon
  const solarNoon = new Date(date);
  solarNoon.setHours(12, 0, 0, 0);
  solarNoon.setMinutes(solarNoon.getMinutes() - eot);
  
  // Sunrise and sunset
  const sunrise = new Date(solarNoon.getTime() - (hourAngle * 12 / Math.PI * 60 * 60 * 1000));
  const sunset = new Date(solarNoon.getTime() + (hourAngle * 12 / Math.PI * 60 * 60 * 1000));
  
  // Civil twilight (6 degrees below horizon)
  const civilTwilightAngle = Math.acos(-Math.tan(lat) * Math.tan(declination) - Math.sin(6 * Math.PI / 180) / (Math.cos(lat) * Math.cos(declination)));
  const civilTwilightMorning = new Date(solarNoon.getTime() - (civilTwilightAngle * 12 / Math.PI * 60 * 60 * 1000));
  const civilTwilightEvening = new Date(solarNoon.getTime() + (civilTwilightAngle * 12 / Math.PI * 60 * 60 * 1000));
  
  // Golden hour (6 degrees above horizon)
  const goldenHourMorning = new Date(sunrise.getTime() + (60 * 60 * 1000)); // 1 hour after sunrise
  const goldenHourEvening = new Date(sunset.getTime() - (60 * 60 * 1000)); // 1 hour before sunset
  
  return {
    sunrise,
    sunset,
    solarNoon,
    civilTwilightMorning,
    civilTwilightEvening,
    goldenHourMorning,
    goldenHourEvening,
    dayLength: sunset.getTime() - sunrise.getTime()
  };
}

export function getSafeGazingWindows(sunTimes: SunTimes): SafeGazingWindows {
  // Safe gazing is first 60 minutes after sunrise and last 60 minutes before sunset
  const morningStart = sunTimes.sunrise;
  const morningEnd = new Date(sunTimes.sunrise.getTime() + (60 * 60 * 1000)); // 1 hour after sunrise
  
  const eveningStart = new Date(sunTimes.sunset.getTime() - (60 * 60 * 1000)); // 1 hour before sunset  
  const eveningEnd = sunTimes.sunset;
  
  return {
    morning: {
      start: morningStart,
      end: morningEnd,
      duration: 60
    },
    evening: {
      start: eveningStart,
      end: eveningEnd,
      duration: 60
    }
  };
}

export function isCurrentlyInSafeWindow(safeWindows: SafeGazingWindows): { safe: boolean; window: 'morning' | 'evening' | null } {
  const now = new Date();
  const currentTime = now.getTime();
  
  if (currentTime >= safeWindows.morning.start.getTime() && currentTime <= safeWindows.morning.end.getTime()) {
    return { safe: true, window: 'morning' };
  }
  
  if (currentTime >= safeWindows.evening.start.getTime() && currentTime <= safeWindows.evening.end.getTime()) {
    return { safe: true, window: 'evening' };
  }
  
  return { safe: false, window: null };
}

export function getNextSafeWindow(safeWindows: SafeGazingWindows): { window: 'morning' | 'evening'; start: Date; timeUntil: number } {
  const now = new Date();
  const currentTime = now.getTime();
  
  // Check if morning window is coming up today
  if (currentTime < safeWindows.morning.start.getTime()) {
    return {
      window: 'morning',
      start: safeWindows.morning.start,
      timeUntil: safeWindows.morning.start.getTime() - currentTime
    };
  }
  
  // Check if evening window is coming up today
  if (currentTime < safeWindows.evening.start.getTime()) {
    return {
      window: 'evening', 
      start: safeWindows.evening.start,
      timeUntil: safeWindows.evening.start.getTime() - currentTime
    };
  }
  
  // Next window is tomorrow morning
  const tomorrow = new Date(now.getTime() + (24 * 60 * 60 * 1000));
  const tomorrowSunTimes = calculateSunTimes(0, 0, tomorrow); // Will need actual location
  const tomorrowWindows = getSafeGazingWindows(tomorrowSunTimes);
  
  return {
    window: 'morning',
    start: tomorrowWindows.morning.start,
    timeUntil: tomorrowWindows.morning.start.getTime() - currentTime
  };
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
}

export function formatDuration(milliseconds: number): string {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours === 0) {
    return `${minutes}m`;
  }
  return `${hours}h ${minutes}m`;
}

// Get timezone-aware sun data
export function getSunTimesForLocation(latitude: number, longitude: number, date: Date = new Date()): {
  sunTimes: SunTimes;
  safeWindows: SafeGazingWindows;
  currentStatus: { safe: boolean; window: 'morning' | 'evening' | null };
  nextWindow: { window: 'morning' | 'evening'; start: Date; timeUntil: number };
} {
  const sunTimes = calculateSunTimes(latitude, longitude, date);
  const safeWindows = getSafeGazingWindows(sunTimes);
  const currentStatus = isCurrentlyInSafeWindow(safeWindows);
  const nextWindow = getNextSafeWindow(safeWindows);
  
  return {
    sunTimes,
    safeWindows,
    currentStatus,
    nextWindow
  };
}

// Cache and update sun data based on location
export class SunTimesManager {
  private cachedData: any = null;
  private cachedDate: string = '';
  private cachedLocation: { lat: number; lng: number } | null = null;
  
  getSunData(latitude: number, longitude: number, forceRefresh = false): {
    sunTimes: SunTimes;
    safeWindows: SafeGazingWindows;
    currentStatus: { safe: boolean; window: 'morning' | 'evening' | null };
    nextWindow: { window: 'morning' | 'evening'; start: Date; timeUntil: number };
  } {
    const today = new Date().toDateString();
    const currentLocation = { lat: latitude, lng: longitude };
    
    // Check if we need to recalculate
    const locationChanged = !this.cachedLocation || 
      this.cachedLocation.lat !== latitude || 
      this.cachedLocation.lng !== longitude;
    const dateChanged = this.cachedDate !== today;
    
    if (forceRefresh || !this.cachedData || locationChanged || dateChanged) {
      this.cachedData = getSunTimesForLocation(latitude, longitude);
      this.cachedDate = today;
      this.cachedLocation = currentLocation;
    }
    
    return this.cachedData;
  }
  
  // Get cached data if available
  getCachedData() {
    return this.cachedData;
  }
  
  // Clear cache (useful when timezone changes)
  clearCache() {
    this.cachedData = null;
    this.cachedDate = '';
    this.cachedLocation = null;
  }
}

// Singleton instance
export const sunTimesManager = new SunTimesManager();