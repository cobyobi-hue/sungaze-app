"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Crown, Flame, Sun, Shield, Star, Award, Calendar, User, Settings, ChevronRight, Bell, CreditCard, LogOut, HelpCircle, Shield as ShieldIcon, Plus, Pencil, Camera, Image as ImageIcon } from 'lucide-react';
import { Button } from './ui/button';
import { UserProfile, TIER_FEATURES, FOUNDER_BADGES } from '../types/subscription';
import { subscriptionService } from '../lib/database/subscription-service';
import { createClient } from '../lib/supabase/client';
import { AuthScreen } from './AuthScreen';
import { getCurrentSolarLevel, getLevelProgress, SOLAR_LEVELS } from '../lib/solarLevels';
import { hasAchievement, getAuraGlow } from '../lib/questSystem';
import { AccountInfoScreen } from './settings/AccountInfoScreen';
import { MembershipScreen } from './settings/MembershipScreen';
import { NotificationsScreen } from './settings/NotificationsScreen';
import { PermissionsScreen } from './settings/PermissionsScreen';
import { LegalScreen } from './settings/LegalScreen';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { Capacitor } from '@capacitor/core';
import { useDialog } from '../contexts/DialogContext';
import { ScreenShell } from './ui/ScreenShell';

interface ProfileScreenProps {
  userId?: string;
}

