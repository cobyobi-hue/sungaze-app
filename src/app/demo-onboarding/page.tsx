"use client";

import { useState, useEffect } from 'react';
import { OnboardingFlow } from '../components/onboarding/OnboardingFlow';

export default function DemoOnboardingPage() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    // Redirect to main app after onboarding
    window.location.href = '/';
  };

  const resetDemo = () => {
    setShowOnboarding(true);
  };

  if (showOnboarding) {
    return (
      <OnboardingFlow onComplete={handleOnboardingComplete} />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Onboarding Complete!</h1>
          <p className="text-xl text-blue-300 mb-8">Welcome to your personalized SUNGAZE journey!</p>
          <button
            onClick={resetDemo}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-yellow-400 hover:to-orange-400 transition-all"
          >
            Try Onboarding Again
          </button>
        </div>
      </div>
    </div>
  );
}