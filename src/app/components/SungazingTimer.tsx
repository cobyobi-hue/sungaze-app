"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Play, Pause, RotateCcw, Settings } from "lucide-react";
import { useProgress } from "../hooks/useProgress";
import { PalmingRitual } from "./PalmingRitual";
import { MeditativeChimes } from "../lib/meditativeChimes";
import { 
  getCurrentSolarLevel,
  getLevelProgress,
  checkLevelUp,
  getLevelMotivation,
  type SolarLevel 
} from "../lib/solarLevels";
import { useSubscription } from "../hooks/useSubscription";
import { FREE_TIER_LIMITS } from "../types/subscription";

interface SungazingTimerProps {
  onTimerChange: (isActive: boolean, progress: number, timeLeft?: number) => void;
  onComplete?: (duration: number) => void;
  autoStart?: boolean;
  onAutoStartHandled?: () => void;
}

export function SungazingTimer({ onTimerChange, onComplete, autoStart, onAutoStartHandled }: SungazingTimerProps) {
  // Subscription management
  const { profile, hasAccess, isPremium } = useSubscription('test-user-1');
  
  // Progress management - loads current day from localStorage
  const { progress, completePractice, advanceDay, getCurrentDayTarget } = useProgress();
  const currentDay = progress?.currentDay || 1;
  
  // Set initial time based on tier and current day
  const getInitialTime = () => {
    if (profile?.tier === 'free') {
      return FREE_TIER_LIMITS.timerMaxDuration; // 60 seconds for free tier
    }
    return getCurrentDayTarget(); // Use current day target for premium users
  };
  
  const [timeLeft, setTimeLeft] = useState(getInitialTime());
  const [initialTime, setInitialTime] = useState(getInitialTime());
  const [isActive, setIsActive] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);
  const [showPreGazingInstructions, setShowPreGazingInstructions] = useState(false);
  const [showPalmingRitual, setShowPalmingRitual] = useState(false);
  const [extendPalming, setExtendPalming] = useState(false);
  const [newLevel, setNewLevel] = useState<SolarLevel | null>(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Audio state for background music
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<'mahavakya-gold' | '432hz' | 'none'>('mahavakya-gold');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  
  
  // Get track filename based on selection
  const getTrackFilename = (track: string) => {
    switch (track) {
      case 'mahavakya-gold':
        return 'Mahavakya gold .mp3'; // Note: extra space before .mp3 to match Supabase file
      case '432hz':
        return '432 Hz.wav';
      default:
        return null;
    }
  };


  // Initialize audio based on selected track
  useEffect(() => {
    if (selectedTrack === 'none') {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setIsAudioPlaying(false);
      return;
    }

    const fetchAudioUrl = async () => {
      try {
        const filename = getTrackFilename(selectedTrack);
        if (!filename) {
          setAudioError('No audio file specified');
          return;
        }

        console.log(`Fetching audio for ${selectedTrack}, filename: ${filename}`);
        
        // Skip file existence check for now - let it try to load
        
        const response = await fetch('/api/audio/signed-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ storagePath: `audio/${filename}` }),
          // Add timeout to prevent hanging
          signal: AbortSignal.timeout(10000) // 10 second timeout
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Failed to fetch audio URL for ${selectedTrack}:`, response.status, errorText);
          setAudioError(`Audio unavailable (${response.status})`);
          return;
        }

        const { url } = await response.json();
        
        console.log(`Loading audio for ${selectedTrack}:`, url);
        
        // Create audio element
        const audio = new Audio(url);
        audio.preload = 'auto';
        audio.loop = true; // Loop throughout the entire session
        audio.volume = 0.7; // Set comfortable volume level
        
        // Add crossOrigin to handle CORS if needed
        audio.crossOrigin = 'anonymous';
        
        audio.addEventListener('loadstart', () => {
          console.log(`Audio load started for ${selectedTrack}`);
          setAudioError(null); // Clear any previous errors
        });
        
        audio.addEventListener('loadeddata', () => {
          console.log(`Audio data loaded for ${selectedTrack}`);
        });
        
        audio.addEventListener('canplay', () => {
          console.log(`Audio can play for ${selectedTrack}`);
        });
        
        audio.addEventListener('canplaythrough', () => {
          console.log(`Audio ready for ${selectedTrack}`);
          setAudioError(null); // Clear any previous errors
        });
        
        audio.addEventListener('loadedmetadata', () => {
          console.log(`Audio metadata loaded for ${selectedTrack}`, {
            duration: audio.duration,
            readyState: audio.readyState
          });
        });
        
        // Add a test play function for debugging
        (window as any).testAudio = () => {
          if (audioRef.current) {
            console.log('Testing audio playback...', {
              readyState: audioRef.current.readyState,
              duration: audioRef.current.duration,
              src: audioRef.current.src
            });
            audioRef.current.play().then(() => {
              console.log('Test audio playing successfully');
              setIsAudioPlaying(true);
            }).catch(error => {
              console.error('Test audio failed:', error);
              setAudioError(`Test failed: ${error.message}`);
            });
          } else {
            console.log('No audio ref available');
          }
        };
        
        audio.addEventListener('ended', () => {
          console.log(`Audio ended for ${selectedTrack}`);
          setIsAudioPlaying(false);
        });
        
        audio.addEventListener('error', (e) => {
          console.error(`Audio error for ${selectedTrack}:`, e);
          console.error(`Audio error details:`, {
            error: audio.error,
            errorCode: audio.error?.code,
            errorMessage: audio.error?.message,
            networkState: audio.networkState,
            readyState: audio.readyState,
            src: audio.src
          });
          
          let errorMessage = `Audio loading failed`;
          if (audio.error) {
            switch (audio.error.code) {
              case 1: // MEDIA_ERR_ABORTED
                errorMessage = `Audio loading was aborted`;
                break;
              case 2: // MEDIA_ERR_NETWORK
                errorMessage = `Network error loading audio`;
                break;
              case 3: // MEDIA_ERR_DECODE
                errorMessage = `Audio file format error - please check the file`;
                break;
              case 4: // MEDIA_ERR_SRC_NOT_SUPPORTED
                errorMessage = `Audio format not supported by browser`;
                break;
              default:
                errorMessage = `Audio error: ${audio.error.message || 'Unknown error'}`;
            }
          }
          setAudioError(errorMessage);
          setIsAudioPlaying(false);
        });
        
        audioRef.current = audio;
      } catch (error) {
        console.error(`Error loading ${selectedTrack} audio:`, error);
        if (error instanceof Error) {
          if (error.name === 'TimeoutError') {
            setAudioError('Audio request timed out');
          } else {
            setAudioError(`Audio error: ${error.message}`);
          }
        } else {
          setAudioError('Audio unavailable');
        }
      }
    };

    fetchAudioUrl();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [selectedTrack]);

  // Sacred journey: 10 seconds added per day over 9 months (270 days)
  // Day 1: 10s, Day 2: 20s, Day 3: 30s... Day 270: 2700s (45 minutes)

  const getDayTime = (day: number) => day * 10; // 10 seconds per day
  
  const getMonthFromDay = (day: number) => Math.ceil(day / 30); // Roughly 30 days per month
  
  const getMonthLabel = (month: number) => {
    const labels = [
      "Month 1: Sacred Beginnings",
      "Month 2: Deepening Connection", 
      "Month 3: Growing Resilience",
      "Month 4: Profound Awareness",
      "Month 5: Noticeable Transformation",
      "Month 6: Cellular Reprogramming",
      "Month 7: Living Light Integration",
      "Month 8: Profound Inner Shifts",
      "Month 9: Light-Body Activation"
    ];
    return labels[month - 1] || labels[0];
  };

  // Generate time options based on subscription tier
  const getCurrentDayTimeOptions = () => {
    if (profile?.tier === 'free') {
      // Free tier gets only 1-minute option
      return [FREE_TIER_LIMITS.timerMaxDuration];
    }
    
    // Premium users get progressive options
    const options = [];
    if (currentDay > 1) {
      options.push(getDayTime(currentDay - 1));
    }
    options.push(getDayTime(currentDay));
    options.push(getDayTime(currentDay + 1));
    options.push(getDayTime(currentDay + 2));
    
    return options.slice(0, 3);
  };

  const getCurrentMonth = () => getMonthFromDay(currentDay);
  const getCurrentMonthLabel = () => getMonthLabel(getCurrentMonth());

  // Update initial time when current day changes
  useEffect(() => {
    const newInitialTime = getInitialTime();
    setInitialTime(newInitialTime);
    setTimeLeft(newInitialTime);
  }, [currentDay, profile?.tier]);

  useEffect(() => {
    const timerProgress = ((initialTime - timeLeft) / initialTime) * 100;
    onTimerChange(isActive, timerProgress, timeLeft);
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

  // Handle auto-start from Begin Sungazing button
  useEffect(() => {
    if (autoStart && !isActive) {
      // Skip pre-gazing instructions and start immediately
      setShowPreGazingInstructions(false);
      setIsActive(true);
      
      // Call the handler to reset the autoStart flag
      if (onAutoStartHandled) {
        onAutoStartHandled();
      }
    }
  }, [autoStart, isActive, onAutoStartHandled]);

  const handlePracticeComplete = async () => {
    // Stop all audio when practice completes
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsAudioPlaying(false);
    }
    
    // Show completion feedback
    setJustCompleted(true);
    
    // Save practice completion and advance day
    completePractice(initialTime, 'sunrise');
    advanceDay();
    
    // Check for level up
    const completedMinutes = initialTime / 60; // Convert seconds to minutes
    const previousDay = Math.max(1, currentDay - 1);
    const levelUp = checkLevelUp(previousDay, currentDay);
    
    if (levelUp) {
      setNewLevel(levelUp);
      setShowLevelUp(true);
      
      // Show level up for 5 seconds, then continue with completion flow
      setTimeout(() => {
        setShowLevelUp(false);
        proceedWithCompletion();
      }, 5000);
    } else {
      proceedWithCompletion();
    }
  };
  
  const proceedWithCompletion = async () => {
    // Play gong sound for session completion
    setTimeout(async () => {
      try {
        const chimes = new MeditativeChimes();
        await chimes.playCompletionChime();
      } catch (error) {
        console.error('Error playing completion chime:', error);
      }
      
      // Show palming ritual after gong sound
      setTimeout(() => {
        setJustCompleted(false);
        setShowPalmingRitual(true);
      }, 2000); // Brief pause after gong
    }, 500); // Brief pause before playing gong
  };

  const handleStart = async () => {
    setShowPreGazingInstructions(true);
  };

  const handleBeginGazing = async () => {
    setShowPreGazingInstructions(false);
    setIsActive(true);
    
    // Clear any audio error states
    setAudioError(null);
    
    // Start playing selected track when sungazing begins
    if (audioRef.current && !isAudioPlaying) {
      try {
        // Ensure audio is ready to play
        if (audioRef.current.readyState >= 2) { // HAVE_CURRENT_DATA
          await audioRef.current.play();
          setIsAudioPlaying(true);
          setAudioError(null);
          console.log(`Audio started playing: ${selectedTrack}`);
        } else {
          // Wait for audio to be ready
          console.log(`Audio not ready yet, waiting... (readyState: ${audioRef.current.readyState})`);
          
          const waitForAudio = () => {
            return new Promise((resolve, reject) => {
              if (!audioRef.current) {
                reject(new Error('Audio ref is null'));
                return;
              }
              
              if (audioRef.current.readyState >= 2) {
                resolve(true);
                return;
              }
              
              const timeout = setTimeout(() => {
                reject(new Error('Audio loading timeout'));
              }, 5000);
              
              audioRef.current.addEventListener('canplay', () => {
                clearTimeout(timeout);
                resolve(true);
              }, { once: true });
              
              audioRef.current.addEventListener('error', () => {
                clearTimeout(timeout);
                reject(new Error('Audio loading failed'));
              }, { once: true });
            });
          };
          
          await waitForAudio();
          await audioRef.current.play();
          setIsAudioPlaying(true);
          setAudioError(null);
          console.log(`Audio started playing after waiting: ${selectedTrack}`);
        }
      } catch (error) {
        console.error('Error playing selected track:', error);
        setAudioError(`Failed to play audio: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  };

  const handlePause = () => {
    setIsActive(false);
    // Pause audio when timer is paused
    if (audioRef.current && isAudioPlaying) {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    }
  };


  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(initialTime);
    // Stop audio when timer is reset
    if (audioRef.current && isAudioPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsAudioPlaying(false);
    }
  };

  const handleTimeSelect = (seconds: number) => {
    if (!isActive) {
      setInitialTime(seconds);
      setTimeLeft(seconds);
    }
  };

  const handlePalmingComplete = () => {
    setShowPalmingRitual(false);
    if (onComplete) {
      onComplete(initialTime);
    }
  };

  const handlePalmingClose = () => {
    setShowPalmingRitual(false);
    if (onComplete) {
      onComplete(initialTime);
    }
  };

  const handleExtendPalming = () => {
    setShowPalmingRitual(false);
    setExtendPalming(true);
    if (onComplete) {
      onComplete(initialTime); // This will trigger navigation to extended palming
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
      return 'Practice complete - light absorbed into your being';
    }
    
    if (isActive) {
      return `Day ${currentDay} - ${getCurrentMonthLabel().split(':')[1]?.trim() || 'Sacred practice in progress...'}`;
    }
    
    return `Day ${currentDay} of your sacred journey`;
  };

  const timerProgress = ((initialTime - timeLeft) / initialTime) * 100;

  const currentSolarLevel = getCurrentSolarLevel(currentDay);
  const levelProgress = getLevelProgress(currentDay, 0);
  const levelMotivation = getLevelMotivation(currentSolarLevel, currentDay);

  return (
    <>
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white min-h-screen px-6 pt-6 pb-24 relative">
      {/* Pre-Gazing Instructions Overlay */}
      {showPreGazingInstructions && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-xl rounded-3xl flex flex-col items-center justify-center p-6 z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400/30 to-orange-400/30 flex items-center justify-center mx-auto mb-6">
              <div className="text-yellow-200 text-2xl">☉</div>
            </div>
            <h3 className="text-white text-xl font-light mb-4 drop-shadow-lg">
              Sacred Preparation
            </h3>
            
            
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
                setShowPreGazingInstructions(false);
              }}
              className="bg-white/20 hover:bg-white/30 text-white border border-white/20 backdrop-blur-xl rounded-2xl px-6 py-3 transition-all duration-300 font-light tracking-wide"
            >
              Back
            </Button>
            <Button
              onClick={() => {
                handleBeginGazing();
              }}
              data-testid="start-timer-button"
              className="bg-gradient-to-r from-yellow-400/30 to-orange-400/30 hover:from-yellow-400/40 hover:to-orange-400/40 text-white border border-yellow-400/30 backdrop-blur-xl rounded-2xl px-8 py-3 transition-all duration-300 font-light tracking-wide shadow-[0_4px_20px_rgba(255,200,0,0.2)]"
            >
              I Am Ready
            </Button>
          </div>
        </div>
      )}

      {/* Audio Track Selection */}
      {!isActive && (
        <div className="mb-8">
          <div className="text-center mb-4">
            <h3 className="text-white/80 text-sm font-medium mb-3">Choose Sacred Sound</h3>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  setSelectedTrack('mahavakya-gold');
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedTrack === 'mahavakya-gold'
                    ? 'bg-gradient-to-r from-yellow-400/30 to-orange-400/30 text-white border-2 border-yellow-400/60'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 border border-white/20'
                }`}
              >
                🎵 Mahavakya Gold
              </button>
              <button
                onClick={() => {
                  setSelectedTrack('432hz');
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedTrack === '432hz'
                    ? 'bg-gradient-to-r from-yellow-400/30 to-orange-400/30 text-white border-2 border-yellow-400/60'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 border border-white/20'
                }`}
              >
                🌊 432 Hz
              </button>
              <button
                onClick={() => {
                  setSelectedTrack('none');
                  if (audioRef.current && isAudioPlaying) {
                    audioRef.current.pause();
                    setIsAudioPlaying(false);
                  }
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedTrack === 'none'
                    ? 'bg-gradient-to-r from-yellow-400/30 to-orange-400/30 text-white border-2 border-yellow-400/60'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 border border-white/20'
                }`}
              >
                🔇 Silent
              </button>
            </div>
          </div>
          {audioError && (
            <div className="text-center mt-2">
              <span className="text-red-300/80 text-xs">{audioError}</span>
            </div>
          )}
           <div className="text-center mt-2">
             <span className="text-white/50 text-xs">Select your preferred audio for the session</span>
           </div>
           {/* Test Audio Button */}
           <div className="text-center mt-3">
             <button
               onClick={() => {
                 if ((window as any).testAudio) {
                   (window as any).testAudio();
                 }
               }}
               className="px-4 py-2 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border border-blue-400/30 transition-all duration-300"
             >
               🎵 Test Audio Now
             </button>
           </div>
        </div>
      )}

      {/* Main Timer Display - Clean Style */}
      <div className="text-center mb-8">
        <div className="text-8xl text-white font-bold mb-2 tracking-tight drop-shadow-lg">
          {formatTime(timeLeft)}
        </div>
        <div className="text-white/60 text-body-md font-medium mb-2">
          Day {currentDay} of your sacred journey
        </div>
        {/* Audio Status */}
        {isActive && selectedTrack !== 'none' && (
          <div className="flex items-center justify-center gap-2 text-white/70 text-sm">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span>Playing: {selectedTrack === 'mahavakya-gold' ? 'Mahavakya Gold' : selectedTrack === '432hz' ? '432 Hz' : 'None'}</span>
          </div>
        )}
      </div>

      {/* Action Buttons - Clean Style */}
      <div className="flex justify-center gap-4 mb-8">
        {!isActive ? (
          <Button
            onClick={handleStart}
            className="bg-gradient-to-r from-yellow-400/30 to-orange-400/30 hover:from-yellow-400/40 hover:to-orange-400/40 text-white border border-yellow-400/30 backdrop-blur-xl rounded-2xl px-8 py-4 transition-all duration-300 font-medium shadow-[0_4px_20px_rgba(255,200,0,0.2)]"
            disabled={timeLeft === 0}
          >
            <Play className="w-5 h-5 mr-2" />
            Begin Practice
          </Button>
        ) : (
          <Button
            onClick={handlePause}
            className="bg-gradient-to-r from-yellow-400/30 to-orange-400/30 hover:from-yellow-400/40 hover:to-orange-400/40 text-white border border-yellow-400/30 backdrop-blur-xl rounded-2xl px-8 py-4 transition-all duration-300 font-medium shadow-[0_4px_20px_rgba(255,200,0,0.2)]"
          >
            <Pause className="w-5 h-5 mr-2" />
            Pause
          </Button>
        )}
        
        <Button
          onClick={handleReset}
          className="bg-gradient-to-r from-yellow-400/30 to-orange-400/30 hover:from-yellow-400/40 hover:to-orange-400/40 text-white border border-yellow-400/30 backdrop-blur-xl rounded-2xl px-6 py-4 transition-all duration-300 shadow-[0_4px_20px_rgba(255,200,0,0.2)]"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>

      {/* Journey Progress Card - Clean Style */}
      <div className="text-center mb-8">
        <h3 className="text-white/80 text-lg font-medium mb-4">Journey Progress</h3>
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="text-white/60 text-sm">Day {currentDay} Target:</span>
          <span className="text-white text-lg font-bold">{formatTime(currentDay * 10)}</span>
        </div>
        <div className="w-full max-w-xs mx-auto bg-white/10 rounded-full h-2 mb-3">
          <div
            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${levelProgress}%` }}
          ></div>
        </div>
        <p className="text-white/60 text-sm">{levelMotivation}</p>
      </div>

      {/* Current Solar Level Card - Clean Style */}
      <div className="text-center mb-8">
        <h3 className="text-white/80 text-lg font-medium mb-4">Current Solar Level</h3>
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className={`text-2xl font-bold ${currentSolarLevel.color}`}>
            Level {currentSolarLevel.levelNumber}
          </div>
          <div className="text-xl">{currentSolarLevel.emoji}</div>
        </div>
        <h4 className="text-white/80 text-lg font-medium mb-2">
          {currentSolarLevel.title}
        </h4>
        <p className="text-white/60 text-sm max-w-xs mx-auto">
          {currentSolarLevel.description}
        </p>
      </div>

      {/* Practice Duration Card - Clean Style */}
      <div className="text-center mb-8">
        <h3 className="text-white/80 text-lg font-medium mb-4">Practice Duration</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {getCurrentDayTimeOptions().map((seconds) => (
            <button
              key={seconds}
              onClick={() => handleTimeSelect(seconds)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                initialTime === seconds
                  ? 'bg-gradient-to-r from-yellow-400/30 to-orange-400/30 text-white border border-yellow-400/30 shadow-[0_4px_20px_rgba(255,200,0,0.2)]'
                  : 'bg-white/10 text-white/80 hover:bg-white/15 border border-white/20'
              } ${isActive ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} backdrop-blur-xl`}
              disabled={isActive}
            >
              {formatTime(seconds)}
            </button>
          ))}
        </div>
      </div>


    </div>

    {/* Palming Ritual Modal */}
    {/* Level Up Overlay */}
    {showLevelUp && newLevel && (
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl rounded-3xl flex flex-col items-center justify-center p-6 z-20">
        <div className="text-center">
          {/* Celebration animation */}
          <div className="mb-8">
            <div className="relative inline-flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400/30 to-yellow-400/30 blur-3xl scale-150 animate-pulse" />
              <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-orange-500/90 to-yellow-500/90 flex items-center justify-center shadow-[0_0_50px_rgba(249,115,22,0.6)] border-2 border-orange-300/40">
                <div className="text-white text-5xl">{newLevel.emoji}</div>
              </div>
            </div>
          </div>
          
          <h3 className="text-white text-3xl font-light mb-2 drop-shadow-lg">
            Level Up!
          </h3>
          
          <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 backdrop-blur-xl border border-orange-400/30 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className={`text-3xl font-bold ${newLevel.color}`}>
                Level {newLevel.levelNumber}
              </div>
              <div className="text-2xl">{newLevel.emoji}</div>
            </div>
            <h4 className="text-orange-200 text-2xl font-medium mb-2">
              {newLevel.title}
            </h4>
            <p className="text-orange-100 text-lg font-light mb-3">
              {newLevel.subtitle}
            </p>
            <p className="text-orange-100/80 text-sm leading-relaxed">
              {newLevel.description}
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-orange-200 text-sm">
            <div className="w-3 h-3 rounded-full bg-orange-400 animate-pulse"></div>
            <span>{newLevel.timeline}</span>
          </div>
        </div>
      </div>
    )}

    {/* Palming Ritual Modal */}
    {showPalmingRitual && (
      <PalmingRitual 
        onComplete={handlePalmingComplete}
        onClose={handlePalmingClose}
        onExtendPalming={handleExtendPalming}
      />
    )}
    </>
  );
}