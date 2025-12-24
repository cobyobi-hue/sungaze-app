/**
 * Example: How to use Subscription Context in a component
 * 
 * This shows how to:
 * 1. Check subscription status
 * 2. Lock premium features
 * 3. Show upgrade prompts
 */

"use client";

import React from 'react';
import { useSubscription } from '../../contexts/SubscriptionContext';
import { Lock, Crown } from 'lucide-react';

export function SubscriptionExample() {
  const { isPremium, isLoading, subscriptionStatus } = useSubscription();

  // Show loading state
  if (isLoading) {
    return (
      <div className="p-4 bg-white/10 rounded-xl">
        <p className="text-white/60">Checking subscription status...</p>
      </div>
    );
  }

  // Premium feature - locked
  if (!isPremium) {
    return (
      <div className="p-6 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-400/20 rounded-2xl">
        <div className="flex items-center gap-3 mb-4">
          <Lock className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-bold text-white">Premium Feature</h3>
        </div>
        <p className="text-white/80 mb-4">
          This feature requires a premium subscription.
        </p>
        <button
          onClick={() => {
            // Navigate to paywall or upgrade screen
            console.log('Navigate to upgrade');
          }}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-colors"
        >
          Upgrade to Premium
        </button>
      </div>
    );
  }

  // Premium feature - unlocked
  return (
    <div className="p-6 bg-gradient-to-br from-yellow-400/10 to-amber-500/10 border border-yellow-400/20 rounded-2xl">
      <div className="flex items-center gap-3 mb-4">
        <Crown className="w-6 h-6 text-yellow-400" />
        <h3 className="text-xl font-bold text-white">Premium Feature</h3>
      </div>
      <p className="text-white/80 mb-4">
        You have access to this premium feature!
      </p>
      {subscriptionStatus && (
        <div className="text-sm text-white/60">
          <p>Status: Active</p>
          {subscriptionStatus.expirationDate && (
            <p>Expires: {subscriptionStatus.expirationDate.toLocaleDateString()}</p>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Example: Premium Gate Component
 * Use this to wrap premium features
 */
interface PremiumFeatureProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function PremiumFeature({ children, fallback }: PremiumFeatureProps) {
  const { isPremium, isLoading } = useSubscription();

  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <p className="text-white/60">Loading...</p>
      </div>
    );
  }

  if (!isPremium) {
    return fallback || (
      <div className="p-6 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-400/20 rounded-2xl text-center">
        <Lock className="w-12 h-12 text-blue-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Premium Feature</h3>
        <p className="text-white/80 mb-4">
          Upgrade to unlock this feature
        </p>
        <button
          onClick={() => {
            // Navigate to upgrade
            console.log('Navigate to upgrade');
          }}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl"
        >
          Upgrade Now
        </button>
      </div>
    );
  }

  return <>{children}</>;
}


