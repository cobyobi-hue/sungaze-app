"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Book, Sun, Cloud, Heart, Calendar, Sparkles, Plus, X, Edit3, Trash2, Moon, Camera, Upload, Image } from 'lucide-react';
import { journalService, type JournalEntry as DatabaseJournalEntry } from '../lib/database/journal-service';

interface JournalEntry {
  id: string;
  date: Date;
  gazingType: 'sun' | 'cloud' | 'candle' | 'starlight';
  duration: number;
  condition: string;
  reflection: string;
  mood: 'energized' | 'peaceful' | 'centered' | 'transcendent' | 'grateful' | 'sleepy' | 'dreamy';
  insights: string;
  bodyExperience: string;
  gratitude?: string;
  dreamIntentions?: string;
  practiceType: 'day' | 'evening';
  photoUrl?: string;
  photoFile?: File;
}

interface SolarJournalProps {
  onClose: () => void;
  initialEntry?: Partial<JournalEntry>;
  mode?: 'day' | 'evening';
  userId?: string;
}

const moodEmojis = {
  energized: '⚡',
  peaceful: '🕊️',
  centered: '🎯',
  transcendent: '✨',
  grateful: '🙏',
  sleepy: '😴',
  dreamy: '🌙'
};

const promptQuestions = [
  "What did you notice in your body during the gaze?",
  "How did the light make you feel?",
  "What thoughts or insights arose?",
  "How do you feel now compared to before?",
  "What are you grateful for in this moment?"
];

