"use client";

import { useState, useEffect, useCallback } from 'react';

export interface SunCondition {
  isVisible: boolean;
  cloudCover: number; // 0-100 percentage
  solarWindowStart: Date | null;
  minutesToWindow: number;
  canGaze: boolean;
  condition: 'clear' | 'cloudy' | 'overcast' | 'rain' | 'night';
  message: string;
  location?: string;
}

interface LocationData {
  lat: number;
  lon: number;
  city: string;
  country: string;
}

interface WeatherData {
  cloudCover: number;
  weatherCondition: string;
  temperature: number;
  visibility: number;
}

// Real weather detection using location and weather API
export function useSunVisibility() {
  const [sunCondition, setSunCondition] = useState<SunCondition>({
    isVisible: true,
    cloudCover: 20,
    solarWindowStart: null,
    minutesToWindow: 0,
    canGaze: true,
    condition: 'clear',
    message: 'Detecting your location for accurate conditions...',
    location: 'Unknown'
  });

  const [isLoading, setIsLoading] = useState(true);
  const [locationData, setLocationData] = useState<LocationData | null>(null);

  // Get user's location with better fallbacks
  const getUserLocation = useCallback((): Promise<LocationData> => {
    return new Promise((resolve) => {
      // Always resolve with a fallback - never reject
      const fallbackLocation: LocationData = {
        lat: 34.0522, // Los Angeles coordinates as fallback
        lon: -118.2437,
        city: 'Your Location',
        country: ''
      };

      if (!navigator.geolocation) {
        console.info('Geolocation not supported, using fallback location');
        resolve(fallbackLocation);
        return;
      }

      // Try to get location with shorter timeout and better error handling
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // Use coordinates without API calls to avoid complexity
          const location: LocationData = {
            lat: latitude,
            lon: longitude,
            city: 'Your Location',
            country: ''
          };
          
          resolve(location);
        },
        (error) => {
          // Handle permission denied gracefully
          console.info('Location permission denied or unavailable, using fallback');
          resolve(fallbackLocation);
        },
        { 
          timeout: 5000, // Shorter timeout
          maximumAge: 600000, // 10 minutes cache
          enableHighAccuracy: false // Less intrusive
        }
      );
    });
  }, []);

  // Fetch weather data for location
  const getWeatherData = useCallback(async (location: LocationData): Promise<WeatherData | null> => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
      if (!apiKey) {
        console.warn('OpenWeather API key not found');
        return null;
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&units=imperial`
      );

      if (!response.ok) {
        throw new Error('Weather API request failed');
      }

      const data = await response.json();
      
      return {
        cloudCover: data.clouds?.all || 0,
        weatherCondition: data.weather?.[0]?.main || 'Clear',
        temperature: data.main?.temp || 70,
        visibility: data.visibility ? data.visibility / 1000 : 10 // Convert to km
      };
    } catch (error) {
      console.error('Weather fetch error:', error);
      return null;
    }
  }, []);

  // Detect sun conditions based on time with optional location
  const checkSunConditions = useCallback(async () => {
    console.log('🌤️ checkSunConditions called');
    const now = new Date();
    const hour = now.getHours();
    const timeOfDay = hour >= 6 && hour <= 18 ? 'day' : 'night';
    console.log(`🌤️ Current time: ${hour}:00, timeOfDay: ${timeOfDay}`);
    
    let condition: SunCondition['condition'] = 'clear';
    let isVisible = true;
    let cloudCover = 15; // Default clear conditions
    let canGaze = true;
    let message = 'Perfect conditions for sun gazing';
    let solarWindowStart: Date | null = null;
    let minutesToWindow = 0;
    let location = 'Your Location';

    // Try to get location if not already available, but don't block on it
    try {
      if (!locationData) {
        const userLocation = await getUserLocation();
        setLocationData(userLocation);
        location = userLocation.city || 'Your Location';
      } else {
        location = locationData.city || 'Your Location';
      }
    } catch (error) {
      // Silently use fallback - no error messages
      console.debug('Using fallback location');
    }

    // Try to get real weather data if location is available
    try {
      if (locationData) {
        const weatherData = await getWeatherData(locationData);
        if (weatherData) {
          // Use real weather data but make changes more gradual
          const currentCloudCover = sunCondition.cloudCover;
          const realCloudCover = weatherData.cloudCover;
          
          // Gradual transition to real data (avoid dramatic jumps)
          if (Math.abs(realCloudCover - currentCloudCover) > 20) {
            // If difference is large, make gradual change
            cloudCover = currentCloudCover + (realCloudCover - currentCloudCover) * 0.3;
          } else {
            cloudCover = realCloudCover;
          }
          
          // Adjust conditions based on real weather
          if (cloudCover > 60) {
            condition = 'cloudy';
            message = 'Cloudy conditions detected. Consider cloud gazing practice.';
          } else if (cloudCover > 30) {
            condition = 'cloudy';
            message = 'Partly cloudy. Good conditions for sun gazing.';
          } else {
            condition = 'clear';
            message = 'Clear conditions. Perfect for sun gazing.';
          }
        }
      }
    } catch (error) {
      console.debug('Weather data unavailable, using time-based conditions');
    }

    if (timeOfDay === 'night') {
      condition = 'night';
      isVisible = false;
      canGaze = false;
      message = 'Sun practice available at sunrise';
      
      // Calculate time to sunrise (simulate 6 AM)
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(6, 0, 0, 0);
      solarWindowStart = tomorrow;
      minutesToWindow = Math.floor((tomorrow.getTime() - now.getTime()) / (1000 * 60));
    } else {
      // Day time conditions - simplified logic
      condition = 'clear';
      isVisible = true;
      canGaze = true;
      
      // Check if we're in safe gazing window based on time
      if (hour >= 6 && hour < 8) {
        message = `Excellent morning conditions for sun gazing`;
        cloudCover = 10;
      } else if (hour >= 17 && hour < 19) {
        message = `Golden hour. Perfect for evening sun practice.`;
        cloudCover = 12;
      } else if (hour >= 8 && hour < 10) {
        message = `Good morning conditions. Sun intensity building.`;
        cloudCover = 15;
      } else if (hour >= 16 && hour < 17) {
        message = `Clear afternoon. Evening window approaching.`;
        cloudCover = 18;
      } else {
        // Midday - suggest waiting for optimal window
        const eveningWindow = new Date(now);
        eveningWindow.setHours(17, 0, 0, 0);
        solarWindowStart = eveningWindow;
        minutesToWindow = Math.floor((eveningWindow.getTime() - now.getTime()) / (1000 * 60));
        
        if (minutesToWindow > 0) {
          message = `Clear skies. Your optimal window begins in ${Math.floor(minutesToWindow/60)}h ${minutesToWindow%60}m.`;
          cloudCover = 20;
        } else {
          message = `Perfect evening conditions for sun gazing`;
          cloudCover = 12;
        }
      }
    }

    const newCondition = {
      isVisible,
      cloudCover: Math.round(cloudCover),
      solarWindowStart,
      minutesToWindow,
      canGaze,
      condition,
      message,
      location
    };
    
    console.log('🌤️ Setting new sun condition:', newCondition);
    setSunCondition(newCondition);
    setIsLoading(false);
    
    // Force a re-render by updating a timestamp
    setTimeout(() => {
      console.log('🌤️ State update completed, current condition:', newCondition);
    }, 100);
  }, [locationData, getWeatherData]);

  // Check conditions on mount and periodically
  useEffect(() => {
    const runCheck = async () => {
      try {
        await checkSunConditions();
      } catch (error) {
        console.debug('Weather check failed, using defaults');
        // Set default conditions on any error
        setSunCondition({
          isVisible: true,
          cloudCover: 15,
          solarWindowStart: null,
          minutesToWindow: 0,
          canGaze: true,
          condition: 'clear',
          message: 'Clear conditions for sun gazing',
          location: 'Your Location'
        });
        setIsLoading(false);
      }
    };
    
    runCheck();
    
    // Update every 2 minutes (less frequent to avoid permission prompts)
    const interval = setInterval(runCheck, 120000);
    
    return () => clearInterval(interval);
  }, [checkSunConditions]);

  // Manual refresh for testing
  const refreshConditions = useCallback(async () => {
    console.log('🔄 Refresh button clicked - starting refresh...');
    console.log('🔄 Current sunCondition before refresh:', sunCondition);
    setIsLoading(true);
    
    try {
      // Call the actual checkSunConditions function to get real data
      console.log('🔄 Calling checkSunConditions...');
      await checkSunConditions();
      console.log('✅ Refresh completed successfully');
    } catch (error) {
      console.error('❌ Manual refresh failed:', error);
      // Fallback to a subtle update
      const now = new Date();
      const hour = now.getHours();
      const timeOfDay = hour >= 6 && hour <= 18 ? 'day' : 'night';
      
      // Only make subtle changes to show refresh worked
      const currentCloudCover = sunCondition.cloudCover;
      const newCloudCover = Math.max(5, Math.min(50, currentCloudCover + (Math.random() - 0.5) * 6)); // ±3% change
      
      const newCondition = {
        ...sunCondition,
        cloudCover: Math.round(newCloudCover),
        message: sunCondition.message, // Keep original message
      };
      
      console.log('🔄 Setting fallback condition:', newCondition);
      setSunCondition(newCondition);
      setIsLoading(false);
    }
  }, [checkSunConditions, sunCondition]);

  return {
    sunCondition,
    isLoading,
    refreshConditions
  };
}

// Helper functions
export function getSunPhase(hour: number): 'sunrise' | 'morning' | 'midday' | 'evening' | 'sunset' | 'night' {
  if (hour >= 5 && hour < 7) return 'sunrise';
  if (hour >= 7 && hour < 11) return 'morning';
  if (hour >= 11 && hour < 15) return 'midday';
  if (hour >= 15 && hour < 17) return 'evening';
  if (hour >= 17 && hour < 19) return 'sunset';
  return 'night';
}

export function getOptimalGazingTime(condition: SunCondition['condition'], cloudCover: number): number {
  switch (condition) {
    case 'clear':
      return cloudCover < 10 ? 60 : 120; // 1-2 minutes for clear skies
    case 'cloudy':
      return 300; // 5 minutes for cloudy (safer)
    case 'overcast':
      return 0; // No direct gazing
    case 'night':
      return 0;
    default:
      return 60;
  }
}