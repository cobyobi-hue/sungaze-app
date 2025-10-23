"use client";

import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with environment variable
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export interface CreateCheckoutSessionData {
  priceId: string;
  tier: string;
  region?: string;
  userId: string;
  email: string;
  successUrl?: string;
  cancelUrl?: string;
}

export interface CheckoutSessionResponse {
  sessionId?: string;
  url?: string;
  error?: string;
}

export const createCheckoutSession = async (data: CreateCheckoutSessionData): Promise<CheckoutSessionResponse> => {
  try {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create checkout session');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

export const redirectToCheckout = async (sessionId: string): Promise<{ error?: string }> => {
  try {
    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error('Stripe failed to load');
    }

    const result = await stripe.redirectToCheckout({
      sessionId: sessionId,
    });

    if (result.error) {
      return { error: result.error.message };
    }

    return {};
  } catch (error) {
    console.error('Error redirecting to checkout:', error);
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

export const getUserRegion = async (): Promise<string> => {
  try {
    // Simple region detection based on timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    if (timezone.includes('America')) {
      return 'us';
    } else if (timezone.includes('Europe')) {
      return 'eu';
    } else if (timezone.includes('Asia')) {
      return 'asia';
    }
    
    return 'us'; // Default to US
  } catch (error) {
    console.error('Error detecting region:', error);
    return 'us';
  }
};
