"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface MeditationPlayerProps {
  onTrackChange?: (track: string) => void;
  onPlayPause?: (isPlaying: boolean) => void;
}

export function MeditationPlayer({ onTrackChange, onPlayPause }: MeditationPlayerProps) {
  const [activeTab, setActiveTab] = useState('meditation');
  const [currentTrack, setCurrentTrack] = useState(0); // Default to Mahavakya Gold (index 0)
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('TRANSFORMATION'); // Default to Mahavakya Gold category
  const [geometryRotation, setGeometryRotation] = useState(0);
  const [breathScale, setBreathScale] = useState(1);
  const [strokeOpacity, setStrokeOpacity] = useState(1);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState(15); // Default 15 minutes
  const [timeLeft, setTimeLeft] = useState(15 * 60); // Convert to seconds
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  
  const animationRef = useRef<number | null>(null);
  const breathRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sacred tracks with Supabase integration
  const tracks = [
    {
      title: "Mahavakya Gold",
      category: "TRANSFORMATION", 
      description: "Sacred golden meditation tones for deep transformation and inner light activation.",
      filename: "Mahavakya gold .mp3"
    },
    {
      title: "432 Hz",
      category: "HEALING", 
      description: "Natural healing frequency that resonates with the Earth's heartbeat for deep relaxation.",
      filename: "432 Hz.wav"
    },
    {
      title: "Silent Meditation",
      category: "MINDFULNESS", 
      description: "Pure silence for deep inner contemplation and mindful awareness.",
      filename: null
    }
  ];

  const durationOptions = [5, 10, 15, 20, 25, 30];

  const settings = [
    { label: "Duration", value: `${selectedDuration} min` },
    { label: "Intensity", value: "Gentle" },
    { label: "Focus", value: "Vision" }
  ];

  // Load audio for current track
  useEffect(() => {
    const currentTrackData = tracks[currentTrack];
    if (!currentTrackData.filename) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setIsPlaying(false);
      return;
    }

    const loadAudio = async () => {
      try {
        console.log(`Loading audio for ${currentTrackData.title}: ${currentTrackData.filename}`);
        
        const response = await fetch('/api/audio/signed-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ storagePath: `audio/${currentTrackData.filename}` })
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Failed to fetch audio URL for ${currentTrackData.title}:`, response.status, errorText);
          throw new Error(`Failed to fetch audio URL: ${response.status}`);
        }

        const { url } = await response.json();
        console.log(`Audio URL for ${currentTrackData.title}:`, url);
        
        // Create audio element
        const audio = new Audio(url);
        audio.preload = 'auto';
        audio.loop = true;
        
        audio.addEventListener('loadstart', () => {
          console.log(`Audio load started for ${currentTrackData.title}`);
        });
        
        audio.addEventListener('loadeddata', () => {
          console.log(`Audio data loaded for ${currentTrackData.title}`);
        });
        
        audio.addEventListener('canplay', () => {
          console.log(`Audio can play for ${currentTrackData.title}`);
        });
        
        audio.addEventListener('canplaythrough', () => {
          console.log(`Audio ready for ${currentTrackData.title}`);
        });
        
        audio.addEventListener('ended', () => {
          console.log(`Audio ended for ${currentTrackData.title}`);
          setIsPlaying(false);
        });
        
        audio.addEventListener('error', (e) => {
          console.error(`Audio error for ${currentTrackData.title}:`, e);
          console.error(`Audio error details:`, {
            error: audio.error,
            networkState: audio.networkState,
            readyState: audio.readyState,
            src: audio.src
          });
          setAudioError(`Failed to load ${currentTrackData.title} audio`);
          setIsPlaying(false);
        });
        
        audioRef.current = audio;
        setAudioError(null);
      } catch (error) {
        console.error(`Error loading ${currentTrackData.title} audio:`, error);
        setAudioError('Audio unavailable');
      }
    };

    loadAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [currentTrack]);

  // Timer effect
  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            // Stop all audio when session completes
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.currentTime = 0;
            }
            
            setIsTimerActive(false);
            setIsPlaying(false);
            setShowTimer(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isTimerActive, timeLeft]);

  // Update timeLeft when selectedDuration changes
  useEffect(() => {
    setTimeLeft(selectedDuration * 60);
  }, [selectedDuration]);

  // Geometry animation
  useEffect(() => {
    const animateGeometry = () => {
      setGeometryRotation(prev => (prev + 0.1) % 360);
      animationRef.current = requestAnimationFrame(animateGeometry);
    };
    animationRef.current = requestAnimationFrame(animateGeometry);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Breathing animation
  useEffect(() => {
    const animateBreath = () => {
      const time = Date.now() * 0.001;
      const breath = 0.95 + 0.1 * Math.sin(time * 0.5); // 4s cycle
      const opacity = 0.7 + 0.3 * Math.sin(time * 0.5);
      
      setBreathScale(breath);
      setStrokeOpacity(opacity);
      
      breathRef.current = requestAnimationFrame(animateBreath);
    };
    breathRef.current = requestAnimationFrame(animateBreath);

    return () => {
      if (breathRef.current) {
        cancelAnimationFrame(breathRef.current);
      }
    };
  }, []);

  const handlePlayPause = async () => {
    if (!audioRef.current) {
      setAudioError('Audio not loaded yet');
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setIsTimerActive(false);
      setShowTimer(false);
      onPlayPause?.(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        setIsTimerActive(true);
        setShowTimer(true);
        setAudioError(null);
        onPlayPause?.(true);
      } catch (error) {
        console.error('Error playing audio:', error);
        setAudioError('Failed to play audio');
      }
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleTrackChange = (direction: 'prev' | 'next') => {
    const newTrack = direction === 'next' 
      ? (currentTrack + 1) % tracks.length
      : (currentTrack - 1 + tracks.length) % tracks.length;
    
    setCurrentTrack(newTrack);
    setCurrentCategory(tracks[newTrack].category);
    onTrackChange?.(tracks[newTrack].title);
  };

  const currentTrackData = tracks[currentTrack];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl flex flex-col items-center justify-center px-4 py-8">
      {/* Navigation Tabs */}
      <div className="flex items-center gap-12 mb-8" style={{ marginTop: '120px' }}>
        {['meditation', 'music', 'sounds'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="relative text-white font-medium text-[17px] transition-opacity duration-300 hover:opacity-80"
            style={{ 
              opacity: activeTab === tab ? 1 : 0.4,
              fontFamily: 'SF Pro Display, Inter, system-ui, sans-serif'
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {activeTab === tab && (
              <div 
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-full"
                style={{ 
                  width: `${tab.length * 0.4}ch`,
                  height: '3px'
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Sacred Geometry Visualization - Flower of Life */}
      <div className="relative mb-8" style={{ width: '320px', height: '320px' }}>
        <svg
          width="320"
          height="320"
          viewBox="0 0 320 320"
          className="absolute inset-0"
          style={{
            transform: `rotate(${geometryRotation}deg) scale(${breathScale})`,
            transition: 'transform 0.1s linear'
          }}
        >
          {/* Flower of Life - Complete Pattern */}
          {/* Center circle */}
          <circle
            cx="160"
            cy="160"
            r="50"
            fill="none"
            stroke="white"
            strokeWidth="2"
            opacity={strokeOpacity}
          />
          
          {/* First ring - 6 circles around center */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const x = 160 + 50 * Math.cos(angle * Math.PI / 180);
            const y = 160 + 50 * Math.sin(angle * Math.PI / 180);
            return (
              <circle
                key={`ring1-${i}`}
                cx={x}
                cy={y}
                r="50"
                fill="none"
                stroke="white"
                strokeWidth="2"
                opacity={strokeOpacity}
              />
            );
          })}
          
          {/* Second ring - 12 circles (every 30 degrees) */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
            const x = 160 + 100 * Math.cos(angle * Math.PI / 180);
            const y = 160 + 100 * Math.sin(angle * Math.PI / 180);
            return (
              <circle
                key={`ring2-${i}`}
                cx={x}
                cy={y}
                r="50"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                opacity={strokeOpacity * 0.7}
              />
            );
          })}
          
          {/* Central Seed of Life - 7 circles forming the core pattern */}
          <circle
            cx="160"
            cy="160"
            r="25"
            fill="none"
            stroke="white"
            strokeWidth="3"
            opacity={strokeOpacity * 1.2}
          />
          
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const x = 160 + 25 * Math.cos(angle * Math.PI / 180);
            const y = 160 + 25 * Math.sin(angle * Math.PI / 180);
            return (
              <circle
                key={`seed-${i}`}
                cx={x}
                cy={y}
                r="25"
                fill="none"
                stroke="white"
                strokeWidth="3"
                opacity={strokeOpacity * 1.2}
              />
            );
          })}
          
          {/* Sacred geometry lines - connecting key points */}
          <g opacity={strokeOpacity * 0.4}>
            {/* Hexagon outline */}
            <polygon
              points="160,110 190,140 190,180 160,210 130,180 130,140"
              fill="none"
              stroke="white"
              strokeWidth="1"
            />
            
            {/* Inner hexagon */}
            <polygon
              points="160,135 175,150 175,170 160,185 145,170 145,150"
              fill="none"
              stroke="white"
              strokeWidth="1"
            />
          </g>
          
          {/* Central point */}
          <circle
            cx="160"
            cy="160"
            r="3"
            fill="white"
            opacity={strokeOpacity * 1.5}
          />
        </svg>
      </div>

      {/* Track Navigation */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          onClick={() => handleTrackChange('prev')}
          className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-all duration-300"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15,18 9,12 15,6"></polyline>
          </svg>
        </button>
        
        <div className="text-center">
          <div className="text-white/60 text-[11px] font-medium uppercase tracking-wider mb-1">
            Track {currentTrack + 1} of {tracks.length}
          </div>
        </div>
        
        <button
          onClick={() => handleTrackChange('next')}
          className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-all duration-300"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9,18 15,12 9,6"></polyline>
          </svg>
        </button>
      </div>

      {/* Title Section */}
      <h1 
        className="text-white text-[28px] font-normal text-center mb-8"
        style={{ 
          letterSpacing: '-0.01em',
          fontFamily: 'SF Pro Display, Inter, system-ui, sans-serif'
        }}
      >
        {currentTrackData.title}
      </h1>

      {/* Category Pill */}
      <div className="flex justify-center w-full max-w-[380px] mb-6">
        <div 
          className="px-5 py-2 rounded-full text-white text-[13px] font-bold uppercase tracking-[0.08em]"
          style={{
            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)'
          }}
        >
          {currentCategory}
        </div>
      </div>

      {/* Track Indicators */}
      <div className="flex justify-center gap-2 mb-4">
        {tracks.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentTrack 
                ? 'bg-white' 
                : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Description Text */}
      <div 
        className="text-white text-[15px] font-normal text-center leading-[1.4] mb-8 opacity-60"
        style={{ 
          maxWidth: '280px',
          fontFamily: 'SF Pro Display, Inter, system-ui, sans-serif'
        }}
      >
        {currentTrackData.description}
      </div>

      {/* Duration Selector */}
      <div className="mb-6">
        <div className="text-white text-[13px] font-medium text-center mb-3 opacity-70">
          Select Duration
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {durationOptions.map((duration) => (
            <button
              key={duration}
              onClick={() => setSelectedDuration(duration)}
              className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-300 ${
                selectedDuration === duration
                  ? 'bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white'
                  : 'bg-white/[0.06] text-white/60 hover:bg-white/[0.1] hover:text-white/80'
              }`}
              style={{ border: '0.5px solid rgba(255,255,255,0.1)' }}
            >
              {duration}min
            </button>
          ))}
        </div>
      </div>

      {/* Timer Display */}
      {showTimer && (
        <div className="mb-6">
          <div className="text-center">
            <div className="text-white text-[48px] font-bold mb-2 tracking-tight">
              {formatTime(timeLeft)}
            </div>
            <div className="text-white/60 text-[13px] font-medium">
              {isTimerActive ? 'Meditation in progress...' : 'Timer paused'}
            </div>
          </div>
        </div>
      )}

      {/* Audio Error Display */}
      {audioError && (
        <div className="text-red-400 text-sm text-center mb-4">
          {audioError}
        </div>
      )}

      {/* Settings Cards */}
      <div className="flex gap-3 mb-12">
        {settings.map((setting, index) => (
          <div
            key={index}
            className="bg-white/6 rounded-2xl px-6 py-4 text-center"
            style={{ 
              minWidth: '100px',
              border: '0.5px solid rgba(255,255,255,0.1)'
            }}
          >
            <div 
              className="text-white text-[13px] opacity-50 mb-1"
              style={{ fontFamily: 'SF Pro Display, Inter, system-ui, sans-serif' }}
            >
              {setting.label}
            </div>
            <div 
              className="text-white text-[16px] font-medium"
              style={{ fontFamily: 'SF Pro Display, Inter, system-ui, sans-serif' }}
            >
              {setting.value}
            </div>
          </div>
        ))}
      </div>

      {/* Play Button */}
      <button
        onClick={handlePlayPause}
        className="w-20 h-20 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-all duration-300 active:scale-95"
        style={{ 
          marginBottom: '100px',
          minWidth: '44px',
          minHeight: '44px'
        }}
      >
        {isPlaying ? (
          <Pause size={28} className="ml-0.5" />
        ) : (
          <Play size={28} className="ml-1" />
        )}
      </button>
    </div>
  );
}