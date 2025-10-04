"use client";

import React, { useState, useEffect, useRef } from "react";
import { SunVisualization } from "./components/SunVisualization";
import { SungazingTimer } from "./components/SungazingTimer";
import { CloudGazingTimer } from "./components/CloudGazingTimer";
import { SolarWindow } from "./components/SolarWindow";
import { NightMode } from "./components/NightMode";
import { OnboardingScreen } from "./components/OnboardingScreen";
import { OnboardingFlow } from "./components/onboarding/OnboardingFlow";
import { ProfileScreen } from "./components/ProfileScreen";
import { AuthScreen } from "./components/AuthScreen";
import { RitualTimer } from "./components/RitualTimer";
import { PalmingRitual } from "./components/PalmingRitual";
import { PostGazeRitual } from "./components/PostGazeRitual";
import { TruthScrollsNew } from "./components/TruthScrollsNew";
import { SolarJournal } from "./components/SolarJournal";
import { SolarContentViewer } from "./components/SolarContentViewer";
import { UnlocksScreen } from "./components/UnlocksScreen";
import { SafeConditionsOnly } from "./components/SafeConditionsOnly";
import { TruthSerum } from "./components/TruthSerum";
import { OracleQA } from "./components/OracleQA";
import CandleGazingMode from "./components/ritual-modes/CandleGazingMode";
import { Button } from "./components/ui/button";
import { PaywallModal } from "./components/PaywallModal";
import { SolarOrbsSystem } from "./components/SolarOrbsSystem";
import { SolarTabBar } from "./components/ui/SolarTabBar";
import { EnhancedSolarLevelCard } from "./components/EnhancedSolarLevelCard";
import { SolarWindowManager } from "./components/SolarWindowManager";
import { SolarWindowSettings } from "./components/SolarWindowSettings";
import { MeditationPlayer } from "./components/MeditationPlayer";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs";
import { Home, Sparkles, User, Cloud, Sun, Crown, Upload, ChevronDown, BookOpen } from "lucide-react";
import { hasValidConsent } from "./lib/consent";
import { createClient } from "./lib/supabase/client";

