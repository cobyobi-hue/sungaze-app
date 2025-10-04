"use client";

import React, { useState } from 'react';
import { Button } from "../components/ui/button";
import { Key, Eye, EyeOff, Save } from 'lucide-react';

export default function AdminPage() {
  const [keys, setKeys] = useState({
    openai: '',
    stripe: '',
    stripeWebhook: ''
  });
  const [showKeys, setShowKeys] = useState({
    openai: false,
    stripe: false,
    stripeWebhook: false
  });
  
  const maskKey = (key: string) => {
    if (!key) return '';
    if (key.length <= 8) return key;
    const start = key.slice(0, 8);
    const end = key.slice(-4);
    const middle = '*'.repeat(Math.min(key.length - 12, 20));
    return `${start}${middle}${end}`;
  };
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    
    // Here you would save to your backend
    try {
      const response = await fetch('/api/admin/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(keys)
      });
      
      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error('Failed to save keys:', error);
    }
    
    setSaving(false);
  };

  const toggleShow = (key: keyof typeof showKeys) => {
    setShowKeys(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-8">
          
          {/* Header */}
          <div className="text-center mb-8">
            <Key className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h1 className="text-3xl text-white font-bold mb-2">API Keys Admin</h1>
            <p className="text-gray-400">Securely store your API keys server-side</p>
          </div>

          {saved && (
            <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mb-6">
              <p className="text-green-200 text-center">✅ Keys saved securely!</p>
            </div>
          )}

          {/* OpenAI Key */}
          <div className="mb-6">
            <label className="text-gray-300 text-sm font-medium block mb-2">
              OpenAI API Key
            </label>
            <div className="relative">
              <input
                type={showKeys.openai ? "text" : "password"}
                value={showKeys.openai ? keys.openai : maskKey(keys.openai)}
                onChange={(e) => setKeys(prev => ({ ...prev, openai: e.target.value }))}
                placeholder="sk-proj-..."
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={() => toggleShow('openai')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showKeys.openai ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Stripe Secret Key */}
          <div className="mb-6">
            <label className="text-gray-300 text-sm font-medium block mb-2">
              Stripe Secret Key
            </label>
            <div className="relative">
              <input
                type={showKeys.stripe ? "text" : "password"}
                value={showKeys.stripe ? keys.stripe : maskKey(keys.stripe)}
                onChange={(e) => setKeys(prev => ({ ...prev, stripe: e.target.value }))}
                placeholder="sk_live_... or sk_test_..."
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={() => toggleShow('stripe')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showKeys.stripe ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Stripe Webhook Secret */}
          <div className="mb-8">
            <label className="text-gray-300 text-sm font-medium block mb-2">
              Stripe Webhook Secret
            </label>
            <div className="relative">
              <input
                type={showKeys.stripeWebhook ? "text" : "password"}
                value={showKeys.stripeWebhook ? keys.stripeWebhook : maskKey(keys.stripeWebhook)}
                onChange={(e) => setKeys(prev => ({ ...prev, stripeWebhook: e.target.value }))}
                placeholder="whsec_..."
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={() => toggleShow('stripeWebhook')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showKeys.stripeWebhook ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 flex items-center justify-center gap-2"
          >
            {saving ? (
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            {saving ? 'Saving...' : 'Save Keys Securely'}
          </Button>

          {/* Info */}
          <div className="mt-8 p-4 bg-blue-500/20 border border-blue-500/50 rounded-lg">
            <p className="text-blue-200 text-sm text-center">
              🔒 Keys are stored server-side only and never exposed to the browser
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}