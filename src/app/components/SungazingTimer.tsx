"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Play, Pause, RotateCcw, Settings } from "lucide-react";
import { useProgress } from "../hooks/useProgress";
import { PalmingRitual } from "./PalmingRitual";
import { PostSessionModal } from "./PostSessionModal";
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
  const { profile, hasAccess, isPremium } = useSubscription();
  
  // Progress management - loads current day from localStorage
  const { progress, completePractice, savePracticeNotes, advanceDay, getCurrentDayTarget } = useProgress();
  const currentDay = progress?.currentDay || 1;
  
  // Set initial time based on tier and current day
  const getInitialTime = () => {
    // ALL users (free and premium) start at 10 seconds (day 1) and increase by 10 seconds per day
    return getCurrentDayTarget(); // Day 1 = 10s, Day 2 = 20s, Day 3 = 30s, etc.
  };
  
  const [timeLeft, setTimeLeft] = useState(getInitialTime());
  const [initialTime, setInitialTime] = useState(getInitialTime());
  const [isActive, setIsActive] = useState(false);
  const [isInSession, setIsInSession] = useState(false); // controls the in-session "Solar Window" UI
  const [justCompleted, setJustCompleted] = useState(false);
  const [showPreGazingInstructions, setShowPreGazingInstructions] = useState(false);
  const [showPalmingRitual, setShowPalmingRitual] = useState(false);
  const [extendPalming, setExtendPalming] = useState(false);
  const [newLevel, setNewLevel] = useState<SolarLevel | null>(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showPostSessionModal, setShowPostSessionModal] = useState(false);
  const [completedDuration, setCompletedDuration] = useState(0);
  const [completedSessionType, setCompletedSessionType] = useState<'sunrise' | 'sunset' | 'other'>('other');
  const [completedClientSessionId, setCompletedClientSessionId] = useState<string | null>(null);
  const completionFiredRef = useRef(false);
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

  // Helper function to detect session type based on time
  const getSessionType = (): 'sunrise' | 'sunset' | 'other' => {
    const hour = new Date().getHours();
    // Sunrise: 5-9 AM, Sunset: 5-9 PM
    if (hour >= 5 && hour < 9) return 'sunrise';
    if (hour >= 17 && hour < 21) return 'sunset';
    return 'other';
  };
  
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

  // Generate time options - includes day-based progression AND common options like 60 seconds
  const getCurrentDayTimeOptions = () => {
    const options = new Set<number>(); // Use Set to avoid duplicates
    
    // Always include the day-based progression options
    if (currentDay > 1) {
      options.add(getDayTime(currentDay - 1)); // Previous day
    }
    options.add(getDayTime(currentDay)); // Current day (default)
    options.add(getDayTime(currentDay + 1)); // Next day
    if (currentDay + 2 <= 270) {
      options.add(getDayTime(currentDay + 2)); // Day after next
    }
    
    // Always include 60 seconds as an option (common choice)
    options.add(60);
    
    // Include other common durations if they're not already in the list
    // Only add if they're reasonable (not less than current day target)
    const commonOptions = [30, 90, 120, 180, 300]; // 30s, 1.5min, 2min, 3min, 5min
    commonOptions.forEach(opt => {
      if (opt >= getCurrentDayTarget()) {
        options.add(opt);
      }
    });
    
    // Convert to array, sort, and limit to reasonable number of options
    return Array.from(options).sort((a, b) => a - b).slice(0, 6);
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
            setIsInSession(false);
            // Properly handle async function call
            handlePracticeComplete().catch((error) => {
              console.error('Error in handlePracticeComplete:', error);
            });
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
    if (!autoStart || isActive) return;
    completionFiredRef.current = false;
    // Skip pre-gazing instructions and start immediately (existing behavior)
    setShowPreGazingInstructions(false);
    setIsInSession(true);
    // Start the session (also starts audio if configured)
    (async () => {
      try {
        await handleBeginGazing();
      } finally {
        onAutoStartHandled?.();
      }
    })();
  }, [autoStart, isActive, onAutoStartHandled]);

  const handlePracticeComplete = async () => {
    // Guard against double-completion (interval can tick twice before it's cleared)
    if (completionFiredRef.current) return;
    completionFiredRef.current = true;

    try {
      // Stop all audio when practice completes
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsAudioPlaying(false);
      }
      
      // Show completion feedback
      setJustCompleted(true);
      
      // Detect session type based on current time
      const sessionType = getSessionType();
      
      // Auto-save session (AI does it automatically)
      try {
        const clientSessionId = completePractice(initialTime, sessionType);
        setCompletedClientSessionId(clientSessionId);
      } catch (error) {
        console.error('Error completing practice:', error);
      }
      
      // Store completed session info for modal
      setCompletedDuration(initialTime);
      setCompletedSessionType(sessionType);
      
      // Advance day if target met
      try {
        advanceDay();
      } catch (error) {
        console.error('Error advancing day:', error);
      }
      
      // Check for level up
      const completedMinutes = initialTime / 60; // Convert seconds to minutes
      const previousDay = Math.max(1, currentDay - 1);
      const levelUp = checkLevelUp(previousDay, currentDay);
      
      // 1. FIRST: Play gong sound immediately
      setTimeout(async () => {
        try {
          const chimes = new MeditativeChimes();
          await chimes.playCompletionChime();
        } catch (error) {
          console.error('Error playing completion chime:', error);
        }
      }, 500); // Brief pause before playing gong
      
      if (levelUp) {
        setNewLevel(levelUp);
        setShowLevelUp(true);
        
        // After level up animation (5s) + gong sound (2s), show session log modal
        setTimeout(() => {
          try {
            setShowLevelUp(false);
            setShowPostSessionModal(true);
          } catch (error) {
            console.error('Error showing post session modal:', error);
          }
        }, 7000); // 5s level up + 2s for gong to finish
      } else {
        // 2. AFTER GONG: Show session log modal (wait for gong to play ~2s)
        setTimeout(() => {
          try {
            setShowPostSessionModal(true);
          } catch (error) {
            console.error('Error showing post session modal:', error);
          }
        }, 2500); // Wait for gong sound to complete
      }
    } catch (error) {
      console.error('Error in handlePracticeComplete:', error);
      // Don't throw - just log to prevent panic
    }
  };

  const handleStart = async () => {
    // Pre-gazing instructions come before starting the timer (Pic 2)
    setShowPreGazingInstructions(true);
  };

  const handleBeginGazing = async () => {
    completionFiredRef.current = false;
    setShowPreGazingInstructions(false);
    setIsInSession(true);
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

  const handleResumeGazing = async () => {
    setIsInSession(true);
    setIsActive(true);
    // Resume audio when continuing the session
    if (audioRef.current && selectedTrack !== 'none' && !isAudioPlaying) {
      try {
        await audioRef.current.play();
        setIsAudioPlaying(true);
        setAudioError(null);
      } catch (error) {
        console.error('Error resuming selected track:', error);
        setAudioError(`Failed to play audio: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  };


  const handleReset = () => {
    setIsActive(false);
    setIsInSession(false);
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

  const formatTimeMMSS = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
  const hasSessionProgress = timeLeft > 0 && timeLeft !== initialTime && !justCompleted;

  return (
    <>
    <div className="bg-gradient-to-b from-purple-100 via-pink-100 via-rose-200 via-orange-200 to-yellow-200 text-white min-h-screen px-6 pt-3 pb-24 relative overflow-hidden">
      {/* Dark warm overlay for app interface */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-800/95 via-rose-800/95 via-orange-700/95 to-orange-600/95 backdrop-blur-xl" />
      
      {/* Content wrapper - positioned above overlay */}
      <div className="relative z-10">

      {/* In-session UI (Pic 1 style) */}
      {isInSession && (
        <div className="fixed inset-0 z-[90]">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          {/* Subtle teal aurora so it still feels “Sungaze” */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(64,196,255,0.22),transparent_55%),radial-gradient(circle_at_70%_90%,rgba(77,208,225,0.18),transparent_55%)]" />

          <div className="relative z-10 h-full w-full flex items-center justify-center p-6">
            <div className="w-full max-w-sm">
              {/* Close (pause + exit overlay) */}
              <div className="flex justify-end mb-4">
                <button
                  type="button"
                  onClick={() => {
                    handlePause();
                    setIsInSession(false);
                  }}
                  className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-md flex items-center justify-center text-white shadow-[0_6px_18px_rgba(0,0,0,0.35)]"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {/* Card */}
              <div className="bg-black/45 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-[0_12px_40px_rgba(0,0,0,0.55)]">
                <div className="text-center mb-4">
                  <p className="text-white/80 text-xs font-semibold tracking-[0.22em] uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
                    Sungazing Ritual
                  </p>
                  <h2 className="text-2xl text-white font-bold mt-2 drop-shadow-[0_3px_10px_rgba(0,0,0,0.75)]">
                    Enter the Solar Window
                  </h2>
                  <p className="text-white/80 text-sm font-medium mt-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
                    Breathe. Relax your gaze. Let the light become gentle.
                  </p>
                </div>

                {/* Timer */}
                <div className="text-center mb-4">
                  <div className="text-6xl text-white font-semibold tracking-wider tabular-nums drop-shadow-[0_0_40px_rgba(255,215,0,0.35)]">
                    {formatTimeMMSS(timeLeft)}
                  </div>
                  {selectedTrack !== 'none' && (
                    <div className="mt-2 text-white/70 text-xs">
                      {isAudioPlaying ? 'Sacred sound playing' : 'Sacred sound ready'}
                    </div>
                  )}
                </div>

                {/* Brilliant sun (from SungazingRitualIntro) */}
                <div className="relative mx-auto my-6 w-56 h-56">
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_45%_40%,rgba(255,255,255,0.35),rgba(255,235,59,0.55)_28%,rgba(255,193,7,0.55)_55%,rgba(255,152,0,0.25)_72%,transparent_78%)] blur-2xl" />
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_45%_40%,#FFF59D_0%,#FFEB3B_32%,#FFC107_62%,#FF9800_80%)] shadow-[0_0_60px_rgba(255,200,0,0.28)]" />
                  <div className="absolute inset-0 rounded-full border-2 border-[#FFEB3B]/70 shadow-[0_0_22px_rgba(255,235,59,0.32)]" />
                  <div className="absolute inset-0 animate-spin" style={{ animationDuration: "15s" }}>
                    <div className="w-2.5 h-2.5 bg-[#FFF8E1] rounded-full absolute -top-1 left-1/2 transform -translate-x-1/2 shadow-[0_0_12px_rgba(255,248,225,0.9)]" />
                    <div className="w-1.5 h-1.5 bg-[#FFEB3B] rounded-full absolute top-1/2 -right-1 transform -translate-y-1/2 shadow-[0_0_14px_rgba(255,235,59,0.98)]" />
                    <div className="w-2 h-2 bg-[#FFEB3B] rounded-full absolute -bottom-1 left-1/2 transform -translate-x-1/2 shadow-[0_0_16px_rgba(255,235,59,0.98)]" />
                    <div className="w-1.5 h-1.5 bg-[#FFEB3B] rounded-full absolute top-1/2 -left-1 transform -translate-y-1/2 shadow-[0_0_14px_rgba(255,235,59,0.98)]" />
                  </div>
                  <div className="absolute inset-[14px] rounded-full border-2 border-white/40" />
                  <div className="absolute inset-[30px] rounded-full border border-white/25" />
                  <div className="absolute left-1/2 top-1/2 w-5 h-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFF59D] shadow-[0_0_18px_rgba(255,245,157,0.75)]" />
                </div>

                {/* Controls */}
                <div className="grid grid-cols-2 gap-3">
                  {isActive ? (
                    <Button
                      onClick={handlePause}
                      className="w-full bg-white/15 hover:bg-white/20 text-white border border-white/15 backdrop-blur-xl rounded-2xl py-3 transition-all duration-300 font-semibold"
                    >
                      Pause
                    </Button>
                  ) : (
                    <Button
                      onClick={handleResumeGazing}
                      className="w-full bg-white/15 hover:bg-white/20 text-white border border-white/15 backdrop-blur-xl rounded-2xl py-3 transition-all duration-300 font-semibold"
                    >
                      Resume
                    </Button>
                  )}

                  <Button
                    onClick={handleReset}
                    className="w-full bg-gradient-to-r from-yellow-400/25 to-orange-400/25 hover:from-yellow-400/32 hover:to-orange-400/32 text-white border border-yellow-400/25 backdrop-blur-xl rounded-2xl py-3 transition-all duration-300 font-semibold shadow-[0_8px_24px_rgba(255,200,0,0.18)]"
                  >
                    End
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
        <div className="mb-6">
          <div className="text-center mb-4">
            <h3 className="text-white text-sm font-medium mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Choose Sacred Sound</h3>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  setSelectedTrack('mahavakya-gold');
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  selectedTrack === 'mahavakya-gold'
                    ? 'bg-gradient-to-r from-yellow-400/30 to-orange-400/30 text-white border-2 border-yellow-400/60 shadow-[0_4px_20px_rgba(255,200,0,0.2)]'
                    : 'bg-black/40 backdrop-blur-lg border border-white/10 hover:bg-black/50 text-white shadow-[0_4px_16px_rgba(0,0,0,0.3)]'
                }`}
              >
                <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">🎵 Mahavakya Gold</span>
              </button>
              <button
                onClick={() => {
                  setSelectedTrack('432hz');
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  selectedTrack === '432hz'
                    ? 'bg-gradient-to-r from-yellow-400/30 to-orange-400/30 text-white border-2 border-yellow-400/60 shadow-[0_4px_20px_rgba(255,200,0,0.2)]'
                    : 'bg-black/40 backdrop-blur-lg border border-white/10 hover:bg-black/50 text-white shadow-[0_4px_16px_rgba(0,0,0,0.3)]'
                }`}
              >
                <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">🌊 432 Hz</span>
              </button>
              <button
                onClick={() => {
                  setSelectedTrack('none');
                  if (audioRef.current && isAudioPlaying) {
                    audioRef.current.pause();
                    setIsAudioPlaying(false);
                  }
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  selectedTrack === 'none'
                    ? 'bg-gradient-to-r from-yellow-400/30 to-orange-400/30 text-white border-2 border-yellow-400/60 shadow-[0_4px_20px_rgba(255,200,0,0.2)]'
                    : 'bg-black/40 backdrop-blur-lg border border-white/10 hover:bg-black/50 text-white shadow-[0_4px_16px_rgba(0,0,0,0.3)]'
                }`}
              >
                <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">🔇 Silent</span>
              </button>
            </div>
          </div>
          {audioError && (
            <div className="text-center mt-2">
              <span className="text-red-300/80 text-xs">{audioError}</span>
            </div>
          )}
           <div className="text-center mt-2">
             <span className="text-white text-xs drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">Select your preferred audio for the session</span>
           </div>
           {/* Test Audio Button */}
           <div className="text-center mt-3">
             <button
               onClick={() => {
                 if ((window as any).testAudio) {
                   (window as any).testAudio();
                 }
               }}
               className="px-4 py-2 rounded-full text-xs font-medium bg-orange-500/20 text-orange-300 hover:bg-orange-500/30 border border-orange-400/30 transition-all duration-300"
             >
               🎵 Test Audio Now
             </button>
           </div>
        </div>
      )}

      {/* Main Timer Display - Luxury Black Style */}
      <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-[0_4px_16px_rgba(0,0,0,0.3)] mb-8">
        <div className="text-center">
          <div className="text-8xl text-white font-bold mb-2 tracking-tight drop-shadow-[0_3px_6px_rgba(0,0,0,0.9)]">
            {formatTime(timeLeft)}
          </div>
          <div className="text-white text-body-md font-medium mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
            Day {currentDay} of your sacred journey
          </div>
          {/* Audio Status */}
          {isActive && selectedTrack !== 'none' && (
            <div className="flex items-center justify-center gap-2 text-white/80 text-sm drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span>Playing: {selectedTrack === 'mahavakya-gold' ? 'Mahavakya Gold' : selectedTrack === '432hz' ? '432 Hz' : 'None'}</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons - Clean Style */}
      <div className="flex justify-center gap-4 mb-8">
        {!isActive ? (
          hasSessionProgress ? (
            <Button
              onClick={handleResumeGazing}
              className="bg-gradient-to-r from-yellow-400/30 to-orange-400/30 hover:from-yellow-400/40 hover:to-orange-400/40 text-white border border-yellow-400/30 backdrop-blur-xl rounded-2xl px-8 py-4 transition-all duration-300 font-medium shadow-[0_4px_20px_rgba(255,200,0,0.2)]"
            >
              <Play className="w-5 h-5 mr-2" />
              Resume Session
            </Button>
          ) : (
            <Button
              onClick={handleStart}
              className="bg-gradient-to-r from-yellow-400/30 to-orange-400/30 hover:from-yellow-400/40 hover:to-orange-400/40 text-white border border-yellow-400/30 backdrop-blur-xl rounded-2xl px-8 py-4 transition-all duration-300 font-medium shadow-[0_4px_20px_rgba(255,200,0,0.2)]"
              disabled={timeLeft === 0}
            >
              <Play className="w-5 h-5 mr-2" />
              Begin Practice
            </Button>
          )
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

      {/* Journey Progress Card - Luxury Black Style */}
      <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.3)] mb-8">
        <div className="text-center">
          <h3 className="text-white text-lg font-medium mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Journey Progress</h3>
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-white text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">Day {currentDay} Target:</span>
            <span className="text-white text-lg font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{formatTime(currentDay * 10)}</span>
          </div>
          <div className="w-full max-w-xs mx-auto bg-white/10 rounded-full h-2 mb-3">
            <div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${levelProgress}%` }}
            ></div>
          </div>
          <p className="text-white text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">{levelMotivation}</p>
        </div>
      </div>

      {/* Current Solar Level Card - Luxury Black Style */}
      <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.3)] mb-8">
        <div className="text-center">
          <h3 className="text-white text-lg font-medium mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Current Solar Level</h3>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className={`text-2xl font-bold ${currentSolarLevel.color} drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`}>
              Level {currentSolarLevel.levelNumber}
            </div>
            <div className="text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">{currentSolarLevel.emoji}</div>
          </div>
          <h4 className="text-white text-lg font-medium mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {currentSolarLevel.title}
          </h4>
          <p className="text-white text-sm max-w-xs mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
            {currentSolarLevel.description}
          </p>
        </div>
      </div>

      {/* Practice Duration Card - Luxury Black Style */}
      <div className="text-center mb-8">
        <h3 className="text-white text-lg font-medium mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Practice Duration</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {getCurrentDayTimeOptions().map((seconds) => (
            <button
              key={seconds}
              onClick={() => handleTimeSelect(seconds)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                initialTime === seconds
                  ? 'bg-gradient-to-r from-yellow-400/30 to-orange-400/30 text-white border border-yellow-400/30 shadow-[0_4px_20px_rgba(255,200,0,0.2)]'
                  : 'bg-black/40 backdrop-blur-lg border border-white/10 hover:bg-black/50 text-white'
              } ${isActive ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} shadow-[0_4px_16px_rgba(0,0,0,0.3)]`}
              disabled={isActive}
            >
              {formatTime(seconds)}
            </button>
          ))}
        </div>
      </div>
      </div>
      {/* End content wrapper */}

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

    {/* Post-Session Recording Modal */}
    {showPostSessionModal && (
      <PostSessionModal
        isOpen={showPostSessionModal}
        onClose={() => {
          setShowPostSessionModal(false);
          // 3. AFTER SESSION LOG: Show palming ritual (gong already played)
          setJustCompleted(false);
          setShowPalmingRitual(true);
        }}
        duration={completedDuration}
        sessionType={completedSessionType}
        onSave={(notes) => {
          try {
            if (completedClientSessionId) {
              savePracticeNotes(completedClientSessionId, notes);
            }
          } catch (e) {
            console.error('Error saving practice notes:', e);
          }
        }}
      />
    )}
    </>
  );
}