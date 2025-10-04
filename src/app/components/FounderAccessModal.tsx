"use client";

import React, { useState } from 'react';
import { Button } from './ui/button';
import { X, Sun, Mail, ExternalLink } from 'lucide-react';
import { founderTracker } from '../lib/founder-tracker';

interface FounderAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string;
}

export function FounderAccessModal({ isOpen, onClose, userId = 'test-user-1' }: FounderAccessModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      // Store email locally
      localStorage.setItem('localStorage.email', email);
      
      // Update founder's ritual email in the tracking system
      const success = founderTracker.updateFounderRitualEmail(userId, email);
      
      if (success) {
        console.log(`Founder ritual email updated for user ${userId}: ${email}`);
      }
      
      // Small delay for UX
      setTimeout(() => {
        setIsSubmitting(false);
        onClose();
      }, 500);
      
    } catch (error) {
      console.error('Error saving founder email:', error);
      setIsSubmitting(false);
    }
  };

  const handleJoinRitual = () => {
    console.log('Join Ritual clicked - attempting to open new window');
    
    // Create a data URL with the placeholder message
    const message = "We are the SunKeepers. The day where we meet awaits you. Be patient. Stay Tuned.";
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>SunKeepers</title>
          <style>
            body { 
              font-family: system-ui, sans-serif; 
              background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
              color: white; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              min-height: 100vh; 
              margin: 0;
              text-align: center;
              padding: 20px;
            }
            .container {
              background: rgba(0,0,0,0.3);
              padding: 40px;
              border-radius: 20px;
              backdrop-filter: blur(10px);
              border: 1px solid rgba(255,255,255,0.2);
            }
            h1 { 
              font-size: 2.5em; 
              margin-bottom: 20px; 
              text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            }
            p { 
              font-size: 1.2em; 
              line-height: 1.6;
              text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>☀️ SunKeepers</h1>
            <p>${message}</p>
          </div>
        </body>
      </html>
    `;
    
    const dataUrl = 'data:text/html;charset=utf-8,' + encodeURIComponent(htmlContent);
    console.log('Opening data URL:', dataUrl);
    
    const newWindow = window.open(dataUrl, '_blank');
    if (!newWindow) {
      console.log('Popup blocked! Trying alternative method...');
      alert('Please allow popups for this site, or the ritual page will not open.');
    } else {
      console.log('New window opened successfully');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-4">
      <div className="relative bg-gradient-to-br from-yellow-50/95 to-orange-50/95 border border-yellow-300/30 rounded-3xl p-8 max-w-md w-full shadow-2xl backdrop-blur-xl">
        {/* Close button */}
        <Button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 p-0 bg-white/20 hover:bg-white/30 border border-white/20 rounded-full"
        >
          <X className="w-4 h-4 text-gray-600" />
        </Button>

        {/* Header with sun icon */}
        <div className="text-center mb-6">
          <div className="relative inline-flex items-center justify-center mb-4">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300/20 to-amber-400/20 blur-3xl scale-150" />
            <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400/90 to-amber-500/90 flex items-center justify-center shadow-[0_0_40px_rgba(251,191,36,0.5)] border border-yellow-300/30">
              <Sun className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Founder Access
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            Enter your email to receive the Solstice Global Ritual invite.
          </p>
        </div>

        {/* Email form */}
        <form onSubmit={handleEmailSubmit} className="space-y-4 mb-6">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full pl-10 pr-4 py-3 bg-white/80 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 text-gray-900 placeholder-gray-500"
            />
          </div>
          
          <Button
            type="submit"
            disabled={isSubmitting || !email.trim()}
            className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-300"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </div>
            ) : (
              'Save Email'
            )}
          </Button>
        </form>

        {/* Join Ritual Button */}
        <div className="border-t border-gray-200 pt-6">
          <p className="text-gray-600 text-sm text-center mb-4">
            Ready to join the global community?
          </p>
          <Button
            onClick={handleJoinRitual}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            Join Global Ritual
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>

        {/* Sacred messaging */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-xs italic">
            Welcome to the First Witnesses of the Flame ✨
          </p>
        </div>
      </div>
    </div>
  );
}