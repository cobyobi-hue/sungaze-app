"use client";

import { useState, useEffect, useRef } from 'react';
import { MeditativeChimes } from '../../lib/meditativeChimes';
import { Volume2, VolumeX, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';

interface BarefootWalkModeProps {
  isActive: boolean;
  duration?: number;
  onComplete?: () => void;
  onBack?: () => void;
}

export default function BarefootWalkMode({ isActive, duration, onComplete, onBack }: BarefootWalkModeProps) {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [stepCount, setStepCount] = useState(0);
  const [chimes] = useState(() => new MeditativeChimes());
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeElapsed(prev => {
        const newTime = prev + 1;
        if (duration && newTime >= duration) {
          // Play completion chime before calling onComplete
          chimes.playCompletionChime().then(() => {
            onComplete?.();
          });
          return duration;
        }
        return newTime;
      });
    }, 1000);

    // Simulate gentle step counter (for mindful walking)
    const stepInterval = setInterval(() => {
      if (Math.random() > 0.7) { // Gentle, irregular stepping
        setStepCount(prev => prev + 1);
      }
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
    };
  }, [isActive, duration, onComplete]);

  useEffect(() => {
    if (!isActive) {
      setTimeElapsed(0);
      setStepCount(0);
      // Stop audio when leaving the barefoot walk mode
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsAudioPlaying(false);
    }
  }, [isActive]);

  // Initialize audio element
  useEffect(() => {
    const fetchAudioUrl = async () => {
      try {
        const response = await fetch('/api/audio/signed-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ storagePath: 'audio/Celestial Turiya .mp3' })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch audio URL');
        }

        const { url } = await response.json();
        
        // Create audio element
        const audio = new Audio(url);
        audio.preload = 'auto';
        audio.loop = true; // Loop the audio for continuous playback
        audio.addEventListener('ended', () => setIsAudioPlaying(false));
        audio.addEventListener('error', () => {
          setAudioError('Failed to load background music');
          setIsAudioPlaying(false);
        });
        audioRef.current = audio;
      } catch (error) {
        console.error('Error loading barefoot walk audio:', error);
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
  }, []);

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
    setStepCount(0);
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
    <div className="fixed inset-0 bg-gradient-to-b from-green-100 via-emerald-50 to-amber-50 overflow-hidden">
      {/* Back button */}
      <div className="absolute top-6 left-6 z-20">
        <Button
          onClick={handleBack}
          className="bg-black/40 hover:bg-black/60 text-white border border-green-900/30 backdrop-blur-sm rounded-2xl p-3 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>

      {/* Audio Controls - Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <Button
          onClick={toggleAudio}
          className="bg-black/40 hover:bg-black/60 text-white border border-green-900/30 backdrop-blur-sm rounded-2xl p-3 transition-all duration-300"
          title={isAudioPlaying ? 'Pause background music' : 'Play background music'}
        >
          {isAudioPlaying ? <Volume2 className="w-5 h-5 text-green-400" /> : <VolumeX className="w-5 h-5" />}
        </Button>
      </div>

      {/* Nature scene */}
      <div className="relative w-full h-full">
        
        {/* Ground/path */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-200 via-amber-100 to-transparent">
          {/* Footsteps trail */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-8 opacity-30">
            <div className="w-3 h-6 bg-amber-700 rounded-full transform rotate-12"></div>
            <div className="w-3 h-6 bg-amber-700 rounded-full transform -rotate-12"></div>
            <div className="w-3 h-6 bg-amber-700 rounded-full transform rotate-12"></div>
            <div className="w-3 h-6 bg-amber-700 rounded-full transform -rotate-12"></div>
          </div>
        </div>

        {/* Trees and nature elements */}
        <div className="absolute inset-0">
          {/* Trees */}
          <div className="absolute left-10 top-20 w-4 h-32 bg-amber-800 rounded-t-full"></div>
          <div className="absolute left-8 top-16 w-16 h-16 bg-green-400 rounded-full opacity-80"></div>
          
          <div className="absolute right-16 top-32 w-6 h-40 bg-amber-900 rounded-t-full"></div>
          <div className="absolute right-12 top-28 w-20 h-20 bg-green-500 rounded-full opacity-75"></div>
          
          <div className="absolute left-1/4 top-40 w-3 h-24 bg-amber-800 rounded-t-full"></div>
          <div className="absolute left-1/4 top-36 w-12 h-12 bg-green-300 rounded-full opacity-70 transform -translate-x-2"></div>

          {/* Grass patches */}
          <div className="absolute bottom-32 left-20 w-8 h-4 bg-green-400 rounded-full opacity-60 blur-sm"></div>
          <div className="absolute bottom-28 right-24 w-12 h-3 bg-green-500 rounded-full opacity-50 blur-sm"></div>
          <div className="absolute bottom-40 left-1/3 w-6 h-2 bg-green-300 rounded-full opacity-70 blur-sm"></div>
          
          {/* Floating leaves */}
          <div className="animate-leaf-1 absolute top-1/3 left-1/4 w-2 h-3 bg-green-400 rounded-full opacity-60 transform rotate-45"></div>
          <div className="animate-leaf-2 absolute top-1/2 right-1/3 w-3 h-2 bg-yellow-400 rounded-full opacity-50 transform -rotate-12"></div>
          <div className="animate-leaf-3 absolute top-2/3 left-1/2 w-2 h-2 bg-orange-400 rounded-full opacity-40"></div>
        </div>

        {/* Center focus area */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="mb-8">
              <div className="text-6xl text-green-600 opacity-80 animate-pulse-slow">🦶</div>
            </div>
            
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl px-8 py-6 mx-4 border border-green-200 border-opacity-50">
              <h2 className="text-2xl font-light text-green-900 mb-2">Barefoot Walk</h2>
              <p className="text-green-800 text-sm opacity-90 mb-4 max-w-xs">
                Feel the earth beneath your feet. Each step a connection to the ground.
              </p>
              
              <div className="flex justify-center items-center space-x-6 mb-4">
                <div className="text-center">
                  <div className="text-lg font-mono text-green-700">
                    {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}
                    {duration && (
                      <span className="text-sm opacity-70">
                        {' '}/ {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-green-600 opacity-70">Time</div>
                </div>
                
                <div className="w-px h-8 bg-green-400 opacity-40"></div>
                
                <div className="text-center">
                  <div className="text-lg font-mono text-green-700">{stepCount}</div>
                  <div className="text-xs text-green-600 opacity-70">Steps</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grounding instructions */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
          <div className="bg-white bg-opacity-30 backdrop-blur-sm rounded-full px-6 py-3 border border-green-300 border-opacity-40">
            <p className="text-green-800 text-sm font-light animate-pulse-gentle text-center">
              Feel... breathe... step... ground...
            </p>
          </div>
        </div>

        {/* Connection to earth visualization */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
          <div className="w-1 h-16 bg-gradient-to-t from-amber-600 to-transparent opacity-40 animate-pulse-slow"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes leaf-1 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(45deg); opacity: 0.4; }
          50% { transform: translateY(-20px) translateX(10px) rotate(60deg); opacity: 0.8; }
        }
        @keyframes leaf-2 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(-12deg); opacity: 0.3; }
          50% { transform: translateY(-15px) translateX(-8px) rotate(-25deg); opacity: 0.7; }
        }
        @keyframes leaf-3 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-25px) translateX(15px) rotate(15deg); opacity: 0.6; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes pulse-gentle {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        .animate-leaf-1 {
          animation: leaf-1 6s ease-in-out infinite;
        }
        .animate-leaf-2 {
          animation: leaf-2 8s ease-in-out infinite;
        }
        .animate-leaf-3 {
          animation: leaf-3 7s ease-in-out infinite;
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