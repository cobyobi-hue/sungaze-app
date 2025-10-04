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
    const response = await fetch('/api/payments/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return { error: result.error || 'Failed to create checkout session' };
    }

    return { 
      sessionId: result.sessionId,
      url: result.url 
    };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return { error: 'Network error occurred' };
  }
};

export const redirectToCheckout = async (sessionId: string): Promise<{ error?: string }> => {
  try {
    const stripe = await stripePromise;
    if (!stripe) {
      return { error: 'Stripe failed to initialize' };
    }

    const result = await stripe.redirectToCheckout({
      sessionId,
    });

    if (result.error) {
      return { error: result.error.message };
    }

    return {};
  } catch (error) {
    console.error('Error redirecting to checkout:', error);
    return { error: 'Failed to redirect to checkout' };
  }
};

export const createCustomerPortalSession = async (customerId: string): Promise<{ url?: string; error?: string }> => {
  try {
    const response = await fetch('/api/payments/create-portal-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ customerId }),
    });

    const result = await response.json();

    if (!response.ok) {
      return { error: result.error || 'Failed to create portal session' };
    }

    return { url: result.url };
  } catch (error) {
    console.error('Error creating portal session:', error);
    return { error: 'Network error occurred' };
  }
};

// Helper to get user's region based on location or preference
export const getUserRegion = (): 'us' | 'africa' => {
  // This could be enhanced with geolocation or user preference
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  // African timezones (simplified list)
  const africanTimezones = [
    'Africa/Lagos', 'Africa/Cairo', 'Africa/Johannesburg', 
    'Africa/Nairobi', 'Africa/Casablanca', 'Africa/Accra'
  ];
  
  return africanTimezones.some(tz => timezone.includes(tz)) ? 'africa' : 'us';
};

export default stripePromise;