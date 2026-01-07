"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "./ui/button";
import { 
  Sparkles, 
  Sun, 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  MessageCircle,
  Eye,
  Heart,
  Brain,
  Zap,
  Shield,
  Clock,
  Star
} from 'lucide-react';
import { oracleQuestions } from '../lib/oracleQuestions';

interface OracleQuestion {
  id: string;
  category: string;
  question: string;
  response: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  popularity: number;
}

interface OracleQAProps {
  className?: string;
}

// Using the full database of 200+ questions from oracleQuestions.ts

const categories = [
  { id: "all", name: "All Questions", icon: BookOpen, count: oracleQuestions.length },
  { id: "Getting Started", name: "Getting Started", icon: Sun, count: oracleQuestions.filter(q => q.category === "Getting Started").length },
  { id: "Overcoming Fear", name: "Overcoming Fear", icon: Shield, count: oracleQuestions.filter(q => q.category === "Overcoming Fear").length },
  { id: "Practice Timing", name: "Practice Timing", icon: Clock, count: oracleQuestions.filter(q => q.category === "Practice Timing").length },
  { id: "Benefits & Results", name: "Benefits & Results", icon: Star, count: oracleQuestions.filter(q => q.category === "Benefits & Results").length },
  { id: "Energy & Vitality", name: "Energy & Vitality", icon: Zap, count: oracleQuestions.filter(q => q.category === "Energy & Vitality").length },
  { id: "Vision & Eyes", name: "Vision & Eyes", icon: Eye, count: oracleQuestions.filter(q => q.category === "Vision & Eyes").length },
  { id: "Light Nutrition", name: "Light Nutrition", icon: Heart, count: oracleQuestions.filter(q => q.category === "Light Nutrition").length },
  { id: "Spiritual Awakening", name: "Spiritual Awakening", icon: Brain, count: oracleQuestions.filter(q => q.category === "Spiritual Awakening").length },
  { id: "Weather & Environment", name: "Weather & Environment", icon: Sun, count: oracleQuestions.filter(q => q.category === "Weather & Environment").length },
  { id: "Age & Accessibility", name: "Age & Accessibility", icon: Heart, count: oracleQuestions.filter(q => q.category === "Age & Accessibility").length }
];

export function OracleQA({ className = "" }: OracleQAProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [filteredQuestions, setFilteredQuestions] = useState(oracleQuestions);

  useEffect(() => {
    let filtered = oracleQuestions;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(q => q.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(q => 
        q.question.toLowerCase().includes(query) ||
        q.response.toLowerCase().includes(query) ||
        q.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sort by popularity
    filtered.sort((a, b) => b.popularity - a.popularity);

    setFilteredQuestions(filtered);
  }, [selectedCategory, searchQuery]);

  const toggleQuestion = (questionId: string) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400 bg-green-400/10';
      case 'intermediate': return 'text-yellow-400 bg-yellow-400/10';
      case 'advanced': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
        <div className="flex items-center justify-center gap-3 mb-2">
          <MessageCircle className="w-6 h-6 text-yellow-400 drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]" />
          <h2 className="text-xl text-white font-semibold text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Ask the Oracle
          </h2>
          <Sparkles className="w-6 h-6 text-yellow-400 drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]" />
        </div>
        <p className="text-white/90 text-sm text-center mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
          Curated wisdom from revolutionary consciousness merged with solar science
        </p>
        <div className="text-center">
          <span className="text-white/70 text-xs drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
            {oracleQuestions.length}+ questions • Mystical responses • Scientific foundation
          </span>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" />
          <input
            type="text"
            placeholder="Search questions or responses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/40 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-yellow-400/40 focus:ring-1 focus:ring-yellow-400/20 transition-all duration-300 backdrop-blur-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/30 shadow-[0_0_8px_rgba(255,215,0,0.2)]'
                    : 'bg-black/40 text-white/80 border border-white/10 hover:bg-white/10 hover:border-white/20 backdrop-blur-sm'
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.name}
                <span className="text-xs opacity-70">({category.count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {filteredQuestions.map((question) => (
          <div
            key={question.id}
            className="bg-black/50 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden hover:border-yellow-400/30 transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
          >
            <button
              onClick={() => toggleQuestion(question.id)}
              className="w-full px-6 py-4 text-left hover:bg-white/5 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-yellow-300 text-sm font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">{question.category}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                      {question.difficulty}
                    </span>
                    <span className="text-white/60 text-xs drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">★ {question.popularity}%</span>
                  </div>
                  <h3 className="text-white font-medium text-sm leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                    {question.question}
                  </h3>
                </div>
                {expandedQuestion === question.id ? 
                  <ChevronUp className="w-4 h-4 text-yellow-400 ml-2 flex-shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" /> : 
                  <ChevronDown className="w-4 h-4 text-white/60 ml-2 flex-shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" />
                }
              </div>
              
              {expandedQuestion === question.id && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="text-white/90 text-sm leading-relaxed mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                    {question.response}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {question.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-yellow-400/15 text-yellow-300 text-xs rounded-full border border-yellow-400/20 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center pt-4">
        <p className="text-white/70 text-xs drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
          {filteredQuestions.length} questions found • Curated wisdom from solar consciousness
        </p>
        <p className="text-yellow-300 text-xs mt-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
          <Sparkles className="w-3 h-3 inline mr-1" />
          Each response blends mystical wisdom with modern science
        </p>
      </div>
    </div>
  );
}
