"use client";

import React from "react";
import { SolarOracleOnboarding } from "./SolarOracleOnboarding";
import { setConsent } from "../lib/consent";

interface OnboardingScreenProps {
  onComplete: () => void;
}

interface OnboardingData {
  experienceLevel: string;
  lifeChallenges: string;
  approachPreference: string;
  transformationGoals: string;
  integrationStyle: string;
  learningPreference: string;
  supportNeeds: string;
  investmentLevel: string;
  readinessLevel: string;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  
  const handleOnboardingComplete = (data: OnboardingData) => {
    // Store onboarding data
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('solar_oracle_onboarding', JSON.stringify({
          ...data,
          completedAt: new Date().toISOString(),
          version: '1.0'
        }));
        
        // Set consent as given
        setConsent(true);
        
        console.log('Solar Oracle Onboarding completed:', data);
      } catch (error) {
        console.error('Failed to store onboarding data:', error);
      }
    }
    
    // Complete onboarding
    onComplete();
  };

  const handleSkipOnboarding = () => {
    // Set basic consent but no onboarding data
    if (typeof window !== 'undefined') {
      try {
        setConsent(true);
        localStorage.setItem('solar_oracle_onboarding', JSON.stringify({
          skipped: true,
          completedAt: new Date().toISOString(),
          version: '1.0'
        }));
      } catch (error) {
        console.error('Failed to store skip data:', error);
      }
    }
    
    onComplete();
  };

  return (
    <SolarOracleOnboarding
      onComplete={handleOnboardingComplete}
      onSkip={handleSkipOnboarding}
    />
  );
}
