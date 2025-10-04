"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "../components/ui/button";
import { Eye, EyeOff, Key, Shield, Plus, RotateCcw, Trash2, Copy, Check } from 'lucide-react';

interface SecretInfo {
  key: string;
  encrypted: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function SecretsAdminPage() {
  const [secrets, setSecrets] = useState<SecretInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [adminToken, setAdminToken] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [newSecret, setNewSecret] = useState({ key: '', value: '', encrypt: true });
  const [showAddForm, setShowAddForm] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  const [error, setError] = useState('');

  const headers = {
    'Authorization': `Bearer ${adminToken}`,
    'Content-Type': 'application/json'
  };

  const loadSecrets = async () => {
    if (!authenticated) return;
    
    try {
      const response = await fetch('/api/secrets', { headers });
      if (response.ok) {
        const data = await response.json();
        setSecrets(data.secrets);
      } else if (response.status === 401) {
        setAuthenticated(false);
        setError('Authentication failed');
      }
    } catch (error) {
      console.error('Failed to load secrets:', error);
      setError('Failed to load secrets');
    } finally {
      setLoading(false);
    }
  };

  const authenticate = async () => {
    if (!adminToken) {
      setError('Admin token required');
      return;
    }

    try {
      const response = await fetch('/api/secrets', { headers });
      if (response.ok) {
        setAuthenticated(true);
        setError('');
        loadSecrets();
      } else {
        setError('Invalid admin token');
      }
    } catch (error) {
      setError('Authentication failed');
    }
  };

  const addSecret = async () => {
    if (!newSecret.key || !newSecret.value) {
      setError('Key and value are required');
      return;
    }

    try {
      const response = await fetch('/api/secrets', {
        method: 'POST',
        headers,
        body: JSON.stringify(newSecret)
      });

      if (response.ok) {
        setNewSecret({ key: '', value: '', encrypt: true });
        setShowAddForm(false);
        loadSecrets();
        setError('');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to add secret');
      }
    } catch (error) {
      setError('Failed to add secret');
    }
  };

  const deleteSecret = async (key: string) => {
    if (!confirm(`Delete secret "${key}"?`)) return;

    try {
      const response = await fetch(`/api/secrets?key=${key}`, {
        method: 'DELETE',
        headers
      });

      if (response.ok) {
        loadSecrets();
        setError('');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to delete secret');
      }
    } catch (error) {
      setError('Failed to delete secret');
    }
  };

  const copyUsageExample = (key: string) => {
    const example = `const ${key.toLowerCase()} = await getSecret('${key}');`;
    navigator.clipboard.writeText(example);
    setCopySuccess(key);
    setTimeout(() => setCopySuccess(''), 2000);
  };

  useEffect(() => {
    if (authenticated) {
      loadSecrets();
    }
  }, [authenticated]);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-md shadow-2xl border border-gray-700">
          <div className="text-center mb-6">
            <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h1 className="text-2xl text-white font-bold mb-2">Secrets Vault Admin</h1>
            <p className="text-gray-400 text-sm">Secure server-side API key management</p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-4">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-gray-300 text-sm font-medium block mb-2">Admin Token</label>
              <input
                type="password"
                value={adminToken}
                onChange={(e) => setAdminToken(e.target.value)}
                placeholder="Enter admin token..."
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && authenticate()}
              />
            </div>
            <Button
              onClick={authenticate}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
            >
              Access Secrets Vault
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-blue-400" />
                <div>
                  <h1 className="text-2xl text-white font-bold">Secrets Vault</h1>
                  <p className="text-gray-400">Server-side API key management</p>
                </div>
              </div>
              <Button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Secret
              </Button>
            </div>
          </div>

          {error && (
            <div className="mx-6 mt-4 bg-red-500/20 border border-red-500/50 rounded-lg p-3">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {showAddForm && (
            <div className="p-6 border-b border-gray-700 bg-gray-700/50">
              <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                <Key className="w-4 h-4" />
                Add New Secret
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Secret key (e.g., OPENAI_API_KEY)"
                  value={newSecret.key}
                  onChange={(e) => setNewSecret({ ...newSecret, key: e.target.value })}
                  className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                />
                <input
                  type="password"
                  placeholder="Secret value"
                  value={newSecret.value}
                  onChange={(e) => setNewSecret({ ...newSecret, value: e.target.value })}
                  className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                />
                <div className="flex gap-2">
                  <label className="flex items-center text-white text-sm">
                    <input
                      type="checkbox"
                      checked={newSecret.encrypt}
                      onChange={(e) => setNewSecret({ ...newSecret, encrypt: e.target.checked })}
                      className="mr-2"
                    />
                    Encrypt
                  </label>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={addSecret} className="bg-green-600 hover:bg-green-700">
                  Add Secret
                </Button>
                <Button onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <div className="p-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-400">Loading secrets...</p>
              </div>
            ) : secrets.length === 0 ? (
              <div className="text-center py-8">
                <Key className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No secrets stored</p>
              </div>
            ) : (
              <div className="space-y-3">
                {secrets.map((secret) => (
                  <div key={secret.key} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Key className="w-5 h-5 text-blue-400" />
                        <div>
                          <div className="text-white font-medium">{secret.key}</div>
                          <div className="text-gray-400 text-sm">
                            {secret.encrypted ? 'Encrypted' : 'Plain text'} • 
                            Updated {new Date(secret.updatedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => copyUsageExample(secret.key)}
                          className="text-gray-400 hover:text-white px-2 py-1 text-sm"
                        >
                          {copySuccess === secret.key ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                        <Button
                          onClick={() => deleteSecret(secret.key)}
                          className="px-2 py-1 text-sm text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {copySuccess === secret.key && (
                      <div className="mt-2 bg-green-500/20 border border-green-500/50 rounded p-2">
                        <code className="text-green-200 text-xs">
                          const {secret.key.toLowerCase()} = await getSecret('{secret.key}');
                        </code>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-6 border-t border-gray-700 bg-gray-700/30">
            <div className="text-gray-400 text-sm">
              <h4 className="font-medium text-white mb-2">Usage Example:</h4>
              <code className="bg-gray-800 px-3 py-2 rounded text-green-400 block">
                import &#123; getSecret &#125; from './lib/secrets-vault';<br/>
                const apiKey = await getSecret('OPENAI_API_KEY');
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}