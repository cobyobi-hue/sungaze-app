"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Crown, Calendar, CreditCard, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';
import { 
  checkSubscriptionStatus, 
  restorePurchases, 
  openSubscriptionManagement,
  getCustomerInfo,
  initializeRevenueCat 
} from '../../services/revenuecat.service';
import { PAYMENTS_ENABLED } from '../../lib/featureFlags';

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
  const [subscription, setSubscription] = useState<SubscriptionPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [platform, setPlatform] = useState<string>('web');

  useEffect(() => {
    checkPlatform();
    if (PAYMENTS_ENABLED) {
      loadSubscriptionStatus();
    } else {
      setIsLoading(false);
    }
  }, []);

  const checkPlatform = async () => {
    try {
      const Capacitor = (await import('@capacitor/core')).Capacitor;
      const currentPlatform = Capacitor.getPlatform();
      setPlatform(currentPlatform);
    } catch (e) {
      setPlatform('web');
    }
  };

  const loadSubscriptionStatus = async () => {
    setIsLoading(true);
    try {
      // Initialize RevenueCat if needed
      await initializeRevenueCat();
      
      const status = await checkSubscriptionStatus();
      
      if (status.isPremium && status.productId) {
        // Get full customer info for more details
        const customerInfo = await getCustomerInfo();
        const entitlement = customerInfo?.entitlements?.active?.['premium'];
        
        // Map product ID to plan name
        let planName = 'Premium';
        let tier = 'monthly';
        if (status.productId === 'com.sungaze.premium.monthly') {
          planName = 'Sungaze+ Monthly';
          tier = 'monthly';
        } else if (status.productId === 'com.sungaze.premium.yearly') {
          planName = 'Sungaze+ Yearly';
          tier = 'yearly';
        } else if (status.productId === 'com.sungaze.founder44') {
          planName = 'Founder 444';
          tier = 'founder_444';
        }

        setSubscription({
          id: status.productId,
          name: planName,
          tier: tier,
          price: entitlement?.productIdentifier || 'Active',
          renewalDate: status.expirationDate?.toLocaleDateString() || 'N/A',
          status: status.isActive ? 'active' : 'expired',
          features: [
            'Unlimited sungazing sessions',
            'All premium content',
            tier === 'founder_444' ? 'Founder badge & recognition' : 'Premium features',
            'Priority support',
            tier === 'founder_444' ? 'Exclusive founder features' : 'All updates included'
          ]
        });
      } else {
        // No active subscription
        setSubscription(null);
      }
    } catch (error) {
      console.error('Failed to load subscription status:', error);
      setSubscription(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestorePurchases = async () => {
    if (!PAYMENTS_ENABLED || platform === 'web') {
      alert('Restore purchases is only available on iOS and Android.');
      return;
    }

    try {
      await restorePurchases();
      await loadSubscriptionStatus();
      alert('Purchases restored successfully!');
    } catch (error: any) {
      console.error('Restore error:', error);
      alert(error.message || 'Failed to restore purchases. Please try again.');
    }
  };

  const handleManageSubscription = async () => {
    if (!PAYMENTS_ENABLED || platform === 'web') {
      alert('Subscription management is only available on iOS and Android.');
      return;
    }

    try {
      await openSubscriptionManagement();
    } catch (error: any) {
      console.error('Error opening subscription management:', error);
      alert('Failed to open subscription management. Please try again.');
    }
  };

  const handleCancelSubscription = () => {
    setShowCancelConfirm(true);
  };

  const handleConfirmCancel = () => {
    // Note: Cancellation must be done through App Store/Google Play
    handleManageSubscription();
    setShowCancelConfirm(false);
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
        {isLoading ? (
          <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl rounded-2xl border border-blue-400/20 p-6 mb-6">
            <div className="text-center py-8">
              <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-body-sm text-white/60">Loading subscription status...</p>
            </div>
          </div>
        ) : !subscription ? (
          <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl rounded-2xl border border-blue-400/20 p-6 mb-6">
            <div className="text-center py-8">
              <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-title-sm text-white font-semibold mb-2">No Active Subscription</h2>
              <p className="text-body-sm text-white/60 mb-4">
                {!PAYMENTS_ENABLED || platform === 'web' 
                  ? 'Subscriptions are coming soon!' 
                  : 'Upgrade to unlock premium features.'}
              </p>
            </div>
          </div>
        ) : (
          <>
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
          </>
        )}

        {/* Actions */}
        <div className="space-y-3">
          {PAYMENTS_ENABLED && platform !== 'web' && (
            <>
              {subscription && subscription.status === 'active' && (
                <>
                  <button
                    onClick={handleManageSubscription}
                    className="w-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-400/30 rounded-2xl py-4 text-white font-medium hover:from-blue-500/30 hover:to-indigo-500/30 transition-colors"
                  >
                    Manage Subscription
                  </button>
                  <button
                    onClick={handleCancelSubscription}
                    className="w-full bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-400/30 rounded-2xl py-4 text-red-400 font-medium hover:from-red-500/30 hover:to-pink-500/30 transition-colors"
                  >
                    Cancel Subscription
                  </button>
                </>
              )}
              
              <button
                onClick={handleRestorePurchases}
                className="w-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-2xl py-4 text-green-400 font-medium hover:from-green-500/30 hover:to-emerald-500/30 transition-colors"
              >
                Restore Purchases
              </button>
            </>
          )}
          
          {subscription && subscription.status === 'cancelled' && (
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

    </div>
  );
}

