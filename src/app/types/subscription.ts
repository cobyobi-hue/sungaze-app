export type UserTier = 'free' | 'monthly' | 'yearly' | 'founder_444';

export interface UserProfile {
  id: string;
  email: string;
  tier: UserTier;
  stripeCustomerId?: string;
  subscriptionId?: string;
  subscriptionStatus?: 'active' | 'canceled' | 'past_due' | 'incomplete';
  founderNumber?: number; // 1-444 worldwide
  purchaseDate?: string;
  expirationDate?: string; // For founders, 3 years from purchase
  badges: string[];
  seals: string[];
  createdAt: string;
  updatedAt: string;
}

export interface FounderSlots {
  sold: number;
  remaining: number;
  lastUpdated: string;
}

export interface PaymentProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  type: 'one_time' | 'subscription';
  interval?: 'month' | 'year';
  tier: UserTier;
  stripePriceId?: string;
}

export const PAYMENT_PRODUCTS: PaymentProduct[] = [
  {
    id: 'monthly',
    name: 'Sungaze+ Monthly',
    description: 'Unlimited ritual path - all features unlocked',
    price: 4.99,
    currency: 'USD',
    type: 'subscription',
    interval: 'month',
    tier: 'monthly',
    stripePriceId: process.env.STRIPE_MONTHLY_PRICE_ID || 'price_1SB3p8GIDaitR9oVu9Br2RJB',
  },
  {
    id: 'yearly',
    name: 'Sungaze+ Yearly',
    description: 'Infinite return for one year - best value',
    price: 29.99,
    currency: 'USD',
    type: 'subscription',
    interval: 'year',
    tier: 'yearly',
    stripePriceId: process.env.STRIPE_PREMIUM_PRICE_ID || 'price_1S4RCeGIDaitR9oVNXvlNVRF',
  },
  {
    id: 'founder_444',
    name: 'Founder 444',
    description: '3 years full access. Only 444 ever.',
    price: 99,
    currency: 'USD',
    type: 'one_time',
    tier: 'founder_444',
    stripePriceId: process.env.STRIPE_FOUNDER_PRICE_ID || 'price_1S4REHGIDaitR9oVV134V0tQ',
  },
];

export const FOUNDER_BADGES = [
  'First Witness of the Flame',
  'Solar Pioneer',
  'Guardian of Ancient Light'
];

export const TIER_FEATURES = {
  free: [
    '1-minute timer only',
    'Basic streaks',
    '1 koan per week',
    'Mini journal (3 entries max)'
  ],
  monthly: [
    'Unlimited timer duration',
    'All ritual timers',
    'Unlimited koans & wisdom',
    'Full journal access',
    'Sacred seals & badges',
    'Audio transmissions',
    'Advanced progress tracking'
  ],
  yearly: [
    'Everything in Monthly',
    'Best value (save $31.20)',
    'Yearly streak rewards',
    'Priority support',
    'Early feature access'
  ],
  founder_444: [
    'Everything unlocked',
    '3 years full access',
    'Permanent Founder badge',
    'Exclusive founder events',
    'Direct founder access',
    'Early/beta features',
    'Founder seal collection'
  ]
};

export const FREE_TIER_LIMITS = {
  timerMaxDuration: 60, // 1 minute in seconds
  journalMaxEntries: 3,
  koansPerWeek: 1,
  streaksEnabled: true
};