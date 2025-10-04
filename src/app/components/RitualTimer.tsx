"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Play, Pause, RotateCcw, ArrowLeft, ArrowRight } from "lucide-react";

interface RitualTimerProps {
  ritualType: 'palming' | 'barefoot';
  onComplete?: () => void;
  onBack?: () => void;
}

export function RitualTimer({ ritualType, onComplete, onBack }: RitualTimerProps) {
  const [timeLeft, setTimeLeft] = useState(300); // Default 5 minutes for palming
  const [initialTime, setInitialTime] = useState(300);
  const [isActive, setIsActive] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const ritualConfig = {
    palming: {
      title: "Solar Palming",
      subtitle: "Remove sun spots after gazing",
      description: "Gaze upon the inner sun within your palms, eyes closed. Clear the spots and restore sacred vision.",
      durations: [180, 300, 600], // 3, 5, 10 minutes
      defaultDuration: 300,
      icon: "○"
    },
    barefoot: {
      title: "Barefoot Walk",
      subtitle: "Earth connection grounding",
      description: "Ground excess light energy through direct connection with the earth.",
      durations: [600, 900, 1200, 1800, 2640], // 10, 15, 20, 30, 44 minutes
      defaultDuration: 600,
      icon: "⟐"
    }
  };

  const config = ritualConfig[ritualType];

  useEffect(() => {
    setTimeLeft(config.defaultDuration);
    setInitialTime(config.defaultDuration);
  }, [config.defaultDuration]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            handleRitualComplete();
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

  const handleRitualComplete = () => {
    setJustCompleted(true);
    setTimeout(() => {
      setJustCompleted(false);
      if (onComplete) {
        onComplete();
      }
    }, 3000);
  };

  const handleStart = () => {
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
      return ritualType === 'palming' 
        ? 'Vision restored - ready for grounding'
        : 'Grounding complete - energy balanced';
    }
    
    if (isActive) {
      return ritualType === 'palming'
        ? 'Gazing into the inner sun...'
        : 'Connecting with earth energy...';
    }
    
    return config.description;
  };

  const progress = ((initialTime - timeLeft) / initialTime) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      <div className="px-6 pt-6 pb-24">
        {/* Header */}
        <div className="mb-6">
          <div 
            onClick={onBack}
            className="mb-4 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-4 shadow-lg cursor-pointer hover:from-blue-500/15 hover:to-indigo-500/15 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center border border-blue-400/30">
                <ArrowLeft className="w-4 h-4 text-blue-400" />
              </div>
              <span className="text-body-md text-white font-medium">Back to Rituals</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-8 shadow-lg w-full max-w-md mx-auto">
          {/* Ritual Icon and Title */}
          <div className="text-center mb-6">
            <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center border ${
              ritualType === 'palming' 
                ? 'bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border-orange-400/30' 
                : 'bg-gradient-to-br from-green-500/20 to-blue-500/20 border-green-400/30'
            }`}>
              <div className={`text-2xl ${
                ritualType === 'palming' ? 'text-orange-400' : 'text-green-400'
              }`}>
                {config.icon}
              </div>
            </div>
            <h2 className="text-title-md text-white font-semibold mb-2">
              {config.title}
            </h2>
            <p className="text-body-sm text-white/60">
              {config.subtitle}
            </p>
          </div>

          {/* Time display */}
          <div className="text-center mb-8">
            <div className="text-display-4xl text-white font-bold mb-3 tracking-wider">
              {formatTime(timeLeft)}
            </div>
            <p className="text-body-sm text-white/70 italic">
              {getSacredMessage()}
            </p>
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
              <button
                onClick={handleStart}
                className="flex-1 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30 text-white border border-blue-400/30 backdrop-blur-xl rounded-2xl py-3 transition-all duration-300 font-medium tracking-wide shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={timeLeft === 0}
              >
                <div className="flex items-center justify-center gap-2">
                  <Play className="w-4 h-4" />
                  <span className="text-body-md">Begin Ritual</span>
                </div>
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="flex-1 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30 text-white border border-blue-400/30 backdrop-blur-xl rounded-2xl py-3 transition-all duration-300 font-medium tracking-wide shadow-lg"
              >
                <div className="flex items-center justify-center gap-2">
                  <Pause className="w-4 h-4" />
                  <span className="text-body-md">Pause</span>
                </div>
              </button>
            )}
            
            <button
              onClick={handleReset}
              className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 hover:from-blue-500/20 hover:to-indigo-500/20 text-white border border-blue-400/20 backdrop-blur-xl rounded-2xl px-6 py-3 transition-all duration-300 font-medium tracking-wide shadow-lg"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Duration Options */}
          <div>
            <div className="text-center mb-4">
              <p className="text-label text-white/60">Duration</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {config.durations.map((seconds) => (
                <button
                  key={seconds}
                  onClick={() => handleTimeSelect(seconds)}
                  className={`py-3 px-2 rounded-2xl text-body-sm font-medium tracking-wide transition-all duration-300 ${
                    initialTime === seconds
                      ? 'bg-gradient-to-br from-blue-500/30 to-indigo-500/30 text-white border border-blue-400/40 shadow-lg'
                      : 'bg-gradient-to-br from-blue-500/10 to-indigo-500/10 text-white hover:from-blue-500/20 hover:to-indigo-500/20 border border-blue-400/20'
                  } ${isActive ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} backdrop-blur-xl`}
                  disabled={isActive}
                >
                  {formatTime(seconds)}
                </button>
              ))}
            </div>
          </div>

          {/* Next Ritual Hint */}
          {justCompleted && ritualType === 'palming' && (
            <div className="mt-6 text-center">
              <p className="text-label text-white/60 mb-2">Next Ritual</p>
              <div className="flex items-center justify-center text-body-sm text-white">
                <span>Barefoot Walk</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
