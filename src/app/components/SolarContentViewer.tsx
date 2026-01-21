"use client";

import React, { useState } from 'react';
import { 
  getContentForLevel, 
  getPracticeGuidance,
  getJournalPrompts
} from '../lib/solarContent';
import { getCurrentSolarLevel } from '../lib/solarLevels';
import { BookOpen, Lightbulb, Users, Lock, ChevronDown, ChevronRight, Square } from 'lucide-react';

interface SolarContentViewerProps {
  currentDay: number;
}

export function SolarContentViewer({ currentDay }: SolarContentViewerProps) {
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
      <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
        <div className="flex items-center justify-center gap-3 mb-2">
          <BookOpen className="w-6 h-6 text-yellow-300 drop-shadow-[0_0_8px_rgba(255,215,0,0.35)]" />
          <h2 className="text-title-md text-white font-semibold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Solar Content
          </h2>
        </div>
        <p className="text-white/85 text-sm text-center font-medium tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
          No content available for your current level yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
        <div className="flex items-center justify-center gap-3 mb-2">
          <BookOpen className="w-6 h-6 text-yellow-300 drop-shadow-[0_0_8px_rgba(255,215,0,0.35)]" />
          <h2 className="text-title-md text-white font-semibold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {currentLevel.title}
          </h2>
        </div>
        <p className="text-white/85 text-sm text-center font-medium tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
          {currentLevel.subtitle}
        </p>
      </div>

      {/* Level Info */}
      <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-4xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">{currentLevel.emoji}</div>
          <div>
            <h3 className="text-title-sm text-white font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {currentLevel.title}
            </h3>
            <p className="text-white/75 text-sm font-medium tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
              {currentLevel.timeline}
            </p>
          </div>
        </div>
        <p className="text-white/90 text-sm leading-relaxed font-medium tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.75)]">
          {currentLevel.description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-4">
            <h4 className="text-white font-semibold mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Practices</h4>
            <ul className="text-sm text-white/90 space-y-1 font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.75)]">
              {currentLevel.practices.map((practice, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Square className="w-3 h-3 text-yellow-300" />
                  {practice}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-4">
            <h4 className="text-white font-semibold mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Unlocks</h4>
            <ul className="text-sm text-white/90 space-y-1 font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.75)]">
              {currentLevel.unlocks.map((unlock, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Square className="w-3 h-3 text-yellow-300" />
                  {unlock}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-2 shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
        <button
          onClick={() => setActiveTab('guidance')}
          className={`flex-1 py-2 px-4 rounded-xl text-sm font-semibold tracking-wide transition-colors ${
            activeTab === 'guidance'
              ? 'bg-white/10 text-white border border-white/10'
              : 'text-white/75 hover:text-white'
          }`}
        >
          <Lightbulb className="w-4 h-4 inline mr-2 text-yellow-300" />
          Guidance
        </button>
        <button
          onClick={() => setActiveTab('journal')}
          className={`flex-1 py-2 px-4 rounded-xl text-sm font-semibold tracking-wide transition-colors ${
            activeTab === 'journal'
              ? 'bg-white/10 text-white border border-white/10'
              : 'text-white/75 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4 inline mr-2 text-yellow-300" />
          Journal
        </button>
      </div>

      {/* Content */}
      {activeTab === 'guidance' && (
        <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
          <h3 className="text-title-sm text-white font-semibold mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Practice Guidance
          </h3>
          <div className="space-y-3">
            {practiceGuidance.map((guidance, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-black/50 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
                  <span className="text-yellow-300 text-sm font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
                    {index + 1}
                  </span>
                </div>
                <p className="text-white/90 text-sm leading-relaxed font-medium tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.75)]">
                  {guidance}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'journal' && (
        <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
          <h3 className="text-title-sm text-white font-semibold mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Journal Prompts
          </h3>
          <div className="space-y-4">
            {journalPrompts.map((prompt, index) => (
              <div key={index} className="border-l-2 border-white/15 pl-4">
                <p className="text-white/90 text-sm leading-relaxed italic font-medium tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.75)]">
                  "{prompt}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}