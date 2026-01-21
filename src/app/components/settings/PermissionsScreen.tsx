"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Camera, Image, MapPin, Bell, Mic, Settings, ExternalLink } from 'lucide-react';
import { createClient } from '../../lib/supabase/client';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import { useDialog } from '../../contexts/DialogContext';
import { ScreenShell } from '../ui/ScreenShell';
import { Capacitor } from '@capacitor/core';
import {
  checkNativeLocalNotificationPermission,
  requestNativeLocalNotificationPermission
} from '../../lib/solarReminderNotifications';

interface PermissionsScreenProps {
  onBack: () => void;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'granted' | 'denied' | 'not-requested';
  required: boolean;
}

export function PermissionsScreen({ onBack }: PermissionsScreenProps) {
  const supabase = createClient();
  const { isOnline } = useNetworkStatus();
  const dialog = useDialog();
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: 'camera',
      name: 'Camera',
      description: 'Required for solar window detection and safety features',
      icon: <Camera className="w-5 h-5" />,
      status: 'not-requested',
      required: true
    },
    {
      id: 'photos',
      name: 'Photos',
      description: 'Save and share your solar journey photos',
      icon: <Image className="w-5 h-5" />,
      status: 'not-requested',
      required: false
    },
    {
      id: 'location',
      name: 'Location',
      description: 'Get accurate sunrise/sunset times for your location',
      icon: <MapPin className="w-5 h-5" />,
      status: 'not-requested',
      required: true
    },
    {
      id: 'notifications',
      name: 'Notifications',
      description: 'Receive session reminders and safety alerts',
      icon: <Bell className="w-5 h-5" />,
      status: 'not-requested',
      required: false
    },
    {
      id: 'microphone',
      name: 'Microphone',
      description: 'Voice-guided meditation and audio features',
      icon: <Mic className="w-5 h-5" />,
      status: 'not-requested',
      required: false
    }
  ]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadPermissionSettings();
  }, []);

  const loadPermissionSettings = async () => {
    try {
      setLoading(true);

      if (!isOnline) {
        // Offline: fall back to checking browser permissions and skip Supabase reads.
        await checkActualPermissions();
        return;
      }
      
      // Get current user
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        console.error('Error getting user:', authError);
        setLoading(false);
        return;
      }

      // Get user profile with permission settings
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('permission_settings')
        .eq('id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error loading permission settings:', profileError);
      }

      // If settings exist, update state
      if (profile?.permission_settings) {
        const savedSettings = profile.permission_settings as Record<string, 'granted' | 'denied' | 'not-requested'>;
        setPermissions(prev => 
          prev.map(permission => ({
            ...permission,
            status: savedSettings[permission.id] ?? permission.status
          }))
        );
      } else {
        // Check actual browser permissions if no saved settings
        await checkActualPermissions();
      }
    } catch (error) {
      console.error('Error loading permission settings:', error);
      // Fallback to checking actual permissions
      await checkActualPermissions();
    } finally {
      setLoading(false);
    }
  };

  const checkActualPermissions = async () => {
    try {
      const updatedPermissions = await Promise.all(
        permissions.map(async (permission) => {
          let status: 'granted' | 'denied' | 'not-requested' = 'not-requested';
          
          try {
            if (permission.id === 'notifications') {
              if (Capacitor.isNativePlatform()) {
                const perm = await checkNativeLocalNotificationPermission();
                status = perm.supported && perm.granted ? 'granted' : 'not-requested';
              } else if ('Notification' in window) {
                const perm = Notification.permission;
                status =
                  perm === 'granted' ? 'granted' : perm === 'denied' ? 'denied' : 'not-requested';
              }
            } else if (permission.id === 'location' && navigator.geolocation) {
              // Can't directly check, but we can try
              status = 'not-requested';
            } else if (permission.id === 'camera' && navigator.mediaDevices) {
              // Can't directly check without requesting
              status = 'not-requested';
            }
          } catch (error) {
            console.error(`Error checking ${permission.id} permission:`, error);
          }
          
          return { ...permission, status };
        })
      );
      
      setPermissions(updatedPermissions);
    } catch (error) {
      console.error('Error checking permissions:', error);
    }
  };

  const savePermissionSettings = async () => {
    try {
      setSaving(true);

      if (!isOnline) {
        dialog.alert({ message: 'You are offline. Reconnect to save permission settings.' });
        return;
      }
      
      // Get current user
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        console.error('Error getting user:', authError);
        return;
      }

      // Create settings object from current state
      const settings: Record<string, string> = {};
      permissions.forEach(permission => {
        settings[permission.id] = permission.status;
      });

      // Save to Supabase
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({ 
          permission_settings: settings,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (updateError) {
        console.error('Error saving permission settings:', updateError);
        dialog.alert({ message: 'Failed to save settings. Please try again.' });
      } else {
        console.log('Permission settings saved successfully');
      }
    } catch (error) {
      console.error('Error saving permission settings:', error);
      dialog.alert({ message: 'Failed to save settings. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const requestPermission = async (permissionId: string) => {
    setSaving(true);
    try {
      let newStatus: 'granted' | 'denied' | 'not-requested' = 'not-requested';
      
      // Request actual browser permission
      if (permissionId === 'notifications' && 'Notification' in window) {
        if (Capacitor.isNativePlatform()) {
          const perm = await requestNativeLocalNotificationPermission();
          newStatus = perm.supported && perm.granted ? 'granted' : 'denied';
        } else {
          const result = await Notification.requestPermission();
          newStatus = result === 'granted' ? 'granted' : result === 'denied' ? 'denied' : 'not-requested';
        }
      } else if (permissionId === 'location' && navigator.geolocation) {
        // Request location permission
        try {
          await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          newStatus = 'granted';
        } catch (error) {
          newStatus = 'denied';
        }
      } else if (permissionId === 'camera' && navigator.mediaDevices) {
        // Request camera permission
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          stream.getTracks().forEach(track => track.stop()); // Stop immediately
          newStatus = 'granted';
        } catch (error) {
          newStatus = 'denied';
        }
      } else {
        // For other permissions, just mark as granted (simulated)
        newStatus = 'granted';
      }
      
      // Update local state immediately (optimistic update)
      setPermissions(prev => 
        prev.map(permission => 
          permission.id === permissionId 
            ? { ...permission, status: newStatus }
            : permission
        )
      );
      
      // Save to Supabase
      if (isOnline) {
        await savePermissionSettings();
      } else {
        dialog.alert({ message: 'You are offline. This change will not be saved until you reconnect.' });
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
      dialog.alert({ message: 'Failed to request permission. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const openSystemSettings = () => {
    // Worth doing now: avoid a dead-end button until we wire a real deep link
    dialog.alert({ message: "Open System Settings is coming soon. For now, use your device's Settings app to manage permissions." });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'granted': return 'text-green-400';
      case 'denied': return 'text-red-400';
      case 'not-requested': return 'text-yellow-400';
      default: return 'text-white/60';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'granted': return 'Granted';
      case 'denied': return 'Denied';
      case 'not-requested': return 'Not Requested';
      default: return 'Unknown';
    }
  };

  const renderPermissionItem = (permission: Permission) => (
    <div key={permission.id} className="flex items-center justify-between py-4 px-2">
      <div className="flex items-center gap-3 flex-1">
        <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
          {permission.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-body-md text-white font-medium">
              {permission.name}
            </h3>
            {permission.required && (
              <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">
                Required
              </span>
            )}
          </div>
          <p className="text-body-sm text-white/60 leading-relaxed">
            {permission.description}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <span className={`text-body-sm ${getStatusColor(permission.status)}`}>
          {getStatusText(permission.status)}
        </span>
        {permission.status === 'denied' && (
          <button
            onClick={() => requestPermission(permission.id)}
            className="px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-lg text-blue-400 text-xs hover:bg-blue-500/30 transition-colors"
          >
            Request
          </button>
        )}
        {permission.status === 'not-requested' && (
          <button
            onClick={() => requestPermission(permission.id)}
            className="px-3 py-1 bg-green-500/20 border border-green-400/30 rounded-lg text-green-400 text-xs hover:bg-green-500/30 transition-colors"
          >
            Enable
          </button>
        )}
      </div>
    </div>
  );

  return (
    <ScreenShell>
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="w-8 h-8 flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 text-white" />
          </button>
          <h1 className="text-xl text-white font-semibold">Permissions</h1>
          {saving && (
            <span className="text-xs text-white/60 ml-auto">Saving...</span>
          )}
        </div>

        {/* Permissions List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="bg-black/40 backdrop-blur-lg rounded-2xl border border-white/10 p-4 mb-6 shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
            <div className="space-y-1">
            {permissions.map((permission, index) => (
              <div key={permission.id}>
                {renderPermissionItem(permission)}
                {index < permissions.length - 1 && (
                  <div className="border-t border-white/10" />
                )}
              </div>
            ))}
            </div>
          </div>
        )}

        {/* System Settings Button */}
        <button
          onClick={openSystemSettings}
          disabled
          className="w-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-400/30 rounded-2xl py-4 text-white/70 font-medium transition-colors flex items-center justify-center gap-2 opacity-60 cursor-not-allowed"
        >
          <Settings className="w-5 h-5" />
          Open System Settings
          <ExternalLink className="w-4 h-4" />
        </button>

        {/* Info Section */}
        <div className="mt-6 bg-black/40 backdrop-blur-lg rounded-2xl border border-white/10 p-4 shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 text-blue-400 mt-0.5">
              <Settings className="w-full h-full" />
            </div>
            <div>
              <h3 className="text-body-md text-white font-medium mb-2">
                Permission Management
              </h3>
              <p className="text-body-sm text-white/60 leading-relaxed">
                Some permissions are required for core app functionality. You can manage all permissions through your device's system settings.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-white">Checking permissions...</span>
            </div>
          </div>
        </div>
      )}
    </ScreenShell>
  );
}
