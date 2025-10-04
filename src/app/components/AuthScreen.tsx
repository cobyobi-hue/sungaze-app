"use client";

import React, { useState } from 'react';
import { Button } from './ui/button';
import { createClient } from '../lib/supabase/client';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

interface AuthScreenProps {
  onAuthSuccess: () => void;
}

export function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  
  const supabase = createClient();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
            data: {
              app_name: 'SUNGAZE',
              app_url: window.location.origin
            }
          }
        });

        if (error) throw error;

        if (data.user) {
          // Create user profile
          const { error: profileError } = await supabase
            .from('user_profiles')
            .insert({
              id: data.user.id,
              email: data.user.email,
              tier: 'free',
              founder_number: null,
              founder_region: null,
              badges: ['New Seeker'],
              seals: [],
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              purchase_date: null,
              expiration_date: null,
              subscription_status: 'active'
            });

          if (profileError) {
            console.error('Profile creation error:', {
              message: profileError.message,
              code: profileError.code,
              details: profileError.details,
              hint: profileError.hint
            });
            // Don't throw error - user can still proceed
          }
        }

        // Developer bypass - auto-verify for app creator
        if (email === 'cobyobi@gmail.com') {
          setError('Developer access granted! Redirecting...');
          setTimeout(() => {
            onAuthSuccess();
          }, 1000);
        } else {
          setError('Check your email for verification link!');
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (data.user) {
          // Developer bypass - auto-login for app creator
          if (email === 'cobyobi@gmail.com') {
            setError('Developer access granted! Redirecting...');
            setTimeout(() => {
              onAuthSuccess();
            }, 1000);
          } else {
            onAuthSuccess();
          }
        }
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setError('Password reset link sent to your email!');
      setShowResetPassword(false);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300/20 to-amber-400/20 blur-3xl scale-150"></div>
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400/90 to-amber-500/90 flex items-center justify-center shadow-[0_0_40px_rgba(251,191,36,0.5)] border border-yellow-300/30">
              <span className="text-black text-2xl font-bold tracking-tight">44</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-yellow-400 mb-2">SUNGAZE</h1>
          <p className="text-white/60">Sacred Light Nutrition</p>
        </div>

        {/* Auth Form */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-white mb-2">
              {isSignUp ? 'Join the Solar Journey' : 'Welcome Back'}
            </h2>
            <p className="text-white/60">
              {isSignUp ? 'Begin your sacred practice' : 'Continue your solar path'}
            </p>
          </div>

          {showResetPassword ? (
            <form onSubmit={handlePasswordReset} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-3">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-semibold py-3 rounded-xl transition-all duration-300 disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>

              <div className="text-center">
                <button
                  onClick={() => setShowResetPassword(false)}
                  className="text-yellow-400 hover:text-yellow-300 text-sm font-medium"
                >
                  Back to Sign In
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleAuth} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-3">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-semibold py-3 rounded-xl transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'Loading...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </Button>
          </form>
          )}

          {/* Toggle Auth Mode */}
          <div className="text-center mt-6 space-y-2">
            {!isSignUp && !showResetPassword && (
              <div>
                <button
                  onClick={() => setShowResetPassword(true)}
                  className="text-yellow-400 hover:text-yellow-300 text-sm font-medium"
                >
                  Forgot your password?
                </button>
              </div>
            )}
            <div>
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-yellow-400 hover:text-yellow-300 text-sm font-medium"
              >
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
