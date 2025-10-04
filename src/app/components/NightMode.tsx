"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Moon, Sun, Flame, Star, Heart, Book, Volume2, VolumeX, Play, Pause, RotateCcw, Sparkles, Eye } from 'lucide-react';
import { AudioPicker, type AudioTrack } from './AudioPicker';

interface NightModeProps {
  onJournalOpen: (mode: 'evening') => void;
}

export function NightMode({ onJournalOpen }: NightModeProps) {
  const [activeMode, setActiveMode] = useState<'candle' | 'starlight' | 'eyes-closed' | null>(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes default
  const [initialTime, setInitialTime] = useState(600);
  const [isActive, setIsActive] = useState(false);
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [flameIntensity, setFlameIntensity] = useState(50);
  const [starCount, setStarCount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const flameRef = useRef<NodeJS.Timeout | null>(null);
  
  // Audio integration
  const [selectedAudioTrack, setSelectedAudioTrack] = useState<AudioTrack | null>(null);

  const nightPractices = [
    {
      id: 'candle' as const,
      title: 'Candle Gazing (Trataka)',
      description: 'Focus your eyes on a real candle flame for meditation',
      duration: 600, // 10 minutes
      icon: <Flame className="w-6 h-6" />
    }
  ];

  // Main timer effect
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

  // Flame animation effect
  useEffect(() => {
    if (isActive && activeMode === 'candle') {
      flameRef.current = setInterval(() => {
        setFlameIntensity(prev => {
          const variation = (Math.random() - 0.5) * 30;
          return Math.max(20, Math.min(80, prev + variation));
        });
      }, 2000 + Math.random() * 1000);
    }

    return () => {
      if (flameRef.current) {
        clearInterval(flameRef.current);
      }
    };
  }, [isActive, activeMode]);

  // Star animation effect
  useEffect(() => {
    if (isActive && activeMode === 'starlight') {
      const maxStars = 50;
      const starInterval = setInterval(() => {
        setStarCount(prev => Math.min(maxStars, prev + 1));
      }, 100);

      return () => clearInterval(starInterval);
    } else {
      setStarCount(0);
    }
  }, [isActive, activeMode]);

  const handlePracticeComplete = () => {
    // Show completion celebration
    setTimeout(() => {
      onJournalOpen('evening');
    }, 2000);
  };

  const handleStart = (practiceType: 'candle' | 'starlight') => {
    const practice = nightPractices.find(p => p.id === practiceType);
    if (practice) {
      setActiveMode(practiceType);
      setInitialTime(practice.duration);
      setTimeLeft(practice.duration);
      setIsActive(true);
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
    setActiveMode(null);
    setFlameIntensity(50);
    setStarCount(0);
  };

  const toggleVoice = () => {
    setIsVoicePlaying(!isVoicePlaying);
    // In real implementation, this would control Baba Obi's voice guidance
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const remainingSecs = seconds % 60;
    return `${mins}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 18 || hour < 6) return 'evening';
    return 'day';
  };

  // Practice selection screen
  if (!activeMode) {
    return (
      <div className="bg-white/90 border border-blue-200/50 rounded-3xl p-8 shadow-[0_20px_50px_rgba(59,130,246,0.15)] backdrop-blur-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-blue-300/50">
            <Sun className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-medium mb-2">
            🌙 Night Practice
          </h3>
          <p className="text-gray-700 text-sm font-medium italic">
            "As the sun sets, continue your practice with gentle inner light"
          </p>
        </div>

        {/* Time-based greeting */}
        <div className="bg-white border border-gray-300 rounded-xl p-6 mb-8 text-center shadow-sm">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <span className="text-indigo-900 font-medium">
              {getTimeOfDay() === 'evening' ? 'Evening Reflection' : 'Inner Light Practice'}
            </span>
          </div>
          <p className="text-indigo-900 text-sm leading-relaxed font-medium">
            {getTimeOfDay() === 'evening' 
              ? "As the day closes, turn inward to the eternal flame that burns within you. Connect with the inner sun that never sets."
              : "Even in daylight, practice connecting with your inner flame. The sacred fire within shines beyond time and weather."
            }
          </p>
        </div>

        {/* Practice Options - Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
          {nightPractices.map((practice) => (
            <div
              key={practice.id}
              className="group relative overflow-hidden rounded-3xl p-6 transition-all duration-300 cursor-pointer transform hover:scale-[1.02] bg-white/95 hover:bg-white border border-orange-200/50 hover:border-orange-300 backdrop-blur-xl shadow-lg hover:shadow-xl"
              onClick={() => handleStart(practice.id)}
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br from-orange-300 to-yellow-300 blur-xl" />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 bg-gradient-to-br from-orange-100 to-yellow-100 text-orange-600 shadow-sm border border-orange-200">
                  <div className="scale-125">
                    {practice.icon}
                  </div>
                </div>
                
                {/* Title */}
                <h4 className="text-gray-900 font-medium text-xl mb-2 group-hover:text-orange-700 transition-colors duration-300">
                  {practice.title}
                </h4>
                
                {/* Description */}
                <p className="text-gray-700 text-sm leading-relaxed mb-4 group-hover:text-gray-800 transition-colors duration-300">
                  {practice.description}
                </p>
                
                {/* Duration Badge */}
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 bg-orange-100 text-orange-700 border border-orange-200">
                    <span>{Math.floor(practice.duration / 60)} minutes</span>
                  </div>
                  
                  {/* Hover arrow */}
                  <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 bg-orange-100 text-orange-600 border border-orange-200">
                    <Play className="w-4 h-4 ml-0.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Evening Journal Reminder */}
        <div className="group relative overflow-hidden rounded-3xl p-6 mb-6 bg-gradient-to-br from-orange-50/80 via-yellow-50/60 to-orange-50/80 hover:from-orange-100/80 hover:via-yellow-100/70 hover:to-orange-100/80 border border-orange-200/50 backdrop-blur-xl shadow-sm transition-all duration-300 cursor-pointer transform hover:scale-[1.01]"
             onClick={() => onJournalOpen('evening')}>
          
          <div className="relative z-10 text-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-yellow-100 border border-orange-200 flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110">
              <Book className="w-6 h-6 text-orange-600" />
            </div>
            <h4 className="text-gray-900 font-light text-lg mb-2 group-hover:text-orange-800 transition-colors duration-300">
              Evening Reflection
            </h4>
            <p className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
              Complete your day with gratitude journaling and dream intentions
            </p>
          </div>
        </div>

        {/* Sleep Preparation Preview */}
        <div className="bg-gray-100 border border-gray-300 rounded-xl p-4 text-center shadow-sm">
          <div className="text-gray-900 text-sm font-medium mb-2 opacity-60">
            Coming Soon: Sleep Integration
          </div>
          <p className="text-gray-900 text-xs leading-relaxed">
            Circadian sleep prep • Sungazer lullabies • Dream programming
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/90 border border-blue-200/50 rounded-3xl p-8 shadow-[0_20px_50px_rgba(59,130,246,0.15)] backdrop-blur-xl">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-blue-600 text-xs font-medium tracking-wider mb-2">
          Night Practice • Candle Gazing (Trataka)
        </div>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto shadow-[0_0_8px_rgba(59,130,246,0.4)]" />
      </div>

      {/* Setup Instructions for Candle Gazing */}
      {activeMode === 'candle' && !isActive && (
        <div className="bg-white border border-gray-300 rounded-xl p-4 mb-6 shadow-sm">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Flame className="w-5 h-5 text-orange-600" />
              <span className="text-orange-900 font-medium text-sm">Setup Instructions</span>
            </div>
            <div className="text-orange-900 text-xs leading-relaxed font-medium space-y-2">
              <p>• Light a real candle and place it at eye level</p>
              <p>• Position it 3-6 feet away from you</p>
              <p>• Sit comfortably with your spine straight</p>
              <p>• Dim other lights in the room</p>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Timer Display */}
      <div className="text-center mb-8">
        <div className="text-6xl md:text-7xl text-gray-900 font-light tabular-nums mb-4 drop-shadow-[0_0_40px_rgba(255,215,0,0.3)] tracking-wider">
          {formatTime(timeLeft)}
        </div>
        {activeMode === 'candle' && isActive && (
          <div className="text-gray-800 text-base md:text-lg font-medium italic animate-pulse">
            Gaze softly at the flame... let your mind rest in its gentle light
          </div>
        )}
        {activeMode === 'eyes-closed' && isActive && (
          <div className="text-gray-800 text-base md:text-lg font-medium italic animate-pulse">
            Breathe deeply... visualize golden light behind your eyelids
          </div>
        )}
      </div>

      {/* Candle Flame Animation */}
      {activeMode === 'candle' && (
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Candle base */}
            <div className="w-12 h-32 bg-gradient-to-b from-amber-100 to-amber-200 rounded-t-lg mx-auto relative border border-amber-300/50 shadow-lg">
              {/* Wax drips */}
              <div className="absolute top-2 left-2 w-1 h-4 bg-amber-200 rounded-full opacity-70" />
              <div className="absolute top-4 right-2 w-1 h-3 bg-amber-200 rounded-full opacity-50" />
              <div className="absolute top-6 left-3 w-1 h-2 bg-amber-200 rounded-full opacity-60" />
            </div>
            
            {/* Flame */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <div 
                className="w-8 h-12 bg-gradient-to-t from-orange-600 via-yellow-400 to-yellow-200 rounded-full transition-all duration-1000"
                style={{
                  clipPath: 'ellipse(45% 65% at 50% 75%)',
                  transform: `scale(${0.8 + (flameIntensity / 100) * 0.4}) rotate(${Math.sin(Date.now() / 1000) * 3}deg)`,
                  filter: `brightness(${0.8 + (flameIntensity / 100) * 0.4})`
                }}
              />
              {/* Inner flame core */}
              <div 
                className="absolute top-2 left-1/2 transform -translate-x-1/2 w-4 h-8 bg-gradient-to-t from-red-500 to-yellow-300 rounded-full opacity-80 transition-all duration-1000"
                style={{
                  clipPath: 'ellipse(45% 65% at 50% 75%)',
                  transform: `scale(${0.6 + (flameIntensity / 100) * 0.3})`
                }}
              />
            </div>
            
            {/* Glow effects */}
            <div 
              className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full blur-xl transition-all duration-2000"
              style={{
                background: `radial-gradient(circle, rgba(255,165,0,${0.3 + (flameIntensity / 100) * 0.2}) 0%, transparent 70%)`,
                transform: `scale(${1 + (flameIntensity / 100) * 0.3})`
              }}
            />
          </div>
        </div>
      )}


      {/* Voice Control */}
      <div className="flex justify-center mb-6">
        <Button
          onClick={toggleVoice}
          className={`${
            isVoicePlaying 
              ? 'bg-gradient-to-r from-yellow-400/30 to-orange-500/40 hover:from-yellow-300/40 hover:to-orange-400/50 border-yellow-400/30 shadow-[0_4px_20px_rgba(255,215,0,0.3)]' 
              : 'bg-gray-400/20 hover:bg-gray-400/30 border-gray-400/30'
          } text-gray-900 border backdrop-blur-xl rounded-2xl px-6 py-2 transition-all duration-300 font-medium tracking-wide`}
        >
          {isVoicePlaying ? <Volume2 className="w-4 h-4 mr-2" /> : <VolumeX className="w-4 h-4 mr-2" />}
          {isVoicePlaying ? 'Baba Obi Speaking' : 'Enable Candle Guidance'}
        </Button>
      </div>

      {/* Circular Controls */}
      <div className="flex justify-center gap-6 mb-6">
        {!isActive ? (
          <button
            onClick={handleResume}
            disabled={timeLeft === 0}
            className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-yellow-400/30 to-orange-500/40 hover:from-yellow-300/40 hover:to-orange-400/50 border border-yellow-400/30 backdrop-blur-xl transition-all duration-300 flex items-center justify-center group shadow-[0_8px_32px_rgba(255,215,0,0.3)] hover:shadow-[0_12px_40px_rgba(255,215,0,0.4)] hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Play className="w-8 h-8 md:w-10 md:h-10 text-gray-900 group-hover:text-gray-800 ml-1" />
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-yellow-400/30 to-orange-500/40 hover:from-yellow-300/40 hover:to-orange-400/50 border border-yellow-400/30 backdrop-blur-xl transition-all duration-300 flex items-center justify-center group shadow-[0_8px_32px_rgba(255,215,0,0.3)] hover:shadow-[0_12px_40px_rgba(255,215,0,0.4)] hover:scale-110"
          >
            <Pause className="w-8 h-8 md:w-10 md:h-10 text-gray-900 group-hover:text-gray-800" />
          </button>
        )}
        
        <button
          onClick={handleReset}
          className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-gray-400/20 to-gray-500/30 hover:from-gray-300/30 hover:to-gray-400/40 border border-gray-400/30 backdrop-blur-xl transition-all duration-300 flex items-center justify-center group shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] hover:scale-110"
        >
          <RotateCcw className="w-8 h-8 md:w-10 md:h-10 text-gray-700 group-hover:text-gray-600" />
        </button>
      </div>

      {/* Practice Instructions */}
      <div className="bg-white/90 border border-gray-200 rounded-xl p-4 mb-6 shadow-sm backdrop-blur-xl">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            {activeMode === 'candle' ? (
              <Flame className="w-4 h-4 text-orange-600" />
            ) : (
              <Star className="w-4 h-4 text-blue-600" />
            )}
            <span className="text-gray-900 font-medium text-sm">
              {activeMode === 'candle' ? 'Trataka Guidance' : 'Starlight Connection'}
            </span>
          </div>
          <p className="text-gray-800 text-xs leading-relaxed font-medium">
            {activeMode === 'candle' ? 
              'Light a candle and place it at eye level 3-6 feet away. Gaze softly at the flame without forcing - let your eyes naturally rest on the dancing light. When thoughts arise, gently return attention to the flame.' :
              'Close your eyes and visualize infinite starlight flowing through you. Feel your connection to the cosmic light that births all suns.'
            }
          </p>
        </div>
      </div>

      {/* Journal Reminder */}
      <Button
        onClick={() => onJournalOpen('evening')}
        className="w-full bg-white/90 hover:bg-white/95 text-gray-900 border border-gray-200 hover:border-yellow-300 backdrop-blur-xl rounded-2xl py-3 transition-all duration-300 font-medium tracking-wide mb-3 shadow-sm hover:shadow-[0_4px_20px_rgba(255,215,0,0.2)]"
      >
        <Book className="w-4 h-4 mr-2" />
        Evening Journal: Gratitude + Dreams
      </Button>

      <Button
        onClick={handleReset}
        className="w-full bg-gray-400/15 hover:bg-gray-400/25 text-gray-900 border border-gray-400/15 backdrop-blur-xl rounded-2xl py-2 transition-all duration-300 font-medium tracking-wide text-sm"
      >
        Return to Night Practices
      </Button>
    </div>
  );
}
