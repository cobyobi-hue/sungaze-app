"use client";

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Eye, EyeOff, Sun, Heart, Sparkles, ArrowRight, Check } from 'lucide-react';

interface PostGazeRitualProps {
  onComplete: () => void;
  onJournalOpen: () => void;
  gazingDuration: number;
}

export function PostGazeRitual({ onComplete, onJournalOpen, gazingDuration }: PostGazeRitualProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepStartTime, setStepStartTime] = useState(Date.now());
  const [palmRubCount, setPalmRubCount] = useState(0);
  const [eyeCoverTime, setEyeCoverTime] = useState(0);
  const [meditationTime, setMeditationTime] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const ritualSteps = [
    {
      id: 'palm-rub',
      title: 'Palm Warming',
      instruction: 'Rub your palms together vigorously for 30 seconds',
      duration: 30,
      icon: <Sparkles className="w-6 h-6" />,
      description: 'Generate healing warmth in your palms'
    },
    {
      id: 'eye-cover',
      title: 'Eye Sanctuary',
      instruction: 'Gently cup your warm palms over closed eyes',
      duration: 60,
      icon: <EyeOff className="w-6 h-6" />,
      description: 'Let the darkness and warmth soothe your vision'
    },
    {
      id: 'inner-sun',
      title: 'Inner Sun Meditation',
      instruction: 'Visualize the sun\'s golden light glowing within your heart',
      duration: 120,
      icon: <Heart className="w-6 h-6" />,
      description: 'Feel the solar energy integrating throughout your being'
    }
  ];

  const currentRitual = ritualSteps[currentStep];

  // Timer for current step
  useEffect(() => {
    if (currentStep < ritualSteps.length) {
      const timer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - stepStartTime) / 1000);
        
        switch (currentStep) {
          case 0:
            setPalmRubCount(Math.min(elapsed, 30));
            break;
          case 1:
            setEyeCoverTime(Math.min(elapsed, 60));
            break;
          case 2:
            setMeditationTime(Math.min(elapsed, 120));
            break;
        }
        
        if (elapsed >= ritualSteps[currentStep].duration) {
          clearInterval(timer);
          setIsAnimating(true);
          setTimeout(() => {
            setIsAnimating(false);
            if (currentStep < ritualSteps.length - 1) {
              setCurrentStep(currentStep + 1);
              setStepStartTime(Date.now());
            }
          }, 1000);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentStep, stepStartTime, ritualSteps]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${secs}s`;
  };

  const getProgress = () => {
    switch (currentStep) {
      case 0:
        return (palmRubCount / 30) * 100;
      case 1:
        return (eyeCoverTime / 60) * 100;
      case 2:
        return (meditationTime / 120) * 100;
      default:
        return 100;
    }
  };

  const isRitualComplete = currentStep >= ritualSteps.length;

  if (isRitualComplete) {
    return (
      <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-[0_8px_32px_rgba(255,255,255,0.1)] text-center">
        {/* Completion Celebration */}
        <div className="mb-8">
          <div className="relative inline-flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-300/20 to-yellow-400/20 blur-3xl scale-150 animate-pulse" />
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-orange-400/90 to-yellow-500/90 flex items-center justify-center shadow-[0_0_40px_rgba(255,165,0,0.5)] border border-orange-300/30">
              <Sun className="text-white text-2xl w-10 h-10" />
            </div>
          </div>
        </div>
        
        <h3 className="text-gray-800 text-xl font-medium mb-4">
          Solar Integration Complete
        </h3>
        
        <div className="bg-white/25 backdrop-blur-xl border border-white/20 rounded-xl p-6 mb-6">
          <p className="text-gray-800 text-sm font-medium mb-4 italic">
            "The light you gazed upon now lives within you."
          </p>
          
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-gray-700 mb-1">Gazing Duration</div>
              <div className="text-gray-900 font-bold">{formatTime(gazingDuration)}</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-gray-700 mb-1">Palm Warmth</div>
              <div className="text-orange-600 font-bold">
                <Check className="w-4 h-4 mx-auto" />
              </div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-gray-700 mb-1">Integration</div>
              <div className="text-orange-600 font-bold">
                <Check className="w-4 h-4 mx-auto" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <Button
            onClick={onJournalOpen}
            className="w-full bg-gradient-to-r from-orange-400/30 to-yellow-400/30 hover:from-orange-400/40 hover:to-yellow-400/40 text-gray-800 border border-orange-400/30 backdrop-blur-xl rounded-2xl py-3 transition-all duration-300 font-medium tracking-wide shadow-[0_4px_20px_rgba(255,165,0,0.2)]"
          >
            <Heart className="w-5 h-5 mr-2" />
            Record in Solar Journal
          </Button>
          
          <Button
            onClick={onComplete}
            className="w-full bg-white/15 hover:bg-white/25 text-gray-800 border border-white/15 backdrop-blur-xl rounded-2xl py-2 transition-all duration-300 font-medium tracking-wide text-sm"
          >
            Complete Practice
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-[0_8px_32px_rgba(255,255,255,0.1)]">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400/30 to-yellow-400/30 flex items-center justify-center mx-auto mb-4">
          {currentRitual.icon}
        </div>
        
        <h3 className="text-gray-800 text-lg font-medium mb-2">
          Post-Gaze Ritual
        </h3>
        
        <div className="text-gray-700 text-sm font-medium tracking-wide">
          Step {currentStep + 1} of {ritualSteps.length}
        </div>
      </div>

      {/* Current Step */}
      <div className="mb-8">
        <div className="bg-white/25 backdrop-blur-xl border border-white/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-orange-400/30 to-yellow-400/30 flex items-center justify-center ${isAnimating ? 'animate-pulse' : ''}`}>
              {currentRitual.icon}
            </div>
            <div>
              <h4 className="text-gray-800 font-medium text-base">
                {currentRitual.title}
              </h4>
              <p className="text-gray-700 text-xs">
                {currentRitual.description}
              </p>
            </div>
          </div>
          
          <p className="text-gray-800 text-sm font-medium mb-4 italic">
            {currentRitual.instruction}
          </p>
          
          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-2 mb-3">
            <div 
              className="bg-gradient-to-r from-orange-400 to-yellow-400 h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${getProgress()}%` }}
            />
          </div>
          
          <div className="flex justify-between items-center text-xs text-gray-700">
            <span>{formatTime(currentStep === 0 ? palmRubCount : currentStep === 1 ? eyeCoverTime : meditationTime)}</span>
            <span>{formatTime(currentRitual.duration)}</span>
          </div>
        </div>
      </div>

      {/* Step Progress Indicators */}
      <div className="flex justify-center gap-3 mb-6">
        {ritualSteps.map((step, index) => (
          <div
            key={step.id}
            className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
              index < currentStep
                ? 'bg-orange-400/20 text-orange-800 border border-orange-400/30'
                : index === currentStep
                ? 'bg-white/25 text-gray-800 border border-white/30'
                : 'bg-white/10 text-gray-900 border border-white/10'
            }`}
          >
            {index < currentStep ? (
              <Check className="w-3 h-3" />
            ) : (
              <div className="w-3 h-3 rounded-full border border-current" />
            )}
            <span className="hidden sm:inline">{step.title}</span>
          </div>
        ))}
      </div>

      {/* Skip Options */}
      <div className="flex gap-3">
        <Button
          onClick={() => {
            if (currentStep < ritualSteps.length - 1) {
              setCurrentStep(currentStep + 1);
              setStepStartTime(Date.now());
            } else {
              setCurrentStep(ritualSteps.length);
            }
          }}
          className="flex-1 bg-white/15 hover:bg-white/25 text-gray-800 border border-white/15 backdrop-blur-xl rounded-2xl py-2 transition-all duration-300 font-medium tracking-wide text-sm"
        >
          Skip Step
        </Button>
        
        <Button
          onClick={() => setCurrentStep(ritualSteps.length)}
          className="bg-white/15 hover:bg-white/25 text-gray-800 border border-white/15 backdrop-blur-xl rounded-2xl px-4 py-2 transition-all duration-300 font-medium tracking-wide text-sm"
        >
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Ritual Benefits */}
      <div className="mt-6 bg-orange-50/50 backdrop-blur-xl border border-orange-200/30 rounded-xl p-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sun className="w-4 h-4 text-orange-600" />
            <span className="text-orange-800 font-medium text-sm">Integration Benefits</span>
          </div>
          <p className="text-gray-700 text-xs leading-relaxed font-medium">
            Soothes vision • Integrates solar energy • Deepens inner connection • Completes the sacred practice
          </p>
        </div>
      </div>
    </div>
  );
}
