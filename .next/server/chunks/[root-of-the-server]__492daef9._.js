module.exports = [
"[project]/SUNGAZE APP/package.json/.next-internal/server/app/api/founders/stats/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[project]/SUNGAZE APP/package.json/src/app/lib/founder-tracker.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Founder tracking system for accurate counts and founder management
__turbopack_context__.s([
    "founderTracker",
    ()=>founderTracker
]);
class FounderTracker {
    founders = new Map();
    foundersByNumber = new Map();
    nextFounderNumber = 1;
    MAX_FOUNDERS = 444;
    constructor(){
        this.initializeFounders();
    }
    initializeFounders() {
        // Initialize with you as the first founder
        const firstFounder = {
            id: 'test-user-1',
            founderNumber: 1,
            email: 'test@sungaze.com',
            name: 'Founder #1',
            purchaseDate: new Date().toISOString(),
            region: 'us',
            status: 'active'
        };
        this.founders.set('test-user-1', firstFounder);
        this.foundersByNumber.set(1, firstFounder);
        this.nextFounderNumber = 2;
        console.log('Initialized founder system with Founder #1');
    }
    // Register a new founder (called after successful payment)
    async registerFounder(userId, email, paymentInfo) {
        // Check if already a founder
        if (this.founders.has(userId)) {
            const existing = this.founders.get(userId);
            return {
                success: true,
                founderNumber: existing.founderNumber
            };
        }
        // Check if we've reached the limit
        if (this.nextFounderNumber > this.MAX_FOUNDERS) {
            return {
                success: false,
                error: 'All 444 Founder spots have been claimed worldwide!'
            };
        }
        // Create new founder
        const founderNumber = this.nextFounderNumber;
        const newFounder = {
            id: userId,
            founderNumber,
            email,
            purchaseDate: new Date().toISOString(),
            region: paymentInfo.region || 'us',
            stripeCustomerId: paymentInfo.stripeCustomerId,
            stripePaymentId: paymentInfo.stripePaymentId,
            status: 'active'
        };
        // Store founder
        this.founders.set(userId, newFounder);
        this.foundersByNumber.set(founderNumber, newFounder);
        this.nextFounderNumber++;
        console.log(`New Founder #${founderNumber} registered:`, newFounder);
        // Save to persistent storage (in production, this would be a database)
        this.saveToStorage();
        return {
            success: true,
            founderNumber
        };
    }
    // Get founder info by user ID
    getFounder(userId) {
        return this.founders.get(userId) || null;
    }
    // Get founder by number
    getFounderByNumber(founderNumber) {
        return this.foundersByNumber.get(founderNumber) || null;
    }
    // Get current founder stats
    getFounderStats() {
        const totalClaimed = this.founders.size;
        const remaining = this.MAX_FOUNDERS - totalClaimed;
        return {
            totalClaimed,
            remaining: Math.max(0, remaining),
            maxFounders: this.MAX_FOUNDERS,
            nextFounderNumber: this.nextFounderNumber <= this.MAX_FOUNDERS ? this.nextFounderNumber : null,
            isFullySubscribed: totalClaimed >= this.MAX_FOUNDERS
        };
    }
    // Get all founders (for admin purposes)
    getAllFounders() {
        return Array.from(this.founders.values()).sort((a, b)=>a.founderNumber - b.founderNumber);
    }
    // Get founders with ritual emails (who can be contacted)
    getFoundersWithRitualEmails() {
        return this.getAllFounders().filter((f)=>f.ritualEmail && f.status === 'active');
    }
    // Update founder's ritual email
    updateFounderRitualEmail(userId, ritualEmail) {
        const founder = this.founders.get(userId);
        if (founder) {
            founder.ritualEmail = ritualEmail;
            this.saveToStorage();
            return true;
        }
        return false;
    }
    // Export founder data for admin
    exportFounderData() {
        const founders = this.getAllFounders();
        const stats = this.getFounderStats();
        return {
            summary: stats,
            founders: founders.map((f)=>({
                    founderNumber: f.founderNumber,
                    email: f.email,
                    ritualEmail: f.ritualEmail || 'Not provided',
                    purchaseDate: f.purchaseDate,
                    region: f.region,
                    status: f.status
                }))
        };
    }
    // Save to localStorage (in production, use proper database)
    saveToStorage() {
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
    }
    // Load from localStorage (in production, load from database)
    loadFromStorage() {
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
    }
}
const founderTracker = new FounderTracker();
}),
"[project]/SUNGAZE APP/package.json/src/app/api/founders/stats/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$founder$2d$tracker$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/src/app/lib/founder-tracker.ts [app-route] (ecmascript)");
;
;
async function GET() {
    try {
        const stats = __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$founder$2d$tracker$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["founderTracker"].getFounderStats();
        return __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: {
                totalClaimed: stats.totalClaimed,
                remaining: stats.remaining,
                maxFounders: stats.maxFounders,
                isFullySubscribed: stats.isFullySubscribed,
                percentageClaimed: Math.round(stats.totalClaimed / stats.maxFounders * 100)
            }
        });
    } catch (error) {
        console.error('Error getting founder stats:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Failed to get founder stats'
        }, {
            status: 500
        });
    }
}
async function POST() {
    try {
        const exportData = __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$founder$2d$tracker$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["founderTracker"].exportFounderData();
        return __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: exportData
        });
    } catch (error) {
        console.error('Error exporting founder data:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Failed to export founder data'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__492daef9._.js.map