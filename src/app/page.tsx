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
import { SessionHistoryScreen } from "./components/SessionHistoryScreen";
// import { AnalyticsDashboard } from "./components/AnalyticsDashboard"; // TODO: Create when disk space available
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
import { useNetworkStatus, withTimeout } from "./hooks/useNetworkStatus";
import { OfflineBanner } from "./components/OfflineBanner";

export default function App() {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerProgress, setTimerProgress] = useState(0);
  const [currentView, setCurrentView] = useState<'main' | 'night'>('main');
  const [showOnboarding, setShowOnboarding] = useState(false); // FORCE BYPASS - Always false
  const [showNewOnboarding, setShowNewOnboarding] = useState(false);
  const [flareNotification, setFlareNotification] = useState<string | null>(null);
  const [showAskTheOracle, setShowAskTheOracle] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showSolarOrbs, setShowSolarOrbs] = useState(false);
  const [showSolarWindowSettings, setShowSolarWindowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [homeScreen, setHomeScreen] = useState<"main" | "history">("main");
  const [autoStartTimer, setAutoStartTimer] = useState(false);
  const [journalMode, setJournalMode] = useState<'day' | 'evening'>('day');
  const [activeRitual, setActiveRitual] = useState<'palming' | 'barefoot' | 'journal' | 'scrolls' | 'cloud-gazing' | 'candle-gazing' | 'meditation' | null>(null);
  const [showPalmingRitual, setShowPalmingRitual] = useState(false);
  const [showPostGazeRitual, setShowPostGazeRitual] = useState(false);
  const [nightActivity, setNightActivity] = useState<'candle' | 'journal' | 'meditation' | null>(null);
  const [learnSection, setLearnSection] = useState<'main' | 'guide' | 'content' | 'unlocks' | 'levels' | 'scrolls' | 'truth-serum' | 'oracle-qa' | 'journey' | 'eye-practices' | 'black-sun'>('main');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true); // Add loading state
  const supabase = createClient();
  const { isOnline } = useNetworkStatus();

  // Define checkAuth BEFORE useEffect to avoid reference issues
  const checkAuth = async () => {
    // Only run on client side
    if (typeof window === 'undefined') {
      return;
    }

    try {
      // Check if Supabase client is available - MUST check before any await
      if (!supabase) {
        console.warn('Supabase client not available - using dev bypass or mock mode');
        setIsAuthenticated(false);
        setUser(null);
        setAuthLoading(false); // Mark auth check as complete
        return;
      }
      
      // Use getSession() so refresh restores auth from storage.
      // When offline, we still don't want to hang the UI if something blocks, so bound it with a timeout.
      const { data, error: authError } = await withTimeout(
        supabase.auth.getSession(),
        isOnline ? 8000 : 1200,
        'supabase.auth.getSession'
      );
      const user = data?.session?.user || null;
      
      // Now use user and authError variables instead of destructuring
      
      // Handle refresh token errors - use the variables we defined above
      if (authError) {
        const isRefreshTokenError = authError.message?.includes('Refresh Token') || 
                                   authError.message?.includes('refresh_token') ||
                                   authError.status === 401;
        
        if (isRefreshTokenError) {
          console.log('Invalid refresh token detected, clearing session...');
          // Clear invalid session
          try {
            if (supabase) {
              await supabase.auth.signOut();
            }
          } catch (signOutError) {
            console.error('Error signing out:', signOutError);
          }
          // Clear any stored auth data
          if (typeof window !== 'undefined') {
            localStorage.removeItem('dev_bypass');
            localStorage.removeItem('dev_email');
          }
          setIsAuthenticated(false);
          setUser(null);
          return;
        }
      }
      
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setAuthLoading(false); // Mark auth check as complete
    } catch (error: any) {
      console.error('Auth check error:', error);
      
      // Check if it's a refresh token error
      const isRefreshTokenError = error?.message?.includes('Refresh Token') || 
                               error?.message?.includes('refresh_token') ||
                               error?.status === 401;
      
      if (isRefreshTokenError) {
        console.log('Invalid refresh token detected in catch, clearing session...');
        try {
          if (supabase) {
            await supabase.auth.signOut();
          }
        } catch (signOutError) {
          console.error('Error signing out:', signOutError);
        }
        if (typeof window !== 'undefined') {
          localStorage.removeItem('dev_bypass');
          localStorage.removeItem('dev_email');
        }
        setIsAuthenticated(false);
        setUser(null);
        return;
      }
      
      setIsAuthenticated(false);
      setUser(null);
      setAuthLoading(false); // Mark auth check as complete
    }
  };

  // Check authentication on mount - AFTER checkAuth is defined
  useEffect(() => {
    // Properly handle async function in useEffect
    let mounted = true;
    // NOTE: Do not auto-enable dev bypass. If you want it, set it manually in devtools:
    // localStorage.setItem('dev_bypass','true'); localStorage.setItem('dev_email','you@example.com');
    
    const runAuthCheck = async () => {
      try {
        if (typeof window !== 'undefined') {
          await checkAuth();
        }
      } catch (error) {
        console.error('Error in auth check:', error);
        // Silently handle errors to prevent panic
        if (mounted) {
          setIsAuthenticated(false);
          setUser(null);
          setAuthLoading(false); // Mark auth check as complete even on error
        }
      }
    };

    runAuthCheck();

    // Keep UI in sync with auth events (sign-in/sign-out/refresh)
    const { data: sub } = supabase?.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      const nextUser = session?.user ?? null;
      setUser(nextUser);
      setIsAuthenticated(!!nextUser);
      setAuthLoading(false);
    }) ?? { data: { subscription: null as any } };

    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, []); // Empty deps array - only run on mount

  const handleAuthSuccess = async () => {
    try {
      await checkAuth();
    } catch (error) {
      console.error('Error in handleAuthSuccess:', error);
      // Silently handle errors to prevent panic
    }
  };

  // Simplified state management - no complex subscription hook
  const loading = false;
  const isPremium = true;
  const isFounder = true;
  const hasAccess = () => true;

  // TEMPORARY: Auto-authenticate for development/debugging
  // Set dev bypass in localStorage: localStorage.setItem('dev_bypass', 'true'); localStorage.setItem('dev_email', 'cobyobi@gmail.com');
  
  // Show loading state while auth check is in progress
  if (authLoading) {
    return (
      <>
        <OfflineBanner isOnline={isOnline} />
      <div className="min-h-screen bg-gradient-to-br from-[#40C4FF] via-[#4DD0E1] to-[#006064] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300/20 to-amber-400/20 blur-3xl scale-150"></div>
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400/90 to-amber-500/90 flex items-center justify-center shadow-[0_0_40px_rgba(251,191,36,0.5)] border border-yellow-300/30">
              <span className="text-black text-2xl font-bold tracking-tight">44</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-yellow-400 mb-2">SUNGAZE</h1>
          <p className="text-white/60 mb-4">Loading...</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto"></div>
        </div>
      </div>
      </>
    );
  }

  // Show auth screen if not authenticated (including Profile tab)
  if (!isAuthenticated) {
    return (
      <>
        <OfflineBanner isOnline={isOnline} />
        <AuthScreen onAuthSuccess={handleAuthSuccess} />
      </>
    );
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
    return (
      <>
        <OfflineBanner isOnline={isOnline} />
        <OnboardingFlow
          onComplete={() => {
            setShowOnboarding(false);
            setShowNewOnboarding(false);
          }}
        />
      </>
    );
  }

  // Show night mode
  if (currentView === 'night') {
    return (
      <>
        <OfflineBanner isOnline={isOnline} />
        <NightMode
          onJournalOpen={(mode) => {
            setJournalMode('evening');
            setCurrentView('main');
          }}
        />
      </>
    );
  }

  return (
    <div className="safe-area min-h-screen bg-gradient-to-b from-[#40C4FF] via-[#4DD0E1] to-[#B3E5FC] text-white relative overflow-hidden">
      <OfflineBanner isOnline={isOnline} />
      {/* Background - Luxury Sunrise/Sunset Gradient Theme with Pinkish Tones */}

      {/* Surreal Landscape Background Image - Add your landscape image to /public/landscape-background.jpg */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'url(/landscape-background.jpg)',
        }}
      />

      {/* Enhanced Sun Background - Multiple Layers for Depth */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Core Sun - Bright yellow-white center with strong glow */}
        <div className="absolute top-1/3 right-1/4 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-radial from-yellow-100 via-yellow-200 to-yellow-300 shadow-[0_0_60px_rgba(255,255,224,0.9),0_0_120px_rgba(255,255,224,0.6)] animate-float-gentle" />
        
        {/* Corona Layer - Orange-yellow ring around core */}
        <div className="absolute top-1/3 right-1/4 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-radial from-yellow-200/80 via-orange-200/60 to-orange-300/40 blur-xl animate-float-gentle"
             style={{ animationDelay: '0.5s' }} />
        
        {/* Outer Glow - Large soft yellow-orange halo */}
        <div className="absolute top-1/3 right-1/4 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-radial from-yellow-200/50 via-orange-200/40 via-pink-200/30 to-transparent blur-3xl animate-float-gentle"
             style={{ animationDelay: '1s' }} />
        
        {/* Extended Halo - Pink-orange glow matching reference */}
        <div className="absolute top-1/3 right-1/4 transform -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] rounded-full bg-gradient-radial from-pink-200/30 via-orange-200/20 to-transparent blur-[4rem] animate-float-gentle"
             style={{ animationDelay: '1.5s' }} />
        
        {/* Water Reflection - Subtle reflection below sun */}
        <div className="absolute top-1/2 right-1/4 transform -translate-x-1/2 translate-y-1/2 w-[32rem] h-32 rounded-full bg-gradient-radial from-yellow-200/20 via-orange-200/15 to-transparent blur-2xl scale-y-50 animate-float-gentle"
             style={{ animationDelay: '2s' }} />
        
        {/* Subtle orbiting elements - refined */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-conic from-pink-200/15 via-yellow-200/20 via-orange-200/15 to-pink-200/15 animate-spin-slow" />
      </div>

      {/* Cool teal overlay for app interface (matches the new sky palette) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#40C4FF]/55 via-[#4DD0E1]/50 to-[#006064]/70 backdrop-blur-xl" />

      {/* Solar Flare Notification */}
      {flareNotification && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 rounded-full shadow-[0_8px_32px_rgba(251,146,60,0.4)] backdrop-blur-xl border border-orange-300/30 animate-float-gentle">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse-slow" />
            <span className="text-sm font-medium">{flareNotification}</span>
          </div>
        </div>
      )}

      {/* App container */}
      <div className="relative z-10 max-w-sm mx-auto min-h-screen px-6 pb-24">
        {/* Small logo mark (top-left) */}
        <div className="fixed top-4 left-4 z-[60]">
          <div className="w-9 h-9 rounded-2xl bg-black/35 border border-white/15 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.25)] flex items-center justify-center">
            <img src="/sun44-mark.svg" alt="Sungaze" className="w-6 h-6" />
          </div>
        </div>

        {/* Header */}
        <div className="pt-20 pb-12 text-center">
          <div className="mb-8">
            {/* 44 mark (black-disc version) */}
            <div className="relative inline-flex items-center justify-center mb-6">
              <img
                src="/sun44-mark-black.svg"
                alt="SUNGAZE 44"
                className="w-44 h-44 drop-shadow-[0_18px_45px_rgba(0,0,0,0.45)]"
              />
            </div>

            <h1 className="text-display-3xl text-white tracking-[0.12em] font-bold mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7),0_4px_16px_rgba(0,0,0,0.5),0_1px_3px_rgba(255,215,0,0.35)] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_32px_rgba(255,215,0,0.22)] filter brightness-110 animate-fade-in-slow">
              SUNGAZE
            </h1>

            {/* Bright sun orb (under SUNGAZE) */}
            <div className="mx-auto mt-3 mb-4 w-44 h-44 relative">
              {/* outer glow */}
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_45%_40%,rgba(255,255,255,0.35),rgba(255,235,59,0.55)_28%,rgba(255,193,7,0.55)_55%,rgba(255,152,0,0.25)_72%,transparent_78%)] blur-xl" />
              {/* sun disc */}
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_45%_40%,#FFF59D_0%,#FFEB3B_32%,#FFC107_62%,#FF9800_80%)] shadow-[0_0_50px_rgba(255,200,0,0.35)]" />
              {/* Orbit ring */}
              <div className="absolute inset-0 rounded-full border-2 border-[#FFEB3B]/70 shadow-[0_0_22px_rgba(255,235,59,0.35)]" />
              {/* Orbiting dots (spin) */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '15s' }}>
                <div className="w-2 h-2 bg-[#FFF8E1] rounded-full absolute -top-1 left-1/2 transform -translate-x-1/2 shadow-[0_0_12px_rgba(255,248,225,0.9)]" />
                <div className="w-1 h-1 bg-[#FFEB3B] rounded-full absolute top-1/2 -right-1 transform -translate-y-1/2 shadow-[0_0_14px_rgba(255,235,59,0.98)]" />
                <div className="w-1.5 h-1.5 bg-[#FFEB3B] rounded-full absolute -bottom-1 left-1/2 transform -translate-x-1/2 shadow-[0_0_16px_rgba(255,235,59,0.98)]" />
                <div className="w-1 h-1 bg-[#FFEB3B] rounded-full absolute top-1/2 -left-1 transform -translate-y-1/2 shadow-[0_0_14px_rgba(255,235,59,0.98)]" />
              </div>
              {/* rings */}
              <div className="absolute inset-[10px] rounded-full border-2 border-white/40" />
              <div className="absolute inset-[22px] rounded-full border border-white/25" />
              {/* center dot */}
              <div className="absolute left-1/2 top-1/2 w-5 h-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFF59D] shadow-[0_0_18px_rgba(255,245,157,0.75)]" />
            </div>

            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent mx-auto mb-4 shadow-[0_0_4px_rgba(255,255,255,0.5),0_0_8px_rgba(255,255,255,0.3)]" />
          </div>

          <div className="bg-black/40 backdrop-blur-md rounded-2xl px-6 py-5 border border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_16px_rgba(0,0,0,0.3),0_8px_32px_rgba(0,0,0,0.2)]">
            <p className="text-caption text-white mb-4 tracking-wider font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.6),0_1px_2px_rgba(0,0,0,0.4)]">
              LIGHT NUTRITION RITUAL
            </p>

            <div className="space-y-4">
              <p className="text-body-md text-white font-semibold leading-relaxed tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
                Transform sunlight into cellular nourishment through ancient gazing meditation.
              </p>
              <p className="text-body-sm text-white font-medium italic leading-relaxed tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
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

          {/* HOME TAB - Sunrise/Sunset Theme */}
          <TabsContent value="home" className="min-h-screen bg-gradient-to-br from-[#40C4FF] via-[#4DD0E1] to-[#006064] text-white">
            {homeScreen === "history" ? (
              <SessionHistoryScreen onBack={() => setHomeScreen("main")} />
            ) : (
            <div className="px-6 pt-6 pb-24 space-y-6">
            <SolarWindow
              onStartGazing={() => {
                setActiveTab("gaze");
                setAutoStartTimer(true);
              }}
            />

              {/* Premium Status - Dark glass for readability */}
              <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_4px_16px_rgba(0,0,0,0.3)]">
              <div className="flex items-center justify-center gap-2 mb-2">
                  <Crown className="w-5 h-5 text-orange-500" />
                  <h3 className="text-title-sm text-white font-bold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.7),0_1px_2px_rgba(0,0,0,0.5)]">Sacred Access Unlocked</h3>
              </div>
                <p className="text-body-sm text-white mb-2 font-semibold tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">First Witness of the Flame</p>
                <p className="text-body-sm text-white font-bold mb-3 tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.7),0_1px_2px_rgba(255,215,0,0.4)]">Founder #1/444</p>

                {/* Solar Window Settings Button */}
                <button
                  onClick={() => {
                    console.log('Solar Window Settings button clicked');
                    setShowSolarWindowSettings(true);
                  }}
                  className="mt-2 px-4 py-2 bg-gradient-to-r from-[#40C4FF] to-[#4DD0E1] text-white font-semibold rounded-lg hover:opacity-95 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_8px_rgba(77,208,225,0.25),0_4px_16px_rgba(77,208,225,0.18)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_12px_rgba(77,208,225,0.35),0_8px_24px_rgba(77,208,225,0.25)]"
                >
                  Solar Window Settings
                </button>
            </div>

              {/* Session History - Luxury Design */}
              <div>
                <SessionHistoryScreen onBack={() => setHomeScreen("main")} previewMode={true} onOpenFullHistory={() => setHomeScreen("history")} />
              </div>

              {/* Ask the Oracle - Luxury Black Design */}
              <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
              <button
                onClick={() => setShowAskTheOracle(!showAskTheOracle)}
                  className="w-full flex items-center justify-between text-left hover:bg-white/5 transition-all duration-300 rounded-xl p-2"
              >
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center shadow-[0_0_8px_rgba(255,215,0,0.4)]">
                    <span className="text-black text-xs font-bold">🔮</span>
                  </div>
                    <h2 className="text-title-sm text-white font-semibold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    Ask the Oracle
                  </h2>
                </div>
                <ChevronDown
                    className={`w-5 h-5 text-white/80 transition-transform duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] ${showAskTheOracle ? 'rotate-180' : ''}`}
                />
              </button>

              {showAskTheOracle && (
                  <div className="mt-6">
                    <OracleQA />
                </div>
              )}
              </div>
              
            </div>
            )}
          </TabsContent>

          {/* GAZE TAB - Sunrise/Sunset Theme */}
          <TabsContent value="gaze" className="min-h-screen bg-gradient-to-br from-[#40C4FF] via-[#4DD0E1] to-[#006064] text-white">
            <div className="px-6 pt-6 pb-24">
              <div className="text-center mb-6">
                <div className="bg-gradient-to-br from-[#40C4FF]/18 to-[#4DD0E1]/14 backdrop-blur-xl border border-white/15 rounded-2xl p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_2px_8px_rgba(0,0,0,0.2),0_4px_16px_rgba(77,208,225,0.12),0_8px_32px_rgba(77,208,225,0.08)]">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Sun className="w-6 h-6 text-yellow-300" />
                    <h2 className="text-title-md text-white font-bold tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.7),0_1px_3px_rgba(0,0,0,0.5)]">☀️ Direct Sun Gazing</h2>
                </div>
                  <p className="text-body-md text-white font-medium tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">Ancient light nutrition practice</p>
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
                  className="bg-gradient-to-br from-sky-500/26 to-cyan-500/22 hover:from-sky-500/32 hover:to-cyan-500/28 border border-sky-300/30 text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_8px_rgba(56,189,248,0.2),0_4px_16px_rgba(56,189,248,0.12)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_12px_rgba(56,189,248,0.28),0_8px_24px_rgba(56,189,248,0.2)]"
                >
                  🔓 Sacred Unlock
                </Button>
              </div>
              </div>
            </div>
          </TabsContent>

          {/* CLOUDS TAB - Now empty, cloud gazing moved to Discover */}
          <TabsContent value="clouds" className="min-h-screen bg-gradient-to-br from-[#40C4FF] via-[#4DD0E1] to-[#006064] text-white">
            <div className="px-6 pt-6 pb-24">
              <div className="text-center mb-6">
                <div className="bg-gradient-to-br from-[#40C4FF]/18 to-[#4DD0E1]/14 backdrop-blur-xl border border-white/15 rounded-2xl p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_2px_8px_rgba(0,0,0,0.2),0_4px_16px_rgba(77,208,225,0.12),0_8px_32px_rgba(77,208,225,0.08)]">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Cloud className="w-6 h-6 text-yellow-300" />
                    <h2 className="text-title-md text-white font-semibold">☁️ Cloud Section</h2>
                  </div>
                  <p className="text-body-md text-white font-medium tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">Cloud gazing has moved to Discover section</p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* PROFILE TAB - Already has premium design */}
          <TabsContent value="profile" className="space-y-4">
            <ProfileScreen />
          </TabsContent>

          {/* LEARN TAB - Premium Design Applied */}
          <TabsContent value="learn" className="min-h-screen bg-gradient-to-br from-[#40C4FF] via-[#4DD0E1] to-[#006064] text-white">
            <div className="px-6 pt-6 pb-24">
            {learnSection === 'main' && (
              <>
                <div className="text-center mb-6">
                    <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <BookOpen className="w-6 h-6 text-yellow-300 drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]" />
                        <h2 className="text-title-md text-white font-semibold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Solar Master Learning</h2>
                    </div>
                      <p className="text-body-md text-white font-semibold leading-relaxed tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                      Unlock guided content and advanced techniques
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={() => setLearnSection('black-sun')}
                    className="w-full bg-black/40 backdrop-blur-lg border border-white/10 hover:bg-black/50 text-white font-semibold py-4 rounded-2xl transition-colors duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.3)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                  >
                    Black Sun
                  </Button>

                  {isPremium && (
                    <Button
                      onClick={() => setLearnSection('scrolls')}
                      className="w-full bg-black/40 backdrop-blur-lg border border-white/10 hover:bg-black/50 text-white font-semibold py-4 rounded-2xl transition-colors duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.3)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                    >
                      📜 Truth Scrolls (Premium)
                    </Button>
                  )}

                  <Button
                    onClick={() => setLearnSection('content')}
                      className="w-full bg-black/40 backdrop-blur-lg border border-white/10 hover:bg-black/50 text-white font-semibold py-4 rounded-2xl transition-colors duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.3)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                  >
                    Solar Content
                  </Button>

                  <Button
                    onClick={() => setLearnSection('truth-serum')}
                      className="w-full bg-black/40 backdrop-blur-lg border border-white/10 hover:bg-black/50 text-white font-semibold py-4 rounded-2xl transition-colors duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.3)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                  >
                    Gems from the Sun
                  </Button>

                  <Button
                    onClick={() => setLearnSection('oracle-qa')}
                      className="w-full bg-black/40 backdrop-blur-lg border border-white/10 hover:bg-black/50 text-white font-semibold py-4 rounded-2xl transition-colors duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.3)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                  >
                    Ask the Oracle
                  </Button>

                  <Button
                    onClick={() => setLearnSection('journey')}
                      className="w-full bg-black/40 backdrop-blur-lg border border-white/10 hover:bg-black/50 text-white font-semibold py-4 rounded-2xl transition-colors duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.3)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                  >
                    9 Month Solar Journey
                  </Button>

                  <Button
                    onClick={() => setLearnSection('eye-practices')}
                      className="w-full bg-black/40 backdrop-blur-lg border border-white/10 hover:bg-black/50 text-white font-semibold py-4 rounded-2xl transition-colors duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.3)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                  >
                    Eye Practices
                  </Button>



                    <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
                      <h3 className="text-title-sm text-white font-semibold mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Quick Learning Modules</h3>
                    <div className="grid grid-cols-1 gap-3">
                        <div className="bg-black/50 backdrop-blur-md border border-white/10 hover:bg-black/60 rounded-2xl p-3 transition-colors duration-300">
                          <p className="text-body-sm text-white font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">• Foundation: Solar Gazing Basics</p>
                          <p className="text-caption text-white font-semibold drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">Safe practice fundamentals</p>
                      </div>
                        <div className="bg-black/50 backdrop-blur-md border border-white/10 hover:bg-black/60 rounded-2xl p-3 transition-colors duration-300">
                          <p className="text-body-sm text-white font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">• Intermediate: Light Nutrition</p>
                          <p className="text-caption text-white font-semibold drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">Energy absorption techniques</p>
                      </div>
                        <div className="bg-black/50 backdrop-blur-md border border-white/10 hover:bg-black/60 rounded-2xl p-3 transition-colors duration-300">
                          <p className="text-body-sm text-white font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">• Advanced: Consciousness Expansion</p>
                          <p className="text-caption text-white font-semibold drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">Deep meditative states</p>
                      </div>
                        <div className="bg-black/50 backdrop-blur-md border border-white/10 hover:bg-black/60 rounded-2xl p-3 transition-colors duration-300">
                          <p className="text-body-sm text-white font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">• Master: Sacred Alchemy</p>
                          <p className="text-caption text-white font-semibold drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">Transformation practices</p>
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
                    className="mb-4 bg-black/40 backdrop-blur-lg border border-white/10 hover:bg-black/50 text-white rounded-2xl px-4 py-2 transition-colors duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.3)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                >
                  ← Back to Learning Hub
                </Button>
                <SolarContentViewer 
                  currentDay={1} 
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
                    className="mb-4 bg-black/40 backdrop-blur-lg border border-white/10 hover:bg-black/50 text-white rounded-2xl px-4 py-2 transition-colors duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.3)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
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
                    className="mb-4 bg-black/40 backdrop-blur-lg border border-white/10 hover:bg-black/50 text-white rounded-2xl px-4 py-2 transition-colors duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.3)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
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
                    className="mb-4 bg-black/40 backdrop-blur-lg border border-white/10 hover:bg-black/50 text-white rounded-2xl px-4 py-2 transition-colors duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.3)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                >
                  ← Back to Learning Hub
                </Button>
                <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl text-white font-bold mb-2 drop-shadow-[0_3px_6px_rgba(0,0,0,0.9)]">9 Month Solar Journey</h2>
                    <p className="text-white/90 text-sm font-semibold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                      Your transformative path to solar consciousness
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-black/50 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                      <h3 className="text-xl text-white font-semibold mb-4 text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        The Three Phases of Cellular Restoration
                      </h3>
                      <p className="text-white/90 text-sm font-medium mb-6 text-center tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                        Practitioners following the traditional sungazing protocol report profound transformations in their body's natural healing capacity:
                      </p>
                      
                      <div className="space-y-6">
                        {/* Phase 1 */}
                        <div className="bg-black/45 backdrop-blur-md rounded-xl p-4 border border-white/10">
                          <h4 className="text-lg text-white font-semibold mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Phase 1 (0-3 months):</h4>
                          <h5 className="text-md text-white font-semibold mb-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">Mental & Neurological Reset</h5>
                          <p className="text-white/90 text-sm font-medium tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                            Practitioners report complete reversal of mood imbalances, cognitive fog, sleep disorders, and stress-related conditions. The pineal gland activation appears to restore natural neurotransmitter production, eliminating the need for synthetic interventions.
                          </p>
                        </div>
                        
                        {/* Phase 2 */}
                        <div className="bg-black/45 backdrop-blur-md rounded-xl p-4 border border-white/10">
                          <h4 className="text-lg text-white font-semibold mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Phase 2 (3-6 months):</h4>
                          <h5 className="text-md text-white font-semibold mb-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">Physical Regeneration</h5>
                          <p className="text-white/90 text-sm font-medium tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                            The body's cellular repair mechanisms activate dramatically. Chronic inflammatory conditions, autoimmune responses, digestive disorders, and metabolic dysfunctions begin reversing. Many report their bodies healing conditions that had persisted for decades.
                          </p>
                        </div>
                        
                        {/* Phase 3 */}
                        <div className="bg-black/45 backdrop-blur-md rounded-xl p-4 border border-white/10">
                          <h4 className="text-lg text-white font-semibold mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Phase 3 (6-9 months):</h4>
                          <h5 className="text-md text-white font-semibold mb-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">Transcendent Biology</h5>
                          <p className="text-white/90 text-sm font-medium tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                            The body achieves remarkable efficiency, requiring minimal food while maintaining perfect health. Practitioners describe their bodies operating on pure solar energy, with complete elimination of chronic conditions and enhanced longevity markers.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {learnSection === 'black-sun' && (
              <div className="space-y-4">
                <Button
                  onClick={() => setLearnSection('main')}
                  className="mb-4 bg-black/40 backdrop-blur-lg border border-white/10 hover:bg-black/50 text-white rounded-2xl px-4 py-2 transition-colors duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.3)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                >
                  ← Back to Learning Hub
                </Button>

                <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
                  <div className="text-center mb-8">
                    {/* Black Sun + 44 */}
                    <div className="relative w-24 h-24 mx-auto mb-5 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-200/55 via-yellow-300/50 to-yellow-400/35 blur-2xl scale-150" />
                      <div className="absolute inset-0 rounded-full border-2 border-yellow-200/95 shadow-[0_0_26px_rgba(255,230,120,0.95),0_0_85px_rgba(255,215,0,0.55)]" />
                      <div className="absolute inset-[10px] rounded-full bg-black/90 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.10),inset_0_-18px_40px_rgba(0,0,0,0.6)]" />
                      <span className="relative text-[#FFEB3B] text-4xl font-extrabold tracking-tight drop-shadow-[0_10px_22px_rgba(0,0,0,0.75),0_0_22px_rgba(255,215,0,0.65)]">
                        44
                      </span>
                    </div>

                    <h2 className="text-2xl text-white font-bold mb-2 drop-shadow-[0_3px_6px_rgba(0,0,0,0.9)]">
                      Black Sun
                    </h2>
                    <p className="text-white text-sm font-semibold tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.65)]">
                      Why the sun is black with “44” at its center
                    </p>
                  </div>

                  <div className="space-y-4 text-white/95">
                    {[
                      "With continued practice, something unexpected happens: the sun stops feeling hot.",
                      "At first, the light can feel sharp or intense, largely because the body is conditioned to tense around it. But as the gaze steadies and the nervous system relaxes, the sensation of heat begins to drop away. Many practitioners report that the sun no longer feels burning or aggressive. Instead, it becomes warm, then neutral, and in some cases noticeably cool. This isn’t because the sun has changed, but because perception has. The body stops resisting, and resistance is what generates the feeling of heat.",
                      "This shift is one of the clearest signs that the practice is maturing.",
                      "When resistance drops, the sun is no longer experienced as an external force acting on you. It begins to feel more like a field you are inside of. The eyes stop squinting. The breath deepens. The mind quiets. Heat, which is often amplified by fear and tension, dissipates. What remains is a steady, almost temperatureless clarity.",
                      "At this stage, more advanced practitioners often notice a distinct visual change: an inner black circle appears at the center of the sun.",
                      "This is sometimes referred to as the “black hole sun,” though it has nothing to do with astronomy and everything to do with perception. The black circle is stable, not a flicker or afterimage. It sits at the core of the solar disc and becomes clearer the longer one maintains relaxed focus. Importantly, this black center does not swallow the light. The light organizes around it. The sun begins to look less like a flat ball of fire and more like a system with structure.",
                      "This is a critical insight.",
                      "The sun is not experienced only as radiation or heat. It behaves more like a portal, operating through contrast: brightness surrounding stillness, light emerging from a dark center. Many ancient cultures described the sun this way — not just as a source of energy, but as a gateway or axis point. Sustained gazing appears to recreate this understanding experientially, not symbolically.",
                      "This is why the sun in my app is represented as black.",
                      "The black sun with “44” at its center isn’t aesthetic or ironic. It reflects what long-duration gazing reveals: the core of the sun is perceived as dark, stable, and organizing. The 44 minutes represents the traditional upper range that practitioners work toward, not casually, but through gradual conditioning. It marks the point where intensity gives way to coherence, and where the sun stops feeling external and starts functioning like an interface.",
                      "In simple terms, the sun doesn’t become less powerful as you gaze longer. It becomes more precise. Heat fades. Structure appears. And what once seemed blinding reveals a calm center that changes how the entire experience is understood."
                    ].map((paragraph, idx) => (
                      <p
                        key={idx}
                        className="text-sm md:text-base leading-relaxed font-medium tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.75)]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {learnSection === 'eye-practices' && (
              <div className="space-y-4">
                <Button
                  onClick={() => setLearnSection('main')}
                    className="mb-4 bg-black/40 backdrop-blur-lg border border-white/10 hover:bg-black/50 text-white rounded-2xl px-4 py-2 transition-colors duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.3)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                >
                  ← Back to Learning Hub
                </Button>
                <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl text-white font-bold mb-2 drop-shadow-[0_3px_6px_rgba(0,0,0,0.9)]">Eye Practices</h2>
                    <p className="text-white text-sm font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">Strengthen your vision and enhance focus with ancient techniques</p>
                  </div>
                  
                  <div className="space-y-8">
                    {/* Trataka */}
                    <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-black/60 transition-colors duration-300">
                      <h3 className="text-xl text-white font-semibold mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">1) Trataka – Candle or Dot Gazing</h3>
                      <p className="text-white text-sm mb-4 font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">Purpose: Builds concentration, strengthens eyes, and calms the mind.</p>
                      
                      <div className="mb-4">
                        <h4 className="text-lg text-white font-semibold mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Steps:</h4>
                        <ul className="text-white text-sm space-y-1 ml-4 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                          <li>• Sit in meditation posture</li>
                          <li>• Place candle flame or black dot at eye level, 2–3 ft away</li>
                          <li>• Gaze steadily without blinking until eyes water</li>
                          <li>• Close eyes and visualize flame at the brow</li>
                          <li>• Practice 5–10 mins daily</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-lg text-white font-semibold mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Benefits:</h4>
                        <ul className="text-white text-sm space-y-1 ml-4 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                          <li>• Improves focus, memory, willpower</li>
                          <li>• Enhances vision over time</li>
                          <li>• Activates Third Eye (Ajna Chakra)</li>
                        </ul>
                      </div>
                    </div>

                    {/* Yogic Eye Movements */}
                    <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-black/60 transition-colors duration-300">
                      <h3 className="text-xl text-white font-semibold mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">2) Yogic Eye Movements</h3>
                      <p className="text-white text-sm mb-4 font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">Purpose: Increases eye flexibility, coordination, and alertness.</p>
                      
                      <div className="mb-4">
                        <h4 className="text-lg text-white font-semibold mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Steps:</h4>
                        <ul className="text-white text-sm space-y-1 ml-4 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
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
                        <h4 className="text-lg text-white font-semibold mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Benefits:</h4>
                        <ul className="text-white text-sm space-y-1 ml-4 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                          <li>• Strengthens weak muscles</li>
                          <li>• Boosts coordination and focus</li>
                        </ul>
                      </div>
                    </div>

                    {/* Palming */}
                    <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-black/60 transition-colors duration-300">
                      <h3 className="text-xl text-white font-semibold mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">3) Palming</h3>
                      <p className="text-white text-sm mb-4 font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">Purpose: Relieves strain, relaxes nerves, and calms the mind.</p>
                      
                      <div className="mb-4">
                        <h4 className="text-lg text-white font-semibold mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Steps:</h4>
                        <ul className="text-white text-sm space-y-1 ml-4 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                          <li>• Rub palms together until warm</li>
                          <li>• Gently cup palms over closed eyes</li>
                          <li>• Breathe deeply, feel warmth soothe eyes</li>
                          <li>• Hold 2–3 mins</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-lg text-white font-semibold mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Benefits:</h4>
                        <ul className="text-white text-sm space-y-1 ml-4 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
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
                    className="mb-4 bg-black/40 backdrop-blur-lg border border-white/10 hover:bg-black/50 text-white rounded-2xl px-4 py-2 transition-colors duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.3)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
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
                    className="mb-4 bg-black/40 backdrop-blur-lg border border-white/10 hover:bg-black/50 text-white rounded-2xl px-4 py-2 transition-colors duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.3)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
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
          <TabsContent value="rituals" className="min-h-screen bg-gradient-to-br from-[#40C4FF] via-[#4DD0E1] to-[#006064] text-white">
            <div className="px-6 pt-6 pb-24">
              {activeRitual === null && (
                <>
                  <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.3)] mb-6">
                    <h2 className="text-title-md text-white font-semibold text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Sacred Rituals</h2>
                  </div>

                  <div className="space-y-4">
                    <div 
                      onClick={() => setActiveRitual('meditation')}
                      className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.3)] cursor-pointer hover:bg-black/50 transition-colors duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500/20 to-blue-500/20 flex items-center justify-center border border-indigo-400/30 overflow-hidden p-1.5">
                          <img 
                            src="/third-eye-symbol.svg" 
                            alt="Third Eye Chakra (Ajna)" 
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              // Fallback if image doesn't exist yet - show a simple third eye emoji
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent && !parent.querySelector('.fallback-emoji')) {
                                const fallback = document.createElement('div');
                                fallback.className = 'fallback-emoji text-lg';
                                fallback.textContent = '👁️';
                                parent.appendChild(fallback);
                              }
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-title-sm text-white font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Sacred Meditation</h3>
                          <p className="text-body-sm text-white font-medium tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">Premium meditation and music experience</p>
                        </div>
                      </div>
                    </div>

                    <div 
                      onClick={() => setActiveRitual('palming')}
                      className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.3)] cursor-pointer hover:bg-black/50 transition-colors duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-500/18 to-cyan-500/14 flex items-center justify-center border border-sky-300/25">
                          <span className="text-orange-400 text-xl">○</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-title-sm text-white font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Solar Palming</h3>
                          <p className="text-body-sm text-white font-medium tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">Remove sun spots after gazing (3-5 minutes)</p>
                        </div>
                      </div>
                    </div>

                    <div 
                    onClick={() => setActiveRitual('barefoot')}
                      className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.3)] cursor-pointer hover:bg-black/50 transition-colors duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center border border-green-400/30">
                          <span className="text-green-400 text-xl">🦶</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-title-sm text-white font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Barefoot Grounding</h3>
                          <p className="text-body-sm text-white font-medium tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">Earth connection grounding (10-44 minutes)</p>
                        </div>
                      </div>
                    </div>

                    <div 
                    onClick={() => setActiveRitual('journal')}
                      className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.3)] cursor-pointer hover:bg-black/50 transition-colors duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-400/30">
                          <span className="text-purple-400 text-xl">📖</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-title-sm text-white font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Solar Journal & Reflection</h3>
                          <p className="text-body-sm text-white font-medium tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">Document your solar journey and insights</p>
                        </div>
                      </div>
                    </div>

                    <div 
                      onClick={() => setActiveRitual('cloud-gazing')}
                      className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.3)] cursor-pointer hover:bg-black/50 transition-colors duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-400/30">
                          <span className="text-blue-400 text-xl">☁️</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-title-sm text-white font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Cloud Gazing</h3>
                          <p className="text-body-sm text-white font-medium tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">Perfect for beginners or cloudy days (1-5 minutes)</p>
                        </div>
                      </div>
                    </div>

                    <div 
                      onClick={() => setActiveRitual('candle-gazing')}
                      className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.3)] cursor-pointer hover:bg-black/50 transition-colors duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-500/18 to-blue-500/14 flex items-center justify-center border border-sky-300/25">
                          <span className="text-orange-400 text-xl">🕯️</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-title-sm text-white font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Candle Gazing (Trataka)</h3>
                          <p className="text-body-sm text-white font-medium tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">Evening meditation practice (5-15 minutes)</p>
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
              <div className="space-y-2">
                  <div 
                  onClick={() => setActiveRitual(null)}
                    className="mb-2 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-4 shadow-lg cursor-pointer hover:from-blue-500/15 hover:to-indigo-500/15 transition-all duration-300"
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
          <TabsContent value="night" className="min-h-screen bg-gradient-to-br from-[#40C4FF] via-[#4DD0E1] to-[#006064] text-white">
            <div className="px-6 pt-6 pb-24">
            {nightActivity === null && (
              <>
                  <div className="text-center mb-6">
                    <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Sun className="w-6 h-6 text-indigo-400" />
                        <h2 className="text-title-md text-white font-semibold">🌙 Night Practice</h2>
                    </div>
                      <p className="text-body-md text-white font-medium tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">Evening reflection and preparation</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                    <h3 className="text-title-sm text-white font-semibold mb-2">Candle Gazing Moved</h3>
                    <p className="text-body-sm text-white font-medium tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">Candle gazing is now available in the Discover section under Sacred Rituals</p>
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
                    className="mb-4 bg-black/40 backdrop-blur-lg border border-white/10 hover:bg-black/50 text-white rounded-2xl px-4 py-2 transition-colors duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.3)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
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
                    className="mb-4 bg-black/40 backdrop-blur-lg border border-white/10 hover:bg-black/50 text-white rounded-2xl px-4 py-2 transition-colors duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.3)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                >
                  ← Back to Night Options
                </Button>
                  <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                    <h3 className="text-title-md text-white font-semibold mb-4 text-center">🌙 Sleep Meditation</h3>
                    <p className="text-body-md text-white font-medium mb-6 text-center leading-relaxed tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
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
            <TabsContent value="upload" className="min-h-screen bg-gradient-to-br from-[#40C4FF] via-[#4DD0E1] to-[#006064] text-white">
              <div className="px-6 pt-6 pb-24">
                <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6 shadow-[0_0_20px_rgba(59,130,246,0.1)] mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Upload className="w-6 h-6 text-amber-400" />
                    <h2 className="text-title-md text-white font-semibold">🔥 Founder Voice Upload</h2>
                </div>
                  <p className="text-body-md text-white font-medium text-center tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
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
        userId={user?.id || 'anonymous'}
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
        userId={user?.id || 'anonymous'}
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
