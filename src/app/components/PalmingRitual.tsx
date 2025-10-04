"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";

interface PalmingRitualProps {
  onComplete: () => void;
  onClose: () => void;
  onExtendPalming?: () => void; // For continuing to extended solar palming
  onBarefootWalking?: () => void; // For continuing to barefoot walking
  playPalmingInstructions?: () => void; // Emily's voice instructions
  playBarefootPrompt?: () => void; // Emily's barefoot walking prompt
  playPalmWarmingGuidance?: () => void; // Voice guidance for palm warming stage
  playEyeSanctuaryGuidance?: () => void; // Voice guidance for eye sanctuary stage
  playInnerSunGuidance?: () => void; // Voice guidance for inner sun meditation
  stopVoice?: () => void; // Stop current voice before playing new one
}

export function PalmingRitual({ onComplete, onClose, onExtendPalming, onBarefootWalking, playPalmingInstructions, playBarefootPrompt, playPalmWarmingGuidance, playEyeSanctuaryGuidance, playInnerSunGuidance, stopVoice }: PalmingRitualProps) {
  const [stage, setStage] = useState<'instruction' | 'rubbing' | 'palming' | 'completed'>('instruction');
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute automatic palming
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Auto-play Emily's instructions when component mounts
  useEffect(() => {
    if (playPalmingInstructions) {
      // Small delay to let the component render
      setTimeout(() => {
        playPalmingInstructions();
      }, 500);
    }
  }, [playPalmingInstructions]);

  useEffect(() => {
    if (stage === 'rubbing') {
      // Play palm warming guidance when rubbing starts
      if (playPalmWarmingGuidance) {
        setTimeout(() => {
          // Stop any current voice before playing new one
          if (stopVoice) stopVoice();
          playPalmWarmingGuidance();
        }, 800); // Small delay after animation starts
      }

      // 5-second rubbing animation
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setStage('palming');
            setIsTimerActive(true);
            return 100;
          }
          return prev + 2; // 2% every 100ms = 5 seconds total
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [stage, playPalmWarmingGuidance]);

  // 1-minute palming timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isTimerActive && stage === 'palming' && timeLeft > 0) {
      // Play eye sanctuary guidance at the beginning of palming
      if (timeLeft === 60 && playEyeSanctuaryGuidance) {
        setTimeout(() => {
          // Stop any current voice before playing new one
          if (stopVoice) stopVoice();
          playEyeSanctuaryGuidance();
        }, 1000);
      }
      
      // Play inner sun meditation guidance halfway through (30 seconds)
      if (timeLeft === 30 && playInnerSunGuidance) {
        setTimeout(() => {
          // Stop any current voice before playing new one
          if (stopVoice) stopVoice();
          playInnerSunGuidance();
        }, 1000);
      }

      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setStage('completed');
            setIsTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, stage, timeLeft, playEyeSanctuaryGuidance, playInnerSunGuidance]);

  const handleStartRubbing = () => {
    // Stop any current voice before starting rubbing
    if (stopVoice) stopVoice();
    setStage('rubbing');
    setProgress(0);
  };

  const handleComplete = () => {
    onComplete();
  };

  const handleExtendPalming = () => {
    if (onExtendPalming) {
      onExtendPalming();
    }
  };

  const handleBarefootWalking = () => {
    if (onBarefootWalking) {
      onBarefootWalking();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const remainingSecs = seconds % 60;
    return `${mins}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-50 p-6">
      <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-[0_8px_32px_rgba(255,255,255,0.1)] max-w-md w-full relative">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {stage === 'instruction' && (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400/30 to-orange-400/30 flex items-center justify-center mx-auto mb-6">
              <div className="text-yellow-200 text-2xl">🤲</div>
            </div>
            
            <h3 className="text-white text-xl font-light mb-6 drop-shadow-lg">
              Palming Ritual
            </h3>
            
            <div className="space-y-4 text-white text-sm font-light leading-relaxed mb-8">
              <p className="italic tracking-wide">
                "Rub your palms together vigorously.
              </p>
              <p className="italic tracking-wide">
                Place them over your eyes.
              </p>
              <p className="italic tracking-wide">
                The light is sealed inside.
              </p>
              <p className="italic tracking-wide font-medium">
                See the inner sun glowing on your eyelids."
              </p>
            </div>

            <Button
              onClick={handleStartRubbing}
              className="bg-gradient-to-r from-yellow-400/30 to-orange-400/30 hover:from-yellow-400/40 hover:to-orange-400/40 text-white border border-yellow-400/30 backdrop-blur-xl rounded-2xl px-8 py-3 transition-all duration-300 font-light tracking-wide shadow-[0_4px_20px_rgba(255,200,0,0.2)]"
            >
              Begin Palming
            </Button>
          </div>
        )}

        {stage === 'rubbing' && (
          <div className="text-center">
            <h3 className="text-white text-xl font-light mb-6 drop-shadow-lg">
              Rub Your Palms Together
            </h3>
            
            {/* Animated glowing hands */}
            <div className="relative mb-8">
              <div className="flex justify-center items-center space-x-4">
                {/* Left hand */}
                <div 
                  className={`w-16 h-20 rounded-full bg-gradient-to-br from-yellow-400/40 to-orange-400/40 shadow-[0_0_30px_rgba(255,200,0,0.6)] transition-all duration-500 ${
                    progress > 0 ? 'animate-pulse' : ''
                  }`}
                  style={{
                    transform: `translateX(${Math.sin(progress / 10) * 5}px)`,
                    boxShadow: `0 0 ${20 + progress / 3}px rgba(255, 200, 0, ${0.4 + progress / 200})`
                  }}
                />
                
                {/* Right hand */}
                <div 
                  className={`w-16 h-20 rounded-full bg-gradient-to-br from-yellow-400/40 to-orange-400/40 shadow-[0_0_30px_rgba(255,200,0,0.6)] transition-all duration-500 ${
                    progress > 0 ? 'animate-pulse' : ''
                  }`}
                  style={{
                    transform: `translateX(${Math.sin(progress / 10 + Math.PI) * 5}px)`,
                    boxShadow: `0 0 ${20 + progress / 3}px rgba(255, 200, 0, ${0.4 + progress / 200})`
                  }}
                />
              </div>
              
              {/* Friction effect */}
              {progress > 20 && (
                <div className="absolute inset-0 flex justify-center items-center">
                  <div 
                    className="w-2 h-2 bg-white rounded-full animate-ping"
                    style={{
                      opacity: progress / 100,
                      animationDuration: '0.5s'
                    }}
                  />
                </div>
              )}
            </div>

            {/* Progress bar */}
            <div className="w-full bg-white/20 rounded-full h-2 mb-6">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-white text-sm font-light italic">
              Feel the warmth building in your palms...
            </p>
          </div>
        )}

        {stage === 'palming' && (
          <div className="text-center">
            <h3 className="text-white text-xl font-light mb-4 drop-shadow-lg">
              Solar Palming
            </h3>
            
            {/* Timer display */}
            <div className="text-4xl text-white font-thin mb-6 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] tracking-wider">
              {formatTime(timeLeft)}
            </div>
            
            {/* Eyes with glowing effect */}
            <div className="relative mb-6">
              <div className="flex justify-center items-center space-x-8">
                {/* Left eye */}
                <div className="relative">
                  <div className="w-12 h-8 bg-gradient-to-br from-yellow-400/30 to-orange-400/30 rounded-full border-2 border-yellow-400/40" />
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/60 to-orange-400/60 rounded-full animate-pulse" />
                </div>
                
                {/* Right eye */}
                <div className="relative">
                  <div className="w-12 h-8 bg-gradient-to-br from-yellow-400/30 to-orange-400/30 rounded-full border-2 border-yellow-400/40" />
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/60 to-orange-400/60 rounded-full animate-pulse" />
                </div>
              </div>
              
              {/* Glowing aura around eyes */}
              <div className="absolute inset-0 bg-gradient-radial from-yellow-400/20 to-transparent rounded-full animate-pulse" 
                style={{
                  background: 'radial-gradient(circle, rgba(255, 200, 0, 0.2) 0%, transparent 70%)'
                }}
              />
            </div>

            {/* Progress circle */}
            <div className="relative w-16 h-16 mx-auto mb-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/20"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-yellow-400"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="100, 100"
                  strokeDashoffset={100 - ((60 - timeLeft) / 60) * 100}
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  style={{
                    transition: 'stroke-dashoffset 0.3s ease'
                  }}
                />
              </svg>
            </div>

            <div className="space-y-3 text-white text-sm font-light leading-relaxed">
            </div>
          </div>
        )}

        {stage === 'completed' && (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400/30 to-orange-400/30 flex items-center justify-center mx-auto mb-6">
              <div className="text-yellow-200 text-2xl">✨</div>
            </div>
            
            <h3 className="text-white text-xl font-light mb-6 drop-shadow-lg">
              Palming Complete
            </h3>
            
            <div className="space-y-4 text-white text-sm font-light leading-relaxed mb-8">
              <p className="italic tracking-wide">
                "The light is now sealed within your being."
              </p>
              <p className="italic tracking-wide">
                "Would you like to continue with extended solar palming?"
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleComplete}
                className="flex-1 bg-white/20 hover:bg-white/30 text-white border border-white/20 backdrop-blur-xl rounded-2xl px-6 py-3 transition-all duration-300 font-light tracking-wide"
              >
                End Practice
              </Button>
              
              {onExtendPalming && (
                <Button
                  onClick={handleExtendPalming}
                  className="flex-1 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 hover:from-yellow-400/40 hover:to-orange-400/40 text-white border border-yellow-400/30 backdrop-blur-xl rounded-2xl px-6 py-3 transition-all duration-300 font-light tracking-wide shadow-[0_4px_20px_rgba(255,200,0,0.2)]"
                >
                  Continue Palming
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
