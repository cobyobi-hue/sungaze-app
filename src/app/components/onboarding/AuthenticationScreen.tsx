"use client";

import React, { useState } from 'react';
import { Apple, Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface AuthenticationScreenProps {
  data: any;
  updateData: (section: string, data: any) => void;
  onNext: () => void;
  onPrev: () => void;
  currentStep: number;
  totalSteps: number;
}

export function AuthenticationScreen({ data, updateData, onNext }: AuthenticationScreenProps) {
  const [authMethod, setAuthMethod] = useState<'apple' | 'google' | 'email' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async (method: 'apple' | 'google' | 'email') => {
    setIsLoading(true);
    setAuthMethod(method);
    
    // Simulate authentication
    setTimeout(() => {
      updateData('authMethod', method);
      if (method === 'email') {
        updateData('email', email);
      }
      setIsLoading(false);
      onNext();
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-display-2xl text-white font-bold mb-2">Secure Your Solar Journey</h1>
        <p className="text-body-md text-white/70">Create your account to begin transformation</p>
      </div>

      {/* Authentication Options */}
      <div className="space-y-4 mb-8">
        {/* Sign in with Apple */}
        <button
          onClick={() => handleAuth('apple')}
          disabled={isLoading}
          className="w-full p-4 bg-black hover:bg-gray-900 border border-gray-700 rounded-xl text-white transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
        >
          <Apple className="w-6 h-6" />
          <span className="text-body-md font-medium">Continue with Apple</span>
        </button>

        {/* Sign in with Google */}
        <button
          onClick={() => handleAuth('google')}
          disabled={isLoading}
          className="w-full p-4 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl text-gray-900 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="text-body-md font-medium">Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white/60">or</span>
          </div>
        </div>

        {/* Email Authentication */}
        <div className="space-y-4">
          <div>
            <label className="block text-label text-white/80 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400/50 transition-colors"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-label text-white/80 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400/50 transition-colors"
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            onClick={() => handleAuth('email')}
            disabled={isLoading || !email || !password}
            className="w-full p-4 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30 border border-blue-400/30 rounded-xl text-white transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Mail className="w-5 h-5" />
            )}
            <span className="text-body-md font-medium">
              {isLoading ? 'Creating Account...' : 'Continue with Email'}
            </span>
          </button>
        </div>
      </div>

      {/* Privacy Assurance */}
      <div className="text-center">
        <p className="text-caption text-white/60 mb-4">
          By signing up, you agree to our{' '}
          <a href="#" className="text-blue-400 hover:text-blue-300 underline">Privacy Policy</a>
          {' '}and{' '}
          <a href="#" className="text-blue-400 hover:text-blue-300 underline">Terms of Service</a>
        </p>
        
        <div className="flex items-center justify-center gap-4 text-caption text-white/50">
          <div className="flex items-center gap-1">
            <Lock className="w-3 h-3" />
            <span>Encrypted</span>
          </div>
          <div className="flex items-center gap-1">
            <Lock className="w-3 h-3" />
            <span>Secure</span>
          </div>
          <div className="flex items-center gap-1">
            <Lock className="w-3 h-3" />
            <span>Private</span>
          </div>
        </div>
      </div>
    </div>
  );
}
