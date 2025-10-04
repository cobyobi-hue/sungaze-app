"use client";

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Sparkles, Sun, Eye, Zap } from 'lucide-react';

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

interface SolarOracleOnboardingProps {
  onComplete: (data: OnboardingData) => void;
  onSkip: () => void;
}

const questions = [
  {
    id: 1,
    title: "The World's First Light Nutrition & Sungazing App",
    question: "What draws you to the revolutionary intersection of ancient solar wisdom and modern light science?",
    key: 'experienceLevel',
    options: [
      "I'm fascinated by how ancient practices align with cutting-edge photobiology",
      "I want to safely learn HRM's methods with proper scientific guidance", 
      "I'm seeking both spiritual growth and measurable health optimization",
      "I'm interested in the documented cases of people living on light alone",
      "I want to enhance my consciousness while improving my biology",
      "I'm exploring how solar practices can transform both mind and metabolism"
    ]
  },
  {
    id: 2,
    title: "The Modern Human's Disconnection Crisis",
    question: "What's your biggest challenge with energy, consciousness, or vitality right now?",
    key: 'lifeChallenges',
    options: [
      "I'm exhausted from artificial living and want natural energy sources",
      "I feel spiritually disconnected yet crave scientifically-backed practices",
      "My circadian rhythms are disrupted and my consciousness feels cloudy",
      "I rely on stimulants and processed foods but want natural alternatives",
      "I'm seeking practices that elevate both awareness and physical health",
      "I want to optimize my biology while expanding my spiritual potential"
    ]
  },
  {
    id: 3,
    title: "Ancient Wisdom Meets Modern Science",
    question: "How do you prefer to approach transformational practices?",
    key: 'approachPreference',
    options: [
      "I want ancient wisdom validated by modern research and safety protocols",
      "I need both the spiritual depth and scientific understanding",
      "I prefer traditional methods enhanced with contemporary knowledge", 
      "I want mystical practices that are also measurable and trackable",
      "I like evidence-based approaches that honor spiritual dimensions"
    ]
  },
  {
    id: 4,
    title: "Your Solar Evolution Vision",
    question: "If solar practice could transform you, what combination appeals most?",
    key: 'transformationGoals',
    options: [
      "Enhanced cellular energy AND deeper spiritual connection",
      "Optimized metabolism AND expanded consciousness",
      "Better circadian health AND mystical experiences",
      "Reduced food dependence AND increased inner peace",
      "Stronger immunity AND heightened intuition",
      "Peak physical vitality AND transcendent awareness"
    ]
  },
  {
    id: 5,
    title: "Your Sacred Science Routine",
    question: "How would you ideally integrate solar practice into your life?",
    key: 'integrationStyle',
    options: [
      "Morning light therapy combined with meditative presence",
      "Evening solar communion as part of my optimization routine",
      "Brief daily sessions that enhance both health and awareness",
      "Dedicated practice time for deep transformation and research",
      "Flexible approach based on both solar conditions and inner guidance"
    ]
  },
  {
    id: 6,
    title: "How Revolutionary Wisdom Speaks to You",
    question: "How do you best absorb paradigm-shifting knowledge?",
    key: 'learningPreference',
    options: [
      "Research-backed insights delivered with poetic, inspiring language",
      "Practical protocols explained through both science and ancient wisdom",
      "Interactive guidance that honors both my questions and my intuition",
      "Case studies showing measurable results and consciousness expansion",
      "Technical understanding wrapped in mystical, transformational context",
      "Multi-layered content that satisfies both my mind and my soul"
    ]
  },
  {
    id: 7,
    title: "The Solar Pioneer's Journey",
    question: "What kind of support would help you pioneer this transformational path?",
    key: 'supportNeeds',
    options: [
      "Personalized guidance that tracks both biomarkers and spiritual progress",
      "Community of like-minded pioneers exploring consciousness and optimization",
      "Expert mentorship combining scientific safety with wisdom traditions",
      "Progress tracking for both measurable health improvements and inner growth",
      "Access to cutting-edge research and ancient teachings in one place",
      "Feeling part of an exclusive group pioneering human potential"
    ]
  },
  {
    id: 8,
    title: "Your Commitment to Human Potential",
    question: "What have you invested in your physical health and consciousness development?",
    key: 'investmentLevel',
    options: [
      "$100-300 on supplements, biohacking tools, and spiritual resources",
      "$300-700 on optimization programs, retreats, and transformational education",
      "$700+ on serious health coaching, spiritual mentoring, and cutting-edge protocols",
      "Significant time in research across both scientific and wisdom traditions",
      "I'm beginning to invest seriously in my complete evolution",
      "I invest substantially when I find truly revolutionary approaches"
    ]
  },
  {
    id: 9,
    title: "Your Solar Awakening & Optimization Begins",
    question: "Where are you right now on this journey of integrated transformation?",
    key: 'readinessLevel',
    options: [
      "I'm ready to begin this revolutionary practice today with proper guidance",
      "I want to start systematically with both ancient wisdom and modern safety",
      "I'm excited to explore the cutting edge where science meets spirit",
      "I've been searching for exactly this - wisdom backed by research",
      "Something tells me this is the breakthrough I've been seeking",
      "I'm intrigued by this unique approach and want to explore deeper"
    ]
  }
];

