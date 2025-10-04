"use client";

import React from 'react';
import { Button } from './ui/button';
import { MapPin, X, Shield, Sun } from 'lucide-react';

interface LocationPermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAllow: () => void;
  onDeny: () => void;
}

export function LocationPermissionModal({ 
  isOpen, 
  onClose, 
  onAllow, 
  onDeny 
}: LocationPermissionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-md w-full shadow-[0_0_60px_rgba(255,255,255,0.1)]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-all duration-300"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        {/* Icon */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400/20 to-yellow-400/20 flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-orange-600" />
          </div>
        </div>

        {/* Title and Description */}
        <div className="text-center mb-8">
          <h3 className="text-gray-900 text-xl font-light mb-4">
            Location for Sun Conditions
          </h3>
          
          <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
            <div className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
              <p>Get accurate sun conditions and optimal gazing times for your exact location</p>
            </div>
            
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <p>Your location data stays private and is never stored or shared</p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-orange-50/50 rounded-xl p-4 mb-6">
          <h4 className="text-gray-800 text-sm font-medium mb-2">With location access:</h4>
          <ul className="text-gray-600 text-xs space-y-1">
            <li>• Real-time sun visibility for your area</li>
            <li>• Personalized weather-based recommendations</li>
            <li>• Accurate sunrise/sunset timing</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={onDeny}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 rounded-2xl py-3 transition-all duration-300 font-medium"
          >
            Skip for Now
          </Button>
          
          <Button
            onClick={onAllow}
            className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white rounded-2xl py-3 transition-all duration-300 font-medium shadow-[0_4px_20px_rgba(255,165,0,0.3)]"
          >
            Allow Location
          </Button>
        </div>

        {/* Fine print */}
        <p className="text-gray-500 text-xs text-center mt-4">
          The app works perfectly without location access using general sun conditions
        </p>
      </div>
    </div>
  );
}