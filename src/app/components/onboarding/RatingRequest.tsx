"use client";

import React, { useState } from 'react';
import { Star, ChevronRight, MessageCircle } from 'lucide-react';

interface RatingRequestProps {
  data: any;
  updateData: (section: string, data: any) => void;
  onNext: () => void;
  onPrev: () => void;
  currentStep: number;
  totalSteps: number;
}

export function RatingRequest({ data, updateData, onNext }: RatingRequestProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = () => {
    updateData('rating', rating);
    if (comment.trim()) {
      updateData('ratingComment', comment);
    }
    onNext();
  };

  const handleSkip = () => {
    onNext();
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-display-2xl text-white font-bold mb-2">Help Others Discover Transformation</h1>
        <p className="text-body-md text-white/90">Your feedback helps other seekers find their path</p>
      </div>

      {/* Rating Card */}
      <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-[0_4px_16px_rgba(0,0,0,0.3)] mb-8">
        {/* Question */}
        <h2 className="text-title-lg text-white font-semibold mb-6 text-center">
          How likely are you to recommend Solar Oracle to others?
        </h2>

        {/* Star Rating */}
        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="transition-all duration-200 hover:scale-110"
            >
              <Star
                className={`w-12 h-12 ${
                  star <= (hoveredRating || rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-white/30'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Rating Labels */}
        <div className="flex justify-between text-caption text-white/80 mb-8">
          <span>Not likely</span>
          <span>Extremely likely</span>
        </div>

        {/* Comment Section */}
        {rating > 0 && (
          <div className="space-y-4">
            <label className="block text-label text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
              Share what excites you most about this journey (optional)
            </label>
            <div className="relative">
              <MessageCircle className="absolute left-3 top-3 w-5 h-5 text-white/80" />
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black/40 backdrop-blur-md border border-white/10 hover:bg-black/50 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent transition-colors duration-300 resize-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                rows={4}
                placeholder="What are you most excited about? What drew you to solar practices?"
              />
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-4">
        {rating > 0 && (
          <button
            onClick={handleSubmit}
            className="w-full p-4 bg-black/40 backdrop-blur-lg border border-white/10 hover:bg-black/50 rounded-xl text-white transition-colors duration-300 flex items-center justify-center gap-3 shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
          >
            <span className="text-body-md font-medium">Submit Rating</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        <button
          onClick={handleSkip}
          className="w-full p-3 text-caption text-white/80 hover:text-white transition-colors"
        >
          Skip for now
        </button>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-24 h-24 bg-yellow-400/10 rounded-full blur-2xl" />
        <div className="absolute bottom-1/3 right-1/3 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl" />
      </div>
    </div>
  );
}
