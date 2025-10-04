"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Loader2, Cloud, Sun } from "lucide-react";
import { useVoice } from "../hooks/useVoice";

interface CloudGazingTimerProps {
  onTimerChange: (isActive: boolean, progress: number) => void;
  onComplete?: () => void;
}

export function CloudGazingTimer({ onTimerChange, onComplete }: CloudGazingTimerProps) {
  const [timeLeft, setTimeLeft] = useState(60); // Start with 1 minute for cloud gazing
  const [initialTime, setInitialTime] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);
  const [currentDay, setCurrentDay] = useState(1);
  const [showPreGazingInstructions, setShowPreGazingInstructions] = useState(false);
  const [cloudCoverDetected, setCloudCoverDetected] = useState(true); // Simulate cloud detection
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Voice integration (reusing existing voice system)
  const { voiceState, initializeVoice, playVoice, pauseVoice, stopVoice } = useVoice();

  // Cloud gazing time options (gentler progression)
  const getCloudGazingTimeOptions = () => {
    return [30, 60, 120, 300]; // 30s, 1min, 2min, 5min
  };

  useEffect(() => {
    const progress = ((initialTime - timeLeft) / initialTime) * 100;
    onTimerChange(isActive, progress);
  }, [isActive, timeLeft, initialTime, onTimerChange]);

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

  const handlePracticeComplete = async () => {
    setJustCompleted(true);
    
    // Award Cloud-Gazer Badge (would integrate with milestone system)
    setTimeout(() => {
      setJustCompleted(false);
      if (onComplete) {
        onComplete();
      }
    }, 3000);
  };

  const handleStart = async () => {
    setShowPreGazingInstructions(true);
    // Initialize voice for cloud gazing guidance
    if (!voiceState.isReady && !voiceState.isLoading) {
      await initializeVoice(true);
    } else if (voiceState.isReady) {
      playVoice();
    }
  };

  const handleBeginGazing = () => {
    setShowPreGazingInstructions(false);
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
      setInitialTime(seconds);
      setTimeLeft(seconds);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const remainingSecs = seconds % 60;
    
    if (mins === 0) {
      return `${remainingSecs}s`;
    }
    return `${mins}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const getSacredMessage = () => {
    if (justCompleted) {
      return 'Cloud gazing complete - gentle light absorbed';
    }
    
    if (isActive) {
      return 'Gazing through the sacred veil...';
    }
    
    return 'Cloud-veiled sun practice';
  };

  const progress = ((initialTime - timeLeft) / initialTime) * 100;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white min-h-screen px-6 pt-6 pb-24 relative">
      {/* Cloud Detection Banner */}
      {cloudCoverDetected && (
        <div className="mb-6">
          <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl px-6 py-4 shadow-lg">
            <div className="flex items-center gap-3 text-white text-body-md font-medium">
              <Cloud className="w-5 h-5 text-blue-400" />
              <span>Veiled sun detected behind clouds. Perfect for safe gazing.</span>
            </div>
          </div>
        </div>
      )}

      {/* Pre-Gazing Instructions Overlay */}
      {showPreGazingInstructions && (
        <div className="absolute inset-0 bg-black/90 backdrop-blur-xl rounded-2xl flex flex-col items-center justify-center p-6 z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-6 border border-blue-400/30">
              <Cloud className="text-blue-400 text-2xl w-8 h-8" />
            </div>
            <h3 className="text-title-md text-white font-semibold mb-4">
              Cloud-Gazing Initiation
            </h3>
            
            {/* Voice Controls */}
            <div className="mb-6">
              {voiceState.isLoading && (
                <div className="flex items-center justify-center gap-2 text-white/60 text-body-sm">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Preparing gentle guidance...</span>
                </div>
              )}
              
              {voiceState.error && (
                <div className="text-red-400 text-caption mb-2">
                  Voice unavailable: {voiceState.error}
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
                  <div className="text-white/60 text-caption">
                    {voiceState.isPlaying ? 'Playing gentle guidance...' : 'Click to hear guidance'}
                  </div>
                </div>
              )}
              
              {voiceState.isPlaying && (
                <div className="w-48 bg-white/20 rounded-full h-1 mx-auto mb-4">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-white h-1 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${(voiceState.currentTime / voiceState.duration) * 100}%` 
                    }}
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-4 text-white text-body-sm font-medium leading-relaxed">
              <p className="italic tracking-wide">
                &quot;Find where the sun sits behind the cloud cover.
              </p>
              <p className="italic tracking-wide">
                Gentle trataka — steady gaze upon the veiled light.
              </p>
              <p className="italic tracking-wide">
                The diffused radiance purifies mind and awakens inner vision.&quot;
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={() => {
                setShowPreGazingInstructions(false);
                stopVoice();
              }}
              className="bg-white/20 hover:bg-white/30 text-white border border-white/20 backdrop-blur-xl rounded-2xl px-6 py-3 transition-all duration-300 font-medium tracking-wide"
            >
              Back
            </Button>
            <Button
              onClick={() => {
                handleBeginGazing();
                stopVoice();
              }}
              className="bg-gradient-to-r from-blue-500/30 to-indigo-500/30 hover:from-blue-500/40 hover:to-indigo-500/40 text-white border border-blue-400/30 backdrop-blur-xl rounded-2xl px-8 py-3 transition-all duration-300 font-medium tracking-wide shadow-[0_4px_20px_rgba(59,130,246,0.2)]"
            >
              Begin Gentle Gaze
            </Button>
          </div>
        </div>
      )}

      {/* Completion Celebration */}
      {justCompleted && (
        <div className="absolute inset-0 bg-black/90 backdrop-blur-xl rounded-3xl flex flex-col items-center justify-center p-6 z-20">
          <div className="text-center">
            <div className="mb-8">
              <div className="relative inline-flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-indigo-400/20 blur-3xl scale-150 animate-pulse" />
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/90 to-indigo-500/90 flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.5)] border border-blue-400/30">
                  <Cloud className="text-white text-3xl w-12 h-12" />
                </div>
              </div>
            </div>
            
            <h3 className="text-white text-2xl font-medium mb-4 drop-shadow-lg">
              Cloud-Gazer Badge Unlocked!
            </h3>
            
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 mb-4">
              <h4 className="text-blue-400 text-xl font-medium mb-2">
                Gentle Initiate
              </h4>
              <p className="text-white text-body-sm italic font-medium">
                &quot;Through the veil, wisdom flows gently.&quot;
              </p>
              <p className="text-white/60 text-caption mt-2">
                — Cloud-Gazing Tradition
              </p>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-white/60 text-body-sm">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
              <span>Beginner Achievement</span>
            </div>
          </div>
        </div>
      )}

      {/* Sacred Day Indicator */}
      <div className="text-center mb-6 mt-6">
        <div className="text-white/60 text-caption font-medium tracking-wider mb-2">
          Cloud-Gazing Mode • Gentle Practice
        </div>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto" />
      </div>

      {/* Time display */}
      <div className="text-center mb-8">
        <div className="text-6xl text-white font-thin mb-3 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] tracking-wider">
          {formatTime(timeLeft)}
        </div>
        <div className="text-white/80 text-body-sm font-medium italic tracking-wide">
          {getSacredMessage()}
        </div>
      </div>

      {/* Progress circle */}
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
            className="text-blue-400"
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

      {/* Sacred Control Buttons */}
      <div className="flex justify-center gap-3 mb-8">
        {!isActive ? (
          <Button
            onClick={handleStart}
            className="flex-1 bg-white/20 hover:bg-white/30 text-white border border-white/20 backdrop-blur-xl rounded-2xl py-3 transition-all duration-300 font-medium tracking-wide shadow-[0_4px_20px_rgba(255,255,255,0.1)]"
            disabled={timeLeft === 0}
          >
            <Play className="w-4 h-4 mr-2" />
            Begin Cloud Gaze
          </Button>
        ) : (
          <Button
            onClick={handlePause}
            className="flex-1 bg-white/20 hover:bg-white/30 text-white border border-white/20 backdrop-blur-xl rounded-2xl py-3 transition-all duration-300 font-medium tracking-wide shadow-[0_4px_20px_rgba(255,255,255,0.1)]"
          >
            <Pause className="w-4 h-4 mr-2" />
            Pause
          </Button>
        )}
        
        <Button
          onClick={handleReset}
          className="bg-white/15 hover:bg-white/25 text-white border border-white/15 backdrop-blur-xl rounded-2xl px-6 py-3 transition-all duration-300 font-medium tracking-wide"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Cloud Gazing Time Options */}
      <div className="mb-6">
        <div className="text-center mb-4">
          <p className="text-white/60 text-caption font-medium tracking-wider">Gentle Duration</p>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {getCloudGazingTimeOptions().map((seconds) => (
            <button
              key={seconds}
              onClick={() => handleTimeSelect(seconds)}
              className={`py-3 px-2 rounded-2xl text-body-sm font-medium tracking-wide transition-all duration-300 ${
                initialTime === seconds
                  ? 'bg-blue-500/25 text-white shadow-[0_4px_20px_rgba(59,130,246,0.15)] border border-blue-400/30'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
              } ${isActive ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} backdrop-blur-xl`}
              disabled={isActive}
            >
              {formatTime(seconds)}
              <div className="text-caption opacity-70 mt-1">
                {seconds === 30 ? 'Soft' : seconds === 60 ? 'Calm' : seconds === 120 ? 'Deep' : 'Serene'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Cloud Benefits */}
      <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-xl p-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Cloud className="w-4 h-4 text-blue-400" />
            <span className="text-white font-medium text-body-sm">Cloud Benefits</span>
          </div>
          <p className="text-white/80 text-caption leading-relaxed font-medium">
            Gaze at sun behind clouds • Longer safe sessions • Perfect for beginners • Diffused golden light protects your eyes
          </p>
        </div>
      </div>
    </div>
  );
}