export function SolarOracleOnboarding({ onComplete, onSkip }: SolarOracleOnboardingProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Partial<OnboardingData>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setAnswers(prev => ({
      ...prev,
      [question.key]: option
    }));
  };

  const handleNext = () => {
    if (!selectedOption) return;

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(null);
    } else {
      // Complete onboarding
      onComplete(answers as OnboardingData);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      const prevQuestion = questions[currentQuestion - 1];
      setSelectedOption(answers[prevQuestion.key as keyof OnboardingData] || null);
    }
  };

  const getQuestionIcon = (questionId: number) => {
    switch (questionId) {
      case 1: return <Sun className="w-6 h-6" />;
      case 2: return <Zap className="w-6 h-6" />;
      case 3: return <Eye className="w-6 h-6" />;
      case 4: return <Sparkles className="w-6 h-6" />;
      default: return <Sun className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/90 via-blue-800/90 to-cyan-900/90 backdrop-blur-xl">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.1)_0%,transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{
               backgroundImage: `linear-gradient(rgba(34,211,238,0.3) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(34,211,238,0.3) 1px, transparent 1px)`,
               backgroundSize: '20px 20px'
             }} />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 mb-6 shadow-[0_0_40px_rgba(251,191,36,0.4)]">
              {getQuestionIcon(question.id)}
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-black/30 rounded-full h-2 mb-6 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <p className="text-cyan-200/80 text-sm mb-2">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>

          {/* Question Card */}
          <div className="bg-black/40 backdrop-blur-xl border border-cyan-400/30 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white mb-4 leading-tight">
                {question.title}
              </h1>
              <p className="text-cyan-100 text-lg leading-relaxed font-medium">
                {question.question}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-4 mb-8">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
                    selectedOption === option
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400/60 shadow-[0_0_20px_rgba(34,211,238,0.2)]'
                      : 'bg-black/20 border-white/20 hover:bg-black/30 hover:border-cyan-400/40'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 transition-all duration-300 ${
                      selectedOption === option
                        ? 'border-cyan-400 bg-cyan-400'
                        : 'border-white/40'
                    }`}>
                      {selectedOption === option && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <span className={`text-sm leading-relaxed transition-colors duration-300 ${
                      selectedOption === option ? 'text-cyan-100' : 'text-white/90'
                    }`}>
                      {option}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                onClick={handleBack}
                disabled={currentQuestion === 0}
                className="bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed border border-white/30 px-6 py-3"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              <div className="flex items-center gap-4">
                <button
                  onClick={onSkip}
                  className="text-white/60 hover:text-white/80 text-sm transition-colors duration-200"
                >
                  Skip for now
                </button>
                
                <Button
                  onClick={handleNext}
                  disabled={!selectedOption}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 shadow-[0_4px_20px_rgba(34,211,238,0.3)]"
                >
                  {currentQuestion === questions.length - 1 ? 'Begin Your Journey' : 'Continue'}
                  {currentQuestion < questions.length - 1 && <ChevronRight className="w-4 h-4 ml-2" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Conversion Hooks */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-400/30 rounded-full px-6 py-3">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-200 text-sm font-medium">
                {currentQuestion < 3 && "Pioneering the intersection of ancient wisdom & modern science"}
                {currentQuestion >= 3 && currentQuestion < 6 && "Comprehensive transformation for body, mind & spirit"}
                {currentQuestion >= 6 && "Join an exclusive community of solar pioneers"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Light Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/60 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}