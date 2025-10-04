"use client";

import React, { useState } from 'react';
import { ArrowLeft, Crown, Calendar, CreditCard, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';

interface MembershipScreenProps {
  onBack: () => void;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  tier: string;
  price: string;
  renewalDate: string;
  status: 'active' | 'cancelled' | 'expired';
  features: string[];
}

export function MembershipScreen({ onBack }: MembershipScreenProps) {
  const [subscription, setSubscription] = useState<SubscriptionPlan>({
    id: 'founder_444',
    name: 'Founder 444',
    tier: 'founder_444',
    price: '$444.00/year',
    renewalDate: '2028-09-26',
    status: 'active',
    features: [
      'Unlimited sungazing sessions',
      'All premium content',
      'Founder badge & recognition',
      'Priority support',
      'Exclusive founder features'
    ]
  });

  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showUpgradeOptions, setShowUpgradeOptions] = useState(false);

  const handleCancelSubscription = () => {
    setShowCancelConfirm(true);
  };

  const handleConfirmCancel = () => {
    setSubscription(prev => ({ ...prev, status: 'cancelled' }));
    setShowCancelConfirm(false);
  };

  const handleUpgrade = () => {
    setShowUpgradeOptions(true);
  };

  const handleDowngrade = () => {
    // Handle downgrade logic
    console.log('Downgrade subscription');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'cancelled': return 'text-red-400';
      case 'expired': return 'text-orange-400';
      default: return 'text-white/60';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'cancelled': return 'Cancelled';
      case 'expired': return 'Expired';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="w-8 h-8 flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 text-white" />
          </button>
          <h1 className="text-xl text-white font-semibold">Membership</h1>
        </div>

        {/* Current Plan */}
        <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl rounded-2xl border border-blue-400/20 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-title-sm text-white font-semibold">{subscription.name}</h2>
              <p className={`text-body-sm ${getStatusColor(subscription.status)}`}>
                {getStatusText(subscription.status)}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-body-sm text-white/60">Price</span>
              <span className="text-body-md text-white font-medium">{subscription.price}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-body-sm text-white/60">Renewal Date</span>
              <span className="text-body-md text-white font-medium">{subscription.renewalDate}</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl rounded-2xl border border-blue-400/20 p-6 mb-6">
          <h3 className="text-title-sm text-white font-semibold mb-4">Plan Features</h3>
          <div className="space-y-2">
            {subscription.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-body-sm text-white/80">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {subscription.status === 'active' && (
            <>
              <button
                onClick={handleUpgrade}
                className="w-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-400/30 rounded-2xl py-4 text-white font-medium hover:from-blue-500/30 hover:to-indigo-500/30 transition-colors"
              >
                Upgrade Plan
              </button>
              <button
                onClick={handleDowngrade}
                className="w-full bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-400/30 rounded-2xl py-4 text-white font-medium hover:from-orange-500/30 hover:to-yellow-500/30 transition-colors"
              >
                Downgrade Plan
              </button>
              <button
                onClick={handleCancelSubscription}
                className="w-full bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-400/30 rounded-2xl py-4 text-red-400 font-medium hover:from-red-500/30 hover:to-pink-500/30 transition-colors"
              >
                Cancel Subscription
              </button>
            </>
          )}
          
          {subscription.status === 'cancelled' && (
            <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-400/30 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
                <div>
                  <p className="text-body-sm text-orange-400 font-medium">Subscription Cancelled</p>
                  <p className="text-body-sm text-white/60">Your access will continue until {subscription.renewalDate}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl w-full max-w-md p-6 border border-white/10">
            <h3 className="text-title-sm text-white font-semibold mb-4 text-center">
              Cancel Subscription
            </h3>
            <p className="text-body-sm text-white/60 mb-6 text-center leading-relaxed">
              Are you sure you want to cancel your subscription? You'll lose access to premium features at the end of your current billing period.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="flex-1 bg-white/10 border border-white/20 rounded-xl py-3 text-white hover:bg-white/20 transition-colors"
              >
                Keep Subscription
              </button>
              <button
                onClick={handleConfirmCancel}
                className="flex-1 bg-red-500/20 border border-red-400/30 rounded-xl py-3 text-red-400 hover:bg-red-500/30 transition-colors"
              >
                Cancel Subscription
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Options Modal */}
      {showUpgradeOptions && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl w-full max-w-md p-6 border border-white/10">
            <h3 className="text-title-sm text-white font-semibold mb-4 text-center">
              Upgrade Options
            </h3>
            <p className="text-body-sm text-white/60 mb-6 text-center leading-relaxed">
              You're already on our highest tier plan! The Founder 444 plan includes all premium features.
            </p>
            <button
              onClick={() => setShowUpgradeOptions(false)}
              className="w-full bg-blue-500/20 border border-blue-400/30 rounded-xl py-3 text-blue-400 hover:bg-blue-500/30 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

