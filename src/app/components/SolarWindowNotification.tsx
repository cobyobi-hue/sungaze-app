"use client";

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { X, Sun, Cloud, Droplets, Sparkles, Clock, MapPin } from 'lucide-react';
import { weatherService, type WeatherData, type SolarTimes } from '../lib/weatherService';

interface SolarWindowNotificationProps {
  onClose: () => void;
  onStartRitual: (type: 'solar' | 'cloud') => void;
}

export function SolarWindowNotification({ onClose, onStartRitual }: SolarWindowNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [solarTimes, setSolarTimes] = useState<SolarTimes | null>(null);
  const [timeUntil, setTimeUntil] = useState(0);
  const [isSunrise, setIsSunrise] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkSolarWindow();
    
    // Check every 5 minutes
    const interval = setInterval(checkSolarWindow, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Debug mode - add a manual trigger for testing
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Press 'S' key to manually trigger solar window for testing
      if (event.key === 's' || event.key === 'S') {
        console.log('Manual solar window trigger for testing');
        setIsVisible(true);
        setWeather({
          isClear: false,
          condition: 'cloudy',
          temperature: 20,
          humidity: 50,
          description: 'Test mode - Cloud gazing recommended',
          cachedAt: Date.now()
        });
        setSolarTimes({
          sunrise: new Date(),
          sunset: new Date(),
          cachedAt: Date.now()
        });
        setTimeUntil(8);
        setIsSunrise(false);
        setIsLoading(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const checkSolarWindow = async () => {
    try {
      const result = await weatherService.shouldTriggerSolarWindow();
      
      if (result.shouldTrigger) {
        setWeather(result.weather);
        setSolarTimes(result.solarTimes);
        setTimeUntil(result.timeUntil);
        setIsSunrise(result.isSunrise);
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    } catch (error) {
      console.error('Failed to check solar window:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartRitual = () => {
    if (weather?.isClear) {
      onStartRitual('solar');
    } else {
      onStartRitual('cloud');
    }
    onClose();
  };

  const getWeatherIcon = () => {
    if (!weather) return <Sun className="w-8 h-8" />;
    
    switch (weather.condition) {
      case 'clear':
        return <Sun className="w-8 h-8 text-yellow-400" />;
      case 'cloudy':
        return <Cloud className="w-8 h-8 text-blue-400" />;
      case 'rainy':
        return <Droplets className="w-8 h-8 text-blue-500" />;
      default:
        return <Sun className="w-8 h-8 text-yellow-400" />;
    }
  };

  const getRitualType = () => {
    if (!weather) return 'Solar';
    return weather.isClear ? 'Solar' : 'Cloud';
  };

  const getRitualDescription = () => {
    if (!weather) return 'Perfect conditions for solar gazing';
    
    if (weather.isClear) {
      return 'Clear skies - perfect for direct solar gazing';
    } else {
      return 'Cloudy conditions - ideal for gentle cloud gazing';
    }
  };

  const formatTimeUntil = (minutes: number) => {
    if (minutes < 1) return 'Now';
    if (minutes < 60) return `${Math.round(minutes)} min`;
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}h ${mins}m`;
  };

  if (!isVisible || isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-3xl p-8 max-w-sm w-full border border-blue-400/20 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center border border-yellow-400/30">
              {getWeatherIcon()}
            </div>
            <div>
              <h2 className="text-title-sm text-white font-semibold">
                Solar Window
              </h2>
              <p className="text-caption text-white/60">
                {isSunrise ? 'Sunrise' : 'Sunset'} • {formatTimeUntil(timeUntil)}
              </p>
            </div>
          </div>
          <Button
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-xl rounded-2xl p-2 transition-all duration-300"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Weather Info */}
        {weather && (
          <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-body-sm text-white font-medium">
                  Current Conditions
                </span>
              </div>
              <div className="text-body-sm text-white/80">
                {weather.temperature}°C
              </div>
            </div>
            <div className="text-caption text-white/70 capitalize">
              {weather.description} • {weather.humidity}% humidity
            </div>
          </div>
        )}

        {/* Ritual Recommendation */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center mx-auto mb-4 border border-yellow-400/30">
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </div>
          <h3 className="text-title-md text-white font-semibold mb-2">
            {getRitualType()} Ritual Recommended
          </h3>
          <p className="text-body-sm text-white/80 leading-relaxed">
            {getRitualDescription()}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={onClose}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-xl rounded-2xl py-3 transition-all duration-300 font-medium"
          >
            Maybe Later
          </Button>
          <Button
            onClick={handleStartRitual}
            className="flex-1 bg-gradient-to-r from-yellow-500/30 to-orange-500/30 hover:from-yellow-500/40 hover:to-orange-500/40 text-white border border-yellow-400/30 backdrop-blur-xl rounded-2xl py-3 transition-all duration-300 font-medium shadow-[0_4px_20px_rgba(255,193,7,0.2)]"
          >
            <Clock className="w-4 h-4 mr-2" />
            Begin Ritual
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center mt-4">
          <p className="text-caption text-white/50">
            {isSunrise ? 'Morning' : 'Evening'} practice • {getRitualType()} mode
          </p>
        </div>
      </div>
    </div>
  );
}

