"use client";

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Sun, Clock, Bell, CloudRain, Sunrise, Sunset } from 'lucide-react';
import { useSunVisibility, getSunPhase } from '../hooks/useSunVisibility';

interface SolarWindowProps {
  onStartGazing: () => void;
}

export function SolarWindow({ onStartGazing }: SolarWindowProps) {
  const { sunCondition, isLoading, refreshConditions } = useSunVisibility();
  const [showNotification, setShowNotification] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
  const [lastRefreshTime, setLastRefreshTime] = useState(new Date());

  // Show notification when solar window is approaching
  useEffect(() => {
    if (sunCondition.minutesToWindow > 0 && sunCondition.minutesToWindow <= 10) {
      setShowNotification(true);
    } else {
      setShowNotification(false);
    }
  }, [sunCondition.minutesToWindow]);

  const getSunIcon = () => {
    const hour = new Date().getHours();
    const phase = getSunPhase(hour);
    
    switch (phase) {
      case 'sunrise':
        return <Sunrise className="w-6 h-6" />;
      case 'sunset':
        return <Sunset className="w-6 h-6" />;
      default:
        return <Sun className="w-6 h-6" />;
    }
  };

  const getConditionColor = () => {
    switch (sunCondition.condition) {
      case 'clear':
        return 'from-orange-400 to-yellow-400';
      case 'cloudy':
        return 'from-blue-400 to-gray-400';
      case 'overcast':
        return 'from-gray-400 to-slate-400';
      case 'night':
        return 'from-indigo-600 to-purple-600';
      default:
        return 'from-orange-400 to-yellow-400';
    }
  };

  const formatCountdown = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6 shadow-lg">
        <div className="text-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 animate-pulse mx-auto mb-4" />
          <p className="text-body-sm text-white/70">Checking solar conditions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Solar Window Notification */}
      {showNotification && (
        <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 backdrop-blur-xl border border-orange-400/30 rounded-2xl p-4 shadow-lg animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-title-sm text-white font-semibold">
                Solar Window Alert
              </p>
              <p className="text-body-sm text-white/70">
                Your optimal gazing window begins in {formatCountdown(sunCondition.minutesToWindow)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Solar Condition Display */}
      <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6 shadow-lg">
        {/* Current Condition Header */}
        <div className="text-center mb-6">
          <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getConditionColor()} flex items-center justify-center mx-auto mb-4 shadow-[0_8px_32px_rgba(255,165,0,0.3)]`}>
            {sunCondition.condition === 'overcast' || sunCondition.condition === 'night' ? (
              <CloudRain className="w-8 h-8 text-white" />
            ) : (
              getSunIcon()
            )}
          </div>
          
          <h3 className="text-title-md text-white font-semibold mb-2 capitalize">
            {sunCondition.condition} Conditions
          </h3>
          
          {sunCondition.location && (
            <p className="text-body-sm text-white/60 mb-1">
              📍 {sunCondition.location}
            </p>
          )}
          
          <p className="text-body-md text-white/80 font-medium">
            {sunCondition.message}
          </p>
          <p className="text-caption text-white/50 mt-1">
            Last updated: {lastRefreshTime.toLocaleTimeString()}
          </p>
          <p className="text-caption text-white/40">
            Refresh count: {refreshCount}
          </p>
          {isLoading && (
            <p className="text-caption text-blue-400 animate-pulse">
              🔄 Refreshing conditions...
            </p>
          )}
        </div>

        {/* Condition Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-xl p-3 text-center">
            <div className="text-label text-white/60 mb-1">Visibility</div>
            <div className="text-number-display text-white font-bold">
              {sunCondition.isVisible ? 'Clear' : 'Veiled'}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-xl p-3 text-center">
            <div className="text-label text-white/60 mb-1">Cloud Cover</div>
            <div className="text-number-display text-white font-bold">
              {sunCondition.cloudCover}%
            </div>
          </div>
        </div>

        {/* Solar Window Countdown */}
        {sunCondition.solarWindowStart && sunCondition.minutesToWindow > 0 && (
          <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 backdrop-blur-xl border border-orange-400/30 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-orange-400" />
              <span className="text-title-sm text-white font-semibold">Next Solar Window</span>
            </div>
            <div className="text-center">
              <div className="text-display-2xl text-white font-bold mb-1">
                {formatCountdown(sunCondition.minutesToWindow)}
              </div>
              <div className="text-body-sm text-white/70">
                until optimal conditions
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={onStartGazing}
            className={`w-full bg-gradient-to-r ${getConditionColor()}/30 hover:${getConditionColor().replace('to-', 'hover:to-')}/40 text-white border border-orange-400/30 backdrop-blur-xl rounded-2xl py-3 transition-all duration-300 font-medium tracking-wide shadow-[0_4px_20px_rgba(255,165,0,0.2)]`}
          >
            {getSunIcon()}
            <span className="ml-2 text-body-md">
              {sunCondition.isVisible ? 'Begin Sun Gazing' : 'Begin Sun Gazing'}
            </span>
          </Button>
          
          <Button
            onClick={() => {
              console.log('🔘 Refresh button clicked in UI');
              console.log('🔘 refreshConditions function:', refreshConditions);
              console.log('🔘 isLoading state:', isLoading);
              setRefreshCount(prev => prev + 1);
              setLastRefreshTime(new Date());
              if (typeof refreshConditions === 'function') {
                refreshConditions();
              } else {
                console.error('❌ refreshConditions is not a function!');
              }
            }}
            disabled={isLoading}
            className="w-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30 disabled:from-blue-500/10 disabled:to-indigo-500/10 disabled:opacity-50 text-white border border-blue-400/30 backdrop-blur-xl rounded-2xl py-2 transition-all duration-300 font-medium tracking-wide text-body-sm"
          >
            {isLoading ? 'Refreshing...' : 'Refresh Conditions'}
          </Button>
        </div>

        {/* Encouraging Message for Non-Gazing Conditions */}
        {!sunCondition.canGaze && (
          <div className="mt-4 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-xl border border-blue-400/30 rounded-xl p-4 text-center">
            <p className="text-body-md text-white/80 font-medium italic">
              "Even hidden, the sun reaches you."
            </p>
            <p className="text-body-sm text-white/60 mt-1">
              Your practice continues through all conditions
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
