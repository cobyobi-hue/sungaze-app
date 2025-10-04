"use client";

import { useState, useEffect, useRef } from 'react';
import { MeditativeChimes } from '../../lib/meditativeChimes';
import { Volume2, VolumeX, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';

interface CloudGazingModeProps {
  isActive: boolean;
  duration?: number;
  onComplete?: () => void;
  onBack?: () => void;
}

export default function CloudGazingMode({ isActive, duration, onComplete, onBack }: CloudGazingModeProps) {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [chimes] = useState(() => new MeditativeChimes());
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<'mahavakya-gold' | '432hz' | 'none'>('mahavakya-gold');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Get track filename based on selection
  const getTrackFilename = (track: string) => {
    switch (track) {
      case 'mahavakya-gold':
        return 'Mahavakya gold .mp3';
      case '432hz':
        return '432 Hz.wav';
      default:
        return null;
    }
  };

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeElapsed(prev => {
        const newTime = prev + 1;
        if (duration && newTime >= duration) {
          // Stop all audio when session completes
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsAudioPlaying(false);
          }
          
          // Play completion chime before calling onComplete
          chimes.playCompletionChime().then(() => {
            onComplete?.();
          });
          return duration;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, duration, onComplete]);

  useEffect(() => {
    if (!isActive) {
      setTimeElapsed(0);
      // Stop audio when leaving the cloud gazing mode
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsAudioPlaying(false);
    }
  }, [isActive]);

  // Initialize audio element when track changes
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
        if (!filename) return;

        const response = await fetch('/api/audio/signed-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ storagePath: `audio/${filename}` })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch audio URL');
        }

        const { url } = await response.json();
        
        // Create audio element
        const audio = new Audio(url);
        audio.preload = 'auto';
        audio.loop = true; // Loop throughout the entire session
        audio.volume = 0.7; // Set comfortable volume level
        audio.addEventListener('ended', () => setIsAudioPlaying(false));
        audio.addEventListener('error', () => {
          setAudioError('Failed to load background music');
          setIsAudioPlaying(false);
        });
        audioRef.current = audio;
      } catch (error) {
        console.error('Error loading cloud gazing audio:', error);
        setAudioError('Background music unavailable');
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

  const toggleAudio = async () => {
    if (!audioRef.current) {
      setAudioError('Audio not loaded yet');
      return;
    }

    if (isAudioPlaying) {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsAudioPlaying(true);
        setAudioError(null);
      } catch (error) {
        console.error('Error playing audio:', error);
        setAudioError('Failed to play audio');
      }
    }
  };

  const handleBack = () => {
    setTimeElapsed(0);
    // Stop audio when going back
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsAudioPlaying(false);
    onBack?.();
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-blue-200 via-blue-100 to-blue-50 overflow-hidden">
      {/* Back button */}
      <div className="absolute top-6 left-6 z-20">
        <Button
          onClick={handleBack}
          className="bg-black/40 hover:bg-black/60 text-white border border-blue-900/30 backdrop-blur-sm rounded-2xl p-3 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>

      {/* Audio Controls - Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <div className="flex gap-2">
          <button
            onClick={() => {
              setSelectedTrack('mahavakya-gold');
              if (audioRef.current && isAudioPlaying) {
                audioRef.current.pause();
                setIsAudioPlaying(false);
              }
            }}
            className={`px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
              selectedTrack === 'mahavakya-gold'
                ? 'bg-gradient-to-r from-yellow-400/30 to-orange-400/30 text-white border-2 border-yellow-400/60'
                : 'bg-black/40 text-white/70 hover:bg-black/60 border border-blue-900/30'
            }`}
          >
            {isAudioPlaying && selectedTrack === 'mahavakya-gold' ? '🔊 Mahavakya' : '🎵 Mahavakya'}
          </button>
          <button
            onClick={() => {
              setSelectedTrack('432hz');
              if (audioRef.current && isAudioPlaying) {
                audioRef.current.pause();
                setIsAudioPlaying(false);
              }
            }}
            className={`px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
              selectedTrack === '432hz'
                ? 'bg-gradient-to-r from-yellow-400/30 to-orange-400/30 text-white border-2 border-yellow-400/60'
                : 'bg-black/40 text-white/70 hover:bg-black/60 border border-blue-900/30'
            }`}
          >
            {isAudioPlaying && selectedTrack === '432hz' ? '🔊 432Hz' : '🌊 432Hz'}
          </button>
          <button
            onClick={() => {
              setSelectedTrack('none');
              if (audioRef.current && isAudioPlaying) {
                audioRef.current.pause();
                setIsAudioPlaying(false);
              }
            }}
            className={`px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
              selectedTrack === 'none'
                ? 'bg-gradient-to-r from-yellow-400/30 to-orange-400/30 text-white border-2 border-yellow-400/60'
                : 'bg-black/40 text-white/70 hover:bg-black/60 border border-blue-900/30'
            }`}
          >
            🔇
          </button>
          <Button
            onClick={toggleAudio}
            className="bg-black/40 hover:bg-black/60 text-white border border-blue-900/30 backdrop-blur-sm rounded-2xl p-3 transition-all duration-300"
            title={isAudioPlaying ? 'Pause background music' : 'Play background music'}
          >
            {isAudioPlaying ? <Volume2 className="w-4 h-4 text-blue-400" /> : <VolumeX className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Animated clouds */}
      <div className="relative w-full h-full">
        {/* Background clouds */}
        <div className="absolute inset-0">
          <div className="animate-float-slow absolute top-20 left-10 w-32 h-16 bg-white bg-opacity-60 rounded-full blur-sm transform rotate-12"></div>
          <div className="animate-float-slower absolute top-40 right-20 w-48 h-20 bg-white bg-opacity-50 rounded-full blur-sm"></div>
          <div className="animate-float-slow absolute top-60 left-1/3 w-64 h-24 bg-white bg-opacity-40 rounded-full blur-md"></div>
          <div className="animate-float-slower absolute top-80 right-1/3 w-40 h-18 bg-white bg-opacity-55 rounded-full blur-sm"></div>
          <div className="animate-float-slow absolute bottom-40 left-16 w-56 h-22 bg-white bg-opacity-45 rounded-full blur-sm"></div>
          <div className="animate-float-slower absolute bottom-60 right-12 w-36 h-16 bg-white bg-opacity-65 rounded-full blur-sm transform -rotate-6"></div>
        </div>

        {/* Center focus area */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="mb-8">
              <div className="text-6xl text-blue-600 opacity-80 animate-pulse-slow">☁️</div>
            </div>
            
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl px-8 py-6 mx-4">
              <h2 className="text-2xl font-light text-blue-900 mb-2">Cloud Gazing</h2>
              <p className="text-blue-800 text-sm opacity-90 mb-4">
                Let your mind drift like clouds in the endless sky
              </p>
              
              {duration && (
                <div className="text-blue-700 text-lg font-mono">
                  {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}
                  {duration && (
                    <span className="text-sm opacity-70">
                      {' '}/ {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Breathing prompt */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
          <div className="bg-white bg-opacity-30 backdrop-blur-sm rounded-full px-6 py-3">
            <p className="text-blue-800 text-sm font-light animate-pulse-gentle">
              Breathe with the clouds... in... out...
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-1deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes pulse-gentle {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float-slower 12s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-pulse-gentle {
          animation: pulse-gentle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}