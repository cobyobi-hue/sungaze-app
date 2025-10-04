"use client";

import { useState, useEffect, useRef } from 'react';
import { usePremiumFeatures } from '../../hooks/usePremiumFeatures';

export interface Soundscape {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'flute' | 'bells' | 'chanting' | 'nature';
  isPremium: boolean;
  audioUrl?: string; // In real app, would connect to audio files
}

export const SOUNDSCAPES: Soundscape[] = [
  // Free basic sounds
  {
    id: 'silence',
    name: 'Silent Timer',
    description: 'Pure silence for focused meditation',
    icon: '🔇',
    category: 'nature',
    isPremium: false
  },
  {
    id: 'basic_chime',
    name: 'Simple Chime',
    description: 'Basic bell sound for beginnings and endings',
    icon: '🔔',
    category: 'bells',
    isPremium: false
  },
  
  // Premium soundscapes
  {
    id: 'sacred_flute',
    name: 'Sacred Flute',
    description: 'Ethereal flute melodies that dance on the wind',
    icon: '🪈',
    category: 'flute',
    isPremium: true,
    audioUrl: '/audio/sacred-flute.mp3'
  },
  {
    id: 'temple_bells',
    name: 'Temple Bells',
    description: 'Deep, resonant temple bells from ancient monasteries',
    icon: '🛎️',
    category: 'bells',
    isPremium: true,
    audioUrl: '/audio/temple-bells.mp3'
  },
  {
    id: 'tibetan_chanting',
    name: 'Sacred Chanting',
    description: 'Ancient Tibetan chants and mantras',
    icon: '🕉️',
    category: 'chanting',
    isPremium: true,
    audioUrl: '/audio/tibetan-chanting.mp3'
  },
  {
    id: 'om_mani',
    name: 'Om Mani Padme Hum',
    description: 'The compassionate mantra of Avalokiteshvara',
    icon: '📿',
    category: 'chanting',
    isPremium: true,
    audioUrl: '/audio/om-mani.mp3'
  },
  {
    id: 'forest_flute',
    name: 'Forest Flute',
    description: 'Gentle flute harmonies with forest ambience',
    icon: '🌲',
    category: 'flute',
    isPremium: true,
    audioUrl: '/audio/forest-flute.mp3'
  },
  {
    id: 'singing_bowls',
    name: 'Singing Bowls',
    description: 'Crystal clear singing bowl harmonics',
    icon: '🥣',
    category: 'bells',
    isPremium: true,
    audioUrl: '/audio/singing-bowls.mp3'
  }
];

interface PremiumSoundscapesProps {
  selectedSoundscape?: string;
  onSoundscapeChange: (soundscapeId: string) => void;
  isPlaying?: boolean;
  volume?: number;
  userId?: string;
  showUpgradePrompt?: (feature: string) => void;
}

