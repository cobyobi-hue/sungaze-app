"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Loader2 } from 'lucide-react';
import { OnboardingQuestions } from './OnboardingQuestions';
import { AuthenticationScreen } from './AuthenticationScreen';
import { UserProfileForm } from './UserProfileForm';
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
    { component: UserProfileForm, title: "Complete Your Profile" },
    { component: EncouragementSlides, title: "Your Potential" },
    { component: RatingRequest, title: "Help Others" },
    { component: PlanGenerationLoading, title: "Generating Your Plan" },
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Sun44 Logo - Top Left */}
      <div className="fixed top-6 left-6 z-50">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400/90 to-amber-500/90 flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.5)] border border-yellow-300/30">
          <span className="text-black text-sm font-bold tracking-tight">44</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-1 bg-blue-500/20">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 ease-out"
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
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-xl border border-blue-400/30 rounded-2xl text-white hover:from-blue-500/30 hover:to-indigo-500/30 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-body-sm font-medium">Back</span>
            </button>
            
            <div className="text-caption text-white/60">
              {currentStep + 1} of {steps.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
