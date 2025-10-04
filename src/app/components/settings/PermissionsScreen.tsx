"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Camera, Image, MapPin, Bell, Mic, Settings, ExternalLink } from 'lucide-react';

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

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    setLoading(true);
    try {
      // Simulate checking permissions
      const updatedPermissions = permissions.map(permission => {
        // In a real app, you would check actual permission status
        const randomStatus = Math.random() > 0.5 ? 'granted' : 'denied';
        return { ...permission, status: randomStatus as 'granted' | 'denied' };
      });
      setPermissions(updatedPermissions);
    } catch (error) {
      console.error('Error checking permissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const requestPermission = async (permissionId: string) => {
    setLoading(true);
    try {
      // In a real app, you would request the actual permission
      console.log(`Requesting ${permissionId} permission`);
      
      // Simulate permission request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPermissions(prev => 
        prev.map(permission => 
          permission.id === permissionId 
            ? { ...permission, status: 'granted' }
            : permission
        )
      );
    } catch (error) {
      console.error('Error requesting permission:', error);
    } finally {
      setLoading(false);
    }
  };

  const openSystemSettings = () => {
    // In a real app, you would open system settings
    console.log('Opening system settings');
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
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
        </div>

        {/* Permissions List */}
        <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl rounded-2xl border border-blue-400/20 p-4 mb-6">
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

        {/* System Settings Button */}
        <button
          onClick={openSystemSettings}
          className="w-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-400/30 rounded-2xl py-4 text-white font-medium hover:from-blue-500/30 hover:to-indigo-500/30 transition-colors flex items-center justify-center gap-2"
        >
          <Settings className="w-5 h-5" />
          Open System Settings
          <ExternalLink className="w-4 h-4" />
        </button>

        {/* Info Section */}
        <div className="mt-6 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl rounded-2xl border border-blue-400/20 p-4">
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
    </div>
  );
}
