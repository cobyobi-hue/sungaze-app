// Consent and permission management utilities

export interface ConsentData {
  consentGiven: boolean;
  timestamp: number;
  version: string;
}

export interface PermissionData {
  location: boolean;
  notifications: boolean;
  timestamp: number;
}

export interface LocationData {
  latitude: number;
  longitude: number;
  timestamp: number;
}

const CONSENT_KEY = 'sungaze_consent';
const PERMISSIONS_KEY = 'sungaze_permissions';
const LOCATION_KEY = 'sungaze_location';
const CONSENT_VERSION = '1.0.0';

// Consent management
export function getConsent(): ConsentData | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return null;
    
    if (stored === 'true') {
      // Legacy format - convert to new format
      return {
        consentGiven: true,
        timestamp: Date.now(),
        version: CONSENT_VERSION
      };
    }
    
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error reading consent:', error);
    return null;
  }
}

export function setConsent(consentGiven: boolean): void {
  if (typeof window === 'undefined') return;
  
  try {
    const consentData: ConsentData = {
      consentGiven,
      timestamp: Date.now(),
      version: CONSENT_VERSION
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consentData));
  } catch (error) {
    console.error('Error storing consent:', error);
  }
}

export function hasValidConsent(): boolean {
  if (typeof window === 'undefined') return false; // SSR safe
  
  try {
    const onboardingData = localStorage.getItem('solar_oracle_onboarding');
    const consent = getConsent();
    
    // User has completed onboarding or explicitly given consent
    return (onboardingData !== null) || (consent?.consentGiven === true);
  } catch (error) {
    console.error('Error checking consent:', error);
    return false;
  }
}

// Permission management
export function getPermissions(): PermissionData | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(PERMISSIONS_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error reading permissions:', error);
    return null;
  }
}

export function setPermissions(permissions: Omit<PermissionData, 'timestamp'>): void {
  if (typeof window === 'undefined') return;
  
  try {
    const permissionData: PermissionData = {
      ...permissions,
      timestamp: Date.now()
    };
    localStorage.setItem(PERMISSIONS_KEY, JSON.stringify(permissionData));
  } catch (error) {
    console.error('Error storing permissions:', error);
  }
}

// Location management
export function getStoredLocation(): LocationData | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(LOCATION_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error reading location:', error);
    return null;
  }
}

export function setStoredLocation(location: LocationData): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(LOCATION_KEY, JSON.stringify(location));
  } catch (error) {
    console.error('Error storing location:', error);
  }
}

export function isLocationStale(maxAgeHours: number = 24): boolean {
  const location = getStoredLocation();
  if (!location) return true;
  
  const ageHours = (Date.now() - location.timestamp) / (1000 * 60 * 60);
  return ageHours > maxAgeHours;
}

// Permission checking utilities
export async function checkLocationPermission(): Promise<boolean> {
  try {
    if (!navigator.geolocation) return false;
    
    // Try to get current position with short timeout
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        () => resolve(true),
        () => resolve(false),
        { enableHighAccuracy: false, timeout: 1000, maximumAge: 300000 }
      );
    });
  } catch (error) {
    console.error('Error checking location permission:', error);
    return false;
  }
}

export function checkNotificationPermission(): boolean {
  try {
    return 'Notification' in window && Notification.permission === 'granted';
  } catch (error) {
    console.error('Error checking notification permission:', error);
    return false;
  }
}

// Request permissions
export async function requestLocationPermission(): Promise<LocationData | null> {
  try {
    if (!navigator.geolocation) {
      throw new Error('Geolocation not supported');
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationData: LocationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: Date.now()
          };
          setStoredLocation(locationData);
          resolve(locationData);
        },
        (error) => {
          console.error('Location permission error:', error);
          reject(error);
        },
        { 
          enableHighAccuracy: true, 
          timeout: 10000, 
          maximumAge: 300000 
        }
      );
    });
  } catch (error) {
    console.error('Error requesting location permission:', error);
    return null;
  }
}

export async function requestNotificationPermission(): Promise<boolean> {
  try {
    if (!('Notification' in window)) {
      console.warn('Notifications not supported');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
}

// Clear all stored data (for testing/reset)
export function clearAllData(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(CONSENT_KEY);
    localStorage.removeItem(PERMISSIONS_KEY);
    localStorage.removeItem(LOCATION_KEY);
    localStorage.removeItem('solar_oracle_onboarding');
  } catch (error) {
    console.error('Error clearing data:', error);
  }
}

// Function to reset onboarding for testing
export function resetOnboarding(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(CONSENT_KEY);
    localStorage.removeItem('solar_oracle_onboarding');
    window.location.reload();
  } catch (error) {
    console.error('Error resetting onboarding:', error);
  }
}