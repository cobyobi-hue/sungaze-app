"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Cloud, Heart, Sparkles, Volume2, VolumeX, Play, Pause, RotateCcw, Sun, Flame } from 'lucide-react';

interface CloudRitualModeProps {
  onComplete: () => void;
  onJournalOpen: () => void;
}

export function CloudRitualMode({ onComplete, onJournalOpen }: CloudRitualModeProps) {
  const [activeRitual, setActiveRitual] = useState<'orb' | 'candle' | null>(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes default
  const [initialTime, setInitialTime] = useState(300);
  const [isActive, setIsActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [breathCount, setBreathCount] = useState(0);
  const [orbPulse, setOrbPulse] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const breathRef = useRef<NodeJS.Timeout | null>(null);

  const ritualOptions = [
    {
      id: 'orb' as const,
      title: 'Golden Orb Meditation',
      description: 'Inner trataka with breath and light visualization',
      icon: <Sun className="w-6 h-6" />,
      duration: 300
    },
    {
      id: 'candle' as const,
      title: 'Sacred Flame Practice',
      description: 'Candle-gazing substitute with flame animation',
      icon: <Flame className="w-6 h-6" />,
      duration: 600
    }
  ];

  // Breath timing (in seconds)
  const breathTiming = {
    inhale: 4,
    hold: 4,
    exhale: 6,
    pause: 2
  };

  // Main timer effect
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

  // Breathing pattern effect
  useEffect(() => {
    if (isActive && activeRitual === 'orb') {
      const cycleBreathe = () => {
        const phases: Array<typeof breathPhase> = ['inhale', 'hold', 'exhale', 'pause'];
        let currentPhaseIndex = 0;
        let phaseStartTime = Date.now();

        const breathInterval = setInterval(() => {
          const elapsed = (Date.now() - phaseStartTime) / 1000;
          const currentPhase = phases[currentPhaseIndex];
          const phaseDuration = breathTiming[currentPhase];

          if (elapsed >= phaseDuration) {
            currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
            if (currentPhaseIndex === 0) {
              setBreathCount(prev => prev + 1);
            }
            setBreathPhase(phases[currentPhaseIndex]);
            phaseStartTime = Date.now();
          }

          // Update orb pulse based on breath phase
          const phaseProgress = Math.min(elapsed / phaseDuration, 1);
          let pulseValue = 0;

          switch (currentPhase) {
            case 'inhale':
              pulseValue = phaseProgress * 100;
              break;
            case 'hold':
              pulseValue = 100;
              break;
            case 'exhale':
              pulseValue = 100 - (phaseProgress * 100);
              break;
            case 'pause':
              pulseValue = 0;
              break;
          }

          setOrbPulse(pulseValue);
        }, 100);

        breathRef.current = breathInterval;
      };

      cycleBreathe();
    }

    return () => {
      if (breathRef.current) {
        clearInterval(breathRef.current);
      }
    };
  }, [isActive, activeRitual]);

  const handleRitualComplete = () => {
    // Award completion
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  const handleStart = (ritualType: 'orb' | 'candle') => {
    const ritual = ritualOptions.find(r => r.id === ritualType);
    if (ritual) {
      setActiveRitual(ritualType);
      setInitialTime(ritual.duration);
      setTimeLeft(ritual.duration);
      setIsActive(true);
      setBreathCount(0);
    }
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleResume = () => {
    setIsActive(true);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(initialTime);
    setActiveRitual(null);
    setBreathCount(0);
    setOrbPulse(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const remainingSecs = seconds % 60;
    return `${mins}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const getBreathInstruction = () => {
    switch (breathPhase) {
      case 'inhale':
        return 'Breathe in slowly...';
      case 'hold':
        return 'Hold your breath...';
      case 'exhale':
        return 'Breathe out gently...';
      case 'pause':
        return 'Rest quietly...';
    }
  };

  // Ritual selection screen
  if (!activeRitual) {
    return (
      <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-[0_8px_32px_rgba(255,255,255,0.1)]">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400/30 to-indigo-400/30 flex items-center justify-center mx-auto mb-4">
            <Cloud className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-gray-800 text-xl font-medium mb-2">
            Cloud Ritual Mode
          </h3>
          <p className="text-gray-700 text-sm font-medium italic">
            "Even hidden, the sun reaches you."
          </p>
        </div>

        {/* Encouraging Message */}
        <div className="bg-blue-50/50 backdrop-blur-xl border border-blue-200/30 rounded-xl p-6 mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Heart className="w-5 h-5 text-blue-600" />
            <span className="text-blue-800 font-medium">Always Connected</span>
          </div>
          <p className="text-blue-800 text-sm leading-relaxed font-medium">
            The sun's energy flows through clouds, rain, and storms. Your practice continues in all weather, 
            connecting you to the eternal light that shines beyond the veil.
          </p>
        </div>

        {/* Ritual Options */}
        <div className="space-y-4 mb-8">
          {ritualOptions.map((ritual) => (
            <div
              key={ritual.id}
              className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-xl p-6 hover:bg-white/25 transition-all duration-200"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  ritual.id === 'orb' 
                    ? 'bg-gradient-to-br from-orange-400/30 to-yellow-400/30' 
                    : 'bg-gradient-to-br from-red-400/30 to-orange-400/30'
                }`}>
                  {ritual.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-800 font-medium text-base mb-1">
                    {ritual.title}
                  </h4>
                  <p className="text-gray-700 text-sm">
                    {ritual.description}
                  </p>
                </div>
                <div className="text-gray-900 text-sm font-medium">
                  {Math.floor(ritual.duration / 60)}min
                </div>
              </div>
              
              <Button
                onClick={() => handleStart(ritual.id)}
                className={`w-full ${
                  ritual.id === 'orb'
                    ? 'bg-gradient-to-r from-orange-400/30 to-yellow-400/30 hover:from-orange-400/40 hover:to-yellow-400/40 border-orange-400/30'
                    : 'bg-gradient-to-r from-red-400/30 to-orange-400/30 hover:from-red-400/40 hover:to-orange-400/40 border-red-400/30'
                } text-gray-800 border backdrop-blur-xl rounded-2xl py-3 transition-all duration-300 font-medium tracking-wide`}
              >
                <Play className="w-4 h-4 mr-2" />
                Begin {ritual.title}
              </Button>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <Button
          onClick={onComplete}
          className="w-full bg-white/15 hover:bg-white/25 text-gray-800 border border-white/15 backdrop-blur-xl rounded-2xl py-3 transition-all duration-300 font-medium tracking-wide"
        >
          Return to Practice
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-[0_8px_32px_rgba(255,255,255,0.1)]">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-gray-700 text-xs font-medium tracking-wider mb-2">
          Cloud Ritual • {activeRitual === 'orb' ? 'Golden Orb' : 'Sacred Flame'}
        </div>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto" />
      </div>

      {/* Time Display */}
      <div className="text-center mb-8">
        <div className="text-5xl text-gray-900 font-thin mb-3 drop-shadow-[0_0_30px_rgba(0,0,0,0.1)] tracking-wider">
          {formatTime(timeLeft)}
        </div>
        {activeRitual === 'orb' && isActive && (
          <div className="text-gray-700 text-sm font-medium italic">
            {getBreathInstruction()} • Breath {breathCount}
          </div>
        )}
      </div>

      {/* Golden Orb Animation */}
      {activeRitual === 'orb' && (
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Outer glow rings */}
            <div 
              className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-300/20 to-yellow-400/20 blur-3xl animate-pulse"
              style={{
                transform: `scale(${1.5 + (orbPulse / 100) * 0.5})`,
                transition: 'transform 0.3s ease'
              }}
            />
            <div 
              className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400/30 to-yellow-400/30 blur-2xl"
              style={{
                transform: `scale(${1.2 + (orbPulse / 100) * 0.3})`,
                transition: 'transform 0.3s ease'
              }}
            />
            
            {/* Main orb */}
            <div 
              className="relative w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center shadow-[0_0_60px_rgba(255,165,0,0.6)] border border-orange-300/50"
              style={{
                transform: `scale(${0.8 + (orbPulse / 100) * 0.4})`,
                boxShadow: `0 0 ${60 + orbPulse}px rgba(255,165,0,${0.4 + (orbPulse / 100) * 0.3})`,
                transition: 'all 0.3s ease'
              }}
            >
              <Sun className="text-white w-16 h-16" />
            </div>

            {/* Breath phase indicator */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
              <div className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                breathPhase === 'inhale' ? 'bg-green-400/20 text-green-800 border border-green-400/30' :
                breathPhase === 'hold' ? 'bg-yellow-400/20 text-yellow-800 border border-yellow-400/30' :
                breathPhase === 'exhale' ? 'bg-blue-400/20 text-blue-800 border border-blue-400/30' :
                'bg-gray-400/20 text-gray-800 border border-gray-400/30'
              }`}>
                {breathPhase.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Candle Flame Animation */}
      {activeRitual === 'candle' && (
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Candle base */}
            <div className="w-8 h-24 bg-gradient-to-b from-amber-100 to-amber-200 rounded-t-sm mx-auto relative border border-amber-300/50">
              {/* Wax drips */}
              <div className="absolute top-0 left-1 w-1 h-3 bg-amber-200 rounded-full opacity-60" />
              <div className="absolute top-2 right-1 w-1 h-2 bg-amber-200 rounded-full opacity-40" />
            </div>
            
            {/* Flame */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div 
                className="w-6 h-8 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full animate-pulse"
                style={{
                  clipPath: 'ellipse(50% 60% at 50% 70%)',
                  animation: 'flame 2s ease-in-out infinite'
                }}
              />
              {/* Inner flame */}
              <div 
                className="absolute top-1 left-1/2 transform -translate-x-1/2 w-3 h-5 bg-gradient-to-t from-red-400 to-yellow-300 rounded-full opacity-80"
                style={{
                  clipPath: 'ellipse(50% 60% at 50% 70%)',
                  animation: 'flame 1.5s ease-in-out infinite reverse'
                }}
              />
            </div>
            
            {/* Glow effect */}
            <div 
              className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-orange-300/20 rounded-full blur-xl animate-pulse"
            />
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex justify-center gap-3 mb-6">
        {!isActive ? (
          <Button
            onClick={handleResume}
            className="flex-1 bg-white/20 hover:bg-white/30 text-gray-800 border border-white/20 backdrop-blur-xl rounded-2xl py-3 transition-all duration-300 font-medium tracking-wide"
            disabled={timeLeft === 0}
          >
            <Play className="w-4 h-4 mr-2" />
            {timeLeft === initialTime ? 'Begin' : 'Resume'}
          </Button>
        ) : (
          <Button
            onClick={handlePause}
            className="flex-1 bg-white/20 hover:bg-white/30 text-gray-800 border border-white/20 backdrop-blur-xl rounded-2xl py-3 transition-all duration-300 font-medium tracking-wide"
          >
            <Pause className="w-4 h-4 mr-2" />
            Pause
          </Button>
        )}
        
        <Button
          onClick={handleReset}
          className="bg-white/15 hover:bg-white/25 text-gray-800 border border-white/15 backdrop-blur-xl rounded-2xl px-6 py-3 transition-all duration-300 font-medium tracking-wide"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Ritual Instructions */}
      <div className="bg-blue-50/50 backdrop-blur-xl border border-blue-200/30 rounded-xl p-4 mb-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            {activeRitual === 'orb' ? (
              <Sun className="w-4 h-4 text-orange-600" />
            ) : (
              <Flame className="w-4 h-4 text-red-600" />
            )}
            <span className="text-blue-800 font-medium text-sm">
              {activeRitual === 'orb' ? 'Breathwork Guidance' : 'Flame Meditation'}
            </span>
          </div>
          <p className="text-blue-800 text-xs leading-relaxed font-medium">
            {activeRitual === 'orb' ? 
              'Follow the breathing rhythm as the golden orb expands and contracts. Let each breath connect you to the sun\'s eternal energy.' :
              'Gaze softly at the sacred flame. Let its light represent the inner sun that always burns within you, regardless of outer conditions.'
            }
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={onJournalOpen}
          className="w-full bg-gradient-to-r from-blue-400/30 to-indigo-400/30 hover:from-blue-400/40 hover:to-indigo-400/40 text-gray-800 border border-blue-400/30 backdrop-blur-xl rounded-2xl py-3 transition-all duration-300 font-medium tracking-wide"
        >
          <Heart className="w-4 h-4 mr-2" />
          Record Experience
        </Button>
        
        <Button
          onClick={onComplete}
          className="w-full bg-white/15 hover:bg-white/25 text-gray-800 border border-white/15 backdrop-blur-xl rounded-2xl py-2 transition-all duration-300 font-medium tracking-wide text-sm"
        >
          Return to Practice
        </Button>
      </div>

      <style jsx>{`
        @keyframes flame {
          0%, 100% {
            transform: scale(1) rotate(-1deg);
          }
          25% {
            transform: scale(1.05) rotate(1deg);
          }
          50% {
            transform: scale(0.95) rotate(-0.5deg);
          }
          75% {
            transform: scale(1.02) rotate(0.5deg);
          }
        }
      `}</style>
    </div>
  );
}