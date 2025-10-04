"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [tier, setTier] = useState<string | null>(null);

  useEffect(() => {
    const sessionIdParam = searchParams.get('session_id');
    const tierParam = searchParams.get('tier');
    
    if (sessionIdParam) {
      setSessionId(sessionIdParam);
    }
    if (tierParam) {
      setTier(tierParam);
    }
  }, [searchParams]);

  const getTierDisplayName = (tier: string) => {
    switch (tier) {
      case 'founder_444': return 'Founder 444';
      case 'yearly': return 'Premium Yearly';
      case 'monthly': return 'Premium Monthly';
      default: return 'Premium';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <CheckCircle className="w-24 h-24 text-green-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-white/80 text-lg mb-2">
            Welcome to {tier ? getTierDisplayName(tier) : 'Premium'}!
          </p>
          <p className="text-white/60 text-sm">
            Your subscription is now active. You can access all premium features.
          </p>
        </div>

        {sessionId && (
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 mb-8">
            <p className="text-white/60 text-xs mb-2">Session ID</p>
            <p className="text-white/80 text-sm font-mono break-all">{sessionId}</p>
          </div>
        )}

        <div className="space-y-4">
          <Button
            onClick={() => router.push('/')}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 rounded-2xl px-8 py-4 transition-all duration-300 font-medium shadow-lg"
          >
            Continue to App
          </Button>
          
          <Button
            onClick={() => router.push('/')}
            className="w-full bg-transparent border border-white/30 text-white hover:bg-white/10 rounded-2xl px-8 py-4 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