export default function App() {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerProgress, setTimerProgress] = useState(0);
  const [currentView, setCurrentView] = useState<'main' | 'night'>('main');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showNewOnboarding, setShowNewOnboarding] = useState(false);
  const [flareNotification, setFlareNotification] = useState<string | null>(null);
  const [showAskTheOracle, setShowAskTheOracle] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showSolarOrbs, setShowSolarOrbs] = useState(false);
  const [showSolarWindowSettings, setShowSolarWindowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [autoStartTimer, setAutoStartTimer] = useState(false);
  const [journalMode, setJournalMode] = useState<'day' | 'evening'>('day');
  const [activeRitual, setActiveRitual] = useState<'palming' | 'barefoot' | 'journal' | 'scrolls' | 'cloud-gazing' | 'candle-gazing' | 'meditation' | null>(null);
  const [showPalmingRitual, setShowPalmingRitual] = useState(false);
  const [showPostGazeRitual, setShowPostGazeRitual] = useState(false);
  const [nightActivity, setNightActivity] = useState<'candle' | 'journal' | 'meditation' | null>(null);
  const [learnSection, setLearnSection] = useState<'main' | 'guide' | 'content' | 'unlocks' | 'levels' | 'scrolls' | 'truth-serum' | 'oracle-qa' | 'journey' | 'eye-practices'>('main');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth check error:', error);
    }
  };

  const handleAuthSuccess = () => {
    checkAuth();
  };

  // Simplified state management - no complex subscription hook
  const loading = false;
  const isPremium = true;
  const isFounder = true;
  const hasAccess = () => true;

  // Check consent and show onboarding
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const hasConsent = hasValidConsent();
        if (!hasConsent) {
          setShowOnboarding(true);
        }
      } catch (error) {
        console.error('Error checking consent:', error);
        setShowOnboarding(true);
      }
    }
  }, []);

  // Show auth screen if not authenticated
  if (!isAuthenticated) {
    // Temporary developer bypass - comment out for production
    // return <AuthScreen onAuthSuccess={handleAuthSuccess} />;
    console.log('Developer bypass active - skipping authentication');
    setIsAuthenticated(true);
    setUser({ id: 'cobyobi@gmail.com', email: 'cobyobi@gmail.com' });
  }


  const handleTimerChange = (isActive: boolean, progress: number) => {
    setIsTimerActive(isActive);
    setTimerProgress(progress);
  };

  const handleFlareAction = (action: string, intensity: number) => {
    setFlareNotification(action);
    console.log('Solar Flare Activated:', action, `Intensity: ${intensity}`);
    setTimeout(() => setFlareNotification(null), 3000);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    // Show Founders paywall first
    setShowPaywall(true);
  };

  const handlePaywallClose = () => {
    setShowPaywall(false);
    // Then show Solar Orbs system
    setShowSolarOrbs(true);
  };

  const handleSungazingComplete = (duration: number) => {
    console.log('Sungazing completed:', duration);
  };

  // Show new onboarding flow
  if (showOnboarding || showNewOnboarding) {
    return <OnboardingFlow onComplete={() => {
      setShowOnboarding(false);
      setShowNewOnboarding(false);
    }} />;
  }

  // Show night mode
  if (currentView === 'night') {
    return (
      <NightMode
        onJournalOpen={(mode) => {
          setJournalMode('evening');
          setCurrentView('main');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background - Using gradient only */}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/90 to-cyan-900/90 backdrop-blur-xl" />
      {/* Holographic sun effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-conic from-orange-200/20 via-yellow-200/30 via-cyan-200/20 to-orange-200/20 animate-spin"
             style={{ animationDuration: '20s' }} />
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-radial from-yellow-300/15 via-orange-300/20 to-transparent animate-pulse"
             style={{ animationDuration: '4s' }} />
      </div>

      {/* Solar Flare Notification */}
      {flareNotification && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 rounded-full shadow-[0_8px_32px_rgba(251,146,60,0.4)] backdrop-blur-xl border border-orange-300/30 animate-bounce">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-sm font-medium">{flareNotification}</span>
          </div>
        </div>
      )}

      {/* App container */}
      <div className="relative z-10 max-w-sm mx-auto min-h-screen px-6 pb-24">
        {/* Header */}
        <div className="pt-20 pb-12 text-center">
          <div className="mb-8">
            {/* 44 Circle */}
            <div className="relative inline-flex items-center justify-center mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300/20 to-amber-400/20 blur-3xl scale-150" />
              <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-yellow-400/90 to-amber-500/90 flex items-center justify-center shadow-[0_0_40px_rgba(251,191,36,0.5)] border border-yellow-300/30">
                <span className="text-black text-3xl font-bold tracking-tight drop-shadow-lg">44</span>
              </div>
              {/* Orbiting elements */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '15s' }}>
                <div className="w-2 h-2 bg-yellow-400 rounded-full absolute -top-1 left-1/2 transform -translate-x-1/2 shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
                <div className="w-1 h-1 bg-orange-400 rounded-full absolute top-1/2 -right-1 transform -translate-y-1/2 shadow-[0_0_8px_rgba(251,146,60,0.8)]" />
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full absolute -bottom-1 left-1/2 transform -translate-x-1/2 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                <div className="w-1 h-1 bg-yellow-300 rounded-full absolute top-1/2 -left-1 transform -translate-y-1/2 shadow-[0_0_8px_rgba(253,224,71,0.8)]" />
              </div>
            </div>

            <h1 className="text-display-4xl text-yellow-400 tracking-[0.1em] font-bold mb-3 drop-shadow-[0_4px_20px_rgba(255,235,59,0.8)] shadow-[0_0_40px_rgba(255,235,59,0.6)] filter brightness-110 animate-pulse">
              SUNGAZE
            </h1>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent mx-auto mb-4 shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
          </div>

          <div className="bg-black/40 backdrop-blur-md rounded-2xl px-6 py-5 border border-white/30 shadow-2xl">
            <p className="text-caption text-white mb-4">
              LIGHT NUTRITION RITUAL
            </p>

            <div className="space-y-4">
              <p className="text-body-md text-white font-medium leading-relaxed tracking-wide">
                Transform sunlight into cellular nourishment through ancient gazing meditation.
              </p>
              <p className="text-body-sm text-white/95 font-light italic leading-relaxed tracking-wide">
                From 10 seconds to 44 minutes — become a solar being through sacred practice.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs defaultValue="home" className="mb-12" value={activeTab} onValueChange={setActiveTab}>
          <div className="mb-6">
            {/* Premium Tab Bar */}
            <SolarTabBar 
              activeTab={activeTab}
              onTabChange={setActiveTab}
              className="mb-0"
            />
          </div>

          {/* HOME TAB - Premium Design Applied */}
          <TabsContent value="home" className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
            <div className="px-6 pt-6 pb-24">
            <SolarWindow
              onStartGazing={() => {
                setActiveTab("gaze");
                setAutoStartTimer(true);
              }}
            />

              {/* Premium Status - Premium Design */}
              <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6 text-center shadow-[0_0_20px_rgba(59,130,246,0.1)] mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                  <Crown className="w-5 h-5 text-orange-500" />
                  <h3 className="text-title-sm text-white font-semibold">Sacred Access Unlocked</h3>
              </div>
                <p className="text-body-sm text-white/60 mb-2">First Witness of the Flame</p>
                <p className="text-body-sm text-orange-400 font-bold mb-3">Founder #1/444</p>
                
                {/* Test New Onboarding Button */}
                <button
                  onClick={() => setShowNewOnboarding(true)}
                  className="mt-4 px-4 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-amber-600 transition-all duration-300"
                >
                  Test New Onboarding
                </button>

                {/* Solar Window Settings Button */}
                <button
                  onClick={() => {
                    console.log('Solar Window Settings button clicked');
                    setShowSolarWindowSettings(true);
                  }}
                  className="mt-2 px-4 py-2 bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-indigo-600 transition-all duration-300"
                >
                  Solar Window Settings
                </button>
            </div>

              {/* Ask the Oracle - Premium Design */}
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-400/20 rounded-2xl p-6 shadow-[0_0_20px_rgba(168,85,247,0.1)]">
              <button
                onClick={() => setShowAskTheOracle(!showAskTheOracle)}
                  className="w-full flex items-center justify-between text-left hover:bg-purple-500/10 transition-all duration-300 rounded-xl p-2"
              >
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center">
                    <span className="text-white text-xs">🔮</span>
                  </div>
                    <h2 className="text-title-sm text-white font-medium tracking-wide">
                    Ask the Oracle
                  </h2>
                </div>
                <ChevronDown
                    className={`w-5 h-5 text-purple-300 transition-transform duration-300 ${showAskTheOracle ? 'rotate-180' : ''}`}
                />
              </button>

              {showAskTheOracle && (
                  <div className="mt-6">
                    <OracleQA />
                </div>
              )}
              </div>
            </div>
          </TabsContent>

          {/* GAZE TAB - Premium Design Applied */}
          <TabsContent value="gaze" className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
            <div className="px-6 pt-6 pb-24">
              <div className="text-center mb-6">
                <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Sun className="w-6 h-6 text-orange-400" />
                    <h2 className="text-title-md text-white font-semibold">☀️ Direct Sun Gazing</h2>
                </div>
                  <p className="text-body-md text-white/60">Ancient light nutrition practice</p>
              </div>
            </div>

            <div className="relative h-80 mb-12">
              <SunVisualization
                isActive={isTimerActive}
                progress={timerProgress}
                onFlareAction={handleFlareAction}
              />
            </div>

            <div className="mb-12">
              <SungazingTimer
                onTimerChange={handleTimerChange}
                onComplete={handleSungazingComplete}
                autoStart={autoStartTimer}
                onAutoStartHandled={() => setAutoStartTimer(false)}
              />
              
              {/* Sacred Unlock Button */}
              <div className="mt-6 flex justify-center">
                <Button
                  onClick={() => setLearnSection('unlocks')}
                  className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-400/30 text-white font-semibold px-6 py-3 rounded-2xl transition-colors duration-300"
                >
                  🔓 Sacred Unlock
                </Button>
              </div>
              </div>
            </div>
          </TabsContent>

          {/* CLOUDS TAB - Now empty, cloud gazing moved to Discover */}
          <TabsContent value="clouds" className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
            <div className="px-6 pt-6 pb-24">
              <div className="text-center mb-6">
                <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Cloud className="w-6 h-6 text-blue-400" />
                    <h2 className="text-title-md text-white font-semibold">☁️ Cloud Section</h2>
                  </div>
                  <p className="text-body-md text-white/60">Cloud gazing has moved to Discover section</p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* PROFILE TAB - Already has premium design */}
          <TabsContent value="profile" className="space-y-4">
            <ProfileScreen />
          </TabsContent>

          {/* LEARN TAB - Premium Design Applied */}
          <TabsContent value="learn" className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
            <div className="px-6 pt-6 pb-24">
            {learnSection === 'main' && (
              <>
                <div className="text-center mb-6">
                    <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <BookOpen className="w-6 h-6 text-blue-400" />
                        <h2 className="text-title-md text-white font-semibold tracking-wide">Solar Master Learning</h2>
                    </div>
                      <p className="text-body-md text-white/60 font-medium leading-relaxed">
                      Unlock guided content and advanced techniques
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {isPremium && (
                    <Button
                      onClick={() => setLearnSection('scrolls')}
                      className="w-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-400/30 text-white font-semibold py-4 rounded-2xl transition-colors duration-300"
                    >
                      📜 Truth Scrolls (Premium)
                    </Button>
                  )}


                  <Button
                    onClick={() => setLearnSection('content')}
                      className="w-full bg-gradient-to-br from-orange-500/20 to-yellow-500/20 hover:from-orange-500/30 hover:to-yellow-500/30 border border-orange-400/30 text-white font-semibold py-4 rounded-2xl transition-colors duration-300"
                  >
                    Solar Content
                  </Button>

                  <Button
                    onClick={() => setLearnSection('truth-serum')}
                      className="w-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-400/30 text-white font-semibold py-4 rounded-2xl transition-colors duration-300"
                  >
                    Gems from the Sun
                  </Button>

                  <Button
                    onClick={() => setLearnSection('oracle-qa')}
                      className="w-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-400/30 text-white font-semibold py-4 rounded-2xl transition-colors duration-300"
                  >
                    Ask the Oracle
                  </Button>

                  <Button
                    onClick={() => setLearnSection('journey')}
                      className="w-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 border border-green-400/30 text-white font-semibold py-4 rounded-2xl transition-colors duration-300"
                  >
                    9 Month Solar Journey
                  </Button>

                  <Button
                    onClick={() => setLearnSection('eye-practices')}
                      className="w-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-400/30 text-white font-semibold py-4 rounded-2xl transition-colors duration-300"
                  >
                    Eye Practices
                  </Button>



                    <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                      <h3 className="text-title-sm text-white font-semibold mb-4">Quick Learning Modules</h3>
                    <div className="grid grid-cols-1 gap-3">
                        <div className="bg-gradient-to-br from-white/10 to-blue-500/10 rounded-2xl p-3 border border-blue-400/20">
                          <p className="text-body-sm text-white font-medium">• Foundation: Solar Gazing Basics</p>
                          <p className="text-caption text-white/60">Safe practice fundamentals</p>
                      </div>
                        <div className="bg-gradient-to-br from-white/10 to-blue-500/10 rounded-2xl p-3 border border-blue-400/20">
                          <p className="text-body-sm text-white font-medium">• Intermediate: Light Nutrition</p>
                          <p className="text-caption text-white/60">Energy absorption techniques</p>
                      </div>
                        <div className="bg-gradient-to-br from-white/10 to-blue-500/10 rounded-2xl p-3 border border-blue-400/20">
                          <p className="text-body-sm text-white font-medium">• Advanced: Consciousness Expansion</p>
                          <p className="text-caption text-white/60">Deep meditative states</p>
                      </div>
                        <div className="bg-gradient-to-br from-white/10 to-blue-500/10 rounded-2xl p-3 border border-blue-400/20">
                          <p className="text-body-sm text-white font-medium">• Master: Sacred Alchemy</p>
                          <p className="text-caption text-white/60">Transformation practices</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {learnSection === 'content' && (
              <div className="space-y-4">
                <Button
                  onClick={() => setLearnSection('main')}
                    className="mb-4 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30 border border-blue-400/30 text-white rounded-2xl px-4 py-2 transition-colors duration-300"
                >
                  ← Back to Learning Hub
                </Button>
                <SolarContentViewer 
                  currentDay={1} 
                  onClose={() => setLearnSection('main')} 
                />
              </div>
            )}

            {learnSection === 'unlocks' && (
              <UnlocksScreen onBack={() => setLearnSection('main')} />
            )}

            {learnSection === 'truth-serum' && (
              <div className="space-y-4">
                <Button
                  onClick={() => setLearnSection('main')}
                    className="mb-4 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30 border border-blue-400/30 text-white rounded-2xl px-4 py-2 transition-colors duration-300"
                >
                  ← Back to Learning Hub
                </Button>
                <TruthSerum />
              </div>
            )}

            {learnSection === 'oracle-qa' && (
              <div className="space-y-4">
                <Button
                  onClick={() => setLearnSection('main')}
                    className="mb-4 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30 border border-blue-400/30 text-white rounded-2xl px-4 py-2 transition-colors duration-300"
                >
                  ← Back to Learning Hub
                </Button>
                <OracleQA />
              </div>
            )}

            {learnSection === 'journey' && (
              <div className="space-y-4">
                <Button
                  onClick={() => setLearnSection('main')}
                    className="mb-4 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30 border border-blue-400/30 text-white rounded-2xl px-4 py-2 transition-colors duration-300"
                >
                  ← Back to Learning Hub
                </Button>
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl border border-green-400/20 rounded-2xl p-8 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl text-white font-bold mb-2">9 Month Solar Journey</h2>
                    <p className="text-green-200 text-sm">Your transformative path to solar consciousness</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-white/5 to-green-500/10 rounded-2xl p-6 border border-green-400/20">
                      <h3 className="text-xl text-white font-semibold mb-4 text-center">The Three Phases of Cellular Restoration</h3>
                      <p className="text-green-200 text-sm mb-6 text-center">
                        Practitioners following the traditional sungazing protocol report profound transformations in their body's natural healing capacity:
                      </p>
                      
                      <div className="space-y-6">
                        {/* Phase 1 */}
                        <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl p-4 border border-blue-400/20">
                          <h4 className="text-lg text-white font-semibold mb-2">Phase 1 (0-3 months):</h4>
                          <h5 className="text-md text-blue-200 font-medium mb-2">Mental & Neurological Reset</h5>
                          <p className="text-green-200 text-sm">
                            Practitioners report complete reversal of mood imbalances, cognitive fog, sleep disorders, and stress-related conditions. The pineal gland activation appears to restore natural neurotransmitter production, eliminating the need for synthetic interventions.
                          </p>
                        </div>
                        
                        {/* Phase 2 */}
                        <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-xl p-4 border border-amber-400/20">
                          <h4 className="text-lg text-white font-semibold mb-2">Phase 2 (3-6 months):</h4>
                          <h5 className="text-md text-amber-200 font-medium mb-2">Physical Regeneration</h5>
                          <p className="text-green-200 text-sm">
                            The body's cellular repair mechanisms activate dramatically. Chronic inflammatory conditions, autoimmune responses, digestive disorders, and metabolic dysfunctions begin reversing. Many report their bodies healing conditions that had persisted for decades.
                          </p>
                        </div>
                        
                        {/* Phase 3 */}
                        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-400/20">
                          <h4 className="text-lg text-white font-semibold mb-2">Phase 3 (6-9 months):</h4>
                          <h5 className="text-md text-purple-200 font-medium mb-2">Transcendent Biology</h5>
                          <p className="text-green-200 text-sm">
                            The body achieves remarkable efficiency, requiring minimal food while maintaining perfect health. Practitioners describe their bodies operating on pure solar energy, with complete elimination of chronic conditions and enhanced longevity markers.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {learnSection === 'eye-practices' && (
              <div className="space-y-4">
                <Button
                  onClick={() => setLearnSection('main')}
                    className="mb-4 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30 border border-blue-400/30 text-white rounded-2xl px-4 py-2 transition-colors duration-300"
                >
                  ← Back to Learning Hub
                </Button>
                <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl border border-cyan-400/20 rounded-2xl p-8 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl text-white font-bold mb-2">Eye Practices</h2>
                    <p className="text-cyan-200 text-sm">Strengthen your vision and enhance focus with ancient techniques</p>
                  </div>
                  
                  <div className="space-y-8">
                    {/* Trataka */}
                    <div className="bg-gradient-to-br from-white/5 to-cyan-500/10 rounded-2xl p-6 border border-cyan-400/20">
                      <h3 className="text-xl text-white font-semibold mb-3">1) Trataka – Candle or Dot Gazing</h3>
                      <p className="text-cyan-200 text-sm mb-4 font-medium">Purpose: Builds concentration, strengthens eyes, and calms the mind.</p>
                      
                      <div className="mb-4">
                        <h4 className="text-lg text-white font-medium mb-2">Steps:</h4>
                        <ul className="text-cyan-200 text-sm space-y-1 ml-4">
                          <li>• Sit in meditation posture</li>
                          <li>• Place candle flame or black dot at eye level, 2–3 ft away</li>
                          <li>• Gaze steadily without blinking until eyes water</li>
                          <li>• Close eyes and visualize flame at the brow</li>
                          <li>• Practice 5–10 mins daily</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-lg text-white font-medium mb-2">Benefits:</h4>
                        <ul className="text-cyan-200 text-sm space-y-1 ml-4">
                          <li>• Improves focus, memory, willpower</li>
                          <li>• Enhances vision over time</li>
                          <li>• Activates Third Eye (Ajna Chakra)</li>
                        </ul>
                      </div>
                    </div>

                    {/* Yogic Eye Movements */}
                    <div className="bg-gradient-to-br from-white/5 to-blue-500/10 rounded-2xl p-6 border border-blue-400/20">
                      <h3 className="text-xl text-white font-semibold mb-3">2) Yogic Eye Movements</h3>
                      <p className="text-blue-200 text-sm mb-4 font-medium">Purpose: Increases eye flexibility, coordination, and alertness.</p>
                      
                      <div className="mb-4">
                        <h4 className="text-lg text-white font-medium mb-2">Steps:</h4>
                        <ul className="text-blue-200 text-sm space-y-1 ml-4">
                          <li>• Sit with spine straight. Keep head still</li>
                          <li>• Move eyes:</li>
                          <li className="ml-4">- Left ↔ Right (10x)</li>
                          <li className="ml-4">- Up ↔ Down (10x)</li>
                          <li className="ml-4">- Diagonals (10x each)</li>
                          <li className="ml-4">- Circles clockwise + counterclockwise (5x each)</li>
                          <li>• After each set, palm eyes to relax</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-lg text-white font-medium mb-2">Benefits:</h4>
                        <ul className="text-blue-200 text-sm space-y-1 ml-4">
                          <li>• Strengthens weak muscles</li>
                          <li>• Boosts coordination and focus</li>
                        </ul>
                      </div>
                    </div>

                    {/* Palming */}
                    <div className="bg-gradient-to-br from-white/5 to-indigo-500/10 rounded-2xl p-6 border border-indigo-400/20">
                      <h3 className="text-xl text-white font-semibold mb-3">3) Palming</h3>
                      <p className="text-indigo-200 text-sm mb-4 font-medium">Purpose: Relieves strain, relaxes nerves, and calms the mind.</p>
                      
                      <div className="mb-4">
                        <h4 className="text-lg text-white font-medium mb-2">Steps:</h4>
                        <ul className="text-indigo-200 text-sm space-y-1 ml-4">
                          <li>• Rub palms together until warm</li>
                          <li>• Gently cup palms over closed eyes</li>
                          <li>• Breathe deeply, feel warmth soothe eyes</li>
                          <li>• Hold 2–3 mins</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-lg text-white font-medium mb-2">Benefits:</h4>
                        <ul className="text-indigo-200 text-sm space-y-1 ml-4">
                          <li>• Instant relaxation</li>
                          <li>• Refreshes clarity</li>
                          <li>• Eases screen fatigue</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {learnSection === 'levels' && (
              <div className="space-y-4">
                <Button
                  onClick={() => setLearnSection('main')}
                    className="mb-4 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30 border border-blue-400/30 text-white rounded-2xl px-4 py-2 transition-colors duration-300"
                >
                  ← Back to Learning Hub
                </Button>
                <EnhancedSolarLevelCard currentDay={1} completedMinutes={0} />
              </div>
            )}

              {learnSection === 'scrolls' && (
                <div className="space-y-4">
                  <Button
                    onClick={() => setLearnSection('main')}
                    className="mb-4 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30 border border-blue-400/30 text-white rounded-2xl px-4 py-2 transition-colors duration-300"
                  >
                    ← Back to Learning Hub
                  </Button>
                  <TruthScrollsNew
                    onClose={() => setLearnSection('main')}
                    hasAccess={isPremium}
                    onUpgrade={() => setShowPaywall(true)}
                  />
                </div>
              )}
            </div>
          </TabsContent>

          {/* RITUALS TAB - Premium Design Applied */}
          <TabsContent value="rituals" className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
            <div className="px-6 pt-6 pb-24">
              {activeRitual === null && (
                <>
                  <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6 shadow-[0_0_20px_rgba(59,130,246,0.1)] mb-6">
                    <h2 className="text-title-md text-white font-semibold text-center">Sacred Rituals</h2>
                  </div>

                  <div className="space-y-4">
                    <div 
                      onClick={() => setActiveRitual('meditation')}
                      className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6 shadow-lg cursor-pointer hover:from-blue-500/15 hover:to-indigo-500/15 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500/20 to-blue-500/20 flex items-center justify-center border border-indigo-400/30">
                        </div>
                        <div className="flex-1">
                          <h3 className="text-title-sm text-white font-semibold">Sacred Meditation</h3>
                          <p className="text-body-sm text-white/60">Premium meditation and music experience</p>
                        </div>
                      </div>
                    </div>

                    <div 
                      onClick={() => setActiveRitual('palming')}
                      className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6 shadow-lg cursor-pointer hover:from-blue-500/15 hover:to-indigo-500/15 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500/20 to-yellow-500/20 flex items-center justify-center border border-orange-400/30">
                          <span className="text-orange-400 text-xl">○</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-title-sm text-white font-semibold">Solar Palming</h3>
                          <p className="text-body-sm text-white/60">Remove sun spots after gazing (3-5 minutes)</p>
                        </div>
                      </div>
                    </div>

                    <div 
                    onClick={() => setActiveRitual('barefoot')}
                      className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6 shadow-lg cursor-pointer hover:from-blue-500/15 hover:to-indigo-500/15 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center border border-green-400/30">
                          <span className="text-green-400 text-xl">🦶</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-title-sm text-white font-semibold">Barefoot Grounding</h3>
                          <p className="text-body-sm text-white/60">Earth connection grounding (10-44 minutes)</p>
                        </div>
                      </div>
                    </div>

                    <div 
                    onClick={() => setActiveRitual('journal')}
                      className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6 shadow-lg cursor-pointer hover:from-blue-500/15 hover:to-indigo-500/15 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-400/30">
                          <span className="text-purple-400 text-xl">📖</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-title-sm text-white font-semibold">Solar Journal & Reflection</h3>
                          <p className="text-body-sm text-white/60">Document your solar journey and insights</p>
                        </div>
                      </div>
                    </div>

                    <div 
                      onClick={() => setActiveRitual('cloud-gazing')}
                      className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6 shadow-lg cursor-pointer hover:from-blue-500/15 hover:to-indigo-500/15 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-400/30">
                          <span className="text-blue-400 text-xl">☁️</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-title-sm text-white font-semibold">Cloud Gazing</h3>
                          <p className="text-body-sm text-white/60">Perfect for beginners or cloudy days (1-5 minutes)</p>
                        </div>
                      </div>
                    </div>

                    <div 
                      onClick={() => setActiveRitual('candle-gazing')}
                      className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6 shadow-lg cursor-pointer hover:from-blue-500/15 hover:to-indigo-500/15 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center border border-orange-400/30">
                          <span className="text-orange-400 text-xl">🕯️</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-title-sm text-white font-semibold">Candle Gazing (Trataka)</h3>
                          <p className="text-body-sm text-white/60">Evening meditation practice (5-15 minutes)</p>
                        </div>
                      </div>
                    </div>
                </div>
              </>
            )}

            {activeRitual === 'palming' && (
              <RitualTimer
                ritualType="palming"
                onComplete={() => setActiveRitual(null)}
                onBack={() => setActiveRitual(null)}
              />
            )}

            {activeRitual === 'barefoot' && (
              <RitualTimer
                ritualType="barefoot"
                onComplete={() => setActiveRitual(null)}
                onBack={() => setActiveRitual(null)}
              />
            )}

            {activeRitual === 'journal' && (
              <div className="space-y-4">
                  <div 
                  onClick={() => setActiveRitual(null)}
                    className="mb-4 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-4 shadow-lg cursor-pointer hover:from-blue-500/15 hover:to-indigo-500/15 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center border border-blue-400/30">
                        <span className="text-blue-400 text-sm">←</span>
                      </div>
                      <span className="text-body-md text-white font-medium">Back to Rituals</span>
                    </div>
                  </div>
                <SolarJournal mode={journalMode} onClose={() => setActiveRitual(null)} />
              </div>
            )}

            {activeRitual === 'meditation' && (
              <div className="space-y-4">
                  <div 
                  onClick={() => setActiveRitual(null)}
                    className="mb-4 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-4 shadow-lg cursor-pointer hover:from-blue-500/15 hover:to-indigo-500/15 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center border border-blue-400/30">
                        <span className="text-blue-400 text-sm">←</span>
                      </div>
                      <span className="text-body-md text-white font-medium">Back to Rituals</span>
                    </div>
                  </div>
                <MeditationPlayer 
                  onTrackChange={(track) => console.log('Track changed:', track)}
                  onPlayPause={(isPlaying) => console.log('Play/Pause:', isPlaying)}
                />
              </div>
            )}

              {activeRitual === 'cloud-gazing' && (
              <div className="space-y-4">
                  <div 
                  onClick={() => setActiveRitual(null)}
                    className="mb-4 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-4 shadow-lg cursor-pointer hover:from-blue-500/15 hover:to-indigo-500/15 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center border border-blue-400/30">
                        <span className="text-blue-400 text-sm">←</span>
                      </div>
                      <span className="text-body-md text-white font-medium">Back to Rituals</span>
                    </div>
                  </div>
                  <CloudGazingTimer
                    onTimerChange={handleTimerChange}
                    onComplete={() => setActiveRitual(null)}
                />
              </div>
            )}

            {activeRitual === 'candle-gazing' && (
              <div className="space-y-4">
                  <div 
                  onClick={() => setActiveRitual(null)}
                    className="mb-4 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-4 shadow-lg cursor-pointer hover:from-blue-500/15 hover:to-indigo-500/15 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center border border-blue-400/30">
                        <span className="text-blue-400 text-sm">←</span>
                      </div>
                      <span className="text-body-md text-white font-medium">Back to Rituals</span>
                    </div>
                  </div>
                  <CandleGazingMode
                    isActive={true}
                    duration={900} // 15 minutes
                    onComplete={() => setActiveRitual(null)}
                    onBack={() => setActiveRitual(null)}
                  />
              </div>
            )}
            </div>
          </TabsContent>

          {/* NIGHT TAB - Premium Design Applied */}
          <TabsContent value="night" className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
            <div className="px-6 pt-6 pb-24">
            {nightActivity === null && (
              <>
                  <div className="text-center mb-6">
                    <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Sun className="w-6 h-6 text-indigo-400" />
                        <h2 className="text-title-md text-white font-semibold">🌙 Night Practice</h2>
                    </div>
                      <p className="text-body-md text-white/60">Evening reflection and preparation</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                    <h3 className="text-title-sm text-white font-semibold mb-2">Candle Gazing Moved</h3>
                    <p className="text-body-sm text-white/60">Candle gazing is now available in the Discover section under Sacred Rituals</p>
                  </div>

                  <Button
                    onClick={() => setNightActivity('journal')}
                      className="w-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 hover:from-purple-500/30 hover:to-blue-500/30 border border-purple-400/30 text-white font-semibold py-4 rounded-2xl transition-colors duration-300"
                  >
                    📖 Evening Reflection Journal
                  </Button>

                  <Button
                    onClick={() => setNightActivity('meditation')}
                      className="w-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 hover:from-indigo-500/30 hover:to-purple-500/30 border border-indigo-400/30 text-white font-semibold py-4 rounded-2xl transition-colors duration-300"
                  >
                    🌙 Guided Sleep Meditation
                  </Button>

                  <Button
                    onClick={() => setCurrentView('night')}
                      className="w-full bg-gradient-to-br from-gray-500/20 to-gray-800/20 hover:from-gray-500/30 hover:to-gray-800/30 border border-gray-400/30 text-white font-semibold py-3 rounded-2xl transition-colors duration-300"
                  >
                    ✨ Enter Full Night Mode
                  </Button>
                </div>
              </>
            )}

            {nightActivity === 'candle' && (
              <div className="fixed inset-0 z-50 bg-black">
                <Button
                  onClick={() => setNightActivity(null)}
                    className="absolute top-4 left-4 z-10 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30 border border-blue-400/30 text-white rounded-2xl px-4 py-2 transition-colors duration-300"
                >
                  ← Back to Night Options
                </Button>
                <CandleGazingMode
                  isActive={true}
                  duration={600}
                  onComplete={() => setNightActivity(null)}
                  onBack={() => setNightActivity(null)}
                />
              </div>
            )}

            {nightActivity === 'journal' && (
              <div className="space-y-4">
                <Button
                  onClick={() => setNightActivity(null)}
                    className="mb-4 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30 border border-blue-400/30 text-white rounded-2xl px-4 py-2 transition-colors duration-300"
                >
                  ← Back to Night Options
                </Button>
                <SolarJournal mode="evening" onClose={() => setNightActivity(null)} />
              </div>
            )}

            {nightActivity === 'meditation' && (
              <div className="space-y-4">
                <Button
                  onClick={() => setNightActivity(null)}
                    className="mb-4 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30 border border-blue-400/30 text-white rounded-2xl px-4 py-2 transition-colors duration-300"
                >
                  ← Back to Night Options
                </Button>
                  <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                    <h3 className="text-title-md text-white font-semibold mb-4 text-center">🌙 Sleep Meditation</h3>
                    <p className="text-body-md text-white/60 mb-6 text-center leading-relaxed">
                    A guided meditation to prepare your consciousness for restorative sleep and prophetic dreams.
                  </p>
                  <div className="text-center">
                      <Button className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 hover:from-indigo-500/30 hover:to-purple-500/30 border border-indigo-400/30 text-white font-semibold py-3 px-6 rounded-2xl transition-colors duration-300">
                      ▶️ Begin Meditation
                    </Button>
                  </div>
                </div>
              </div>
            )}
            </div>
          </TabsContent>

          {/* UPLOAD TAB - Premium Design Applied */}
          {isFounder && (
            <TabsContent value="upload" className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
              <div className="px-6 pt-6 pb-24">
                <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6 shadow-[0_0_20px_rgba(59,130,246,0.1)] mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Upload className="w-6 h-6 text-amber-400" />
                    <h2 className="text-title-md text-white font-semibold">🔥 Founder Voice Upload</h2>
                </div>
                  <p className="text-body-md text-white/60 text-center">
                  Upload your personal meditation recordings
                </p>
              </div>

                <div className="bg-gradient-to-br from-white/10 to-blue-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                  <p className="text-title-sm text-white text-center font-medium">
                  🏆 Founder Exclusive Feature
                </p>
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>

        <div className="h-16" />
      </div>

      {/* Palming Ritual Modal */}
      {showPalmingRitual && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <PalmingRitual
            onComplete={() => {
              setShowPalmingRitual(false);
              setShowPostGazeRitual(true);
            }}
            onClose={() => setShowPalmingRitual(false)}
          />
        </div>
      )}

      {/* Post-Gaze Ritual Modal */}
      {showPostGazeRitual && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <PostGazeRitual
            onComplete={() => setShowPostGazeRitual(false)}
            onJournalOpen={() => {
              setJournalMode('day');
              setShowPostGazeRitual(false);
            }}
            gazingDuration={300}
          />
        </div>
      )}

      {/* PaywallModal */}
      <PaywallModal
        isOpen={showPaywall}
        onClose={handlePaywallClose}
        userId="test-user-1"
        email="user@sun44.com"
        onSuccess={() => {
          console.log('Payment successful!');
          setShowPaywall(false);
        }}
      />

      {/* Solar Orbs System */}
      <SolarOrbsSystem
        isOpen={showSolarOrbs}
        onClose={() => setShowSolarOrbs(false)}
        onUpgrade={() => {
          console.log('Upgrade to Solar Adept');
          setShowSolarOrbs(false);
        }}
        userId="test-user-1"
      />


      {/* Solar Window Manager */}
      <SolarWindowManager onRitualComplete={() => {}} />

      {/* Solar Window Settings */}
      {showSolarWindowSettings && (
        <SolarWindowSettings 
          onClose={() => {
            console.log('Closing Solar Window Settings');
            setShowSolarWindowSettings(false);
          }} 
        />
      )}
    </div>
  );
}
