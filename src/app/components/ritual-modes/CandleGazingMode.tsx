"use client";

import { useState, useEffect, useRef } from 'react';
import { MeditativeChimes } from '../../lib/meditativeChimes';
import { Play, Pause, ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import { Button } from '../ui/button';

interface CandleGazingModeProps {
  isActive: boolean;
  duration?: number;
  onComplete?: () => void;
  onBack?: () => void;
}

export default function CandleGazingMode({ isActive, duration, onComplete, onBack }: CandleGazingModeProps) {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
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
    if (!isActive || !isPlaying) return;

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
            setIsPlaying(false);
            onComplete?.();
          });
          return duration;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, isPlaying, duration, onComplete, chimes]);

  useEffect(() => {
    if (!isActive) {
      setTimeElapsed(0);
      setIsPlaying(false);
      // Stop audio when leaving the candle gazing mode
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
          setAudioError('Failed to load audio guidance');
          setIsAudioPlaying(false);
        });
        audioRef.current = audio;
      } catch (error) {
        console.error('Error loading candle gaze audio:', error);
        setAudioError('Audio guidance unavailable');
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

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

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
    setIsPlaying(false);
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
    <div className="fixed inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Back button */}
      <div className="absolute top-6 left-6 z-20">
        <Button
          onClick={handleBack}
          className="bg-black/40 hover:bg-black/60 text-white border border-orange-900/30 backdrop-blur-sm rounded-2xl p-3 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>

      {/* Timer Controls - Top Right */}
      <div className="absolute top-6 right-6 z-20 flex gap-2">
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
                : 'bg-black/40 text-white/70 hover:bg-black/60 border border-orange-900/30'
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
                : 'bg-black/40 text-white/70 hover:bg-black/60 border border-orange-900/30'
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
                : 'bg-black/40 text-white/70 hover:bg-black/60 border border-orange-900/30'
            }`}
          >
            🔇
          </button>
        </div>
        
        {/* Audio Guidance Button */}
        <Button
          onClick={toggleAudio}
          className="bg-black/40 hover:bg-black/60 text-white border border-orange-900/30 backdrop-blur-sm rounded-2xl p-3 transition-all duration-300"
          title={isAudioPlaying ? 'Pause background music' : 'Play background music'}
        >
          {isAudioPlaying ? <Volume2 className="w-4 h-4 text-orange-400" /> : <VolumeX className="w-4 h-4" />}
        </Button>
        
        {/* Timer Play/Pause button */}
        <Button
          onClick={handlePlayPause}
          className="bg-black/40 hover:bg-black/60 text-white border border-orange-900/30 backdrop-blur-sm rounded-2xl p-3 transition-all duration-300"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
      </div>

      {/* Candle flame area */}
      <div className="relative w-full h-full flex items-center justify-center">
        
        {/* Candle base */}
        <div className="relative">
          {/* Candle body */}
          <div className="w-8 h-48 bg-gradient-to-b from-amber-100 to-amber-200 rounded-b-md mx-auto relative">
            {/* Wax drips */}
            <div className="absolute -left-1 top-12 w-2 h-6 bg-amber-100 rounded-full opacity-80"></div>
            <div className="absolute -right-1 top-20 w-1 h-8 bg-amber-200 rounded-full opacity-60"></div>
          </div>
          
          {/* Flame */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              {/* Main flame body - much brighter and larger */}
              <div className="w-8 h-16 bg-gradient-to-t from-red-500 via-orange-400 via-yellow-300 to-yellow-100 rounded-full animate-flame-dance opacity-100 shadow-[0_0_20px_rgba(255,165,0,0.8)]"></div>
              {/* Inner core - bright white/yellow */}
              <div className="absolute inset-0 w-5 h-12 bg-gradient-to-t from-orange-300 via-yellow-200 to-white rounded-full translate-x-1.5 translate-y-2 opacity-90"></div>
              {/* Outer flame glow - enhanced */}
              <div className="absolute inset-0 w-12 h-20 bg-gradient-to-t from-red-600 via-orange-500 via-yellow-400 to-transparent rounded-full animate-flame-glow opacity-70 -translate-x-2 -translate-y-2 blur-sm"></div>
              {/* Flame tip - brighter */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-3 h-6 bg-gradient-to-t from-yellow-100 via-white to-transparent rounded-full animate-flame-tip opacity-95"></div>
              {/* Additional bright center */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-2 h-8 bg-gradient-to-t from-yellow-200 to-white rounded-full opacity-80"></div>
            </div>
          </div>

          {/* Soft glow around candle */}
          <div className="absolute inset-0 bg-gradient-radial from-orange-300 via-orange-200 to-transparent opacity-20 blur-xl scale-150"></div>
        </div>

        {/* Focus instructions */}
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
          <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-2xl px-8 py-6 mx-4 border border-orange-900 border-opacity-30">
            <h2 className="text-2xl font-light text-orange-100 mb-2 text-center">Candle Gazing (Trataka)</h2>
            <p className="text-orange-200 text-sm opacity-90 mb-4 text-center max-w-xs">
              <strong>Prepare:</strong> Create a dark room, light a real candle, and gaze at the actual flame. Focus your gaze softly on the flame. Let thoughts dissolve in the light.
            </p>
            
            {duration && (
              <div className="text-orange-300 text-lg font-mono text-center">
                {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}
                {duration && (
                  <span className="text-sm opacity-70">
                    {' '}/ {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}
                  </span>
                )}
              </div>
            )}

            {/* Play/Pause status */}
            <div className="text-center mt-4">
              <p className="text-orange-200 text-sm opacity-80">
                {isPlaying ? 'Session in progress...' : 'Tap play to begin your practice'}
              </p>
            </div>
          </div>
        </div>

        {/* Meditation guidance */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
          <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-full px-6 py-3 border border-orange-900 border-opacity-20">
            <p className="text-orange-200 text-sm font-light animate-pulse-gentle text-center">
              Steady gaze... steady breath... steady mind...
            </p>
          </div>
        </div>

        {/* Ambient particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="animate-float-1 absolute top-1/3 left-1/4 w-1 h-1 bg-orange-400 rounded-full opacity-60 blur-sm"></div>
          <div className="animate-float-2 absolute top-1/2 right-1/3 w-1 h-1 bg-yellow-300 rounded-full opacity-40 blur-sm"></div>
          <div className="animate-float-3 absolute bottom-1/3 left-1/3 w-1 h-1 bg-orange-300 rounded-full opacity-50 blur-sm"></div>
          <div className="animate-float-4 absolute top-2/3 right-1/4 w-1 h-1 bg-yellow-400 rounded-full opacity-30 blur-sm"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes flame-dance {
          0%, 100% { transform: scaleY(1) scaleX(1); }
          25% { transform: scaleY(1.1) scaleX(0.95) translateX(1px); }
          50% { transform: scaleY(0.95) scaleX(1.05) translateX(-1px); }
          75% { transform: scaleY(1.05) scaleX(0.98) translateX(0.5px); }
        }
        @keyframes flame-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        @keyframes flame-tip {
          0%, 100% { opacity: 0.8; transform: translateX(-50%) scaleY(1); }
          50% { opacity: 1; transform: translateX(-50%) scaleY(1.2); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-30px) translateX(10px); opacity: 0.8; }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          50% { transform: translateY(-40px) translateX(-15px); opacity: 0.6; }
        }
        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.4; }
          50% { transform: translateY(-25px) translateX(20px); opacity: 0.7; }
        }
        @keyframes float-4 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-35px) translateX(-10px); opacity: 0.5; }
        }
        @keyframes pulse-gentle {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        .animate-flame-dance {
          animation: flame-dance 2s ease-in-out infinite;
        }
        .animate-flame-glow {
          animation: flame-glow 3s ease-in-out infinite;
        }
        .animate-flame-tip {
          animation: flame-tip 1.5s ease-in-out infinite;
        }
        .animate-float-1 {
          animation: float-1 8s ease-in-out infinite;
        }
        .animate-float-2 {
          animation: float-2 10s ease-in-out infinite;
        }
        .animate-float-3 {
          animation: float-3 7s ease-in-out infinite;
        }
        .animate-float-4 {
          animation: float-4 9s ease-in-out infinite;
        }
        .animate-pulse-gentle {
          animation: pulse-gentle 3s ease-in-out infinite;
        }
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
}
