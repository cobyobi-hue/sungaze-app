"use client";

import React, { useState, useEffect } from 'react';
import { SolarWindowNotification } from './SolarWindowNotification';
import { useSolarWindowNotifications } from '../hooks/useSolarWindowNotifications';
import { SungazingTimer } from './SungazingTimer';
import { CloudGazingTimer } from './CloudGazingTimer';

interface SolarWindowManagerProps {
  onRitualComplete?: () => void;
}

export function SolarWindowManager({ onRitualComplete }: SolarWindowManagerProps) {
  const {
    isNotificationVisible,
    closeNotification,
    checkForSolarWindow
  } = useSolarWindowNotifications();

  const [activeRitual, setActiveRitual] = useState<'solar' | 'cloud' | null>(null);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Handle starting a ritual from notification
  const handleStartRitual = (type: 'solar' | 'cloud') => {
    setActiveRitual(type);
    setIsTimerActive(true);
  };

  // Handle ritual completion
  const handleRitualComplete = () => {
    setActiveRitual(null);
    setIsTimerActive(false);
    onRitualComplete?.();
  };

  // Handle timer change
  const handleTimerChange = (isActive: boolean, progress: number) => {
    setIsTimerActive(isActive);
  };

  // Render the appropriate timer based on ritual type
  const renderRitualTimer = () => {
    if (!activeRitual) return null;

    if (activeRitual === 'solar') {
      return (
        <SungazingTimer
          onTimerChange={handleTimerChange}
          onComplete={handleRitualComplete}
          autoStart={true}
          onAutoStartHandled={() => {}}
        />
      );
    } else {
      return (
        <CloudGazingTimer
          onTimerChange={handleTimerChange}
          onComplete={handleRitualComplete}
        />
      );
    }
  };

  return (
    <>
      {/* Solar Window Notification */}
      {isNotificationVisible && (
        <SolarWindowNotification
          onClose={closeNotification}
          onStartRitual={handleStartRitual}
        />
      )}

      {/* Ritual Timer */}
      {renderRitualTimer()}
    </>
  );
}