export function ProfileScreen({ userId }: ProfileScreenProps) {
  console.log('ProfileScreen: Component rendered with userId:', userId);
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentScreen, setCurrentScreen] = useState<'main' | 'account' | 'membership' | 'notifications' | 'permissions' | 'legal'>('main');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const healthCheckRanRef = useRef(false);
  const supabase = createClient();
  const { isOnline } = useNetworkStatus();
  const dialog = useDialog();

  const getErrorMessage = (err: any): string => {
    if (!err) return 'Failed to upload image. Please try again.';
    if (typeof err === 'string') return err;
    // Supabase errors are often plain objects with a `message` field (not instanceof Error)
    if (typeof err?.message === 'string' && err.message.trim().length > 0) return err.message;
    if (typeof err?.error_description === 'string' && err.error_description.trim().length > 0) return err.error_description;
    if (typeof err?.details === 'string' && err.details.trim().length > 0) return err.details;
    try {
      return JSON.stringify(err);
    } catch {
      return 'Failed to upload image. Please try again.';
    }
  };

  const formatSupabaseError = (err: any) => {
    if (!err) return null;
    return {
      message: err?.message,
      code: err?.code,
      details: err?.details,
      hint: err?.hint,
      status: err?.status,
    };
  };

  useEffect(() => {
    console.log('ProfileScreen: useEffect triggered, calling getCurrentUser');
    getCurrentUser();
  }, []);

  useEffect(() => {
    console.log('ProfileScreen: currentUser changed:', currentUser ? `User ID: ${currentUser.id}` : 'null');
    if (currentUser) {
      console.log('ProfileScreen: currentUser exists, calling loadProfile');
      loadProfile();
    } else if (currentUser === null && !loading) {
      // Only set loading to false if we've explicitly determined there's no user
      console.log('ProfileScreen: No user found, but this should be handled in getCurrentUser');
    }
  }, [currentUser]);

  // Dev-only sanity checks to catch missing Supabase policies/buckets early (no impact to prod users).
  useEffect(() => {
    const runHealthCheck = async () => {
      if (!supabase || !currentUser || healthCheckRanRef.current) return;

      const email = String(currentUser?.email ?? '').toLowerCase();
      const isDevEmail = email === 'cobyobi@gmail.com';
      const isLocalhost =
        typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
      const shouldRun = process.env.NODE_ENV !== 'production' || isLocalhost || isDevEmail;
      if (!shouldRun) return;

      healthCheckRanRef.current = true;

      // 1) Verify Storage bucket exists / SELECT policy works
      try {
        const { error: listErr } = await supabase.storage
          .from('profile-images')
          .list(currentUser.id, { limit: 1 });

        if (listErr) {
          console.warn('ProfileScreen: HealthCheck storage list failed:', formatSupabaseError(listErr));
          dialog.alert({
            message:
              'Supabase Storage check failed for `profile-images`. Run `supabase-profile-image-migration.sql` in Supabase SQL Editor to create the bucket + policies.',
          });
        }
      } catch (e) {
        console.warn('ProfileScreen: HealthCheck storage exception:', e);
      }

      // 2) Verify user_profiles INSERT policy works (ignoreDuplicates avoids modifying existing rows)
      try {
        if (!currentUser.email) return;

        const { error: insertErr } = await supabase
          .from('user_profiles')
          .upsert(
            [
              {
                id: currentUser.id,
                email: currentUser.email,
                tier: 'free',
                badges: ['New Seeker'],
                seals: [],
                subscription_status: 'active',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              },
            ],
            { onConflict: 'id', ignoreDuplicates: true }
          );

        if (insertErr) {
          const msg = getErrorMessage(insertErr).toLowerCase();
          console.warn('ProfileScreen: HealthCheck profile upsert failed:', formatSupabaseError(insertErr));

          if (msg.includes('row-level security') || msg.includes('rls') || msg.includes('permission')) {
            dialog.alert({
              message:
                'Supabase RLS is blocking profile creation. Run `supabase-migrations/add-user-profiles-insert-policy.sql` in Supabase SQL Editor.',
            });
          } else if (msg.includes('duplicate key') && msg.includes('user_profiles_email_key')) {
            dialog.alert({
              message:
                'Supabase profile conflict: a `user_profiles` row already exists for this email (unique constraint `user_profiles_email_key`). Delete or relink the orphaned row in Supabase SQL Editor.',
            });
          }
        }
      } catch (e) {
        console.warn('ProfileScreen: HealthCheck profile exception:', e);
      }
    };

    runHealthCheck();
  }, [supabase, currentUser, dialog]);

  // Load profile image when profile is loaded
  useEffect(() => {
    if (profile?.profileImageUrl) {
      setProfileImage(profile.profileImageUrl);
    } else {
      setProfileImage(null);
    }
  }, [profile?.profileImageUrl]);

  // Define handleSignOut BEFORE the early return so it's accessible
  const handleSignOut = async () => {
    try {
      console.log('Starting sign out...');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Supabase signOut error:', error);
      }
      // Clear only auth-related local storage (do not wipe user data/progress)
      localStorage.removeItem('dev_bypass');
      localStorage.removeItem('dev_email');
      // Redirect to home page
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
      dialog.alert({ message: 'Failed to sign out. Please try again.' });
    }
  };

  const getCurrentUser = async () => {
    try {
      console.log('ProfileScreen: getCurrentUser called, fetching user from Supabase auth');
      setLoading(true);
      setError(null); // Clear any previous errors
      
      // Use getSession() so refresh restores auth from storage without requiring a network call.
      const { data, error: authError } = await supabase.auth.getSession();
      const user = data?.session?.user ?? null;
      
      console.log('ProfileScreen: Auth response received', {
        hasUser: !!user,
        userId: user?.id,
        error: authError ? {
          message: authError.message,
          status: authError.status
        } : null
      });
      
      if (authError) {
        console.log('ProfileScreen: Auth error (this is normal if not signed in):', authError.message);
        
        // Handle refresh token errors - clear session silently
        const isRefreshTokenError = authError.message?.includes('Refresh Token') || 
                                   authError.message?.includes('refresh_token') ||
                                   authError.status === 401;
        
        // Handle "Auth session missing" or similar errors - just return null silently
        const isSessionMissing = authError.message?.includes('session') || 
                                authError.message?.includes('Session') ||
                                authError.message?.includes('Auth session missing');
        
        if (isRefreshTokenError || isSessionMissing) {
          console.log('ProfileScreen: No valid session, clearing and returning null');
          try {
            await supabase.auth.signOut();
          } catch (signOutError) {
            // Ignore sign out errors
          }
          // Return null silently - main app will handle showing auth screen
          setCurrentUser(null);
          setLoading(false);
          setError(null); // Don't show error for missing session
          return;
        }
        
        // For other errors, still don't show them - just return null
        setCurrentUser(null);
        setLoading(false);
        setError(null); // Don't display auth errors
        return;
      }
      
      if (!user) {
        console.log('ProfileScreen: No authenticated user found - returning null silently');
        setCurrentUser(null);
        setLoading(false);
        setError(null); // Don't show error - just return null
        return;
      }
      
      console.log('ProfileScreen: User found, setting currentUser:', user.id);
      setCurrentUser(user);
      // Don't set loading to false here - let loadProfile handle it
    } catch (error: any) {
      console.error('ProfileScreen: Unexpected error in getCurrentUser:', error);
      
      // Check if it's a refresh token error
      const isRefreshTokenError = error?.message?.includes('Refresh Token') || 
                                 error?.message?.includes('refresh_token') ||
                                 error?.status === 401;
      
      if (isRefreshTokenError) {
        console.log('ProfileScreen: Invalid refresh token in catch, clearing session...');
        try {
          await supabase.auth.signOut();
        } catch (signOutError) {
          console.error('Error signing out:', signOutError);
        }
        // Return null - main app will handle showing auth screen
        setCurrentUser(null);
        setLoading(false);
        return;
      }
      
      // Don't set error for auth failures - just return null silently
      console.log('ProfileScreen: Error getting user (silent return):', error instanceof Error ? error.message : 'Unknown error');
      setCurrentUser(null);
      setLoading(false);
      setError(null); // Don't display errors - main app handles auth
    }
  };

  const loadProfile = async () => {
    if (!currentUser) {
      console.log('ProfileScreen: loadProfile called but no currentUser, returning early');
      setLoading(false);
      return;
    }
    
    try {
      console.log('ProfileScreen: loadProfile called, setting loading to true');
      setLoading(true);
      setError(null);
      console.log('ProfileScreen: Loading profile for user:', currentUser.id);
      console.log('ProfileScreen: Current user object:', {
        id: currentUser.id,
        email: currentUser.email
      });
      
      // Try to get profile from Supabase first
      console.log('ProfileScreen: Querying Supabase user_profiles table');
      const { data, error: supabaseError } = await supabase
        .from('user_profiles')
        .select('*, profile_image_url')
        .eq('id', currentUser.id)
        .single();

      console.log('ProfileScreen: Supabase query result:', {
        hasData: !!data,
        error: supabaseError ? {
          message: supabaseError.message,
          code: supabaseError.code,
          details: supabaseError.details,
          hint: supabaseError.hint
        } : null
      });

      if (supabaseError && supabaseError.code !== 'PGRST116') {
        console.error('ProfileScreen: Supabase error (non-404):', supabaseError);
        console.log('ProfileScreen: Falling back to subscription service for user:', currentUser.id);
        
        try {
          const userProfile = await subscriptionService.getUserProfile(currentUser.id);
          console.log('ProfileScreen: Subscription service returned:', userProfile);
          if (userProfile) {
            setProfile(userProfile);
          } else {
            throw new Error('Subscription service returned null profile');
          }
        } catch (serviceError) {
          console.error('ProfileScreen: Subscription service error:', serviceError);
          setError(`Failed to load profile: ${serviceError instanceof Error ? serviceError.message : 'Unknown error'}`);
          // Create a minimal profile to prevent infinite loading
          const fallbackProfile = {
            id: currentUser.id,
            email: currentUser.email || '',
            tier: 'free' as const,
            badges: ['New Seeker'],
            seals: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            subscriptionStatus: 'active' as const
          };
          setProfile(fallbackProfile);
        }
      } else if (data) {
        console.log('ProfileScreen: Loaded userProfile from Supabase:', data);
        // Transform database format to component format
        const transformedProfile = {
          ...data,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
          subscriptionStatus: data.subscription_status,
          profileImageUrl: data.profile_image_url
        };
        setProfile(transformedProfile);
      } else {
        // No profile found (PGRST116 error or no data), create one
        console.log('ProfileScreen: No profile found, creating new profile');
        const newProfile = {
          id: currentUser.id,
          email: currentUser.email,
          tier: 'free' as const,
          badges: ['New Seeker'],
          seals: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          subscriptionStatus: 'active' as const
        };
        
        try {
          const { data: createdProfile, error: createError } = await supabase
            .from('user_profiles')
            .insert([{
              id: currentUser.id,
              email: currentUser.email,
              tier: 'free',
              badges: ['New Seeker'],
              seals: [],
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              subscription_status: 'active'
            }])
            .select()
            .single();

          if (createError) {
            // This commonly happens if user_profiles INSERT policy (RLS) wasn't applied.
            // Use warn (not error) to avoid Next dev overlay "Console Error" for an expected misconfig.
            console.warn('ProfileScreen: Error creating profile:', formatSupabaseError(createError));
            console.log('ProfileScreen: Using fallback profile (not saved to DB)');
            setProfile(newProfile);
            const msg = getErrorMessage(createError);
            setError(msg);
            if (msg.toLowerCase().includes('row level security') || msg.toLowerCase().includes('rls')) {
              dialog.alert({
                message:
                  'Your Supabase database is blocking profile creation (RLS). Run the migration `supabase-migrations/add-user-profiles-insert-policy.sql` in Supabase SQL Editor, then retry.'
              });
            }
          } else {
            console.log('ProfileScreen: Profile created successfully:', createdProfile);
            // Transform database format to component format
            const transformedProfile = {
              ...createdProfile,
              createdAt: createdProfile.created_at,
              updatedAt: createdProfile.updated_at,
              subscriptionStatus: createdProfile.subscription_status,
              profileImageUrl: createdProfile.profile_image_url
            };
            setProfile(transformedProfile);
          }
        } catch (createException) {
          console.error('ProfileScreen: Exception creating profile:', createException);
          setProfile(newProfile);
        }
      }
    } catch (error) {
      console.error('ProfileScreen: Unexpected error in loadProfile:', error);
      setError(`Failed to load profile: ${error instanceof Error ? error.message : 'Unknown error'}`);
      // Set a fallback profile to prevent infinite loading
      const fallbackProfile = {
        id: currentUser.id,
        email: currentUser.email || '',
        tier: 'free' as const,
        badges: ['New Seeker'],
        seals: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        subscriptionStatus: 'active' as const
      };
      setProfile(fallbackProfile);
    } finally {
      console.log('ProfileScreen: Setting loading to false');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-[0_4px_16px_rgba(0,0,0,0.3)] text-center">
          <Sun className="w-12 h-12 text-yellow-400 animate-spin mx-auto mb-4 drop-shadow-[0_0_20px_rgba(255,215,0,0.6)]" />
          <p className="text-white font-semibold mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Loading your solar profile...</p>
          {error && (
            <p className="text-red-400 text-sm mt-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">{error}</p>
          )}
        </div>
      </div>
    );
  }

  // If no user after loading completes, show a clear sign-in CTA
  if (!currentUser && !loading) {
    return (
      <AuthScreen
        onAuthSuccess={() => {
          // After sign-in, reload ProfileScreen state and UI.
          getCurrentUser();
        }}
      />
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-[0_4px_16px_rgba(0,0,0,0.3)] text-center">
          <Sun className="w-12 h-12 text-yellow-400 animate-spin mx-auto mb-4 drop-shadow-[0_0_20px_rgba(255,215,0,0.6)]" />
          <p className="text-white font-semibold mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Loading your profile...</p>
          <p className="text-white/80 text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">Setting up your solar journey</p>
          {error && (
            <p className="text-red-400 text-sm mt-2">{error}</p>
          )}
        </div>
      </div>
    );
  }

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'founder_444': return <Crown className="w-6 h-6 text-yellow-600" />;
      case 'yearly': return <Shield className="w-6 h-6 text-purple-600" />;
      case 'monthly': return <Star className="w-6 h-6 text-blue-600" />;
      case 'free': return <Sun className="w-6 h-6 text-gray-400" />;
      default: return <Sun className="w-6 h-6 text-gray-400" />;
    }
  };

  const getTierName = (tier: string) => {
    switch (tier) {
      case 'founder_444': return 'Founder 444';
      case 'yearly': return 'Sungaze+ Yearly';
      case 'monthly': return 'Sungaze+ Monthly';
      case 'free': return 'Free Seeker';
      default: return 'Free Seeker';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'founder_444': return 'from-yellow-400 to-amber-500';
      case 'yearly': return 'from-purple-500 to-pink-500';
      case 'monthly': return 'from-blue-500 to-cyan-500';
      case 'free': return 'from-gray-400 to-gray-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const handleDeleteAccount = async () => {
    if (!currentUser) {
      console.error('No user to delete');
      return;
    }

    try {
      console.log('Starting account deletion for user:', currentUser.id);
      
      // 1. Delete user profile from database
      const { error: deleteProfileError } = await supabase
        .from('user_profiles')
        .delete()
        .eq('id', currentUser.id);

      if (deleteProfileError) {
        console.error('Error deleting user profile:', deleteProfileError);
        // Continue anyway - profile deletion is not critical if it fails
      } else {
        console.log('User profile deleted successfully');
      }

      // 2. Sign out the user (this invalidates their session)
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) {
        console.error('Error signing out:', signOutError);
      }

      // 3. Clear all local storage
      localStorage.clear();

      // 4. Clear state
      setCurrentUser(null);
      setProfile(null);

      // 5. Redirect to home page
      window.location.href = '/';
    } catch (error) {
      console.error('Error deleting account:', error);
      // Even if there's an error, sign out and redirect
      try {
        await supabase.auth.signOut();
        localStorage.clear();
        window.location.href = '/';
      } catch (cleanupError) {
        console.error('Error during cleanup:', cleanupError);
        window.location.href = '/';
      }
    }
  };

  const handleImagePicker = () => {
    setShowImagePicker(true);
  };

  const photoWebPathToFile = async (webPath: string) => {
    const res = await fetch(webPath);
    const blob = await res.blob();
    const ext = blob.type?.includes('png') ? 'png' : 'jpg';
    return new File([blob], `profile.${ext}`, { type: blob.type || 'image/jpeg' });
  };

  const handleTakePhoto = async () => {
    setShowImagePicker(false);

    // Native (Capacitor): force camera
    if (Capacitor.isNativePlatform()) {
      try {
        if (!isOnline) {
          dialog.alert({ message: 'You are offline. Reconnect to upload your profile image after taking a photo.' });
        }

        const mod: any = await import('@capacitor/camera');
        const { Camera, CameraSource, CameraResultType } = mod;

        const photo = await Camera.getPhoto({
          source: CameraSource.Camera,
          quality: 90,
          resultType: CameraResultType.Uri,
        });

        if (!photo?.webPath) return;

        const previousImage = profileImage;

        // Show preview immediately
        setProfileImage(photo.webPath);

        // Upload to Supabase using existing flow
        try {
          const file = await photoWebPathToFile(photo.webPath);
          const imageUrl = await uploadProfileImage(file);
          setProfileImage(imageUrl);
          setProfile((p) => (p ? { ...p, profileImageUrl: imageUrl } : p));
        } catch (uploadErr) {
          console.error('Profile image upload failed:', uploadErr);
          dialog.alert({ message: getErrorMessage(uploadErr) });
          setProfileImage(previousImage ?? null);
        }
        return;
      } catch (e) {
        console.error('Camera take photo failed:', e);
        dialog.alert({ message: 'Failed to open camera. Please try again.' });
        return;
      }
    }

    // Web fallback: file input with camera capture
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('capture', 'environment');
      fileInputRef.current.click();
    }
  };

  const handleChooseFromLibrary = async () => {
    setShowImagePicker(false);

    // Native (Capacitor): force photos
    if (Capacitor.isNativePlatform()) {
      try {
        if (!isOnline) {
          dialog.alert({ message: 'You are offline. Reconnect to upload your profile image after selecting a photo.' });
        }

        const mod: any = await import('@capacitor/camera');
        const { Camera, CameraSource, CameraResultType } = mod;

        const photo = await Camera.getPhoto({
          source: CameraSource.Photos,
          quality: 90,
          resultType: CameraResultType.Uri,
        });

        if (!photo?.webPath) return;

        const previousImage = profileImage;

        setProfileImage(photo.webPath);

        try {
          const file = await photoWebPathToFile(photo.webPath);
          const imageUrl = await uploadProfileImage(file);
          setProfileImage(imageUrl);
          setProfile((p) => (p ? { ...p, profileImageUrl: imageUrl } : p));
        } catch (uploadErr) {
          console.error('Profile image upload failed:', uploadErr);
          dialog.alert({ message: getErrorMessage(uploadErr) });
          setProfileImage(previousImage ?? null);
        }
        return;
      } catch (e) {
        console.error('Camera choose photo failed:', e);
        dialog.alert({ message: 'Failed to open photo library. Please try again.' });
        return;
      }
    }

    // Web fallback: regular file picker
    if (fileInputRef.current) {
      fileInputRef.current.removeAttribute('capture');
      fileInputRef.current.click();
    }
  };

  // Upload profile image to Supabase Storage
  const uploadProfileImage = async (file: File): Promise<string> => {
    if (!currentUser) {
      throw new Error('No user logged in');
    }

    if (!isOnline) {
      throw new Error('You are offline. Reconnect to upload your profile image.');
    }

    try {
      // Create a unique filename
      const fallbackExt = file.type?.includes('png') ? 'png' : 'jpg';
      const fileExt = file.name?.includes('.') ? (file.name.split('.').pop() || fallbackExt) : fallbackExt;
      const fileName = `${currentUser.id}/${Date.now()}.${fileExt}`;

      // Upload to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.warn('ProfileScreen: Storage upload failed:', formatSupabaseError(uploadError));
        throw new Error(getErrorMessage(uploadError));
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profile-images')
        .getPublicUrl(fileName);

      // Save URL to database (robust: handle missing user_profiles row)
      const { data: updatedRow, error: updateError } = await supabase
        .from('user_profiles')
        .update({ profile_image_url: publicUrl })
        .eq('id', currentUser.id)
        .select('id')
        .maybeSingle();

      if (updateError) {
        console.warn('ProfileScreen: Failed to save profile_image_url:', formatSupabaseError(updateError));
        throw new Error(getErrorMessage(updateError));
      }

      // If no row updated, the profile likely doesn't exist yet. Create it and proceed.
      if (!updatedRow) {
        if (!currentUser.email) {
          throw new Error('Missing email for profile creation');
        }

        const { error: insertError } = await supabase
          .from('user_profiles')
          .insert([{
            id: currentUser.id,
            email: currentUser.email,
            tier: 'free',
            badges: ['New Seeker'],
            seals: [],
            subscription_status: 'active',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            profile_image_url: publicUrl,
          }]);

        if (insertError) {
          console.warn('ProfileScreen: Failed to create profile while saving image URL:', formatSupabaseError(insertError));
          const msg = getErrorMessage(insertError).toLowerCase();
          const isDuplicateEmail =
            msg.includes('duplicate key') &&
            (msg.includes('user_profiles_email_key') || msg.includes('email_key') || msg.includes('email'));

          if (isDuplicateEmail) {
            // This means there's already a user_profiles row for this email, but NOT for this auth uid.
            // With RLS enabled, the client cannot repair it. It must be fixed in Supabase (admin).
            throw new Error(
              'Profile record conflict: there is already a row in `user_profiles` for this email (unique constraint `user_profiles_email_key`). ' +
              'This usually happens if an older account with the same email was deleted/recreated and left an orphaned profile row. ' +
              'Fix in Supabase SQL Editor by deleting the old row for that email, then refresh and try again.'
            );
          }

          if (msg.includes('row-level security') || msg.includes('rls') || msg.includes('permission')) {
            throw new Error(
              'Profile image could not be saved because the database is blocking profile creation (RLS). ' +
              'In Supabase SQL Editor run `supabase-migrations/add-user-profiles-insert-policy.sql`, then try again.'
            );
          }
          throw new Error(getErrorMessage(insertError));
        }
      }

      console.log('Profile image uploaded and saved:', publicUrl);
      return publicUrl;
    } catch (error) {
      console.warn('ProfileScreen: uploadProfileImage failed:', formatSupabaseError(error));
      throw (error instanceof Error ? error : new Error(getErrorMessage(error)));
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      dialog.alert({ message: 'Please select an image file.' });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      dialog.alert({ message: 'Image size must be less than 5MB.' });
      return;
    }

    try {
      // Show loading state with temporary preview
      const tempUrl = URL.createObjectURL(file);
      setProfileImage(tempUrl);

      // Upload to Supabase Storage
      const imageUrl = await uploadProfileImage(file);
      
      // Update state with the permanent URL
      setProfileImage(imageUrl);
      
      // Clean up temporary URL
      URL.revokeObjectURL(tempUrl);
      
      // Update profile state to reflect the new image URL
      if (profile) {
        setProfile({
          ...profile,
          profileImageUrl: imageUrl
        });
      }
      
      console.log('Profile image uploaded successfully');
    } catch (error) {
      console.warn('ProfileScreen: handleFileChange upload failed:', formatSupabaseError(error));
      dialog.alert({ message: getErrorMessage(error) });
      setProfileImage(null);
    }
  };

  const handleCancelImagePicker = () => {
    setShowImagePicker(false);
  };

  const renderSettingsItem = (icon: React.ReactNode, title: string, subtitle: string, onClick: () => void) => (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between py-5 px-4 hover:bg-white/5 rounded-xl transition-colors group"
    >
      <div className="flex items-center gap-4">
        <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
          {icon}
        </div>
        <div className="text-left">
          <h3 className="text-white font-semibold text-base">{title}</h3>
          <p className="text-white/60 text-sm">{subtitle}</p>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white/60 transition-colors" />
    </button>
  );

  // Render different screens based on currentScreen state
  if (currentScreen === 'account') {
    return <AccountInfoScreen onBack={() => setCurrentScreen('main')} onDeleteAccount={handleDeleteAccount} />;
  }

  if (currentScreen === 'membership') {
    return <MembershipScreen onBack={() => setCurrentScreen('main')} />;
  }

  if (currentScreen === 'notifications') {
    return <NotificationsScreen onBack={() => setCurrentScreen('main')} />;
  }

  if (currentScreen === 'permissions') {
    return <PermissionsScreen onBack={() => setCurrentScreen('main')} />;
  }

  if (currentScreen === 'legal') {
    return <LegalScreen onBack={() => setCurrentScreen('main')} />;
  }

  return (
    <ScreenShell>
      
      {/* Top Bar with Logo and Status */}
      <div className="flex items-center justify-between px-6 pt-6 pb-4">
        <div className="flex items-center gap-3">
          {/* Sun44 Logo */}
          <div className="relative w-7 h-7 flex items-center justify-center">
            {/* Main yellow circle with 44 */}
            <div className="w-full h-full relative rounded-full bg-gradient-to-br from-yellow-400 via-yellow-300 to-orange-400 shadow-[0_0_20px_rgba(255,215,0,0.8),0_0_40px_rgba(255,165,0,0.4)] flex items-center justify-center animate-pulse">
              <span className="text-black text-xs font-bold tracking-tight">44</span>
            </div>
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full border border-yellow-300/60 shadow-[0_0_15px_rgba(255,215,0,0.6)]" />
            {/* Orbital dots */}
            <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-yellow-400 rounded-full shadow-[0_0_8px_rgba(255,215,0,0.8)]" />
            <div className="absolute -bottom-0.5 -left-0.5 w-1 h-1 bg-orange-400 rounded-full shadow-[0_0_6px_rgba(255,165,0,0.8)]" />
            <div className="absolute -bottom-0.5 -right-0.5 w-0.5 h-0.5 bg-yellow-300 rounded-full shadow-[0_0_6px_rgba(255,235,59,0.8)]" />
          </div>
          <span className="text-white font-semibold text-lg">Sun44</span>
        </div>
        
      </div>

      <div className="px-6 pb-4">
        
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-1">
                {profile?.email?.split('@')[0] || 'MISSING MISSING'}
              </h1>
              <p className="text-white/60 text-base mb-1">@{profile?.email?.split('@')[0] || 'coby'}</p>
              <p className="text-white/60 text-base">Los Angeles</p>
            </div>
            
            {/* Profile Image with Orange + Button */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/20">
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-10 h-10 text-white/60" />
                )}
              </div>
              <button
                onClick={handleImagePicker}
                className="absolute bottom-0 right-0 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors shadow-lg border-2 border-black/60"
              >
                {(!!profileImage || !!profile?.profileImageUrl) ? (
                  <Pencil className="w-5 h-5 text-white" />
                ) : (
                  <Plus className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Followers/Following */}
          <div className="flex gap-12 mb-8">
            <div className="text-center">
              <div className="text-white font-bold text-xl">0</div>
              <div className="text-white/60 text-sm font-medium">FOLLOWERS</div>
            </div>
            <div className="text-center">
              <div className="text-white font-bold text-xl">0</div>
              <div className="text-white/60 text-sm font-medium">FOLLOWING</div>
            </div>
          </div>
        </div>

        {/* Settings Section */}
        <div className="space-y-2">
          {renderSettingsItem(
            <User className="w-5 h-5 text-blue-400" />,
            "Account Info",
            "Manage your personal information",
            () => setCurrentScreen('account')
          )}
          {renderSettingsItem(
            <CreditCard className="w-5 h-5 text-green-400" />,
            "Membership",
            "Manage your subscription and billing",
            () => setCurrentScreen('membership')
          )}
          {renderSettingsItem(
            <Bell className="w-5 h-5 text-purple-400" />,
            "Notifications",
            "Customize your notification preferences",
            () => setCurrentScreen('notifications')
          )}
          {renderSettingsItem(
            <ShieldIcon className="w-5 h-5 text-orange-400" />,
            "Permissions",
            "Manage app permissions and access",
            () => setCurrentScreen('permissions')
          )}
          {renderSettingsItem(
            <HelpCircle className="w-5 h-5 text-cyan-400" />,
            "Legal & Support",
            "Privacy policy, terms, and help",
            () => setCurrentScreen('legal')
          )}
          {renderSettingsItem(
            <LogOut className="w-5 h-5 text-red-400" />,
            "Sign Out",
            "Sign out of your account",
            handleSignOut
          )}
        </div>

        {/* Developer Section - Test Onboarding (only for developer account) */}
        {currentUser?.email?.toLowerCase() === 'cobyobi@gmail.com' && (
          <div className="mt-6 pt-6 border-t border-white/10">
            <button
              onClick={() => {
                window.location.href = '/demo-onboarding';
              }}
              className="w-full px-4 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-amber-600 transition-all duration-300"
            >
              Test New Onboarding
            </button>
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Image Picker Modal */}
      {showImagePicker && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-black rounded-t-3xl w-full max-w-md p-6 border-t border-white/10">
            <div className="space-y-3">
              <button
                onClick={() => void handleTakePhoto()}
                className="w-full flex items-center gap-4 py-5 px-4 hover:bg-white/5 rounded-xl transition-colors group"
              >
                <div className="p-2 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                  <Camera className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-left">
                  <h3 className="text-white font-semibold text-base">Take Photo</h3>
                  <p className="text-white/60 text-sm">Use camera to take a new photo</p>
                </div>
              </button>
              
              <button
                onClick={() => void handleChooseFromLibrary()}
                className="w-full flex items-center gap-4 py-5 px-4 hover:bg-white/5 rounded-xl transition-colors group"
              >
                <div className="p-2 rounded-lg bg-green-500/20 group-hover:bg-green-500/30 transition-colors">
                  <ImageIcon className="w-5 h-5 text-green-400" />
                </div>
                <div className="text-left">
                  <h3 className="text-white font-semibold text-base">Choose from Library</h3>
                  <p className="text-white/60 text-sm">Select from your photo library</p>
                </div>
              </button>
              
              <button
                onClick={handleCancelImagePicker}
                className="w-full py-4 px-4 text-white/60 hover:bg-white/5 rounded-xl transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </ScreenShell>
  );
}
