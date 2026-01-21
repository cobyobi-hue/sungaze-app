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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 w-full max-w-md shadow-[0_0_20px_rgba(59,130,246,0.1)]">
        <div className="text-center mb-8">
          <div className="relative w-16 h-16 mx-auto mb-4">
            {/* Sun44 Logo */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-yellow-300 to-orange-400 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.8),0_0_40px_rgba(255,165,0,0.4)]">
              <span className="text-black text-xl font-bold tracking-tight">44</span>
            </div>
            
            {/* Orbital dots */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full shadow-sm shadow-yellow-400/50"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-orange-400 rounded-full shadow-sm shadow-orange-400/50"></div>
            <div className="absolute -bottom-1 -right-1 w-1 h-1 bg-yellow-300 rounded-full shadow-sm shadow-yellow-300/50"></div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome to Sun44</h1>
          <p className="text-white/70">
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
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
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
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
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
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-300 hover:text-blue-200 text-sm transition-colors"
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

