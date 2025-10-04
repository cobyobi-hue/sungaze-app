"use client";

import React, { useState, useRef } from 'react';
import { Button } from '../../components/ui/button';
import { Upload, Play, Pause, Trash2, Music, Volume2, Save } from 'lucide-react';

interface MeditationSound {
  id: string;
  name: string;
  description: string;
  duration: number;
  category: 'ambient' | 'nature' | 'tones' | 'guided';
  volume: number;
  audioUrl: string;
  createdAt: string;
}

export default function MeditationSoundsAdmin() {
  const [sounds, setSounds] = useState<MeditationSound[]>([]);
  const [uploading, setUploading] = useState(false);
  const [playing, setPlaying] = useState<string | null>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [newSound, setNewSound] = useState({
    name: '',
    description: '',
    category: 'ambient' as const,
    volume: 0.7,
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('audio/')) {
      alert('Please select an audio file');
      return;
    }

    setUploading(true);

    try {
      // Create audio URL for preview and storage
      const audioUrl = URL.createObjectURL(file);
      
      // Get audio duration
      const audio = new Audio(audioUrl);
      await new Promise((resolve) => {
        audio.onloadedmetadata = resolve;
      });

      const sound: MeditationSound = {
        id: crypto.randomUUID(),
        name: newSound.name || file.name.replace(/\.[^/.]+$/, ''),
        description: newSound.description,
        duration: Math.round(audio.duration),
        category: newSound.category,
        volume: newSound.volume,
        audioUrl: audioUrl,
        createdAt: new Date().toISOString(),
      };

      setSounds(prev => [...prev, sound]);
      
      // Save to localStorage for persistence (replace with your database)
      const existingSounds = JSON.parse(localStorage.getItem('meditation_sounds') || '[]');
      localStorage.setItem('meditation_sounds', JSON.stringify([...existingSounds, sound]));

      // Reset form
      setNewSound({
        name: '',
        description: '',
        category: 'ambient',
        volume: 0.7,
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const playSound = (sound: MeditationSound) => {
    if (currentAudio) {
      currentAudio.pause();
    }

    if (playing === sound.id) {
      setPlaying(null);
      setCurrentAudio(null);
      return;
    }

    const audio = new Audio(sound.audioUrl);
    audio.volume = sound.volume;
    
    audio.onended = () => {
      setPlaying(null);
      setCurrentAudio(null);
    };

    audio.play();
    setPlaying(sound.id);
    setCurrentAudio(audio);
  };

  const deleteSound = (id: string) => {
    if (window.confirm('Are you sure you want to delete this meditation sound?')) {
      setSounds(prev => prev.filter(s => s.id !== id));
      
      // Update localStorage
      const updatedSounds = sounds.filter(s => s.id !== id);
      localStorage.setItem('meditation_sounds', JSON.stringify(updatedSounds));
      
      if (playing === id) {
        currentAudio?.pause();
        setPlaying(null);
        setCurrentAudio(null);
      }
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Meditation Sounds Admin</h1>
          <p className="text-gray-600">Upload and manage meditation sounds for the sungazing experience</p>
        </div>

        {/* Upload Form */}
        <div className="bg-white rounded-2xl border border-orange-200 p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5 text-orange-600" />
            Upload New Meditation Sound
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Sound Name
                </label>
                <input
                  type="text"
                  value={newSound.name}
                  onChange={(e) => setNewSound({...newSound, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                  placeholder="e.g., Forest Ambience, Tibetan Bowls..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Description
                </label>
                <textarea
                  value={newSound.description}
                  onChange={(e) => setNewSound({...newSound, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-400 focus:ring-1 focus:ring-orange-400 resize-none"
                  rows={3}
                  placeholder="Brief description of the meditation sound..."
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Category
                </label>
                <select
                  value={newSound.category}
                  onChange={(e) => setNewSound({...newSound, category: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                >
                  <option value="ambient">Ambient</option>
                  <option value="nature">Nature</option>
                  <option value="tones">Tones & Frequencies</option>
                  <option value="guided">Guided</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Default Volume: {Math.round(newSound.volume * 100)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={newSound.volume}
                  onChange={(e) => setNewSound({...newSound, volume: parseFloat(e.target.value)})}
                  className="w-full"
                />
              </div>
            </div>
          </div>
          
          {/* File Upload */}
          <div className="mt-6">
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold px-6 py-3 rounded-xl"
            >
              {uploading ? (
                <>Processing...</>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Audio File
                </>
              )}
            </Button>
            <p className="text-xs text-gray-500 mt-2">
              Supports MP3, WAV, M4A, and other audio formats. Recommended: High quality, 320kbps
            </p>
          </div>
        </div>

        {/* Sound Library */}
        <div className="bg-white rounded-2xl border border-orange-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Music className="w-5 h-5 text-orange-600" />
            Sound Library ({sounds.length})
          </h2>
          
          {sounds.length === 0 ? (
            <div className="text-center py-12">
              <Music className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">No meditation sounds uploaded yet</p>
              <p className="text-gray-400 text-sm">Upload your first sound to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sounds.map((sound) => (
                <div key={sound.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-4">
                    <Button
                      onClick={() => playSound(sound)}
                      className={`${
                        playing === sound.id 
                          ? 'bg-orange-500 hover:bg-orange-600' 
                          : 'bg-gray-600 hover:bg-gray-700'
                      } text-white rounded-full p-2 transition-colors`}
                    >
                      {playing === sound.id ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </Button>
                    
                    <div>
                      <h3 className="font-bold text-gray-900">{sound.name}</h3>
                      <p className="text-sm text-gray-600">
                        {sound.category} • {formatDuration(sound.duration)} • Vol: {Math.round(sound.volume * 100)}%
                      </p>
                      {sound.description && (
                        <p className="text-xs text-gray-500 mt-1">{sound.description}</p>
                      )}
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => deleteSound(sound.id)}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-lg p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Usage Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-8">
          <h3 className="font-bold text-blue-900 mb-3">How to Use Your Uploaded Sounds</h3>
          <div className="text-sm text-blue-800 space-y-2">
            <p>• Upload high-quality audio files (MP3, WAV recommended)</p>
            <p>• Sounds will automatically appear in the sungazing timer</p>
            <p>• Users can select different sounds based on their preference</p>
            <p>• Consider uploading: Nature sounds, ambient music, singing bowls, frequencies</p>
          </div>
        </div>
      </div>
    </div>
  );
}