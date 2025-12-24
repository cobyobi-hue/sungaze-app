/**
 * RevenueCat Service
 * Handles in-app subscription purchases for iOS and Android
 */

import { PAYMENTS_ENABLED } from '../lib/featureFlags';

// Conditional imports - only load RevenueCat if payments are enabled
let Purchases: any;
let PurchasesOffering: any;
let PurchasesPackage: any;
let CustomerInfo: any;
let Capacitor: any;

if (PAYMENTS_ENABLED) {
  try {
    const revenuecat = require('@revenuecat/purchases-capacitor');
    const capacitor = require('@capacitor/core');
    Purchases = revenuecat.Purchases;
    PurchasesOffering = revenuecat.PurchasesOffering;
    PurchasesPackage = revenuecat.PurchasesPackage;
    CustomerInfo = revenuecat.CustomerInfo;
    Capacitor = capacitor.Capacitor;
  } catch (e) {
    console.warn('RevenueCat not available:', e);
  }
}

// RevenueCat API Key - Set this in your environment or config
const REVENUECAT_API_KEY = process.env.NEXT_PUBLIC_REVENUECAT_API_KEY || '';

// Product IDs
export const PRODUCT_IDS = {
  MONTHLY: 'monthly_premium',
  ANNUAL: 'annual_premium',
  LIFETIME: 'lifetime_premium',
} as const;

export type ProductId = typeof PRODUCT_IDS[keyof typeof PRODUCT_IDS];

export interface SubscriptionStatus {
  isPremium: boolean;
  isActive: boolean;
  productId?: string;
  expirationDate?: Date;
  willRenew?: boolean;
}

let isInitialized = false;

/**
 * Initialize RevenueCat SDK
 * Call this when the app starts
 */
export async function initializeRevenueCat(userId?: string): Promise<void> {
  if (!PAYMENTS_ENABLED) {
    console.log('RevenueCat: Payments disabled, skipping initialization');
    return;
  }

  if (isInitialized) {
    console.log('RevenueCat: Already initialized');
    return;
  }

  try {
    // Check if we're on a native platform
    const platform = Capacitor.getPlatform();
    if (platform === 'web') {
      console.log('RevenueCat: Running on web, RevenueCat requires native platform');
      return;
    }

    if (!REVENUECAT_API_KEY) {
      console.warn('RevenueCat: API key not set. Set NEXT_PUBLIC_REVENUECAT_API_KEY in environment variables');
      return;
    }

    console.log('RevenueCat: Initializing with API key...');
    
    // Configure RevenueCat
    await Purchases.configure({
      apiKey: REVENUECAT_API_KEY,
      appUserID: userId || undefined, // Optional: set user ID if available
    });

    // Set user ID if provided
    if (userId) {
      await Purchases.logIn({ appUserID: userId });
      console.log('RevenueCat: Logged in user:', userId);
    }

    isInitialized = true;
    console.log('RevenueCat: Initialization successful');
  } catch (error) {
    console.error('RevenueCat: Initialization error:', error);
    throw error;
  }
}

/**
 * Get available subscription offerings from RevenueCat
 */
export async function getOfferings(): Promise<any | null> {
  if (!PAYMENTS_ENABLED || !isInitialized) {
    console.log('RevenueCat: Not initialized or payments disabled');
    return null;
  }

  try {
    const offerings = await Purchases.getOfferings();
    
    if (offerings.current === null) {
      console.warn('RevenueCat: No current offering available');
      return null;
    }

    console.log('RevenueCat: Offerings fetched successfully');
    return offerings.current;
  } catch (error) {
    console.error('RevenueCat: Error fetching offerings:', error);
    throw error;
  }
}

/**
 * Purchase a subscription package
 */
export async function purchasePackage(packageToPurchase: any): Promise<any> {
  if (!PAYMENTS_ENABLED || !isInitialized) {
    throw new Error('RevenueCat not initialized or payments disabled');
  }

  try {
    console.log('RevenueCat: Starting purchase for package:', (packageToPurchase as any).identifier);
    
    const result = await Purchases.purchasePackage({ aPackage: packageToPurchase });
    const customerInfo = result.customerInfo;
    
    console.log('RevenueCat: Purchase successful');
    console.log('RevenueCat: Customer info:', {
      entitlements: customerInfo?.entitlements,
    });

    return customerInfo;
  } catch (error: any) {
    console.error('RevenueCat: Purchase error:', error);
    
    // Handle user cancellation
    if (error.code === 'PURCHASE_CANCELLED') {
      throw new Error('Purchase was cancelled');
    }
    
    throw error;
  }
}

