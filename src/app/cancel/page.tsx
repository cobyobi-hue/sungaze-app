"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { XCircle, ArrowLeft, CreditCard } from 'lucide-react';
import { Button } from '../components/ui/button';

function CancelContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [tier, setTier] = useState<string | null>(null);

  useEffect(() => {
    const tierParam = searchParams.get('tier');
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
          <XCircle className="w-24 h-24 text-orange-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>
          <p className="text-white/80 text-lg mb-2">
            Your payment for {tier ? getTierDisplayName(tier) : 'Premium'} was cancelled.
          </p>
          <p className="text-white/60 text-sm">
            No charges were made to your account. You can try again anytime.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 mb-8">
          <h3 className="text-white font-semibold mb-3">What's Next?</h3>
          <ul className="text-white/70 text-sm space-y-2 text-left">
            <li>• Your account remains on the free tier</li>
            <li>• You can upgrade anytime from your profile</li>
            <li>• All your progress is saved</li>
            <li>• No payment information was stored</li>
          </ul>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => router.push('/')}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-0 rounded-2xl px-8 py-4 transition-all duration-300 font-medium shadow-lg"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          
          <Button
            onClick={() => router.push('/')}
            className="w-full bg-transparent border border-white/30 text-white hover:bg-white/10 rounded-2xl px-8 py-4 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to App
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function CancelPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    }>
      <CancelContent />
    </Suspense>
  );
}