export default function PremiumSoundscapes({ 
  selectedSoundscape, 
  onSoundscapeChange, 
  isPlaying = false,
  volume = 0.5,
  userId,
  showUpgradePrompt
}: PremiumSoundscapesProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const { checkFeatureAccess, isFreeTier } = usePremiumFeatures(userId);

  // Audio playback management
  useEffect(() => {
    if (!audioRef.current || !selectedSoundscape) return;

    const currentSoundscape = SOUNDSCAPES.find(s => s.id === selectedSoundscape);
    if (!currentSoundscape || !currentSoundscape.audioUrl) return;

    if (isPlaying) {
      audioRef.current.volume = volume;
      audioRef.current.play().catch(console.error);
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, selectedSoundscape, volume]);

  const handleSoundscapeSelect = (soundscape: Soundscape) => {
    if (soundscape.isPremium) {
      const access = checkFeatureAccess('premium_soundscapes');
      if (!access.hasAccess) {
        showUpgradePrompt?.('premium_soundscapes');
        return;
      }
    }
    
    onSoundscapeChange(soundscape.id);
    setIsExpanded(false);
  };

  const currentSoundscape = SOUNDSCAPES.find(s => s.id === selectedSoundscape) || SOUNDSCAPES[0];
  const freeSoundscapes = SOUNDSCAPES.filter(s => !s.isPremium);
  const premiumSoundscapes = SOUNDSCAPES.filter(s => s.isPremium);

  return (
    <div className="relative">
      {/* Current selection display */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center space-x-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl px-4 py-3 cursor-pointer hover:bg-opacity-30 transition-all duration-200 border border-white border-opacity-20"
      >
        <div className="text-2xl">{currentSoundscape.icon}</div>
        <div className="flex-1">
          <h3 className="text-white font-medium text-sm">{currentSoundscape.name}</h3>
          <p className="text-white text-xs opacity-70">{currentSoundscape.description}</p>
        </div>
        <div className="text-white opacity-60">
          {isExpanded ? '⬆️' : '⬇️'}
        </div>
      </div>

      {/* Soundscape selection dropdown */}
      {isExpanded && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white bg-opacity-95 backdrop-blur-md rounded-xl shadow-xl border border-white border-opacity-30 z-50 max-h-80 overflow-y-auto">
          
          {/* Free soundscapes */}
          <div className="p-3 border-b border-gray-200">
            <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Free</h4>
            <div className="space-y-1">
              {freeSoundscapes.map((soundscape) => (
                <div
                  key={soundscape.id}
                  onClick={() => handleSoundscapeSelect(soundscape)}
                  className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors duration-150 ${
                    selectedSoundscape === soundscape.id 
                      ? 'bg-blue-100 border border-blue-300' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="text-lg">{soundscape.icon}</div>
                  <div className="flex-1">
                    <h5 className="text-gray-800 font-medium text-sm">{soundscape.name}</h5>
                    <p className="text-gray-600 text-xs">{soundscape.description}</p>
                  </div>
                  {selectedSoundscape === soundscape.id && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Premium soundscapes */}
          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Premium Soundscapes</h4>
              {isFreeTier && (
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  Ritual Pack
                </div>
              )}
            </div>
            
            <div className="space-y-1">
              {premiumSoundscapes.map((soundscape) => {
                const hasAccess = !soundscape.isPremium || checkFeatureAccess('premium_soundscapes').hasAccess;
                
                return (
                  <div
                    key={soundscape.id}
                    onClick={() => handleSoundscapeSelect(soundscape)}
                    className={`flex items-center space-x-3 p-2 rounded-lg transition-colors duration-150 ${
                      !hasAccess 
                        ? 'opacity-60 cursor-not-allowed bg-gray-50' 
                        : selectedSoundscape === soundscape.id
                          ? 'bg-blue-100 border border-blue-300 cursor-pointer'
                          : 'hover:bg-gray-100 cursor-pointer'
                    }`}
                  >
                    <div className="text-lg">{soundscape.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h5 className={`font-medium text-sm ${hasAccess ? 'text-gray-800' : 'text-gray-500'}`}>
                          {soundscape.name}
                        </h5>
                        {!hasAccess && (
                          <div className="text-xs text-orange-600 font-medium">🔒</div>
                        )}
                      </div>
                      <p className={`text-xs ${hasAccess ? 'text-gray-600' : 'text-gray-400'}`}>
                        {soundscape.description}
                      </p>
                    </div>
                    {hasAccess && selectedSoundscape === soundscape.id && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {isFreeTier && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <button
                  onClick={() => showUpgradePrompt?.('premium_soundscapes')}
                  className="w-full bg-gradient-to-r from-orange-400 to-yellow-500 text-white text-sm font-medium py-2 px-4 rounded-lg hover:from-orange-500 hover:to-yellow-600 transition-all duration-200 shadow-sm"
                >
                  Unlock Premium Soundscapes
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Audio element for playback */}
      {currentSoundscape.audioUrl && (
        <audio
          ref={audioRef}
          src={currentSoundscape.audioUrl}
          loop
          preload="metadata"
        />
      )}
    </div>
  );
}