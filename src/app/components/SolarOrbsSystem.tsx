"use client";

import React, { useState, useEffect } from 'react';
import { X, Sun, Share2, Crown, Zap, Check, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface SolarOrbsSystemProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  userId: string;
}

export function SolarOrbsSystem({ isOpen, onClose, onUpgrade, userId }: SolarOrbsSystemProps) {
  const [solarOrbs, setSolarOrbs] = useState(144); // Changed to 144
  const [showOrbDepleted, setShowOrbDepleted] = useState(false);
  const [showGlowRestored, setShowGlowRestored] = useState(false);

  // Simulate orb consumption
  const consumeOrbs = (amount: number) => {
    if (solarOrbs >= amount) {
      setSolarOrbs(prev => prev - amount);
      if (solarOrbs - amount <= 20) {
        setShowOrbDepleted(true);
      }
    }
  };

  // Restore orbs from sharing
  const restoreOrbs = (amount: number) => {
    setSolarOrbs(prev => prev + amount);
    setShowGlowRestored(true);
    setTimeout(() => setShowGlowRestored(false), 2000);
  };

  // Share the light function
  const shareTheLight = () => {
    // Simulate social sharing
    restoreOrbs(50);
    setShowOrbDepleted(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Main Modal */}
      <div className="relative w-full max-w-sm mx-4">
        <div className="bg-black rounded-3xl border border-white/20 shadow-2xl backdrop-blur-xl">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          {/* Header */}
          <div className="text-center pt-12 pb-8 px-8">
            <h1 className="text-4xl font-medium text-white mb-4 tracking-wider">
              SUNGAZE
            </h1>
            
            {/* Solar Orbs Counter */}
            <div className="relative mb-8">
              <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full border-2 transition-all duration-300 ${
                solarOrbs < 20 
                  ? 'border-red-400 bg-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.5)]' 
                  : 'border-yellow-400 bg-yellow-500/20 shadow-[0_0_20px_rgba(251,191,36,0.5)]'
              }`}>
                <Sun className={`w-6 h-6 ${solarOrbs < 20 ? 'text-red-400' : 'text-yellow-400'}`} />
                <span className={`text-2xl font-bold ${solarOrbs < 20 ? 'text-red-400' : 'text-yellow-400'}`}>
                  {solarOrbs}
                </span>
                <span className="text-white/80 text-sm font-medium">Solar Orbs</span>
              </div>
              
              {/* Glow Restored Animation */}
              {showGlowRestored && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-yellow-400 text-sm font-bold animate-pulse">
                    ✨ Glow Restored!
                  </div>
                </div>
              )}
            </div>

            {/* Main Content - Updated messaging */}
            <div className="space-y-6">
              <h2 className="text-2xl font-medium text-white mb-2">
                Continue Your Solar Path
              </h2>
              
              <div className="text-white/80 text-lg">
                <span className="font-bold">144 Solar Orbs</span> to begin your journey
              </div>
              
              <div className="text-white/60 text-sm">
                Each ritual costs 10 orbs • Share light to earn more
              </div>

              {/* Benefits */}
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-white font-medium">Sacred sun gazing rituals</p>
                    <p className="text-white/60 text-sm">Transform sunlight into cellular nourishment</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-white font-medium">Ancient meditation practices</p>
                    <p className="text-white/60 text-sm">From 10 seconds to 44 minutes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-8 pb-8 space-y-4">
            <Button
              onClick={() => {
                // Start with orbs
                onClose();
              }}
              className="w-full bg-white text-black font-bold py-4 rounded-2xl text-lg hover:bg-white/90 transition-all duration-300 shadow-lg"
            >
              Begin Solar Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <button 
              onClick={onUpgrade}
              className="w-full text-white/60 text-sm font-medium flex items-center justify-center gap-2 hover:text-white transition-colors"
            >
              Become Solar Adept (Unlimited)
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Orb Depleted Modal */}
          {showOrbDepleted && (
            <div className="absolute inset-0 bg-black/95 rounded-3xl flex items-center justify-center p-8">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto">
                  <Sun className="w-8 h-8 text-red-400" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Your Light Has Dimmed
                  </h3>
                  <p className="text-white/80 text-lg leading-relaxed">
                    To continue your Solar Path, you must exchange energy. Share the light with others (recommended), or step fully into the Adept Path.
                  </p>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={shareTheLight}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white font-bold py-4 rounded-xl"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    Share the Light (+50 orbs)
                  </Button>
                  
                  <Button
                    onClick={() => {
                      setShowOrbDepleted(false);
                      onUpgrade();
                    }}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-bold py-4 rounded-xl"
                  >
                    <Crown className="w-5 h-5 mr-2" />
                    Become Solar Adept
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
