"use client";

import React from 'react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Sun, Moon, Clock, MapPin, Cloud, Settings, Bell, BellOff, X } from 'lucide-react';
import { useSolarWindowNotifications } from '../hooks/useSolarWindowNotifications';

interface SolarWindowSettingsProps {
  onClose: () => void;
}

export function SolarWindowSettings({ onClose }: SolarWindowSettingsProps) {
  const {
    preferences,
    updatePreferences,
    toggleNotifications,
    setReminderTime,
    toggleMorningReminder,
    toggleEveningReminder,
    getCacheStats,
    clearCaches
  } = useSolarWindowNotifications();

  const cacheStats = getCacheStats();

  const handleReminderTimeChange = (value: number[]) => {
    setReminderTime(value[0]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-y-auto">
      <div className="min-h-screen px-6 pt-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center border border-yellow-400/30">
            <Settings className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <h2 className="text-title-md text-white font-semibold">
              Solar Window Settings
            </h2>
            <p className="text-caption text-white/60">
              Manage your solar practice reminders
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

      {/* Main Settings */}
      <div className="space-y-6">
        {/* Notifications Toggle */}
        <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center border border-blue-400/30">
                {preferences.enabled ? (
                  <Bell className="w-5 h-5 text-blue-400" />
                ) : (
                  <BellOff className="w-5 h-5 text-gray-400" />
                )}
              </div>
              <div>
                <h3 className="text-title-sm text-white font-semibold">
                  Solar Window Notifications
                </h3>
                <p className="text-caption text-white/60">
                  Get notified when optimal gazing conditions arrive
                </p>
              </div>
            </div>
            <Switch
              checked={preferences.enabled}
              onCheckedChange={toggleNotifications}
            />
          </div>
        </div>

        {/* Reminder Times */}
        {preferences.enabled && (
          <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center border border-yellow-400/30">
                <Clock className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-title-sm text-white font-semibold">
                  Reminder Timing
                </h3>
                <p className="text-caption text-white/60">
                  How early to notify you before sunrise/sunset
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-body-sm text-white font-medium">
                    Reminder Time
                  </span>
                  <span className="text-body-sm text-white/80">
                    {preferences.reminderTime} minutes
                  </span>
                </div>
                <Slider
                  value={[preferences.reminderTime]}
                  onValueChange={handleReminderTimeChange}
                  max={60}
                  min={5}
                  step={5}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}

        {/* Reminder Types */}
        {preferences.enabled && (
          <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-400/30">
                <Sun className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-title-sm text-white font-semibold">
                  Reminder Types
                </h3>
                <p className="text-caption text-white/60">
                  Choose which solar windows to be reminded about
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {/* Morning Reminder */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sun className="w-5 h-5 text-yellow-400" />
                  <div>
                    <p className="text-body-sm text-white font-medium">
                      Morning Sunrise
                    </p>
                    <p className="text-caption text-white/60">
                      Start your day with solar energy
                    </p>
                  </div>
                </div>
                <Switch
                  checked={preferences.morningReminder}
                  onCheckedChange={toggleMorningReminder}
                />
              </div>

              {/* Evening Reminder */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Moon className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-body-sm text-white font-medium">
                      Evening Sunset
                    </p>
                    <p className="text-caption text-white/60">
                      Wind down with gentle solar practice
                    </p>
                  </div>
                </div>
                <Switch
                  checked={preferences.eveningReminder}
                  onCheckedChange={toggleEveningReminder}
                />
              </div>
            </div>
          </div>
        )}

        {/* Location Info */}
        <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center border border-green-400/30">
              <MapPin className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h3 className="text-title-sm text-white font-semibold">
                Location & Cache
              </h3>
              <p className="text-caption text-white/60">
                Weather data and solar times for your location
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {cacheStats.userLocation && cacheStats.userLocation.lat && cacheStats.userLocation.lon ? (
              <div className="text-body-sm text-white/80">
                <p>📍 {cacheStats.userLocation.city || 'Unknown'}, {cacheStats.userLocation.country || 'Unknown'}</p>
                <p className="text-caption text-white/60">
                  Lat: {cacheStats.userLocation.lat.toFixed(4)}, 
                  Lon: {cacheStats.userLocation.lon.toFixed(4)}
                </p>
              </div>
            ) : (
              <p className="text-body-sm text-white/60">
                Location not available
              </p>
            )}
            <div className="text-caption text-white/60">
              <p>Weather cache: {cacheStats.weatherCacheSize} entries</p>
              <p>Solar times cache: {cacheStats.solarTimesCacheSize} entries</p>
            </div>
            <Button
              onClick={clearCaches}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-xl rounded-2xl px-4 py-2 transition-all duration-300 text-caption"
            >
              Clear Caches
            </Button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
