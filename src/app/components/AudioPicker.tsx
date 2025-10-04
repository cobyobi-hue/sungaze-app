"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Music } from 'lucide-react';
import { Button } from './ui/button';

export interface AudioTrack {
  id: string;
  name: string;
  displayName: string;
  file: string;
}

interface AudioPickerProps {
  isActive?: boolean;
  onTrackSelect?: (track: AudioTrack | null) => void;
  className?: string;
}

export function AudioPicker({ isActive = false, onTrackSelect, className = "" }: AudioPickerProps) {
  const [selectedTrack, setSelectedTrack] = useState<AudioTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isClient, setIsClient] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize default tracks and localStorage
  useEffect(() => {
    setIsClient(true);
    
    // Check if meditation sounds exist in localStorage
    const existingSounds = localStorage.getItem('meditation_sounds');
    if (!existingSounds) {
      // Add default tracks to localStorage
      const defaultSounds = [
        {
          id: 'celestial-turiya',
          name: 'Celestial Turiya',
          description: 'Beautiful celestial meditation music',
          duration: 300,
          category: 'ambient',
          volume: 0.7,
          audioUrl: '/audio/Celestial Turiya.mp3',
          createdAt: new Date().toISOString(),
        },
        {
          id: 'mahavakya-gold',
          name: 'Mahavakya Gold',
          description: 'Sacred golden meditation tones',
          duration: 180,
          category: 'ambient',
          volume: 0.7,
          audioUrl: '/audio/Mahavakya Gold  2.mp3',
          createdAt: new Date().toISOString(),
        }
      ];
      
      localStorage.setItem('meditation_sounds', JSON.stringify(defaultSounds));
      console.log('✅ Added default audio tracks to localStorage');
    }
  }, []);

  const tracks: AudioTrack[] = [
    {
      id: 'celestial_turiya',
      name: 'celestial-turiya',
      displayName: 'Celestial Turiya',
      file: '/audio/Celestial Turiya.mp3'
    },
    {
      id: 'mahavakya_gold',
      name: 'mahavakya-gold',
      displayName: 'Mahavakya Gold',
      file: '/audio/Mahavakya Gold  2.mp3'
    },
    {
      id: '528hz',
      name: '528hz',
      displayName: '528Hz Healing',
      file: '528hz'
    }
  ];

  // Handle track selection
  const handleTrackSelect = (track: AudioTrack | null) => {
    console.log('Selecting track:', track?.displayName || 'Silent');
    
    // Stop current audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    setSelectedTrack(track);
    setIsPlaying(false);
    
    if (!track) {
      if (onTrackSelect) onTrackSelect(null);
      return;
    }
    
    if (track.id === '528hz') {
      // Create 528Hz tone using simple Web Audio API
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.frequency.setValueAtTime(528, audioContext.currentTime);
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Store references for control
        (audioRef as any).current = {
          context: audioContext,
          oscillator: oscillator,
          gainNode: gainNode,
          play: () => {
            oscillator.start();
            gainNode.gain.setValueAtTime(isMuted ? 0 : volume, audioContext.currentTime);
            setIsPlaying(true);
          },
          pause: () => {
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            setIsPlaying(false);
          },
          volume: isMuted ? 0 : volume
        };
        
        // Auto-play if session is active
        if (isActive) {
          setTimeout(() => {
            (audioRef as any).current.play();
          }, 100);
        }
      } catch (error) {
        console.error('Failed to create 528Hz tone:', error);
      }
    } else {
      // Create HTML audio element
      const audio = new Audio();
      audio.src = track.file;
      audio.loop = true;
      audio.volume = isMuted ? 0 : volume;
      
      // Set up event listeners
      audio.addEventListener('canplaythrough', () => {
        audioRef.current = audio;
        if (isActive) {
          audio.play().then(() => {
            setIsPlaying(true);
          }).catch(error => {
            console.warn('Auto-play failed:', error);
          });
        }
      });
      
      audio.addEventListener('play', () => setIsPlaying(true));
      audio.addEventListener('pause', () => setIsPlaying(false));
      
      // Load the audio
      audio.load();
    }
    
    if (onTrackSelect) onTrackSelect(track);
  };

  // Auto-play when session becomes active
  useEffect(() => {
    if (isActive && selectedTrack && !isPlaying) {
      if (audioRef.current) {
        if (selectedTrack.id === '528hz') {
          (audioRef as any).current.play();
        } else {
          (audioRef.current as HTMLAudioElement).play().then(() => {
            setIsPlaying(true);
          }).catch(error => {
            console.warn('Auto-play failed:', error);
          });
        }
      }
    } else if (!isActive && isPlaying) {
      if (audioRef.current) {
        if (selectedTrack?.id === '528hz') {
          (audioRef as any).current.pause();
        } else {
          (audioRef.current as HTMLAudioElement).pause();
        }
      }
    }
  }, [isActive, selectedTrack, isPlaying]);

  // Play/pause toggle
  const togglePlayPause = () => {
    if (!selectedTrack || !audioRef.current) return;
    
    if (isPlaying) {
      if (selectedTrack.id === '528hz') {
        (audioRef as any).current.pause();
      } else {
        (audioRef.current as HTMLAudioElement).pause();
      }
    } else {
      if (selectedTrack.id === '528hz') {
        (audioRef as any).current.play();
      } else {
        (audioRef.current as HTMLAudioElement).play().then(() => {
          setIsPlaying(true);
        }).catch(error => {
          console.error('Play failed:', error);
        });
      }
    }
  };

  // Mute toggle
  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    
    if (audioRef.current) {
      if (selectedTrack?.id === '528hz') {
        const gainNode = (audioRef as any).current.gainNode;
        const audioContext = (audioRef as any).current.context;
        if (gainNode && audioContext) {
          gainNode.gain.setValueAtTime(newMuted ? 0 : volume, audioContext.currentTime);
        }
      } else {
        (audioRef.current as HTMLAudioElement).volume = newMuted ? 0 : volume;
      }
    }
  };

  // Volume change
  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    
    if (audioRef.current && !isMuted) {
      if (selectedTrack?.id === '528hz') {
        const gainNode = (audioRef as any).current.gainNode;
        const audioContext = (audioRef as any).current.context;
        if (gainNode && audioContext) {
          gainNode.gain.setValueAtTime(newVolume, audioContext.currentTime);
        }
      } else {
        (audioRef.current as HTMLAudioElement).volume = newVolume;
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        if (selectedTrack?.id === '528hz') {
          try {
            (audioRef as any).current.oscillator.stop();
            (audioRef as any).current.context.close();
          } catch (e) {}
        } else {
          (audioRef.current as HTMLAudioElement).pause();
        }
      }
    };
  }, [selectedTrack]);

  // Early return for SSR
  if (!isClient) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex items-center gap-2 mb-4">
          <Music className="w-5 h-5 text-white" />
          <h3 className="text-white font-medium">♫ Serene Music</h3>
        </div>
        <div className="text-center py-6">
          <div className="animate-pulse">
            <div className="w-12 h-12 bg-white/20 rounded-lg mx-auto mb-3"></div>
            <div className="h-4 bg-white/20 rounded w-32 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Music className="w-5 h-5 text-white" />
        <h3 className="text-white font-medium">♫ Serene Music</h3>
      </div>

      {/* Track Selection */}
      <div className="space-y-3">
        {tracks.map((track) => {
          const isSelected = selectedTrack?.id === track.id;
          const isTrackPlaying = isSelected && isPlaying;
          
          return (
            <button
              key={track.id}
              onClick={() => handleTrackSelect(track)}
              className={`w-full p-4 rounded-2xl text-sm font-medium transition-all duration-300 ${
                isSelected
                  ? 'bg-gradient-to-br from-amber-500/30 to-orange-500/30 text-white border-2 border-amber-400/60 shadow-2xl shadow-amber-500/30'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/30 hover:border-white/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isSelected 
                      ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg' 
                      : 'bg-white/20 text-white/80'
                  }`}>
                    {isSelected && isTrackPlaying ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                  </div>
                  <span className="font-medium">{track.displayName}</span>
                </div>
                
                {isSelected && isTrackPlaying && (
                  <div className="flex space-x-1">
                    <div className="w-1 h-4 bg-amber-400 rounded-full animate-pulse"></div>
                    <div className="w-1 h-4 bg-amber-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-1 h-4 bg-amber-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                )}
              </div>
            </button>
          );
        })}
        
        {/* Silent option */}
        <button
          onClick={() => handleTrackSelect(null)}
          className={`w-full p-4 rounded-2xl text-sm font-medium transition-all duration-300 ${
            selectedTrack === null
              ? 'bg-gradient-to-br from-slate-500/30 to-gray-500/30 text-white border-2 border-slate-400/60 shadow-2xl shadow-slate-500/30'
              : 'bg-white/10 text-white hover:bg-white/20 border border-white/30 hover:border-white/50'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              selectedTrack === null
                ? 'bg-gradient-to-br from-slate-400 to-gray-500 text-white shadow-lg' 
                : 'bg-white/20 text-white/80'
            }`}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              </svg>
            </div>
            <span className="font-medium">Silent Meditation</span>
          </div>
        </button>
      </div>

      {/* Audio Controls */}
      {selectedTrack && (
        <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-xl border border-amber-400/30 rounded-2xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-white/90 text-sm font-medium">
              {selectedTrack.displayName}
            </span>
            
            <div className="flex items-center gap-3">
              <Button
                onClick={togglePlayPause}
                className="bg-gradient-to-br from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 p-3 h-10 w-10 rounded-full shadow-lg"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              
              <Button
                onClick={toggleMute}
                className="bg-white/20 hover:bg-white/30 border border-white/30 p-3 h-10 w-10 rounded-full"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Volume Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white/80 text-sm">Volume</span>
              <span className="text-white/80 text-sm font-medium">{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.4) ${volume * 100}%, rgba(255,255,255,0.1) ${volume * 100}%, rgba(255,255,255,0.1) 100%)`
              }}
            />
          </div>
        </div>
      )}

      {/* Session Status */}
      {isActive && selectedTrack && (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-400/20 rounded-full px-3 py-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-300 text-xs font-light">
              Playing: {selectedTrack.displayName}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default AudioPicker;