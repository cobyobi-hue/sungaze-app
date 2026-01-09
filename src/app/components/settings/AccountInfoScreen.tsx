"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Edit, Save, X, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { createClient } from '../../lib/supabase/client';

interface AccountInfoScreenProps {
  onBack: () => void;
  onDeleteAccount: () => void | Promise<void>;
}

interface UserAccount {
  name: string;
  username: string;
  email: string;
  phone: string;
  place: string;
  aboutMe: string;
  birthday: string;
}

export function AccountInfoScreen({ onBack, onDeleteAccount }: AccountInfoScreenProps) {
  const [userAccount, setUserAccount] = useState<UserAccount>({
    name: "",
    username: "",
    email: "",
    phone: "",
    place: "",
    aboutMe: "",
    birthday: ""
  });
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      // Get current user
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        console.error('Error getting user:', authError);
        setLoading(false);
        return;
      }

      // Get user profile from database
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error loading profile:', profileError);
      }

      // Set user account data
      setUserAccount({
        name: profile?.display_name || user.user_metadata?.full_name || user.email?.split('@')[0] || "User",
        username: profile?.username || user.user_metadata?.username || "@user",
        email: user.email || "",
        phone: profile?.phone || "",
        place: profile?.location || "Unknown",
        aboutMe: profile?.about_me || "",
        birthday: profile?.birthday || ""
      });
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldEdit = (field: string, currentValue: string) => {
    setEditingField(field);
    setEditValue(currentValue);
  };

  const handleSave = () => {
    if (editingField) {
      setUserAccount(prev => ({
        ...prev,
        [editingField]: editValue
      }));
      setEditingField(null);
      setEditValue("");
    }
  };

  const handleCancel = () => {
    setEditingField(null);
    setEditValue("");
  };

  const handleDeleteConfirm = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await onDeleteAccount();
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Error deleting account:', error);
      setIsDeleting(false);
      // Keep modal open on error so user can try again
    }
  };

  const renderField = (field: string, label: string, value: string, placeholder?: string) => {
    if (editingField === field) {
      return (
        <div className="flex items-center justify-between py-3 px-2">
          <span className="text-body-md text-white">{label}</span>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white text-body-sm min-w-[120px]"
              placeholder={placeholder}
              autoFocus
            />
            <button
              onClick={handleSave}
              className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center hover:bg-green-500/30 transition-colors"
            >
              <Save className="w-3 h-3 text-green-400" />
            </button>
            <button
              onClick={handleCancel}
              className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center hover:bg-red-500/30 transition-colors"
            >
              <X className="w-3 h-3 text-red-400" />
            </button>
          </div>
        </div>
      );
    }

    return (
      <button
        onClick={() => handleFieldEdit(field, value)}
        className="w-full flex items-center justify-between py-3 px-2 hover:bg-white/5 rounded-lg transition-colors"
      >
        <span className="text-body-md text-white">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-body-sm text-white/60">
            {value || (field === 'phone' ? 'Add' : field === 'aboutMe' || field === 'birthday' ? 'Edit' : '')}
          </span>
          <ChevronRight className="w-4 h-4 text-white/40" />
        </div>
      </button>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white/60">Loading account info...</p>
        </div>
      </div>
    );
  }

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
          <h1 className="text-xl text-white font-semibold">Account Info</h1>
        </div>

        {/* Account Fields */}
        <div className="space-y-1">
          {renderField('name', 'Name', userAccount.name)}
          <div className="border-t border-white/10" />
          {renderField('username', 'Username', userAccount.username)}
          <div className="border-t border-white/10" />
          {renderField('email', 'Email', userAccount.email)}
          <div className="border-t border-white/10" />
          {renderField('phone', 'Phone', userAccount.phone, 'Add phone number')}
          <div className="border-t border-white/10" />
          {renderField('place', 'Place', userAccount.place)}
          <div className="border-t border-white/10" />
          {renderField('aboutMe', 'About Me', userAccount.aboutMe, 'Tell us about yourself')}
          <div className="border-t border-white/10" />
          {renderField('birthday', 'Birthday', userAccount.birthday, 'MM/DD/YYYY')}
        </div>

        {/* Delete Account Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleDeleteConfirm}
            className="px-6 py-3 border border-white rounded-2xl text-white hover:bg-white/5 transition-colors"
          >
            Delete my account
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-black rounded-2xl w-full max-w-md p-6 border border-white/10">
            <h3 className="text-lg text-white font-semibold mb-4 text-center">
              Delete Account
            </h3>
            <p className="text-sm text-white/60 mb-6 text-center leading-relaxed">
              Are you sure? This action is permanent and cannot be undone. All your data will be lost.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 bg-transparent border border-white/20 rounded-xl py-3 text-white hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="flex-1 bg-red-500 border border-red-500 rounded-xl py-3 text-white hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
