"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from "./ui/button";
import { Sun, Sparkles, Send, History, X, Loader2, Eye, Heart, Brain, Shield, Zap } from 'lucide-react';
import { sun44Oracle, type OracleSession } from '../lib/sun44Oracle';

interface Sun44OracleProps {
  onClose: () => void;
  userLevel?: number;
  className?: string;
}

export function Sun44Oracle({ onClose, userLevel, className = "" }: Sun44OracleProps) {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionType, setSessionType] = useState<'general' | 'guidance' | 'post-gaze' | 'daily-wisdom'>('general');
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<OracleSession[]>([]);
  const [error, setError] = useState<string | null>(null);

  const questionInputRef = useRef<HTMLTextAreaElement>(null);
  const responseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load session history
    setHistory(sun44Oracle.getSessionHistory());
    
    // Focus input on mount
    if (questionInputRef.current) {
      questionInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Auto-scroll to response when it appears
    if (response && responseRef.current) {
      responseRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [response]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const oracleResponse = await sun44Oracle.askQuestion(question.trim(), sessionType, { 
        currentDay: userLevel || 1, 
        practiceDuration: 0, 
        mood: 'neutral' 
      });
      setResponse(oracleResponse.response);
      setHistory(sun44Oracle.getSessionHistory());
      
      // Clear question after successful response
      setQuestion('');
    } catch (err) {
      setError('The Oracle is temporarily silent. Please try again.');
      console.error('Oracle error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const sessionTypes = [
    { id: 'general' as const, label: 'General', icon: Sun, description: 'Universal solar wisdom' },
    { id: 'guidance' as const, label: 'Guidance', icon: Eye, description: 'Technique guidance' },
    { id: 'post-gaze' as const, label: 'Post-Gaze', icon: Sparkles, description: 'After practice wisdom' },
    { id: 'daily-wisdom' as const, label: 'Daily Wisdom', icon: Heart, description: 'Daily insights' }
  ];

  const currentSessionType = sessionTypes.find(type => type.id === sessionType);

  return (
    <div className={`fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 ${className}`}>
      <div className="bg-gradient-to-br from-amber-950 via-orange-900 to-yellow-900 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl border border-amber-400/30">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 px-8 py-6 border-b border-amber-400/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl text-white font-semibold flex items-center gap-2">
                  Sun 44 Oracle
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </h1>
                <p className="text-amber-200 text-sm">
                  {userLevel ? `Level ${userLevel} Guidance` : 'Ancient Solar Wisdom'}
                  {currentSessionType && ` • ${currentSessionType.description}`}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowHistory(!showHistory)}
                className="text-amber-200 hover:text-white hover:bg-white/10 bg-transparent border-none px-2 py-1"
              >
                <History className="w-4 h-4" />
              </Button>
              <Button
                onClick={onClose}
                className="text-amber-200 hover:text-white hover:bg-white/10 bg-transparent border-none px-2 py-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Main Oracle Interface */}
          <div className="flex-1 flex flex-col">
            
            {/* Session Type Selector */}
            <div className="px-6 py-4 border-b border-amber-400/20">
              <div className="flex gap-2 flex-wrap">
                {sessionTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSessionType(type.id)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-all duration-200 ${
                        sessionType === type.id
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                          : 'bg-white/10 text-amber-200 hover:bg-white/20 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {type.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Oracle Response Area */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {!response && !isLoading && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400/20 to-orange-500/20 flex items-center justify-center mx-auto mb-6">
                    <Sun className="w-10 h-10 text-amber-400" />
                  </div>
                  <h2 className="text-white text-xl mb-3">Welcome to the Sun 44 Oracle</h2>
                  <p className="text-amber-200 text-sm max-w-md mx-auto mb-6">
                    Ask your question about solar practice, spiritual awakening, health, or any aspect of your solar journey. 
                    The Oracle channels ancient wisdom to guide your path.
                  </p>
                  {userLevel && userLevel >= 4 && (
                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 max-w-sm mx-auto">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-purple-300" />
                        <span className="text-purple-200 text-sm font-medium">44-Minute Threshold</span>
                      </div>
                      <p className="text-purple-100 text-xs">
                        You've reached the sacred 44-minute completion. The Oracle offers deepest wisdom.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {isLoading && (
                <div className="text-center py-12">
                  <Loader2 className="w-8 h-8 text-amber-400 animate-spin mx-auto mb-4" />
                  <p className="text-amber-200 text-sm">The Oracle contemplates your question...</p>
                </div>
              )}

              {error && (
                <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-4 mb-6">
                  <p className="text-red-200 text-sm">{error}</p>
                </div>
              )}

              {response && (
                <div ref={responseRef} className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl p-6 border border-amber-400/30">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 mt-1">
                      <Sun className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-amber-300 font-medium mb-2 flex items-center gap-2">
                        Oracle Response
                        {currentSessionType && <currentSessionType.icon className="w-4 h-4" />}
                      </h3>
                      <div className="text-white text-base leading-relaxed">
                        {response}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Question Input */}
            <div className="px-6 py-4 border-t border-amber-400/20">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <textarea
                    ref={questionInputRef}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask the Sun 44 Oracle your question..."
                    className="w-full bg-black/30 border border-amber-400/30 rounded-xl px-4 py-3 text-white placeholder-amber-300/70 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 resize-none"
                    rows={3}
                    maxLength={500}
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-amber-400/70">
                    {question.length}/500
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <p className="text-amber-300/80 text-xs">
                    Choose your session type above for focused guidance
                  </p>
                  <Button
                    type="submit"
                    disabled={!question.trim() || isLoading}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 px-6 py-2 rounded-xl flex items-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Consulting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Ask Oracle
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* History Sidebar */}
          {showHistory && (
            <div className="w-80 border-l border-amber-400/20 bg-black/20">
              <div className="px-4 py-3 border-b border-amber-400/20">
                <h3 className="text-white font-medium flex items-center gap-2">
                  <History className="w-4 h-4" />
                  Oracle History
                </h3>
              </div>
              <div className="h-full overflow-y-auto p-4 space-y-3">
                {history.length === 0 ? (
                  <p className="text-amber-300/70 text-sm text-center py-8">
                    No previous sessions
                  </p>
                ) : (
                  history.slice().reverse().map((session) => (
                    <div key={session.id} className="bg-white/5 rounded-lg p-3 text-xs">
                      <div className="text-amber-300 font-medium mb-1 capitalize">
                        {session.sessionType} • {session.timestamp.toLocaleDateString()}
                      </div>
                      <div className="text-amber-200/80 mb-2 line-clamp-2">
                        Q: {session.question}
                      </div>
                      <div className="text-white/90 line-clamp-3">
                        {session.response}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}