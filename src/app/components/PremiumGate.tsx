"use client";

import React from 'react';
import { Crown, Lock, Star } from 'lucide-react';
import { Button } from './ui/button';
import { UserTier } from '../types/subscription';

interface PremiumGateProps {
  requiredTier: UserTier;
  hasAccess: boolean;
  onUpgrade?: () => void;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showUpgradeButton?: boolean;
}

export function PremiumGate({ 
  requiredTier, 
  hasAccess, 
  onUpgrade, 
  children, 
  fallback,
  showUpgradeButton = true 
}: PremiumGateProps) {
  
  if (hasAccess) {
    return <>{children}</>;
  }

  const getTierIcon = () => {
    switch (requiredTier) {
      case 'founder_444': return <Crown className="w-5 h-5 text-yellow-500" />;
      case 'yearly': return <Star className="w-5 h-5 text-purple-500" />;
      case 'monthly': return <Star className="w-5 h-5 text-blue-500" />;
      default: return <Lock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTierName = () => {
    switch (requiredTier) {
      case 'founder_444': return 'Founder 444';
      case 'yearly': return 'Sungaze+ Yearly';
      case 'monthly': return 'Sungaze+ Monthly';
      default: return 'Premium';
    }
  };

  const getTierColor = () => {
    switch (requiredTier) {
      case 'founder_444': return 'from-yellow-400 to-amber-500';
      case 'yearly': return 'from-purple-500 to-pink-500';
      case 'monthly': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <div className="bg-white/90 border border-gray-200 rounded-2xl p-6 text-center backdrop-blur-sm">
      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getTierColor()} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
        {getTierIcon()}
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {getTierName()} Required
      </h3>
      
      <p className="text-gray-600 text-sm mb-6">
        Unlock this sacred feature by upgrading to {getTierName()}.
      </p>
      
      {showUpgradeButton && onUpgrade && (
        <Button
          onClick={onUpgrade}
          className={`bg-gradient-to-r ${getTierColor()} hover:opacity-90 text-white font-bold border-0`}
        >
          Upgrade to {getTierName()}
        </Button>
      )}
    </div>
  );
}