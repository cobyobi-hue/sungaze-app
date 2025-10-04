"use client";

import React, { useState } from 'react';
import { ArrowRight, User, Mail, Phone, MapPin, Calendar, Ruler } from 'lucide-react';

interface UserProfile {
  name: string;
  username: string;
  email: string;
  phone: string;
  place: string;
  aboutMe: string;
  birthday: string;
  height: string;
  gender: string;
}

interface UserProfileFormProps {
  data: any;
  updateData: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
  currentStep: number;
  totalSteps: number;
}

export function UserProfileForm({ data, updateData, onNext, onPrev, currentStep, totalSteps }: UserProfileFormProps) {
  const [profile, setProfile] = useState<UserProfile>({
    name: data.profile?.name || '',
    username: data.profile?.username || '',
    email: data.profile?.email || '',
    phone: data.profile?.phone || '',
    place: data.profile?.place || '',
    aboutMe: data.profile?.aboutMe || '',
    birthday: data.profile?.birthday || '',
    height: data.profile?.height || '',
    gender: data.profile?.gender || ''
  });

  const handleNext = () => {
    updateData({ ...data, profile });
    onNext();
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-display-2xl text-white font-bold mb-2">Complete Your Solar Profile</h1>
        <p className="text-body-md text-white/70">Help us personalize your experience</p>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-label text-white/80 mb-2">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
              className="w-full pl-12 pr-4 py-3 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400/50 transition-colors"
              placeholder="Enter your full name"
            />
          </div>
        </div>

        {/* Username */}
        <div>
          <label className="block text-label text-white/80 mb-2">Username</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              value={profile.username}
              onChange={(e) => setProfile(prev => ({ ...prev, username: e.target.value }))}
              className="w-full pl-12 pr-4 py-3 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400/50 transition-colors"
              placeholder="Choose a unique username"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-label text-white/80 mb-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
              className="w-full pl-12 pr-4 py-3 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400/50 transition-colors"
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-label text-white/80 mb-2">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full pl-12 pr-4 py-3 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400/50 transition-colors"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        {/* Place */}
        <div>
          <label className="block text-label text-white/80 mb-2">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              value={profile.place}
              onChange={(e) => setProfile(prev => ({ ...prev, place: e.target.value }))}
              className="w-full pl-12 pr-4 py-3 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400/50 transition-colors"
              placeholder="City, Country"
            />
          </div>
        </div>

        {/* Height */}
        <div>
          <label className="block text-label text-white/80 mb-2">Height</label>
          <div className="relative">
            <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              value={profile.height}
              onChange={(e) => setProfile(prev => ({ ...prev, height: e.target.value }))}
              className="w-full pl-12 pr-4 py-3 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400/50 transition-colors"
              placeholder="e.g., 5'8&quot; or 173 cm"
            />
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-label text-white/80 mb-2">Gender</label>
          <select
            value={profile.gender}
            onChange={(e) => setProfile(prev => ({ ...prev, gender: e.target.value }))}
            className="w-full p-3 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/30 rounded-xl text-white focus:outline-none focus:border-blue-400/50 transition-colors"
          >
            <option value="" className="bg-slate-800">Select gender</option>
            <option value="male" className="bg-slate-800">Male</option>
            <option value="female" className="bg-slate-800">Female</option>
            <option value="non-binary" className="bg-slate-800">Non-binary</option>
            <option value="prefer-not-to-say" className="bg-slate-800">Prefer not to say</option>
          </select>
        </div>

        {/* Birthday */}
        <div>
          <label className="block text-label text-white/80 mb-2">Birthday</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="date"
              value={profile.birthday}
              onChange={(e) => setProfile(prev => ({ ...prev, birthday: e.target.value }))}
              className="w-full pl-12 pr-4 py-3 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/30 rounded-xl text-white focus:outline-none focus:border-blue-400/50 transition-colors"
            />
          </div>
        </div>

        {/* About Me */}
        <div>
          <label className="block text-label text-white/80 mb-2">About Me</label>
          <textarea
            value={profile.aboutMe}
            onChange={(e) => setProfile(prev => ({ ...prev, aboutMe: e.target.value }))}
            rows={4}
            className="w-full p-3 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400/50 transition-colors resize-none"
            placeholder="Tell us about yourself and your solar journey..."
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={onPrev}
          className="px-6 py-3 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-400/30 rounded-xl text-white hover:from-blue-500/30 hover:to-indigo-500/30 transition-all duration-300"
        >
          Back
        </button>
        
        <button
          onClick={handleNext}
          className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-bold rounded-xl transition-all duration-300"
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
