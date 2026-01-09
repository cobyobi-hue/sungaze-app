"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Loader2 } from 'lucide-react';
import { OnboardingQuestions } from './OnboardingQuestions';
import { AuthenticationScreen } from './AuthenticationScreen';
import { EncouragementSlides } from './EncouragementSlides';
import { RatingRequest } from './RatingRequest';
import { PlanGenerationLoading } from './PlanGenerationLoading';
import { OnboardingPaywall } from './OnboardingPaywall';

export interface OnboardingData {
  // 13 Core Questions
  questions: {
    q1_interest: string;
    q2_energy: string;
    q3_sleep: string;
    q4_goal: string;
    q5_experience: string;
    q6_time: string;
    q7_learning: string;
    q8_safety: string;
    q9_transformation: string;
    q10_support: string;
    q11_lifestyle: string;
    q12_investment: string;
    q13_motivation: string;
  };
  // Authentication
  authMethod: 'apple' | 'google' | 'email' | null;
  email?: string;
  // Profile
  profile: {
    age: number;
    height: string;
    gender: string;
    referralSource: string;
    referralDetails?: string;
  };
  // Rating
  rating?: number;
  ratingComment?: string;
}

interface OnboardingFlowProps {
  onComplete?: () => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps = {}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    questions: {
      q1_interest: '',
      q2_energy: '',
      q3_sleep: '',
      q4_goal: '',
      q5_experience: '',
      q6_time: '',
      q7_learning: '',
      q8_safety: '',
      q9_transformation: '',
      q10_support: '',
      q11_lifestyle: '',
      q12_investment: '',
      q13_motivation: '',
    },
    authMethod: null,
    profile: {
      age: 0,
      height: '',
      gender: '',
      referralSource: '',
    },
  });

  const steps = [
    { component: OnboardingQuestions, title: "Solar Oracle Assessment" },
    { component: AuthenticationScreen, title: "Secure Your Journey" },
    { component: EncouragementSlides, title: "Your Potential" },
    { component: RatingRequest, title: "Help Others" },
    { component: PlanGenerationLoading, title: "Generating Your Plan" },
    // Shows "Coming Soon" screen with results when payments are disabled
    { component: OnboardingPaywall, title: "Your Transformation Plan" },
  ];

  const updateData = (section: keyof OnboardingData, data: any) => {
    setOnboardingData(prev => {
      const currentSection = prev[section] as any;
      return {
        ...prev,
        [section]: { ...currentSection, ...data }
      };
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Onboarding complete - call onComplete callback
      onComplete?.();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-pink-100 via-rose-200 via-orange-200 to-yellow-200 relative overflow-hidden">
      {/* Dark warm overlay for app interface */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-800/95 via-rose-800/95 via-orange-700/95 to-orange-600/95 backdrop-blur-xl" />
      
      {/* Content wrapper */}
      <div className="relative z-10">
      {/* Sun44 Logo - Top Left */}
      <div className="fixed top-6 left-6 z-50">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400/90 to-amber-500/90 flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.6),0_0_40px_rgba(255,215,0,0.3)] border-2 border-yellow-300/40">
          <span className="text-black text-sm font-bold tracking-tight drop-shadow-[0_2px_4px_rgba(255,255,255,0.3)]">44</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-1 bg-orange-500/20">
          <div 
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 pb-24 px-6">
        <CurrentComponent
          data={onboardingData}
          updateData={updateData}
          onNext={nextStep}
          onPrev={prevStep}
          currentStep={currentStep}
          totalSteps={steps.length}
        />
      </div>

      {/* Navigation */}
      {currentStep > 0 && currentStep < steps.length - 1 && (
        <div className="fixed bottom-6 left-6 right-6 z-40">
          <div className="flex justify-between items-center">
            <button
              onClick={prevStep}
              className="flex items-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-lg border border-white/10 hover:bg-black/50 rounded-2xl text-white transition-colors duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
            >
              <ChevronLeft className="w-5 h-5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]" />
              <span className="text-body-sm font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Back</span>
            </button>
            
            <div className="text-caption text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
              {currentStep + 1} of {steps.length}
            </div>
          </div>
        </div>
      )}
      </div>
      {/* End content wrapper */}
    </div>
  );
}
