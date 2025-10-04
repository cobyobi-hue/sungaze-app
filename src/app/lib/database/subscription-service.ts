"use client";

import { UserProfile, UserTier, FounderSlots } from '../../types/subscription';
import { createClient } from '../supabase/client';

// Supabase database service with fallback to mock data
class SubscriptionService {
  private supabase = createClient();
  private mockData = new Map<string, UserProfile>();
  private founderSlots: FounderSlots = {
    sold: 0, 
    remaining: 444, 
    lastUpdated: new Date().toISOString()
  };

  constructor() {
    console.log('SubscriptionService: Constructor called');
    console.log('SubscriptionService: Supabase client available:', !!this.supabase);
    
    // Always initialize mock data for fallback
    console.log('SubscriptionService: Initializing mock data for fallback');
    this.initializeMockData();
    
    if (this.supabase) {
      console.log('SubscriptionService: Supabase configured, will use real database with mock fallback');
    } else {
      console.log('SubscriptionService: Using mock data mode only');
    }
  }

  private initializeMockData() {
    console.log('SubscriptionService: Initializing mock data');
    const expiration = new Date();
    expiration.setFullYear(expiration.getFullYear() + 3);
    
    const testUser = {
      id: 'test-user-1',
      email: 'test@sungaze.com',
      tier: 'founder_444' as UserTier,
      founderNumber: 1,
      founderRegion: 'us' as 'us' | 'africa',
      badges: ['First Witness of the Flame', 'Solar Pioneer'],
      seals: ['Dawn Keeper', 'Light Bearer'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      purchaseDate: new Date().toISOString(),
      expirationDate: expiration.toISOString(),
      subscriptionStatus: 'active' as const
    };
    
    // Also create a profile for the developer's real email
    const developerUser = {
      ...testUser,
      id: 'cobyobi@gmail.com',
      email: 'cobyobi@gmail.com'
    };
    
    this.mockData.set('test-user-1', testUser);
    this.mockData.set('cobyobi@gmail.com', developerUser);
    this.founderSlots.sold = 37;
    this.founderSlots.remaining = 407;
    
    console.log('SubscriptionService: Mock data initialized:', testUser);
  }

  async getUserProfile(userId: string): Promise<UserProfile | null> {
    console.log('SubscriptionService: Getting profile for userId:', userId);
    console.log('SubscriptionService: Supabase client available:', !!this.supabase);
    
    // For development/testing, always use mock data to avoid Supabase errors
    if (process.env.NODE_ENV === 'development' || userId === 'test-user-1' || userId === 'cobyobi@gmail.com') {
      console.log('SubscriptionService: Using mock data mode for development');
      const mockProfile = this.mockData.get(userId) || null;
      console.log('SubscriptionService: Mock profile found:', mockProfile);
      return mockProfile;
    }
    
    // Use mock data if Supabase is not configured
    if (!this.supabase) {
      console.log('SubscriptionService: Using mock data mode');
      const mockProfile = this.mockData.get(userId) || null;
      console.log('SubscriptionService: Mock profile found:', mockProfile);
      return mockProfile;
    }

    try {
      console.log('SubscriptionService: Querying Supabase for user profile');
      const { data, error } = await this.supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('SubscriptionService: Error fetching user profile:', {
          message: error.message || 'Unknown error',
          code: error.code || 'unknown',
          details: error.details || 'No details available',
          hint: error.hint || 'No hint available'
        });
        console.log('SubscriptionService: Falling back to mock data');
        return this.mockData.get(userId) || null;
      }

      if (!data) {
        console.log('SubscriptionService: No profile found in Supabase, falling back to mock data');
        return this.mockData.get(userId) || null;
      }

      console.log('SubscriptionService: Supabase profile found:', data);
      return data as UserProfile;
    } catch (error) {
      console.error('SubscriptionService: Error in getUserProfile:', error);
      console.log('SubscriptionService: Falling back to mock data due to error');
      return this.mockData.get(userId) || null;
    }
  }

