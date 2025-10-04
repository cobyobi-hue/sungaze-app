"use client";

import React, { useState } from 'react';
import { ArrowLeft, Bell, Mail, MessageSquare } from 'lucide-react';

interface NotificationsScreenProps {
  onBack: () => void;
}

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  type: 'push' | 'email' | 'sms';
}

export function NotificationsScreen({ onBack }: NotificationsScreenProps) {
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: 'push',
      title: 'Push notifications',
      description: 'Enable push notifications for session reminders and updates.',
      enabled: false,
      type: 'push'
    },
    {
      id: 'session_reminders',
      title: 'Session reminders',
      description: 'Get reminded 10 minutes before your scheduled sungazing sessions.',
      enabled: true,
      type: 'push'
    },
    {
      id: 'daily_wisdom',
      title: 'Daily solar wisdom',
      description: 'Receive daily wisdom quotes and meditation insights via email.',
      enabled: true,
      type: 'email'
    },
    {
      id: 'progress_updates',
      title: 'Progress updates',
      description: 'Weekly summaries of your sungazing progress and achievements.',
      enabled: true,
      type: 'email'
    },
    {
      id: 'safety_alerts',
      title: 'Safety alerts',
      description: 'Important weather and safety notifications for optimal gazing conditions.',
      enabled: true,
      type: 'push'
    },
    {
      id: 'product_updates',
      title: 'Product updates',
      description: 'Receive updates about new features and app improvements.',
      enabled: false,
      type: 'email'
    }
  ]);

  const toggleNotification = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, enabled: !notification.enabled }
          : notification
      )
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'push': return <Bell className="w-5 h-5" />;
      case 'email': return <Mail className="w-5 h-5" />;
      case 'sms': return <MessageSquare className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'push': return 'text-blue-400';
      case 'email': return 'text-green-400';
      case 'sms': return 'text-purple-400';
      default: return 'text-white/60';
    }
  };

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
          <h1 className="text-xl text-white font-semibold">Notifications</h1>
        </div>

        {/* Notification Settings */}
        <div className="space-y-1">
          {notifications.map((notification, index) => (
            <div key={notification.id}>
              <div className="flex items-center justify-between py-4 px-2">
                <div className="flex items-center gap-3 flex-1">
                  <div className={`${getIconColor(notification.type)}`}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm text-white font-medium">
                      {notification.title}
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed">
                      {notification.description}
                    </p>
                  </div>
                </div>
                
                {/* Toggle Switch */}
                <button
                  onClick={() => toggleNotification(notification.id)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notification.enabled 
                      ? 'bg-green-500' 
                      : 'bg-white/20'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      notification.enabled 
                        ? 'translate-x-6' 
                        : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              {index < notifications.length - 1 && (
                <div className="border-t border-white/10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

