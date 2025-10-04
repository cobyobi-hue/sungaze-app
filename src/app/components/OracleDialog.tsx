'use client';

import { useState } from 'react';
import { oracle } from '../lib/oracle';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Sun, MessageSquare, Sparkles } from 'lucide-react';

interface OracleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  sessionType?: string;
}

export function OracleDialog({ isOpen, onClose, sessionType }: OracleDialogProps) {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  const handleAskOracle = async () => {
    if (!question.trim()) return;
    
    setIsLoading(true);
    try {
      const oracleResponse = await oracle.askTheSun(question, sessionType);
      setResponse(oracleResponse);
      setShowResponse(true);
    } catch (error) {
      setResponse("The sun speaks in silence. Listen deeper.");
      setShowResponse(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartOver = () => {
    setQuestion('');
    setResponse('');
    setShowResponse(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-orange-900/90 to-amber-900/90 backdrop-blur-md rounded-3xl max-w-md w-full border border-amber-400/30 shadow-2xl">
        {!showResponse ? (
          <>
            {/* Header */}
            <div className="p-6 border-b border-amber-400/20">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
                  <Sun className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl text-amber-200 font-light tracking-wide">
                  Ask the Sun
                </h2>
              </div>
              <p className="text-amber-200/80 text-sm text-center">
                Channel mystical wisdom and the solar science of HRM
              </p>
            </div>

            {/* Question Input */}
            <div className="p-6">
              <Textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Share your question, struggle, or insight from today's practice..."
                className="w-full bg-amber-900/20 border border-amber-400/30 rounded-2xl p-4 text-amber-100 placeholder:text-amber-300/60 focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/30 min-h-[100px] resize-none"
                maxLength={280}
              />
              
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-amber-300/60">
                  {question.length}/280
                </span>
                <div className="flex gap-2">
                  <Button
                    onClick={onClose}
                    className="px-4 py-2 text-amber-200 hover:text-white bg-transparent hover:bg-amber-900/30 border border-amber-400/30 rounded-xl text-sm"
                  >
                    Later
                  </Button>
                  <Button
                    onClick={handleAskOracle}
                    disabled={!question.trim() || isLoading}
                    className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Receiving...
                      </>
                    ) : (
                      <>
                        <MessageSquare className="w-4 h-4" />
                        Ask Oracle
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Response Header */}
            <div className="p-6 border-b border-amber-400/20">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl text-amber-200 font-light tracking-wide">
                  The Oracle Speaks
                </h2>
              </div>
            </div>

            {/* Oracle Response */}
            <div className="p-6">
              <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-400/20 rounded-2xl p-6 mb-6">
                <blockquote className="text-amber-100 text-lg leading-relaxed font-light italic text-center">
                  "{response}"
                </blockquote>
              </div>

              <div className="text-center text-xs text-amber-300/60 mb-6">
                <p>Channeling mystical consciousness & HRM's solar science</p>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleStartOver}
                  className="flex-1 px-4 py-2 text-amber-200 hover:text-white bg-transparent hover:bg-amber-900/30 border border-amber-400/30 rounded-xl text-sm"
                >
                  Ask Again
                </Button>
                <Button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-sm font-medium"
                >
                  Complete
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}