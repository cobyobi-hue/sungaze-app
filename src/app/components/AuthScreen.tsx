"use client";

import React, { useState } from 'react';
import { Button } from './ui/button';
import { createClient } from '../lib/supabase/client';
import { getAppBaseUrl, joinUrl } from '../lib/appUrl';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
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
  const appBaseUrl = getAppBaseUrl();
  const authCallbackUrl = joinUrl(appBaseUrl, '/auth/callback');
  const resetPasswordUrl = joinUrl(appBaseUrl, '/reset-password');
  const { isOnline } = useNetworkStatus();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!isOnline) {
      setError('You appear to be offline. Please reconnect to sign in or create an account.');
      setLoading(false);
      return;
    }

    if (!supabase) {
      setError('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
      setLoading(false);
      return;
    }

    console.log('Auth form submitted:', { isSignUp, email, password: '***' });

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: authCallbackUrl,
            data: {
              app_name: 'SUNGAZE',
              app_url: appBaseUrl
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
          // For developer bypass, we need to actually sign in to create a session
          // Try to sign in with password first, if that fails, create a session manually
          setTimeout(async () => {
            try {
              // Try to sign in (password might be anything for dev account)
              const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
                email: 'cobyobi@gmail.com',
                password: password || 'dev-bypass-2024',
              });
              
              if (signInError) {
                // If sign in fails, create a mock session for developer
                console.log('Developer bypass: Creating mock session');
                // Set a flag in localStorage to indicate developer mode
                localStorage.setItem('dev_bypass', 'true');
                localStorage.setItem('dev_email', 'cobyobi@gmail.com');
              }
              
              onAuthSuccess();
            } catch (err) {
              console.error('Developer bypass error:', err);
              // Still call onAuthSuccess to proceed
              localStorage.setItem('dev_bypass', 'true');
              localStorage.setItem('dev_email', 'cobyobi@gmail.com');
              onAuthSuccess();
            }
          }, 1000);
        } else {
          // Account created successfully - proceed directly to app (no email verification for app store review)
          setError('Account created successfully! Redirecting...');
          setTimeout(() => {
            onAuthSuccess();
          }, 1000);
        }
      } else {
        console.log('Attempting sign in...');
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        console.log('Sign in response:', { data: data?.user?.id, error: error?.message });

        if (error) {
          console.error('Sign in error:', error);
          throw error;
        }

        if (data.user) {
          console.log('Sign in successful, user:', data.user.id);
          // Developer bypass - auto-login for app creator
          if (email === 'cobyobi@gmail.com') {
            setError('Developer access granted! Redirecting...');
            localStorage.setItem('dev_bypass', 'true');
            localStorage.setItem('dev_email', 'cobyobi@gmail.com');
            setTimeout(() => {
              console.log('Calling onAuthSuccess...');
              onAuthSuccess();
            }, 1000);
          } else {
            console.log('Calling onAuthSuccess for regular user...');
            onAuthSuccess();
          }
        } else {
          console.warn('Sign in succeeded but no user data returned');
          setError('Sign in successful but no user data. Please try again.');
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      setError(error.message || 'An error occurred during authentication. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!isOnline) {
      setError('You appear to be offline. Please reconnect to request a password reset email.');
      setLoading(false);
      return;
    }

    if (!supabase) {
      setError('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: resetPasswordUrl,
      });

      if (error) throw error;

      setError('Password reset link sent to your email!');
      setShowResetPassword(false);
    } catch (error: any) {
      // Make the common Supabase allowlist failure self-explanatory.
      const msg = String(error?.message ?? error ?? 'Unknown error');
      if (msg.toLowerCase().includes('redirect') && msg.toLowerCase().includes('not allowed')) {
        setError(
          'Password reset failed: redirect URL not allowed. In Supabase → Auth → URL Configuration, allowlist: ' +
            resetPasswordUrl
        );
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#40C4FF] via-[#4DD0E1] to-[#006064] text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dark teal overlay for readability */}
      <div className="absolute inset-0 bg-black/35 backdrop-blur-xl" />
      
      {/* Content wrapper */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300/30 to-amber-400/30 blur-3xl scale-150 animate-pulse"></div>
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400/90 to-amber-500/90 flex items-center justify-center shadow-[0_0_40px_rgba(251,191,36,0.6),0_0_80px_rgba(255,215,0,0.3)] border-2 border-yellow-300/40">
              <span className="text-black text-2xl font-bold tracking-tight drop-shadow-[0_2px_4px_rgba(255,255,255,0.3)]">44</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-yellow-400 mb-2 drop-shadow-[0_3px_6px_rgba(0,0,0,0.9),0_0_8px_rgba(255,215,0,0.5)]">SUNGAZE</h1>
          <p className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">Sacred Light Nutrition</p>
        </div>

        {/* Auth Form */}
        <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-white mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {isSignUp ? 'Join the Solar Journey' : 'Welcome Back'}
            </h2>
            <p className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
              {isSignUp ? 'Begin your sacred practice' : 'Continue your solar path'}
            </p>
          </div>

          {showResetPassword ? (
            <form onSubmit={handlePasswordReset} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-black/40 backdrop-blur-md border border-white/10 hover:bg-black/50 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-xl p-3 shadow-[0_2px_8px_rgba(239,68,68,0.3)]">
                  <p className="text-red-300 text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">{error}</p>
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
                  className="text-yellow-300 hover:text-yellow-200 text-sm font-medium drop-shadow-[0_1px_3px_rgba(255,215,0,0.6)] transition-colors duration-300"
                >
                  Back to Sign In
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleAuth} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/40 backdrop-blur-md border border-white/10 hover:bg-black/50 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-white mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-black/40 backdrop-blur-md border border-white/10 hover:bg-black/50 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                  placeholder="Enter your password"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] transition-colors duration-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-xl p-3 shadow-[0_2px_8px_rgba(239,68,68,0.3)]">
                <p className="text-red-300 text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">{error}</p>
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
                  className="text-yellow-300 hover:text-yellow-200 text-sm font-medium drop-shadow-[0_1px_3px_rgba(255,215,0,0.6)] transition-colors duration-300"
                >
                  Forgot your password?
                </button>
              </div>
            )}
            <div>
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-yellow-300 hover:text-yellow-200 text-sm font-medium drop-shadow-[0_1px_3px_rgba(255,215,0,0.6)] transition-colors duration-300"
              >
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End content wrapper */}
    </div>
  );
}
