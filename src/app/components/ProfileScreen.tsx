"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Crown, Flame, Sun, Shield, Star, Award, Calendar, User, Settings, ChevronRight, Bell, CreditCard, LogOut, HelpCircle, Shield as ShieldIcon, Plus, Camera, Image as ImageIcon } from 'lucide-react';
import { Button } from './ui/button';
import { UserProfile, TIER_FEATURES, FOUNDER_BADGES } from '../types/subscription';
import { subscriptionService } from '../lib/database/subscription-service';
import { createClient } from '../lib/supabase/client';
import { getCurrentSolarLevel, getLevelProgress, SOLAR_LEVELS } from '../lib/solarLevels';
import { hasAchievement, getAuraGlow } from '../lib/questSystem';
import { AccountInfoScreen } from './settings/AccountInfoScreen';
import { MembershipScreen } from './settings/MembershipScreen';
import { NotificationsScreen } from './settings/NotificationsScreen';
import { PermissionsScreen } from './settings/PermissionsScreen';
import { LegalScreen } from './settings/LegalScreen';

interface ProfileScreenProps {
  userId?: string;
}

export function ProfileScreen({ userId }: ProfileScreenProps) {
  console.log('ProfileScreen: Component rendered with userId:', userId);
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<'main' | 'account' | 'membership' | 'notifications' | 'permissions' | 'legal'>('main');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      loadProfile();
    }
  }, [currentUser]);

  const getCurrentUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    } catch (error) {
      console.error('Error getting current user:', error);
    }
  };

  const loadProfile = async () => {
    if (!currentUser) return;
    
    try {
      console.log('ProfileScreen: loadProfile called, setting loading to true');
      setLoading(true);
      console.log('ProfileScreen: Loading profile for user:', currentUser.id);
      
      // Try to get profile from Supabase first
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Supabase error:', error);
        // Fall back to subscription service
        const userProfile = await subscriptionService.getUserProfile(currentUser.id);
        setProfile(userProfile);
      } else if (data) {
        console.log('ProfileScreen: Loaded userProfile from Supabase:', data);
        // Transform database format to component format
        const transformedProfile = {
          ...data,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
          subscriptionStatus: data.subscription_status
        };
        setProfile(transformedProfile);
      } else {
        // No profile found, create one
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
          console.error('Error creating profile:', createError);
          setProfile(newProfile);
        } else {
          // Transform database format to component format
          const transformedProfile = {
            ...createdProfile,
            createdAt: createdProfile.created_at,
            updatedAt: createdProfile.updated_at,
            subscriptionStatus: createdProfile.subscription_status
          };
          setProfile(transformedProfile);
        }
      }
    } catch (error) {
      console.error('ProfileScreen: Failed to load profile:', error);
    } finally {
      console.log('ProfileScreen: Setting loading to false');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center">
        <div className="text-center">
          <Sun className="w-12 h-12 text-yellow-400 animate-spin mx-auto mb-4" />
          <p className="text-white/80 font-medium">Loading your solar profile...</p>
          <p className="text-white/60 text-sm mt-2">User ID: {userId}</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/80 font-medium mb-4">Please sign in to view your profile</p>
          <p className="text-white/60 text-sm">Authentication required</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/80 font-medium mb-4">Loading your profile...</p>
          <p className="text-white/60 text-sm">Setting up your solar journey</p>
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

  const handleDeleteAccount = () => {
    console.log('Delete account requested');
    // TODO: Implement account deletion
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setCurrentUser(null);
      setProfile(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleImagePicker = () => {
    setShowImagePicker(true);
  };

  const handleTakePhoto = () => {
    setShowImagePicker(false);
    // For web, we'll use the file input with camera capture
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('capture', 'environment');
      fileInputRef.current.click();
    }
  };

  const handleChooseFromLibrary = () => {
    setShowImagePicker(false);
    // For web, we'll use the file input for file selection
    if (fileInputRef.current) {
      fileInputRef.current.removeAttribute('capture');
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB.');
        return;
      }

      // Create object URL for preview
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      console.log('Profile image updated:', file.name);
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
    <div className="min-h-screen bg-black text-white">
      
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
            <div className="relative">
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
                className="absolute -bottom-2 -right-2 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors shadow-lg"
              >
                <Plus className="w-5 h-5 text-white" />
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
                onClick={handleTakePhoto}
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
                onClick={handleChooseFromLibrary}
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
    </div>
  );
}
