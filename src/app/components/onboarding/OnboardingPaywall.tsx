"use client";

import React, { useState } from 'react';
import { Check, Star, Crown, Zap, Shield, Users, Clock, ArrowRight } from 'lucide-react';
import { ProgressChart } from './ProgressChart';
import { createCheckoutSession, redirectToCheckout } from '../../lib/payments/stripe';
import { PAYMENT_PRODUCTS } from '../../types/subscription';

interface OnboardingPaywallProps {
  data: any;
  updateData: (section: string, data: any) => void;
  onNext: () => void;
  onPrev: () => void;
  currentStep: number;
  totalSteps: number;
}

const plans = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: '$4.99',
    period: '/month',
    popular: false,
    features: [
      'Daily solar wisdom & guidance',
      'Personalized practice schedules',
      'Safety protocols & monitoring',
      'Progress tracking',
      'Community access'
    ]
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: '$29.99',
    period: '/year',
    popular: true,
    originalPrice: '$59.88',
    savings: 'Save 50%',
    features: [
      'Everything in Monthly',
      'Advanced analytics & insights',
      'Priority customer support',
      'Exclusive content & updates',
      'Early access to new features'
    ]
  },
  {
    id: 'lifetime',
    name: 'Founder 444',
    price: '$99',
    period: 'one-time',
    popular: false,
    limited: true,
    features: [
      'Lifetime access to all features',
      'All future updates included',
      'Priority customer support',
      'Exclusive content & updates',
      'No recurring payments ever',
      'Founder badge & recognition',
      'Early access to new features'
    ]
  }
];

const valueProps = [
  {
    icon: Star,
    title: '100+ Expert Responses',
    description: 'Get answers to every question from ancient masters'
  },
  {
    icon: Zap,
    title: 'Personalized Daily Guidance',
    description: 'AI-powered recommendations based on your profile'
  },
  {
    icon: Shield,
    title: 'Safety Protocols',
    description: 'Proven methods from ancient solar masters'
  },
  {
    icon: Users,
    title: 'Progress Tracking',
    description: 'Monitor your transformation journey'
  }
];

export function OnboardingPaywall({ data, onNext }: OnboardingPaywallProps) {
  const [selectedPlan, setSelectedPlan] = useState('yearly');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Map plan IDs to Stripe tiers
      const planToTierMap: Record<string, string> = {
        'monthly': 'monthly',
        'yearly': 'yearly', 
        'lifetime': 'founder_444'
      };

      const tier = planToTierMap[selectedPlan];
      const product = PAYMENT_PRODUCTS.find(p => p.tier === tier);
      
      if (!product?.stripePriceId) {
        throw new Error('Invalid plan selected');
      }

      // Create checkout session
      const result = await createCheckoutSession({
        priceId: product.stripePriceId,
        tier: tier,
        userId: data.profile?.email || 'temp-user-' + Date.now(),
        email: data.profile?.email || 'temp@sungaze.com',
        successUrl: `${window.location.origin}/?success=true`,
        cancelUrl: `${window.location.origin}/?canceled=true`
      });

      if (result.error) {
        throw new Error(result.error);
      }

      if (result.url) {
        // Redirect to Stripe Checkout
        window.location.href = result.url;
      } else if (result.sessionId) {
        // Fallback to redirectToCheckout if URL not available
        const redirectResult = await redirectToCheckout(result.sessionId);
        
        if (redirectResult.error) {
          throw new Error(redirectResult.error);
        }
      } else {
        throw new Error('No checkout URL or session ID received');
      }
      
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'Payment failed. Please try again.');
      setIsLoading(false);
    }
  };

  const selectedPlanData = plans.find(plan => plan.id === selectedPlan);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-display-2xl text-white font-bold mb-2">Your Custom Solar Transformation Plan Is Ready</h1>
        <p className="text-body-md text-white/70">Based on your profile, here's what we've created for you:</p>
        
        {/* Founder Badge */}
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 border border-yellow-400/30 rounded-full">
          <Crown className="w-4 h-4 text-yellow-400" />
          <span className="text-body-sm text-yellow-400 font-semibold">Join the First 444 Solar Founders</span>
        </div>
      </div>

      {/* Preview Content */}
      <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6 shadow-lg mb-8">
        <h2 className="text-title-md text-white font-semibold mb-4">Your Personalized Insights:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-body-sm text-white/80">• Sungazing progression: 10 seconds daily, increasing by 10 seconds each day</p>
            <p className="text-body-sm text-white/80">• General practice time: 10-20 minutes (candle gazing, cloud gazing, sungazing)</p>
            <p className="text-body-sm text-white/80">• Optimal timing based on your location</p>
          </div>
          <div className="space-y-2">
            <p className="text-body-sm text-white/80">• Safety protocols tailored to your experience level</p>
            <p className="text-body-sm text-white/80">• Expected transformation timeline: 90-273 days</p>
            <p className="text-body-sm text-white/80">• Energy optimization focus areas</p>
          </div>
        </div>
      </div>

      {/* Value Props */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {valueProps.map((prop, index) => (
          <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center flex-shrink-0">
              <prop.icon className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-body-md text-white font-semibold mb-1">{prop.title}</h3>
              <p className="text-body-sm text-white/70">{prop.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Chart */}
      <div className="mb-8">
        <ProgressChart currentDay={1} totalDays={273} />
      </div>

      {/* Pricing Plans */}
      <div className="mb-8">
        <h2 className="text-title-lg text-white font-semibold text-center mb-6">Choose Your Transformation Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                selectedPlan === plan.id
                  ? 'border-blue-400/50 bg-gradient-to-br from-blue-500/20 to-indigo-500/20'
                  : 'border-blue-400/20 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 hover:border-blue-400/30'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full text-xs font-semibold text-black">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Limited Badge */}
              {plan.limited && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full text-xs font-semibold text-black">
                    Founder 444
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-4">
                <h3 className="text-title-md text-white font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-display-2xl text-white font-bold">{plan.price}</span>
                  <span className="text-body-sm text-white/60">{plan.period}</span>
                </div>
                {plan.originalPrice && (
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="text-body-sm text-white/50 line-through">{plan.originalPrice}</span>
                    <span className="text-body-sm text-green-400 font-semibold">{plan.savings}</span>
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-body-sm text-white/80">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Select Button */}
              <button
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedPlan === plan.id
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                    : 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-white/80 hover:from-blue-500/30 hover:to-indigo-500/30'
                }`}
              >
                {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
          <p className="text-red-400 text-center">{error}</p>
        </div>
      )}

      {/* Subscribe Button */}
      <div className="text-center">
        <button
          onClick={handleSubscribe}
          disabled={isLoading}
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>Start My Transformation</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
        
        <p className="text-caption text-white/60 mt-4">
          Secure payment • Cancel anytime • 30-day money-back guarantee
        </p>
        
        {/* Founder Countdown */}
        <div className="mt-6 p-4 bg-gradient-to-r from-yellow-400/10 to-amber-500/10 border border-yellow-400/20 rounded-xl">
          <div className="text-center">
            <p className="text-body-sm text-yellow-400 font-semibold mb-2">Limited Time: Founder 444 Status</p>
            <p className="text-caption text-white/70">
              Only the first 444 users will receive founder recognition, exclusive badges, and lifetime access at this special price.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
