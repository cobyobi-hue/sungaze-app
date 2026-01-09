"use client";

import React, { useState } from 'react';
import { ChevronRight, Sparkles, Heart } from 'lucide-react';

interface EncouragementSlidesProps {
  data: any;
  updateData: (section: string, data: any) => void;
  onNext: () => void;
  onPrev: () => void;
  currentStep: number;
  totalSteps: number;
}

const slides = [
  {
    title: "You Have Incredible Potential",
    subtitle: "Based on your responses, you have exceptional potential to crush your transformation goals",
    description: "Your commitment level and readiness indicate you're destined for breakthrough results",
    icon: Sparkles,
    gradient: "from-yellow-400/20 to-amber-500/20"
  },
  {
    title: "Thank You for Your Trust",
    subtitle: "Thank you for trusting us with your health and transformation journey",
    description: "We take this responsibility seriously and are committed to your success. Thousands of others have transformed their lives through our guidance",
    icon: Heart,
    gradient: "from-yellow-400/20 to-orange-500/20"
  }
];

export function EncouragementSlides({ onNext }: EncouragementSlidesProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onNext();
    }
  };

  const currentSlideData = slides[currentSlide];
  const IconComponent = currentSlideData.icon;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-center gap-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-yellow-400' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Slide Content */}
      <div className="text-center">
        {/* Icon */}
        <div className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br ${currentSlideData.gradient} flex items-center justify-center`}>
          <IconComponent className="w-12 h-12 text-white" />
        </div>

        {/* Title */}
        <h1 className="text-display-2xl text-white font-bold mb-4">
          {currentSlideData.title}
        </h1>

        {/* Subtitle */}
        <p className="text-title-md text-white/95 mb-6">
          {currentSlideData.subtitle}
        </p>

        {/* Description */}
        <p className="text-body-lg text-white/90 mb-8 max-w-lg mx-auto">
          {currentSlideData.description}
        </p>

        {/* Continue Button */}
        <button
          onClick={handleNext}
          className="inline-flex items-center gap-2 px-8 py-4 bg-black/40 backdrop-blur-lg border border-white/10 hover:bg-black/50 rounded-xl text-white transition-colors duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
        >
          <span className="text-body-md font-medium">
            {currentSlide < slides.length - 1 ? 'Continue' : 'Begin My Journey'}
          </span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-yellow-400/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
}


