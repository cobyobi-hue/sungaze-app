"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../lib/supabase/client';

export default function AuthCallback() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          router.push('/?error=auth_callback_failed');
          return;
        }

        if (data.session) {
          // User is authenticated, redirect to main app
          router.push('/');
        } else {
          // No session, redirect to auth screen
          router.push('/');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        router.push('/?error=auth_callback_failed');
      }
    };

    handleAuthCallback();
  }, [router, supabase.auth]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center">
      <div className="text-center">
        <div className="relative inline-flex items-center justify-center mb-6">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300/20 to-amber-400/20 blur-3xl scale-150"></div>
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400/90 to-amber-500/90 flex items-center justify-center shadow-[0_0_40px_rgba(251,191,36,0.5)] border border-yellow-300/30">
            <span className="text-black text-2xl font-bold tracking-tight">44</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-yellow-400 mb-2">SUNGAZE</h1>
        <p className="text-white/60 mb-4">Verifying your account...</p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto"></div>
      </div>
    </div>
  );
}

