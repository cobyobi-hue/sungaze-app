"use client";

import { useState, useEffect } from 'react';
import { UserProfile, UserTier } from '../types/subscription';
import { subscriptionService } from '../lib/database/subscription-service';

interface UseSubscriptionReturn {
  profile: UserProfile | null;
  loading: boolean;
  hasAccess: (requiredTier: UserTier) => boolean;
  isFounder: boolean;
  isPremium: boolean;
  refreshProfile: () => Promise<void>;
}

export function useSubscription(userId: string): UseSubscriptionReturn {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    try {
      setLoading(true);
      console.log('Loading profile for userId:', userId);
      const userProfile = await subscriptionService.getUserProfile(userId);
      console.log('Loaded userProfile:', userProfile);
      setProfile(userProfile);
    } catch (error) {
      console.error('Failed to load user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      loadProfile();
    }
  }, [userId]);

  const hasAccess = (requiredTier: UserTier): boolean => {
    if (!profile) return false;
    
    // Check if subscription is active for subscription-based tiers
    if (profile.tier === 'monthly' || profile.tier === 'yearly') {
      if (profile.subscriptionStatus !== 'active') return false;
    }
    
    // Check if founder access hasn't expired
    if (profile.tier === 'founder_444') {
      if (profile.expirationDate) {
        const expiration = new Date(profile.expirationDate);
        if (expiration <= new Date()) return false;
      }
    }

    // Define tier hierarchy
    const tierHierarchy = {
      'free': 0,
      'monthly': 1,
      'yearly': 2,
      'founder_444': 3
    };

    const userTierLevel = tierHierarchy[profile.tier];
    const requiredTierLevel = tierHierarchy[requiredTier];

    return userTierLevel >= requiredTierLevel;
  };

  const isFounder = profile?.tier === 'founder_444' && hasAccess('founder_444');
  const isPremium = hasAccess('monthly');

  const refreshProfile = async () => {
    await loadProfile();
  };

  return {
    profile,
    loading,
    hasAccess,
    isFounder,
    isPremium,
    refreshProfile
  };
}