  async createUserProfile(userData: Partial<UserProfile>): Promise<UserProfile> {
    const profile: UserProfile = {
      id: userData.id || crypto.randomUUID(),
      email: userData.email || '',
      tier: userData.tier || 'free',
      badges: userData.badges || [],
      seals: userData.seals || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...userData
    };

    // Use mock data if Supabase is not configured
    if (!this.supabase) {
      this.mockData.set(profile.id, profile);
      return profile;
    }

    try {
      const { data, error } = await this.supabase
        .from('user_profiles')
        .insert([profile])
        .select()
        .single();

      if (error) {
        console.error('Error creating user profile:', error);
        throw error;
      }

      return data as UserProfile;
    } catch (error) {
      console.error('Error in createUserProfile:', error);
      throw error;
    }
  }

  async updateUserTier(
    userId: string, 
    tier: UserTier, 
    subscriptionData?: {
      stripeCustomerId?: string;
      subscriptionId?: string;
      subscriptionStatus?: 'active' | 'canceled' | 'past_due' | 'incomplete';
      expirationDate?: string;
    }
  ): Promise<UserProfile | null> {
    try {
      const updateData: Partial<UserProfile> = {
        tier,
        updatedAt: new Date().toISOString(),
        ...subscriptionData
      };

      // Add tier-specific badges
      if (tier === 'founder_444') {
        const { data: user } = await this.supabase
          .from('user_profiles')
          .select('badges')
          .eq('id', userId)
          .single();

        if (user) {
          const existingBadges = user.badges || [];
          updateData.badges = [...new Set([...existingBadges, 'First Witness of the Flame'])];
        }
      }

      const { data, error } = await this.supabase
        .from('user_profiles')
        .update(updateData)
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        console.error('Error updating user tier:', error);
        return null;
      }

      return data as UserProfile;
    } catch (error) {
      console.error('Error in updateUserTier:', error);
      return null;
    }
  }

  async purchaseFounderSlot(userId: string): Promise<{ success: boolean; founderNumber?: number; error?: string }> {
    try {
      // Get current founder slots
      const { data: slots, error: slotsError } = await this.supabase
        .from('founder_slots')
        .select('*')
        .single();

      if (slotsError || !slots) {
        return { success: false, error: 'Failed to check founder slots' };
      }

      if (slots.remaining <= 0) {
        return { success: false, error: 'All 444 Founder passes have been claimed worldwide' };
      }

      // Start transaction
      const { data: updatedSlots, error: updateError } = await this.supabase
        .from('founder_slots')
        .update({
          sold: slots.sold + 1,
          remaining: slots.remaining - 1,
          lastUpdated: new Date().toISOString()
        })
        .eq('id', slots.id)
        .select()
        .single();

      if (updateError) {
        return { success: false, error: 'Failed to reserve founder slot' };
      }

      const founderNumber = updatedSlots.sold;

      // Update user profile
      const expirationDate = new Date();
      expirationDate.setFullYear(expirationDate.getFullYear() + 3);

      const { data: user } = await this.supabase
        .from('user_profiles')
        .select('badges')
        .eq('id', userId)
        .single();

      const existingBadges = user?.badges || [];

      const { error: userError } = await this.supabase
        .from('user_profiles')
        .update({
          tier: 'founder_444',
          founderNumber,
          purchaseDate: new Date().toISOString(),
          expirationDate: expirationDate.toISOString(),
          badges: [...new Set([...existingBadges, 'First Witness of the Flame', 'Solar Pioneer'])],
          updatedAt: new Date().toISOString()
        })
        .eq('id', userId);

      if (userError) {
        console.error('Error updating user profile:', userError);
        return { success: false, error: 'Failed to update user profile' };
      }

      return { success: true, founderNumber };
    } catch (error) {
      console.error('Error in purchaseFounderSlot:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

  async getFounderSlots(): Promise<FounderSlots> {
    // Use mock data if Supabase is not configured
    if (!this.supabase) {
      return { ...this.founderSlots };
    }

    try {
      const { data, error } = await this.supabase
        .from('founder_slots')
        .select('*')
        .single();

      if (error || !data) {
        console.error('Error fetching founder slots:', error);
        return {
          sold: 0,
          remaining: 444,
          lastUpdated: new Date().toISOString()
        };
      }

      return data as FounderSlots;
    } catch (error) {
      console.error('Error in getFounderSlots:', error);
      return {
        sold: 0,
        remaining: 444,
        lastUpdated: new Date().toISOString()
      };
    }
  }

  async hasFounderAccess(userId: string): Promise<boolean> {
    // Use mock data if Supabase is not configured
    if (!this.supabase) {
      const user = this.mockData.get(userId);
      if (!user || user.tier !== 'founder_444') return false;
      
      if (user.expirationDate) {
        const expiration = new Date(user.expirationDate);
        return expiration > new Date();
      }
      return true;
    }

    try {
      const { data: user, error } = await this.supabase
        .from('user_profiles')
        .select('tier, expirationDate')
        .eq('id', userId)
        .single();

      if (error || !user || user.tier !== 'founder_444') {
        return false;
      }

      // Check if founder access has expired
      if (user.expirationDate) {
        const expiration = new Date(user.expirationDate);
        return expiration > new Date();
      }

      return true;
    } catch (error) {
      console.error('Error in hasFounderAccess:', error);
      return false;
    }
  }

  async canAccessFeature(userId: string, requiredTier: UserTier): Promise<boolean> {
    // Use mock data if Supabase is not configured
    if (!this.supabase) {
      const user = this.mockData.get(userId);
      if (!user) return false;

      // Founder 444 has access to everything
      if (user.tier === 'founder_444') {
        return await this.hasFounderAccess(userId);
      }

      // Define tier hierarchy
      const tierHierarchy = {
        'free': 0,
        'monthly': 1,
        'yearly': 2,
        'founder_444': 3
      };

      const userTierLevel = tierHierarchy[user.tier as UserTier];
      const requiredTierLevel = tierHierarchy[requiredTier];

      return userTierLevel >= requiredTierLevel;
    }

    try {
      const { data: user, error } = await this.supabase
        .from('user_profiles')
        .select('tier, expirationDate')
        .eq('id', userId)
        .single();

      if (error || !user) {
        return false;
      }

      // Founder 444 has access to everything
      if (user.tier === 'founder_444') {
        return await this.hasFounderAccess(userId);
      }

      // Define tier hierarchy
      const tierHierarchy = {
        'free': 0,
        'monthly': 1,
        'yearly': 2,
        'founder_444': 3
      };

      const userTierLevel = tierHierarchy[user.tier as UserTier];
      const requiredTierLevel = tierHierarchy[requiredTier];

      return userTierLevel >= requiredTierLevel;
    } catch (error) {
      console.error('Error in canAccessFeature:', error);
      return false;
    }
  }

  async getUserStats(userId: string): Promise<{
    tier: UserTier;
    badges: string[];
    seals: string[];
    founderNumber?: number;
    daysRemaining?: number;
  } | null> {
    // Use mock data if Supabase is not configured
    if (!this.supabase) {
      const user = this.mockData.get(userId);
      if (!user) return null;

      let daysRemaining;
      if (user.expirationDate) {
        const expiration = new Date(user.expirationDate);
        const now = new Date();
        const diffTime = expiration.getTime() - now.getTime();
        daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      }

      return {
        tier: user.tier,
        badges: user.badges || [],
        seals: user.seals || [],
        founderNumber: user.founderNumber,
        daysRemaining
      };
    }

    try {
      const { data: user, error } = await this.supabase
        .from('user_profiles')
        .select('tier, badges, seals, founderNumber, expirationDate')
        .eq('id', userId)
        .single();

      if (error || !user) {
        return null;
      }

      let daysRemaining;
      if (user.expirationDate) {
        const expiration = new Date(user.expirationDate);
        const now = new Date();
        const diffTime = expiration.getTime() - now.getTime();
        daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      }

      return {
        tier: user.tier as UserTier,
        badges: user.badges || [],
        seals: user.seals || [],
        founderNumber: user.founderNumber,
        daysRemaining
      };
    } catch (error) {
      console.error('Error in getUserStats:', error);
      return null;
    }
  }

  // Initialize database tables if they don't exist
  async initializeDatabase(): Promise<void> {
    if (!this.supabase) {
      console.log('Supabase not configured, using mock data mode');
      return;
    }

    try {
      // Check if founder_slots table exists and has data
      const { data: slots, error: slotsError } = await this.supabase
        .from('founder_slots')
        .select('*')
        .single();

      if (slotsError || !slots) {
        // Initialize founder slots
        await this.supabase
          .from('founder_slots')
          .insert([{
            sold: 0,
            remaining: 444,
            lastUpdated: new Date().toISOString()
          }]);
      }
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }
}

// Export singleton instance
export const subscriptionService = new SubscriptionService();

// Initialize database on client side (only if Supabase is configured)
if (typeof window !== 'undefined') {
  subscriptionService.initializeDatabase();
}