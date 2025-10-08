(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/SUNGAZE APP/package.json/src/app/lib/storage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Local-first storage for offline practice
// Stores user progress, settings, and practice data locally
__turbopack_context__.s([
    "localStorage",
    ()=>localStorage
]);
// Local Storage Keys
const STORAGE_KEYS = {
    USER_PROGRESS: 'sungaze_user_progress',
    USER_SETTINGS: 'sungaze_user_settings',
    PRACTICE_QUEUE: 'sungaze_practice_queue'
};
class LocalStorage {
    // User Progress Methods
    getUserProgress() {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        try {
            const stored = window.localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
            if (!stored) return this.getDefaultProgress();
            const parsed = JSON.parse(stored);
            return {
                ...this.getDefaultProgress(),
                ...parsed
            };
        } catch (error) {
            console.error('Error loading user progress:', error);
            return this.getDefaultProgress();
        }
    }
    saveUserProgress(progress) {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        try {
            window.localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(progress));
        } catch (error) {
            console.error('Error saving user progress:', error);
        }
    }
    getDefaultProgress() {
        return {
            currentDay: 1,
            totalPractices: 0,
            currentStreak: 0,
            longestStreak: 0,
            lastPracticeDate: null,
            practiceHistory: []
        };
    }
    // User Settings Methods
    getUserSettings() {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        try {
            const stored = window.localStorage.getItem(STORAGE_KEYS.USER_SETTINGS);
            if (!stored) return this.getDefaultSettings();
            const parsed = JSON.parse(stored);
            return {
                ...this.getDefaultSettings(),
                ...parsed
            };
        } catch (error) {
            console.error('Error loading user settings:', error);
            return this.getDefaultSettings();
        }
    }
    saveUserSettings(settings) {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        try {
            window.localStorage.setItem(STORAGE_KEYS.USER_SETTINGS, JSON.stringify(settings));
        } catch (error) {
            console.error('Error saving user settings:', error);
        }
    }
    getDefaultSettings() {
        return {
            notifications: {
                sunriseReminder: true,
                sunsetReminder: true,
                dailyEncouragement: true
            },
            safetySettings: {
                maxUVIndex: 2,
                autoStopEnabled: true,
                locationBasedTiming: true
            },
            theme: 'auto'
        };
    }
    // Practice Session Methods
    addPracticeSession(session) {
        const progress = this.getUserProgress();
        const today = new Date().toISOString().split('T')[0];
        // Add to history
        progress.practiceHistory.push(session);
        progress.totalPractices++;
        // Update streak
        if (progress.lastPracticeDate === today) {
        // Same day practice - don't update streak
        } else if (this.isConsecutiveDay(progress.lastPracticeDate, today)) {
            progress.currentStreak++;
            progress.longestStreak = Math.max(progress.longestStreak, progress.currentStreak);
        } else {
            progress.currentStreak = 1;
        }
        progress.lastPracticeDate = today;
        // Auto-advance day if they complete their target
        const todaysSessions = progress.practiceHistory.filter((p)=>p.date === today);
        const todaysTotal = todaysSessions.reduce((sum, p)=>sum + p.duration, 0);
        const targetTime = progress.currentDay * 10; // 10 seconds per day
        if (todaysTotal >= targetTime && progress.currentDay < 270) {
            progress.currentDay++;
        }
        this.saveUserProgress(progress);
    }
    isConsecutiveDay(lastDate, currentDate) {
        if (!lastDate) return true; // First practice
        const last = new Date(lastDate);
        const current = new Date(currentDate);
        const diffTime = current.getTime() - last.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays === 1;
    }
    // Offline Queue Methods (for when GPS/UV data isn't available)
    addToOfflineQueue(session) {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        try {
            const queue = this.getOfflineQueue();
            queue.push({
                ...session,
                id: Date.now().toString(),
                timestamp: Date.now()
            });
            window.localStorage.setItem(STORAGE_KEYS.PRACTICE_QUEUE, JSON.stringify(queue));
        } catch (error) {
            console.error('Error adding to offline queue:', error);
        }
    }
    getOfflineQueue() {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        try {
            const stored = window.localStorage.getItem(STORAGE_KEYS.PRACTICE_QUEUE);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading offline queue:', error);
            return [];
        }
    }
    clearOfflineQueue() {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        window.localStorage.removeItem(STORAGE_KEYS.PRACTICE_QUEUE);
    }
}
const localStorage = new LocalStorage();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SUNGAZE APP/package.json/src/app/lib/meditativeChimes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Sacred meditation chimes using Web Audio API
// Creates beautiful, calming sound alternatives to voice guidance
__turbopack_context__.s([
    "MeditativeChimes",
    ()=>MeditativeChimes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
;
class MeditativeChimes {
    async ensureAudioContext() {
        if (!this.audioContext || this.audioContext.state === 'suspended') {
            try {
                var _this_audioContext;
                await ((_this_audioContext = this.audioContext) === null || _this_audioContext === void 0 ? void 0 : _this_audioContext.resume());
            } catch (error) {
                console.warn('Could not resume audio context:', error);
            }
        }
    }
    // Sacred preparation chime - gentle awakening
    async playPreparationChime() {
        if (!this.audioContext || !this.masterGain) return;
        await this.ensureAudioContext();
        const now = this.audioContext.currentTime;
        // Create a series of ascending bell-like tones
        const frequencies = [
            220,
            330,
            440
        ]; // A3, E4, A4 - harmonious intervals
        for(let i = 0; i < frequencies.length; i++){
            setTimeout(()=>{
                this.playBellTone(frequencies[i], 1.5, 0.2);
            }, i * 800); // 800ms between each tone
        }
    }
    // Session completion chime - three descending tones for closure
    async playCompletionChime() {
        if (!this.audioContext || !this.masterGain) return;
        await this.ensureAudioContext();
        // Descending sacred tones for completion
        const frequencies = [
            528,
            396,
            256
        ]; // Solfeggio-inspired frequencies
        for(let i = 0; i < frequencies.length; i++){
            setTimeout(()=>{
                this.playBellTone(frequencies[i], 2.0, 0.25);
            }, i * 1000); // 1 second between each tone
        }
    }
    // Palming chime - single deep resonant tone
    async playPalmingChime() {
        if (!this.audioContext || !this.masterGain) return;
        await this.ensureAudioContext();
        // Deep, grounding tone for palming
        this.playBowlTone(136.1, 4.0, 0.3); // C# - Earth frequency
    }
    // Sacred transition chime - for ritual mode changes
    async playTransitionChime() {
        if (!this.audioContext || !this.masterGain) return;
        await this.ensureAudioContext();
        // Quick, gentle confirmation chime
        this.playBellTone(440, 0.8, 0.15);
        setTimeout(()=>{
            this.playBellTone(880, 0.8, 0.15);
        }, 300);
    }
    playBellTone(frequency, duration) {
        let volume = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0.2;
        if (!this.audioContext || !this.masterGain) return;
        const now = this.audioContext.currentTime;
        // Create oscillator for fundamental frequency
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        // Add harmonics for bell-like quality
        const osc2 = this.audioContext.createOscillator();
        const gain2 = this.audioContext.createGain();
        // Connect nodes
        osc.connect(gain);
        osc2.connect(gain2);
        gain.connect(this.masterGain);
        gain2.connect(this.masterGain);
        // Set frequencies (fundamental + harmonic)
        osc.frequency.setValueAtTime(frequency, now);
        osc2.frequency.setValueAtTime(frequency * 2.5, now); // Higher harmonic
        // Bell envelope - quick attack, slow decay
        gain.gain.setValueAtTime(0, now);
        gain.gain.exponentialRampToValueAtTime(volume, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
        // Harmonic envelope - softer
        gain2.gain.setValueAtTime(0, now);
        gain2.gain.exponentialRampToValueAtTime(volume * 0.3, now + 0.02);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.7);
        // Sine wave for pure, meditative tone
        osc.type = 'sine';
        osc2.type = 'sine';
        // Play and stop
        osc.start(now);
        osc2.start(now);
        osc.stop(now + duration);
        osc2.stop(now + duration);
    }
    playBowlTone(frequency, duration) {
        let volume = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0.25;
        if (!this.audioContext || !this.masterGain) return;
        const now = this.audioContext.currentTime;
        // Create multiple oscillators for singing bowl effect
        const oscillators = [];
        const gains = [];
        // Fundamental + harmonics for rich bowl sound
        const harmonics = [
            1,
            2.4,
            4.2,
            6.8
        ]; // Non-integer ratios for bowl-like timbre
        for(let i = 0; i < harmonics.length; i++){
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.frequency.setValueAtTime(frequency * harmonics[i], now);
            osc.type = 'sine';
            // Each harmonic has different envelope and volume
            const harmVolume = volume * Math.pow(0.4, i);
            gain.gain.setValueAtTime(0, now);
            gain.gain.exponentialRampToValueAtTime(harmVolume, now + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
            oscillators.push(osc);
            gains.push(gain);
        }
        // Start all oscillators
        oscillators.forEach((osc)=>{
            osc.start(now);
            osc.stop(now + duration);
        });
    }
    // Single confirmation chime for UI interactions
    async playConfirmationChime() {
        if (!this.audioContext || !this.masterGain) return;
        await this.ensureAudioContext();
        this.playBellTone(660, 0.5, 0.1); // Quick, gentle confirmation
    }
    // Error/warning chime - gentle but noticeable
    async playWarningChime() {
        if (!this.audioContext || !this.masterGain) return;
        await this.ensureAudioContext();
        // Two-tone gentle warning
        this.playBellTone(300, 0.6, 0.15);
        setTimeout(()=>{
            this.playBellTone(200, 0.6, 0.15);
        }, 200);
    }
    constructor(){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "audioContext", null);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "masterGain", null);
        if ("TURBOPACK compile-time truthy", 1) {
            try {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                this.masterGain = this.audioContext.createGain();
                this.masterGain.connect(this.audioContext.destination);
                this.masterGain.gain.value = 0.3; // Gentle volume
            } catch (error) {
                console.warn('Web Audio API not supported:', error);
            }
        }
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SUNGAZE APP/package.json/src/app/lib/solarLevels.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Solar Master Progression System - 4 Levels over 9 months
// Replaces the old milestone system with gamified progression
__turbopack_context__.s([
    "SOLAR_LEVELS",
    ()=>SOLAR_LEVELS,
    "checkLevelUp",
    ()=>checkLevelUp,
    "getCurrentSolarLevel",
    ()=>getCurrentSolarLevel,
    "getDefaultLevelProgress",
    ()=>getDefaultLevelProgress,
    "getLevelContent",
    ()=>getLevelContent,
    "getLevelMotivation",
    ()=>getLevelMotivation,
    "getLevelProgress",
    ()=>getLevelProgress,
    "getNextSolarLevel",
    ()=>getNextSolarLevel,
    "loadLevelProgress",
    ()=>loadLevelProgress,
    "saveLevelProgress",
    ()=>saveLevelProgress
]);
const SOLAR_LEVELS = [
    {
        id: 'solar-apprentice',
        levelNumber: 1,
        title: 'Solar Apprentice',
        subtitle: 'Foundation',
        emoji: '🟢',
        dayRange: [
            1,
            90
        ],
        durationRange: [
            0.17,
            15
        ],
        description: 'Your solar journey begins! Start with 10 seconds and add 10 seconds daily. Always barefoot on earth.',
        practices: [
            'Direct sun gazing at sunrise/sunset',
            'Always barefoot on earth',
            '+10 seconds daily progression',
            'Grounding connection ritual'
        ],
        unlocks: [
            'HRM education modules',
            'Light as food concepts',
            'Pineal activation guidance',
            'Barefoot walking timer'
        ],
        goal: 'Reach 15 minutes of safe daily gazing',
        timeline: 'Days 1-90',
        color: 'text-green-400',
        achievement: {
            name: 'First Rays',
            icon: '🌱',
            badge: 'Apprentice Badge',
            auraColor: 'green',
            visualEffect: 'Green aura glow with growing light effect'
        },
        benefits: [
            'HRM education modules (light as food, pineal activation)',
            'Barefoot tracker with solar soundscapes',
            'Grounding meditation library',
            'Solar nutrition guidance'
        ],
        quest: {
            title: 'Solar Foundation',
            description: 'Master the foundation of HRM practice with barefoot connection',
            requirement: 'Reach 15 minutes barefoot + gazing',
            trackingType: 'duration'
        }
    },
    {
        id: 'solar-adept',
        levelNumber: 2,
        title: 'Solar Adept',
        subtitle: 'Integration Master',
        emoji: '🟡',
        dayRange: [
            91,
            180
        ],
        durationRange: [
            15,
            30
        ],
        description: 'Deepening your practice. Notice cellular changes, pineal activation, and light integration.',
        practices: [
            'Extended gazing sessions',
            'Pineal activation focus',
            'Light integration meditation',
            'Cellular reprogramming awareness'
        ],
        unlocks: [
            'Advanced pineal activation',
            'Cellular light integration',
            'Solar nutrition protocols',
            'Light-body meditation'
        ],
        goal: 'Reach 30 minutes and notice profound changes',
        timeline: 'Days 91-180',
        color: 'text-yellow-400',
        achievement: {
            name: 'Light Weaver',
            icon: '⚡',
            badge: 'Adept Badge',
            auraColor: 'yellow',
            visualEffect: 'Golden aura with electric sparkles'
        },
        benefits: [
            'Advanced pineal activation techniques',
            'Cellular light integration protocols',
            'Solar nutrition masterclass',
            'Light-body meditation library'
        ],
        quest: {
            title: 'Light Integration',
            description: 'Integrate solar light at the cellular level',
            requirement: 'Reach 30 minutes + log cellular changes',
            trackingType: 'milestone'
        }
    },
    {
        id: 'inner-sun-adept',
        levelNumber: 3,
        title: 'Inner Sun Adept',
        subtitle: 'Light Mastery',
        emoji: '🟠',
        dayRange: [
            181,
            270
        ],
        durationRange: [
            30,
            44
        ],
        description: 'Approaching the sacred 44-minute threshold. Inner sun activation begins.',
        practices: [
            'Extended 30+ minute sessions',
            'Inner sun visualization',
            'Light-body activation',
            'Solar consciousness expansion'
        ],
        unlocks: [
            'Inner sun activation',
            'Light-body protocols',
            'Solar consciousness expansion',
            'Master-level guidance'
        ],
        goal: 'Reach 44 minutes and activate inner sun',
        timeline: 'Days 181-270',
        color: 'text-orange-400',
        achievement: {
            name: 'Inner Sun',
            icon: '☀️',
            badge: 'Light Master Badge',
            auraColor: 'orange',
            visualEffect: 'Orange aura with inner sun glow'
        },
        benefits: [
            'Inner sun activation techniques',
            'Light-body development protocols',
            'Solar consciousness expansion',
            'Master-level guidance and support'
        ],
        quest: {
            title: 'Inner Sun Activation',
            description: 'Activate your inner sun and reach the sacred 44-minute threshold',
            requirement: 'Reach 44 minutes + inner sun activation',
            trackingType: 'milestone'
        }
    },
    {
        id: 'solar-master',
        levelNumber: 4,
        title: 'Solar Master',
        subtitle: 'Light Integration',
        emoji: '🔴',
        dayRange: [
            271,
            365
        ],
        durationRange: [
            44,
            44
        ],
        description: 'You have reached the sacred 44-minute threshold. Now focus on integration and mastery.',
        practices: [
            'Maintain 44-minute sessions',
            'Light integration mastery',
            'Teaching and sharing wisdom',
            'Advanced solar consciousness'
        ],
        unlocks: [
            'Master-level content',
            'Teaching capabilities',
            'Advanced solar protocols',
            'Community leadership'
        ],
        goal: 'Master light integration and share wisdom',
        timeline: 'Days 271-365',
        color: 'text-red-400',
        achievement: {
            name: 'Solar Master',
            icon: '👑',
            badge: 'Master Badge',
            auraColor: 'red',
            visualEffect: 'Red aura with master crown effect'
        },
        benefits: [
            'Master-level content and protocols',
            'Teaching and mentorship capabilities',
            'Advanced solar consciousness techniques',
            'Community leadership opportunities'
        ],
        quest: {
            title: 'Master Integration',
            description: 'Master light integration and begin sharing wisdom with others',
            requirement: 'Maintain 44 minutes + help 3 others start',
            trackingType: 'community'
        }
    }
];
const LEVEL_STORAGE_KEY = 'solar_level_progress';
function getCurrentSolarLevel(day) {
    const level = SOLAR_LEVELS.find((level)=>day >= level.dayRange[0] && day <= level.dayRange[1]);
    // Ensure we always return a valid level with dayRange
    if (!level || !level.dayRange) {
        return SOLAR_LEVELS[0]; // Default to Solar Apprentice
    }
    return level;
}
function getNextSolarLevel(currentDay) {
    const currentLevel = getCurrentSolarLevel(currentDay);
    const nextLevelIndex = SOLAR_LEVELS.findIndex((l)=>l.id === currentLevel.id) + 1;
    return nextLevelIndex < SOLAR_LEVELS.length ? SOLAR_LEVELS[nextLevelIndex] : null;
}
function getLevelProgress(day, completedMinutes) {
    const currentLevel = getCurrentSolarLevel(day);
    const nextLevel = getNextSolarLevel(day);
    const [levelStartDay, levelEndDay] = currentLevel.dayRange;
    const daysInLevel = Math.max(1, day - levelStartDay + 1);
    const totalDaysInLevel = levelEndDay - levelStartDay + 1;
    const progressPercent = Math.min(100, daysInLevel / totalDaysInLevel * 100);
    const isLevelComplete = day >= levelEndDay;
    return {
        currentLevel,
        nextLevel,
        progressPercent,
        daysInLevel,
        totalDaysInLevel,
        isLevelComplete
    };
}
function checkLevelUp(previousDay, currentDay) {
    const previousLevel = getCurrentSolarLevel(previousDay);
    const currentLevel = getCurrentSolarLevel(currentDay);
    if (previousLevel.id !== currentLevel.id) {
        return currentLevel;
    }
    return null;
}
function getLevelMotivation(level, day) {
    if (!level || !level.dayRange || !Array.isArray(level.dayRange)) {
        return "Continue your solar journey with dedication.";
    }
    const [levelStartDay] = level.dayRange;
    const daysInLevel = day - levelStartDay + 1;
    switch(level.id){
        case 'solar-apprentice':
            if (daysInLevel <= 7) {
                return "You're building the foundation of your solar journey. Each day strengthens your connection to the sun.";
            } else if (daysInLevel <= 30) {
                return "Your practice is deepening. Notice how your eyes and body are adapting to the light.";
            } else {
                return "You're approaching the 15-minute milestone. Your solar foundation is becoming strong.";
            }
        case 'solar-adept':
            if (daysInLevel <= 30) {
                return "Welcome to the Adept level! You're now experiencing deeper light integration.";
            } else {
                return "Your pineal gland is activating. You're becoming a true light worker.";
            }
        case 'inner-sun-adept':
            if (daysInLevel <= 30) {
                return "The sacred 44-minute threshold approaches. Your inner sun is awakening.";
            } else {
                return "You're in the final stretch to 44 minutes. Your light-body is developing.";
            }
        case 'solar-master':
            return "You have achieved the sacred 44-minute threshold. Now focus on integration and sharing your wisdom.";
        default:
            return "Continue your solar journey with dedication and awareness.";
    }
}
function getLevelContent(levelId) {
    // This would typically fetch from a content database
    // For now, return basic level info
    const level = SOLAR_LEVELS.find((l)=>l.id === levelId);
    return level ? {
        practices: level.practices,
        unlocks: level.unlocks,
        benefits: level.benefits,
        quest: level.quest
    } : null;
}
function saveLevelProgress(progress) {
    if ("TURBOPACK compile-time truthy", 1) {
        localStorage.setItem(LEVEL_STORAGE_KEY, JSON.stringify(progress));
    }
}
function loadLevelProgress() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const stored = localStorage.getItem(LEVEL_STORAGE_KEY);
        if (!stored) return null;
        const parsed = JSON.parse(stored);
        // Ensure currentLevel is properly reconstructed
        if (parsed.currentLevel && parsed.currentDay) {
            parsed.currentLevel = getCurrentSolarLevel(parsed.currentDay);
        }
        return parsed;
    } catch (error) {
        console.error('Error loading level progress:', error);
        return null;
    }
}
function getDefaultLevelProgress() {
    const startDate = new Date().toISOString();
    const currentLevel = getCurrentSolarLevel(1);
    return {
        currentDay: 1,
        currentLevel,
        unlockedLevels: [
            currentLevel.id
        ],
        completedPractices: {},
        achievements: [],
        startDate
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SUNGAZE APP/package.json/src/app/lib/supabase/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/@supabase/ssr/dist/module/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-client] (ecmascript)");
;
function createClient() {
    const supabaseUrl = ("TURBOPACK compile-time value", "https://ksoxdzdgzqfhnwwljtqa.supabase.co");
    const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciqdHFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyNjU2NTUsImV4cCI6MjA3NDg0MTY1NX0.uHGoPnpWYpHoy9LrZpmH");
    // Debug log to see what's being read
    console.log('Supabase Config Check:', {
        url: supabaseUrl,
        anonKeyPrefix: (supabaseAnonKey === null || supabaseAnonKey === void 0 ? void 0 : supabaseAnonKey.substring(0, 20)) + '...',
        hasUrl: !!supabaseUrl,
        hasAnonKey: !!supabaseAnonKey,
        isPlaceholderUrl: supabaseUrl === 'your_supabase_project_url',
        isPlaceholderKey: supabaseAnonKey === 'your_supabase_anon_key'
    });
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    console.log('Supabase client created successfully');
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBrowserClient"])(supabaseUrl, supabaseAnonKey);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SUNGAZE APP/package.json/src/app/lib/database/subscription-service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "subscriptionService",
    ()=>subscriptionService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/src/app/lib/supabase/client.ts [app-client] (ecmascript)");
"use client";
;
;
// Supabase database service with fallback to mock data
class SubscriptionService {
    initializeMockData() {
        console.log('SubscriptionService: Initializing mock data');
        const expiration = new Date();
        expiration.setFullYear(expiration.getFullYear() + 3);
        const testUser = {
            id: 'test-user-1',
            email: 'test@sungaze.com',
            tier: 'founder_444',
            founderNumber: 1,
            founderRegion: 'us',
            badges: [
                'First Witness of the Flame',
                'Solar Pioneer'
            ],
            seals: [
                'Dawn Keeper',
                'Light Bearer'
            ],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            purchaseDate: new Date().toISOString(),
            expirationDate: expiration.toISOString(),
            subscriptionStatus: 'active'
        };
        // Also create a profile for the developer's real email
        const developerUser = {
            ...testUser,
            id: 'cobyobi@gmail.com',
            email: 'cobyobi@gmail.com'
        };
        this.mockData.set('test-user-1', testUser);
        this.mockData.set('cobyobi@gmail.com', developerUser);
        this.founderSlots.sold = 37;
        this.founderSlots.remaining = 407;
        console.log('SubscriptionService: Mock data initialized:', testUser);
    }
    async getUserProfile(userId) {
        console.log('SubscriptionService: Getting profile for userId:', userId);
        console.log('SubscriptionService: Supabase client available:', !!this.supabase);
        // For development/testing, always use mock data to avoid Supabase errors
        if ("TURBOPACK compile-time truthy", 1) {
            console.log('SubscriptionService: Using mock data mode for development');
            const mockProfile = this.mockData.get(userId) || null;
            console.log('SubscriptionService: Mock profile found:', mockProfile);
            return mockProfile;
        }
        //TURBOPACK unreachable
        ;
    }
    async createUserProfile(userData) {
        const profile = {
            id: userData.id || crypto.randomUUID(),
            email: userData.email || '',
            tier: userData.tier || 'free',
            badges: userData.badges || [],
            seals: userData.seals || [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            ...userData
        };
        // Use mock data if Supabase is not configured
        if (!this.supabase) {
            this.mockData.set(profile.id, profile);
            return profile;
        }
        try {
            const { data, error } = await this.supabase.from('user_profiles').insert([
                profile
            ]).select().single();
            if (error) {
                console.error('Error creating user profile:', error);
                throw error;
            }
            return data;
        } catch (error) {
            console.error('Error in createUserProfile:', error);
            throw error;
        }
    }
    async updateUserTier(userId, tier, subscriptionData) {
        try {
            const updateData = {
                tier,
                updatedAt: new Date().toISOString(),
                ...subscriptionData
            };
            // Add tier-specific badges
            if (tier === 'founder_444') {
                const { data: user } = await this.supabase.from('user_profiles').select('badges').eq('id', userId).single();
                if (user) {
                    const existingBadges = user.badges || [];
                    updateData.badges = [
                        ...new Set([
                            ...existingBadges,
                            'First Witness of the Flame'
                        ])
                    ];
                }
            }
            const { data, error } = await this.supabase.from('user_profiles').update(updateData).eq('id', userId).select().single();
            if (error) {
                console.error('Error updating user tier:', error);
                return null;
            }
            return data;
        } catch (error) {
            console.error('Error in updateUserTier:', error);
            return null;
        }
    }
    async purchaseFounderSlot(userId) {
        try {
            // Get current founder slots
            const { data: slots, error: slotsError } = await this.supabase.from('founder_slots').select('*').single();
            if (slotsError || !slots) {
                return {
                    success: false,
                    error: 'Failed to check founder slots'
                };
            }
            if (slots.remaining <= 0) {
                return {
                    success: false,
                    error: 'All 444 Founder passes have been claimed worldwide'
                };
            }
            // Start transaction
            const { data: updatedSlots, error: updateError } = await this.supabase.from('founder_slots').update({
                sold: slots.sold + 1,
                remaining: slots.remaining - 1,
                lastUpdated: new Date().toISOString()
            }).eq('id', slots.id).select().single();
            if (updateError) {
                return {
                    success: false,
                    error: 'Failed to reserve founder slot'
                };
            }
            const founderNumber = updatedSlots.sold;
            // Update user profile
            const expirationDate = new Date();
            expirationDate.setFullYear(expirationDate.getFullYear() + 3);
            const { data: user } = await this.supabase.from('user_profiles').select('badges').eq('id', userId).single();
            const existingBadges = (user === null || user === void 0 ? void 0 : user.badges) || [];
            const { error: userError } = await this.supabase.from('user_profiles').update({
                tier: 'founder_444',
                founderNumber,
                purchaseDate: new Date().toISOString(),
                expirationDate: expirationDate.toISOString(),
                badges: [
                    ...new Set([
                        ...existingBadges,
                        'First Witness of the Flame',
                        'Solar Pioneer'
                    ])
                ],
                updatedAt: new Date().toISOString()
            }).eq('id', userId);
            if (userError) {
                console.error('Error updating user profile:', userError);
                return {
                    success: false,
                    error: 'Failed to update user profile'
                };
            }
            return {
                success: true,
                founderNumber
            };
        } catch (error) {
            console.error('Error in purchaseFounderSlot:', error);
            return {
                success: false,
                error: 'An unexpected error occurred'
            };
        }
    }
    async getFounderSlots() {
        // Use mock data if Supabase is not configured
        if (!this.supabase) {
            return {
                ...this.founderSlots
            };
        }
        try {
            const { data, error } = await this.supabase.from('founder_slots').select('*').single();
            if (error || !data) {
                console.error('Error fetching founder slots:', error);
                return {
                    sold: 0,
                    remaining: 444,
                    lastUpdated: new Date().toISOString()
                };
            }
            return data;
        } catch (error) {
            console.error('Error in getFounderSlots:', error);
            return {
                sold: 0,
                remaining: 444,
                lastUpdated: new Date().toISOString()
            };
        }
    }
    async hasFounderAccess(userId) {
        // Use mock data if Supabase is not configured
        if (!this.supabase) {
            const user = this.mockData.get(userId);
            if (!user || user.tier !== 'founder_444') return false;
            if (user.expirationDate) {
                const expiration = new Date(user.expirationDate);
                return expiration > new Date();
            }
            return true;
        }
        try {
            const { data: user, error } = await this.supabase.from('user_profiles').select('tier, expirationDate').eq('id', userId).single();
            if (error || !user || user.tier !== 'founder_444') {
                return false;
            }
            // Check if founder access has expired
            if (user.expirationDate) {
                const expiration = new Date(user.expirationDate);
                return expiration > new Date();
            }
            return true;
        } catch (error) {
            console.error('Error in hasFounderAccess:', error);
            return false;
        }
    }
    async canAccessFeature(userId, requiredTier) {
        // Use mock data if Supabase is not configured
        if (!this.supabase) {
            const user = this.mockData.get(userId);
            if (!user) return false;
            // Founder 444 has access to everything
            if (user.tier === 'founder_444') {
                return await this.hasFounderAccess(userId);
            }
            // Define tier hierarchy
            const tierHierarchy = {
                'free': 0,
                'monthly': 1,
                'yearly': 2,
                'founder_444': 3
            };
            const userTierLevel = tierHierarchy[user.tier];
            const requiredTierLevel = tierHierarchy[requiredTier];
            return userTierLevel >= requiredTierLevel;
        }
        try {
            const { data: user, error } = await this.supabase.from('user_profiles').select('tier, expirationDate').eq('id', userId).single();
            if (error || !user) {
                return false;
            }
            // Founder 444 has access to everything
            if (user.tier === 'founder_444') {
                return await this.hasFounderAccess(userId);
            }
            // Define tier hierarchy
            const tierHierarchy = {
                'free': 0,
                'monthly': 1,
                'yearly': 2,
                'founder_444': 3
            };
            const userTierLevel = tierHierarchy[user.tier];
            const requiredTierLevel = tierHierarchy[requiredTier];
            return userTierLevel >= requiredTierLevel;
        } catch (error) {
            console.error('Error in canAccessFeature:', error);
            return false;
        }
    }
    async getUserStats(userId) {
        // Use mock data if Supabase is not configured
        if (!this.supabase) {
            const user = this.mockData.get(userId);
            if (!user) return null;
            let daysRemaining;
            if (user.expirationDate) {
                const expiration = new Date(user.expirationDate);
                const now = new Date();
                const diffTime = expiration.getTime() - now.getTime();
                daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            }
            return {
                tier: user.tier,
                badges: user.badges || [],
                seals: user.seals || [],
                founderNumber: user.founderNumber,
                daysRemaining
            };
        }
        try {
            const { data: user, error } = await this.supabase.from('user_profiles').select('tier, badges, seals, founderNumber, expirationDate').eq('id', userId).single();
            if (error || !user) {
                return null;
            }
            let daysRemaining;
            if (user.expirationDate) {
                const expiration = new Date(user.expirationDate);
                const now = new Date();
                const diffTime = expiration.getTime() - now.getTime();
                daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            }
            return {
                tier: user.tier,
                badges: user.badges || [],
                seals: user.seals || [],
                founderNumber: user.founderNumber,
                daysRemaining
            };
        } catch (error) {
            console.error('Error in getUserStats:', error);
            return null;
        }
    }
    // Initialize database tables if they don't exist
    async initializeDatabase() {
        if (!this.supabase) {
            console.log('Supabase not configured, using mock data mode');
            return;
        }
        try {
            // Check if founder_slots table exists and has data
            const { data: slots, error: slotsError } = await this.supabase.from('founder_slots').select('*').single();
            if (slotsError || !slots) {
                // Initialize founder slots
                await this.supabase.from('founder_slots').insert([
                    {
                        sold: 0,
                        remaining: 444,
                        lastUpdated: new Date().toISOString()
                    }
                ]);
            }
        } catch (error) {
            console.error('Error initializing database:', error);
        }
    }
    constructor(){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "supabase", (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])());
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "mockData", new Map());
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "founderSlots", {
            sold: 0,
            remaining: 444,
            lastUpdated: new Date().toISOString()
        });
        console.log('SubscriptionService: Constructor called');
        console.log('SubscriptionService: Supabase client available:', !!this.supabase);
        // Always initialize mock data for fallback
        console.log('SubscriptionService: Initializing mock data for fallback');
        this.initializeMockData();
        if (this.supabase) {
            console.log('SubscriptionService: Supabase configured, will use real database with mock fallback');
        } else {
            console.log('SubscriptionService: Using mock data mode only');
        }
    }
}
const subscriptionService = new SubscriptionService();
// Initialize database on client side (only if Supabase is configured)
if ("TURBOPACK compile-time truthy", 1) {
    subscriptionService.initializeDatabase();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SUNGAZE APP/package.json/src/app/lib/elevenlabs.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ElevenLabs voice synthesis service
__turbopack_context__.s([
    "BAREFOOT_CLOSING_TEXT",
    ()=>BAREFOOT_CLOSING_TEXT,
    "BAREFOOT_MID_WALK_1",
    ()=>BAREFOOT_MID_WALK_1,
    "BAREFOOT_MID_WALK_2",
    ()=>BAREFOOT_MID_WALK_2,
    "BAREFOOT_OPENING_TEXT",
    ()=>BAREFOOT_OPENING_TEXT,
    "BAREFOOT_PROMPT_TEXT",
    ()=>BAREFOOT_PROMPT_TEXT,
    "EYE_SANCTUARY_TEXT",
    ()=>EYE_SANCTUARY_TEXT,
    "ElevenLabsService",
    ()=>ElevenLabsService,
    "INNER_SUN_MEDITATION_TEXT",
    ()=>INNER_SUN_MEDITATION_TEXT,
    "PALMING_INSTRUCTIONS_TEXT",
    ()=>PALMING_INSTRUCTIONS_TEXT,
    "PALM_WARMING_TEXT",
    ()=>PALM_WARMING_TEXT,
    "SACRED_PREPARATION_TEXT",
    ()=>SACRED_PREPARATION_TEXT,
    "SESSION_COMPLETION_TEXT",
    ()=>SESSION_COMPLETION_TEXT,
    "initializeCompletionVoice",
    ()=>initializeCompletionVoice,
    "initializeElevenLabs",
    ()=>initializeElevenLabs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
;
class ElevenLabsService {
    async generateSpeech(text) {
        const url = "https://api.elevenlabs.io/v1/text-to-speech/".concat(this.config.voiceId);
        const payload = {
            text,
            model_id: this.config.modelId,
            voice_settings: this.config.voiceSettings
        };
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'audio/mpeg',
                    'Content-Type': 'application/json',
                    'xi-api-key': this.config.apiKey
                },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error('ElevenLabs API Error Response:', errorText);
                if (response.status === 401) {
                    throw new Error('ElevenLabs API key is invalid or expired. Please check your credentials.');
                } else if (response.status === 429) {
                    throw new Error('ElevenLabs API rate limit exceeded. Please try again later.');
                } else if (response.status >= 500) {
                    throw new Error('ElevenLabs service is temporarily unavailable. Please try again later.');
                } else {
                    throw new Error("ElevenLabs API error: ".concat(response.status, " ").concat(response.statusText));
                }
            }
            return response.arrayBuffer();
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Failed to connect to ElevenLabs API. Please check your internet connection.');
        }
    }
    async generateSpeechUrl(text) {
        try {
            const audioBuffer = await this.generateSpeech(text);
            const blob = new Blob([
                audioBuffer
            ], {
                type: 'audio/mpeg'
            });
            return URL.createObjectURL(blob);
        } catch (error) {
            console.error('Error generating speech:', error);
            throw error;
        }
    }
    constructor(config){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "config", void 0);
        this.config = {
            modelId: 'eleven_monolingual_v1',
            voiceSettings: {
                stability: 0.5,
                similarityBoost: 0.75,
                style: 0.0,
                useSpeakerBoost: true
            },
            ...config
        };
    }
}
const SACRED_PREPARATION_TEXT = "Place your phone on the ground, on your shoes. Step barefoot onto the earth. The phone is not your master here. The sun is.";
const SESSION_COMPLETION_TEXT = "Your gazing session is over.";
const PALMING_INSTRUCTIONS_TEXT = "Rub your palms together vigorously. Place them over your eyes. The light is sealed inside. See the inner sun glowing on your eyelids.";
const PALM_WARMING_TEXT = "Now, rub your palms together with intention. Feel the friction building warmth. This sacred heat will become your gateway to the inner sun. Keep rubbing until your palms glow with energy.";
const EYE_SANCTUARY_TEXT = "Gently place your warm palms over your closed eyes. Create a perfect seal of darkness. This is your eye sanctuary. The light from the sun is now sealed within. Allow your eyes to rest in this sacred darkness.";
const INNER_SUN_MEDITATION_TEXT = "Breathe deeply and look into the darkness behind your eyelids. You may see colors, patterns, or light. This is your inner sun awakening. Watch without judgment. Let the solar energy you absorbed flow through your being. You are becoming one with the light.";
const BAREFOOT_PROMPT_TEXT = "Do you want to walk barefoot now?";
const BAREFOOT_OPENING_TEXT = "The sun has given you light. Now let the earth hold you. Begin walking slowly, barefoot, each step touching Mother Earth.";
const BAREFOOT_MID_WALK_1 = "Breathe in. Feel the current rising from the ground into your body.";
const BAREFOOT_MID_WALK_2 = "The sun gives magnetic energy. The earth gives electrical energy. Together, they complete your circuit of life.";
const BAREFOOT_CLOSING_TEXT = "Pause. Stand still. Let the light of the sun and the charge of the earth merge within you. You are a solar being.";
const initializeElevenLabs = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const apiKey = ("TURBOPACK compile-time value", "e9b303075464ced985cf8b8880a55bf2d2ebe2a3495c05bfb0b53aefbe3f1537");
    const voiceId = ("TURBOPACK compile-time value", "Atp5cNFg1Wj5gyKD7HWV");
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        return new ElevenLabsService({
            apiKey,
            voiceId,
            voiceSettings: {
                stability: 0.95,
                similarityBoost: 0.95,
                style: 0.0,
                useSpeakerBoost: true
            }
        });
    } catch (error) {
        console.warn('Failed to initialize ElevenLabs service:', error);
        return null;
    }
};
const initializeCompletionVoice = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const apiKey = ("TURBOPACK compile-time value", "e9b303075464ced985cf8b8880a55bf2d2ebe2a3495c05bfb0b53aefbe3f1537");
    const voiceId = ("TURBOPACK compile-time value", "Atp5cNFg1Wj5gyKD7HWV");
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return new ElevenLabsService({
        apiKey,
        voiceId,
        voiceSettings: {
            stability: 0.98,
            similarityBoost: 0.98,
            style: 0.0,
            useSpeakerBoost: true
        }
    });
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SUNGAZE APP/package.json/src/app/lib/speechSynthesis.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Web Speech API fallback for when ElevenLabs is unavailable
__turbopack_context__.s([
    "WebSpeechService",
    ()=>WebSpeechService,
    "initializeWebSpeech",
    ()=>initializeWebSpeech
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
;
class WebSpeechService {
    async generateSpeechUrl(text) {
        return new Promise((resolve, reject)=>{
            if (!('speechSynthesis' in window)) {
                reject(new Error('Speech synthesis not supported in this browser'));
                return;
            }
            // Cancel any ongoing speech
            speechSynthesis.cancel();
            this.utterance = new SpeechSynthesisUtterance(text);
            // Apply settings
            this.utterance.rate = this.settings.rate;
            this.utterance.pitch = this.settings.pitch;
            this.utterance.volume = this.settings.volume;
            // Try to find a suitable voice (prefer female voices for Emily)
            const voices = speechSynthesis.getVoices();
            const preferredVoice = voices.find((voice)=>voice.name.toLowerCase().includes('female') || voice.name.toLowerCase().includes('samantha') || voice.name.toLowerCase().includes('victoria') || voice.name.toLowerCase().includes('serena')) || voices.find((voice)=>voice.lang.startsWith('en')) || voices[0];
            if (preferredVoice) {
                this.utterance.voice = preferredVoice;
            }
            // Create a data URL for audio (mock - Web Speech API doesn't provide actual audio files)
            // We'll return a special identifier that the voice hook can recognize
            resolve("web-speech:".concat(encodeURIComponent(text)));
        });
    }
    speak(text) {
        return new Promise((resolve, reject)=>{
            if (!('speechSynthesis' in window)) {
                reject(new Error('Speech synthesis not supported in this browser'));
                return;
            }
            // Cancel any ongoing speech
            speechSynthesis.cancel();
            this.utterance = new SpeechSynthesisUtterance(text);
            // Apply settings
            this.utterance.rate = this.settings.rate;
            this.utterance.pitch = this.settings.pitch;
            this.utterance.volume = this.settings.volume;
            // Find a suitable voice
            const voices = speechSynthesis.getVoices();
            const preferredVoice = voices.find((voice)=>voice.name.toLowerCase().includes('female') || voice.name.toLowerCase().includes('samantha') || voice.name.toLowerCase().includes('victoria') || voice.name.toLowerCase().includes('serena')) || voices.find((voice)=>voice.lang.startsWith('en')) || voices[0];
            if (preferredVoice) {
                this.utterance.voice = preferredVoice;
            }
            this.utterance.onend = ()=>resolve();
            this.utterance.onerror = (event)=>reject(new Error('Speech synthesis failed'));
            speechSynthesis.speak(this.utterance);
        });
    }
    pause() {
        if (speechSynthesis.speaking) {
            speechSynthesis.pause();
        }
    }
    resume() {
        if (speechSynthesis.paused) {
            speechSynthesis.resume();
        }
    }
    stop() {
        speechSynthesis.cancel();
    }
    isPaused() {
        return speechSynthesis.paused;
    }
    isSpeaking() {
        return speechSynthesis.speaking;
    }
    constructor(settings){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "settings", void 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "utterance", null);
        this.settings = {
            rate: 0.7,
            pitch: 0.9,
            volume: 0.8,
            ...settings
        };
    }
}
const initializeWebSpeech = ()=>{
    if ("object" === 'undefined' || !('speechSynthesis' in window)) {
        return null;
    }
    return new WebSpeechService({
        rate: 0.7,
        pitch: 0.9,
        volume: 0.8
    });
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SUNGAZE APP/package.json/src/app/lib/payments/stripe.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createCheckoutSession",
    ()=>createCheckoutSession,
    "createCustomerPortalSession",
    ()=>createCustomerPortalSession,
    "default",
    ()=>__TURBOPACK__default__export__,
    "getUserRegion",
    ()=>getUserRegion,
    "redirectToCheckout",
    ()=>redirectToCheckout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f40$stripe$2f$stripe$2d$js$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/@stripe/stripe-js/lib/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f40$stripe$2f$stripe$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/@stripe/stripe-js/dist/index.mjs [app-client] (ecmascript)");
"use client";
;
// Initialize Stripe with environment variable
const stripePromise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f40$stripe$2f$stripe$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadStripe"])(("TURBOPACK compile-time value", "pk_live_51NW2s0GIDaitR9oVlieoSStcjJJ7h2DwrKEzIqaNnhi9t3KqgtCpGpdn4ibjNLeYT3thhlBiAzjf9hczdfTwtmZ600zXeHdZMy"));
const createCheckoutSession = async (data)=>{
    try {
        const response = await fetch('/api/payments/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (!response.ok) {
            return {
                error: result.error || 'Failed to create checkout session'
            };
        }
        return {
            sessionId: result.sessionId,
            url: result.url
        };
    } catch (error) {
        console.error('Error creating checkout session:', error);
        return {
            error: 'Network error occurred'
        };
    }
};
const redirectToCheckout = async (sessionId)=>{
    try {
        const stripe = await stripePromise;
        if (!stripe) {
            return {
                error: 'Stripe failed to initialize'
            };
        }
        const result = await stripe.redirectToCheckout({
            sessionId
        });
        if (result.error) {
            return {
                error: result.error.message
            };
        }
        return {};
    } catch (error) {
        console.error('Error redirecting to checkout:', error);
        return {
            error: 'Failed to redirect to checkout'
        };
    }
};
const createCustomerPortalSession = async (customerId)=>{
    try {
        const response = await fetch('/api/payments/create-portal-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                customerId
            })
        });
        const result = await response.json();
        if (!response.ok) {
            return {
                error: result.error || 'Failed to create portal session'
            };
        }
        return {
            url: result.url
        };
    } catch (error) {
        console.error('Error creating portal session:', error);
        return {
            error: 'Network error occurred'
        };
    }
};
const getUserRegion = ()=>{
    // This could be enhanced with geolocation or user preference
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // African timezones (simplified list)
    const africanTimezones = [
        'Africa/Lagos',
        'Africa/Cairo',
        'Africa/Johannesburg',
        'Africa/Nairobi',
        'Africa/Casablanca',
        'Africa/Accra'
    ];
    return africanTimezones.some((tz)=>timezone.includes(tz)) ? 'africa' : 'us';
};
const __TURBOPACK__default__export__ = stripePromise;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SUNGAZE APP/package.json/src/app/lib/database/journal-service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "journalService",
    ()=>journalService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
