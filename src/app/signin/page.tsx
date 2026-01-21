'use client';

import { useState } from 'react';
import { createClient } from '../lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          setError(error.message);
        } else if (data.user) {
          // Create user profile
          await supabase
            .from('user_profiles')
            .insert([{
              id: data.user.id,
              email: data.user.email,
              tier: 'free',
              badges: [],
              seals: [],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }]);

          setError('Check your email for verification link!');
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setError(error.message);
        } else if (data.user) {
          router.push('/');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#40C4FF] via-[#4DD0E1] to-[#006064] flex items-center justify-center p-4 text-white">
      <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
        <div className="text-center mb-8">
          <div className="relative w-20 h-20 mx-auto mb-5">
            {/* Black sun orb with bright gold ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-200/55 via-yellow-300/50 to-yellow-400/35 blur-2xl scale-110" />
            <div className="absolute inset-0 rounded-full border-2 border-yellow-200/95 shadow-[0_0_24px_rgba(255,230,120,0.9),0_0_70px_rgba(255,215,0,0.45)]" />
            <div className="absolute inset-[8px] rounded-full bg-black/90 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.10),inset_0_-14px_30px_rgba(0,0,0,0.6)] flex items-center justify-center">
              <span className="text-[#FFEB3B] text-2xl font-extrabold tracking-tight drop-shadow-[0_8px_18px_rgba(0,0,0,0.75),0_0_18px_rgba(255,215,0,0.6)]">
                44
              </span>
            </div>
            {/* Orbital dots */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '15s' }}>
              <div className="w-2.5 h-2.5 bg-[#FFF8E1] rounded-full absolute -top-1 left-1/2 transform -translate-x-1/2 shadow-[0_0_12px_rgba(255,248,225,0.9)]" />
              <div className="w-1.5 h-1.5 bg-[#FFEB3B] rounded-full absolute top-1/2 -right-1 transform -translate-y-1/2 shadow-[0_0_14px_rgba(255,235,59,0.98)]" />
              <div className="w-2 h-2 bg-[#FFEB3B] rounded-full absolute -bottom-1 left-1/2 transform -translate-x-1/2 shadow-[0_0_16px_rgba(255,235,59,0.98)]" />
              <div className="w-1.5 h-1.5 bg-[#FFEB3B] rounded-full absolute top-1/2 -left-1 transform -translate-y-1/2 shadow-[0_0_14px_rgba(255,235,59,0.98)]" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white mb-2 drop-shadow-[0_3px_8px_rgba(0,0,0,0.7)]">
            {isSignUp ? 'Create your Sungaze account' : 'Welcome back'}
          </h1>
          <p className="text-white/80 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
            {isSignUp ? 'Create your account' : 'Sign in to your account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-black/40 border border-white/15 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 backdrop-blur-md"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white/90 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-black/40 border border-white/15 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 backdrop-blur-md"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-3">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#40C4FF] to-[#4DD0E1] hover:opacity-95 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-white/80 hover:text-white text-sm transition-colors font-medium"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-white/50 text-xs">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

