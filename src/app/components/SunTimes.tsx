"use client";

import React, { useState, useEffect } from "react";
import { Sunrise, Sunset, Sun, MapPin, Clock, AlertTriangle } from "lucide-react";
import { getStoredLocation } from "../lib/consent";
import { sunTimesManager, formatTime, formatDuration } from "../lib/sunTimes";

export function SunTimes() {
  const [sunData, setSunData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    const loadSunData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get stored location
        const storedLocation = getStoredLocation();
        if (!storedLocation) {
          setError('Location not available. Please enable location access in settings.');
          setLoading(false);
          return;
        }
        
        setLocation({ 
          latitude: storedLocation.latitude, 
          longitude: storedLocation.longitude 
        });
        
        // Get sun times for current location
        const data = sunTimesManager.getSunData(
          storedLocation.latitude, 
          storedLocation.longitude
        );
        
        setSunData(data);
      } catch (err) {
        console.error('Error loading sun data:', err);
        setError('Failed to calculate sun times');
      } finally {
        setLoading(false);
      }
    };
    
    loadSunData();
    
    // Update every minute to keep current status accurate
    const interval = setInterval(loadSunData, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl text-white font-light mb-2 drop-shadow-lg">
            Loading Sun Times...
          </h2>
        </div>
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !sunData) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl text-white font-light mb-2 drop-shadow-lg">
            Sun Times
          </h2>
        </div>
        <div className="bg-red-500/20 backdrop-blur-md border border-red-400/30 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 text-red-200">
            <AlertTriangle className="w-5 h-5" />
            <p className="text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const { sunTimes, safeWindows, currentStatus, nextWindow } = sunData;
  
  const timeCards = [
    {
      title: "Morning Window",
      time: formatTime(safeWindows.morning.start),
      endTime: formatTime(safeWindows.morning.end),
      icon: Sunrise,
      description: "Safe gazing starts",
      color: "from-orange-400 to-yellow-400",
      isSafe: currentStatus.safe && currentStatus.window === 'morning'
    },
    {
      title: "Solar Noon",
      time: formatTime(sunTimes.solarNoon),
      icon: Sun,
      description: "Avoid gazing - too intense",
      color: "from-red-400 to-red-600",
      isSafe: false
    },
    {
      title: "Evening Window",
      time: formatTime(safeWindows.evening.start),
      endTime: formatTime(safeWindows.evening.end),
      icon: Sunset,
      description: "Safe gazing starts",
      color: "from-orange-500 to-red-500",
      isSafe: currentStatus.safe && currentStatus.window === 'evening'
    },
    {
      title: "Sunset",
      time: formatTime(sunTimes.sunset),
      icon: Sunset,
      description: "Safe gazing ends",
      color: "from-red-500 to-purple-600",
      isSafe: false
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl text-white font-light mb-2 drop-shadow-lg">
          Today's Sun Times
        </h2>
        <p className="text-white text-sm">
          Safe gazing windows for your location
        </p>
        {location && (
          <div className="flex items-center justify-center gap-2 mt-2 text-white text-xs">
            <MapPin className="w-3 h-3" />
            <span>{location.latitude.toFixed(2)}, {location.longitude.toFixed(2)}</span>
          </div>
        )}
      </div>
      
      {/* Current Status */}
      <div className={`backdrop-blur-md border rounded-2xl p-4 shadow-lg ${
        currentStatus.safe 
          ? 'bg-green-500/20 border-green-400/30' 
          : 'bg-white/20 border-white/30'
      }`}>
        <div className="flex items-center gap-3">
          {currentStatus.safe ? (
            <>
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-green-200 font-medium text-sm">
                Safe to gaze now ({currentStatus.window} window)
              </span>
            </>
          ) : (
            <>
              <Clock className="w-4 h-4 text-white" />
              <span className="text-white text-sm">
                Next safe window: {formatTime(nextWindow.start)} ({nextWindow.window})
              </span>
            </>
          )}
        </div>
      </div>

      {/* Day info card */}
      <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 shadow-lg">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl text-white font-semibold drop-shadow-md">
              {formatDuration(sunTimes.dayLength)}
            </div>
            <div className="text-white text-sm">Day Length</div>
          </div>
          <div>
            <div className="text-2xl text-white font-semibold drop-shadow-md">
              {safeWindows.morning.duration + safeWindows.evening.duration}m
            </div>
            <div className="text-white text-sm">Safe Windows</div>
          </div>
        </div>
      </div>

      {/* Time cards */}
      <div className="space-y-4">
        {timeCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className={`backdrop-blur-md border rounded-2xl p-5 shadow-lg ${
                card.isSafe 
                  ? 'bg-green-500/20 border-green-400/30' 
                  : 'bg-white/20 border-white/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color} shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                    {card.isSafe && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg text-white font-medium drop-shadow-md">
                      {card.title}
                      {card.isSafe && <span className="ml-2 text-green-200 text-sm">● ACTIVE</span>}
                    </h3>
                    <p className="text-white text-sm">
                      {card.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl text-white font-light drop-shadow-md">
                    {card.time}
                  </div>
                  {card.endTime && (
                    <div className="text-sm text-white">
                      - {card.endTime}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Safety note */}
      <div className="bg-amber-500/20 backdrop-blur-md border border-amber-400/30 rounded-2xl p-5 shadow-lg">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-200" />
            <span className="text-amber-200 font-medium text-sm">Safety Guidelines</span>
          </div>
          <p className="text-white text-sm leading-relaxed">
            Only practice during highlighted safe windows when the sun is low on the horizon. 
            Stop immediately if you feel any discomfort.
          </p>
        </div>
      </div>
    </div>
  );
}