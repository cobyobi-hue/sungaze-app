"use client";

import { useState, useEffect } from 'react';

export function useIsIOSApp() {
  const [isIOSApp, setIsIOSApp] = useState(false);

  useEffect(() => {
    // Check if running inside iOS app
    const userAgent = navigator.userAgent;
    const isIOSAppDetected = userAgent.includes('SungazeIOSApp');
    
    setIsIOSApp(isIOSAppDetected);
    
    // Log for debugging
    console.log('User Agent:', userAgent);
    console.log('Is iOS App:', isIOSAppDetected);
  }, []);

  return isIOSApp;
}

export function usePlatformDetection() {
  const [platform, setPlatform] = useState<'ios-app' | 'web' | 'unknown'>('unknown');

  useEffect(() => {
    const userAgent = navigator.userAgent;
    
    if (userAgent.includes('SungazeIOSApp')) {
      setPlatform('ios-app');
    } else if (typeof window !== 'undefined') {
      setPlatform('web');
    } else {
      setPlatform('unknown');
    }
  }, []);

  return platform;
}
