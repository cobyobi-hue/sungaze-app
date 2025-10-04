"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Play, Pause, RotateCcw, Settings, Lock, Volume2, VolumeX, Loader2 } from "lucide-react";
import { usePremiumFeatures } from "../hooks/usePremiumFeatures";
import { useVoice } from "../hooks/useVoice";
import { FREE_TIER_LIMITS } from "../types/subscription";

// Import premium components
import CloudGazingMode from "./ritual-modes/CloudGazingMode";
import CandleGazingMode from "./ritual-modes/CandleGazingMode";
import BarefootWalkMode from "./ritual-modes/BarefootWalkMode";
import PremiumSoundscapes from "./audio/PremiumSoundscapes";
import UpgradePromptModal from "./premium/UpgradePromptModal";

export type RitualMode = 'standard' | 'cloud_gazing' | 'candle_gazing' | 'barefoot_walk';

interface PremiumRitualTimerProps {
  onTimerChange?: (isActive: boolean, progress: number) => void;
  onComplete?: (duration: number) => void;
  userId?: string;
}

export function PremiumRitualTimer({ 
  onTimerChange, 
  onComplete, 
  userId = 'test-user-1' 
}: PremiumRitualTimerProps) {
  // Premium features integration
  const { 
    checkFeatureAccess, 
    isFreeTier, 
    isPremiumTier,
    userProfile 
  } = usePremiumFeatures(userId);

  // Voice integration
  const { 
    voiceState, 
    initializeVoice, 
    playVoice, 
    pauseVoice, 
    stopVoice, 
    playCompletionMessage 
  } = useVoice();

  // Timer state
  const getInitialTime = () => {
    return isFreeTier ? FREE_TIER_LIMITS.timerMaxDuration : 300; // 1 min free, 5 min premium default
  };

  const [timeLeft, setTimeLeft] = useState(getInitialTime());
  const [initialTime, setInitialTime] = useState(getInitialTime());
  const [isActive, setIsActive] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Premium features state
  const [ritualMode, setRitualMode] = useState<RitualMode>('standard');
  const [selectedSoundscape, setSelectedSoundscape] = useState<string>('silence');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [requestedFeature, setRequestedFeature] = useState<string>('');
  const [showPreparationInstructions, setShowPreparationInstructions] = useState(false);

  // Update initial time when user profile changes
  useEffect(() => {
    const newInitialTime = getInitialTime();
    setInitialTime(newInitialTime);
    setTimeLeft(newInitialTime);
  }, [isFreeTier]);

  // Timer logic
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            handlePracticeComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft]);

  // Progress reporting
  useEffect(() => {
    if (onTimerChange) {
      const progress = ((initialTime - timeLeft) / initialTime) * 100;
      onTimerChange(isActive, progress);
    }
  }, [isActive, timeLeft, initialTime, onTimerChange]);

  const handlePracticeComplete = async () => {
    setJustCompleted(true);
    
    // Play completion message
    try {
      await playCompletionMessage();
    } catch (error) {
      console.error('Failed to play completion message:', error);
    }
    
    setTimeout(() => {
      setJustCompleted(false);
      if (onComplete) {
        onComplete(initialTime);
      }
    }, 5000); // Extended time for voice message
  };

  const handleBack = () => {
    setIsActive(false);
    setRitualMode('standard');
  };

  const handleStart = async () => {
    setShowPreparationInstructions(true);
    // Initialize and play voice when "Begin Practice" is pressed
    if (!voiceState.isReady && !voiceState.isLoading) {
      try {
        await initializeVoice(true); // Auto-play preparation instructions
      } catch (error) {
        console.error('Voice initialization failed:', error);
      }
    } else if (voiceState.isReady) {
      playVoice();
    }
  };

  const handleBeginRitual = () => {
    setShowPreparationInstructions(false);
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(initialTime);
  };

  const handleTimeSelect = (seconds: number) => {
    if (!isActive) {
      // Check if user can use unlimited timer
      if (seconds > FREE_TIER_LIMITS.timerMaxDuration && isFreeTier) {
        showUpgradePrompt('unlimited_timer');
        return;
      }
      
      setInitialTime(seconds);
      setTimeLeft(seconds);
    }
  };

  const handleRitualModeSelect = (mode: RitualMode) => {
    if (mode !== 'standard') {
      const featureMap = {
        'cloud_gazing': 'cloud_gazing',
        'candle_gazing': 'candle_gazing', 
        'barefoot_walk': 'barefoot_walk'
      };
      
      const access = checkFeatureAccess(featureMap[mode]);
      if (!access.hasAccess) {
        showUpgradePrompt(featureMap[mode]);
        return;
      }
    }
    
    setRitualMode(mode);
  };

  const showUpgradePrompt = (featureId: string) => {
    setRequestedFeature(featureId);
    setShowUpgradeModal(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const remainingSecs = seconds % 60;
    
    if (mins === 0) {
      return `${remainingSecs}s`;
    }
    return `${mins}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  // Generate time options based on subscription tier
  const getTimeOptions = () => {
    if (isFreeTier) {
      return [FREE_TIER_LIMITS.timerMaxDuration]; // Only 1 minute for free
    }
    
    // Premium users get various options
    return [60, 300, 600, 900, 1200, 1800, 2700]; // 1min, 5min, 10min, 15min, 20min, 30min, 45min
  };

  const getSacredMessage = () => {
    if (justCompleted) {
      return 'Practice complete - light integrated into your being';
    }
    
    if (isActive) {
      const modeMessages = {
        'standard': 'Sacred meditation in progress...',
        'cloud_gazing': 'Drifting with clouds in endless sky...',
        'candle_gazing': 'Gazing into the flame of awareness...',
        'barefoot_walk': 'Connecting with earth\'s grounding energy...'
      };
      return modeMessages[ritualMode];
    }
    
    return isPremiumTier 
      ? 'Choose your ritual path and begin your practice'
      : 'Begin your meditation practice';
  };

  const progress = ((initialTime - timeLeft) / initialTime) * 100;

  return (
    <>
      {/* Ritual Mode Visual Overlays */}
      <CloudGazingMode 
        isActive={isActive && ritualMode === 'cloud_gazing'} 
        duration={initialTime}
        onComplete={handlePracticeComplete}
        onBack={handleBack}
      />
      <CandleGazingMode 
        isActive={isActive && ritualMode === 'candle_gazing'} 
        duration={initialTime}
        onComplete={handlePracticeComplete}
        onBack={handleBack}
      />
      <BarefootWalkMode 
        isActive={isActive && ritualMode === 'barefoot_walk'} 
        duration={initialTime}
        onComplete={handlePracticeComplete}
        onBack={handleBack}
      />

      {/* Main Timer Interface */}
      <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-[0_8px_32px_rgba(255,255,255,0.1)] relative">
        
        {/* Sacred Preparation Instructions Overlay */}
        {showPreparationInstructions && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl rounded-3xl flex flex-col items-center justify-center p-6 z-10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400/30 to-orange-400/30 flex items-center justify-center mx-auto mb-6">
                <div className="text-yellow-200 text-2xl">☉</div>
              </div>
              <h3 className="text-white text-xl font-light mb-4 drop-shadow-lg">
                Sacred Preparation
              </h3>
              
              {/* Voice Controls */}
              <div className="mb-6">
                {voiceState.isLoading && (
                  <div className="flex items-center justify-center gap-2 text-white text-sm">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Preparing sacred voice...</span>
                  </div>
                )}
                
                {voiceState.error && (
                  <div className="text-red-300/80 text-xs mb-2">
                    Voice unavailable: {voiceState.error}
                  </div>
                )}

                {voiceState.isReady && !voiceState.error && (
                  <div className="text-blue-300/80 text-xs mb-2">
                    🔔 Sacred meditation chimes ready
                  </div>
                )}
                
                {voiceState.isReady && (
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <Button
                      onClick={voiceState.isPlaying ? pauseVoice : playVoice}
                      className="bg-white/20 hover:bg-white/30 text-white border border-white/20 backdrop-blur-xl rounded-2xl p-3 transition-all duration-300"
                    >
                      {voiceState.isPlaying ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </Button>
                    <div className="text-white text-xs">
                      {voiceState.isPlaying ? 'Playing sacred guidance...' : 'Click to hear sacred guidance'}
                    </div>
                  </div>
                )}
                
                {voiceState.isPlaying && (
                  <div className="w-48 bg-white/20 rounded-full h-1 mx-auto mb-4">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-orange-400 h-1 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${(voiceState.currentTime / voiceState.duration) * 100}%` 
                      }}
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-4 text-white/90 text-sm font-light leading-relaxed">
                <p className="italic tracking-wide">
                  &quot;Place your phone on the ground, on your shoes.
                </p>
                <p className="italic tracking-wide">
                  Step barefoot onto the earth.
                </p>
                <p className="italic tracking-wide">
                  The phone is not your master here.
                </p>
                <p className="italic tracking-wide font-medium">
                  The sun is.&quot;
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={() => {
                  setShowPreparationInstructions(false);
                  stopVoice();
                }}
                className="bg-white/20 hover:bg-white/30 text-white border border-white/20 backdrop-blur-xl rounded-2xl px-6 py-3 transition-all duration-300 font-light tracking-wide"
              >
                Back
              </Button>
              <Button
                onClick={() => {
                  handleBeginRitual();
                  stopVoice();
                }}
                className="bg-gradient-to-r from-yellow-400/30 to-orange-400/30 hover:from-yellow-400/40 hover:to-orange-400/40 text-white border border-yellow-400/30 backdrop-blur-xl rounded-2xl px-8 py-3 transition-all duration-300 font-light tracking-wide shadow-[0_4px_20px_rgba(255,200,0,0.2)]"
              >
                I Am Ready
              </Button>
            </div>
          </div>
        )}

        {/* User Tier Indicator */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              isFreeTier 
                ? 'bg-gray-200 text-gray-700' 
                : 'bg-gradient-to-r from-orange-400 to-yellow-500 text-white'
            }`}>
              {userProfile?.tier === 'founder_444' ? 'Founder' : 
               userProfile?.tier === 'yearly' ? 'Yearly' :
               userProfile?.tier === 'monthly' ? 'Monthly' : 'Free'}
            </div>
            {isPremiumTier && (
              <div className="text-white text-xs opacity-70">
                All features unlocked
              </div>
            )}
          </div>
          
          {isFreeTier && (
            <button
              onClick={() => showUpgradePrompt('premium_access')}
              className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white text-xs font-medium px-3 py-1 rounded-full hover:from-orange-500 hover:to-yellow-600 transition-all duration-200"
            >
              Upgrade
            </button>
          )}
        </div>

        {/* Ritual Mode Selection */}
        <div className="mb-8">
          <div className="text-center mb-4">
            <p className="text-white text-sm font-medium tracking-wider">Ritual Mode</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {/* Standard Mode */}
            <button
              onClick={() => setRitualMode('standard')}
              className={`p-4 rounded-2xl transition-all duration-200 ${
                ritualMode === 'standard'
                  ? 'bg-white/25 border-2 border-white/40'
                  : 'bg-white/10 border border-white/20 hover:bg-white/20'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">🧘</div>
                <div className="text-white text-sm font-medium">Standard</div>
                <div className="text-white text-xs opacity-70">Silent meditation</div>
              </div>
            </button>

            {/* Cloud Gazing */}
            <button
              onClick={() => handleRitualModeSelect('cloud_gazing')}
              className={`p-4 rounded-2xl transition-all duration-200 relative ${
                ritualMode === 'cloud_gazing'
                  ? 'bg-white/25 border-2 border-white/40'
                  : 'bg-white/10 border border-white/20 hover:bg-white/20'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">☁️</div>
                <div className="text-white text-sm font-medium">Cloud Gazing</div>
                <div className="text-white text-xs opacity-70">Sky meditation</div>
                {!checkFeatureAccess('cloud_gazing').hasAccess && (
                  <div className="absolute top-2 right-2">
                    <Lock className="w-3 h-3 text-orange-400" />
                  </div>
                )}
              </div>
            </button>

            {/* Candle Gazing */}
            <button
              onClick={() => handleRitualModeSelect('candle_gazing')}
              className={`p-4 rounded-2xl transition-all duration-200 relative ${
                ritualMode === 'candle_gazing'
                  ? 'bg-white/25 border-2 border-white/40'
                  : 'bg-white/10 border border-white/20 hover:bg-white/20'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">🕯️</div>
                <div className="text-white text-sm font-medium">Candle Gazing</div>
                <div className="text-white text-xs opacity-70">Flame focus</div>
                {!checkFeatureAccess('candle_gazing').hasAccess && (
                  <div className="absolute top-2 right-2">
                    <Lock className="w-3 h-3 text-orange-400" />
                  </div>
                )}
              </div>
            </button>

            {/* Barefoot Walk */}
            <button
              onClick={() => handleRitualModeSelect('barefoot_walk')}
              className={`p-4 rounded-2xl transition-all duration-200 relative ${
                ritualMode === 'barefoot_walk'
                  ? 'bg-white/25 border-2 border-white/40'
                  : 'bg-white/10 border border-white/20 hover:bg-white/20'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">🦶</div>
                <div className="text-white text-sm font-medium">Barefoot Walk</div>
                <div className="text-white text-xs opacity-70">Earth connection</div>
                {!checkFeatureAccess('barefoot_walk').hasAccess && (
                  <div className="absolute top-2 right-2">
                    <Lock className="w-3 h-3 text-orange-400" />
                  </div>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Main Timer Display */}
        <div className="text-center mb-8">
          <div className="text-6xl text-white font-thin mb-3 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] tracking-wider">
            {formatTime(timeLeft)}
          </div>
          <div className="text-white text-sm font-light italic tracking-wide">
            {getSacredMessage()}
          </div>
        </div>

        {/* Progress Circle */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-white/20"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-white"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="100, 100"
              strokeDashoffset={100 - progress}
              strokeLinecap="round"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              style={{
                transition: 'stroke-dashoffset 0.3s ease'
              }}
            />
          </svg>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center gap-3 mb-8">
          {!isActive ? (
            <Button
              onClick={handleStart}
              className="flex-1 bg-white/20 hover:bg-white/30 text-white border border-white/20 backdrop-blur-xl rounded-2xl py-3 transition-all duration-300 font-light tracking-wide shadow-[0_4px_20px_rgba(255,255,255,0.1)]"
              disabled={timeLeft === 0}
            >
              <Play className="w-4 h-4 mr-2" />
              Begin Ritual
            </Button>
          ) : (
            <Button
              onClick={handlePause}
              className="flex-1 bg-white/20 hover:bg-white/30 text-white border border-white/20 backdrop-blur-xl rounded-2xl py-3 transition-all duration-300 font-light tracking-wide shadow-[0_4px_20px_rgba(255,255,255,0.1)]"
            >
              <Pause className="w-4 h-4 mr-2" />
              Pause
            </Button>
          )}
          
          <Button
            onClick={handleReset}
            className="bg-white/15 hover:bg-white/25 text-white border border-white/15 backdrop-blur-xl rounded-2xl px-6 py-3 transition-all duration-300 font-light tracking-wide"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {/* Duration Selection */}
        <div className="mb-8">
          <div className="text-center mb-4">
            <p className="text-white text-sm font-medium tracking-wider">Duration</p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {getTimeOptions().map((seconds) => (
              <button
                key={seconds}
                onClick={() => handleTimeSelect(seconds)}
                className={`py-3 px-2 rounded-2xl text-xs font-light tracking-wide transition-all duration-300 relative ${
                  initialTime === seconds
                    ? 'bg-white/25 text-white shadow-[0_4px_20px_rgba(255,255,255,0.15)]'
                    : 'bg-white/10 text-white hover:bg-white/20'
                } ${isActive ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} backdrop-blur-xl border border-white/10`}
                disabled={isActive}
              >
                {formatTime(seconds)}
                {seconds > FREE_TIER_LIMITS.timerMaxDuration && isFreeTier && (
                  <div className="absolute top-1 right-1">
                    <Lock className="w-3 h-3 text-orange-400" />
                  </div>
                )}
              </button>
            ))}
          </div>
          
          {isFreeTier && (
            <div className="mt-4 text-center">
              <p className="text-white text-xs opacity-70 mb-2">
                Free tier limited to 1-minute sessions
              </p>
              <button
                onClick={() => showUpgradePrompt('unlimited_timer')}
                className="text-orange-400 text-xs font-medium hover:text-orange-300 underline"
              >
                Unlock longer sessions
              </button>
            </div>
          )}
        </div>

        {/* Premium Soundscapes */}
        <div className="mb-6">
          <div className="text-center mb-4">
            <p className="text-white text-sm font-medium tracking-wider">Soundscape</p>
          </div>
          
          <PremiumSoundscapes
            selectedSoundscape={selectedSoundscape}
            onSoundscapeChange={setSelectedSoundscape}
            isPlaying={isActive}
            userId={userId}
            showUpgradePrompt={showUpgradePrompt}
          />
        </div>

        {/* Tier Benefits Display */}
        {isFreeTier && (
          <div className="bg-gradient-to-r from-orange-400/20 to-yellow-500/20 backdrop-blur-xl rounded-2xl p-4 border border-orange-300/30">
            <div className="text-center">
              <h4 className="text-white font-medium mb-2">Unlock Premium Rituals</h4>
              <p className="text-white text-sm opacity-80 mb-3">
                Access cloud gazing, candle meditation, barefoot walks, and premium soundscapes
              </p>
              <button
                onClick={() => showUpgradePrompt('premium_access')}
                className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white text-sm font-medium px-6 py-2 rounded-xl hover:from-orange-500 hover:to-yellow-600 transition-all duration-200"
              >
                Upgrade to Ritual Pack
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Upgrade Modal */}
      <UpgradePromptModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        featureId={requestedFeature}
        userTier={userProfile?.tier || 'free'}
        onUpgrade={(tier) => {
          // In real app, would redirect to payment flow
          console.log(`Upgrade to ${tier} requested`);
        }}
      />
    </>
  );
}