export function SolarJournal({ onClose, initialEntry, mode = 'day', userId = 'default-user' }: SolarJournalProps) {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [showNewEntry, setShowNewEntry] = useState(!!initialEntry);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  
  // New entry form state
  const [newEntry, setNewEntry] = useState<Partial<JournalEntry>>({
    gazingType: mode === 'evening' ? 'candle' : 'sun',
    duration: mode === 'evening' ? 600 : 60,
    condition: mode === 'evening' ? 'Evening practice' : 'Clear skies',
    reflection: '',
    mood: mode === 'evening' ? 'peaceful' : 'peaceful',
    insights: '',
    bodyExperience: '',
    gratitude: '',
    dreamIntentions: '',
    practiceType: mode,
    ...initialEntry
  });

  // Load entries from database service
  useEffect(() => {
    const loadEntries = async () => {
      try {
        // Migrate old localStorage format if needed
        await journalService.migrateFromOldFormat(userId);
        
        const dbEntries = await journalService.getUserEntries(userId);
        // Convert database entries to component format
        const componentEntries: JournalEntry[] = dbEntries.map(entry => ({
          ...entry,
          date: new Date(entry.date),
          photoFile: undefined, // Files aren't persisted, only URLs
        }));
        setEntries(componentEntries);
      } catch (error) {
        console.error('Error loading journal entries:', error);
      }
    };

    loadEntries();
  }, [userId]);

  // Photo handling functions
  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPhotoPreview(result);
        setNewEntry({ ...newEntry, photoFile: file, photoUrl: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    setNewEntry({ ...newEntry, photoFile: undefined, photoUrl: undefined });
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const handleSaveEntry = async () => {
    if (!newEntry.reflection?.trim()) return;
    
    try {
      // Upload photo if present
      let photoUrl = newEntry.photoUrl;
      if (newEntry.photoFile && !photoUrl) {
        photoUrl = await journalService.uploadPhoto(newEntry.photoFile);
      }

      const entryData = {
        date: new Date().toISOString(),
        gazingType: newEntry.gazingType || (mode === 'evening' ? 'candle' : 'sun'),
        duration: newEntry.duration || (mode === 'evening' ? 600 : 60),
        condition: newEntry.condition || (mode === 'evening' ? 'Evening practice' : 'Clear skies'),
        reflection: newEntry.reflection || '',
        mood: newEntry.mood || 'peaceful',
        insights: newEntry.insights || '',
        bodyExperience: newEntry.bodyExperience || '',
        gratitude: newEntry.gratitude || '',
        dreamIntentions: newEntry.dreamIntentions || '',
        practiceType: mode,
        photoUrl,
      } as const;

      const savedEntry = await journalService.createEntry(userId, entryData);
      
      // Convert to component format and update local state
      const componentEntry: JournalEntry = {
        ...savedEntry,
        date: new Date(savedEntry.date),
        photoFile: undefined,
      };
      
      setEntries(prev => [componentEntry, ...prev]);
      
      // Show confirmation screen
      setShowConfirmation(true);
      
      // Reset form after delay
      setTimeout(() => {
        setShowConfirmation(false);
        setShowNewEntry(false);
        setPhotoPreview(null);
        setNewEntry({
          gazingType: mode === 'evening' ? 'candle' : 'sun',
          duration: mode === 'evening' ? 600 : 60,
          condition: mode === 'evening' ? 'Evening practice' : 'Clear skies',
          reflection: '',
          mood: 'peaceful',
          insights: '',
          bodyExperience: '',
          gratitude: '',
          dreamIntentions: '',
          practiceType: mode
        });
      }, 3000);
    } catch (error) {
      console.error('Failed to save journal entry:', error);
      // Could show error message to user here
    }
  };

  const handleDeleteEntry = async (id: string) => {
    try {
      const success = await journalService.deleteEntry(userId, id);
      if (success) {
        setEntries(prev => prev.filter(entry => entry.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete journal entry:', error);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  // Confirmation screen
  if (showConfirmation) {
    return (
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white min-h-screen">
        <div className="px-6 pt-6 pb-24">
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500/20 to-yellow-500/20 flex items-center justify-center mx-auto mb-6 animate-pulse border border-orange-400/30">
              <Sparkles className="w-10 h-10 text-orange-400" />
            </div>
            <h2 className="text-title-lg text-white font-semibold mb-4">
              Solar Circuit Complete
            </h2>
            <p className="text-white/60 text-body-md mb-6">
              You are charged with light + earth energy.
            </p>
            <div className="flex items-center justify-center gap-2 text-orange-400">
              <Sun className="w-6 h-6 animate-spin" />
              <span className="font-medium">Your journey is recorded</span>
              <Sun className="w-6 h-6 animate-spin" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showNewEntry || editingEntry) {
    const entry = editingEntry || newEntry;
    
    return (
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400/30 to-yellow-400/30 flex items-center justify-center">
              <Book className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-gray-900 text-lg font-bold">
                {editingEntry ? 'Edit Entry' : (mode === 'evening' ? 'New Evening Entry' : 'New Journal Entry')}
              </h3>
              <p className="text-gray-700 text-sm font-medium">
                {formatDate(editingEntry?.date || new Date())}
              </p>
            </div>
          </div>
          <Button
            onClick={() => {
              setShowNewEntry(false);
              setEditingEntry(null);
            }}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 border border-gray-300 rounded-full p-2 shadow-sm"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Entry Form */}
        <div className="space-y-6">
          {/* Practice Details */}
          <div className="bg-white/80 backdrop-blur-xl rounded-xl p-4 border border-orange-200 shadow-sm">
            <h4 className="text-gray-900 font-bold mb-4">Practice Details</h4>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-gray-900 text-sm font-bold mb-2 block">Type</label>
                <select
                  value={entry.gazingType}
                  onChange={(e) => setNewEntry({...newEntry, gazingType: e.target.value as 'sun' | 'cloud' | 'candle' | 'starlight'})}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm shadow-sm focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                >
                  <option value="sun">Sun Gazing</option>
                  <option value="cloud">Cloud Gazing</option>
                  <option value="candle">Candle Meditation</option>
                  <option value="starlight">Starlight Visualization</option>
                </select>
              </div>
              
              <div>
                <label className="text-gray-900 text-sm font-bold mb-2 block">Duration</label>
                <input
                  type="number"
                  value={entry.duration}
                  onChange={(e) => setNewEntry({...newEntry, duration: parseInt(e.target.value)})}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm shadow-sm focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                  min="1"
                  max="3600"
                />
              </div>
            </div>
            
            <div>
              <label className="text-gray-900 text-sm font-bold mb-2 block">Conditions</label>
              <input
                type="text"
                value={entry.condition}
                onChange={(e) => setNewEntry({...newEntry, condition: e.target.value})}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm shadow-sm focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                placeholder="Clear skies, partly cloudy, golden hour..."
              />
            </div>
          </div>

          {/* Mood Selection */}
          <div className="bg-white/80 backdrop-blur-xl rounded-xl p-4 border border-orange-200 shadow-sm">
            <h4 className="text-gray-900 font-bold mb-4">How do you feel?</h4>
            <div className="grid grid-cols-5 gap-2">
              {Object.entries(moodEmojis).map(([mood, emoji]) => (
                <button
                  key={mood}
                  onClick={() => setNewEntry({...newEntry, mood: mood as any})}
                  className={`p-3 rounded-lg text-center transition-all duration-200 ${
                    entry.mood === mood
                      ? 'bg-orange-100 border-2 border-orange-400 shadow-md'
                      : 'bg-white hover:bg-gray-50 border border-gray-200 shadow-sm'
                  }`}
                >
                  <div className="text-lg mb-1">{emoji}</div>
                  <div className="text-xs text-gray-800 font-bold capitalize">{mood}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Photo Upload */}
          <div className="bg-white/80 backdrop-blur-xl rounded-xl p-4 border border-orange-200 shadow-sm">
            <h4 className="text-gray-900 font-bold mb-4 flex items-center gap-2">
              <Image className="w-4 h-4 text-orange-600" />
              Capture this moment
            </h4>
            <p className="text-gray-700 text-xs mb-4 italic">
              Add a photo to remember this practice
            </p>
            
            {photoPreview ? (
              <div className="relative mb-4">
                <img 
                  src={photoPreview} 
                  alt="Journal entry" 
                  className="w-full h-48 object-cover rounded-lg"
                />
                <Button
                  onClick={removePhoto}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 py-3 rounded-lg transition-all duration-200 shadow-sm"
                >
                  <Camera className="w-4 h-4 text-orange-600" />
                  Take Photo
                </Button>
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 py-3 rounded-lg transition-all duration-200 shadow-sm"
                >
                  <Upload className="w-4 h-4 text-orange-600" />
                  Upload Photo
                </Button>
              </div>
            )}
            
            {/* Hidden file inputs */}
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleCameraCapture}
              className="hidden"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleGalleryUpload}
              className="hidden"
            />
          </div>

          {/* Reflection */}
          <div className="bg-white/80 backdrop-blur-xl rounded-xl p-4 border border-orange-200 shadow-sm">
            <h4 className="text-gray-900 font-bold mb-2">Reflection</h4>
            <p className="text-gray-700 text-xs mb-4 italic">
              How was your practice today? What did you experience?
            </p>
            <textarea
              value={entry.reflection}
              onChange={(e) => setNewEntry({...newEntry, reflection: e.target.value})}
              className="w-full h-32 bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm resize-none shadow-sm focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
              placeholder="Describe your experience, thoughts, and feelings..."
              required
            />
          </div>

          {/* Body Experience */}
          <div className="bg-white/80 backdrop-blur-xl rounded-xl p-4 border border-orange-200 shadow-sm">
            <h4 className="text-gray-900 font-bold mb-2">Body Experience</h4>
            <p className="text-gray-700 text-xs mb-4 italic">
              What sensations did you notice in your body?
            </p>
            <textarea
              value={entry.bodyExperience}
              onChange={(e) => setNewEntry({...newEntry, bodyExperience: e.target.value})}
              className="w-full h-24 bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm resize-none shadow-sm focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
              placeholder="Warmth, tingling, relaxation, energy..."
            />
          </div>

          {/* Insights */}
          <div className="bg-white/80 backdrop-blur-xl rounded-xl p-4 border border-orange-200 shadow-sm">
            <h4 className="text-gray-900 font-bold mb-2">
              {mode === 'evening' ? 'Inner Reflections' : 'Insights & Gratitude'}
            </h4>
            <p className="text-gray-700 text-xs mb-4 italic">
              {mode === 'evening' 
                ? 'What did the inner flame reveal to you tonight?'
                : 'Any insights, realizations, or things you\'re grateful for?'
              }
            </p>
            <textarea
              value={entry.insights}
              onChange={(e) => setNewEntry({...newEntry, insights: e.target.value})}
              className="w-full h-24 bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm resize-none shadow-sm focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
              placeholder={mode === 'evening' ? 'Visions, realizations, inner wisdom...' : 'Insights, gratitude, intentions...'}
            />
          </div>

          {/* Evening-specific fields */}
          {mode === 'evening' && (
            <>
              {/* Gratitude */}
              <div className="bg-gradient-to-r from-purple-400/10 to-pink-400/10 backdrop-blur-xl border border-purple-300/20 rounded-xl p-4">
                <h4 className="text-gray-900 font-bold mb-2 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-purple-600" />
                  Evening Gratitude
                </h4>
                <p className="text-gray-700 text-xs mb-4 italic">
                  What are you grateful for from today's journey?
                </p>
                <textarea
                  value={entry.gratitude || ''}
                  onChange={(e) => setNewEntry({...newEntry, gratitude: e.target.value})}
                  className="w-full h-24 bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm resize-none shadow-sm focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                  placeholder="I am grateful for..."
                />
              </div>

              {/* Dream Intentions */}
              <div className="bg-gradient-to-r from-indigo-400/10 to-blue-400/10 backdrop-blur-xl border border-indigo-300/20 rounded-xl p-4">
                <h4 className="text-gray-900 font-bold mb-2 flex items-center gap-2">
                  <Moon className="w-4 h-4 text-indigo-600" />
                  Dream Intentions
                </h4>
                <p className="text-gray-700 text-xs mb-4 italic">
                  What would you like to explore or receive in your dreams?
                </p>
                <textarea
                  value={entry.dreamIntentions || ''}
                  onChange={(e) => setNewEntry({...newEntry, dreamIntentions: e.target.value})}
                  className="w-full h-24 bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm resize-none shadow-sm focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                  placeholder="Tonight in my dreams, I intend to..."
                />
              </div>
            </>
          )}

          {/* Save Button */}
          <Button
            onClick={handleSaveEntry}
            disabled={!entry.reflection?.trim()}
            className="w-full bg-gradient-to-r from-orange-400/30 to-yellow-400/30 hover:from-orange-400/40 hover:to-yellow-400/40 text-gray-800 border border-orange-400/30 backdrop-blur-xl rounded-2xl py-3 transition-all duration-300 font-medium tracking-wide shadow-[0_4px_20px_rgba(255,165,0,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Heart className="w-5 h-5 mr-2" />
            {editingEntry ? 'Update Entry' : 'Save Entry'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white min-h-screen">
      <div className="px-6 pt-6 pb-24">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6 shadow-[0_0_20px_rgba(59,130,246,0.1)] mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500/20 to-yellow-500/20 flex items-center justify-center border border-orange-400/30">
                <Book className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <h2 className="text-title-md text-white font-semibold">
                  {mode === 'evening' ? '🌙 Evening Journal' : '📖 Solar Journal'}
                </h2>
                <p className="text-body-sm text-white/60">{entries.length} entries</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setShowNewEntry(true)}
                className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 hover:from-orange-500/30 hover:to-yellow-500/30 border border-orange-400/30 text-white rounded-2xl px-4 py-2 transition-all duration-300"
              >
                <Plus className="w-4 h-4" />
              </Button>
              <Button
                onClick={onClose}
                className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30 border border-blue-400/30 text-white rounded-2xl px-4 py-2 transition-all duration-300"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Entries List */}
        {entries.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500/20 to-yellow-500/20 flex items-center justify-center mx-auto mb-4 border border-orange-400/30">
              <Book className="w-8 h-8 text-orange-400" />
            </div>
            <p className="text-white/60 text-body-sm mb-4 font-medium">Your solar journey begins here</p>
            <Button
              onClick={() => setShowNewEntry(true)}
              className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 hover:from-orange-500/30 hover:to-yellow-500/30 border border-orange-400/30 text-white rounded-2xl px-6 py-2 transition-all duration-300 font-medium"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create First Entry
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6 shadow-lg hover:from-blue-500/15 hover:to-indigo-500/15 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                      entry.gazingType === 'sun' 
                        ? 'bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border-orange-400/30' 
                        : 'bg-gradient-to-br from-blue-500/20 to-gray-500/20 border-blue-400/30'
                    }`}>
                      {entry.gazingType === 'sun' ? (
                        <Sun className="w-5 h-5 text-orange-400" />
                      ) : (
                        <Cloud className="w-5 h-5 text-blue-400" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-semibold text-body-sm capitalize">
                          {entry.gazingType} Gazing
                        </span>
                        <span className="text-lg">{moodEmojis[entry.mood]}</span>
                      </div>
                      <p className="text-white/60 text-caption font-medium">
                        {formatDate(entry.date)} • {formatTime(entry.duration)} • {entry.condition}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      onClick={() => setEditingEntry(entry)}
                      className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-xl rounded-lg p-1.5"
                    >
                      <Edit3 className="w-3 h-3" />
                    </Button>
                    <Button
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 backdrop-blur-xl rounded-lg p-1.5"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              
              {entry.photoUrl && (
                <div className="mb-4">
                  <img 
                    src={entry.photoUrl} 
                    alt="Journal moment" 
                    className="w-full max-w-sm mx-auto h-48 object-cover rounded-lg shadow-lg"
                  />
                </div>
              )}
              
                {entry.reflection && (
                  <p className="text-white text-body-sm mb-3 italic leading-relaxed">
                    "{entry.reflection}"
                  </p>
                )}
                
                {(entry.bodyExperience || entry.insights) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {entry.bodyExperience && (
                      <div className="bg-white/10 rounded-lg p-3 border border-white/20">
                        <div className="text-white font-semibold mb-1">Body Experience</div>
                        <p className="text-white/80">{entry.bodyExperience}</p>
                      </div>
                    )}
                    {entry.insights && (
                      <div className="bg-white/10 rounded-lg p-3 border border-white/20">
                        <div className="text-white font-semibold mb-1">Insights</div>
                        <p className="text-white/80">{entry.insights}</p>
                      </div>
                    )}
                  </div>
                )}
            </div>
          ))}
          </div>
        )}
      </div>
    </div>
  );
}
