// Weather Service for Solar Window Notifications
// Handles sunrise/sunset times and weather conditions with cost optimization

export interface WeatherData {
  isClear: boolean;
  condition: 'clear' | 'cloudy' | 'rainy';
  temperature: number;
  humidity: number;
  description: string;
  cachedAt: number;
}

export interface SolarTimes {
  sunrise: Date;
  sunset: Date;
  cachedAt: number;
}

export interface LocationData {
  lat: number;
  lon: number;
  city: string;
  country: string;
}

// Cache duration constants
const WEATHER_CACHE_DURATION = 30 * 60 * 1000; // 30 minutes
const SOLAR_TIMES_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

class WeatherService {
  private weatherCache = new Map<string, WeatherData>();
  private solarTimesCache = new Map<string, SolarTimes>();
  private userLocation: LocationData | null = null;

  // Initialize user location
  async initializeLocation(): Promise<LocationData | null> {
    if (this.userLocation) return this.userLocation;

    try {
      const position = await this.getCurrentPosition();
      const location = await this.reverseGeocode(position.coords.latitude, position.coords.longitude);
      this.userLocation = location;
      return location;
    } catch (error) {
      console.error('Failed to get user location:', error);
      return null;
    }
  }

  // Get current position using Geolocation API
  private getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        resolve,
        reject,
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  }

  // Reverse geocoding to get city name
  private async reverseGeocode(lat: number, lon: number): Promise<LocationData> {
    try {
      // Using OpenWeatherMap Geocoding API
      const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
      
      if (!apiKey || apiKey === 'your_openweather_api_key_here') {
        console.warn('OpenWeatherMap API key not configured, using fallback location');
        return {
          lat,
          lon,
          city: 'Your Location',
          country: 'Unknown'
        };
      }

      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`
      );
      
      if (!response.ok) {
        console.warn(`Geocoding API failed with status ${response.status}, using fallback`);
        return {
          lat,
          lon,
          city: 'Your Location',
          country: 'Unknown'
        };
      }

      const data = await response.json();
      
      if (!data || !data[0]) {
        console.warn('No location data returned from geocoding API');
        return {
          lat,
          lon,
          city: 'Your Location',
          country: 'Unknown'
        };
      }

      const location = data[0];
      return {
        lat,
        lon,
        city: location.name || 'Your Location',
        country: location.country || 'Unknown'
      };
    } catch (error) {
      console.warn('Reverse geocoding failed, using fallback:', error);
      return {
        lat,
        lon,
        city: 'Your Location',
        country: 'Unknown'
      };
    }
  }

  // Get sunrise/sunset times for a location
  async getSolarTimes(location?: LocationData): Promise<SolarTimes | null> {
    const loc = location || this.userLocation;
    if (!loc) return null;

    const cacheKey = `${loc.lat},${loc.lon}`;
    const cached = this.solarTimesCache.get(cacheKey);

    // Check if cache is still valid (24 hours)
    if (cached && Date.now() - cached.cachedAt < SOLAR_TIMES_CACHE_DURATION) {
      return cached;
    }

    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    
    // Try OpenWeatherMap first if API key is available
    if (apiKey && apiKey !== 'your_openweather_api_key_here') {
      try {
        // Use OpenWeatherMap One Call API for solar times
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${loc.lat}&lon=${loc.lon}&exclude=minutely,hourly,daily&appid=${apiKey}`
        );

        if (response.ok) {
          const data = await response.json();
          const solarTimes: SolarTimes = {
            sunrise: new Date(data.current.sunrise * 1000),
            sunset: new Date(data.current.sunset * 1000),
            cachedAt: Date.now()
          };

          this.solarTimesCache.set(cacheKey, solarTimes);
          return solarTimes;
        }
      } catch (error) {
        console.warn('OpenWeatherMap solar times failed, trying fallback:', error);
      }
    }
    
    // Fallback to sunrise-sunset.org API
    try {
      const fallbackResponse = await fetch(
        `https://api.sunrise-sunset.org/json?lat=${loc.lat}&lng=${loc.lon}&formatted=0`
      );
      
      if (fallbackResponse.ok) {
        const fallbackData = await fallbackResponse.json();
        const solarTimes: SolarTimes = {
          sunrise: new Date(fallbackData.results.sunrise),
          sunset: new Date(fallbackData.results.sunset),
          cachedAt: Date.now()
        };

        this.solarTimesCache.set(cacheKey, solarTimes);
        return solarTimes;
      }
    } catch (fallbackError) {
      console.warn('Fallback solar times API also failed:', fallbackError);
    }

    return null;
  }

  // Get current weather conditions
  async getWeatherConditions(location?: LocationData): Promise<WeatherData | null> {
    const loc = location || this.userLocation;
    if (!loc) return null;

    const cacheKey = `${loc.lat},${loc.lon}`;
    const cached = this.weatherCache.get(cacheKey);

    // Check if cache is still valid (30 minutes)
    if (cached && Date.now() - cached.cachedAt < WEATHER_CACHE_DURATION) {
      return cached;
    }

    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    
    // Try OpenWeatherMap if API key is available
    if (apiKey && apiKey !== 'your_openweather_api_key_here') {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lon}&appid=${apiKey}&units=metric`
        );

        if (response.ok) {
          const data = await response.json();
          const weatherData: WeatherData = {
            isClear: this.isClearWeather(data.weather[0].main, data.clouds.all),
            condition: this.getWeatherCondition(data.weather[0].main, data.clouds.all),
            temperature: Math.round(data.main.temp),
            humidity: data.main.humidity,
            description: data.weather[0].description,
            cachedAt: Date.now()
          };

          this.weatherCache.set(cacheKey, weatherData);
          return weatherData;
        }
      } catch (error) {
        console.warn('OpenWeatherMap weather API failed, using fallback:', error);
      }
    }
    
    // Fallback to cloudy conditions (safe for cloud gazing)
    const fallbackWeather: WeatherData = {
      isClear: false,
      condition: 'cloudy',
      temperature: 20,
      humidity: 50,
      description: 'Weather data unavailable - using cloud gazing mode',
      cachedAt: Date.now()
    };

    this.weatherCache.set(cacheKey, fallbackWeather);
    return fallbackWeather;
  }

  // Determine if weather is clear for solar gazing
  private isClearWeather(weatherMain: string, cloudCover: number): boolean {
    const clearConditions = ['Clear', 'Sunny'];
    const maxCloudCover = 30; // Allow up to 30% cloud cover

    return clearConditions.includes(weatherMain) && cloudCover <= maxCloudCover;
  }

  // Get weather condition category
  private getWeatherCondition(weatherMain: string, cloudCover: number): 'clear' | 'cloudy' | 'rainy' {
    if (this.isClearWeather(weatherMain, cloudCover)) {
      return 'clear';
    }

    const rainyConditions = ['Rain', 'Drizzle', 'Thunderstorm', 'Snow'];
    if (rainyConditions.includes(weatherMain)) {
      return 'rainy';
    }

    return 'cloudy';
  }

  // Check if we should trigger a solar window notification
  async shouldTriggerSolarWindow(): Promise<{
    shouldTrigger: boolean;
    timeUntil: number; // minutes until window
    isSunrise: boolean;
    weather: WeatherData | null;
    solarTimes: SolarTimes | null;
  }> {
    const location = await this.initializeLocation();
    if (!location) {
      return {
        shouldTrigger: false,
        timeUntil: 0,
        isSunrise: false,
        weather: null,
        solarTimes: null
      };
    }

    const [weather, solarTimes] = await Promise.all([
      this.getWeatherConditions(location),
      this.getSolarTimes(location)
    ]);

    if (!solarTimes) {
      return {
        shouldTrigger: false,
        timeUntil: 0,
        isSunrise: false,
        weather,
        solarTimes
      };
    }

    const now = new Date();
    const sunriseTime = solarTimes.sunrise;
    const sunsetTime = solarTimes.sunset;

    // Define safe gazing windows (30 minutes before and after sunrise/sunset)
    const sunriseStart = new Date(sunriseTime.getTime() - 30 * 60 * 1000);
    const sunriseEnd = new Date(sunriseTime.getTime() + 30 * 60 * 1000);
    const sunsetStart = new Date(sunsetTime.getTime() - 30 * 60 * 1000);
    const sunsetEnd = new Date(sunsetTime.getTime() + 30 * 60 * 1000);

    // Check if we're in a safe gazing window
    const isInSunriseWindow = now >= sunriseStart && now <= sunriseEnd;
    const isInSunsetWindow = now >= sunsetStart && now <= sunsetEnd;

    if (isInSunriseWindow) {
      const timeUntilSunrise = (sunriseTime.getTime() - now.getTime()) / (1000 * 60);
      return {
        shouldTrigger: true,
        timeUntil: Math.max(0, timeUntilSunrise),
        isSunrise: true,
        weather,
        solarTimes
      };
    }

    if (isInSunsetWindow) {
      const timeUntilSunset = (sunsetTime.getTime() - now.getTime()) / (1000 * 60);
      return {
        shouldTrigger: true,
        timeUntil: Math.max(0, timeUntilSunset),
        isSunrise: false,
        weather,
        solarTimes
      };
    }

    return {
      shouldTrigger: false,
      timeUntil: 0,
      isSunrise: false,
      weather,
      solarTimes
    };
  }

  // Clear caches (useful for testing)
  clearCaches(): void {
    this.weatherCache.clear();
    this.solarTimesCache.clear();
  }

  // Get cache statistics
  getCacheStats(): {
    weatherCacheSize: number;
    solarTimesCacheSize: number;
    userLocation: LocationData | null;
  } {
    return {
      weatherCacheSize: this.weatherCache.size,
      solarTimesCacheSize: this.solarTimesCache.size,
      userLocation: this.userLocation
    };
  }
}

// Export singleton instance
export const weatherService = new WeatherService();