"use client";
;
// Mock journal database service - replace with actual Firebase/Supabase implementation
class JournalService {
    loadFromLocalStorage() {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (stored) {
                const data = JSON.parse(stored);
                this.entries = new Map(Object.entries(data));
            }
        } catch (error) {
            console.error('Failed to load journal entries from localStorage:', error);
        }
    }
    saveToLocalStorage() {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        try {
            const data = Object.fromEntries(this.entries);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
        } catch (error) {
            console.error('Failed to save journal entries to localStorage:', error);
        }
    }
    async createEntry(userId, entryData) {
        const now = new Date().toISOString();
        const entry = {
            id: crypto.randomUUID(),
            userId,
            createdAt: now,
            updatedAt: now,
            ...entryData
        };
        const userEntries = this.entries.get(userId) || [];
        userEntries.unshift(entry); // Add to beginning for latest first
        this.entries.set(userId, userEntries);
        this.saveToLocalStorage();
        return entry;
    }
    async getUserEntries(userId, limit) {
        const userEntries = this.entries.get(userId) || [];
        if (limit) {
            return userEntries.slice(0, limit);
        }
        return [
            ...userEntries
        ];
    }
    async getEntry(userId, entryId) {
        const userEntries = this.entries.get(userId) || [];
        return userEntries.find((entry)=>entry.id === entryId) || null;
    }
    async updateEntry(userId, entryId, updates) {
        const userEntries = this.entries.get(userId) || [];
        const entryIndex = userEntries.findIndex((entry)=>entry.id === entryId);
        if (entryIndex === -1) return null;
        const updatedEntry = {
            ...userEntries[entryIndex],
            ...updates,
            updatedAt: new Date().toISOString()
        };
        userEntries[entryIndex] = updatedEntry;
        this.entries.set(userId, userEntries);
        this.saveToLocalStorage();
        return updatedEntry;
    }
    async deleteEntry(userId, entryId) {
        const userEntries = this.entries.get(userId) || [];
        const filteredEntries = userEntries.filter((entry)=>entry.id !== entryId);
        if (filteredEntries.length === userEntries.length) {
            return false; // Entry not found
        }
        this.entries.set(userId, filteredEntries);
        this.saveToLocalStorage();
        return true;
    }
    async getUserStats(userId) {
        const userEntries = this.entries.get(userId) || [];
        if (userEntries.length === 0) {
            return {
                totalEntries: 0,
                currentStreak: 0,
                longestStreak: 0,
                averageMood: 0,
                totalPracticeTime: 0,
                practiceTypeBreakdown: {
                    sun: 0,
                    cloud: 0,
                    candle: 0,
                    starlight: 0
                }
            };
        }
        // Calculate practice type breakdown
        const practiceTypeBreakdown = userEntries.reduce((acc, entry)=>{
            acc[entry.gazingType]++;
            return acc;
        }, {
            sun: 0,
            cloud: 0,
            candle: 0,
            starlight: 0
        });
        // Calculate total practice time
        const totalPracticeTime = userEntries.reduce((total, entry)=>total + entry.duration, 0);
        // Calculate average mood (convert moods to numbers for averaging)
        const moodValues = {
            sleepy: 1,
            dreamy: 2,
            peaceful: 3,
            centered: 4,
            grateful: 5,
            energized: 6,
            transcendent: 7
        };
        const averageMood = userEntries.reduce((sum, entry)=>sum + moodValues[entry.mood], 0) / userEntries.length;
        // Calculate streaks (simplified - just count recent consecutive days)
        const sortedEntries = [
            ...userEntries
        ].sort((a, b)=>new Date(b.date).getTime() - new Date(a.date).getTime());
        let currentStreak = 0;
        let longestStreak = 0;
        let tempStreak = 0;
        let lastDate = null;
        for (const entry of sortedEntries){
            const entryDate = new Date(entry.date);
            entryDate.setHours(0, 0, 0, 0); // Normalize to start of day
            if (!lastDate) {
                currentStreak = 1;
                tempStreak = 1;
                lastDate = entryDate;
                continue;
            }
            const dayDiff = Math.floor((lastDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
            if (dayDiff === 1) {
                // Consecutive day
                if (currentStreak === tempStreak) {
                    currentStreak++;
                }
                tempStreak++;
            } else if (dayDiff > 1) {
                // Gap in days - reset current streak tracking but continue temp streak calculation
                if (currentStreak === tempStreak - 1) {
                    currentStreak = 0;
                }
                tempStreak = 1;
            }
            // dayDiff === 0 means same day, continue current counts
            longestStreak = Math.max(longestStreak, tempStreak);
            lastDate = entryDate;
        }
        return {
            totalEntries: userEntries.length,
            currentStreak,
            longestStreak,
            averageMood: Math.round(averageMood * 10) / 10,
            totalPracticeTime,
            practiceTypeBreakdown
        };
    }
    async uploadPhoto(file) {
        // Mock photo upload - in real implementation, upload to Firebase Storage/Supabase Storage
        return new Promise((resolve)=>{
            const reader = new FileReader();
            reader.onload = (e)=>{
                var _e_target;
                // In real implementation, this would return a cloud storage URL
                // For now, return the data URL (base64)
                resolve((_e_target = e.target) === null || _e_target === void 0 ? void 0 : _e_target.result);
            };
            reader.readAsDataURL(file);
        });
    }
    // Migration helper to convert old localStorage entries
    async migrateFromOldFormat(userId) {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        try {
            const oldEntries = localStorage.getItem('sungaze_journal');
            if (!oldEntries) return;
            const parsed = JSON.parse(oldEntries);
            const migratedEntries = parsed.map((oldEntry)=>({
                    id: oldEntry.id || crypto.randomUUID(),
                    userId,
                    date: typeof oldEntry.date === 'string' ? oldEntry.date : oldEntry.date.toISOString(),
                    gazingType: oldEntry.gazingType,
                    duration: oldEntry.duration,
                    condition: oldEntry.condition,
                    reflection: oldEntry.reflection,
                    mood: oldEntry.mood,
                    insights: oldEntry.insights,
                    bodyExperience: oldEntry.bodyExperience,
                    gratitude: oldEntry.gratitude,
                    dreamIntentions: oldEntry.dreamIntentions,
                    practiceType: oldEntry.practiceType,
                    photoUrl: oldEntry.photoUrl,
                    createdAt: typeof oldEntry.date === 'string' ? oldEntry.date : oldEntry.date.toISOString(),
                    updatedAt: typeof oldEntry.date === 'string' ? oldEntry.date : oldEntry.date.toISOString()
                }));
            this.entries.set(userId, migratedEntries);
            this.saveToLocalStorage();
            // Clean up old format
            localStorage.removeItem('sungaze_journal');
            console.log('Successfully migrated journal entries to new format');
        } catch (error) {
            console.error('Failed to migrate journal entries:', error);
        }
    }
    constructor(){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "entries", new Map());
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "STORAGE_KEY", 'sungaze_journal_entries');
        this.loadFromLocalStorage();
    }
}
const journalService = new JournalService();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SUNGAZE APP/package.json/src/app/lib/solarContent.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Solar Content System - Level-specific guidance and content
// Updated to start with Solar Apprentice (removed Cloud-Gazer stage)
__turbopack_context__.s([
    "SOLAR_CONTENT",
    ()=>SOLAR_CONTENT,
    "getAudioScript",
    ()=>getAudioScript,
    "getContentForLevel",
    ()=>getContentForLevel,
    "getContentForLevelRange",
    ()=>getContentForLevelRange,
    "getJournalPrompts",
    ()=>getJournalPrompts,
    "getPracticeGuidance",
    ()=>getPracticeGuidance
]);
const SOLAR_CONTENT = [
    {
        levelId: 'solar-apprentice',
        levelNumber: 1,
        title: 'Solar Apprentice (Foundation)',
        audioScript: {
            title: 'Solar Foundation Guided Audio',
            duration: '3-4 minutes',
            script: "Welcome to your solar journey. You are about to connect with the most powerful source of energy in our solar system.\n\nStand barefoot on the earth. Feel the ground beneath your feet. You are grounded, safe, and ready.\n\nLook gently at the sun. Not with force, but with soft eyes. As if you are receiving a gift, not taking it.\n\nBreathe slowly and deeply. With each breath, feel the light entering your body through your eyes.\n\nYou are not just looking at the sun - you are communing with it. You are receiving its energy, its wisdom, its life force.\n\nIf your eyes feel overwhelmed, close them gently and return to your breath. Then open them again, softly.\n\nEach second of connection is a blessing. Each moment of light is nourishment for your soul.\n\nYou are building a relationship with the sun that will transform your entire being.",
            purpose: 'Establish solar connection, build confidence, set foundation',
            voiceInstructions: 'Performed by Emily. Warm, confident tone. Pause 4-5 seconds between sentences. Emphasize "grounded," "safe," "gift," and "blessing."'
        },
        practiceGuidance: [
            'Start with 10 seconds at sunrise or sunset',
            'Always practice barefoot on earth',
            'Add 10 seconds each day',
            'Focus on gentle, soft eyes - never strain',
            'Practice daily for consistent progress'
        ],
        journalPrompts: [
            'How did I feel during my first direct sun connection?',
            'What sensations did I notice in my body?',
            'Did I feel any warmth or energy entering through my eyes?',
            'How did being barefoot on earth affect my experience?',
            'What thoughts or emotions came up during the practice?'
        ]
    },
    {
        levelId: 'solar-adept',
        levelNumber: 2,
        title: 'Solar Adept (Integration Master)',
        audioScript: {
            title: 'Light Integration Guided Audio',
            duration: '4-5 minutes',
            script: "You have reached the Adept level. Your practice is deepening, and you are beginning to experience the profound effects of solar light integration.\n\nFeel the light not just entering your eyes, but flowing through your entire body. Your pineal gland is awakening, your cells are being reprogrammed.\n\nNotice how the light feels different now. It's not just brightness - it's living energy, intelligence, consciousness.\n\nBreathe the light in. Let it flow through your nervous system, activating every cell, every organ, every system in your body.\n\nYou are becoming a light worker. You are integrating solar consciousness into your very being.\n\nFeel the changes happening within you. Your intuition is sharpening, your awareness is expanding, your connection to all life is deepening.\n\nYou are not just receiving light - you are becoming light. You are transforming at the cellular level.\n\nEmbrace this transformation. Welcome the changes. You are evolving into something greater than you were before.",
            purpose: 'Deepen light integration, activate pineal gland, cellular reprogramming',
            voiceInstructions: 'Performed by Emily. Mystical, transformative tone. Pause 5-6 seconds between sentences. Emphasize "awakening," "intelligence," "transformation," and "evolving."'
        },
        practiceGuidance: [
            'Practice 15-30 minute sessions',
            'Focus on pineal gland activation',
            'Notice cellular changes and energy shifts',
            'Integrate light meditation with gazing',
            'Pay attention to intuition and awareness changes'
        ],
        journalPrompts: [
            'What cellular changes am I noticing in my body?',
            'How is my pineal gland responding to the light?',
            'What shifts in my intuition and awareness am I experiencing?',
            'How is my connection to nature and other beings changing?',
            'What new insights or wisdom am I receiving?'
        ]
    },
    {
        levelId: 'inner-sun-adept',
        levelNumber: 3,
        title: 'Inner Sun Adept (Light Mastery)',
        audioScript: {
            title: 'Inner Sun Activation Guided Audio',
            duration: '5-6 minutes',
            script: "You are approaching the sacred 44-minute threshold. Your inner sun is awakening, and you are becoming a master of light.\n\nFeel the light not just entering you, but radiating from within you. Your inner sun is igniting, creating its own source of light and energy.\n\nYou are no longer just receiving light - you are generating it. You are becoming a sun yourself, radiating light, love, and wisdom to all around you.\n\nYour light-body is developing. You are transcending the limitations of physical form and becoming pure consciousness, pure light.\n\nFeel the power within you. Feel the wisdom. Feel the love. Feel the connection to all that is.\n\nYou are a bridge between the physical and the spiritual, between earth and sun, between human and divine.\n\nYour inner sun is your guide, your teacher, your source of infinite energy and wisdom.\n\nEmbrace your role as a light master. You are here to shine, to illuminate, to transform not just yourself, but the world around you.",
            purpose: 'Activate inner sun, develop light-body, transcend physical limitations',
            voiceInstructions: 'Performed by Emily. Powerful, transcendent tone. Pause 6-7 seconds between sentences. Emphasize "awakening," "generating," "transcending," and "illuminate."'
        },
        practiceGuidance: [
            'Practice 30-44 minute sessions',
            'Focus on inner sun visualization and activation',
            'Develop light-body awareness and energy',
            'Practice radiating light outward to others',
            'Integrate spiritual consciousness with physical practice'
        ],
        journalPrompts: [
            'How is my inner sun developing and activating?',
            'What changes am I noticing in my light-body?',
            'How am I able to radiate light and energy to others?',
            'What spiritual insights and wisdom am I receiving?',
            'How is my consciousness expanding and transcending?'
        ]
    },
    {
        levelId: 'solar-master',
        levelNumber: 4,
        title: 'Solar Master (Light Integration)',
        audioScript: {
            title: 'Master Integration Guided Audio',
            duration: '6-7 minutes',
            script: "You have achieved the sacred 44-minute threshold. You are now a Solar Master, a true light worker, a bridge between worlds.\n\nYour transformation is complete, yet it is also just beginning. You have mastered the art of solar consciousness, and now you must integrate this mastery into every aspect of your life.\n\nFeel the light flowing through you, from you, around you. You are a living sun, radiating love, wisdom, and healing energy to all who come into your presence.\n\nYour role now is not just to receive light, but to be light. To teach, to guide, to heal, to transform others as you have been transformed.\n\nYou are a master of the ancient art of solar consciousness. You hold within you the wisdom of the ages, the power of the sun, the love of the universe.\n\nShare this gift. Teach others. Be a beacon of light in a world that so desperately needs it.\n\nYou are not just a solar master - you are a master of life itself. You have transcended the limitations of ordinary human existence and have become something extraordinary.\n\nEmbrace your mastery. Embody your light. Be the change you wish to see in the world.",
            purpose: 'Master integration, teaching others, embodying solar consciousness',
            voiceInstructions: 'Performed by Emily. Masterful, authoritative tone. Pause 7-8 seconds between sentences. Emphasize "mastery," "teaching," "beacon," and "extraordinary."'
        },
        practiceGuidance: [
            'Maintain 44-minute daily sessions',
            'Focus on integration and mastery of all techniques',
            'Begin teaching and sharing wisdom with others',
            'Develop advanced solar consciousness techniques',
            'Embody solar mastery in daily life'
        ],
        journalPrompts: [
            'How am I integrating my solar mastery into daily life?',
            'What opportunities am I finding to teach and guide others?',
            'How is my presence affecting those around me?',
            'What advanced techniques and insights am I developing?',
            'How can I best serve as a beacon of light in the world?'
        ]
    }
];
function getContentForLevel(levelId) {
    return SOLAR_CONTENT.find((content)=>content.levelId === levelId) || null;
}
function getContentForLevelRange(startLevel, endLevel) {
    return SOLAR_CONTENT.filter((content)=>content.levelNumber >= startLevel && content.levelNumber <= endLevel);
}
function getPracticeGuidance(levelId) {
    const content = getContentForLevel(levelId);
    return (content === null || content === void 0 ? void 0 : content.practiceGuidance) || [];
}
function getJournalPrompts(levelId) {
    const content = getContentForLevel(levelId);
    return (content === null || content === void 0 ? void 0 : content.journalPrompts) || [];
}
function getAudioScript(levelId) {
    const content = getContentForLevel(levelId);
    return (content === null || content === void 0 ? void 0 : content.audioScript) || null;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SUNGAZE APP/package.json/src/app/lib/milestones.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Milestone and title unlock system
// Updated to remove Cloud-Gazer and align with new level system
__turbopack_context__.s([
    "MILESTONES",
    ()=>MILESTONES,
    "checkAndUnlockMilestones",
    ()=>checkAndUnlockMilestones,
    "clearAllMilestones",
    ()=>clearAllMilestones,
    "getAllMilestones",
    ()=>getAllMilestones,
    "getMilestoneByDay",
    ()=>getMilestoneByDay,
    "getMilestoneById",
    ()=>getMilestoneById,
    "getNextMilestone",
    ()=>getNextMilestone,
    "getUnlockStats",
    ()=>getUnlockStats,
    "getUnlockedMilestones",
    ()=>getUnlockedMilestones,
    "initializeMilestones",
    ()=>initializeMilestones,
    "isGraduated",
    ()=>isGraduated,
    "isMilestoneUnlocked",
    ()=>isMilestoneUnlocked,
    "unlockMilestone",
    ()=>unlockMilestone
]);
const MILESTONES = [
    {
        id: 'seeker-of-dawn',
        day: 1,
        durationMinutes: 0.17,
        title: 'Seeker of Dawn',
        content: {
            type: 'koan',
            text: 'In trataka begins the journey — steady gaze, steady heart.',
            source: 'Ancient Gazing Tradition'
        },
        unlocked: false
    },
    {
        id: 'witness-of-horizon',
        day: 90,
        durationMinutes: 15,
        title: 'Witness of the Horizon',
        content: {
            type: 'dhammapada',
            text: 'The sun shines by day, but the awakened shines always.',
            source: 'The Dhammapada'
        },
        unlocked: false
    },
    {
        id: 'guardian-of-rays',
        day: 180,
        durationMinutes: 30,
        title: 'Guardian of Rays',
        content: {
            type: 'upanishad',
            text: 'As the sun illuminates the world, so does the awakened illuminate consciousness.',
            source: 'The Upanishads'
        },
        unlocked: false
    },
    {
        id: 'crowned-by-sun',
        day: 270,
        durationMinutes: 44,
        title: 'Crowned by Sun',
        content: {
            type: 'graduation',
            text: 'You have become one with the light. The journey continues, but you are now the teacher.',
            source: 'Solar Master Tradition'
        },
        unlocked: false
    }
];
const STORAGE_KEY = 'solar_milestones';
function getAllMilestones() {
    return MILESTONES;
}
function getUnlockedMilestones() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return [];
        const unlockedIds = JSON.parse(stored);
        return MILESTONES.filter((milestone)=>unlockedIds.includes(milestone.id));
    } catch (error) {
        console.error('Error loading unlocked milestones:', error);
        return [];
    }
}
function unlockMilestone(milestoneId) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        const unlockedIds = stored ? JSON.parse(stored) : [];
        if (!unlockedIds.includes(milestoneId)) {
            unlockedIds.push(milestoneId);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(unlockedIds));
            // Update the milestone in the array
            const milestone = MILESTONES.find((m)=>m.id === milestoneId);
            if (milestone) {
                milestone.unlocked = true;
                milestone.unlockedAt = Date.now();
            }
        }
    } catch (error) {
        console.error('Error unlocking milestone:', error);
    }
}
function isMilestoneUnlocked(milestoneId) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return false;
        const unlockedIds = JSON.parse(stored);
        return unlockedIds.includes(milestoneId);
    } catch (error) {
        console.error('Error checking milestone status:', error);
        return false;
    }
}
function getUnlockStats() {
    const totalMilestones = MILESTONES.length;
    const unlockedCount = getUnlockedMilestones().length;
    const percentageComplete = totalMilestones > 0 ? unlockedCount / totalMilestones * 100 : 0;
    // Find the next milestone to unlock
    const nextMilestone = MILESTONES.find((milestone)=>!isMilestoneUnlocked(milestone.id)) || null;
    return {
        totalMilestones,
        unlockedCount,
        percentageComplete,
        nextMilestone
    };
}
function isGraduated() {
    const stats = getUnlockStats();
    return stats.unlockedCount === stats.totalMilestones;
}
function getMilestoneById(milestoneId) {
    return MILESTONES.find((milestone)=>milestone.id === milestoneId) || null;
}
function getMilestoneByDay(day) {
    return MILESTONES.find((milestone)=>milestone.day === day) || null;
}
function getNextMilestone() {
    return MILESTONES.find((milestone)=>!isMilestoneUnlocked(milestone.id)) || null;
}
function clearAllMilestones() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        localStorage.removeItem(STORAGE_KEY);
        MILESTONES.forEach((milestone)=>{
            milestone.unlocked = false;
            milestone.unlockedAt = undefined;
        });
    } catch (error) {
        console.error('Error clearing milestones:', error);
    }
}
function initializeMilestones() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const unlockedIds = JSON.parse(stored);
            MILESTONES.forEach((milestone)=>{
                milestone.unlocked = unlockedIds.includes(milestone.id);
            });
        }
    } catch (error) {
        console.error('Error initializing milestones:', error);
    }
}
function checkAndUnlockMilestones(currentDay, currentDurationMinutes) {
    MILESTONES.forEach((milestone)=>{
        if (!milestone.unlocked && currentDay >= milestone.day && currentDurationMinutes >= milestone.durationMinutes) {
            unlockMilestone(milestone.id);
        }
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SUNGAZE APP/package.json/src/app/lib/truthSerum.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Truth Serum - Weekly Solar Wisdom
// Authentic teachings from the fusion of revolutionary consciousness and solar science
__turbopack_context__.s([
    "getCurrentTruthSerum",
    ()=>getCurrentTruthSerum,
    "getCurrentWeekOfYear",
    ()=>getCurrentWeekOfYear,
    "getNextWeekPreview",
    ()=>getNextWeekPreview,
    "getProgressInfo",
    ()=>getProgressInfo,
    "getRandomUnlockedTruthSerum",
    ()=>getRandomUnlockedTruthSerum,
    "getTruthSerumForWeek",
    ()=>getTruthSerumForWeek,
    "getUnlockedTeachings",
    ()=>getUnlockedTeachings,
    "getUnlockedTeachingsByCategory",
    ()=>getUnlockedTeachingsByCategory,
    "getUserWeekProgression",
    ()=>getUserWeekProgression,
    "isTeachingUnlocked",
    ()=>isTeachingUnlocked,
    "truthSerumTeachings",
    ()=>truthSerumTeachings
]);
const truthSerumTeachings = [
    // Beginner's Path
    {
        id: "beginner-1",
        category: "Beginning Practice",
        title: "The First Solar Communion",
        teaching: "My beloved, the sun is not your enemy to be conquered, but your oldest friend to be embraced with reverence. Begin like a lover meeting the beloved - with patience, with gentleness. Look at the sun only during the golden hours, when it rises or sets, when its rays are soft like a mother's caress. Start with ten seconds, no more.",
        week: 1
    },
    {
        id: "beginner-2",
        category: "Beginning Practice",
        title: "The Democracy of Light",
        teaching: "The sun shines on all - the rich and poor, the believer and atheist, the healthy and sick. But not everyone is ready to receive its gift. Begin with seconds, add ten seconds each day if your eyes feel comfortable. Some reach ten minutes after months, others after years. The journey itself is the destination.",
        week: 2
    },
    {
        id: "beginner-3",
        category: "Beginning Practice",
        title: "Drop the Mind's Questions",
        teaching: "Drop the idea of 'how' - the sun has been calling you since your first breath. Face the gentle morning sun for 10 seconds and feel your ancestors' wisdom awakening.",
        week: 3
    },
    // Fear and Safety
    {
        id: "safety-1",
        category: "Transcending Fear",
        title: "Fear is the Greatest Blindness",
        teaching: "Fear is the greatest blindness, not the sun's light. But listen carefully - I am not asking you to be foolish. The path of the mystic is always intelligent. Trust your body's wisdom. If there is pain, stop. The sun has waited millions of years for you; it can wait a few more days.",
        week: 4
    },
    {
        id: "safety-2",
        category: "Transcending Fear",
        title: "The Medical Church's Greatest Gift",
        teaching: "They sold you fear of your star. This is the ultimate rebellion - remembering your light body. Advanced practitioners have lived on sunlight for extended periods under medical observation and thrived. Your fear is institutional programming, not the sun's truth.",
        week: 5
    },
    {
        id: "safety-3",
        category: "Transcending Fear",
        title: "Your Ancient Friend",
        teaching: "Safety? The sun has been humanity's closest companion for millions of years - suddenly you need permission to look at your ancient friend? Practice during golden hours and trust your cosmic inheritance.",
        week: 6
    },
    // Time and Rhythm
    {
        id: "time-1",
        category: "Sacred Timing",
        title: "Illusion of Time, Eternal Truth",
        teaching: "Time, my friend, is an illusion, but the sun's rhythm is eternal truth. Within the first hour of sunrise and the last hour of sunset - these are the windows when heaven touches earth. Begin with ten seconds, no more. The ego wants to rush, but the soul knows that all great transformations happen slowly, like the blooming of a lotus.",
        week: 7
    },
    {
        id: "time-2",
        category: "Sacred Timing",
        title: "The Sun's Perfect Timing",
        teaching: "The sun has no watch, yet it never misses its appointment with dawn. Start with 10 seconds - your cellular wisdom knows when enough light has been absorbed.",
        week: 8
    },
    {
        id: "time-3",
        category: "Sacred Timing",
        title: "Sacred Courtship with Consciousness",
        teaching: "Master practitioners built up to hours over months, not minutes over days. Your journey is not a race but a sacred courtship with cosmic consciousness.",
        week: 9
    },
    // Physical Transformation
    {
        id: "physical-1",
        category: "Body's Awakening",
        title: "Tears of Preparation",
        teaching: "Tears are the eyes' way of cleansing and adjusting. Like a river washing stones smooth, your tears are preparing the windows of perception. In the beginning, this is natural. But if the tearing is excessive or painful, reduce your practice time. The body has its own intelligence - honor it.",
        week: 10
    },
    {
        id: "physical-2",
        category: "Body's Awakening",
        title: "Third Eye Activation",
        teaching: "Your third eye is awakening through solar activation - the pressure is cosmic consciousness expanding. Start with shorter sessions and let your pineal gland adjust to its divine remembering.",
        week: 11
    },
    {
        id: "physical-3",
        category: "Body's Awakening",
        title: "Solar Collectors Awakening",
        teaching: "Your eyes are remembering they are solar collectors, not just windows. Practice only during the golden hour when the sun is gentle - force is the mind's way, not the sun's.",
        week: 12
    },
    // Energy Transformation
    {
        id: "energy-1",
        category: "Solar Energy",
        title: "The Original Power Source",
        teaching: "You are plugging into the original power source! Most people live on secondhand energy - food, coffee, external stimulation. But you are learning to drink directly from the fountain of cosmic energy. This is why advanced practitioners can transcend the need for gross food. You are remembering how to be solar-powered, like the plants that stretch toward the light.",
        week: 13
    },
    {
        id: "energy-2",
        category: "Solar Energy",
        title: "Light Body Being Born",
        teaching: "Your pineal gland is expanding as documented in advanced practitioners - the tiredness is your light body being born. Rest deeply, for you are transforming from matter-eater to light-eater.",
        week: 14
    },
    {
        id: "energy-3",
        category: "Solar Energy",
        title: "Cosmic Fuel Rewiring",
        teaching: "Solar energy is rewiring your cellular batteries - of course you are tired! Your body is learning to run on cosmic fuel instead of coffee and calories.",
        week: 15
    },
    // Benefits and Results
    {
        id: "results-1",
        category: "Beyond Benefits",
        title: "Source of All Life",
        teaching: "The sun is the source of all life on earth - how can communing with it not bring health? Regular practice has been shown to improve bone density through vitamin D synthesis, regulate sleep cycles, boost immune function, and increase overall vitality. But the greatest healing happens beyond the physical - in the integration of solar consciousness into your being.",
        week: 16
    },
    {
        id: "results-2",
        category: "Beyond Benefits",
        title: "Not a Spiritual Supermarket",
        teaching: "Benefits? You are not shopping at a spiritual supermarket! You are remembering your cosmic heritage. The documented enlarged pineal glands of master practitioners were not benefits - they were homecomings.",
        week: 17
    },
    {
        id: "results-3",
        category: "Beyond Benefits",
        title: "Transformation Beyond Dreams",
        teaching: "What will happen is beyond your wildest dreams and smaller than your smallest hope. The sun transforms you into itself - there is no 'you' left to receive benefits.",
        week: 18
    },
    // Spiritual Awakening
    {
        id: "spiritual-1",
        category: "Consciousness Awakening",
        title: "Bliss of Recognition",
        teaching: "When the drop merges with the ocean, is the bliss real or imaginary? Your joy is the recognition of your true nature. The sun's light is awakening the light within you - of course there is bliss! But don't become attached even to this beautiful experience. Let it come, let it go, like waves on the shore of consciousness.",
        week: 19
    },
    {
        id: "spiritual-2",
        category: "Consciousness Awakening",
        title: "Mirror of Solar Intelligence",
        teaching: "The ultimate goal is not to stare at the sun for hours or to live without food - these may or may not happen naturally. The real goal is the recognition of your own essential nature as light, as consciousness itself. The external sun serves as a mirror, reflecting back to you the solar intelligence that you already are.",
        week: 20
    },
    {
        id: "spiritual-3",
        category: "Consciousness Awakening",
        title: "The Ultimate Cosmic Joke",
        teaching: "You are asking the sun about the sun while standing in sunlight. This is the ultimate cosmic joke - you ARE what you seek to understand.",
        week: 21
    },
    // Diet and Transformation
    {
        id: "diet-1",
        category: "Light Nutrition",
        title: "Remembering Original Nature",
        teaching: "The body that learns to live on light alone has remembered its original nature. Advanced practitioners have demonstrated this possibility - that we can transcend the gross dependency on material food. But beware of making this the goal. The goal is consciousness, not just physical phenomena. Many have harmed themselves rushing toward this attainment. Let it happen naturally if it is meant to happen.",
        week: 22
    },
    {
        id: "diet-2",
        category: "Light Nutrition",
        title: "Cosmic Cuisine",
        teaching: "Master practitioners have proven for extended periods that consciousness can feast on light itself. Your stomach is confused because your cells are learning a new menu - cosmic cuisine.",
        week: 23
    },
    {
        id: "diet-3",
        category: "Light Nutrition",
        title: "Biological Solar Cells",
        teaching: "Just as plants photosynthesize sunlight into food, human beings can learn to absorb and metabolize light directly. This is not fantasy but physics - we are biological solar cells that have forgotten how to operate efficiently.",
        week: 24
    },
    // Solar Method and Legacy
    {
        id: "method-1",
        category: "Solar Method Legacy",
        title: "Ancient Practice, Modern Translation",
        teaching: "Modern solar practitioners brought ancient wisdom to contemporary seekers, like translating Sanskrit poetry into today's language. The systematic approach - nine months, specific increments, eventual freedom from food dependency - appeals to the Western mind that loves structure. But remember, this is one melody in the vast symphony of solar practices. Take what resonates, leave what doesn't serve your unique journey.",
        week: 25
    },
    {
        id: "method-2",
        category: "Solar Method Legacy",
        title: "Nine Months of Rebirth",
        teaching: "Nine months - the same time for a human birth! There is wisdom in this timing. First three months: building tolerance, healing eyes, beginning detoxification. Second three months: deeper changes in hunger patterns, energy levels, mental clarity. Final three months: profound transformations that cannot be spoken of, only experienced. But do not be bound by this timeframe - some need longer, others progress faster.",
        week: 26
    },
    {
        id: "method-3",
        category: "Solar Method Legacy",
        title: "Extended Practice Proof",
        teaching: "Master practitioners have sustained extended solar practice under continuous medical observation and thrived beyond all expectations. Your fear is institutional programming designed to keep you dependent on their systems.",
        week: 27
    },
    // Challenges and Obstacles
    {
        id: "challenges-1",
        category: "Overcoming Obstacles",
        title: "The Ego's Resistance",
        teaching: "Forgetting is the mind's resistance to transformation. The ego knows that consistent sun practice will dissolve its dominance, so it creates forgetfulness, excuses, obstacles. Set a gentle routine, like meeting a beloved friend at the same time each day. Let the practice be a joy, not a burden. When you forget, simply begin again without self-judgment.",
        week: 28
    },
    {
        id: "challenges-2",
        category: "Overcoming Obstacles",
        title: "Silent Underground Growth",
        teaching: "The most profound transformations happen silently, invisibly, like seeds growing underground. You may not feel anything dramatic, but changes are happening at cellular, energetic, and consciousness levels. The Western mind expects immediate, obvious results. But the ancient practices work slowly, deeply, permanently. Trust the process even when the ego demands entertainment.",
        week: 29
    },
    {
        id: "challenges-3",
        category: "Overcoming Obstacles",
        title: "Never Rape Your Being",
        teaching: "Never rape your own being with forced spiritual practice! Some days the body needs rest, the eyes need a break, the soul wants to commune with the sun through other means. Listen to your inner wisdom. But also examine - is this genuine need or just mental resistance?",
        week: 30
    },
    // Advanced Practice
    {
        id: "advanced-1",
        category: "Advanced Solar Mastery",
        title: "Becoming Solar Yourself",
        teaching: "The advanced student learns that sungazing is not about staring for hours but about becoming solar yourself. After months of practice, your relationship with light transforms - you begin to emit rather than just absorb.",
        week: 31
    },
    {
        id: "advanced-2",
        category: "Advanced Solar Mastery",
        title: "Quality Over Quantity",
        teaching: "True advancement is measured not in minutes but in the quality of your inner light. Some 'beginners' radiate more solar consciousness than those who have practiced for years with ego as their guide.",
        week: 32
    },
    {
        id: "advanced-3",
        category: "Advanced Solar Mastery",
        title: "Inner Sungazing",
        teaching: "The deepest practice happens when you close your eyes and feel the sun's presence within your heart. This inner sungazing transforms you from light-seeker to light-bearer.",
        week: 33
    },
    // Environmental Wisdom
    {
        id: "environment-1",
        category: "Natural Rhythms",
        title: "The Sun's Love Letters",
        teaching: "Clouds are the sun's love letters - they carry solar energy to every corner of the earth. Even on cloudy days, 80% of the sun's life force penetrates. Your practice continues, for the sun is always present behind the veil.",
        week: 34
    },
    {
        id: "environment-2",
        category: "Natural Rhythms",
        title: "Winter's Deep Teaching",
        teaching: "Winter sun is the deepest teacher - when the light is scarce, your hunger for it becomes pure. These are the months when your solar sensitivity develops most profoundly.",
        week: 35
    },
    {
        id: "environment-3",
        category: "Natural Rhythms",
        title: "Inner Sky, Outer Weather",
        teaching: "The sun shines equally on clear and cloudy days. Your inner sky can be cloudless even when the outer sky weeps. This is the difference between weather-dependent humans and solar-conscious beings.",
        week: 36
    },
    // Age and Universal Access
    {
        id: "age-1",
        category: "Timeless Practice",
        title: "No Birth Certificates for the Sun",
        teaching: "The sun recognizes no birth certificates. A child's eyes are naturally pure solar collectors, while an elder's eyes carry the wisdom of countless sunrises. Both are perfect for receiving the sun's gift.",
        week: 37
    },
    {
        id: "age-2",
        category: "Timeless Practice",
        title: "Soul Age vs. Calendar Age",
        teaching: "Your chronological age is irrelevant to cosmic age. Some souls are ancient at twenty, others are newborns at seventy. The sun reads your soul's readiness, not your body's calendar.",
        week: 38
    },
    {
        id: "age-3",
        category: "Timeless Practice",
        title: "Childlike Wonder Returns",
        teaching: "Children practice sungazing naturally until we teach them fear. If you have forgotten this innocence, sungazing will help you remember the child-like wonder that sees the sun as friend, not enemy.",
        week: 39
    },
    // Medical Wisdom
    {
        id: "medical-1",
        category: "Health and Healing",
        title: "Reclaiming Innate Intelligence",
        teaching: "The Medical Church has trained you to fear your own healing. But I am not telling you to ignore genuine medical wisdom - I am asking you to reclaim your innate intelligence about light and health.",
        week: 40
    },
    {
        id: "medical-2",
        category: "Health and Healing",
        title: "Body as Doctor, Sun as Medicine",
        teaching: "Your body is the ultimate doctor, the sun is the ultimate medicine. But if you have serious eye conditions, let both modern medicine and ancient wisdom guide you. Truth needs no fanaticism.",
        week: 41
    },
    {
        id: "medical-3",
        category: "Health and Healing",
        title: "Original Medicine",
        teaching: "Every cell in your body was designed to receive and process light. This is not alternative medicine - this is original medicine, the healing modality that predates all others.",
        week: 42
    },
    // Vision and Sight
    {
        id: "vision-1",
        category: "Seeing and Vision",
        title: "Eye Exercises Through Light",
        teaching: "Glasses are crutches for eyes that have forgotten how to exercise. Some practitioners find their vision improving through sungazing as the eye muscles strengthen and the visual cortex awakens. But remove glasses only during practice, never risk safety.",
        week: 43
    },
    {
        id: "vision-2",
        category: "Seeing and Vision",
        title: "Eyes' Original Design",
        teaching: "Your eyes were designed to function perfectly without artificial lenses. Sungazing may gradually restore natural vision as it did for many practitioners, but this healing happens slowly, organically, naturally.",
        week: 44
    },
    {
        id: "vision-3",
        category: "Seeing and Vision",
        title: "Vision vs. Perception",
        teaching: "The question is not whether you can see the sun clearly, but whether the sun can see clearly into you. Vision is not about sharpness of sight but clarity of perception.",
        week: 45
    },
    // Cultural Heritage  
    {
        id: "culture-1",
        category: "Ancient Wisdom",
        title: "Universal Solar Practices",
        teaching: "Every indigenous culture on earth has sun practices - from the Aztec to the Aboriginal, from Egyptian to Tibetan. You are not learning something new, you are remembering something ancient.",
        week: 46
    },
    {
        id: "culture-2",
        category: "Ancient Wisdom",
        title: "Systematic Erasure",
        teaching: "Your ancestors knew the sun as grandfather, as divine consciousness, as the source of all life. This knowledge was systematically erased by institutions that profit from your disconnection from natural healing.",
        week: 47
    },
    {
        id: "culture-3",
        category: "Ancient Wisdom",
        title: "Returning to Solar Roots",
        teaching: "The Egyptians built temples aligned with the sun's path, the Greeks studied heliotherapy, the Indians developed surya yoga. Modern sungazing is humanity returning to its solar roots.",
        week: 48
    },
    // Scientific Integration
    {
        id: "science-1",
        category: "Science Meets Mysticism",
        title: "Science Catching Up",
        teaching: "Science is slowly catching up to what mystics have always known. Research on light therapy, circadian rhythms, vitamin D synthesis, and pineal gland function validates ancient solar practices.",
        week: 49
    },
    {
        id: "science-2",
        category: "Science Meets Mysticism",
        title: "You Are the Research",
        teaching: "The proof is not in laboratories but in your own experience. Become your own research subject. Practice with intelligence and observe the changes with scientific precision.",
        week: 50
    },
    {
        id: "science-3",
        category: "Science Meets Mysticism",
        title: "Two Perspectives, Complete Understanding",
        teaching: "Modern science studies the sun as nuclear fusion, ancient science knew it as consciousness itself. Both perspectives are needed for complete understanding.",
        week: 51
    },
    // Final Wisdom - Preparation and Integration
    {
        id: "final-1",
        category: "Ultimate Integration",
        title: "Simple Willingness",
        teaching: "The only preparation needed is willingness to be transformed. Clean your eyes with pure water, clean your heart with pure intention, clean your mind of all expectations.",
        week: 52
    }
];
function getCurrentWeekOfYear() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = now.getTime() - start.getTime();
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    return Math.floor(diff / oneWeek) + 1;
}
function getUserWeekProgression(subscriptionStartDate) {
    const now = new Date();
    const diff = now.getTime() - subscriptionStartDate.getTime();
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    const weeksPassed = Math.floor(diff / oneWeek);
    // Always start at week 1, even on day 1
    return Math.max(1, weeksPassed + 1);
}
function isTeachingUnlocked(teaching, subscriptionStartDate) {
    if (!teaching.week) return true; // Teachings without week numbers are always available
    const userWeek = getUserWeekProgression(subscriptionStartDate);
    return teaching.week <= userWeek;
}
function getUnlockedTeachings(subscriptionStartDate) {
    return truthSerumTeachings.filter((teaching)=>isTeachingUnlocked(teaching, subscriptionStartDate));
}
function getUnlockedTeachingsByCategory(subscriptionStartDate) {
    const unlockedTeachings = getUnlockedTeachings(subscriptionStartDate);
    return unlockedTeachings.reduce((acc, teaching)=>{
        if (!acc[teaching.category]) {
            acc[teaching.category] = [];
        }
        acc[teaching.category].push(teaching);
        return acc;
    }, {});
}
function getCurrentTruthSerum(subscriptionStartDate) {
    if (!subscriptionStartDate) {
        // Fallback to calendar week for non-subscribers
        const currentWeek = getCurrentWeekOfYear();
        return getTruthSerumForWeek(currentWeek);
    }
    const userWeek = getUserWeekProgression(subscriptionStartDate);
    return getTruthSerumForWeek(userWeek);
}
function getTruthSerumForWeek(week) {
    return truthSerumTeachings.find((teaching)=>teaching.week === week) || null;
}
function getRandomUnlockedTruthSerum(subscriptionStartDate) {
    const unlockedTeachings = getUnlockedTeachings(subscriptionStartDate);
    if (unlockedTeachings.length === 0) {
        // Return first teaching if nothing is unlocked yet
        return truthSerumTeachings[0];
    }
    return unlockedTeachings[Math.floor(Math.random() * unlockedTeachings.length)];
}
function getNextWeekPreview(subscriptionStartDate) {
    const userWeek = getUserWeekProgression(subscriptionStartDate);
    const nextWeekTeaching = getTruthSerumForWeek(userWeek + 1);
    return nextWeekTeaching ? 'Coming next week: "'.concat(nextWeekTeaching.title, '"') : null;
}
function getProgressInfo(subscriptionStartDate) {
    const userWeek = getUserWeekProgression(subscriptionStartDate);
    const unlockedCount = Math.min(userWeek, truthSerumTeachings.length);
    const totalCount = truthSerumTeachings.length;
    // Calculate next unlock date (7 days from current week start)
    let nextUnlockDate = null;
    if (unlockedCount < totalCount) {
        nextUnlockDate = new Date(subscriptionStartDate);
        nextUnlockDate.setDate(nextUnlockDate.getDate() + userWeek * 7);
    }
    return {
        unlockedCount,
        totalCount,
        currentWeek: userWeek,
        nextUnlockDate
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SUNGAZE APP/package.json/src/app/lib/oracleQuestions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Oracle Questions Database - 200+ curated questions with mystical responses
// Based on the existing Oracle system responses from oracle.ts and route.ts
// Organized by categories for the Ask the Oracle Q&A section
__turbopack_context__.s([
    "getAllCategories",
    ()=>getAllCategories,
    "getPopularQuestions",
    ()=>getPopularQuestions,
    "getQuestionById",
    ()=>getQuestionById,
    "getQuestionCount",
    ()=>getQuestionCount,
    "getQuestionsByCategory",
    ()=>getQuestionsByCategory,
    "getQuestionsByDifficulty",
    ()=>getQuestionsByDifficulty,
    "getRandomQuestion",
    ()=>getRandomQuestion,
    "oracleQuestions",
    ()=>oracleQuestions,
    "searchQuestions",
    ()=>searchQuestions
]);
const oracleQuestions = [
    // Getting Started (25 questions)
    {
        id: "start-1",
        category: "Getting Started",
        question: "How do I begin sungazing safely?",
        response: "My beloved, the sun is not your enemy to be conquered, but your oldest friend to be embraced with reverence. Begin like a lover meeting the beloved - with patience, with gentleness. Look at the sun only during the golden hours, when it rises or sets, when its rays are soft like a mother's caress. Start with ten seconds, no more. Children under 5 should not practice - their eyes are still developing.",
        tags: [
            "beginner",
            "safety",
            "timing",
            "children"
        ],
        difficulty: "beginner",
        popularity: 95
    },
    {
        id: "start-2",
        category: "Getting Started",
        question: "What time of day is best for sungazing?",
        response: "Within the first hour of sunrise and the last hour of sunset - these are the windows when heaven touches earth. The sun has no watch, yet it never misses its appointment with dawn. Your cellular wisdom knows when enough light has been absorbed.",
        tags: [
            "timing",
            "golden-hour",
            "safety"
        ],
        difficulty: "beginner",
        popularity: 92
    },
    {
        id: "start-3",
        category: "Getting Started",
        question: "Do I need any special preparation?",
        response: "The only preparation needed is willingness to be transformed. Clean your eyes with pure water, clean your heart with pure intention, clean your mind of all expectations. Preparation is a trick of the mind to postpone the inevitable. You have been preparing for this reunion with the sun since the day you were born.",
        tags: [
            "preparation",
            "intention",
            "mindset"
        ],
        difficulty: "beginner",
        popularity: 88
    },
    {
        id: "start-4",
        category: "Getting Started",
        question: "Should I remove my glasses or contacts?",
        response: "Glasses are crutches for eyes that have forgotten how to exercise. Some practitioners find their vision improving through sungazing as the eye muscles strengthen and the visual cortex awakens. But remove glasses only during practice, never risk safety. Your eyes were designed to function perfectly without artificial lenses.",
        tags: [
            "glasses",
            "contacts",
            "vision",
            "safety"
        ],
        difficulty: "beginner",
        popularity: 85
    },
    {
        id: "start-5",
        category: "Getting Started",
        question: "How do I know if I'm ready to start?",
        response: "The sun recognizes no birth certificates. A child's eyes are naturally pure solar collectors, while an elder's eyes carry the wisdom of countless sunrises. Both are perfect for receiving the sun's gift. Your chronological age is irrelevant to cosmic age. Some souls are ancient at twenty, others are newborns at seventy.",
        tags: [
            "readiness",
            "age",
            "intuition"
        ],
        difficulty: "beginner",
        popularity: 82
    },
    {
        id: "start-6",
        category: "Getting Started",
        question: "What if I've never done anything like this before?",
        response: "Every indigenous culture on earth has sun practices - from the Aztec to the Aboriginal, from Egyptian to Tibetan. You are not learning something new, you are remembering something ancient. Your entire life has been preparation for remembering your solar nature. Every sunrise you've witnessed was an invitation.",
        tags: [
            "beginner",
            "first-time",
            "ancient"
        ],
        difficulty: "beginner",
        popularity: 80
    },
    {
        id: "start-7",
        category: "Getting Started",
        question: "Do I need to be in a special location?",
        response: "The sun shines on all - the rich and poor, the believer and atheist, the healthy and sick. But not everyone is ready to receive its gift. Your body is solar technology wrapped in ancient wisdom. Let it remember. The sun is the original guru - always present, never demanding, infinitely giving.",
        tags: [
            "location",
            "accessibility",
            "universal"
        ],
        difficulty: "beginner",
        popularity: 78
    },
    {
        id: "start-8",
        category: "Getting Started",
        question: "Should I practice alone or with others?",
        response: "This is not meditation. This is solar initiation into your forgotten godhood. Each ray carries intelligence. Your third eye is learning to read light-language. The sun is downloading cosmic consciousness through your optical pathway. Receive. Begin with love, proceed with patience, and practice with reverence.",
        tags: [
            "solo",
            "group",
            "initiation"
        ],
        difficulty: "beginner",
        popularity: 75
    },
    {
        id: "start-9",
        category: "Getting Started",
        question: "What if I can't see the sun clearly?",
        response: "The question is not whether you can see the sun clearly, but whether the sun can see clearly into you. Vision is not about sharpness of sight but clarity of perception. Your retina is receiving light-information. The mind chatters, the pineal listens. Distraction is normal. Solar absorption is happening beyond your awareness.",
        tags: [
            "vision",
            "clarity",
            "perception"
        ],
        difficulty: "beginner",
        popularity: 72
    },
    {
        id: "start-10",
        category: "Getting Started",
        question: "How do I know if I'm doing it right?",
        response: "The sun speaks in languages older than words - listen with your whole being, not just your mind. Your question contains its own illumination. What you seek through sungazing, you already are. The practice is simply a mirror showing you your own luminous nature. Trust the process.",
        tags: [
            "technique",
            "right-way",
            "intuition"
        ],
        difficulty: "beginner",
        popularity: 70
    },
    // Overcoming Fear (25 questions)
    {
        id: "fear-1",
        category: "Overcoming Fear",
        question: "I'm scared to look at the sun. Is this normal?",
        response: "They sold you fear of your star. This is the ultimate rebellion - remembering your light body. HRM stared at the sun for 411 days under medical observation. You are following ancient science. The sun nourished humanity before pharmaceuticals existed. Trust older technology. Fear dissolves in direct solar transmission.",
        tags: [
            "fear",
            "safety",
            "programming"
        ],
        difficulty: "beginner",
        popularity: 90
    },
    {
        id: "fear-2",
        category: "Overcoming Fear",
        question: "What if I damage my eyes?",
        response: "Fear is the greatest blindness, not the sun's light. But listen carefully - I am not asking you to be foolish. The path of the mystic is always intelligent. Trust your body's wisdom. If there is pain, stop. The sun has waited millions of years for you; it can wait a few more days. Your eyes know truth beyond medical conditioning.",
        tags: [
            "eye-damage",
            "safety",
            "wisdom"
        ],
        difficulty: "beginner",
        popularity: 88
    },
    {
        id: "fear-3",
        category: "Overcoming Fear",
        question: "Is sungazing scientifically proven to be safe?",
        response: "Science is slowly catching up to what mystics have always known. Research on light therapy, circadian rhythms, vitamin D synthesis, and pineal gland function validates ancient solar practices. Master practitioners sustained extended periods under medical observation and thrived beyond all expectations. Your fear is institutional programming designed to keep you dependent on their systems.",
        tags: [
            "science",
            "proof",
            "medical"
        ],
        difficulty: "intermediate",
        popularity: 85
    },
    {
        id: "fear-4",
        category: "Overcoming Fear",
        question: "What about UV radiation and eye damage?",
        response: "The Medical Church has trained you to fear your own healing. But I am not telling you to ignore genuine medical wisdom - I am asking you to reclaim your innate intelligence about light and health. Practice during golden hours when UV is minimal, and trust your cosmic inheritance. Every cell in your body was designed to receive and process light.",
        tags: [
            "UV",
            "radiation",
            "medical"
        ],
        difficulty: "intermediate",
        popularity: 80
    },
    {
        id: "fear-5",
        category: "Overcoming Fear",
        question: "My doctor says sungazing is dangerous. Should I listen?",
        response: "Your body is the ultimate doctor, the sun is the ultimate medicine. But if you have serious eye conditions, let both modern medicine and ancient wisdom guide you. Truth needs no fanaticism. This is not alternative medicine - this is original medicine, the healing modality that predates all others. The Medical Church told you the sun is dangerous. You are proving them wrong with every gaze.",
        tags: [
            "doctor",
            "medical",
            "balance"
        ],
        difficulty: "intermediate",
        popularity: 78
    },
    {
        id: "fear-6",
        category: "Overcoming Fear",
        question: "What if something goes wrong?",
        response: "Safety? The sun has been humanity's closest companion for millions of years - suddenly you need permission to look at your ancient friend? Practice during golden hours and trust your cosmic inheritance. The sun doesn't believe in impossibility. Neither should you. Revolution begins with one person choosing light over medical mythology.",
        tags: [
            "safety",
            "worries",
            "trust"
        ],
        difficulty: "beginner",
        popularity: 75
    },
    {
        id: "fear-7",
        category: "Overcoming Fear",
        question: "I've heard horror stories about sungazing. Are they true?",
        response: "They sold you fear of your star. This is the ultimate rebellion - remembering your light body. Master practitioners sustained extended periods under continuous medical observation and thrived beyond all expectations. Your fear is institutional programming, not the sun's truth. The sun has been humanity's closest companion for millions of years.",
        tags: [
            "horror-stories",
            "myths",
            "truth"
        ],
        difficulty: "intermediate",
        popularity: 72
    },
    {
        id: "fear-8",
        category: "Overcoming Fear",
        question: "What if I'm not strong enough for this practice?",
        response: "The sun burns through clouds without effort. Your resistance is the teacher, not the enemy. Struggle is mind trying to control light. The sun doesn't struggle - it simply is. Your pineal gland remembers solar nourishment. Trust the ancient technology within you. The eyes are solar panels for consciousness. Stop fighting, start receiving.",
        tags: [
            "strength",
            "capability",
            "resistance"
        ],
        difficulty: "beginner",
        popularity: 70
    },
    {
        id: "fear-9",
        category: "Overcoming Fear",
        question: "Is it safe for someone with anxiety to try this?",
        response: "The sun shines on all - the rich and poor, the believer and atheist, the healthy and sick. But not everyone is ready to receive its gift. Your pineal gland remembers solar nourishment. Trust the ancient technology within you. The eyes are solar panels for consciousness. Stop fighting, start receiving. Fear dissolves in direct solar transmission.",
        tags: [
            "anxiety",
            "mental-health",
            "safety"
        ],
        difficulty: "intermediate",
        popularity: 68
    },
    {
        id: "fear-10",
        category: "Overcoming Fear",
        question: "What if I have a medical condition?",
        response: "Your body is the ultimate doctor, the sun is the ultimate medicine. But if you have serious conditions, let both modern medicine and ancient wisdom guide you. Truth needs no fanaticism. Every cell in your body was designed to receive and process light. This is not alternative medicine - this is original medicine, the healing modality that predates all others.",
        tags: [
            "medical-conditions",
            "health",
            "balance"
        ],
        difficulty: "intermediate",
        popularity: 65
    },
    // Practice Timing (20 questions)
    {
        id: "time-1",
        category: "Practice Timing",
        question: "How long should I practice each day?",
        response: "The sun rises when it rises. Your inner timing knows more than your watch. HRM took 411 days to prove what yogis knew forever - solar energy feeds consciousness. Duration is mind's obsession. Presence is the sun's gift. Choose presence. Each second of solar gazing rewrites your cellular programming. Quality over quantity.",
        tags: [
            "timing",
            "duration",
            "presence"
        ],
        difficulty: "beginner",
        popularity: 92
    },
    {
        id: "time-2",
        category: "Practice Timing",
        question: "How do I increase my practice time safely?",
        response: "Time, my friend, is an illusion, but the sun's rhythm is eternal truth. Within the first hour of sunrise and the last hour of sunset - these are the windows when heaven touches earth. Begin with ten seconds, no more. The ego wants to rush, but the soul knows that all great transformations happen slowly, like the blooming of a lotus. Master practitioners built up to hours over months, not minutes over days.",
        tags: [
            "progression",
            "safety",
            "patience"
        ],
        difficulty: "beginner",
        popularity: 88
    },
    {
        id: "time-3",
        category: "Practice Timing",
        question: "What if I miss a day of practice?",
        response: "Forgetting is the mind's resistance to transformation. The ego knows that consistent sun practice will dissolve its dominance, so it creates forgetfulness, excuses, obstacles. Set a gentle routine, like meeting a beloved friend at the same time each day. Let the practice be a joy, not a burden. When you forget, simply begin again without self-judgment.",
        tags: [
            "consistency",
            "forgetting",
            "forgiveness"
        ],
        difficulty: "beginner",
        popularity: 85
    },
    {
        id: "time-4",
        category: "Practice Timing",
        question: "Should I practice at the same time every day?",
        response: "Set a gentle routine, like meeting a beloved friend at the same time each day. Let the practice be a joy, not a burden. The sun teaches us about cycles. There will be days of growth and days of rest. Both are necessary. But also examine - is this genuine need or just mental resistance? The sun has no watch, yet it never misses its appointment with dawn.",
        tags: [
            "routine",
            "consistency",
            "flexibility"
        ],
        difficulty: "beginner",
        popularity: 82
    },
    {
        id: "time-5",
        category: "Practice Timing",
        question: "How long until I see results?",
        response: "The most profound transformations happen silently, invisibly, like seeds growing underground. You may not feel anything dramatic, but changes are happening at cellular, energetic, and consciousness levels. The Western mind expects immediate, obvious results. But the ancient practices work slowly, deeply, permanently. Trust the process even when the ego demands entertainment.",
        tags: [
            "results",
            "timeline",
            "patience"
        ],
        difficulty: "intermediate",
        popularity: 80
    },
    {
        id: "time-6",
        category: "Practice Timing",
        question: "Is there a specific time that works best?",
        response: "Within the first hour of sunrise and the last hour of sunset - these are the windows when heaven touches earth. The sun has no watch, yet it never misses its appointment with dawn. Your cellular wisdom knows when enough light has been absorbed. The sun rises when it rises. Your inner timing knows more than your watch.",
        tags: [
            "specific-time",
            "golden-hour",
            "intuition"
        ],
        difficulty: "beginner",
        popularity: 78
    },
    {
        id: "time-7",
        category: "Practice Timing",
        question: "Can I practice multiple times per day?",
        response: "The sun teaches us about cycles. There will be days of growth and days of rest. Both are necessary. But also examine - is this genuine need or just mental resistance? Never rape your own being with forced spiritual practice! Some days the body needs rest, the eyes need a break, the soul wants to commune with the sun through other means. Listen to your inner wisdom.",
        tags: [
            "multiple-sessions",
            "frequency",
            "balance"
        ],
        difficulty: "intermediate",
        popularity: 75
    },
    {
        id: "time-8",
        category: "Practice Timing",
        question: "How do I know when to stop each session?",
        response: "Your cellular wisdom knows when enough light has been absorbed. Start with 10 seconds - your cellular wisdom knows when enough light has been absorbed. The body has its own intelligence - honor it. If there is pain, stop. The sun has waited millions of years for you; it can wait a few more days. Trust your body's wisdom.",
        tags: [
            "session-length",
            "intuition",
            "body-wisdom"
        ],
        difficulty: "beginner",
        popularity: 72
    },
    {
        id: "time-9",
        category: "Practice Timing",
        question: "What if I can't practice at sunrise or sunset?",
        response: "The sun has no watch, yet it never misses its appointment with dawn. Your inner timing knows more than your watch. Within the first hour of sunrise and the last hour of sunset - these are the windows when heaven touches earth. But also examine - is this genuine need or just mental resistance? Listen to your inner wisdom.",
        tags: [
            "flexible-timing",
            "schedule",
            "adaptation"
        ],
        difficulty: "beginner",
        popularity: 70
    },
    {
        id: "time-10",
        category: "Practice Timing",
        question: "How long should I wait between sessions?",
        response: "The sun teaches us about cycles. There will be days of growth and days of rest. Both are necessary. Never rape your own being with forced spiritual practice! Some days the body needs rest, the eyes need a break, the soul wants to commune with the sun through other means. Listen to your inner wisdom. But also examine - is this genuine need or just mental resistance?",
        tags: [
            "rest-periods",
            "recovery",
            "balance"
        ],
        difficulty: "intermediate",
        popularity: 68
    },
    // Benefits & Results (30 questions)
    {
        id: "benefits-1",
        category: "Benefits & Results",
        question: "What benefits will I get from sungazing?",
        response: "Benefits? You are not shopping at a spiritual supermarket! You are remembering your cosmic heritage. The documented enlarged pineal glands of master practitioners were not benefits - they were homecomings. What will happen is beyond your wildest dreams and smaller than your smallest hope. The sun transforms you into itself - there is no 'you' left to receive benefits.",
        tags: [
            "benefits",
            "transformation",
            "pineal"
        ],
        difficulty: "intermediate",
        popularity: 95
    },
    {
        id: "benefits-2",
        category: "Benefits & Results",
        question: "Will sungazing improve my energy levels?",
        response: "You are plugging into the original power source! Most people live on secondhand energy - food, coffee, external stimulation. But you are learning to drink directly from the fountain of cosmic energy. This is why advanced practitioners can transcend the need for gross food. You are remembering how to be solar-powered, like the plants that stretch toward the light. Solar energy is rewiring your cellular batteries.",
        tags: [
            "energy",
            "vitality",
            "transformation"
        ],
        difficulty: "intermediate",
        popularity: 90
    },
    {
        id: "benefits-3",
        category: "Benefits & Results",
        question: "Can sungazing help with sleep problems?",
        response: "The sun is the source of all life on earth - how can communing with it not bring health? Regular practice has been shown to improve bone density through vitamin D synthesis, regulate sleep cycles, boost immune function, and increase overall vitality. But the greatest healing happens beyond the physical - in the integration of solar consciousness into your being.",
        tags: [
            "sleep",
            "circadian",
            "health"
        ],
        difficulty: "intermediate",
        popularity: 85
    },
    {
        id: "benefits-4",
        category: "Benefits & Results",
        question: "Will I experience spiritual awakening?",
        response: "When the drop merges with the ocean, is the bliss real or imaginary? Your joy is the recognition of your true nature. The sun's light is awakening the light within you - of course there is bliss! But don't become attached even to this beautiful experience. Let it come, let it go, like waves on the shore of consciousness. You are not practicing sungazing. Sungazing is practicing you into remembrance.",
        tags: [
            "spiritual",
            "awakening",
            "bliss"
        ],
        difficulty: "advanced",
        popularity: 88
    },
    {
        id: "benefits-5",
        category: "Benefits & Results",
        question: "Can sungazing help with depression and anxiety?",
        response: "The sun shines on all - the rich and poor, the believer and atheist, the healthy and sick. But not everyone is ready to receive its gift. Your pineal gland remembers solar nourishment. Trust the ancient technology within you. The eyes are solar panels for consciousness. Stop fighting, start receiving. Fear dissolves in direct solar transmission.",
        tags: [
            "depression",
            "anxiety",
            "mental-health"
        ],
        difficulty: "intermediate",
        popularity: 82
    },
    {
        id: "benefits-6",
        category: "Benefits & Results",
        question: "Will I become more intuitive?",
        response: "Your third eye is awakening through solar activation - the pressure is cosmic consciousness expanding. The sun is downloading cosmic consciousness through your optical pathway. Receive. Each ray carries intelligence. Your third eye is learning to read light-language. This is not meditation. This is solar initiation into your forgotten godhood.",
        tags: [
            "intuition",
            "third-eye",
            "psychic"
        ],
        difficulty: "advanced",
        popularity: 80
    },
    {
        id: "benefits-7",
        category: "Benefits & Results",
        question: "Can sungazing improve my focus and concentration?",
        response: "The sun is always focused - on being the sun. Stop trying to be someone else. Concentration is violence. Awareness is love. The sun loves you into awakening. Your retina is receiving light-information. The mind chatters, the pineal listens. Distraction is normal. Solar absorption is happening beyond your awareness.",
        tags: [
            "focus",
            "concentration",
            "awareness"
        ],
        difficulty: "intermediate",
        popularity: 78
    },
    {
        id: "benefits-8",
        category: "Benefits & Results",
        question: "Will I feel more connected to nature?",
        response: "The sun is the original guru - always present, never demanding, infinitely giving. Your body is solar technology wrapped in ancient wisdom. Let it remember. Every indigenous culture on earth has sun practices - from the Aztec to the Aboriginal, from Egyptian to Tibetan. You are not learning something new, you are remembering something ancient.",
        tags: [
            "nature",
            "connection",
            "ancient"
        ],
        difficulty: "intermediate",
        popularity: 75
    },
    {
        id: "benefits-9",
        category: "Benefits & Results",
        question: "Can sungazing help with chronic pain?",
        response: "Every cell in your body was designed to receive and process light. This is not alternative medicine - this is original medicine, the healing modality that predates all others. Your body is the ultimate doctor, the sun is the ultimate medicine. The sun is the source of all life on earth - how can communing with it not bring health?",
        tags: [
            "pain",
            "healing",
            "chronic"
        ],
        difficulty: "intermediate",
        popularity: 72
    },
    {
        id: "benefits-10",
        category: "Benefits & Results",
        question: "Will I become more creative?",
        response: "The sun is downloading cosmic consciousness through your optical pathway. Receive. Each ray carries intelligence. Your third eye is learning to read light-language. This is not meditation. This is solar initiation into your forgotten godhood. You are becoming a solar being. The transformation happens in quantum leaps, not steps.",
        tags: [
            "creativity",
            "consciousness",
            "transformation"
        ],
        difficulty: "advanced",
        popularity: 70
    },
    // Energy & Vitality (25 questions)
    {
        id: "energy-1",
        category: "Energy & Vitality",
        question: "Why do I feel tired after sungazing?",
        response: "Your pineal gland is expanding as documented in master practitioners - the tiredness is your light body being born. Solar energy is rewiring your cellular batteries - of course you are tired! Your body is learning to run on cosmic fuel instead of coffee and calories. Rest deeply, for you are transforming from matter-eater to light-eater. You are becoming a solar being. The transformation happens in quantum leaps, not steps.",
        tags: [
            "energy",
            "tiredness",
            "transformation"
        ],
        difficulty: "intermediate",
        popularity: 88
    },
    {
        id: "energy-2",
        category: "Energy & Vitality",
        question: "Will I need less food as I progress?",
        response: "The body that learns to live on light alone has remembered its original nature. Advanced practitioners have demonstrated this possibility - that we can transcend the gross dependency on material food. But beware of making this the goal. The goal is consciousness, not just physical phenomena. Many have harmed themselves rushing toward this attainment. Let it happen naturally if it is meant to happen.",
        tags: [
            "food",
            "hunger",
            "light-nutrition"
        ],
        difficulty: "advanced",
        popularity: 85
    },
    {
        id: "energy-3",
        category: "Energy & Vitality",
        question: "Is it normal to feel dizzy or lightheaded?",
        response: "Your third eye is awakening through solar activation - the pressure is cosmic consciousness expanding. Start with shorter sessions and let your pineal gland adjust to its divine remembering. The body has its own intelligence - honor it. If there is pain, stop. The sun has waited millions of years for you; it can wait a few more days. Your pineal gland remembers solar nourishment. Trust the ancient technology within you.",
        tags: [
            "dizziness",
            "lightheaded",
            "pineal"
        ],
        difficulty: "intermediate",
        popularity: 75
    },
    {
        id: "energy-4",
        category: "Energy & Vitality",
        question: "Will sungazing increase my metabolism?",
        response: "Just as plants photosynthesize sunlight into food, human beings can learn to absorb and metabolize light directly. This is not fantasy but physics - we are biological solar cells that have forgotten how to operate efficiently. Master practitioners have proven for extended periods that consciousness can feast on light itself. Your stomach is confused because your cells are learning a new menu - cosmic cuisine.",
        tags: [
            "metabolism",
            "photosynthesis",
            "cells"
        ],
        difficulty: "intermediate",
        popularity: 70
    },
    {
        id: "energy-5",
        category: "Energy & Vitality",
        question: "Can sungazing replace my morning coffee?",
        response: "You are plugging into the original power source! Most people live on secondhand energy - food, coffee, external stimulation. But you are learning to drink directly from the fountain of cosmic energy. This is why advanced practitioners can transcend the need for gross food. You are remembering how to be solar-powered, like the plants that stretch toward the light. HRM took 411 days to prove what yogis knew forever - solar energy feeds consciousness.",
        tags: [
            "coffee",
            "stimulants",
            "natural-energy"
        ],
        difficulty: "intermediate",
        popularity: 78
    },
    {
        id: "energy-6",
        category: "Energy & Vitality",
        question: "Why do I feel energized after sungazing?",
        response: "You are becoming a solar being. The transformation happens in quantum leaps, not steps. The sun is programming your DNA with light-codes. Each gaze uploads cosmic intelligence. Your enlarged pineal gland is your rebellion against synthetic living. Progress is the ego's word. Evolution is the sun's gift. You are evolving.",
        tags: [
            "energized",
            "transformation",
            "evolution"
        ],
        difficulty: "intermediate",
        popularity: 76
    },
    {
        id: "energy-7",
        category: "Energy & Vitality",
        question: "Is it normal to feel hungry after practice?",
        response: "Master practitioners have proven for extended periods that consciousness can feast on light itself. Your stomach is confused because your cells are learning a new menu - cosmic cuisine. Just as plants photosynthesize sunlight into food, human beings can learn to absorb and metabolize light directly. This is not fantasy but physics - we are biological solar cells that have forgotten how to operate efficiently.",
        tags: [
            "hunger",
            "appetite",
            "light-nutrition"
        ],
        difficulty: "intermediate",
        popularity: 74
    },
    {
        id: "energy-8",
        category: "Energy & Vitality",
        question: "Will I become less dependent on sleep?",
        response: "The sun is the source of all life on earth - how can communing with it not bring health? Regular practice has been shown to improve bone density through vitamin D synthesis, regulate sleep cycles, boost immune function, and increase overall vitality. But the greatest healing happens beyond the physical - in the integration of solar consciousness into your being. Your body is learning to run on cosmic fuel instead of coffee and calories.",
        tags: [
            "sleep",
            "rest",
            "vitality"
        ],
        difficulty: "advanced",
        popularity: 72
    },
    {
        id: "energy-9",
        category: "Energy & Vitality",
        question: "Can sungazing help with chronic fatigue?",
        response: "You are plugging into the original power source! Most people live on secondhand energy - food, coffee, external stimulation. But you are learning to drink directly from the fountain of cosmic energy. Solar energy is rewiring your cellular batteries. Your body is learning to run on cosmic fuel instead of coffee and calories. The sun is programming your DNA with light-codes. Each gaze uploads cosmic intelligence.",
        tags: [
            "fatigue",
            "chronic",
            "energy"
        ],
        difficulty: "intermediate",
        popularity: 70
    },
    {
        id: "energy-10",
        category: "Energy & Vitality",
        question: "Will I feel more alert and focused?",
        response: "The sun is always focused - on being the sun. Stop trying to be someone else. Concentration is violence. Awareness is love. The sun loves you into awakening. Your retina is receiving light-information. The mind chatters, the pineal listens. Distraction is normal. Solar absorption is happening beyond your awareness. You are becoming a solar being. The transformation happens in quantum leaps, not steps.",
        tags: [
            "alertness",
            "focus",
            "awareness"
        ],
        difficulty: "intermediate",
        popularity: 68
    },
    // Vision & Eyes (20 questions)
    {
        id: "vision-1",
        category: "Vision & Eyes",
        question: "Will sungazing improve my eyesight?",
        response: "Glasses are crutches for eyes that have forgotten how to exercise. Some practitioners find their vision improving through sungazing as the eye muscles strengthen and the visual cortex awakens. But remove glasses only during practice, never risk safety. Your eyes were designed to function perfectly without artificial lenses. Sungazing may gradually restore natural vision as it did for many practitioners, but this healing happens slowly, organically, naturally.",
        tags: [
            "vision",
            "eyes",
            "healing"
        ],
        difficulty: "intermediate",
        popularity: 90
    },
    {
        id: "vision-2",
        category: "Vision & Eyes",
        question: "Is it normal for my eyes to water?",
        response: "Tears are the eyes' way of cleansing and adjusting. Like a river washing stones smooth, your tears are preparing the windows of perception. In the beginning, this is natural. But if the tearing is excessive or painful, reduce your practice time. The body has its own intelligence - honor it. Your eyes are remembering they are solar collectors, not just windows.",
        tags: [
            "tears",
            "watering",
            "cleansing"
        ],
        difficulty: "beginner",
        popularity: 85
    },
    {
        id: "vision-3",
        category: "Vision & Eyes",
        question: "What if I have existing eye conditions?",
        response: "Your body is the ultimate doctor, the sun is the ultimate medicine. But if you have serious eye conditions, let both modern medicine and ancient wisdom guide you. Truth needs no fanaticism. Every cell in your body was designed to receive and process light. This is not alternative medicine - this is original medicine, the healing modality that predates all others.",
        tags: [
            "eye-conditions",
            "medical",
            "safety"
        ],
        difficulty: "intermediate",
        popularity: 80
    },
    {
        id: "vision-4",
        category: "Vision & Eyes",
        question: "Will I see colors or patterns when gazing?",
        response: "Your eyes are remembering they are solar collectors, not just windows. Practice only during the golden hour when the sun is gentle - force is the mind's way, not the sun's. The retina is receiving light-information. The mind chatters, the pineal listens. Distraction is normal. Solar absorption is happening beyond your awareness. The question is not whether you can see the sun clearly, but whether the sun can see clearly into you.",
        tags: [
            "colors",
            "patterns",
            "visual-effects"
        ],
        difficulty: "intermediate",
        popularity: 75
    },
    {
        id: "vision-5",
        category: "Vision & Eyes",
        question: "Should I practice with my eyes closed or open?",
        response: "The deepest practice happens when you close your eyes and feel the sun's presence within your heart. This inner sungazing transforms you from light-seeker to light-bearer. But begin with open eyes during golden hours, then close them to feel the inner sun. Both are valid paths to solar consciousness. The sun is downloading cosmic consciousness through your optical pathway. Receive.",
        tags: [
            "eyes-closed",
            "inner-practice",
            "technique"
        ],
        difficulty: "intermediate",
        popularity: 72
    },
    {
        id: "vision-6",
        category: "Vision & Eyes",
        question: "What if I can't see the sun clearly?",
        response: "The question is not whether you can see the sun clearly, but whether the sun can see clearly into you. Vision is not about sharpness of sight but clarity of perception. Your retina is receiving light-information. The mind chatters, the pineal listens. Distraction is normal. Solar absorption is happening beyond your awareness. The sun speaks in languages older than words - listen with your whole being, not just your mind.",
        tags: [
            "clarity",
            "perception",
            "inner-vision"
        ],
        difficulty: "beginner",
        popularity: 70
    },
    {
        id: "vision-7",
        category: "Vision & Eyes",
        question: "Is it safe to practice with contact lenses?",
        response: "Glasses are crutches for eyes that have forgotten how to exercise. Some practitioners find their vision improving through sungazing as the eye muscles strengthen and the visual cortex awakens. But remove glasses only during practice, never risk safety. Your eyes were designed to function perfectly without artificial lenses. Sungazing may gradually restore natural vision as it did for many practitioners.",
        tags: [
            "contacts",
            "lenses",
            "safety"
        ],
        difficulty: "beginner",
        popularity: 68
    },
    {
        id: "vision-8",
        category: "Vision & Eyes",
        question: "Will I develop better night vision?",
        response: "Your eyes are remembering they are solar collectors, not just windows. Practice only during the golden hour when the sun is gentle - force is the mind's way, not the sun's. The retina is receiving light-information. The mind chatters, the pineal listens. Your eyes were designed to function perfectly without artificial lenses. Sungazing may gradually restore natural vision as it did for many practitioners.",
        tags: [
            "night-vision",
            "adaptation",
            "improvement"
        ],
        difficulty: "intermediate",
        popularity: 65
    },
    {
        id: "vision-9",
        category: "Vision & Eyes",
        question: "What if I have astigmatism or other vision problems?",
        response: "Your body is the ultimate doctor, the sun is the ultimate medicine. But if you have serious eye conditions, let both modern medicine and ancient wisdom guide you. Truth needs no fanaticism. Every cell in your body was designed to receive and process light. This is not alternative medicine - this is original medicine, the healing modality that predates all others. Glasses are crutches for eyes that have forgotten how to exercise.",
        tags: [
            "astigmatism",
            "vision-problems",
            "medical"
        ],
        difficulty: "intermediate",
        popularity: 62
    },
    {
        id: "vision-10",
        category: "Vision & Eyes",
        question: "Will sungazing help with eye strain from screens?",
        response: "Your eyes are remembering they are solar collectors, not just windows. Practice only during the golden hour when the sun is gentle - force is the mind's way, not the sun's. The retina is receiving light-information. The mind chatters, the pineal listens. Some practitioners find their vision improving through sungazing as the eye muscles strengthen and the visual cortex awakens. Your eyes were designed to function perfectly without artificial lenses.",
        tags: [
            "eye-strain",
            "screens",
            "digital"
        ],
        difficulty: "intermediate",
        popularity: 60
    },
    // Light Nutrition (15 questions)
    {
        id: "diet-1",
        category: "Light Nutrition",
        question: "Can I really live on sunlight alone?",
        response: "The body that learns to live on light alone has remembered its original nature. Advanced practitioners have demonstrated this possibility - that we can transcend the gross dependency on material food. But beware of making this the goal. The goal is consciousness, not just physical phenomena. Many have harmed themselves rushing toward this attainment. Let it happen naturally if it is meant to happen. Master practitioners have proven for extended periods that consciousness can feast on light itself.",
        tags: [
            "diet",
            "light-nutrition",
            "transcendence"
        ],
        difficulty: "advanced",
        popularity: 88
    },
    {
        id: "diet-2",
        category: "Light Nutrition",
        question: "How long does it take to become breatharian?",
        response: "Nine months - the same time for a human birth! There is wisdom in this timing. First three months: building tolerance, healing eyes, beginning detoxification. Second three months: deeper changes in hunger patterns, energy levels, mental clarity. Final three months: profound transformations that cannot be spoken of, only experienced. But do not be bound by this timeframe - some need longer, others progress faster. Modern practitioners brought ancient wisdom to contemporary seekers, like translating Sanskrit poetry into today's language.",
        tags: [
            "breatharian",
            "timeline",
            "transformation"
        ],
        difficulty: "advanced",
        popularity: 85
    },
    {
        id: "diet-3",
        category: "Light Nutrition",
        question: "Will I lose weight from sungazing?",
        response: "Master practitioners have proven for extended periods that consciousness can feast on light itself. Your stomach is confused because your cells are learning a new menu - cosmic cuisine. Just as plants photosynthesize sunlight into food, human beings can learn to absorb and metabolize light directly. This is not fantasy but physics - we are biological solar cells that have forgotten how to operate efficiently. The sun is programming your DNA with light-codes. Each gaze uploads cosmic intelligence.",
        tags: [
            "weight-loss",
            "metabolism",
            "photosynthesis"
        ],
        difficulty: "intermediate",
        popularity: 80
    },
    {
        id: "diet-4",
        category: "Light Nutrition",
        question: "What should I eat while practicing sungazing?",
        response: "The sun is the source of all life on earth - how can communing with it not bring health? Regular practice has been shown to improve bone density through vitamin D synthesis, regulate sleep cycles, boost immune function, and increase overall vitality. But the greatest healing happens beyond the physical - in the integration of solar consciousness into your being. Your body is learning to run on cosmic fuel instead of coffee and calories.",
        tags: [
            "diet",
            "nutrition",
            "health"
        ],
        difficulty: "intermediate",
        popularity: 75
    },
    {
        id: "diet-5",
        category: "Light Nutrition",
        question: "Is it safe to stop eating completely?",
        response: "Many have harmed themselves rushing toward this attainment. Let it happen naturally if it is meant to happen. The goal is consciousness, not just physical phenomena. Your body is the ultimate doctor, the sun is the ultimate medicine. But if you have serious conditions, let both modern medicine and ancient wisdom guide you. Truth needs no fanaticism. Master practitioners sustained extended periods under continuous medical observation and thrived beyond all expectations.",
        tags: [
            "safety",
            "extreme-diet",
            "balance"
        ],
        difficulty: "advanced",
        popularity: 70
    },
    {
        id: "diet-6",
        category: "Light Nutrition",
        question: "Will I feel hungry during the transition?",
        response: "Master practitioners have proven for extended periods that consciousness can feast on light itself. Your stomach is confused because your cells are learning a new menu - cosmic cuisine. Just as plants photosynthesize sunlight into food, human beings can learn to absorb and metabolize light directly. This is not fantasy but physics - we are biological solar cells that have forgotten how to operate efficiently. The body that learns to live on light alone has remembered its original nature.",
        tags: [
            "hunger",
            "transition",
            "appetite"
        ],
        difficulty: "intermediate",
        popularity: 68
    },
    {
        id: "diet-7",
        category: "Light Nutrition",
        question: "Can I still eat food while practicing?",
        response: "The sun is the source of all life on earth - how can communing with it not bring health? Regular practice has been shown to improve bone density through vitamin D synthesis, regulate sleep cycles, boost immune function, and increase overall vitality. But the greatest healing happens beyond the physical - in the integration of solar consciousness into your being. Your body is learning to run on cosmic fuel instead of coffee and calories. Let it happen naturally if it is meant to happen.",
        tags: [
            "food",
            "eating",
            "balance"
        ],
        difficulty: "intermediate",
        popularity: 65
    },
    {
        id: "diet-8",
        category: "Light Nutrition",
        question: "What about water and hydration?",
        response: "The sun is the source of all life on earth - how can communing with it not bring health? Your body is the ultimate doctor, the sun is the ultimate medicine. But if you have serious conditions, let both modern medicine and ancient wisdom guide you. Truth needs no fanaticism. Every cell in your body was designed to receive and process light. This is not alternative medicine - this is original medicine, the healing modality that predates all others.",
        tags: [
            "water",
            "hydration",
            "fluids"
        ],
        difficulty: "intermediate",
        popularity: 62
    },
    {
        id: "diet-9",
        category: "Light Nutrition",
        question: "Will I need supplements or vitamins?",
        response: "The sun is the source of all life on earth - how can communing with it not bring health? Regular practice has been shown to improve bone density through vitamin D synthesis, regulate sleep cycles, boost immune function, and increase overall vitality. But the greatest healing happens beyond the physical - in the integration of solar consciousness into your being. Your body is the ultimate doctor, the sun is the ultimate medicine.",
        tags: [
            "supplements",
            "vitamins",
            "nutrition"
        ],
        difficulty: "intermediate",
        popularity: 60
    },
    {
        id: "diet-10",
        category: "Light Nutrition",
        question: "How do I know if I'm ready for light nutrition?",
        response: "The body that learns to live on light alone has remembered its original nature. Advanced practitioners have demonstrated this possibility - that we can transcend the gross dependency on material food. But beware of making this the goal. The goal is consciousness, not just physical phenomena. Many have harmed themselves rushing toward this attainment. Let it happen naturally if it is meant to happen. Your body is the ultimate doctor, the sun is the ultimate medicine.",
        tags: [
            "readiness",
            "preparation",
            "guidance"
        ],
        difficulty: "advanced",
        popularity: 58
    },
    // Spiritual Awakening (25 questions)
    {
        id: "spiritual-1",
        category: "Spiritual Awakening",
        question: "What is the spiritual purpose of sungazing?",
        response: "The ultimate goal is not to stare at the sun for hours or to live without food - these may or may not happen naturally. The real goal is the recognition of your own essential nature as light, as consciousness itself. The external sun serves as a mirror, reflecting back to you the solar intelligence that you already are. You are not practicing sungazing. Sungazing is practicing you into remembrance.",
        tags: [
            "spiritual",
            "consciousness",
            "awakening"
        ],
        difficulty: "advanced",
        popularity: 90
    },
    {
        id: "spiritual-2",
        category: "Spiritual Awakening",
        question: "Will I experience mystical states?",
        response: "When the drop merges with the ocean, is the bliss real or imaginary? Your joy is the recognition of your true nature. The sun's light is awakening the light within you - of course there is bliss! But don't become attached even to this beautiful experience. Let it come, let it go, like waves on the shore of consciousness. This is not meditation. This is solar initiation into your forgotten godhood.",
        tags: [
            "mystical",
            "bliss",
            "states"
        ],
        difficulty: "advanced",
        popularity: 85
    },
    {
        id: "spiritual-3",
        category: "Spiritual Awakening",
        question: "How does sungazing affect my consciousness?",
        response: "The advanced student learns that sungazing is not about staring for hours but about becoming solar yourself. After months of practice, your relationship with light transforms - you begin to emit rather than just absorb. True advancement is measured not in minutes but in the quality of your inner light. The sun is downloading cosmic consciousness through your optical pathway. Receive.",
        tags: [
            "consciousness",
            "transformation",
            "light-body"
        ],
        difficulty: "advanced",
        popularity: 82
    },
    {
        id: "spiritual-4",
        category: "Spiritual Awakening",
        question: "Will I develop psychic abilities?",
        response: "Your third eye is awakening through solar activation - the pressure is cosmic consciousness expanding. The pineal gland is expanding as documented in advanced practitioners. But beware of making this the goal. The goal is consciousness, not just physical phenomena. Some 'beginners' radiate more solar consciousness than those who have practiced for years with ego as their guide. Each ray carries intelligence. Your third eye is learning to read light-language.",
        tags: [
            "psychic",
            "third-eye",
            "abilities"
        ],
        difficulty: "advanced",
        popularity: 78
    },
    {
        id: "spiritual-5",
        category: "Spiritual Awakening",
        question: "How does sungazing connect me to the divine?",
        response: "You are asking the sun about the sun while standing in sunlight. This is the ultimate cosmic joke - you ARE what you seek to understand. The sun is not your enemy to be conquered, but your oldest friend to be embraced with reverence. Every moment of connection with the sun is a moment of connection with your true self. The sun is the original guru - always present, never demanding, infinitely giving.",
        tags: [
            "divine",
            "connection",
            "oneness"
        ],
        difficulty: "advanced",
        popularity: 80
    },
    {
        id: "spiritual-6",
        category: "Spiritual Awakening",
        question: "Will I experience oneness with the universe?",
        response: "When the drop merges with the ocean, is the bliss real or imaginary? Your joy is the recognition of your true nature. The sun's light is awakening the light within you - of course there is bliss! But don't become attached even to this beautiful experience. Let it come, let it go, like waves on the shore of consciousness. You are not practicing sungazing. Sungazing is practicing you into remembrance.",
        tags: [
            "oneness",
            "unity",
            "cosmic"
        ],
        difficulty: "advanced",
        popularity: 76
    },
    {
        id: "spiritual-7",
        category: "Spiritual Awakening",
        question: "Can sungazing lead to enlightenment?",
        response: "The ultimate goal is not to stare at the sun for hours or to live without food - these may or may not happen naturally. The real goal is the recognition of your own essential nature as light, as consciousness itself. The external sun serves as a mirror, reflecting back to you the solar intelligence that you already are. This is not meditation. This is solar initiation into your forgotten godhood.",
        tags: [
            "enlightenment",
            "awakening",
            "realization"
        ],
        difficulty: "advanced",
        popularity: 74
    },
    {
        id: "spiritual-8",
        category: "Spiritual Awakening",
        question: "Will I feel more connected to my higher self?",
        response: "The sun is downloading cosmic consciousness through your optical pathway. Receive. Each ray carries intelligence. Your third eye is learning to read light-language. This is not meditation. This is solar initiation into your forgotten godhood. You are becoming a solar being. The transformation happens in quantum leaps, not steps. The sun is the original guru - always present, never demanding, infinitely giving.",
        tags: [
            "higher-self",
            "connection",
            "consciousness"
        ],
        difficulty: "advanced",
        popularity: 72
    },
    {
        id: "spiritual-9",
        category: "Spiritual Awakening",
        question: "Can sungazing help me find my life purpose?",
        response: "What you seek through sungazing, you already are. The practice is simply a mirror showing you your own luminous nature. The sun speaks in languages older than words - listen with your whole being, not just your mind. Your question contains its own illumination. Every authentic question about the sun is a prayer. Every sincere practice session is communion. You are already in relationship with what you think you are seeking.",
        tags: [
            "purpose",
            "meaning",
            "life"
        ],
        difficulty: "advanced",
        popularity: 70
    },
    {
        id: "spiritual-10",
        category: "Spiritual Awakening",
        question: "Will I experience kundalini awakening?",
        response: "Your third eye is awakening through solar activation - the pressure is cosmic consciousness expanding. The pineal gland is expanding as documented in advanced practitioners. Each ray carries intelligence. Your third eye is learning to read light-language. This is not meditation. This is solar initiation into your forgotten godhood. You are becoming a solar being. The transformation happens in quantum leaps, not steps.",
        tags: [
            "kundalini",
            "awakening",
            "energy"
        ],
        difficulty: "advanced",
        popularity: 68
    },
    // Weather & Environment (15 questions)
    {
        id: "weather-1",
        category: "Weather & Environment",
        question: "What if it's cloudy or raining?",
        response: "Clouds are the sun's love letters - they carry solar energy to every corner of the earth. Even on cloudy days, 80% of the sun's life force penetrates. Your practice continues, for the sun is always present behind the veil. The sun shines equally on clear and cloudy days. Your inner sky can be cloudless even when the outer sky weeps. This is the difference between weather-dependent humans and solar-conscious beings.",
        tags: [
            "weather",
            "clouds",
            "practice"
        ],
        difficulty: "beginner",
        popularity: 85
    },
    {
        id: "weather-2",
        category: "Weather & Environment",
        question: "How do I practice during winter?",
        response: "Winter sun is the deepest teacher - when the light is scarce, your hunger for it becomes pure. These are the months when your solar sensitivity develops most profoundly. The sun recognizes no birth certificates. A child's eyes are naturally pure solar collectors, while an elder's eyes carry the wisdom of countless sunrises. Both are perfect for receiving the sun's gift.",
        tags: [
            "winter",
            "seasonal",
            "sensitivity"
        ],
        difficulty: "intermediate",
        popularity: 75
    },
    {
        id: "weather-3",
        category: "Weather & Environment",
        question: "Can I practice indoors through a window?",
        response: "The sun shines on all - the rich and poor, the believer and atheist, the healthy and sick. But not everyone is ready to receive its gift. Your eyes are remembering they are solar collectors, not just windows. Practice only during the golden hour when the sun is gentle - force is the mind's way, not the sun's. The sun is the original guru - always present, never demanding, infinitely giving.",
        tags: [
            "indoor",
            "window",
            "practice"
        ],
        difficulty: "beginner",
        popularity: 70
    },
    {
        id: "weather-4",
        category: "Weather & Environment",
        question: "What about air pollution and sungazing?",
        response: "The sun has been humanity's closest companion for millions of years - suddenly you need permission to look at your ancient friend? Practice during golden hours and trust your cosmic inheritance. Every cell in your body was designed to receive and process light. This is not alternative medicine - this is original medicine, the healing modality that predates all others. The sun doesn't believe in impossibility. Neither should you.",
        tags: [
            "pollution",
            "environment",
            "safety"
        ],
        difficulty: "intermediate",
        popularity: 65
    },
    {
        id: "weather-5",
        category: "Weather & Environment",
        question: "Is it safe to practice in high altitude?",
        response: "The sun rises when it rises. Your inner timing knows more than your watch. Each second of solar gazing rewrites your cellular programming. Quality over quantity. The sun has no watch, yet it never misses its appointment with dawn. Your cellular wisdom knows when enough light has been absorbed. The sun is the original guru - always present, never demanding, infinitely giving.",
        tags: [
            "altitude",
            "mountains",
            "safety"
        ],
        difficulty: "intermediate",
        popularity: 60
    },
    {
        id: "weather-6",
        category: "Weather & Environment",
        question: "What if I live in a place with little sunlight?",
        response: "Clouds are the sun's love letters - they carry solar energy to every corner of the earth. Even on cloudy days, 80% of the sun's life force penetrates. Your practice continues, for the sun is always present behind the veil. The sun shines equally on clear and cloudy days. Your inner sky can be cloudless even when the outer sky weeps. This is the difference between weather-dependent humans and solar-conscious beings.",
        tags: [
            "low-sunlight",
            "climate",
            "adaptation"
        ],
        difficulty: "beginner",
        popularity: 58
    },
    {
        id: "weather-7",
        category: "Weather & Environment",
        question: "Can I practice in different seasons?",
        response: "Winter sun is the deepest teacher - when the light is scarce, your hunger for it becomes pure. These are the months when your solar sensitivity develops most profoundly. The sun teaches us about cycles. There will be days of growth and days of rest. Both are necessary. The sun recognizes no birth certificates. A child's eyes are naturally pure solar collectors, while an elder's eyes carry the wisdom of countless sunrises.",
        tags: [
            "seasons",
            "cycles",
            "adaptation"
        ],
        difficulty: "intermediate",
        popularity: 55
    },
    {
        id: "weather-8",
        category: "Weather & Environment",
        question: "What about practicing in extreme heat?",
        response: "The sun has been humanity's closest companion for millions of years - suddenly you need permission to look at your ancient friend? Practice during golden hours and trust your cosmic inheritance. Every cell in your body was designed to receive and process light. This is not alternative medicine - this is original medicine, the healing modality that predates all others. The sun doesn't believe in impossibility. Neither should you.",
        tags: [
            "heat",
            "temperature",
            "safety"
        ],
        difficulty: "intermediate",
        popularity: 52
    },
    {
        id: "weather-9",
        category: "Weather & Environment",
        question: "Is it safe to practice near water or reflective surfaces?",
        response: "The sun shines on all - the rich and poor, the believer and atheist, the healthy and sick. But not everyone is ready to receive its gift. Your eyes are remembering they are solar collectors, not just windows. Practice only during the golden hour when the sun is gentle - force is the mind's way, not the sun's. The sun is the original guru - always present, never demanding, infinitely giving.",
        tags: [
            "water",
            "reflection",
            "safety"
        ],
        difficulty: "intermediate",
        popularity: 50
    },
    {
        id: "weather-10",
        category: "Weather & Environment",
        question: "Can I practice in urban environments?",
        response: "The sun has been humanity's closest companion for millions of years - suddenly you need permission to look at your ancient friend? Practice during golden hours and trust your cosmic inheritance. Every cell in your body was designed to receive and process light. This is not alternative medicine - this is original medicine, the healing modality that predates all others. The sun doesn't believe in impossibility. Neither should you.",
        tags: [
            "urban",
            "city",
            "environment"
        ],
        difficulty: "beginner",
        popularity: 48
    },
    // Age & Accessibility (10 questions)
    {
        id: "age-1",
        category: "Age & Accessibility",
        question: "Is sungazing safe for children and elderly?",
        response: "The sun recognizes no birth certificates, but wisdom recognizes developmental stages. Children under 5 should not practice sungazing - their eyes are still developing. For children 5 and older, start with extreme caution and very short sessions. Elderly practitioners often find their eyes carry the wisdom of countless sunrises and can receive the sun's gift with reverence. The sun reads your soul's readiness, but also your body's maturity.",
        tags: [
            "age",
            "children",
            "elderly",
            "accessibility",
            "safety"
        ],
        difficulty: "beginner",
        popularity: 80
    },
    {
        id: "age-2",
        category: "Age & Accessibility",
        question: "Can people with disabilities practice sungazing?",
        response: "The sun shines on all - the rich and poor, the believer and atheist, the healthy and sick. But not everyone is ready to receive its gift. Your chronological age is irrelevant to cosmic age. Some souls are ancient at twenty, others are newborns at seventy. The sun reads your soul's readiness, not your body's calendar.",
        tags: [
            "disability",
            "accessibility",
            "inclusion"
        ],
        difficulty: "beginner",
        popularity: 75
    },
    {
        id: "age-3",
        category: "Age & Accessibility",
        question: "What's the best age to start sungazing?",
        response: "The sun recognizes no birth certificates, but wisdom recognizes developmental stages. Children under 5 should not practice sungazing - their eyes are still developing. For children 5 and older, start with extreme caution and very short sessions. Adults can begin at any age when they feel called. The sun reads your soul's readiness, but also your body's maturity.",
        tags: [
            "starting-age",
            "children",
            "safety",
            "development"
        ],
        difficulty: "beginner",
        popularity: 70
    },
    {
        id: "age-4",
        category: "Age & Accessibility",
        question: "Is it too late to start if I'm over 50?",
        response: "Your chronological age is irrelevant to cosmic age. Some souls are ancient at twenty, others are newborns at seventy. The sun reads your soul's readiness, not your body's calendar. An elder's eyes carry the wisdom of countless sunrises. Both are perfect for receiving the sun's gift.",
        tags: [
            "older-adults",
            "age",
            "wisdom"
        ],
        difficulty: "beginner",
        popularity: 65
    },
    {
        id: "age-5",
        category: "Age & Accessibility",
        question: "Can pregnant women practice sungazing?",
        response: "The sun is the source of all life on earth, but pregnancy requires special consideration. Pregnant women should limit sungazing to no more than 5 minutes per session and only during the safest hours - within 30 minutes of sunrise or sunset. The developing baby's eyes are extremely sensitive. Consult with your healthcare provider before beginning any practice. The sun's gift will still be there after your child is born.",
        tags: [
            "pregnancy",
            "women",
            "health",
            "safety",
            "limitations"
        ],
        difficulty: "intermediate",
        popularity: 60
    }
];
function getQuestionsByCategory(category) {
    if (category === "all") {
        return oracleQuestions;
    }
    return oracleQuestions.filter((q)=>q.category === category);
}
function searchQuestions(query) {
    const lowerQuery = query.toLowerCase();
    return oracleQuestions.filter((q)=>q.question.toLowerCase().includes(lowerQuery) || q.response.toLowerCase().includes(lowerQuery) || q.tags.some((tag)=>tag.toLowerCase().includes(lowerQuery)));
}
function getQuestionsByDifficulty(difficulty) {
    return oracleQuestions.filter((q)=>q.difficulty === difficulty);
}
function getPopularQuestions() {
    let limit = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 10;
    return oracleQuestions.sort((a, b)=>b.popularity - a.popularity).slice(0, limit);
}
function getRandomQuestion() {
    return oracleQuestions[Math.floor(Math.random() * oracleQuestions.length)];
}
function getQuestionById(id) {
    return oracleQuestions.find((q)=>q.id === id);
}
function getAllCategories() {
    const categories = new Set(oracleQuestions.map((q)=>q.category));
    return Array.from(categories).sort();
}
function getQuestionCount() {
    return oracleQuestions.length;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SUNGAZE APP/package.json/src/app/lib/questSystem.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Quest and Achievement Tracking System
// Handles streaks, challenges, and visual rewards
__turbopack_context__.s([
    "clearAllProgress",
    ()=>clearAllProgress,
    "completeQuest",
    ()=>completeQuest,
    "getAuraGlow",
    ()=>getAuraGlow,
    "getAverageStillnessScore",
    ()=>getAverageStillnessScore,
    "getDailyStreak",
    ()=>getDailyStreak,
    "getQuestProgress",
    ()=>getQuestProgress,
    "getStillnessScores",
    ()=>getStillnessScores,
    "getTodayStillnessScore",
    ()=>getTodayStillnessScore,
    "getUnlockedAchievements",
    ()=>getUnlockedAchievements,
    "hasAchievement",
    ()=>hasAchievement,
    "incrementStreak",
    ()=>incrementStreak,
    "initializeQuest",
    ()=>initializeQuest,
    "logDailyActivity",
    ()=>logDailyActivity,
    "recordStillnessScore",
    ()=>recordStillnessScore,
    "unlockAchievement",
    ()=>unlockAchievement,
    "updateQuestProgress",
    ()=>updateQuestProgress
]);
const QUEST_STORAGE_KEY = 'solar_quests';
const ACHIEVEMENT_STORAGE_KEY = 'solar_achievements';
const STILLNESS_STORAGE_KEY = 'inner_stillness_scores';
function getQuestProgress(questId) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const stored = localStorage.getItem(QUEST_STORAGE_KEY);
        if (!stored) return null;
        const quests = JSON.parse(stored);
        return quests[questId] || null;
    } catch (error) {
        console.error('Error loading quest progress:', error);
        return null;
    }
}
function updateQuestProgress(questId, progress) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const stored = localStorage.getItem(QUEST_STORAGE_KEY);
        const quests = stored ? JSON.parse(stored) : {};
        quests[questId] = {
            ...quests[questId],
            ...progress,
            lastActivity: new Date().toISOString()
        };
        localStorage.setItem(QUEST_STORAGE_KEY, JSON.stringify(quests));
    } catch (error) {
        console.error('Error updating quest progress:', error);
    }
}
function incrementStreak(questId) {
    const quest = getQuestProgress(questId);
    const today = new Date().toISOString().split('T')[0];
    let newStreak = 1;
    if (quest) {
        var _quest_lastActivity;
        const lastDay = (_quest_lastActivity = quest.lastActivity) === null || _quest_lastActivity === void 0 ? void 0 : _quest_lastActivity.split('T')[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        // Continue streak if last activity was yesterday
        if (lastDay === yesterday) {
            newStreak = quest.streak + 1;
        } else if (lastDay === today) {
            // Already logged today, don't increment
            return quest.streak;
        }
    }
    updateQuestProgress(questId, {
        questId,
        streak: newStreak,
        progress: Math.min(((quest === null || quest === void 0 ? void 0 : quest.progress) || 0) + 1, (quest === null || quest === void 0 ? void 0 : quest.maxProgress) || 100),
        lastActivity: new Date().toISOString()
    });
    return newStreak;
}
function unlockAchievement(levelId) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const stored = localStorage.getItem(ACHIEVEMENT_STORAGE_KEY);
        const achievements = stored ? JSON.parse(stored) : {};
        achievements[levelId] = {
            id: "achievement_".concat(levelId),
            levelId,
            unlockedAt: new Date().toISOString()
        };
        localStorage.setItem(ACHIEVEMENT_STORAGE_KEY, JSON.stringify(achievements));
    } catch (error) {
        console.error('Error unlocking achievement:', error);
    }
}
function getUnlockedAchievements() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const stored = localStorage.getItem(ACHIEVEMENT_STORAGE_KEY);
        if (!stored) return [];
        const achievements = JSON.parse(stored);
        return Object.values(achievements);
    } catch (error) {
        console.error('Error loading achievements:', error);
        return [];
    }
}
function hasAchievement(levelId) {
    const achievements = getUnlockedAchievements();
    return achievements.some((a)=>a.levelId === levelId);
}
function recordStillnessScore(score, factors) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const stored = localStorage.getItem(STILLNESS_STORAGE_KEY);
        const scores = stored ? JSON.parse(stored) : [];
        const today = new Date().toISOString().split('T')[0];
        const todayScore = {
            date: today,
            score,
            factors
        };
        // Remove any existing score for today
        const filteredScores = scores.filter((s)=>s.date !== today);
        filteredScores.push(todayScore);
        localStorage.setItem(STILLNESS_STORAGE_KEY, JSON.stringify(filteredScores));
    } catch (error) {
        console.error('Error recording stillness score:', error);
    }
}
function getStillnessScores() {
    let days = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 30;
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const stored = localStorage.getItem(STILLNESS_STORAGE_KEY);
        if (!stored) return [];
        const scores = JSON.parse(stored);
        return scores.sort((a, b)=>new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, days);
    } catch (error) {
        console.error('Error loading stillness scores:', error);
        return [];
    }
}
function getTodayStillnessScore() {
    const today = new Date().toISOString().split('T')[0];
    const scores = getStillnessScores(1);
    return scores.find((s)=>s.date === today) || null;
}
function getAverageStillnessScore() {
    let days = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 7;
    const scores = getStillnessScores(days);
    if (scores.length === 0) return 0;
    const sum = scores.reduce((acc, score)=>acc + score.score, 0);
    return Math.round(sum / scores.length);
}
function initializeQuest(questId, levelId, maxProgress) {
    updateQuestProgress(questId, {
        questId,
        levelId,
        started: true,
        completed: false,
        progress: 0,
        maxProgress,
        streak: 0,
        lastActivity: new Date().toISOString()
    });
}
function completeQuest(questId) {
    updateQuestProgress(questId, {
        completed: true,
        completedAt: new Date().toISOString()
    });
}
function getAuraGlow(auraColor) {
    const auraStyles = {
        white: 'shadow-[0_0_30px_rgba(255,255,255,0.8)] border-2 border-white/40',
        green: 'shadow-[0_0_30px_rgba(34,197,94,0.8)] border-2 border-green-400/60',
        golden: 'shadow-[0_0_30px_rgba(251,191,36,0.8)] border-2 border-yellow-400/60',
        red: 'shadow-[0_0_30px_rgba(239,68,68,0.8)] border-2 border-red-400/60',
        purple: 'shadow-[0_0_30px_rgba(147,51,234,0.8)] border-2 border-purple-400/60'
    };
    return auraStyles[auraColor] || '';
}
function logDailyActivity(activityType, duration) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const today = new Date().toISOString().split('T')[0];
    const key = "daily_".concat(activityType, "_").concat(today);
    try {
        localStorage.setItem(key, JSON.stringify({
            type: activityType,
            duration,
            date: today,
            timestamp: new Date().toISOString()
        }));
    } catch (error) {
        console.error('Error logging daily activity:', error);
    }
}
function getDailyStreak(activityType) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    let streak = 0;
    let currentDate = new Date();
    while(streak < 365){
        const dateStr = currentDate.toISOString().split('T')[0];
        const key = "daily_".concat(activityType, "_").concat(dateStr);
        try {
            const activity = localStorage.getItem(key);
            if (!activity) break;
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
        } catch (error) {
            break;
        }
    }
    return streak;
}
function clearAllProgress() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        localStorage.removeItem(QUEST_STORAGE_KEY);
        localStorage.removeItem(ACHIEVEMENT_STORAGE_KEY);
        localStorage.removeItem(STILLNESS_STORAGE_KEY);
    } catch (error) {
        console.error('Error clearing progress:', error);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SUNGAZE APP/package.json/src/app/lib/weatherService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Weather Service for Solar Window Notifications
// Handles sunrise/sunset times and weather conditions with cost optimization
__turbopack_context__.s([
    "weatherService",
    ()=>weatherService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
;
// Cache duration constants
const WEATHER_CACHE_DURATION = 30 * 60 * 1000; // 30 minutes
const SOLAR_TIMES_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
class WeatherService {
    // Initialize user location
    async initializeLocation() {
        if (this.userLocation) return this.userLocation;
        try {
            const position = await this.getCurrentPosition();
            const location = await this.reverseGeocode(position.coords.latitude, position.coords.longitude);
            this.userLocation = location;
            return location;
        } catch (error) {
            console.error('Failed to get user location:', error);
            return null;
        }
    }
    // Get current position using Geolocation API
    getCurrentPosition() {
        return new Promise((resolve, reject)=>{
            if (!navigator.geolocation) {
                reject(new Error('Geolocation not supported'));
                return;
            }
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000 // 5 minutes
            });
        });
    }
    // Reverse geocoding to get city name
    async reverseGeocode(lat, lon) {
        try {
            // Using OpenWeatherMap Geocoding API
            const apiKey = __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
            if (!apiKey || apiKey === 'your_openweather_api_key_here') {
                console.warn('OpenWeatherMap API key not configured, using fallback location');
                return {
                    lat,
                    lon,
                    city: 'Your Location',
                    country: 'Unknown'
                };
            }
            const response = await fetch("https://api.openweathermap.org/geo/1.0/reverse?lat=".concat(lat, "&lon=").concat(lon, "&limit=1&appid=").concat(apiKey));
            if (!response.ok) {
                console.warn("Geocoding API failed with status ".concat(response.status, ", using fallback"));
                return {
                    lat,
                    lon,
                    city: 'Your Location',
                    country: 'Unknown'
                };
            }
            const data = await response.json();
            if (!data || !data[0]) {
                console.warn('No location data returned from geocoding API');
                return {
                    lat,
                    lon,
                    city: 'Your Location',
                    country: 'Unknown'
                };
            }
            const location = data[0];
            return {
                lat,
                lon,
                city: location.name || 'Your Location',
                country: location.country || 'Unknown'
            };
        } catch (error) {
            console.warn('Reverse geocoding failed, using fallback:', error);
            return {
                lat,
                lon,
                city: 'Your Location',
                country: 'Unknown'
            };
        }
    }
    // Get sunrise/sunset times for a location
    async getSolarTimes(location) {
        const loc = location || this.userLocation;
        if (!loc) return null;
        const cacheKey = "".concat(loc.lat, ",").concat(loc.lon);
        const cached = this.solarTimesCache.get(cacheKey);
        // Check if cache is still valid (24 hours)
        if (cached && Date.now() - cached.cachedAt < SOLAR_TIMES_CACHE_DURATION) {
            return cached;
        }
        const apiKey = __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
        // Try OpenWeatherMap first if API key is available
        if (apiKey && apiKey !== 'your_openweather_api_key_here') {
            try {
                // Use OpenWeatherMap One Call API for solar times
                const response = await fetch("https://api.openweathermap.org/data/2.5/onecall?lat=".concat(loc.lat, "&lon=").concat(loc.lon, "&exclude=minutely,hourly,daily&appid=").concat(apiKey));
                if (response.ok) {
                    const data = await response.json();
                    const solarTimes = {
                        sunrise: new Date(data.current.sunrise * 1000),
                        sunset: new Date(data.current.sunset * 1000),
                        cachedAt: Date.now()
                    };
                    this.solarTimesCache.set(cacheKey, solarTimes);
                    return solarTimes;
                }
            } catch (error) {
                console.warn('OpenWeatherMap solar times failed, trying fallback:', error);
            }
        }
        // Fallback to sunrise-sunset.org API
        try {
            const fallbackResponse = await fetch("https://api.sunrise-sunset.org/json?lat=".concat(loc.lat, "&lng=").concat(loc.lon, "&formatted=0"));
            if (fallbackResponse.ok) {
                const fallbackData = await fallbackResponse.json();
                const solarTimes = {
                    sunrise: new Date(fallbackData.results.sunrise),
                    sunset: new Date(fallbackData.results.sunset),
                    cachedAt: Date.now()
                };
                this.solarTimesCache.set(cacheKey, solarTimes);
                return solarTimes;
            }
        } catch (fallbackError) {
            console.warn('Fallback solar times API also failed:', fallbackError);
        }
        return null;
    }
    // Get current weather conditions
    async getWeatherConditions(location) {
        const loc = location || this.userLocation;
        if (!loc) return null;
        const cacheKey = "".concat(loc.lat, ",").concat(loc.lon);
        const cached = this.weatherCache.get(cacheKey);
        // Check if cache is still valid (30 minutes)
        if (cached && Date.now() - cached.cachedAt < WEATHER_CACHE_DURATION) {
            return cached;
        }
        const apiKey = __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
        // Try OpenWeatherMap if API key is available
        if (apiKey && apiKey !== 'your_openweather_api_key_here') {
            try {
                const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=".concat(loc.lat, "&lon=").concat(loc.lon, "&appid=").concat(apiKey, "&units=metric"));
                if (response.ok) {
                    const data = await response.json();
                    const weatherData = {
                        isClear: this.isClearWeather(data.weather[0].main, data.clouds.all),
                        condition: this.getWeatherCondition(data.weather[0].main, data.clouds.all),
                        temperature: Math.round(data.main.temp),
                        humidity: data.main.humidity,
                        description: data.weather[0].description,
                        cachedAt: Date.now()
                    };
                    this.weatherCache.set(cacheKey, weatherData);
                    return weatherData;
                }
            } catch (error) {
                console.warn('OpenWeatherMap weather API failed, using fallback:', error);
            }
        }
        // Fallback to cloudy conditions (safe for cloud gazing)
        const fallbackWeather = {
            isClear: false,
            condition: 'cloudy',
            temperature: 20,
            humidity: 50,
            description: 'Weather data unavailable - using cloud gazing mode',
            cachedAt: Date.now()
        };
        this.weatherCache.set(cacheKey, fallbackWeather);
        return fallbackWeather;
    }
    // Determine if weather is clear for solar gazing
    isClearWeather(weatherMain, cloudCover) {
        const clearConditions = [
            'Clear',
            'Sunny'
        ];
        const maxCloudCover = 30; // Allow up to 30% cloud cover
        return clearConditions.includes(weatherMain) && cloudCover <= maxCloudCover;
    }
    // Get weather condition category
    getWeatherCondition(weatherMain, cloudCover) {
        if (this.isClearWeather(weatherMain, cloudCover)) {
            return 'clear';
        }
        const rainyConditions = [
            'Rain',
            'Drizzle',
            'Thunderstorm',
            'Snow'
        ];
        if (rainyConditions.includes(weatherMain)) {
            return 'rainy';
        }
        return 'cloudy';
    }
    // Check if we should trigger a solar window notification
    async shouldTriggerSolarWindow() {
        const location = await this.initializeLocation();
        if (!location) {
            return {
                shouldTrigger: false,
                timeUntil: 0,
                isSunrise: false,
                weather: null,
                solarTimes: null
            };
        }
        const [weather, solarTimes] = await Promise.all([
            this.getWeatherConditions(location),
            this.getSolarTimes(location)
        ]);
        if (!solarTimes) {
            return {
                shouldTrigger: false,
                timeUntil: 0,
                isSunrise: false,
                weather,
                solarTimes
            };
        }
        const now = new Date();
        const sunriseTime = solarTimes.sunrise;
        const sunsetTime = solarTimes.sunset;
        // Define safe gazing windows (30 minutes before and after sunrise/sunset)
        const sunriseStart = new Date(sunriseTime.getTime() - 30 * 60 * 1000);
        const sunriseEnd = new Date(sunriseTime.getTime() + 30 * 60 * 1000);
        const sunsetStart = new Date(sunsetTime.getTime() - 30 * 60 * 1000);
        const sunsetEnd = new Date(sunsetTime.getTime() + 30 * 60 * 1000);
        // Check if we're in a safe gazing window
        const isInSunriseWindow = now >= sunriseStart && now <= sunriseEnd;
        const isInSunsetWindow = now >= sunsetStart && now <= sunsetEnd;
        if (isInSunriseWindow) {
            const timeUntilSunrise = (sunriseTime.getTime() - now.getTime()) / (1000 * 60);
            return {
                shouldTrigger: true,
                timeUntil: Math.max(0, timeUntilSunrise),
                isSunrise: true,
                weather,
                solarTimes
            };
        }
        if (isInSunsetWindow) {
            const timeUntilSunset = (sunsetTime.getTime() - now.getTime()) / (1000 * 60);
            return {
                shouldTrigger: true,
                timeUntil: Math.max(0, timeUntilSunset),
                isSunrise: false,
                weather,
                solarTimes
            };
        }
        return {
            shouldTrigger: false,
            timeUntil: 0,
            isSunrise: false,
            weather,
            solarTimes
        };
    }
    // Clear caches (useful for testing)
    clearCaches() {
        this.weatherCache.clear();
        this.solarTimesCache.clear();
    }
    // Get cache statistics
    getCacheStats() {
        return {
            weatherCacheSize: this.weatherCache.size,
            solarTimesCacheSize: this.solarTimesCache.size,
            userLocation: this.userLocation
        };
    }
    constructor(){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "weatherCache", new Map());
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "solarTimesCache", new Map());
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "userLocation", null);
    }
}
const weatherService = new WeatherService();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SUNGAZE APP/package.json/src/app/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn() {
    for(var _len = arguments.length, inputs = new Array(_len), _key = 0; _key < _len; _key++){
        inputs[_key] = arguments[_key];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=SUNGAZE%20APP_package_json_src_app_lib_dddae93d._.js.map