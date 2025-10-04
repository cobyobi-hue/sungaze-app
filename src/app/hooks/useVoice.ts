"use client";

import { useState, useRef, useCallback, useEffect } from 'react';
import { initializeElevenLabs, initializeCompletionVoice, SACRED_PREPARATION_TEXT, SESSION_COMPLETION_TEXT, PALMING_INSTRUCTIONS_TEXT, PALM_WARMING_TEXT, EYE_SANCTUARY_TEXT, INNER_SUN_MEDITATION_TEXT } from '../lib/elevenlabs';
import { initializeWebSpeech, WebSpeechService } from '../lib/speechSynthesis';
import { MeditativeChimes } from '../lib/meditativeChimes';

export interface VoiceState {
  isPlaying: boolean;
  isLoading: boolean;
  isReady: boolean;
  error: string | null;
  duration: number;
  currentTime: number;
}

export function useVoice() {
  const [voiceState, setVoiceState] = useState<VoiceState>({
    isPlaying: false,
    isLoading: false,
    isReady: false,
    error: null,
    duration: 0,
    currentTime: 0,
  });

  const autoPlayRef = useRef(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const completionAudioRef = useRef<HTMLAudioElement | null>(null);
  const palmingAudioRef = useRef<HTMLAudioElement | null>(null);
  const activeAudioRefs = useRef<Set<HTMLAudioElement>>(new Set()); // Track all active audio elements
  const elevenLabsService = useRef(initializeElevenLabs());
  const completionVoiceService = useRef(initializeCompletionVoice());
  const webSpeechService = useRef<WebSpeechService | null>(null);
  const chimeService = useRef<MeditativeChimes>(new MeditativeChimes());
  const isUsingWebSpeech = useRef(false);
  const isUsingChimes = useRef(false);

  // Initialize and preload sacred preparation audio
  // Preload completion message
  const preloadCompletionMessage = useCallback(async () => {
    if (!completionVoiceService.current) return;
    
    try {
      const audioUrl = await completionVoiceService.current.generateSpeechUrl(SESSION_COMPLETION_TEXT);
      const audio = new Audio(audioUrl);
      completionAudioRef.current = audio;
      audio.load(); // Preload the audio
    } catch (error) {
      console.error('Failed to preload completion message:', error);
    }
  }, []);

  // Preload palming instructions
  const preloadPalmingInstructions = useCallback(async () => {
    if (!completionVoiceService.current) return;
    
    try {
      const audioUrl = await completionVoiceService.current.generateSpeechUrl(PALMING_INSTRUCTIONS_TEXT);
      const audio = new Audio(audioUrl);
      palmingAudioRef.current = audio;
      audio.load(); // Preload the audio
    } catch (error) {
      console.error('Failed to preload palming instructions:', error);
    }
  }, []);

  const initializeVoice = useCallback(async (autoPlay = false) => {
    autoPlayRef.current = autoPlay;
    setVoiceState(prev => ({ ...prev, isLoading: true, error: null }));

    // Skip problematic voice systems and go straight to chimes for better reliability
    console.log('Initializing sacred chimes for reliable voice experience...');
    initializeChimeFallback(autoPlay);
  }, []);

  const initializeWebSpeechFallback = useCallback((autoPlay = false) => {
    if (!webSpeechService.current) {
      webSpeechService.current = initializeWebSpeech();
    }

    if (!webSpeechService.current) {
      setVoiceState(prev => ({ 
        ...prev, 
        error: 'Voice synthesis not available in this browser',
        isLoading: false,
        isReady: false 
      }));
      return;
    }

    isUsingWebSpeech.current = true;
    setVoiceState(prev => ({ 
      ...prev, 
      isLoading: false, 
      isReady: true,
      duration: 0, // Web Speech API doesn't provide duration info
      currentTime: 0 
    }));

    // Auto-play if requested
    if (autoPlay) {
      setTimeout(() => {
        playWebSpeech(SACRED_PREPARATION_TEXT);
      }, 100);
    }
  }, []);

  const initializeChimeFallback = useCallback((autoPlay = false) => {
    console.log('Initializing sacred chimes as voice fallback...');
    
    isUsingChimes.current = true;
    isUsingWebSpeech.current = false;
    
    setVoiceState(prev => ({ 
      ...prev, 
      isLoading: false, 
      isReady: true,
      duration: 0, // Chimes don't have specific durations
      currentTime: 0,
      error: null
    }));

    // Auto-play preparation chime if requested
    if (autoPlay) {
      setTimeout(async () => {
        await chimeService.current.playPreparationChime();
        setVoiceState(prev => ({ ...prev, isPlaying: true }));
        
        // Set playing to false after chime completes (approximately 3 seconds)
        setTimeout(() => {
          setVoiceState(prev => ({ ...prev, isPlaying: false }));
        }, 3000);
      }, 100);
    }
  }, []);

  const playWebSpeech = useCallback(async (text: string) => {
    if (!webSpeechService.current) return;

    try {
      setVoiceState(prev => ({ ...prev, isPlaying: true }));
      await webSpeechService.current.speak(text);
      setVoiceState(prev => ({ ...prev, isPlaying: false }));
    } catch (error) {
      console.error('Web Speech error:', error);
      setVoiceState(prev => ({ 
        ...prev, 
        error: null, // Don't show error, just fall back to chimes
        isPlaying: false 
      }));
    }
  }, []);

  const playVoice = useCallback(async () => {
    if (isUsingChimes.current) {
      setVoiceState(prev => ({ ...prev, isPlaying: true }));
      await chimeService.current.playPreparationChime();
      setTimeout(() => {
        setVoiceState(prev => ({ ...prev, isPlaying: false }));
      }, 3000);
    } else if (isUsingWebSpeech.current && webSpeechService.current) {
      playWebSpeech(SACRED_PREPARATION_TEXT);
    } else if (audioRef.current && voiceState.isReady) {
      audioRef.current.play().catch(error => {
        console.error('Voice playback error:', error);
        setVoiceState(prev => ({ 
          ...prev, 
          error: 'Failed to play audio' 
        }));
      });
    }
  }, [voiceState.isReady, playWebSpeech]);

  const pauseVoice = useCallback(() => {
    if (isUsingChimes.current) {
      // Chimes can't really be paused, just stop the state
      setVoiceState(prev => ({ ...prev, isPlaying: false }));
    } else if (isUsingWebSpeech.current && webSpeechService.current) {
      webSpeechService.current.pause();
      setVoiceState(prev => ({ ...prev, isPlaying: false }));
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const stopVoice = useCallback(() => {
    console.log('Stopping all voice audio...');
    
    // Stop all active audio elements
    activeAudioRefs.current.forEach(audio => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    activeAudioRefs.current.clear();
    
    if (isUsingChimes.current) {
      // Chimes naturally stop, just reset state
      setVoiceState(prev => ({ ...prev, isPlaying: false, currentTime: 0 }));
    } else if (isUsingWebSpeech.current && webSpeechService.current) {
      webSpeechService.current.stop();
      setVoiceState(prev => ({ ...prev, isPlaying: false, currentTime: 0 }));
    } else if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    // Also stop the main audio refs
    if (completionAudioRef.current) {
      completionAudioRef.current.pause();
      completionAudioRef.current.currentTime = 0;
    }
    if (palmingAudioRef.current) {
      palmingAudioRef.current.pause();
      palmingAudioRef.current.currentTime = 0;
    }
  }, []);

  // Generate and play gong sound
  const playGong = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create oscillator for the gong sound
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Configure gong-like sound
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime); // Start frequency
      oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 2); // Decay to lower frequency
      
      // Configure envelope (fade out)
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 3);
      
      oscillator.type = 'sine';
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 3);
      
    } catch (error) {
      console.error('Gong sound error:', error);
    }
  }, []);

  // Play session completion message
  const playCompletionMessage = useCallback(async () => {
    // Use chimes if that's our current fallback
    if (isUsingChimes.current) {
      setVoiceState(prev => ({ ...prev, isPlaying: true }));
      await chimeService.current.playCompletionChime();
      setTimeout(() => {
        setVoiceState(prev => ({ ...prev, isPlaying: false }));
      }, 4000); // Completion chimes are longer
      return;
    }

    // Try Web Speech API fallback if ElevenLabs is not working
    if (isUsingWebSpeech.current || !completionVoiceService.current) {
      if (webSpeechService.current) {
        await playWebSpeech(SESSION_COMPLETION_TEXT);
      }
      return;
    }

    try {
      let audio = completionAudioRef.current;
      
      // If not preloaded, generate it now
      if (!audio && completionVoiceService.current) {
        setVoiceState(prev => ({ ...prev, isLoading: true, error: null }));
        const audioUrl = await completionVoiceService.current.generateSpeechUrl(SESSION_COMPLETION_TEXT);
        audio = new Audio(audioUrl);
        completionAudioRef.current = audio;
      }
      
      if (!audio) {
        console.warn('ElevenLabs completion voice service not available, using fallback');
        // Use chimes as preferred fallback over computer voice
        if (chimeService.current) {
          setVoiceState(prev => ({ ...prev, isPlaying: true }));
          await chimeService.current.playCompletionChime();
          setTimeout(() => {
            setVoiceState(prev => ({ ...prev, isPlaying: false }));
          }, 4000);
        } else if (webSpeechService.current) {
          await playWebSpeech(SESSION_COMPLETION_TEXT);
        }
        return;
      }

      // Set up event listeners for completion audio
      audio.onloadedmetadata = () => {
        setVoiceState(prev => ({ 
          ...prev, 
          isLoading: false, 
          duration: audio.duration 
        }));
      };

      audio.ontimeupdate = () => {
        setVoiceState(prev => ({ 
          ...prev, 
          currentTime: audio.currentTime 
        }));
      };

      audio.onplay = () => {
        setVoiceState(prev => ({ ...prev, isPlaying: true }));
      };

      audio.onpause = () => {
        setVoiceState(prev => ({ ...prev, isPlaying: false }));
      };

      audio.onended = () => {
        setVoiceState(prev => ({ 
          ...prev, 
          isPlaying: false, 
          currentTime: 0 
        }));
      };

      audio.onerror = () => {
        setVoiceState(prev => ({ 
          ...prev, 
          error: 'Failed to play completion message',
          isLoading: false,
          isPlaying: false 
        }));
      };

      // Pause current audio if any and play completion message
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      // Reset and play
      audio.currentTime = 0;
      await audio.play();

    } catch (error) {
      console.error('Completion voice error:', error);
      setVoiceState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to play completion message',
        isLoading: false,
        isPlaying: false 
      }));
    }
  }, []);

  // Play palming instructions message
  const playPalmingInstructions = useCallback(async () => {
    // Use chimes if that's our current fallback
    if (isUsingChimes.current) {
      setVoiceState(prev => ({ ...prev, isPlaying: true }));
      await chimeService.current.playPalmingChime();
      setTimeout(() => {
        setVoiceState(prev => ({ ...prev, isPlaying: false }));
      }, 4500); // Palming chimes are deep and longer
      return;
    }

    try {
      let audio = palmingAudioRef.current;
      
      // If not preloaded, generate it now
      if (!audio && completionVoiceService.current) {
        setVoiceState(prev => ({ ...prev, isLoading: true, error: null }));
        const audioUrl = await completionVoiceService.current.generateSpeechUrl(PALMING_INSTRUCTIONS_TEXT);
        audio = new Audio(audioUrl);
        palmingAudioRef.current = audio;
      }
      
      if (!audio) {
        console.warn('ElevenLabs palming voice service not available, using chime fallback');
        // Use chimes as preferred fallback
        if (chimeService.current) {
          setVoiceState(prev => ({ ...prev, isPlaying: true }));
          await chimeService.current.playPalmingChime();
          setTimeout(() => {
            setVoiceState(prev => ({ ...prev, isPlaying: false }));
          }, 4500);
        }
        return;
      }

      // Set up event listeners for palming audio
      audio.onloadedmetadata = () => {
        setVoiceState(prev => ({ 
          ...prev, 
          isLoading: false, 
          duration: audio.duration 
        }));
      };

      audio.ontimeupdate = () => {
        setVoiceState(prev => ({ 
          ...prev, 
          currentTime: audio.currentTime 
        }));
      };

      audio.onplay = () => {
        setVoiceState(prev => ({ ...prev, isPlaying: true }));
      };

      audio.onpause = () => {
        setVoiceState(prev => ({ ...prev, isPlaying: false }));
      };

      audio.onended = () => {
        setVoiceState(prev => ({ 
          ...prev, 
          isPlaying: false, 
          currentTime: 0 
        }));
      };

      audio.onerror = () => {
        setVoiceState(prev => ({ 
          ...prev, 
          error: 'Failed to play palming instructions',
          isLoading: false,
          isPlaying: false 
        }));
      };

      // Pause current audio if any and play palming instructions
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (completionAudioRef.current) {
        completionAudioRef.current.pause();
      }
      
      // Reset and play
      audio.currentTime = 0;
      await audio.play();

    } catch (error) {
      console.error('Palming instructions voice error:', error);
      setVoiceState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to play palming instructions',
        isLoading: false,
        isPlaying: false 
      }));
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Stop all active audio elements
      activeAudioRefs.current.forEach(audio => {
        if (audio) {
          audio.pause();
        }
      });
      activeAudioRefs.current.clear();
      
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (completionAudioRef.current) {
        completionAudioRef.current.pause();
        completionAudioRef.current = null;
      }
      if (palmingAudioRef.current) {
        palmingAudioRef.current.pause();
        palmingAudioRef.current = null;
      }
    };
  }, []);

  // Play palm warming guidance
  const playPalmWarmingGuidance = useCallback(async () => {
    if (isUsingChimes.current) {
      await chimeService.current.playPreparationChime();
      return;
    }

    try {
      if (completionVoiceService.current) {
        const audioUrl = await completionVoiceService.current.generateSpeechUrl(PALM_WARMING_TEXT);
        const audio = new Audio(audioUrl);
        audio.volume = 0.8;
        
        // Track this audio element
        activeAudioRefs.current.add(audio);
        
        // Clean up when audio ends
        audio.onended = () => {
          activeAudioRefs.current.delete(audio);
        };
        
        await audio.play();
      } else if (webSpeechService.current) {
        await playWebSpeech(PALM_WARMING_TEXT);
      } else {
        await chimeService.current.playPreparationChime();
      }
    } catch (error) {
      console.error('Palm warming voice error:', error);
      await chimeService.current.playPreparationChime();
    }
  }, [playWebSpeech]);

  // Play eye sanctuary guidance
  const playEyeSanctuaryGuidance = useCallback(async () => {
    if (isUsingChimes.current) {
      await chimeService.current.playTransitionChime();
      return;
    }

    try {
      if (completionVoiceService.current) {
        const audioUrl = await completionVoiceService.current.generateSpeechUrl(EYE_SANCTUARY_TEXT);
        const audio = new Audio(audioUrl);
        audio.volume = 0.8;
        
        // Track this audio element
        activeAudioRefs.current.add(audio);
        
        // Clean up when audio ends
        audio.onended = () => {
          activeAudioRefs.current.delete(audio);
        };
        
        await audio.play();
      } else if (webSpeechService.current) {
        await playWebSpeech(EYE_SANCTUARY_TEXT);
      } else {
        await chimeService.current.playTransitionChime();
      }
    } catch (error) {
      console.error('Eye sanctuary voice error:', error);
      await chimeService.current.playTransitionChime();
    }
  }, [playWebSpeech]);

  // Play inner sun meditation guidance
  const playInnerSunGuidance = useCallback(async () => {
    if (isUsingChimes.current) {
      await chimeService.current.playPalmingChime();
      return;
    }

    try {
      if (completionVoiceService.current) {
        const audioUrl = await completionVoiceService.current.generateSpeechUrl(INNER_SUN_MEDITATION_TEXT);
        const audio = new Audio(audioUrl);
        audio.volume = 0.8;
        
        // Track this audio element
        activeAudioRefs.current.add(audio);
        
        // Clean up when audio ends
        audio.onended = () => {
          activeAudioRefs.current.delete(audio);
        };
        
        await audio.play();
      } else if (webSpeechService.current) {
        await playWebSpeech(INNER_SUN_MEDITATION_TEXT);
      } else {
        await chimeService.current.playPalmingChime();
      }
    } catch (error) {
      console.error('Inner sun voice error:', error);
      await chimeService.current.playPalmingChime();
    }
  }, [playWebSpeech]);

  return {
    voiceState,
    initializeVoice,
    playVoice,
    pauseVoice,
    stopVoice,
    playCompletionMessage,
    playGong,
    playPalmingInstructions,
    playPalmWarmingGuidance,
    playEyeSanctuaryGuidance,
    playInnerSunGuidance,
  };
}