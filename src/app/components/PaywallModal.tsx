"use client";

import React, { useState, useEffect } from 'react';
import { X, Crown, Flame, Sun, Shield, Zap, Lock, Star } from 'lucide-react';
import { Button } from './ui/button';
import { PAYMENT_PRODUCTS, TIER_FEATURES } from '../types/subscription';
import { createCheckoutSession, redirectToCheckout, getUserRegion } from '../lib/payments/stripe';
import { initializeFlutterwavePayment, convertCurrency } from '../lib/payments/flutterwave';
import { FounderStats } from './FounderStats';
import { subscriptionService } from '../lib/database/subscription-service';

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

  useEffect(() => {
    if (isOpen) {
      loadFounderSlots();
    }
  }, [isOpen]);

  const loadFounderSlots = async () => {
    try {
      const slots = await subscriptionService.getFounderSlots();
      setFounderSlots(slots);
    } catch (error) {
      console.error('Failed to load founder slots:', error);
    }
  };

  const handlePayment = async (productId: string) => {
    setLoading(productId);
    
    try {
      const product = PAYMENT_PRODUCTS.find(p => p.id === productId);
      if (!product) {
        throw new Error('Product not found');
      }

      // Create checkout session with our API
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: product.stripePriceId,
          userId,
          tier: product.tier,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Payment setup failed');
      }

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert(`Payment failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(null);
    }
  };

  if (!isOpen) return null;

  const monthlyProduct = PAYMENT_PRODUCTS.find(p => p.id === 'monthly')!;
  const yearlyProduct = PAYMENT_PRODUCTS.find(p => p.id === 'yearly')!;
  const founderProduct = PAYMENT_PRODUCTS.find(p => p.id === 'founder_444')!;

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
                  <p className="text-lg text-blue-600 font-bold">$9.99</p>
                  <p className="text-sm text-gray-600">Sungaze+ Monthly — unlimited ritual path.</p>
                </div>
                <div>
                  <p className="text-lg text-purple-600 font-bold">$88.88</p>
                  <p className="text-sm text-gray-600">Sungaze+ Yearly — infinite return for one year.</p>
                </div>
                <div>
                  <p className="text-lg text-yellow-600 font-bold">$100</p>
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
            <div className="grid md:grid-cols-3 gap-6">
              
              {/* Monthly Subscription */}
              <div className="group relative bg-white border border-blue-300 rounded-2xl p-6 hover:border-blue-400 transition-all duration-300 shadow-sm">
                <div className="text-center">
                  <Star className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Sungaze+ Monthly</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-4">
                    ${monthlyProduct.price}
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
                    ${yearlyProduct.price}
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
                    $100
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
            <div className="flex justify-center items-center gap-2 mt-8 text-gray-600 text-sm font-medium">
              <Lock className="w-4 h-4" />
              <span>Secured by Stripe & Flutterwave • 256-bit encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
