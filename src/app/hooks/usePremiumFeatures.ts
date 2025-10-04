"use client";

import { useState, useEffect } from 'react';
import { UserTier, UserProfile } from '../types/subscription';
import { subscriptionService } from '../lib/database/subscription-service';

export interface PremiumFeature {
  id: string;
  name: string;
  description: string;
  requiredTier: UserTier;
  category: 'meditation' | 'sounds' | 'visual' | 'content';
}

export const PREMIUM_FEATURES: PremiumFeature[] = [
  // Visual Features
  {
    id: 'cloud_gazing',
    name: 'Cloud Gazing Mode',
    description: 'Immersive cloud meditation with dynamic sky visuals',
    requiredTier: 'monthly',
    category: 'visual'
  },
  {
    id: 'candle_gazing',
    name: 'Candle Gazing Mode',
    description: 'Focused candle flame meditation for deep concentration',
    requiredTier: 'monthly',
    category: 'visual'
  },
  {
    id: 'barefoot_walk',
    name: 'Barefoot Walk',
    description: 'Grounding meditation with nature connection visuals',
    requiredTier: 'monthly',
    category: 'meditation'
  },
  
  // Premium Soundscapes
  {
    id: 'flute_sounds',
    name: 'Sacred Flute',
    description: 'Ethereal flute melodies for deep meditation',
    requiredTier: 'monthly',
    category: 'sounds'
  },
  {
    id: 'temple_bells',
    name: 'Temple Bells',
    description: 'Resonant temple bells for mindful awareness',
    requiredTier: 'monthly',
    category: 'sounds'
  },
  {
    id: 'sacred_chanting',
    name: 'Sacred Chanting',
    description: 'Ancient chants and mantras for spiritual practice',
    requiredTier: 'monthly',
    category: 'sounds'
  },
  {
    id: 'premium_soundscapes',
    name: 'Premium Soundscapes',
    description: 'Full collection of advanced meditation sounds',
    requiredTier: 'monthly',
    category: 'sounds'
  },
  
  // Content Features
  {
    id: 'weekly_meditation_scroll',
    name: 'Weekly Guided Meditation Scroll',
    description: 'New guided meditation teachings every week',
    requiredTier: 'monthly',
    category: 'content'
  },
  {
    id: 'unlimited_timer',
    name: 'Unlimited Timer Duration',
    description: 'Meditate for as long as you need without limits',
    requiredTier: 'monthly',
    category: 'meditation'
  }
];

export interface PremiumFeatureAccess {
  hasAccess: boolean;
  feature: PremiumFeature;
  userTier: UserTier;
  upgradeRequired: boolean;
}

export interface UsePremiumFeaturesReturn {
  userProfile: UserProfile | null;
  loading: boolean;
  checkFeatureAccess: (featureId: string) => PremiumFeatureAccess;
  hasAnyPremiumAccess: boolean;
  hasMeditation: boolean;
  hasVisual: boolean;
  hasSounds: boolean;
  hasContent: boolean;
  isFreeTier: boolean;
  isPremiumTier: boolean;
  isFounder: boolean;
  refreshProfile: () => Promise<void>;
}

export function usePremiumFeatures(userId?: string): UsePremiumFeaturesReturn {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    if (!userId) {
      setUserProfile(null);
      setLoading(false);
      return;
    }

    try {
      const profile = await subscriptionService.getUserProfile(userId);
      setUserProfile(profile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUserProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [userId]);

  const checkFeatureAccess = (featureId: string): PremiumFeatureAccess => {
    const feature = PREMIUM_FEATURES.find(f => f.id === featureId);
    if (!feature) {
      return {
        hasAccess: false,
        feature: {
          id: featureId,
          name: 'Unknown Feature',
          description: 'Feature not found',
          requiredTier: 'monthly',
          category: 'meditation'
        },
        userTier: userProfile?.tier || 'free',
        upgradeRequired: true
      };
    }

    const userTier = userProfile?.tier || 'free';
    
    // Tier hierarchy for access checking
    const tierLevels = {
      'free': 0,
      'monthly': 1,
      'yearly': 2,
      'founder_444': 3
    };

    const userLevel = tierLevels[userTier];
    const requiredLevel = tierLevels[feature.requiredTier];
    const hasAccess = userLevel >= requiredLevel;

    return {
      hasAccess,
      feature,
      userTier,
      upgradeRequired: !hasAccess
    };
  };

  const userTier = userProfile?.tier || 'free';
  const isFreeTier = userTier === 'free';
  const isPremiumTier = ['monthly', 'yearly', 'founder_444'].includes(userTier);
  const isFounder = userTier === 'founder_444';
  const hasAnyPremiumAccess = !isFreeTier;

  // Category access shortcuts
  const hasMeditation = checkFeatureAccess('barefoot_walk').hasAccess;
  const hasVisual = checkFeatureAccess('cloud_gazing').hasAccess;
  const hasSounds = checkFeatureAccess('premium_soundscapes').hasAccess;
  const hasContent = checkFeatureAccess('weekly_meditation_scroll').hasAccess;

  return {
    userProfile,
    loading,
    checkFeatureAccess,
    hasAnyPremiumAccess,
    hasMeditation,
    hasVisual,
    hasSounds,
    hasContent,
    isFreeTier,
    isPremiumTier,
    isFounder,
    refreshProfile: fetchUserProfile
  };
}

// Helper function to get features by category
export function getFeaturesByCategory(category: PremiumFeature['category']): PremiumFeature[] {
  return PREMIUM_FEATURES.filter(feature => feature.category === category);
}

// Helper function to get all locked features for a user tier
export function getLockedFeatures(userTier: UserTier): PremiumFeature[] {
  const tierLevels = {
    'free': 0,
    'monthly': 1,
    'yearly': 2,
    'founder_444': 3
  };

  const userLevel = tierLevels[userTier];
  
  return PREMIUM_FEATURES.filter(feature => {
    const requiredLevel = tierLevels[feature.requiredTier];
    return userLevel < requiredLevel;
  });
}

// Helper function to get next tier that unlocks features
export function getNextTierForUpgrade(userTier: UserTier): UserTier | null {
  const tiers: UserTier[] = ['free', 'monthly', 'yearly', 'founder_444'];
  const currentIndex = tiers.indexOf(userTier);
  
  if (currentIndex < 0 || currentIndex >= tiers.length - 1) {
    return null;
  }
  
  return tiers[currentIndex + 1];
}