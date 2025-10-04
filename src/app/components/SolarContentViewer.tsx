"use client";

import React, { useState } from 'react';
import { 
  getContentForLevel, 
  getPracticeGuidance,
  getJournalPrompts
} from '../lib/solarContent';
import { getCurrentSolarLevel } from '../lib/solarLevels';
import { BookOpen, Lightbulb, Users, Lock, ChevronDown, ChevronRight, Square } from 'lucide-react';
import { Button } from './ui/button';

interface SolarContentViewerProps {
  currentDay: number;
  onClose: () => void;
}

export function SolarContentViewer({ currentDay, onClose }: SolarContentViewerProps) {
  const [activeTab, setActiveTab] = useState<'guidance' | 'journal'>('guidance');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const currentLevel = getCurrentSolarLevel(currentDay);
  const content = getContentForLevel(currentLevel.id);
  const practiceGuidance = getPracticeGuidance(currentLevel.id);
  const journalPrompts = getJournalPrompts(currentLevel.id);

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const isExpanded = (sectionId: string) => expandedSections.has(sectionId);

  if (!content) {
    return (
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Solar Content</h1>
            <Button onClick={onClose} className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-xl rounded-2xl px-4 py-2 transition-all duration-300">
              Close
            </Button>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-400">No content available for your current level.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">{currentLevel.title}</h1>
            <p className="text-gray-400">{currentLevel.subtitle}</p>
          </div>
          <Button onClick={onClose} className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-xl rounded-2xl px-4 py-2 transition-all duration-300">
            Close
          </Button>
        </div>

        {/* Level Info */}
        <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl">{currentLevel.emoji}</div>
            <div>
              <h2 className="text-xl font-semibold">{currentLevel.title}</h2>
              <p className="text-gray-400">{currentLevel.timeline}</p>
            </div>
          </div>
          <p className="text-gray-300 mb-4">{currentLevel.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Practices</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                {currentLevel.practices.map((practice, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Square className="w-3 h-3 text-blue-400" />
                    {practice}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Unlocks</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                {currentLevel.unlocks.map((unlock, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Square className="w-3 h-3 text-green-400" />
                    {unlock}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-800/50 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('guidance')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'guidance'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Lightbulb className="w-4 h-4 inline mr-2" />
            Guidance
          </button>
          <button
            onClick={() => setActiveTab('journal')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'journal'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4 inline mr-2" />
            Journal
          </button>
        </div>

        {/* Content */}
        {activeTab === 'guidance' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Practice Guidance</h3>
              <div className="space-y-3">
                {practiceGuidance.map((guidance, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-400 text-sm font-bold">{index + 1}</span>
                    </div>
                    <p className="text-gray-300">{guidance}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'journal' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Journal Prompts</h3>
              <div className="space-y-4">
                {journalPrompts.map((prompt, index) => (
                  <div key={index} className="border-l-2 border-blue-400/30 pl-4">
                    <p className="text-gray-300 italic">"{prompt}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}