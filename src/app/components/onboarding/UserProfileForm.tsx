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
        <p className="text-body-md text-white/90">Help us personalize your experience</p>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-label text-white/90 mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" />
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
              className="w-full pl-12 pr-4 py-3 bg-black/40 backdrop-blur-md border border-yellow-400/50 hover:bg-black/50 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/70 transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
              placeholder="Enter your full name"
            />
          </div>
        </div>

        {/* Username */}
        <div>
          <label className="block text-label text-white/90 mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">Username</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" />
            <input
              type="text"
              value={profile.username}
              onChange={(e) => setProfile(prev => ({ ...prev, username: e.target.value }))}
              className="w-full pl-12 pr-4 py-3 bg-black/40 backdrop-blur-md border border-yellow-400/50 hover:bg-black/50 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/70 transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
              placeholder="Choose a unique username"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-label text-white/90 mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" />
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
              className="w-full pl-12 pr-4 py-3 bg-black/40 backdrop-blur-md border border-yellow-400/50 hover:bg-black/50 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/70 transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-label text-white/90 mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/80" />
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full pl-12 pr-4 py-3 bg-black/40 backdrop-blur-md border border-yellow-400/50 hover:bg-black/50 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/70 transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        {/* Place */}
        <div>
          <label className="block text-label text-white/90 mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/80" />
            <input
              type="text"
              value={profile.place}
              onChange={(e) => setProfile(prev => ({ ...prev, place: e.target.value }))}
              className="w-full pl-12 pr-4 py-3 bg-black/40 backdrop-blur-md border border-yellow-400/50 hover:bg-black/50 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/70 transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
              placeholder="City, Country"
            />
          </div>
        </div>

        {/* Height */}
        <div>
          <label className="block text-label text-white/90 mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">Height</label>
          <div className="relative">
            <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/80" />
            <input
              type="text"
              value={profile.height}
              onChange={(e) => setProfile(prev => ({ ...prev, height: e.target.value }))}
              className="w-full pl-12 pr-4 py-3 bg-black/40 backdrop-blur-md border border-yellow-400/50 hover:bg-black/50 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/70 transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
              placeholder="e.g., 5'8&quot; or 173 cm"
            />
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-label text-white/90 mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">Gender</label>
          <select
            value={profile.gender}
            onChange={(e) => setProfile(prev => ({ ...prev, gender: e.target.value }))}
            className="w-full p-3 bg-black/40 backdrop-blur-md border border-yellow-400/50 hover:bg-black/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/70 transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
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
          <label className="block text-label text-white/90 mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">Birthday</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/80" />
            <input
              type="date"
              value={profile.birthday}
              onChange={(e) => setProfile(prev => ({ ...prev, birthday: e.target.value }))}
              className="w-full pl-12 pr-4 py-3 bg-black/40 backdrop-blur-md border border-yellow-400/50 hover:bg-black/50 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/70 transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>

        {/* About Me */}
        <div>
          <label className="block text-label text-white/90 mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">About Me</label>
          <textarea
            value={profile.aboutMe}
            onChange={(e) => setProfile(prev => ({ ...prev, aboutMe: e.target.value }))}
            rows={4}
            className="w-full p-3 bg-black/40 backdrop-blur-md border border-yellow-400/50 hover:bg-black/50 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/70 transition-colors duration-300 resize-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
            placeholder="Tell us about yourself and your solar journey..."
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={onPrev}
          className="px-6 py-3 bg-black/40 backdrop-blur-lg border border-white/10 hover:bg-black/50 rounded-xl text-white transition-colors duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
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
