module.exports = [
"[project]/SUNGAZE APP/package.json/.next-internal/server/app/api/checkout/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

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
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[project]/SUNGAZE APP/package.json/src/app/api/checkout/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/stripe/esm/stripe.esm.node.js [app-route] (ecmascript)");
;
;
const stripe = new __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-08-27.basil'
});
async function POST(request) {
    try {
        const { priceId, userId, tier } = await request.json();
        if (!priceId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Price ID is required'
            }, {
                status: 400
            });
        }
        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            mode: tier === 'founder_444' ? 'payment' : 'subscription',
            payment_method_types: [
                'card'
            ],
            line_items: [
                {
                    price: priceId,
                    quantity: 1
                }
            ],
            success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/?success=true&tier=${tier}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/?canceled=true`,
            client_reference_id: userId,
            metadata: {
                userId,
                tier
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            sessionId: session.id,
            url: session.url
        });
    } catch (error) {
        console.error('Stripe error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message || 'Payment setup failed'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b6d62f2c._.js.map