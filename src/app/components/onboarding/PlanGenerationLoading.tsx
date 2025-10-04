"use client";

import React, { useState, useEffect } from 'react';
import { Loader2, Sparkles, Clock, Target, Zap } from 'lucide-react';
import { ProgressChart } from './ProgressChart';
import { EnergyChart } from './EnergyChart';

interface PlanGenerationLoadingProps {
  data: any;
  updateData: (section: string, data: any) => void;
  onNext: () => void;
  onPrev: () => void;
  currentStep: number;
  totalSteps: number;
}

const loadingSteps = [
  {
    title: "Analyzing your unique profile...",
    description: "Processing your responses and energy patterns",
    icon: Sparkles,
    duration: 2000
  },
  {
    title: "Setting up your optimal practice schedule...",
    description: "Calibrating timing based on your lifestyle",
    icon: Clock,
    duration: 2500
  },
  {
    title: "Calibrating safety protocols...",
    description: "Ensuring your journey is safe and effective",
    icon: Target,
    duration: 2000
  },
  {
    title: "Integrating ancient wisdom with your modern lifestyle...",
    description: "Creating your personalized solar nutrition blueprint",
    icon: Zap,
    duration: 3000
  }
];

export function PlanGenerationLoading({ onNext }: PlanGenerationLoadingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let stepTimer: NodeJS.Timeout;
    let progressTimer: NodeJS.Timeout;

    const startStep = (stepIndex: number) => {
      if (stepIndex >= loadingSteps.length) {
        setIsComplete(true);
        setTimeout(() => onNext(), 1000);
        return;
      }

      setCurrentStep(stepIndex);
      setProgress(0);

      // Progress animation
      const step = loadingSteps[stepIndex];
      const progressInterval = 50;
      const totalIntervals = step.duration / progressInterval;
      let currentInterval = 0;

      progressTimer = setInterval(() => {
        currentInterval++;
        const newProgress = (currentInterval / totalIntervals) * 100;
        setProgress(newProgress);

        if (currentInterval >= totalIntervals) {
          clearInterval(progressTimer);
          setTimeout(() => startStep(stepIndex + 1), 500);
        }
      }, progressInterval);
    };

    // Start the first step
    startStep(0);

    return () => {
      clearTimeout(stepTimer);
      clearInterval(progressTimer);
    };
  }, [onNext]);

  const currentStepData = loadingSteps[currentStep];
  const IconComponent = currentStepData?.icon || Loader2;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-display-2xl text-white font-bold mb-2">
          {isComplete ? "Your Plan is Ready!" : "Generating Your Custom Plan"}
        </h1>
        <p className="text-body-md text-white/70">
          {isComplete 
            ? "Your personalized solar transformation roadmap is complete"
            : "This usually takes 30-60 seconds for optimal customization"
          }
        </p>
      </div>

      {/* Loading Content */}
      <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-8 shadow-lg mb-8">
        {!isComplete && currentStepData && (
          <>
            {/* Current Step */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center">
                <IconComponent className="w-8 h-8 text-white animate-pulse" />
              </div>
              <h2 className="text-title-lg text-white font-semibold mb-2">
                {currentStepData.title}
              </h2>
              <p className="text-body-md text-white/70">
                {currentStepData.description}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-caption text-white/60">Step {currentStep + 1} of {loadingSteps.length}</span>
                <span className="text-caption text-white/60">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-blue-500/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </>
        )}

        {/* Completion State */}
        {isComplete && (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-title-lg text-white font-semibold mb-2">
              Customization Complete!
            </h2>
            <p className="text-body-md text-white/70">
              Your personalized solar transformation plan is ready
            </p>
          </div>
        )}

        {/* Overall Progress */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-caption text-white/60">Overall Progress</span>
            <span className="text-caption text-white/60">
              {Math.round(((currentStep + (progress / 100)) / loadingSteps.length) * 100)}%
            </span>
          </div>
          <div className="h-1 bg-blue-500/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 transition-all duration-500 ease-out"
              style={{ width: `${((currentStep + (progress / 100)) / loadingSteps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <ProgressChart currentDay={1} totalDays={273} />
        <EnergyChart currentEnergy={35} targetEnergy={85} />
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-400/5 rounded-full blur-3xl animate-pulse" />
      </div>
    </div>
  );
}
