"use client";

/**
 * Subscription Context
 * Provides subscription status throughout the app
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  checkSubscriptionStatus, 
  initializeRevenueCat,
  setUserId,
  logOut,
  type SubscriptionStatus 
} from '../services/revenuecat.service';
import { createClient } from '../lib/supabase/client';
import { PAYMENTS_ENABLED } from '../lib/featureFlags';

interface SubscriptionContextType {
  isPremium: boolean;
  isLoading: boolean;
  subscriptionStatus: SubscriptionStatus | null;
  refreshSubscription: () => Promise<void>;
  setUser: (userId: string) => Promise<void>;
  clearUser: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

interface SubscriptionProviderProps {
  children: ReactNode;
}

export function SubscriptionProvider({ children }: SubscriptionProviderProps) {
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const supabase = createClient();

  // Initialize RevenueCat and check subscription on mount
  useEffect(() => {
    initializeSubscription();
  }, []);

  const initializeSubscription = async () => {
    try {
      setIsLoading(true);

      // Check if payments are enabled
      if (!PAYMENTS_ENABLED) {
        console.log('SubscriptionContext: Payments disabled, skipping initialization');
        setIsPremium(false);
        setIsLoading(false);
        return;
      }

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setCurrentUserId(user.id);
        // Initialize RevenueCat with user ID
        await initializeRevenueCat(user.id);
        await setUserId(user.id);
      } else {
        // Initialize without user ID (anonymous)
        await initializeRevenueCat();
      }

      // Check subscription status
      await refreshSubscription();
    } catch (error) {
      console.error('SubscriptionContext: Initialization error:', error);
      setIsPremium(false);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshSubscription = async () => {
    try {
      if (!PAYMENTS_ENABLED) {
        setIsPremium(false);
        setSubscriptionStatus({
          isPremium: false,
          isActive: false,
        });
        return;
      }

      const status = await checkSubscriptionStatus();
      setIsPremium(status.isPremium);
      setSubscriptionStatus(status);
      
      console.log('SubscriptionContext: Subscription status updated:', status);
    } catch (error) {
      console.error('SubscriptionContext: Error refreshing subscription:', error);
      setIsPremium(false);
      setSubscriptionStatus({
        isPremium: false,
        isActive: false,
      });
    }
  };

  const setUser = async (userId: string) => {
    try {
      setCurrentUserId(userId);
      await setUserId(userId);
      await refreshSubscription();
    } catch (error) {
      console.error('SubscriptionContext: Error setting user:', error);
    }
  };

  const clearUser = async () => {
    try {
      setCurrentUserId(null);
      await logOut();
      setIsPremium(false);
      setSubscriptionStatus(null);
    } catch (error) {
      console.error('SubscriptionContext: Error clearing user:', error);
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        await setUser(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        await clearUser();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value: SubscriptionContextType = {
    isPremium,
    isLoading,
    subscriptionStatus,
    refreshSubscription,
    setUser,
    clearUser,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

/**
 * Hook to use subscription context
 */
export function useSubscription(): SubscriptionContextType {
  const context = useContext(SubscriptionContext);
  
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  
  return context;
}


