"use client";

import React, { useState, useEffect } from 'react';
import { X, Crown, Flame, Sun, Shield, Zap, Lock, Star, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { TIER_FEATURES } from '../types/subscription';
import { FounderStats } from './FounderStats';
import { subscriptionService } from '../lib/database/subscription-service';
import { 
  getOfferings, 
  purchasePackage, 
  checkSubscriptionStatus,
  PRODUCT_IDS,
  initializeRevenueCat 
} from '../services/revenuecat.service';
import { PAYMENTS_ENABLED } from '../lib/featureFlags';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  email: string;
  requiredTier?: string;
  onSuccess?: () => void;
}

export function PaywallModal({ isOpen, onClose, userId, email, requiredTier, onSuccess }: PaywallModalProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const [founderSlots, setFounderSlots] = useState({ remaining: 444, sold: 0 });
  const [showFounderDetails, setShowFounderDetails] = useState(false);
  const [offerings, setOfferings] = useState<any>(null);
  const [isLoadingOfferings, setIsLoadingOfferings] = useState(false);
  const [platform, setPlatform] = useState<string>('web');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadFounderSlots();
      checkPlatform();
      if (PAYMENTS_ENABLED) {
        loadOfferings();
      }
    }
  }, [isOpen]);

  const checkPlatform = async () => {
    try {
      // Check if Capacitor is available
      const Capacitor = (await import('@capacitor/core')).Capacitor;
      const currentPlatform = Capacitor.getPlatform();
      setPlatform(currentPlatform);
      console.log('Platform detected:', currentPlatform);
    } catch (e) {
      console.log('Capacitor not available, running on web');
      setPlatform('web');
    }
  };

  const loadOfferings = async () => {
    if (!PAYMENTS_ENABLED) return;
    
    setIsLoadingOfferings(true);
    try {
      // Initialize RevenueCat if not already initialized
      await initializeRevenueCat(userId);
      
      const currentOfferings = await getOfferings();
      setOfferings(currentOfferings);
      console.log('Offerings loaded:', currentOfferings);
    } catch (error) {
      console.error('Failed to load offerings:', error);
      setError('Failed to load subscription options. Please try again.');
    } finally {
      setIsLoadingOfferings(false);
    }
  };

  const loadFounderSlots = async () => {
    try {
      const slots = await subscriptionService.getFounderSlots();
      setFounderSlots(slots);
    } catch (error) {
      console.error('Failed to load founder slots:', error);
    }
  };

  const handlePayment = async (productId: string) => {
    // If payments disabled or on web, show coming soon
    if (!PAYMENTS_ENABLED || platform === 'web') {
      alert('Subscriptions are coming soon! For now, enjoy the full experience.');
      return;
    }

    setLoading(productId);
    setError(null);
    
    try {
      if (!offerings || !offerings.availablePackages) {
        throw new Error('Subscription options not available. Please try again later.');
      }

      // Map product IDs to RevenueCat packages
      let packageToPurchase: any = null;
      
      // Find the package that matches our product ID
      for (const pkg of offerings.availablePackages) {
        const pkgProductId = (pkg as any).storeProduct?.identifier || (pkg as any).identifier;
        
        if (productId === 'monthly' && pkgProductId === PRODUCT_IDS.MONTHLY) {
          packageToPurchase = pkg;
          break;
        } else if (productId === 'yearly' && pkgProductId === PRODUCT_IDS.ANNUAL) {
          packageToPurchase = pkg;
          break;
        } else if (productId === 'founder_444' && pkgProductId === PRODUCT_IDS.LIFETIME) {
          packageToPurchase = pkg;
          break;
        }
      }

      if (!packageToPurchase) {
        throw new Error('Subscription option not found. Please try again later.');
      }

      // Purchase through RevenueCat
      const customerInfo = await purchasePackage(packageToPurchase);
      
      console.log('Purchase successful:', customerInfo);
      
      // Check if purchase was successful
      const status = await checkSubscriptionStatus();
      if (status.isPremium) {
        alert('Subscription activated successfully!');
        onSuccess?.();
        onClose();
      } else {
        throw new Error('Purchase completed but subscription not activated. Please contact support.');
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      const errorMessage = error.message || 'Payment failed. Please try again.';
      setError(errorMessage);
      
      // Don't show alert for user cancellation
      if (errorMessage !== 'Purchase was cancelled') {
        alert(errorMessage);
      }
    } finally {
      setLoading(null);
    }
  };

  if (!isOpen) return null;

  // Helper to find package by product ID
  const findPackage = (productId: string) => {
    if (!offerings?.availablePackages) return null;
    const targetId = productId === 'monthly' ? PRODUCT_IDS.MONTHLY : 
                     productId === 'yearly' ? PRODUCT_IDS.ANNUAL : 
                     PRODUCT_IDS.LIFETIME;
    
    return offerings.availablePackages.find((pkg: any) => {
      const pkgProductId = pkg.storeProduct?.identifier || pkg.identifier;
      return pkgProductId === targetId;
    });
  };

  const monthlyPackage = findPackage('monthly');
  const yearlyPackage = findPackage('yearly');
  const founderPackage = findPackage('founder_444');

  // Get display price from package
  const getPrice = (pkg: any) => {
    if (!pkg) return 'Loading...';
    return pkg.storeProduct?.priceString || pkg.localizedPriceString || 'N/A';
  };

  // Show "Coming Soon" message if on web or payments disabled
  const isWebOrDisabled = platform === 'web' || !PAYMENTS_ENABLED;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="bg-white/95 rounded-3xl border border-yellow-400/30 shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-xl">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>

          {/* Header */}
          <div className="text-center pt-12 pb-8 px-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(251,191,36,0.4)]">
              <Sun className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-4xl font-medium text-gray-900 mb-4 tracking-wider">
              THE GATES OF LIGHT
            </h2>
            
            {/* Mythic Copy */}
            <div className="max-w-2xl mx-auto space-y-4">
              <p className="text-xl text-gray-800 font-medium italic">
                "One minute in the light. Enough to feel, not enough to transform."
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-lg text-blue-600 font-bold">
                    {monthlyPackage ? getPrice(monthlyPackage) : 'Loading...'}
                  </p>
                  <p className="text-sm text-gray-600">Sungaze+ Monthly — unlimited ritual path.</p>
                </div>
                <div>
                  <p className="text-lg text-purple-600 font-bold">
                    {yearlyPackage ? getPrice(yearlyPackage) : 'Loading...'}
                  </p>
                  <p className="text-sm text-gray-600">Sungaze+ Yearly — infinite return for one year.</p>
                </div>
                <div>
                  <p className="text-lg text-yellow-600 font-bold">
                    {founderPackage ? getPrice(founderPackage) : 'Loading...'}
                  </p>
                  <p className="text-sm text-gray-600">Founder 444 — 3 years full access. Only 444 ever.</p>
                </div>
              </div>
              <p className="text-lg text-gray-700 italic font-medium">
                {founderSlots.remaining} of 444 Founder passes remain worldwide.
              </p>
            </div>
          </div>

          {/* Payment Options */}
          <div className="px-8 pb-8">
            {isWebOrDisabled ? (
              <div className="text-center py-12">
                <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Subscriptions Coming Soon!</h3>
                <p className="text-gray-600 mb-6">
                  For now, enjoy the full experience at no cost!
                </p>
                <Button
                  onClick={onClose}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white border-0 font-bold px-8"
                >
                  Continue
                </Button>
              </div>
            ) : isLoadingOfferings ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Loading subscription options...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-red-600 mb-4">{error}</p>
                <Button
                  onClick={loadOfferings}
                  className="bg-blue-500 hover:bg-blue-600 text-white border-0 font-bold px-8"
                >
                  Retry
                </Button>
              </div>
            ) : (
            <>
              <div className="grid md:grid-cols-3 gap-6">
                
                {/* Monthly Subscription */}
                <div className="group relative bg-white border border-blue-300 rounded-2xl p-6 hover:border-blue-400 transition-all duration-300 shadow-sm">
                  <div className="text-center">
                    <Star className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Sungaze+ Monthly</h3>
                    <div className="text-3xl font-bold text-blue-600 mb-4">
                      {monthlyPackage ? getPrice(monthlyPackage) : 'N/A'}
                    </div>
                    <p className="text-gray-700 text-sm mb-6 font-medium">
                      Unlimited ritual path — all features unlocked.
                    </p>
                    
                    <ul className="text-left text-sm text-gray-700 space-y-2 mb-6">
                      {TIER_FEATURES.monthly.slice(0, 4).map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Button
                      onClick={() => handlePayment('monthly')}
                      disabled={loading === 'monthly'}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white border-0 font-bold"
                    >
                      {loading === 'monthly' ? 'Processing...' : 'Unlimited Path'}
                    </Button>
                  </div>
                </div>

                {/* Yearly Subscription */}
                <div className="group relative bg-white border border-purple-300 rounded-2xl p-6 hover:border-purple-400 transition-all duration-300 shadow-sm">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      BEST VALUE
                    </div>
                  </div>
                  
                  <div className="text-center pt-2">
                    <Zap className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Sungaze+ Yearly</h3>
                    <div className="text-3xl font-bold text-purple-600 mb-4">
                      {yearlyPackage ? getPrice(yearlyPackage) : 'N/A'}
                    </div>
                    <p className="text-gray-700 text-sm mb-6 font-medium">
                      Infinite return for one year — best value.
                    </p>
                    
                    <ul className="text-left text-sm text-gray-700 space-y-2 mb-6">
                      {TIER_FEATURES.yearly.slice(0, 4).map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Button
                      onClick={() => handlePayment('yearly')}
                      disabled={loading === 'yearly'}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white border-0 font-bold"
                    >
                      {loading === 'yearly' ? 'Processing...' : 'Infinite Return'}
                    </Button>
                  </div>
                </div>

                {/* Founder 444 */}
                <div className="group relative bg-white border-2 border-yellow-400 rounded-2xl p-6 hover:border-yellow-500 transition-all duration-300 shadow-lg">
                  {/* Founder Badge */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <FounderStats className="text-xs" />
                  </div>
                  
                  <div className="text-center pt-4">
                    <Crown className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Founder 444</h3>
                    <div className="text-3xl font-bold text-yellow-600 mb-2">
                      {founderPackage ? getPrice(founderPackage) : 'N/A'}
                    </div>
                    <p className="text-xs text-yellow-700 mb-4 font-bold">3 years • One time</p>
                    <p className="text-gray-700 text-sm mb-6 font-medium">
                      Become one of the First Witnesses. Everything unlocked forever.
                    </p>
                    
                    {!showFounderDetails ? (
                      <button
                        onClick={() => setShowFounderDetails(true)}
                        className="text-yellow-600 text-sm underline mb-4 font-bold"
                      >
                        View founder benefits →
                      </button>
                    ) : (
                      <ul className="text-left text-sm text-gray-700 space-y-2 mb-6">
                        {TIER_FEATURES.founder_444.slice(0, 4).map((feature, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Crown className="w-3 h-3 text-yellow-600" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {founderSlots.remaining > 0 ? (
                      <Button
                        onClick={() => handlePayment('founder_444')}
                        disabled={loading === 'founder_444'}
                        className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-black font-bold border-0"
                      >
                        {loading === 'founder_444' ? 'Processing...' : 'Claim Founder Status'}
                      </Button>
                    ) : (
                      <div className="w-full bg-gray-200 text-gray-600 py-3 rounded-xl text-center font-bold">
                        <Shield className="w-4 h-4 inline mr-2" />
                        Founder 444 Closed
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              {!isWebOrDisabled && (
                <div className="flex justify-center items-center gap-2 mt-8 text-gray-600 text-sm font-medium">
                  <Lock className="w-4 h-4" />
                  <span>Secured by Apple/Google • 256-bit encryption</span>
                </div>
              )}
            </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
