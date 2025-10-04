module.exports = [
"[project]/SUNGAZE APP/package.json/src/app/hooks/useProgress.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useProgress",
    ()=>useProgress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/src/app/lib/storage.ts [app-ssr] (ecmascript)");
"use client";
;
;
function useProgress() {
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    // Load progress on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const loadProgress = ()=>{
            // Only run on client-side
            if ("TURBOPACK compile-time truthy", 1) {
                setIsLoading(false);
                return;
            }
            //TURBOPACK unreachable
            ;
        };
        loadProgress();
    }, []);
    // Save progress whenever it changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (progress && !isLoading) {
            __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["localStorage"].saveUserProgress(progress);
        }
    }, [
        progress,
        isLoading
    ]);
    const completePractice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((duration, timeOfDay)=>{
        try {
            const session = {
                date: new Date().toISOString().split('T')[0],
                duration,
                timeOfDay
            };
            // Add the session and let storage handle progress updates
            __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["localStorage"].addPracticeSession(session);
            // Reload progress from storage
            const updatedProgress = __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["localStorage"].getUserProgress();
            setProgress(updatedProgress);
        } catch (error) {
            console.error('Error completing practice:', error);
        }
    }, []);
    const advanceDay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!progress || progress.currentDay >= 270) return;
        const newProgress = {
            ...progress,
            currentDay: progress.currentDay + 1
        };
        setProgress(newProgress);
    }, [
        progress
    ]);
    const resetProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const defaultProgress = __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["localStorage"].getDefaultProgress();
        setProgress(defaultProgress);
    }, []);
    const getTodaysPractices = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!progress) return [];
        const today = new Date().toISOString().split('T')[0];
        return progress.practiceHistory.filter((session)=>session.date === today);
    }, [
        progress
    ]);
    const getTodaysTotalTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const todaysPractices = getTodaysPractices();
        return todaysPractices.reduce((total, session)=>total + session.duration, 0);
    }, [
        getTodaysPractices
    ]);
    const getCurrentDayTarget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!progress) return 10;
        return progress.currentDay * 10; // 10 seconds per day
    }, [
        progress
    ]);
    const hasCompletedToday = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const todaysTotal = getTodaysTotalTime();
        const target = getCurrentDayTarget();
        return todaysTotal >= target;
    }, [
        getTodaysTotalTime,
        getCurrentDayTarget
    ]);
    return {
        progress,
        isLoading,
        completePractice,
        advanceDay,
        resetProgress,
        getTodaysPractices,
        getTodaysTotalTime,
        getCurrentDayTarget,
        hasCompletedToday
    };
}
}),
"[project]/SUNGAZE APP/package.json/src/app/hooks/useSubscription.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSubscription",
    ()=>useSubscription
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$database$2f$subscription$2d$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/src/app/lib/database/subscription-service.ts [app-ssr] (ecmascript)");
"use client";
;
;
function useSubscription(userId) {
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const loadProfile = async ()=>{
        try {
            setLoading(true);
            console.log('Loading profile for userId:', userId);
            const userProfile = await __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$database$2f$subscription$2d$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscriptionService"].getUserProfile(userId);
            console.log('Loaded userProfile:', userProfile);
            setProfile(userProfile);
        } catch (error) {
            console.error('Failed to load user profile:', error);
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (userId) {
            loadProfile();
        }
    }, [
        userId
    ]);
    const hasAccess = (requiredTier)=>{
        if (!profile) return false;
        // Check if subscription is active for subscription-based tiers
        if (profile.tier === 'monthly' || profile.tier === 'yearly') {
            if (profile.subscriptionStatus !== 'active') return false;
        }
        // Check if founder access hasn't expired
        if (profile.tier === 'founder_444') {
            if (profile.expirationDate) {
                const expiration = new Date(profile.expirationDate);
                if (expiration <= new Date()) return false;
            }
        }
        // Define tier hierarchy
        const tierHierarchy = {
            'free': 0,
            'monthly': 1,
            'yearly': 2,
            'founder_444': 3
        };
        const userTierLevel = tierHierarchy[profile.tier];
        const requiredTierLevel = tierHierarchy[requiredTier];
        return userTierLevel >= requiredTierLevel;
    };
    const isFounder = profile?.tier === 'founder_444' && hasAccess('founder_444');
    const isPremium = hasAccess('monthly');
    const refreshProfile = async ()=>{
        await loadProfile();
    };
    return {
        profile,
        loading,
        hasAccess,
        isFounder,
        isPremium,
        refreshProfile
    };
}
}),
"[project]/SUNGAZE APP/package.json/src/app/hooks/useVoice.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useVoice",
    ()=>useVoice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$elevenlabs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/src/app/lib/elevenlabs.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$speechSynthesis$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/src/app/lib/speechSynthesis.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$meditativeChimes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/src/app/lib/meditativeChimes.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function useVoice() {
    const [voiceState, setVoiceState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        isPlaying: false,
        isLoading: false,
        isReady: false,
        error: null,
        duration: 0,
        currentTime: 0
    });
    const autoPlayRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const audioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const completionAudioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const palmingAudioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const activeAudioRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new Set()); // Track all active audio elements
    const elevenLabsService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$elevenlabs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initializeElevenLabs"])());
    const completionVoiceService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$elevenlabs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initializeCompletionVoice"])());
    const webSpeechService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const chimeService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$meditativeChimes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeditativeChimes"]());
    const isUsingWebSpeech = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const isUsingChimes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Initialize and preload sacred preparation audio
    // Preload completion message
    const preloadCompletionMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!completionVoiceService.current) return;
        try {
            const audioUrl = await completionVoiceService.current.generateSpeechUrl(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$elevenlabs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SESSION_COMPLETION_TEXT"]);
            const audio = new Audio(audioUrl);
            completionAudioRef.current = audio;
            audio.load(); // Preload the audio
        } catch (error) {
            console.error('Failed to preload completion message:', error);
        }
    }, []);
    // Preload palming instructions
    const preloadPalmingInstructions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!completionVoiceService.current) return;
        try {
            const audioUrl = await completionVoiceService.current.generateSpeechUrl(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$elevenlabs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PALMING_INSTRUCTIONS_TEXT"]);
            const audio = new Audio(audioUrl);
            palmingAudioRef.current = audio;
            audio.load(); // Preload the audio
        } catch (error) {
            console.error('Failed to preload palming instructions:', error);
        }
    }, []);
    const initializeVoice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (autoPlay = false)=>{
        autoPlayRef.current = autoPlay;
        setVoiceState((prev)=>({
                ...prev,
                isLoading: true,
                error: null
            }));
        // Skip problematic voice systems and go straight to chimes for better reliability
        console.log('Initializing sacred chimes for reliable voice experience...');
        initializeChimeFallback(autoPlay);
    }, []);
    const initializeWebSpeechFallback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((autoPlay = false)=>{
        if (!webSpeechService.current) {
            webSpeechService.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$speechSynthesis$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initializeWebSpeech"])();
        }
        if (!webSpeechService.current) {
            setVoiceState((prev)=>({
                    ...prev,
                    error: 'Voice synthesis not available in this browser',
                    isLoading: false,
                    isReady: false
                }));
            return;
        }
        isUsingWebSpeech.current = true;
        setVoiceState((prev)=>({
                ...prev,
                isLoading: false,
                isReady: true,
                duration: 0,
                currentTime: 0
            }));
        // Auto-play if requested
        if (autoPlay) {
            setTimeout(()=>{
                playWebSpeech(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$elevenlabs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SACRED_PREPARATION_TEXT"]);
            }, 100);
        }
    }, []);
    const initializeChimeFallback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((autoPlay = false)=>{
        console.log('Initializing sacred chimes as voice fallback...');
        isUsingChimes.current = true;
        isUsingWebSpeech.current = false;
        setVoiceState((prev)=>({
                ...prev,
                isLoading: false,
                isReady: true,
                duration: 0,
                currentTime: 0,
                error: null
            }));
        // Auto-play preparation chime if requested
        if (autoPlay) {
            setTimeout(async ()=>{
                await chimeService.current.playPreparationChime();
                setVoiceState((prev)=>({
                        ...prev,
                        isPlaying: true
                    }));
                // Set playing to false after chime completes (approximately 3 seconds)
                setTimeout(()=>{
                    setVoiceState((prev)=>({
                            ...prev,
                            isPlaying: false
                        }));
                }, 3000);
            }, 100);
        }
    }, []);
    const playWebSpeech = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (text)=>{
        if (!webSpeechService.current) return;
        try {
            setVoiceState((prev)=>({
                    ...prev,
                    isPlaying: true
                }));
            await webSpeechService.current.speak(text);
            setVoiceState((prev)=>({
                    ...prev,
                    isPlaying: false
                }));
        } catch (error) {
            console.error('Web Speech error:', error);
            setVoiceState((prev)=>({
                    ...prev,
                    error: null,
                    isPlaying: false
                }));
        }
    }, []);
    const playVoice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (isUsingChimes.current) {
            setVoiceState((prev)=>({
                    ...prev,
                    isPlaying: true
                }));
            await chimeService.current.playPreparationChime();
            setTimeout(()=>{
                setVoiceState((prev)=>({
                        ...prev,
                        isPlaying: false
                    }));
            }, 3000);
        } else if (isUsingWebSpeech.current && webSpeechService.current) {
            playWebSpeech(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$elevenlabs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SACRED_PREPARATION_TEXT"]);
        } else if (audioRef.current && voiceState.isReady) {
            audioRef.current.play().catch((error)=>{
                console.error('Voice playback error:', error);
                setVoiceState((prev)=>({
                        ...prev,
                        error: 'Failed to play audio'
                    }));
            });
        }
    }, [
        voiceState.isReady,
        playWebSpeech
    ]);
    const pauseVoice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (isUsingChimes.current) {
            // Chimes can't really be paused, just stop the state
            setVoiceState((prev)=>({
                    ...prev,
                    isPlaying: false
                }));
        } else if (isUsingWebSpeech.current && webSpeechService.current) {
            webSpeechService.current.pause();
            setVoiceState((prev)=>({
                    ...prev,
                    isPlaying: false
                }));
        } else if (audioRef.current) {
            audioRef.current.pause();
        }
    }, []);
    const stopVoice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        console.log('Stopping all voice audio...');
        // Stop all active audio elements
        activeAudioRefs.current.forEach((audio)=>{
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        });
        activeAudioRefs.current.clear();
        if (isUsingChimes.current) {
            // Chimes naturally stop, just reset state
            setVoiceState((prev)=>({
                    ...prev,
                    isPlaying: false,
                    currentTime: 0
                }));
        } else if (isUsingWebSpeech.current && webSpeechService.current) {
            webSpeechService.current.stop();
            setVoiceState((prev)=>({
                    ...prev,
                    isPlaying: false,
                    currentTime: 0
                }));
        } else if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        // Also stop the main audio refs
        if (completionAudioRef.current) {
            completionAudioRef.current.pause();
            completionAudioRef.current.currentTime = 0;
        }
        if (palmingAudioRef.current) {
            palmingAudioRef.current.pause();
            palmingAudioRef.current.currentTime = 0;
        }
    }, []);
    // Generate and play gong sound
    const playGong = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            // Create oscillator for the gong sound
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            // Connect nodes
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            // Configure gong-like sound
            oscillator.frequency.setValueAtTime(200, audioContext.currentTime); // Start frequency
            oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 2); // Decay to lower frequency
            // Configure envelope (fade out)
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 3);
            oscillator.type = 'sine';
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 3);
        } catch (error) {
            console.error('Gong sound error:', error);
        }
    }, []);
    // Play session completion message
    const playCompletionMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        // Use chimes if that's our current fallback
        if (isUsingChimes.current) {
            setVoiceState((prev)=>({
                    ...prev,
                    isPlaying: true
                }));
            await chimeService.current.playCompletionChime();
            setTimeout(()=>{
                setVoiceState((prev)=>({
                        ...prev,
                        isPlaying: false
                    }));
            }, 4000); // Completion chimes are longer
            return;
        }
        // Try Web Speech API fallback if ElevenLabs is not working
        if (isUsingWebSpeech.current || !completionVoiceService.current) {
            if (webSpeechService.current) {
                await playWebSpeech(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$elevenlabs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SESSION_COMPLETION_TEXT"]);
            }
            return;
        }
        try {
            let audio = completionAudioRef.current;
            // If not preloaded, generate it now
            if (!audio && completionVoiceService.current) {
                setVoiceState((prev)=>({
                        ...prev,
                        isLoading: true,
                        error: null
                    }));
                const audioUrl = await completionVoiceService.current.generateSpeechUrl(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$elevenlabs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SESSION_COMPLETION_TEXT"]);
                audio = new Audio(audioUrl);
                completionAudioRef.current = audio;
            }
            if (!audio) {
                console.warn('ElevenLabs completion voice service not available, using fallback');
                // Use chimes as preferred fallback over computer voice
                if (chimeService.current) {
                    setVoiceState((prev)=>({
                            ...prev,
                            isPlaying: true
                        }));
                    await chimeService.current.playCompletionChime();
                    setTimeout(()=>{
                        setVoiceState((prev)=>({
                                ...prev,
                                isPlaying: false
                            }));
                    }, 4000);
                } else if (webSpeechService.current) {
                    await playWebSpeech(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$elevenlabs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SESSION_COMPLETION_TEXT"]);
                }
                return;
            }
            // Set up event listeners for completion audio
            audio.onloadedmetadata = ()=>{
                setVoiceState((prev)=>({
                        ...prev,
                        isLoading: false,
                        duration: audio.duration
                    }));
            };
            audio.ontimeupdate = ()=>{
                setVoiceState((prev)=>({
                        ...prev,
                        currentTime: audio.currentTime
                    }));
            };
            audio.onplay = ()=>{
                setVoiceState((prev)=>({
                        ...prev,
                        isPlaying: true
                    }));
            };
            audio.onpause = ()=>{
                setVoiceState((prev)=>({
                        ...prev,
                        isPlaying: false
                    }));
            };
            audio.onended = ()=>{
                setVoiceState((prev)=>({
                        ...prev,
                        isPlaying: false,
                        currentTime: 0
                    }));
            };
            audio.onerror = ()=>{
                setVoiceState((prev)=>({
                        ...prev,
                        error: 'Failed to play completion message',
                        isLoading: false,
                        isPlaying: false
                    }));
            };
            // Pause current audio if any and play completion message
            if (audioRef.current) {
                audioRef.current.pause();
            }
            // Reset and play
            audio.currentTime = 0;
            await audio.play();
        } catch (error) {
            console.error('Completion voice error:', error);
            setVoiceState((prev)=>({
                    ...prev,
                    error: error instanceof Error ? error.message : 'Failed to play completion message',
                    isLoading: false,
                    isPlaying: false
                }));
        }
    }, []);
    // Play palming instructions message
    const playPalmingInstructions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        // Use chimes if that's our current fallback
        if (isUsingChimes.current) {
            setVoiceState((prev)=>({
                    ...prev,
                    isPlaying: true
                }));
            await chimeService.current.playPalmingChime();
            setTimeout(()=>{
                setVoiceState((prev)=>({
                        ...prev,
                        isPlaying: false
                    }));
            }, 4500); // Palming chimes are deep and longer
            return;
        }
        try {
            let audio = palmingAudioRef.current;
            // If not preloaded, generate it now
            if (!audio && completionVoiceService.current) {
                setVoiceState((prev)=>({
                        ...prev,
                        isLoading: true,
                        error: null
                    }));
                const audioUrl = await completionVoiceService.current.generateSpeechUrl(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$elevenlabs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PALMING_INSTRUCTIONS_TEXT"]);
                audio = new Audio(audioUrl);
                palmingAudioRef.current = audio;
            }
            if (!audio) {
                console.warn('ElevenLabs palming voice service not available, using chime fallback');
                // Use chimes as preferred fallback
                if (chimeService.current) {
                    setVoiceState((prev)=>({
                            ...prev,
                            isPlaying: true
                        }));
                    await chimeService.current.playPalmingChime();
                    setTimeout(()=>{
                        setVoiceState((prev)=>({
                                ...prev,
                                isPlaying: false
                            }));
                    }, 4500);
                }
                return;
            }
            // Set up event listeners for palming audio
            audio.onloadedmetadata = ()=>{
                setVoiceState((prev)=>({
                        ...prev,
                        isLoading: false,
                        duration: audio.duration
                    }));
            };
            audio.ontimeupdate = ()=>{
                setVoiceState((prev)=>({
                        ...prev,
                        currentTime: audio.currentTime
                    }));
            };
            audio.onplay = ()=>{
                setVoiceState((prev)=>({
                        ...prev,
                        isPlaying: true
                    }));
            };
            audio.onpause = ()=>{
                setVoiceState((prev)=>({
                        ...prev,
                        isPlaying: false
                    }));
            };
            audio.onended = ()=>{
                setVoiceState((prev)=>({
                        ...prev,
                        isPlaying: false,
                        currentTime: 0
                    }));
            };
            audio.onerror = ()=>{
                setVoiceState((prev)=>({
                        ...prev,
                        error: 'Failed to play palming instructions',
                        isLoading: false,
                        isPlaying: false
                    }));
            };
            // Pause current audio if any and play palming instructions
            if (audioRef.current) {
                audioRef.current.pause();
            }
            if (completionAudioRef.current) {
                completionAudioRef.current.pause();
            }
            // Reset and play
            audio.currentTime = 0;
            await audio.play();
        } catch (error) {
            console.error('Palming instructions voice error:', error);
            setVoiceState((prev)=>({
                    ...prev,
                    error: error instanceof Error ? error.message : 'Failed to play palming instructions',
                    isLoading: false,
                    isPlaying: false
                }));
        }
    }, []);
    // Cleanup on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return ()=>{
            // Stop all active audio elements
            activeAudioRefs.current.forEach((audio)=>{
                if (audio) {
                    audio.pause();
                }
            });
            activeAudioRefs.current.clear();
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
            if (completionAudioRef.current) {
                completionAudioRef.current.pause();
                completionAudioRef.current = null;
            }
            if (palmingAudioRef.current) {
                palmingAudioRef.current.pause();
                palmingAudioRef.current = null;
            }
        };
    }, []);
    // Play palm warming guidance
    const playPalmWarmingGuidance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (isUsingChimes.current) {
            await chimeService.current.playPreparationChime();
            return;
        }
        try {
            if (completionVoiceService.current) {
                const audioUrl = await completionVoiceService.current.generateSpeechUrl(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$elevenlabs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PALM_WARMING_TEXT"]);
                const audio = new Audio(audioUrl);
                audio.volume = 0.8;
                // Track this audio element
                activeAudioRefs.current.add(audio);
                // Clean up when audio ends
                audio.onended = ()=>{
                    activeAudioRefs.current.delete(audio);
                };
                await audio.play();
            } else if (webSpeechService.current) {
                await playWebSpeech(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$elevenlabs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PALM_WARMING_TEXT"]);
            } else {
                await chimeService.current.playPreparationChime();
            }
        } catch (error) {
            console.error('Palm warming voice error:', error);
            await chimeService.current.playPreparationChime();
        }
    }, [
        playWebSpeech
    ]);
    // Play eye sanctuary guidance
    const playEyeSanctuaryGuidance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (isUsingChimes.current) {
            await chimeService.current.playTransitionChime();
            return;
        }
        try {
            if (completionVoiceService.current) {
                const audioUrl = await completionVoiceService.current.generateSpeechUrl(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$elevenlabs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EYE_SANCTUARY_TEXT"]);
                const audio = new Audio(audioUrl);
                audio.volume = 0.8;
                // Track this audio element
                activeAudioRefs.current.add(audio);
                // Clean up when audio ends
                audio.onended = ()=>{
                    activeAudioRefs.current.delete(audio);
                };
                await audio.play();
            } else if (webSpeechService.current) {
                await playWebSpeech(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$elevenlabs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EYE_SANCTUARY_TEXT"]);
            } else {
                await chimeService.current.playTransitionChime();
            }
        } catch (error) {
            console.error('Eye sanctuary voice error:', error);
            await chimeService.current.playTransitionChime();
        }
    }, [
        playWebSpeech
    ]);
    // Play inner sun meditation guidance
    const playInnerSunGuidance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (isUsingChimes.current) {
            await chimeService.current.playPalmingChime();
            return;
        }
        try {
            if (completionVoiceService.current) {
                const audioUrl = await completionVoiceService.current.generateSpeechUrl(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$elevenlabs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INNER_SUN_MEDITATION_TEXT"]);
                const audio = new Audio(audioUrl);
                audio.volume = 0.8;
                // Track this audio element
                activeAudioRefs.current.add(audio);
                // Clean up when audio ends
                audio.onended = ()=>{
                    activeAudioRefs.current.delete(audio);
                };
                await audio.play();
            } else if (webSpeechService.current) {
                await playWebSpeech(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$elevenlabs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INNER_SUN_MEDITATION_TEXT"]);
            } else {
                await chimeService.current.playPalmingChime();
            }
        } catch (error) {
            console.error('Inner sun voice error:', error);
            await chimeService.current.playPalmingChime();
        }
    }, [
        playWebSpeech
    ]);
    return {
        voiceState,
        initializeVoice,
        playVoice,
        pauseVoice,
        stopVoice,
        playCompletionMessage,
        playGong,
        playPalmingInstructions,
        playPalmWarmingGuidance,
        playEyeSanctuaryGuidance,
        playInnerSunGuidance
    };
}
}),
"[project]/SUNGAZE APP/package.json/src/app/hooks/useSunVisibility.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getOptimalGazingTime",
    ()=>getOptimalGazingTime,
    "getSunPhase",
    ()=>getSunPhase,
    "useSunVisibility",
    ()=>useSunVisibility
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
function useSunVisibility() {
    const [sunCondition, setSunCondition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        isVisible: true,
        cloudCover: 20,
        solarWindowStart: null,
        minutesToWindow: 0,
        canGaze: true,
        condition: 'clear',
        message: 'Detecting your location for accurate conditions...',
        location: 'Unknown'
    });
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [locationData, setLocationData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Get user's location with better fallbacks
    const getUserLocation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        return new Promise((resolve)=>{
            // Always resolve with a fallback - never reject
            const fallbackLocation = {
                lat: 34.0522,
                lon: -118.2437,
                city: 'Your Location',
                country: ''
            };
            if (!navigator.geolocation) {
                console.info('Geolocation not supported, using fallback location');
                resolve(fallbackLocation);
                return;
            }
            // Try to get location with shorter timeout and better error handling
            navigator.geolocation.getCurrentPosition(async (position)=>{
                const { latitude, longitude } = position.coords;
                // Use coordinates without API calls to avoid complexity
                const location = {
                    lat: latitude,
                    lon: longitude,
                    city: 'Your Location',
                    country: ''
                };
                resolve(location);
            }, (error)=>{
                // Handle permission denied gracefully
                console.info('Location permission denied or unavailable, using fallback');
                resolve(fallbackLocation);
            }, {
                timeout: 5000,
                maximumAge: 600000,
                enableHighAccuracy: false // Less intrusive
            });
        });
    }, []);
    // Fetch weather data for location
    const getWeatherData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (location)=>{
        try {
            const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
            if (!apiKey) {
                console.warn('OpenWeather API key not found');
                return null;
            }
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&units=imperial`);
            if (!response.ok) {
                throw new Error('Weather API request failed');
            }
            const data = await response.json();
            return {
                cloudCover: data.clouds?.all || 0,
                weatherCondition: data.weather?.[0]?.main || 'Clear',
                temperature: data.main?.temp || 70,
                visibility: data.visibility ? data.visibility / 1000 : 10 // Convert to km
            };
        } catch (error) {
            console.error('Weather fetch error:', error);
            return null;
        }
    }, []);
    // Detect sun conditions based on time with optional location
    const checkSunConditions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        console.log('🌤️ checkSunConditions called');
        const now = new Date();
        const hour = now.getHours();
        const timeOfDay = hour >= 6 && hour <= 18 ? 'day' : 'night';
        console.log(`🌤️ Current time: ${hour}:00, timeOfDay: ${timeOfDay}`);
        let condition = 'clear';
        let isVisible = true;
        let cloudCover = 15; // Default clear conditions
        let canGaze = true;
        let message = 'Perfect conditions for sun gazing';
        let solarWindowStart = null;
        let minutesToWindow = 0;
        let location = 'Your Location';
        // Try to get location if not already available, but don't block on it
        try {
            if (!locationData) {
                const userLocation = await getUserLocation();
                setLocationData(userLocation);
                location = userLocation.city || 'Your Location';
            } else {
                location = locationData.city || 'Your Location';
            }
        } catch (error) {
            // Silently use fallback - no error messages
            console.debug('Using fallback location');
        }
        // Try to get real weather data if location is available
        try {
            if (locationData) {
                const weatherData = await getWeatherData(locationData);
                if (weatherData) {
                    // Use real weather data but make changes more gradual
                    const currentCloudCover = sunCondition.cloudCover;
                    const realCloudCover = weatherData.cloudCover;
                    // Gradual transition to real data (avoid dramatic jumps)
                    if (Math.abs(realCloudCover - currentCloudCover) > 20) {
                        // If difference is large, make gradual change
                        cloudCover = currentCloudCover + (realCloudCover - currentCloudCover) * 0.3;
                    } else {
                        cloudCover = realCloudCover;
                    }
                    // Adjust conditions based on real weather
                    if (cloudCover > 60) {
                        condition = 'cloudy';
                        message = 'Cloudy conditions detected. Consider cloud gazing practice.';
                    } else if (cloudCover > 30) {
                        condition = 'cloudy';
                        message = 'Partly cloudy. Good conditions for sun gazing.';
                    } else {
                        condition = 'clear';
                        message = 'Clear conditions. Perfect for sun gazing.';
                    }
                }
            }
        } catch (error) {
            console.debug('Weather data unavailable, using time-based conditions');
        }
        if (timeOfDay === 'night') {
            condition = 'night';
            isVisible = false;
            canGaze = false;
            message = 'Sun practice available at sunrise';
            // Calculate time to sunrise (simulate 6 AM)
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(6, 0, 0, 0);
            solarWindowStart = tomorrow;
            minutesToWindow = Math.floor((tomorrow.getTime() - now.getTime()) / (1000 * 60));
        } else {
            // Day time conditions - simplified logic
            condition = 'clear';
            isVisible = true;
            canGaze = true;
            // Check if we're in safe gazing window based on time
            if (hour >= 6 && hour < 8) {
                message = `Excellent morning conditions for sun gazing`;
                cloudCover = 10;
            } else if (hour >= 17 && hour < 19) {
                message = `Golden hour. Perfect for evening sun practice.`;
                cloudCover = 12;
            } else if (hour >= 8 && hour < 10) {
                message = `Good morning conditions. Sun intensity building.`;
                cloudCover = 15;
            } else if (hour >= 16 && hour < 17) {
                message = `Clear afternoon. Evening window approaching.`;
                cloudCover = 18;
            } else {
                // Midday - suggest waiting for optimal window
                const eveningWindow = new Date(now);
                eveningWindow.setHours(17, 0, 0, 0);
                solarWindowStart = eveningWindow;
                minutesToWindow = Math.floor((eveningWindow.getTime() - now.getTime()) / (1000 * 60));
                if (minutesToWindow > 0) {
                    message = `Clear skies. Your optimal window begins in ${Math.floor(minutesToWindow / 60)}h ${minutesToWindow % 60}m.`;
                    cloudCover = 20;
                } else {
                    message = `Perfect evening conditions for sun gazing`;
                    cloudCover = 12;
                }
            }
        }
        const newCondition = {
            isVisible,
            cloudCover: Math.round(cloudCover),
            solarWindowStart,
            minutesToWindow,
            canGaze,
            condition,
            message,
            location
        };
        console.log('🌤️ Setting new sun condition:', newCondition);
        setSunCondition(newCondition);
        setIsLoading(false);
        // Force a re-render by updating a timestamp
        setTimeout(()=>{
            console.log('🌤️ State update completed, current condition:', newCondition);
        }, 100);
    }, [
        locationData,
        getWeatherData
    ]);
    // Check conditions on mount and periodically
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const runCheck = async ()=>{
            try {
                await checkSunConditions();
            } catch (error) {
                console.debug('Weather check failed, using defaults');
                // Set default conditions on any error
                setSunCondition({
                    isVisible: true,
                    cloudCover: 15,
                    solarWindowStart: null,
                    minutesToWindow: 0,
                    canGaze: true,
                    condition: 'clear',
                    message: 'Clear conditions for sun gazing',
                    location: 'Your Location'
                });
                setIsLoading(false);
            }
        };
        runCheck();
        // Update every 2 minutes (less frequent to avoid permission prompts)
        const interval = setInterval(runCheck, 120000);
        return ()=>clearInterval(interval);
    }, [
        checkSunConditions
    ]);
    // Manual refresh for testing
    const refreshConditions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        console.log('🔄 Refresh button clicked - starting refresh...');
        console.log('🔄 Current sunCondition before refresh:', sunCondition);
        setIsLoading(true);
        try {
            // Call the actual checkSunConditions function to get real data
            console.log('🔄 Calling checkSunConditions...');
            await checkSunConditions();
            console.log('✅ Refresh completed successfully');
        } catch (error) {
            console.error('❌ Manual refresh failed:', error);
            // Fallback to a subtle update
            const now = new Date();
            const hour = now.getHours();
            const timeOfDay = hour >= 6 && hour <= 18 ? 'day' : 'night';
            // Only make subtle changes to show refresh worked
            const currentCloudCover = sunCondition.cloudCover;
            const newCloudCover = Math.max(5, Math.min(50, currentCloudCover + (Math.random() - 0.5) * 6)); // ±3% change
            const newCondition = {
                ...sunCondition,
                cloudCover: Math.round(newCloudCover),
                message: sunCondition.message
            };
            console.log('🔄 Setting fallback condition:', newCondition);
            setSunCondition(newCondition);
            setIsLoading(false);
        }
    }, [
        checkSunConditions,
        sunCondition
    ]);
    return {
        sunCondition,
        isLoading,
        refreshConditions
    };
}
function getSunPhase(hour) {
    if (hour >= 5 && hour < 7) return 'sunrise';
    if (hour >= 7 && hour < 11) return 'morning';
    if (hour >= 11 && hour < 15) return 'midday';
    if (hour >= 15 && hour < 17) return 'evening';
    if (hour >= 17 && hour < 19) return 'sunset';
    return 'night';
}
function getOptimalGazingTime(condition, cloudCover) {
    switch(condition){
        case 'clear':
            return cloudCover < 10 ? 60 : 120; // 1-2 minutes for clear skies
        case 'cloudy':
            return 300; // 5 minutes for cloudy (safer)
        case 'overcast':
            return 0; // No direct gazing
        case 'night':
            return 0;
        default:
            return 60;
    }
}
}),
"[project]/SUNGAZE APP/package.json/src/app/hooks/useSolarWindowNotifications.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Hook for managing solar window notifications and reminders
__turbopack_context__.s([
    "useSolarWindowNotifications",
    ()=>useSolarWindowNotifications
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$weatherService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/src/app/lib/weatherService.ts [app-ssr] (ecmascript)");
;
;
const DEFAULT_PREFERENCES = {
    morningReminder: true,
    eveningReminder: true,
    reminderTime: 15,
    enabled: true
};
const STORAGE_KEY = 'solar_window_notifications';
function useSolarWindowNotifications() {
    const [preferences, setPreferences] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_PREFERENCES);
    const [isNotificationVisible, setIsNotificationVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lastChecked, setLastChecked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    // Load preferences from localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                setPreferences({
                    ...DEFAULT_PREFERENCES,
                    ...parsed
                });
            }
        } catch (error) {
            console.error('Failed to load notification preferences:', error);
        }
    }, []);
    // Save preferences to localStorage
    const savePreferences = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((newPreferences)=>{
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newPreferences));
            setPreferences(newPreferences);
        } catch (error) {
            console.error('Failed to save notification preferences:', error);
        }
    }, []);
    // Check if we should show a notification
    const checkForSolarWindow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!preferences.enabled) return;
        // Don't check too frequently (max once per 5 minutes)
        const now = Date.now();
        if (now - lastChecked < 5 * 60 * 1000) return;
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$weatherService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["weatherService"].shouldTriggerSolarWindow();
            if (result.shouldTrigger) {
                // Check if this is a time we want to be reminded about
                const isMorning = result.isSunrise;
                const shouldRemind = isMorning && preferences.morningReminder || !isMorning && preferences.eveningReminder;
                if (shouldRemind) {
                    setIsNotificationVisible(true);
                }
            }
        } catch (error) {
            console.error('Failed to check solar window:', error);
        } finally{
            setLastChecked(now);
        }
    }, [
        preferences,
        lastChecked
    ]);
    // Start periodic checking
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!preferences.enabled) return;
        // Check immediately
        checkForSolarWindow();
        // Set up interval for periodic checking
        const interval = setInterval(checkForSolarWindow, 5 * 60 * 1000); // Every 5 minutes
        return ()=>clearInterval(interval);
    }, [
        checkForSolarWindow,
        preferences.enabled
    ]);
    // Handle notification close
    const closeNotification = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setIsNotificationVisible(false);
    }, []);
    // Update preferences
    const updatePreferences = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((updates)=>{
        const newPreferences = {
            ...preferences,
            ...updates
        };
        savePreferences(newPreferences);
    }, [
        preferences,
        savePreferences
    ]);
    // Enable/disable notifications
    const toggleNotifications = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        updatePreferences({
            enabled: !preferences.enabled
        });
    }, [
        preferences.enabled,
        updatePreferences
    ]);
    // Set reminder time
    const setReminderTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((minutes)=>{
        updatePreferences({
            reminderTime: Math.max(5, Math.min(60, minutes))
        });
    }, [
        updatePreferences
    ]);
    // Toggle morning reminder
    const toggleMorningReminder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        updatePreferences({
            morningReminder: !preferences.morningReminder
        });
    }, [
        preferences.morningReminder,
        updatePreferences
    ]);
    // Toggle evening reminder
    const toggleEveningReminder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        updatePreferences({
            eveningReminder: !preferences.eveningReminder
        });
    }, [
        preferences.eveningReminder,
        updatePreferences
    ]);
    // Get cache statistics
    const getCacheStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$weatherService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["weatherService"].getCacheStats();
    }, []);
    // Clear caches (for testing)
    const clearCaches = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$weatherService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["weatherService"].clearCaches();
    }, []);
    return {
        preferences,
        isNotificationVisible,
        lastChecked,
        updatePreferences,
        toggleNotifications,
        setReminderTime,
        toggleMorningReminder,
        toggleEveningReminder,
        closeNotification,
        checkForSolarWindow,
        getCacheStats,
        clearCaches
    };
}
}),
"[project]/SUNGAZE APP/package.json/src/app/types/subscription.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FOUNDER_BADGES",
    ()=>FOUNDER_BADGES,
    "FREE_TIER_LIMITS",
    ()=>FREE_TIER_LIMITS,
    "PAYMENT_PRODUCTS",
    ()=>PAYMENT_PRODUCTS,
    "TIER_FEATURES",
    ()=>TIER_FEATURES
]);
const PAYMENT_PRODUCTS = [
    {
        id: 'monthly',
        name: 'Sungaze+ Monthly',
        description: 'Unlimited ritual path - all features unlocked',
        price: 4.99,
        currency: 'USD',
        type: 'subscription',
        interval: 'month',
        tier: 'monthly',
        stripePriceId: 'price_1SB3p8GIDaitR9oVu9Br2RJB'
    },
    {
        id: 'yearly',
        name: 'Sungaze+ Yearly',
        description: 'Infinite return for one year - best value',
        price: 29.99,
        currency: 'USD',
        type: 'subscription',
        interval: 'year',
        tier: 'yearly',
        stripePriceId: process.env.STRIPE_PREMIUM_PRICE_ID || 'price_1S4RCeGIDaitR9oVNXvlNVRF'
    },
    {
        id: 'founder_444',
        name: 'Founder 444',
        description: '3 years full access. Only 444 ever.',
        price: 99,
        currency: 'USD',
        type: 'one_time',
        tier: 'founder_444',
        stripePriceId: process.env.STRIPE_FOUNDER_PRICE_ID || 'price_1S4REHGIDaitR9oVV134V0tQ'
    }
];
const FOUNDER_BADGES = [
    'First Witness of the Flame',
    'Solar Pioneer',
    'Guardian of Ancient Light'
];
const TIER_FEATURES = {
    free: [
        '1-minute timer only',
        'Basic streaks',
        '1 koan per week',
        'Mini journal (3 entries max)'
    ],
    monthly: [
        'Unlimited timer duration',
        'All ritual timers',
        'Unlimited koans & wisdom',
        'Full journal access',
        'Sacred seals & badges',
        'Audio transmissions',
        'Advanced progress tracking'
    ],
    yearly: [
        'Everything in Monthly',
        'Best value (save $31.20)',
        'Yearly streak rewards',
        'Priority support',
        'Early feature access'
    ],
    founder_444: [
        'Everything unlocked',
        '3 years full access',
        'Permanent Founder badge',
        'Exclusive founder events',
        'Direct founder access',
        'Early/beta features',
        'Founder seal collection'
    ]
};
const FREE_TIER_LIMITS = {
    timerMaxDuration: 60,
    journalMaxEntries: 3,
    koansPerWeek: 1,
    streaksEnabled: true
};
}),
"[project]/SUNGAZE APP/package.json/src/app/data/truthScrolls.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAllCategories",
    ()=>getAllCategories,
    "getRandomTruthScroll",
    ()=>getRandomTruthScroll,
    "getTruthScrollsByCategory",
    ()=>getTruthScrollsByCategory,
    "truthScrolls",
    ()=>truthScrolls
]);
const truthScrolls = [
    {
        id: 1,
        myth: "The sun will blind you",
        truth: "Safe gazing is possible only at sunrise/sunset when UV index is 0",
        category: "Safety",
        vibe: "The medical establishment wants you scared of your own star ☀️"
    },
    {
        id: 2,
        myth: "Sungazing is New Age nonsense",
        truth: "It's in the Rig Veda, Upanishads, Taoist texts, Egyptian hymns",
        category: "Ancient Wisdom",
        vibe: "Your ancestors knew what Big Pharma doesn't want you to know 📜"
    },
    {
        id: 3,
        myth: "Humans need artificial supplements",
        truth: "The sun is the original source of vitamin D, circadian alignment, and pineal activation",
        category: "Health",
        vibe: "Nature is the ultimate pharmacy. No cap. 💊➡️☀️"
    },
    {
        id: 4,
        myth: "You need sunscreen all day",
        truth: "Morning and evening sun exposure builds natural protection and melanin",
        category: "Protection",
        vibe: "They sold you fear, not freedom ✨"
    },
    {
        id: 5,
        myth: "Only food gives you energy",
        truth: "Light is the primary energy source - mitochondria literally eat photons",
        category: "Energy",
        vibe: "You're not just what you eat, you're what you absorb 🌅"
    },
    {
        id: 6,
        myth: "Depression needs medication",
        truth: "Light deficiency is the real epidemic - sun exposure regulates serotonin naturally",
        category: "Mental Health",
        vibe: "The cure was always free and literally hanging in the sky 🌞"
    },
    {
        id: 7,
        myth: "Staring at screens all day is normal",
        truth: "Your eyes were designed for horizon gazing and natural light cycles",
        category: "Vision",
        vibe: "They trapped your gaze in a rectangle. Break free. 📱❌"
    },
    {
        id: 8,
        myth: "Sleep pills fix insomnia",
        truth: "Morning sun exposure sets your circadian clock naturally",
        category: "Sleep",
        vibe: "Wake up with the sun, sleep like your ancestors did 🌙"
    },
    {
        id: 9,
        myth: "Meditation requires apps and courses",
        truth: "Solar gazing is the original mindfulness practice",
        category: "Consciousness",
        vibe: "The ultimate app is literally a star. No subscription required ⭐"
    },
    {
        id: 10,
        myth: "Only food contains nutrients",
        truth: "Sunlight provides information, energy, and healing frequencies your body craves",
        category: "Nutrition",
        vibe: "Light nutrition hits different. Your cells know. 🧬"
    }
];
const getRandomTruthScroll = ()=>{
    return truthScrolls[Math.floor(Math.random() * truthScrolls.length)];
};
const getTruthScrollsByCategory = (category)=>{
    return truthScrolls.filter((scroll)=>scroll.category === category);
};
const getAllCategories = ()=>{
    return [
        ...new Set(truthScrolls.map((scroll)=>scroll.category))
    ];
};
}),
];

//# sourceMappingURL=SUNGAZE%20APP_package_json_src_app_272b712b._.js.map