/**
 * Restore previous purchases
 */
export async function restorePurchases(): Promise<any> {
  if (!PAYMENTS_ENABLED || !isInitialized) {
    throw new Error('RevenueCat not initialized or payments disabled');
  }

  try {
    console.log('RevenueCat: Restoring purchases...');
    const result = await Purchases.restorePurchases();
    
    console.log('RevenueCat: Purchases restored');
    const customerInfo = result.customerInfo;
    console.log('RevenueCat: Active subscriptions:', customerInfo?.entitlements?.active || {});
    
    return customerInfo;
  } catch (error) {
    console.error('RevenueCat: Restore error:', error);
    throw error;
  }
}

/**
 * Check if user has an active subscription
 */
export async function checkSubscriptionStatus(): Promise<SubscriptionStatus> {
  if (!PAYMENTS_ENABLED || !isInitialized) {
    console.log('RevenueCat: Not initialized, returning default status');
    return {
      isPremium: false,
      isActive: false,
    };
  }

  try {
    const result = await Purchases.getCustomerInfo();
    const customerInfo = result.customerInfo;
    
    // Check if user has active entitlement
    const hasActiveEntitlement = customerInfo?.entitlements?.active?.['premium'] !== undefined;
    
    if (hasActiveEntitlement && customerInfo?.entitlements?.active) {
      const entitlement = customerInfo.entitlements.active['premium'];
      const productId = (entitlement as any)?.productIdentifier;
      const expirationDate = (entitlement as any)?.expirationDate ? new Date((entitlement as any).expirationDate) : undefined;
      const willRenew = (entitlement as any)?.willRenew || false;

      console.log('RevenueCat: User has active subscription:', {
        productId,
        expirationDate,
        willRenew,
      });

      return {
        isPremium: true,
        isActive: true,
        productId,
        expirationDate,
        willRenew,
      };
    }

    console.log('RevenueCat: No active subscription found');
    return {
      isPremium: false,
      isActive: false,
    };
  } catch (error) {
    console.error('RevenueCat: Error checking subscription status:', error);
    return {
      isPremium: false,
      isActive: false,
    };
  }
}

/**
 * Get full customer information
 */
export async function getCustomerInfo(): Promise<any> {
  if (!PAYMENTS_ENABLED || !isInitialized) {
    throw new Error('RevenueCat not initialized or payments disabled');
  }

  try {
    const result = await Purchases.getCustomerInfo();
    return result.customerInfo;
  } catch (error) {
    console.error('RevenueCat: Error getting customer info:', error);
    throw error;
  }
}

/**
 * Open platform subscription management
 * iOS: Opens App Store subscriptions
 * Android: Opens Google Play subscriptions
 */
export async function openSubscriptionManagement(): Promise<void> {
  if (!PAYMENTS_ENABLED || !isInitialized) {
    throw new Error('RevenueCat not initialized or payments disabled');
  }

  try {
    const platform = Capacitor.getPlatform();
    
    if (platform === 'ios') {
      // iOS: Open App Store subscription management
      const url = 'https://apps.apple.com/account/subscriptions';
      window.open(url, '_blank');
      console.log('RevenueCat: Opening iOS subscription management');
    } else if (platform === 'android') {
      // Android: Open Google Play subscription management
      const url = 'https://play.google.com/store/account/subscriptions';
      window.open(url, '_blank');
      console.log('RevenueCat: Opening Android subscription management');
    } else {
      console.warn('RevenueCat: Platform not supported for subscription management');
    }
  } catch (error) {
    console.error('RevenueCat: Error opening subscription management:', error);
    throw error;
  }
}

/**
 * Set user ID for RevenueCat
 * Call this after user logs in
 */
export async function setUserId(userId: string): Promise<void> {
  if (!PAYMENTS_ENABLED || !isInitialized) {
    console.log('RevenueCat: Not initialized, skipping setUserId');
    return;
  }

  try {
    await Purchases.logIn({ appUserID: userId });
    console.log('RevenueCat: User ID set:', userId);
  } catch (error) {
    console.error('RevenueCat: Error setting user ID:', error);
    throw error;
  }
}

/**
 * Log out user from RevenueCat
 * Call this when user logs out
 */
export async function logOut(): Promise<void> {
  if (!PAYMENTS_ENABLED || !isInitialized) {
    return;
  }

  try {
    await Purchases.logOut();
    console.log('RevenueCat: User logged out');
  } catch (error) {
    console.error('RevenueCat: Error logging out:', error);
    throw error;
  }
}


