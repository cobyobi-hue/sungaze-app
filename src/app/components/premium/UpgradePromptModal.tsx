"use client";

import { useState } from 'react';
import { PREMIUM_FEATURES, PremiumFeature } from '../../hooks/usePremiumFeatures';
import { UserTier } from '../../types/subscription';

interface UpgradePromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureId?: string;
  userTier: UserTier;
  onUpgrade?: (tier: UserTier) => void;
}

export default function UpgradePromptModal({ 
  isOpen, 
  onClose, 
  featureId, 
  userTier,
  onUpgrade 
}: UpgradePromptModalProps) {
  const [selectedTier, setSelectedTier] = useState<UserTier>('monthly');

  if (!isOpen) return null;

  const feature = PREMIUM_FEATURES.find(f => f.id === featureId);
  const isFounderPrompt = feature?.requiredTier === 'founder_444';

  // Features unlocked by tier
  const getFeaturesByTier = (tier: UserTier) => {
    const tierLevels = {
      'free': 0,
      'monthly': 1,
      'yearly': 2,
      'founder_444': 3
    };
    
    return PREMIUM_FEATURES.filter(f => tierLevels[f.requiredTier] <= tierLevels[tier]);
  };

  const monthlyFeatures = getFeaturesByTier('monthly');
  const yearlyFeatures = getFeaturesByTier('yearly');
  const founderFeatures = getFeaturesByTier('founder_444');

  const handleUpgrade = () => {
    onUpgrade?.(selectedTier);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 text-2xl font-light"
          >
            ×
          </button>
          
          <div className="mb-4">
            <h2 className="text-3xl font-bold mb-2">Unlock Premium Features</h2>
            {feature && (
              <div className="bg-white bg-opacity-20 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">
                    {feature.category === 'visual' ? '👁️' : 
                     feature.category === 'sounds' ? '🎵' : 
                     feature.category === 'meditation' ? '🧘' : '📜'}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{feature.name}</h3>
                    <p className="text-orange-100 text-sm">{feature.description}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pricing Options */}
        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Monthly Plan */}
            <div 
              className={`border-2 rounded-2xl p-6 cursor-pointer transition-all duration-200 ${
                selectedTier === 'monthly' 
                  ? 'border-blue-500 bg-blue-50 shadow-lg' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedTier('monthly')}
            >
              <div className="text-center mb-4">
                <div className="text-2xl mb-2">🌙</div>
                <h3 className="text-xl font-bold text-gray-800">Monthly Ritual Pack</h3>
                <div className="text-3xl font-bold text-blue-600 my-2">$9.99</div>
                <p className="text-gray-600 text-sm">per month</p>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">Unlocked Features:</h4>
                <div className="space-y-2 text-sm">
                  {monthlyFeatures.slice(0, 6).map((f, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700">{f.name}</span>
                    </div>
                  ))}
                  {monthlyFeatures.length > 6 && (
                    <div className="text-blue-600 text-xs">+{monthlyFeatures.length - 6} more features</div>
                  )}
                </div>
              </div>
              
              {selectedTier === 'monthly' && (
                <div className="mt-4 text-center">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Yearly Plan */}
            <div 
              className={`border-2 rounded-2xl p-6 cursor-pointer transition-all duration-200 relative ${
                selectedTier === 'yearly' 
                  ? 'border-green-500 bg-green-50 shadow-lg' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedTier('yearly')}
            >
              {/* Best Value Badge */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  BEST VALUE
                </div>
              </div>
              
              <div className="text-center mb-4">
                <div className="text-2xl mb-2">🌟</div>
                <h3 className="text-xl font-bold text-gray-800">Yearly Ritual Pack</h3>
                <div className="text-3xl font-bold text-green-600 my-2">$88.88</div>
                <p className="text-gray-600 text-sm">per year</p>
                <p className="text-green-600 text-xs font-medium">Save $31.20!</p>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">Everything in Monthly Plus:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700">Best value (save $31.20)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700">Yearly streak rewards</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700">Priority support</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700">Early feature access</span>
                  </div>
                </div>
              </div>
              
              {selectedTier === 'yearly' && (
                <div className="mt-4 text-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Founder Plan */}
            <div 
              className={`border-2 rounded-2xl p-6 cursor-pointer transition-all duration-200 relative ${
                selectedTier === 'founder_444' 
                  ? 'border-yellow-500 bg-yellow-50 shadow-lg' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedTier('founder_444')}
            >
              {/* Limited Badge */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  LIMITED
                </div>
              </div>
              
              <div className="text-center mb-4">
                <div className="text-2xl mb-2">🔥</div>
                <h3 className="text-xl font-bold text-gray-800">Founder 444</h3>
                <div className="text-3xl font-bold text-yellow-600 my-2">$100</div>
                <p className="text-gray-600 text-sm">3 years full access</p>
                <p className="text-yellow-600 text-xs font-medium">Only 444 ever</p>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">Everything + Exclusive:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700">3 years full access</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700">Permanent Founder badge</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700">Exclusive founder events</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700">Direct founder access</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700">Beta features first</span>
                  </div>
                </div>
              </div>
              
              {selectedTier === 'founder_444' && (
                <div className="mt-4 text-center">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center mx-auto">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Maybe Later
            </button>
            
            <button
              onClick={handleUpgrade}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg ${
                selectedTier === 'monthly' 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
                : selectedTier === 'yearly'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white'
              }`}
            >
              {selectedTier === 'founder_444' 
                ? 'Become a Founder' 
                : `Upgrade to ${selectedTier === 'monthly' ? 'Monthly' : 'Yearly'}`
              }
            </button>
          </div>

          {/* Guarantee */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ✨ 30-day money-back guarantee • Cancel anytime • Secure payment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}