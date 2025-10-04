"use client";

import React, { useState, useEffect } from 'react';
import { truthScrolls, TruthScroll, getAllCategories } from '../data/truthScrolls';
import { ChevronLeft, ChevronRight, X, Sparkles, Zap, Crown, Lock, Star } from 'lucide-react';
import { PremiumGate } from './PremiumGate';

interface TruthScrollsProps {
  onClose: () => void;
  hasAccess: boolean;
  onUpgrade?: () => void;
}

export function TruthScrollsNew({ onClose, hasAccess, onUpgrade }: TruthScrollsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const categories = getAllCategories();
  const filteredScrolls = selectedCategory 
    ? truthScrolls.filter(scroll => scroll.category === selectedCategory)
    : truthScrolls;

  // Ensure current index is valid for filtered scrolls
  useEffect(() => {
    if (currentIndex >= filteredScrolls.length) {
      setCurrentIndex(0);
    }
  }, [selectedCategory, filteredScrolls.length, currentIndex]);

  const currentScroll = filteredScrolls[currentIndex];

  // Touch handlers for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < filteredScrolls.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const nextScroll = () => {
    if (currentIndex < filteredScrolls.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevScroll = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const getCategoryEmoji = (category: string) => {
    const emojiMap: { [key: string]: string } = {
      'Safety': '🌅',
      'Ancient Wisdom': '📜',
      'Health': '🌟',
      'Energy': '☀️',
      'Mental Health': '🧘',
      'Vision': '👁️',
      'Sleep': '🌙',
      'Consciousness': '🧿',
      'Nutrition': '🌱'
    };
    return emojiMap[category] || '✨';
  };

  // Premium gate - show upgrade screen if no access
  if (!hasAccess) {
    return (
      <div className="fixed inset-0 bg-black z-50 overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Premium gate content */}
        <div className="h-full flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-orange-500/5 to-red-500/10 rounded-3xl blur-3xl" />
            
            {/* Main card */}
            <div className="relative bg-gradient-to-br from-yellow-500/5 to-orange-500/5 backdrop-blur-xl border border-yellow-400/30 rounded-3xl p-8 shadow-[0_0_60px_rgba(251,191,36,0.3)]">
              
              {/* Lock icon */}
              <div className="mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-500/20 flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(251,191,36,0.4)]">
                  <Lock className="w-10 h-10 text-yellow-400" />
                </div>
                
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/20 backdrop-blur-md rounded-full border border-yellow-400/30 mb-4">
                  <Crown className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 text-sm font-medium">PREMIUM ONLY</span>
                  <Crown className="w-4 h-4 text-yellow-400" />
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl text-white font-light mb-6 tracking-wide">
                Truth Scrolls
              </h1>
              
              {/* Description */}
              <div className="mb-8">
                <p className="text-white/80 text-lg leading-relaxed font-light mb-4">
                  Ancient wisdom teachings that illuminate the eternal truths about sunlight, health, and consciousness.
                </p>
                <p className="text-yellow-300 text-sm font-medium">
                  ✨ 10 sacred scrolls containing timeless wisdom from the masters
                </p>
              </div>

              {/* Preview features */}
              <div className="grid grid-cols-1 gap-3 mb-8 text-left">
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  <span className="text-white text-sm">Sacred teachings on myth and truth</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-white text-sm">Wisdom from ancient masters across civilizations</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span className="text-white text-sm">Contemplative scrolling experience</span>
                </div>
              </div>

              {/* Upgrade button */}
              <button
                onClick={onUpgrade || (() => {})}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-medium py-4 px-6 rounded-2xl transition-all duration-300 shadow-[0_0_30px_rgba(251,191,36,0.4)] hover:shadow-[0_0_40px_rgba(251,191,36,0.6)] mb-4"
              >
                <div className="flex items-center justify-center gap-2">
                  <Crown className="w-5 h-5" />
                  <span>Unlock Sacred Wisdom</span>
                </div>
              </button>

              {/* Pricing hint */}
              <p className="text-white/60 text-xs">
                Enter the circle of solar wisdom • Premium access required
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentScroll) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-hidden">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
      >
        <X className="w-5 h-5" />
      </button>


      {/* Main scroll container */}
      <div 
        className="h-full flex items-center justify-center p-6 relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Navigation arrows for desktop */}
        <button
          onClick={prevScroll}
          disabled={currentIndex === 0}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextScroll}
          disabled={currentIndex === filteredScrolls.length - 1}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Truth scroll card */}
        <div className="max-w-md w-full h-[80vh] relative">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-orange-500/10 to-red-500/20 rounded-3xl blur-xl" />
          
          {/* Main card */}
          <div className="relative h-full bg-gradient-to-br from-yellow-500/5 to-orange-500/5 backdrop-blur-xl border border-yellow-400/30 rounded-3xl p-8 flex flex-col justify-between shadow-[0_0_60px_rgba(251,191,36,0.3)]">
            
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/20 backdrop-blur-md rounded-full border border-yellow-400/30 mb-4">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 text-sm font-medium">SACRED TEACHING</span>
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </div>
              
              <div className="text-yellow-400/80 text-xs uppercase tracking-wider font-semibold mb-2">
                {currentScroll.category}
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col justify-center space-y-8">
              {/* Myth section */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/20 rounded-full border border-red-400/30 mb-4">
                  <span className="text-red-400 text-xs font-bold uppercase tracking-wider">MYTH</span>
                </div>
                <p className="text-red-300 text-lg font-light leading-relaxed">
                  "{currentScroll.myth}"
                </p>
              </div>

              {/* VS divider */}
              <div className="text-center">
                <div className="inline-flex items-center gap-3">
                  <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-yellow-400/50" />
                  <div className="text-yellow-400 font-bold text-xl">VS</div>
                  <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-yellow-400/50" />
                </div>
              </div>

              {/* Truth section */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full border border-green-400/30 mb-4">
                  <span className="text-green-400 text-xs font-bold uppercase tracking-wider">TRUTH</span>
                </div>
                <p className="text-green-300 text-lg font-light leading-relaxed">
                  "{currentScroll.truth}"
                </p>
              </div>
            </div>

            {/* Ancient wisdom footer */}
            <div className="text-center mt-8">
              <div className="bg-yellow-400/10 backdrop-blur-md rounded-2xl p-4 border border-yellow-400/20">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 text-xs font-medium uppercase tracking-wider">Ancient Wisdom</span>
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                </div>
                <p className="text-yellow-300 text-sm font-light italic leading-relaxed">
                  {currentScroll.truth}
                </p>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="flex justify-center gap-1 mt-6">
              {filteredScrolls.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-yellow-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]' 
                      : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Swipe hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-xs text-center">
        <p>Swipe left/right or use arrows • {currentIndex + 1}/{filteredScrolls.length}</p>
      </div>
    </div>
  );
}
