"use client";

import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface OnboardingQuestionsProps {
  data: any;
  updateData: (section: string, data: any) => void;
  onNext: () => void;
  onPrev: () => void;
  currentStep: number;
  totalSteps: number;
}

const questions = [
  {
    id: 'q1_interest',
    question: "What draws you to solar practices and light nutrition?",
    options: [
      "Scientific research on sungazing and photobiology",
      "Natural energy optimization without stimulants",
      "Ancient wisdom meets modern biohacking",
      "Complete mind-body transformation"
    ]
  },
  {
    id: 'q2_energy',
    question: "How would you describe your current energy levels?",
    options: [
      "Consistently low, rely on caffeine/stimulants",
      "Inconsistent - good days and crash days",
      "Decent but want optimization"
    ]
  },
  {
    id: 'q3_sleep',
    question: "How is your sleep quality?",
    options: [
      "Poor - trouble falling/staying asleep",
      "Average - wake up tired often",
      "Good but want optimization"
    ]
  },
  {
    id: 'q4_goal',
    question: "What's your main health optimization goal?",
    options: [
      "Unlimited natural energy throughout the day",
      "Better sleep and circadian rhythm balance",
      "Enhanced mental clarity and focus",
      "Overall vitality and life force"
    ]
  },
  {
    id: 'q5_experience',
    question: "What's your experience with alternative health practices?",
    options: [
      "Complete beginner - new to this world",
      "Some experience with meditation/yoga",
      "Experienced with biohacking/optimization"
    ]
  },
  {
    id: 'q6_time',
    question: "How much time can you dedicate to daily practice?",
    options: [
      "5-10 minutes maximum",
      "10-20 minutes consistently",
      "20+ minutes for serious results"
    ]
  },
  {
    id: 'q7_learning',
    question: "How do you prefer to learn new practices?",
    options: [
      "Step-by-step guided instructions",
      "Scientific explanations with practical application",
      "Ancient wisdom with modern context"
    ]
  },
  {
    id: 'q8_safety',
    question: "How important is safety guidance to you?",
    options: [
      "Extremely important - I want expert oversight",
      "Very important - need clear protocols",
      "Important but I'm naturally cautious"
    ]
  },
  {
    id: 'q9_transformation',
    question: "How ready are you for significant life changes?",
    options: [
      "Ready for gradual, sustainable changes",
      "Ready for profound transformation",
      "Excited but want to start carefully"
    ]
  },
  {
    id: 'q10_support',
    question: "What kind of support would help you most?",
    options: [
      "Daily reminders and progress tracking",
      "Community of like-minded practitioners",
      "Personal guidance and troubleshooting"
    ]
  },
  {
    id: 'q11_lifestyle',
    question: "How does this fit with your current lifestyle?",
    options: [
      "Looking to add to existing wellness routine",
      "Want to replace unhealthy habits",
      "Ready to restructure my entire approach"
    ]
  },
  {
    id: 'q12_investment',
    question: "How do you view investment in your health?",
    options: [
      "Willing to invest for proven results",
      "Prefer to start small and scale up",
      "Ready for premium, comprehensive programs"
    ]
  },
  {
    id: 'q13_motivation',
    question: "What motivates you most about this journey?",
    options: [
      "Becoming my highest potential self",
      "Healing and optimizing my body naturally",
      "Exploring expanded consciousness"
    ]
  }
];

export function OnboardingQuestions({ data, updateData, onNext }: OnboardingQuestionsProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (answer: string) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: answer };
    setAnswers(newAnswers);
    
    // Auto-advance to next question after a brief delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // All questions answered, update data and proceed
        updateData('questions', newAnswers);
        onNext();
      }
    }, 300);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-display-2xl text-white font-bold mb-2">Solar Oracle Assessment</h1>
        <p className="text-body-md text-white/70">Help us understand your unique journey</p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-caption text-white/60">Question {currentQuestion + 1} of {questions.length}</span>
          <span className="text-caption text-white/60">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-blue-500/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-8 shadow-lg mb-8">
        <h2 className="text-title-lg text-white font-semibold mb-6 text-center">
          {questions[currentQuestion].question}
        </h2>
        
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="w-full p-4 text-left bg-gradient-to-br from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30 border border-blue-400/30 rounded-xl text-white transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-body-md font-medium">{option}</span>
                <ChevronRight className="w-5 h-5 text-white/60 group-hover:text-white/80 transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Skip Option */}
      <div className="text-center">
        <button 
          onClick={onNext}
          className="text-caption text-white/60 hover:text-white/80 transition-colors"
        >
          Skip assessment
        </button>
      </div>
    </div>
  );
}
