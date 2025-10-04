(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/SUNGAZE APP/package.json/src/app/hooks/useProgress.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useProgress",
    ()=>useProgress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/src/app/lib/storage.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function useProgress() {
    _s();
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // Load progress on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useProgress.useEffect": ()=>{
            const loadProgress = {
                "useProgress.useEffect.loadProgress": ()=>{
                    // Only run on client-side
                    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                    ;
                    try {
                        // Add a small delay to ensure DOM is ready
                        setTimeout({
                            "useProgress.useEffect.loadProgress": ()=>{
                                const userProgress = __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localStorage"].getUserProgress();
                                setProgress(userProgress);
                                setIsLoading(false);
                            }
                        }["useProgress.useEffect.loadProgress"], 100);
                    } catch (error) {
                        console.error('Error loading progress:', error);
                        // Fallback to default progress
                        setProgress({
                            currentDay: 1,
                            totalPractices: 0,
                            currentStreak: 0,
                            longestStreak: 0,
                            lastPracticeDate: null,
                            practiceHistory: []
                        });
                        setIsLoading(false);
                    }
                }
            }["useProgress.useEffect.loadProgress"];
            loadProgress();
        }
    }["useProgress.useEffect"], []);
    // Save progress whenever it changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useProgress.useEffect": ()=>{
            if (progress && !isLoading) {
                __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localStorage"].saveUserProgress(progress);
            }
        }
    }["useProgress.useEffect"], [
        progress,
        isLoading
    ]);
    const completePractice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useProgress.useCallback[completePractice]": (duration, timeOfDay)=>{
            try {
                const session = {
                    date: new Date().toISOString().split('T')[0],
                    duration,
                    timeOfDay
                };
                // Add the session and let storage handle progress updates
                __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localStorage"].addPracticeSession(session);
                // Reload progress from storage
                const updatedProgress = __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localStorage"].getUserProgress();
                setProgress(updatedProgress);
            } catch (error) {
                console.error('Error completing practice:', error);
            }
        }
    }["useProgress.useCallback[completePractice]"], []);
    const advanceDay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useProgress.useCallback[advanceDay]": ()=>{
            if (!progress || progress.currentDay >= 270) return;
            const newProgress = {
                ...progress,
                currentDay: progress.currentDay + 1
            };
            setProgress(newProgress);
        }
    }["useProgress.useCallback[advanceDay]"], [
        progress
    ]);
    const resetProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useProgress.useCallback[resetProgress]": ()=>{
            const defaultProgress = __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localStorage"].getDefaultProgress();
            setProgress(defaultProgress);
        }
    }["useProgress.useCallback[resetProgress]"], []);
    const getTodaysPractices = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useProgress.useCallback[getTodaysPractices]": ()=>{
            if (!progress) return [];
            const today = new Date().toISOString().split('T')[0];
            return progress.practiceHistory.filter({
                "useProgress.useCallback[getTodaysPractices]": (session)=>session.date === today
            }["useProgress.useCallback[getTodaysPractices]"]);
        }
    }["useProgress.useCallback[getTodaysPractices]"], [
        progress
    ]);
    const getTodaysTotalTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useProgress.useCallback[getTodaysTotalTime]": ()=>{
            const todaysPractices = getTodaysPractices();
            return todaysPractices.reduce({
                "useProgress.useCallback[getTodaysTotalTime]": (total, session)=>total + session.duration
            }["useProgress.useCallback[getTodaysTotalTime]"], 0);
        }
    }["useProgress.useCallback[getTodaysTotalTime]"], [
        getTodaysPractices
    ]);
    const getCurrentDayTarget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useProgress.useCallback[getCurrentDayTarget]": ()=>{
            if (!progress) return 10;
            return progress.currentDay * 10; // 10 seconds per day
        }
    }["useProgress.useCallback[getCurrentDayTarget]"], [
        progress
    ]);
    const hasCompletedToday = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useProgress.useCallback[hasCompletedToday]": ()=>{
            const todaysTotal = getTodaysTotalTime();
            const target = getCurrentDayTarget();
            return todaysTotal >= target;
        }
    }["useProgress.useCallback[hasCompletedToday]"], [
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
_s(useProgress, "XNgSIfhpzBT2KMpMus/lnA0hDKY=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SUNGAZE APP/package.json/src/app/hooks/useSubscription.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSubscription",
    ()=>useSubscription
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$database$2f$subscription$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/src/app/lib/database/subscription-service.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function useSubscription(userId) {
    _s();
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const loadProfile = async ()=>{
        try {
            setLoading(true);
            console.log('Loading profile for userId:', userId);
            const userProfile = await __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$database$2f$subscription$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscriptionService"].getUserProfile(userId);
            console.log('Loaded userProfile:', userProfile);
            setProfile(userProfile);
        } catch (error) {
            console.error('Failed to load user profile:', error);
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSubscription.useEffect": ()=>{
            if (userId) {
                loadProfile();
            }
        }
    }["useSubscription.useEffect"], [
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
    const isFounder = (profile === null || profile === void 0 ? void 0 : profile.tier) === 'founder_444' && hasAccess('founder_444');
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
_s(useSubscription, "4MRkLCaQ845wrp3RuIKNpWGnSVM=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SUNGAZE APP/package.json/src/app/hooks/useVoice.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useVoice",
    ()=>useVoice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$elevenlabs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/src/app/lib/elevenlabs.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$speechSynthesis$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/src/app/lib/speechSynthesis.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$meditativeChimes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/src/app/lib/meditativeChimes.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function useVoice() {
    _s();
    const [voiceState, setVoiceState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        isPlaying: false,
        isLoading: false,
        isReady: false,
        error: null,
        duration: 0,
        currentTime: 0
    });
    const autoPlayRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const audioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const completionAudioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const palmingAudioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const activeAudioRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Set()); // Track all active audio elements
    const elevenLabsService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$elevenlabs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initializeElevenLabs"])());
    const completionVoiceService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$elevenlabs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initializeCompletionVoice"])());
    const webSpeechService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const chimeService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$meditativeChimes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeditativeChimes"]());
    const isUsingWebSpeech = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const isUsingChimes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Initialize and preload sacred preparation audio
    // Preload completion message
    const preloadCompletionMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVoice.useCallback[preloadCompletionMessage]": async ()=>{
            if (!completionVoiceService.current) return;
            try {
                const audioUrl = await completionVoiceService.current.generateSpeechUrl(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$elevenlabs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SESSION_COMPLETION_TEXT"]);
                const audio = new Audio(audioUrl);
                completionAudioRef.current = audio;
                audio.load(); // Preload the audio
            } catch (error) {
                console.error('Failed to preload completion message:', error);
            }
        }
    }["useVoice.useCallback[preloadCompletionMessage]"], []);
    // Preload palming instructions
    const preloadPalmingInstructions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVoice.useCallback[preloadPalmingInstructions]": async ()=>{
            if (!completionVoiceService.current) return;
            try {
                const audioUrl = await completionVoiceService.current.generateSpeechUrl(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$elevenlabs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PALMING_INSTRUCTIONS_TEXT"]);
                const audio = new Audio(audioUrl);
                palmingAudioRef.current = audio;
                audio.load(); // Preload the audio
            } catch (error) {
                console.error('Failed to preload palming instructions:', error);
            }
        }
    }["useVoice.useCallback[preloadPalmingInstructions]"], []);
    const initializeVoice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVoice.useCallback[initializeVoice]": async function() {
            let autoPlay = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
            autoPlayRef.current = autoPlay;
            setVoiceState({
                "useVoice.useCallback[initializeVoice]": (prev)=>({
                        ...prev,
                        isLoading: true,
                        error: null
                    })
            }["useVoice.useCallback[initializeVoice]"]);
            // Skip problematic voice systems and go straight to chimes for better reliability
            console.log('Initializing sacred chimes for reliable voice experience...');
            initializeChimeFallback(autoPlay);
        }
    }["useVoice.useCallback[initializeVoice]"], []);
    const initializeWebSpeechFallback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVoice.useCallback[initializeWebSpeechFallback]": function() {
            let autoPlay = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
            if (!webSpeechService.current) {
                webSpeechService.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$speechSynthesis$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initializeWebSpeech"])();
            }
            if (!webSpeechService.current) {
                setVoiceState({
                    "useVoice.useCallback[initializeWebSpeechFallback]": (prev)=>({
                            ...prev,
                            error: 'Voice synthesis not available in this browser',
                            isLoading: false,
                            isReady: false
                        })
                }["useVoice.useCallback[initializeWebSpeechFallback]"]);
                return;
            }
            isUsingWebSpeech.current = true;
            setVoiceState({
                "useVoice.useCallback[initializeWebSpeechFallback]": (prev)=>({
                        ...prev,
                        isLoading: false,
                        isReady: true,
                        duration: 0,
                        currentTime: 0
                    })
            }["useVoice.useCallback[initializeWebSpeechFallback]"]);
            // Auto-play if requested
            if (autoPlay) {
                setTimeout({
                    "useVoice.useCallback[initializeWebSpeechFallback]": ()=>{
                        playWebSpeech(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$elevenlabs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SACRED_PREPARATION_TEXT"]);
                    }
                }["useVoice.useCallback[initializeWebSpeechFallback]"], 100);
            }
        }
    }["useVoice.useCallback[initializeWebSpeechFallback]"], []);
    const initializeChimeFallback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVoice.useCallback[initializeChimeFallback]": function() {
            let autoPlay = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
            console.log('Initializing sacred chimes as voice fallback...');
            isUsingChimes.current = true;
            isUsingWebSpeech.current = false;
            setVoiceState({
                "useVoice.useCallback[initializeChimeFallback]": (prev)=>({
                        ...prev,
                        isLoading: false,
                        isReady: true,
                        duration: 0,
                        currentTime: 0,
                        error: null
                    })
            }["useVoice.useCallback[initializeChimeFallback]"]);
            // Auto-play preparation chime if requested
            if (autoPlay) {
                setTimeout({
                    "useVoice.useCallback[initializeChimeFallback]": async ()=>{
                        await chimeService.current.playPreparationChime();
                        setVoiceState({
                            "useVoice.useCallback[initializeChimeFallback]": (prev)=>({
                                    ...prev,
                                    isPlaying: true
                                })
                        }["useVoice.useCallback[initializeChimeFallback]"]);
                        // Set playing to false after chime completes (approximately 3 seconds)
                        setTimeout({
                            "useVoice.useCallback[initializeChimeFallback]": ()=>{
                                setVoiceState({
                                    "useVoice.useCallback[initializeChimeFallback]": (prev)=>({
                                            ...prev,
                                            isPlaying: false
                                        })
                                }["useVoice.useCallback[initializeChimeFallback]"]);
                            }
                        }["useVoice.useCallback[initializeChimeFallback]"], 3000);
                    }
                }["useVoice.useCallback[initializeChimeFallback]"], 100);
            }
        }
    }["useVoice.useCallback[initializeChimeFallback]"], []);
    const playWebSpeech = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVoice.useCallback[playWebSpeech]": async (text)=>{
            if (!webSpeechService.current) return;
            try {
                setVoiceState({
                    "useVoice.useCallback[playWebSpeech]": (prev)=>({
                            ...prev,
                            isPlaying: true
                        })
                }["useVoice.useCallback[playWebSpeech]"]);
                await webSpeechService.current.speak(text);
                setVoiceState({
                    "useVoice.useCallback[playWebSpeech]": (prev)=>({
                            ...prev,
                            isPlaying: false
                        })
                }["useVoice.useCallback[playWebSpeech]"]);
            } catch (error) {
                console.error('Web Speech error:', error);
                setVoiceState({
                    "useVoice.useCallback[playWebSpeech]": (prev)=>({
                            ...prev,
                            error: null,
                            isPlaying: false
                        })
                }["useVoice.useCallback[playWebSpeech]"]);
            }
        }
    }["useVoice.useCallback[playWebSpeech]"], []);
    const playVoice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVoice.useCallback[playVoice]": async ()=>{
            if (isUsingChimes.current) {
                setVoiceState({
                    "useVoice.useCallback[playVoice]": (prev)=>({
                            ...prev,
                            isPlaying: true
                        })
                }["useVoice.useCallback[playVoice]"]);
                await chimeService.current.playPreparationChime();
                setTimeout({
                    "useVoice.useCallback[playVoice]": ()=>{
                        setVoiceState({
                            "useVoice.useCallback[playVoice]": (prev)=>({
                                    ...prev,
                                    isPlaying: false
                                })
                        }["useVoice.useCallback[playVoice]"]);
                    }
                }["useVoice.useCallback[playVoice]"], 3000);
            } else if (isUsingWebSpeech.current && webSpeechService.current) {
                playWebSpeech(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$elevenlabs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SACRED_PREPARATION_TEXT"]);
            } else if (audioRef.current && voiceState.isReady) {
                audioRef.current.play().catch({
                    "useVoice.useCallback[playVoice]": (error)=>{
                        console.error('Voice playback error:', error);
                        setVoiceState({
                            "useVoice.useCallback[playVoice]": (prev)=>({
                                    ...prev,
                                    error: 'Failed to play audio'
                                })
                        }["useVoice.useCallback[playVoice]"]);
                    }
                }["useVoice.useCallback[playVoice]"]);
            }
        }
    }["useVoice.useCallback[playVoice]"], [
        voiceState.isReady,
        playWebSpeech
    ]);
    const pauseVoice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVoice.useCallback[pauseVoice]": ()=>{
            if (isUsingChimes.current) {
                // Chimes can't really be paused, just stop the state
                setVoiceState({
                    "useVoice.useCallback[pauseVoice]": (prev)=>({
                            ...prev,
                            isPlaying: false
                        })
                }["useVoice.useCallback[pauseVoice]"]);
            } else if (isUsingWebSpeech.current && webSpeechService.current) {
                webSpeechService.current.pause();
                setVoiceState({
                    "useVoice.useCallback[pauseVoice]": (prev)=>({
                            ...prev,
                            isPlaying: false
                        })
                }["useVoice.useCallback[pauseVoice]"]);
            } else if (audioRef.current) {
                audioRef.current.pause();
            }
        }
    }["useVoice.useCallback[pauseVoice]"], []);
    const stopVoice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVoice.useCallback[stopVoice]": ()=>{
            console.log('Stopping all voice audio...');
            // Stop all active audio elements
            activeAudioRefs.current.forEach({
                "useVoice.useCallback[stopVoice]": (audio)=>{
                    if (audio) {
                        audio.pause();
                        audio.currentTime = 0;
                    }
                }
            }["useVoice.useCallback[stopVoice]"]);
            activeAudioRefs.current.clear();
            if (isUsingChimes.current) {
                // Chimes naturally stop, just reset state
                setVoiceState({
                    "useVoice.useCallback[stopVoice]": (prev)=>({
                            ...prev,
                            isPlaying: false,
                            currentTime: 0
                        })
                }["useVoice.useCallback[stopVoice]"]);
            } else if (isUsingWebSpeech.current && webSpeechService.current) {
                webSpeechService.current.stop();
                setVoiceState({
                    "useVoice.useCallback[stopVoice]": (prev)=>({
                            ...prev,
                            isPlaying: false,
                            currentTime: 0
                        })
                }["useVoice.useCallback[stopVoice]"]);
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
        }
    }["useVoice.useCallback[stopVoice]"], []);
    // Generate and play gong sound
    const playGong = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVoice.useCallback[playGong]": ()=>{
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
        }
    }["useVoice.useCallback[playGong]"], []);
    // Play session completion message
    const playCompletionMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVoice.useCallback[playCompletionMessage]": async ()=>{
            // Use chimes if that's our current fallback
            if (isUsingChimes.current) {
                setVoiceState({
                    "useVoice.useCallback[playCompletionMessage]": (prev)=>({
                            ...prev,
                            isPlaying: true
                        })
                }["useVoice.useCallback[playCompletionMessage]"]);
                await chimeService.current.playCompletionChime();
                setTimeout({
                    "useVoice.useCallback[playCompletionMessage]": ()=>{
                        setVoiceState({
                            "useVoice.useCallback[playCompletionMessage]": (prev)=>({
                                    ...prev,
                                    isPlaying: false
                                })
                        }["useVoice.useCallback[playCompletionMessage]"]);
                    }
                }["useVoice.useCallback[playCompletionMessage]"], 4000); // Completion chimes are longer
                return;
            }
            // Try Web Speech API fallback if ElevenLabs is not working
            if (isUsingWebSpeech.current || !completionVoiceService.current) {
                if (webSpeechService.current) {
                    await playWebSpeech(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$elevenlabs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SESSION_COMPLETION_TEXT"]);
                }
                return;
            }
            try {
                let audio = completionAudioRef.current;
                // If not preloaded, generate it now
                if (!audio && completionVoiceService.current) {
                    setVoiceState({
                        "useVoice.useCallback[playCompletionMessage]": (prev)=>({
                                ...prev,
                                isLoading: true,
                                error: null
                            })
                    }["useVoice.useCallback[playCompletionMessage]"]);
                    const audioUrl = await completionVoiceService.current.generateSpeechUrl(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$elevenlabs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SESSION_COMPLETION_TEXT"]);
                    audio = new Audio(audioUrl);
                    completionAudioRef.current = audio;
                }
                if (!audio) {
                    console.warn('ElevenLabs completion voice service not available, using fallback');
                    // Use chimes as preferred fallback over computer voice
                    if (chimeService.current) {
                        setVoiceState({
                            "useVoice.useCallback[playCompletionMessage]": (prev)=>({
                                    ...prev,
                                    isPlaying: true
                                })
                        }["useVoice.useCallback[playCompletionMessage]"]);
                        await chimeService.current.playCompletionChime();
                        setTimeout({
                            "useVoice.useCallback[playCompletionMessage]": ()=>{
                                setVoiceState({
                                    "useVoice.useCallback[playCompletionMessage]": (prev)=>({
                                            ...prev,
                                            isPlaying: false
                                        })
                                }["useVoice.useCallback[playCompletionMessage]"]);
                            }
                        }["useVoice.useCallback[playCompletionMessage]"], 4000);
                    } else if (webSpeechService.current) {
                        await playWebSpeech(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$elevenlabs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SESSION_COMPLETION_TEXT"]);
                    }
                    return;
                }
                // Set up event listeners for completion audio
                audio.onloadedmetadata = ({
                    "useVoice.useCallback[playCompletionMessage]": ()=>{
                        setVoiceState({
                            "useVoice.useCallback[playCompletionMessage]": (prev)=>({
                                    ...prev,
                                    isLoading: false,
                                    duration: audio.duration
                                })
                        }["useVoice.useCallback[playCompletionMessage]"]);
                    }
                })["useVoice.useCallback[playCompletionMessage]"];
                audio.ontimeupdate = ({
                    "useVoice.useCallback[playCompletionMessage]": ()=>{
                        setVoiceState({
                            "useVoice.useCallback[playCompletionMessage]": (prev)=>({
                                    ...prev,
                                    currentTime: audio.currentTime
                                })
                        }["useVoice.useCallback[playCompletionMessage]"]);
                    }
                })["useVoice.useCallback[playCompletionMessage]"];
                audio.onplay = ({
                    "useVoice.useCallback[playCompletionMessage]": ()=>{
                        setVoiceState({
                            "useVoice.useCallback[playCompletionMessage]": (prev)=>({
                                    ...prev,
                                    isPlaying: true
                                })
                        }["useVoice.useCallback[playCompletionMessage]"]);
                    }
                })["useVoice.useCallback[playCompletionMessage]"];
                audio.onpause = ({
                    "useVoice.useCallback[playCompletionMessage]": ()=>{
                        setVoiceState({
                            "useVoice.useCallback[playCompletionMessage]": (prev)=>({
                                    ...prev,
                                    isPlaying: false
                                })
                        }["useVoice.useCallback[playCompletionMessage]"]);
                    }
                })["useVoice.useCallback[playCompletionMessage]"];
                audio.onended = ({
                    "useVoice.useCallback[playCompletionMessage]": ()=>{
                        setVoiceState({
                            "useVoice.useCallback[playCompletionMessage]": (prev)=>({
                                    ...prev,
                                    isPlaying: false,
                                    currentTime: 0
                                })
                        }["useVoice.useCallback[playCompletionMessage]"]);
                    }
                })["useVoice.useCallback[playCompletionMessage]"];
                audio.onerror = ({
                    "useVoice.useCallback[playCompletionMessage]": ()=>{
                        setVoiceState({
                            "useVoice.useCallback[playCompletionMessage]": (prev)=>({
                                    ...prev,
                                    error: 'Failed to play completion message',
                                    isLoading: false,
                                    isPlaying: false
                                })
                        }["useVoice.useCallback[playCompletionMessage]"]);
                    }
                })["useVoice.useCallback[playCompletionMessage]"];
                // Pause current audio if any and play completion message
                if (audioRef.current) {
                    audioRef.current.pause();
                }
                // Reset and play
                audio.currentTime = 0;
                await audio.play();
            } catch (error) {
                console.error('Completion voice error:', error);
                setVoiceState({
                    "useVoice.useCallback[playCompletionMessage]": (prev)=>({
                            ...prev,
                            error: error instanceof Error ? error.message : 'Failed to play completion message',
                            isLoading: false,
                            isPlaying: false
                        })
                }["useVoice.useCallback[playCompletionMessage]"]);
            }
        }
    }["useVoice.useCallback[playCompletionMessage]"], []);
    // Play palming instructions message
    const playPalmingInstructions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVoice.useCallback[playPalmingInstructions]": async ()=>{
            // Use chimes if that's our current fallback
            if (isUsingChimes.current) {
                setVoiceState({
                    "useVoice.useCallback[playPalmingInstructions]": (prev)=>({
                            ...prev,
                            isPlaying: true
                        })
                }["useVoice.useCallback[playPalmingInstructions]"]);
                await chimeService.current.playPalmingChime();
                setTimeout({
                    "useVoice.useCallback[playPalmingInstructions]": ()=>{
                        setVoiceState({
                            "useVoice.useCallback[playPalmingInstructions]": (prev)=>({
                                    ...prev,
                                    isPlaying: false
                                })
                        }["useVoice.useCallback[playPalmingInstructions]"]);
                    }
                }["useVoice.useCallback[playPalmingInstructions]"], 4500); // Palming chimes are deep and longer
                return;
            }
            try {
                let audio = palmingAudioRef.current;
                // If not preloaded, generate it now
                if (!audio && completionVoiceService.current) {
                    setVoiceState({
                        "useVoice.useCallback[playPalmingInstructions]": (prev)=>({
                                ...prev,
                                isLoading: true,
                                error: null
                            })
                    }["useVoice.useCallback[playPalmingInstructions]"]);
                    const audioUrl = await completionVoiceService.current.generateSpeechUrl(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$elevenlabs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PALMING_INSTRUCTIONS_TEXT"]);
                    audio = new Audio(audioUrl);
                    palmingAudioRef.current = audio;
                }
                if (!audio) {
                    console.warn('ElevenLabs palming voice service not available, using chime fallback');
                    // Use chimes as preferred fallback
                    if (chimeService.current) {
                        setVoiceState({
                            "useVoice.useCallback[playPalmingInstructions]": (prev)=>({
                                    ...prev,
                                    isPlaying: true
                                })
                        }["useVoice.useCallback[playPalmingInstructions]"]);
                        await chimeService.current.playPalmingChime();
                        setTimeout({
                            "useVoice.useCallback[playPalmingInstructions]": ()=>{
                                setVoiceState({
                                    "useVoice.useCallback[playPalmingInstructions]": (prev)=>({
                                            ...prev,
                                            isPlaying: false
                                        })
                                }["useVoice.useCallback[playPalmingInstructions]"]);
                            }
                        }["useVoice.useCallback[playPalmingInstructions]"], 4500);
                    }
                    return;
                }
                // Set up event listeners for palming audio
                audio.onloadedmetadata = ({
                    "useVoice.useCallback[playPalmingInstructions]": ()=>{
                        setVoiceState({
                            "useVoice.useCallback[playPalmingInstructions]": (prev)=>({
                                    ...prev,
                                    isLoading: false,
                                    duration: audio.duration
                                })
                        }["useVoice.useCallback[playPalmingInstructions]"]);
                    }
                })["useVoice.useCallback[playPalmingInstructions]"];
                audio.ontimeupdate = ({
                    "useVoice.useCallback[playPalmingInstructions]": ()=>{
                        setVoiceState({
                            "useVoice.useCallback[playPalmingInstructions]": (prev)=>({
                                    ...prev,
                                    currentTime: audio.currentTime
                                })
                        }["useVoice.useCallback[playPalmingInstructions]"]);
                    }
                })["useVoice.useCallback[playPalmingInstructions]"];
                audio.onplay = ({
                    "useVoice.useCallback[playPalmingInstructions]": ()=>{
                        setVoiceState({
                            "useVoice.useCallback[playPalmingInstructions]": (prev)=>({
                                    ...prev,
                                    isPlaying: true
                                })
                        }["useVoice.useCallback[playPalmingInstructions]"]);
                    }
                })["useVoice.useCallback[playPalmingInstructions]"];
                audio.onpause = ({
                    "useVoice.useCallback[playPalmingInstructions]": ()=>{
                        setVoiceState({
                            "useVoice.useCallback[playPalmingInstructions]": (prev)=>({
                                    ...prev,
                                    isPlaying: false
                                })
                        }["useVoice.useCallback[playPalmingInstructions]"]);
                    }
                })["useVoice.useCallback[playPalmingInstructions]"];
                audio.onended = ({
                    "useVoice.useCallback[playPalmingInstructions]": ()=>{
                        setVoiceState({
                            "useVoice.useCallback[playPalmingInstructions]": (prev)=>({
                                    ...prev,
                                    isPlaying: false,
                                    currentTime: 0
                                })
                        }["useVoice.useCallback[playPalmingInstructions]"]);
                    }
                })["useVoice.useCallback[playPalmingInstructions]"];
                audio.onerror = ({
                    "useVoice.useCallback[playPalmingInstructions]": ()=>{
                        setVoiceState({
                            "useVoice.useCallback[playPalmingInstructions]": (prev)=>({
                                    ...prev,
                                    error: 'Failed to play palming instructions',
                                    isLoading: false,
                                    isPlaying: false
                                })
                        }["useVoice.useCallback[playPalmingInstructions]"]);
                    }
                })["useVoice.useCallback[playPalmingInstructions]"];
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
                setVoiceState({
                    "useVoice.useCallback[playPalmingInstructions]": (prev)=>({
                            ...prev,
                            error: error instanceof Error ? error.message : 'Failed to play palming instructions',
                            isLoading: false,
                            isPlaying: false
                        })
                }["useVoice.useCallback[playPalmingInstructions]"]);
            }
        }
    }["useVoice.useCallback[playPalmingInstructions]"], []);
    // Cleanup on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useVoice.useEffect": ()=>{
            return ({
                "useVoice.useEffect": ()=>{
                    // Stop all active audio elements
                    activeAudioRefs.current.forEach({
                        "useVoice.useEffect": (audio)=>{
                            if (audio) {
                                audio.pause();
                            }
                        }
                    }["useVoice.useEffect"]);
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
                }
            })["useVoice.useEffect"];
        }
    }["useVoice.useEffect"], []);
    // Play palm warming guidance
    const playPalmWarmingGuidance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVoice.useCallback[playPalmWarmingGuidance]": async ()=>{
            if (isUsingChimes.current) {
                await chimeService.current.playPreparationChime();
                return;
            }
            try {
                if (completionVoiceService.current) {
                    const audioUrl = await completionVoiceService.current.generateSpeechUrl(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$elevenlabs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PALM_WARMING_TEXT"]);
                    const audio = new Audio(audioUrl);
                    audio.volume = 0.8;
                    // Track this audio element
                    activeAudioRefs.current.add(audio);
                    // Clean up when audio ends
                    audio.onended = ({
                        "useVoice.useCallback[playPalmWarmingGuidance]": ()=>{
                            activeAudioRefs.current.delete(audio);
                        }
                    })["useVoice.useCallback[playPalmWarmingGuidance]"];
                    await audio.play();
                } else if (webSpeechService.current) {
                    await playWebSpeech(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$elevenlabs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PALM_WARMING_TEXT"]);
                } else {
                    await chimeService.current.playPreparationChime();
                }
            } catch (error) {
                console.error('Palm warming voice error:', error);
                await chimeService.current.playPreparationChime();
            }
        }
    }["useVoice.useCallback[playPalmWarmingGuidance]"], [
        playWebSpeech
    ]);
    // Play eye sanctuary guidance
    const playEyeSanctuaryGuidance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVoice.useCallback[playEyeSanctuaryGuidance]": async ()=>{
            if (isUsingChimes.current) {
                await chimeService.current.playTransitionChime();
                return;
            }
            try {
                if (completionVoiceService.current) {
                    const audioUrl = await completionVoiceService.current.generateSpeechUrl(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$elevenlabs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EYE_SANCTUARY_TEXT"]);
                    const audio = new Audio(audioUrl);
                    audio.volume = 0.8;
                    // Track this audio element
                    activeAudioRefs.current.add(audio);
                    // Clean up when audio ends
                    audio.onended = ({
                        "useVoice.useCallback[playEyeSanctuaryGuidance]": ()=>{
                            activeAudioRefs.current.delete(audio);
                        }
                    })["useVoice.useCallback[playEyeSanctuaryGuidance]"];
                    await audio.play();
                } else if (webSpeechService.current) {
                    await playWebSpeech(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$elevenlabs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EYE_SANCTUARY_TEXT"]);
                } else {
                    await chimeService.current.playTransitionChime();
                }
            } catch (error) {
                console.error('Eye sanctuary voice error:', error);
                await chimeService.current.playTransitionChime();
            }
        }
    }["useVoice.useCallback[playEyeSanctuaryGuidance]"], [
        playWebSpeech
    ]);
    // Play inner sun meditation guidance
    const playInnerSunGuidance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVoice.useCallback[playInnerSunGuidance]": async ()=>{
            if (isUsingChimes.current) {
                await chimeService.current.playPalmingChime();
                return;
            }
            try {
                if (completionVoiceService.current) {
                    const audioUrl = await completionVoiceService.current.generateSpeechUrl(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$elevenlabs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INNER_SUN_MEDITATION_TEXT"]);
                    const audio = new Audio(audioUrl);
                    audio.volume = 0.8;
                    // Track this audio element
                    activeAudioRefs.current.add(audio);
                    // Clean up when audio ends
                    audio.onended = ({
                        "useVoice.useCallback[playInnerSunGuidance]": ()=>{
                            activeAudioRefs.current.delete(audio);
                        }
                    })["useVoice.useCallback[playInnerSunGuidance]"];
                    await audio.play();
                } else if (webSpeechService.current) {
                    await playWebSpeech(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$elevenlabs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INNER_SUN_MEDITATION_TEXT"]);
                } else {
                    await chimeService.current.playPalmingChime();
                }
            } catch (error) {
                console.error('Inner sun voice error:', error);
                await chimeService.current.playPalmingChime();
            }
        }
    }["useVoice.useCallback[playInnerSunGuidance]"], [
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
_s(useVoice, "9UR1dkXRJBP8IQM82KHLB+qB184=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SUNGAZE APP/package.json/src/app/hooks/useSunVisibility.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getOptimalGazingTime",
    ()=>getOptimalGazingTime,
    "getSunPhase",
    ()=>getSunPhase,
    "useSunVisibility",
    ()=>useSunVisibility
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function useSunVisibility() {
    _s();
    const [sunCondition, setSunCondition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        isVisible: true,
        cloudCover: 20,
        solarWindowStart: null,
        minutesToWindow: 0,
        canGaze: true,
        condition: 'clear',
        message: 'Detecting your location for accurate conditions...',
        location: 'Unknown'
    });
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [locationData, setLocationData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Get user's location with better fallbacks
    const getUserLocation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSunVisibility.useCallback[getUserLocation]": ()=>{
            return new Promise({
                "useSunVisibility.useCallback[getUserLocation]": (resolve)=>{
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
                    navigator.geolocation.getCurrentPosition({
                        "useSunVisibility.useCallback[getUserLocation]": async (position)=>{
                            const { latitude, longitude } = position.coords;
                            // Use coordinates without API calls to avoid complexity
                            const location = {
                                lat: latitude,
                                lon: longitude,
                                city: 'Your Location',
                                country: ''
                            };
                            resolve(location);
                        }
                    }["useSunVisibility.useCallback[getUserLocation]"], {
                        "useSunVisibility.useCallback[getUserLocation]": (error)=>{
                            // Handle permission denied gracefully
                            console.info('Location permission denied or unavailable, using fallback');
                            resolve(fallbackLocation);
                        }
                    }["useSunVisibility.useCallback[getUserLocation]"], {
                        timeout: 5000,
                        maximumAge: 600000,
                        enableHighAccuracy: false // Less intrusive
                    });
                }
            }["useSunVisibility.useCallback[getUserLocation]"]);
        }
    }["useSunVisibility.useCallback[getUserLocation]"], []);
    // Fetch weather data for location
    const getWeatherData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSunVisibility.useCallback[getWeatherData]": async (location)=>{
            try {
                var _data_clouds, _data_weather_, _data_weather, _data_main;
                const apiKey = __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
                if (!apiKey) {
                    console.warn('OpenWeather API key not found');
                    return null;
                }
                const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=".concat(location.lat, "&lon=").concat(location.lon, "&appid=").concat(apiKey, "&units=imperial"));
                if (!response.ok) {
                    throw new Error('Weather API request failed');
                }
                const data = await response.json();
                return {
                    cloudCover: ((_data_clouds = data.clouds) === null || _data_clouds === void 0 ? void 0 : _data_clouds.all) || 0,
                    weatherCondition: ((_data_weather = data.weather) === null || _data_weather === void 0 ? void 0 : (_data_weather_ = _data_weather[0]) === null || _data_weather_ === void 0 ? void 0 : _data_weather_.main) || 'Clear',
                    temperature: ((_data_main = data.main) === null || _data_main === void 0 ? void 0 : _data_main.temp) || 70,
                    visibility: data.visibility ? data.visibility / 1000 : 10 // Convert to km
                };
            } catch (error) {
                console.error('Weather fetch error:', error);
                return null;
            }
        }
    }["useSunVisibility.useCallback[getWeatherData]"], []);
    // Detect sun conditions based on time with optional location
    const checkSunConditions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSunVisibility.useCallback[checkSunConditions]": async ()=>{
            console.log('🌤️ checkSunConditions called');
            const now = new Date();
            const hour = now.getHours();
            const timeOfDay = hour >= 6 && hour <= 18 ? 'day' : 'night';
            console.log("🌤️ Current time: ".concat(hour, ":00, timeOfDay: ").concat(timeOfDay));
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
                    message = "Excellent morning conditions for sun gazing";
                    cloudCover = 10;
                } else if (hour >= 17 && hour < 19) {
                    message = "Golden hour. Perfect for evening sun practice.";
                    cloudCover = 12;
                } else if (hour >= 8 && hour < 10) {
                    message = "Good morning conditions. Sun intensity building.";
                    cloudCover = 15;
                } else if (hour >= 16 && hour < 17) {
                    message = "Clear afternoon. Evening window approaching.";
                    cloudCover = 18;
                } else {
                    // Midday - suggest waiting for optimal window
                    const eveningWindow = new Date(now);
                    eveningWindow.setHours(17, 0, 0, 0);
                    solarWindowStart = eveningWindow;
                    minutesToWindow = Math.floor((eveningWindow.getTime() - now.getTime()) / (1000 * 60));
                    if (minutesToWindow > 0) {
                        message = "Clear skies. Your optimal window begins in ".concat(Math.floor(minutesToWindow / 60), "h ").concat(minutesToWindow % 60, "m.");
                        cloudCover = 20;
                    } else {
                        message = "Perfect evening conditions for sun gazing";
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
            setTimeout({
                "useSunVisibility.useCallback[checkSunConditions]": ()=>{
                    console.log('🌤️ State update completed, current condition:', newCondition);
                }
            }["useSunVisibility.useCallback[checkSunConditions]"], 100);
        }
    }["useSunVisibility.useCallback[checkSunConditions]"], [
        locationData,
        getWeatherData
    ]);
    // Check conditions on mount and periodically
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSunVisibility.useEffect": ()=>{
            const runCheck = {
                "useSunVisibility.useEffect.runCheck": async ()=>{
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
                }
            }["useSunVisibility.useEffect.runCheck"];
            runCheck();
            // Update every 2 minutes (less frequent to avoid permission prompts)
            const interval = setInterval(runCheck, 120000);
            return ({
                "useSunVisibility.useEffect": ()=>clearInterval(interval)
            })["useSunVisibility.useEffect"];
        }
    }["useSunVisibility.useEffect"], [
        checkSunConditions
    ]);
    // Manual refresh for testing
    const refreshConditions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSunVisibility.useCallback[refreshConditions]": async ()=>{
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
        }
    }["useSunVisibility.useCallback[refreshConditions]"], [
        checkSunConditions,
        sunCondition
    ]);
    return {
        sunCondition,
        isLoading,
        refreshConditions
    };
}
_s(useSunVisibility, "XvW5Xa8byzaKKH3xfKDfgEcNKbI=");
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SUNGAZE APP/package.json/src/app/hooks/useSolarWindowNotifications.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Hook for managing solar window notifications and reminders
__turbopack_context__.s([
    "useSolarWindowNotifications",
    ()=>useSolarWindowNotifications
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$weatherService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/src/app/lib/weatherService.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
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
    _s();
    const [preferences, setPreferences] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_PREFERENCES);
    const [isNotificationVisible, setIsNotificationVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lastChecked, setLastChecked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // Load preferences from localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSolarWindowNotifications.useEffect": ()=>{
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
        }
    }["useSolarWindowNotifications.useEffect"], []);
    // Save preferences to localStorage
    const savePreferences = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSolarWindowNotifications.useCallback[savePreferences]": (newPreferences)=>{
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(newPreferences));
                setPreferences(newPreferences);
            } catch (error) {
                console.error('Failed to save notification preferences:', error);
            }
        }
    }["useSolarWindowNotifications.useCallback[savePreferences]"], []);
    // Check if we should show a notification
    const checkForSolarWindow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSolarWindowNotifications.useCallback[checkForSolarWindow]": async ()=>{
            if (!preferences.enabled) return;
            // Don't check too frequently (max once per 5 minutes)
            const now = Date.now();
            if (now - lastChecked < 5 * 60 * 1000) return;
            try {
                const result = await __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$weatherService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["weatherService"].shouldTriggerSolarWindow();
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
        }
    }["useSolarWindowNotifications.useCallback[checkForSolarWindow]"], [
        preferences,
        lastChecked
    ]);
    // Start periodic checking
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSolarWindowNotifications.useEffect": ()=>{
            if (!preferences.enabled) return;
            // Check immediately
            checkForSolarWindow();
            // Set up interval for periodic checking
            const interval = setInterval(checkForSolarWindow, 5 * 60 * 1000); // Every 5 minutes
            return ({
                "useSolarWindowNotifications.useEffect": ()=>clearInterval(interval)
            })["useSolarWindowNotifications.useEffect"];
        }
    }["useSolarWindowNotifications.useEffect"], [
        checkForSolarWindow,
        preferences.enabled
    ]);
    // Handle notification close
    const closeNotification = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSolarWindowNotifications.useCallback[closeNotification]": ()=>{
            setIsNotificationVisible(false);
        }
    }["useSolarWindowNotifications.useCallback[closeNotification]"], []);
    // Update preferences
    const updatePreferences = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSolarWindowNotifications.useCallback[updatePreferences]": (updates)=>{
            const newPreferences = {
                ...preferences,
                ...updates
            };
            savePreferences(newPreferences);
        }
    }["useSolarWindowNotifications.useCallback[updatePreferences]"], [
        preferences,
        savePreferences
    ]);
    // Enable/disable notifications
    const toggleNotifications = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSolarWindowNotifications.useCallback[toggleNotifications]": ()=>{
            updatePreferences({
                enabled: !preferences.enabled
            });
        }
    }["useSolarWindowNotifications.useCallback[toggleNotifications]"], [
        preferences.enabled,
        updatePreferences
    ]);
    // Set reminder time
    const setReminderTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSolarWindowNotifications.useCallback[setReminderTime]": (minutes)=>{
            updatePreferences({
                reminderTime: Math.max(5, Math.min(60, minutes))
            });
        }
    }["useSolarWindowNotifications.useCallback[setReminderTime]"], [
        updatePreferences
    ]);
    // Toggle morning reminder
    const toggleMorningReminder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSolarWindowNotifications.useCallback[toggleMorningReminder]": ()=>{
            updatePreferences({
                morningReminder: !preferences.morningReminder
            });
        }
    }["useSolarWindowNotifications.useCallback[toggleMorningReminder]"], [
        preferences.morningReminder,
        updatePreferences
    ]);
    // Toggle evening reminder
    const toggleEveningReminder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSolarWindowNotifications.useCallback[toggleEveningReminder]": ()=>{
            updatePreferences({
                eveningReminder: !preferences.eveningReminder
            });
        }
    }["useSolarWindowNotifications.useCallback[toggleEveningReminder]"], [
        preferences.eveningReminder,
        updatePreferences
    ]);
    // Get cache statistics
    const getCacheStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSolarWindowNotifications.useCallback[getCacheStats]": ()=>{
            return __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$weatherService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["weatherService"].getCacheStats();
        }
    }["useSolarWindowNotifications.useCallback[getCacheStats]"], []);
    // Clear caches (for testing)
    const clearCaches = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSolarWindowNotifications.useCallback[clearCaches]": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$weatherService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["weatherService"].clearCaches();
        }
    }["useSolarWindowNotifications.useCallback[clearCaches]"], []);
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
_s(useSolarWindowNotifications, "QIz0CyvHhtPT2nqyddWCtBNOZwk=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SUNGAZE APP/package.json/src/app/types/subscription.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
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
        stripePriceId: __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.STRIPE_PREMIUM_PRICE_ID || 'price_1S4RCeGIDaitR9oVNXvlNVRF'
    },
    {
        id: 'founder_444',
        name: 'Founder 444',
        description: '3 years full access. Only 444 ever.',
        price: 99,
        currency: 'USD',
        type: 'one_time',
        tier: 'founder_444',
        stripePriceId: __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.STRIPE_FOUNDER_PRICE_ID || 'price_1S4REHGIDaitR9oVV134V0tQ'
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SUNGAZE APP/package.json/src/app/data/truthScrolls.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=SUNGAZE%20APP_package_json_src_app_f0ed0043._.js.map