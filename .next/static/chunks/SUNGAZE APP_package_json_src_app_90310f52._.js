(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingQuestions.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OnboardingQuestions",
    ()=>OnboardingQuestions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const questions = [
    {
        id: 'q1_interest',
        question: "What draws you to solar practices and light nutrition?",
        options: [
            "Scientific research on sungazing and photobiology",
            "Natural energy optimization without stimulants",
            "Ancient wisdom meets modern biohacking",
            "Complete mind-body transformation"
        ]
    },
    {
        id: 'q2_energy',
        question: "How would you describe your current energy levels?",
        options: [
            "Consistently low, rely on caffeine/stimulants",
            "Inconsistent - good days and crash days",
            "Decent but want optimization"
        ]
    },
    {
        id: 'q3_sleep',
        question: "How is your sleep quality?",
        options: [
            "Poor - trouble falling/staying asleep",
            "Average - wake up tired often",
            "Good but want optimization"
        ]
    },
    {
        id: 'q4_goal',
        question: "What's your main health optimization goal?",
        options: [
            "Unlimited natural energy throughout the day",
            "Better sleep and circadian rhythm balance",
            "Enhanced mental clarity and focus",
            "Overall vitality and life force"
        ]
    },
    {
        id: 'q5_experience',
        question: "What's your experience with alternative health practices?",
        options: [
            "Complete beginner - new to this world",
            "Some experience with meditation/yoga",
            "Experienced with biohacking/optimization"
        ]
    },
    {
        id: 'q6_time',
        question: "How much time can you dedicate to daily practice?",
        options: [
            "5-10 minutes maximum",
            "10-20 minutes consistently",
            "20+ minutes for serious results"
        ]
    },
    {
        id: 'q7_learning',
        question: "How do you prefer to learn new practices?",
        options: [
            "Step-by-step guided instructions",
            "Scientific explanations with practical application",
            "Ancient wisdom with modern context"
        ]
    },
    {
        id: 'q8_safety',
        question: "How important is safety guidance to you?",
        options: [
            "Extremely important - I want expert oversight",
            "Very important - need clear protocols",
            "Important but I'm naturally cautious"
        ]
    },
    {
        id: 'q9_transformation',
        question: "How ready are you for significant life changes?",
        options: [
            "Ready for gradual, sustainable changes",
            "Ready for profound transformation",
            "Excited but want to start carefully"
        ]
    },
    {
        id: 'q10_support',
        question: "What kind of support would help you most?",
        options: [
            "Daily reminders and progress tracking",
            "Community of like-minded practitioners",
            "Personal guidance and troubleshooting"
        ]
    },
    {
        id: 'q11_lifestyle',
        question: "How does this fit with your current lifestyle?",
        options: [
            "Looking to add to existing wellness routine",
            "Want to replace unhealthy habits",
            "Ready to restructure my entire approach"
        ]
    },
    {
        id: 'q12_investment',
        question: "How do you view investment in your health?",
        options: [
            "Willing to invest for proven results",
            "Prefer to start small and scale up",
            "Ready for premium, comprehensive programs"
        ]
    },
    {
        id: 'q13_motivation',
        question: "What motivates you most about this journey?",
        options: [
            "Becoming my highest potential self",
            "Healing and optimizing my body naturally",
            "Exploring expanded consciousness"
        ]
    }
];
function OnboardingQuestions(param) {
    let { data, updateData, onNext } = param;
    _s();
    const [currentQuestion, setCurrentQuestion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [answers, setAnswers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const handleAnswer = (answer)=>{
        const newAnswers = {
            ...answers,
            [questions[currentQuestion].id]: answer
        };
        setAnswers(newAnswers);
        // Auto-advance to next question after a brief delay
        setTimeout(()=>{
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
            } else {
                // All questions answered, update data and proceed
                updateData('questions', newAnswers);
                onNext();
            }
        }, 300);
    };
    const progress = (currentQuestion + 1) / questions.length * 100;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-2xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-display-2xl text-white font-bold mb-2",
                        children: "Solar Oracle Assessment"
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingQuestions.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-body-md text-white/70",
                        children: "Help us understand your unique journey"
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingQuestions.tsx",
                        lineNumber: 164,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingQuestions.tsx",
                lineNumber: 162,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-caption text-white/60",
                                children: [
                                    "Question ",
                                    currentQuestion + 1,
                                    " of ",
                                    questions.length
                                ]
                            }, void 0, true, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingQuestions.tsx",
                                lineNumber: 170,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-caption text-white/60",
                                children: [
                                    Math.round(progress),
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingQuestions.tsx",
                                lineNumber: 171,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingQuestions.tsx",
                        lineNumber: 169,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-2 bg-blue-500/20 rounded-full overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 ease-out",
                            style: {
                                width: "".concat(progress, "%")
                            }
                        }, void 0, false, {
                            fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingQuestions.tsx",
                            lineNumber: 174,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingQuestions.tsx",
                        lineNumber: 173,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingQuestions.tsx",
                lineNumber: 168,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-8 shadow-lg mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-title-lg text-white font-semibold mb-6 text-center",
                        children: questions[currentQuestion].question
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingQuestions.tsx",
                        lineNumber: 183,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: questions[currentQuestion].options.map((option, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleAnswer(option),
                                className: "w-full p-4 text-left bg-gradient-to-br from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30 border border-blue-400/30 rounded-xl text-white transition-all duration-300 group",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-body-md font-medium",
                                            children: option
                                        }, void 0, false, {
                                            fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingQuestions.tsx",
                                            lineNumber: 195,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                            className: "w-5 h-5 text-white/60 group-hover:text-white/80 transition-colors"
                                        }, void 0, false, {
                                            fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingQuestions.tsx",
                                            lineNumber: 196,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingQuestions.tsx",
                                    lineNumber: 194,
                                    columnNumber: 15
                                }, this)
                            }, index, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingQuestions.tsx",
                                lineNumber: 189,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingQuestions.tsx",
                        lineNumber: 187,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingQuestions.tsx",
                lineNumber: 182,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onNext,
                    className: "text-caption text-white/60 hover:text-white/80 transition-colors",
                    children: "Skip assessment"
                }, void 0, false, {
                    fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingQuestions.tsx",
                    lineNumber: 205,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingQuestions.tsx",
                lineNumber: 204,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingQuestions.tsx",
        lineNumber: 160,
        columnNumber: 5
    }, this);
}
_s(OnboardingQuestions, "lNbKV3TtuVdT3d7asJybKK3QAf4=");
_c = OnboardingQuestions;
var _c;
__turbopack_context__.k.register(_c, "OnboardingQuestions");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthenticationScreen",
    ()=>AuthenticationScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$apple$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Apple$3e$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/lucide-react/dist/esm/icons/apple.js [app-client] (ecmascript) <export default as Apple>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/lucide-react/dist/esm/icons/eye-off.js [app-client] (ecmascript) <export default as EyeOff>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function AuthenticationScreen(param) {
    let { data, updateData, onNext } = param;
    _s();
    const [authMethod, setAuthMethod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [showPassword, setShowPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleAuth = async (method)=>{
        setIsLoading(true);
        setAuthMethod(method);
        // Simulate authentication
        setTimeout(()=>{
            updateData('authMethod', method);
            if (method === 'email') {
                updateData('email', email);
            }
            setIsLoading(false);
            onNext();
        }, 1500);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-md mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-display-2xl text-white font-bold mb-2",
                        children: "Secure Your Solar Journey"
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-body-md text-white/70",
                        children: "Create your account to begin transformation"
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4 mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>handleAuth('apple'),
                        disabled: isLoading,
                        className: "w-full p-4 bg-black hover:bg-gray-900 border border-gray-700 rounded-xl text-white transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$apple$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Apple$3e$__["Apple"], {
                                className: "w-6 h-6"
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-body-md font-medium",
                                children: "Continue with Apple"
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>handleAuth('google'),
                        disabled: isLoading,
                        className: "w-full p-4 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl text-gray-900 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-6 h-6",
                                viewBox: "0 0 24 24",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        fill: "#4285F4",
                                        d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                        lineNumber: 64,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        fill: "#34A853",
                                        d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                        lineNumber: 65,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        fill: "#FBBC05",
                                        d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                        lineNumber: 66,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        fill: "#EA4335",
                                        d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                        lineNumber: 67,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-body-md font-medium",
                                children: "Continue with Google"
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 flex items-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-full border-t border-white/20"
                                }, void 0, false, {
                                    fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                    lineNumber: 75,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative flex justify-center text-sm",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "px-2 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white/60",
                                    children: "or"
                                }, void 0, false, {
                                    fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                    lineNumber: 78,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-label text-white/80 mb-2",
                                        children: "Email"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                        lineNumber: 85,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60"
                                            }, void 0, false, {
                                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                                lineNumber: 87,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "email",
                                                value: email,
                                                onChange: (e)=>setEmail(e.target.value),
                                                className: "w-full pl-10 pr-4 py-3 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400/50 transition-colors",
                                                placeholder: "Enter your email"
                                            }, void 0, false, {
                                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                                lineNumber: 88,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                        lineNumber: 86,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-label text-white/80 mb-2",
                                        children: "Password"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                        lineNumber: 99,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60"
                                            }, void 0, false, {
                                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                                lineNumber: 101,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: showPassword ? 'text' : 'password',
                                                value: password,
                                                onChange: (e)=>setPassword(e.target.value),
                                                className: "w-full pl-10 pr-12 py-3 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400/50 transition-colors",
                                                placeholder: "Create a password"
                                            }, void 0, false, {
                                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                                lineNumber: 102,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setShowPassword(!showPassword),
                                                className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80",
                                                children: showPassword ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                                                    className: "w-5 h-5"
                                                }, void 0, false, {
                                                    fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                                    lineNumber: 114,
                                                    columnNumber: 33
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                    className: "w-5 h-5"
                                                }, void 0, false, {
                                                    fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                                    lineNumber: 114,
                                                    columnNumber: 66
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                                lineNumber: 109,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                        lineNumber: 100,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleAuth('email'),
                                disabled: isLoading || !email || !password,
                                className: "w-full p-4 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30 border border-blue-400/30 rounded-xl text-white transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50",
                                children: [
                                    isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                        lineNumber: 125,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                        lineNumber: 127,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-body-md font-medium",
                                        children: isLoading ? 'Creating Account...' : 'Continue with Email'
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                        lineNumber: 129,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-caption text-white/60 mb-4",
                        children: [
                            "By signing up, you agree to our",
                            ' ',
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "#",
                                className: "text-blue-400 hover:text-blue-300 underline",
                                children: "Privacy Policy"
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                lineNumber: 140,
                                columnNumber: 11
                            }, this),
                            ' ',
                            "and",
                            ' ',
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "#",
                                className: "text-blue-400 hover:text-blue-300 underline",
                                children: "Terms of Service"
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                lineNumber: 142,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center gap-4 text-caption text-white/50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                        className: "w-3 h-3"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                        lineNumber: 147,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Encrypted"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                        lineNumber: 148,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                lineNumber: 146,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                        className: "w-3 h-3"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                        lineNumber: 151,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Secure"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                        lineNumber: 152,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                        className: "w-3 h-3"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                        lineNumber: 155,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Private"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                        lineNumber: 156,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                                lineNumber: 154,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                        lineNumber: 145,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
                lineNumber: 137,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_s(AuthenticationScreen, "WuWY/tNHba0SNm0wDMvjfUyOPDs=");
_c = AuthenticationScreen;
var _c;
__turbopack_context__.k.register(_c, "AuthenticationScreen");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UserProfileForm",
    ()=>UserProfileForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ruler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ruler$3e$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/lucide-react/dist/esm/icons/ruler.js [app-client] (ecmascript) <export default as Ruler>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function UserProfileForm(param) {
    let { data, updateData, onNext, onPrev, currentStep, totalSteps } = param;
    var _data_profile, _data_profile1, _data_profile2, _data_profile3, _data_profile4, _data_profile5, _data_profile6, _data_profile7, _data_profile8;
    _s();
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: ((_data_profile = data.profile) === null || _data_profile === void 0 ? void 0 : _data_profile.name) || '',
        username: ((_data_profile1 = data.profile) === null || _data_profile1 === void 0 ? void 0 : _data_profile1.username) || '',
        email: ((_data_profile2 = data.profile) === null || _data_profile2 === void 0 ? void 0 : _data_profile2.email) || '',
        phone: ((_data_profile3 = data.profile) === null || _data_profile3 === void 0 ? void 0 : _data_profile3.phone) || '',
        place: ((_data_profile4 = data.profile) === null || _data_profile4 === void 0 ? void 0 : _data_profile4.place) || '',
        aboutMe: ((_data_profile5 = data.profile) === null || _data_profile5 === void 0 ? void 0 : _data_profile5.aboutMe) || '',
        birthday: ((_data_profile6 = data.profile) === null || _data_profile6 === void 0 ? void 0 : _data_profile6.birthday) || '',
        height: ((_data_profile7 = data.profile) === null || _data_profile7 === void 0 ? void 0 : _data_profile7.height) || '',
        gender: ((_data_profile8 = data.profile) === null || _data_profile8 === void 0 ? void 0 : _data_profile8.gender) || ''
    });
    const handleNext = ()=>{
        updateData({
            ...data,
            profile
        });
        onNext();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-2xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-display-2xl text-white font-bold mb-2",
                        children: "Complete Your Solar Profile"
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-body-md text-white/70",
                        children: "Help us personalize your experience"
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-label text-white/80 mb-2",
                                children: "Full Name"
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                                lineNumber: 57,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                        className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                                        lineNumber: 59,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: profile.name,
                                        onChange: (e)=>setProfile((prev)=>({
                                                    ...prev,
                                                    name: e.target.value
                                                })),
                                        className: "w-full pl-12 pr-4 py-3 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400/50 transition-colors",
                                        placeholder: "Enter your full name"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                                        lineNumber: 60,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                                lineNumber: 58,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-label text-white/80 mb-2",
                                children: "Username"
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                        className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                                        lineNumber: 74,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: profile.username,
                                        onChange: (e)=>setProfile((prev)=>({
                                                    ...prev,
                                                    username: e.target.value
                                                })),
                                        className: "w-full pl-12 pr-4 py-3 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400/50 transition-colors",
                                        placeholder: "Choose a unique username"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                                        lineNumber: 75,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                                lineNumber: 73,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-label text-white/80 mb-2",
                                children: "Email Address"
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                        className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                                        lineNumber: 89,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "email",
                                        value: profile.email,
                                        onChange: (e)=>setProfile((prev)=>({
                                                    ...prev,
                                                    email: e.target.value
                                                })),
                                        className: "w-full pl-12 pr-4 py-3 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400/50 transition-colors",
                                        placeholder: "your.email@example.com"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                                        lineNumber: 90,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-label text-white/80 mb-2",
                                children: "Phone Number"
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                        className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                                        lineNumber: 104,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "tel",
                                        value: profile.phone,
                                        onChange: (e)=>setProfile((prev)=>({
                                                    ...prev,
                                                    phone: e.target.value
                                                })),
                                        className: "w-full pl-12 pr-4 py-3 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400/50 transition-colors",
                                        placeholder: "+1 (555) 123-4567"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                                        lineNumber: 105,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                                lineNumber: 103,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-label text-white/80 mb-2",
                                children: "Location"
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                                lineNumber: 117,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                        className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                                        lineNumber: 119,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: profile.place,
                                        onChange: (e)=>setProfile((prev)=>({
                                                    ...prev,
                                                    place: e.target.value
                                                })),
                                        className: "w-full pl-12 pr-4 py-3 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400/50 transition-colors",
                                        placeholder: "City, Country"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                                        lineNumber: 120,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                                lineNumber: 118,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-label text-white/80 mb-2",
                                children: "Height"
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                                lineNumber: 132,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ruler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ruler$3e$__["Ruler"], {
                                        className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                                        lineNumber: 134,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: profile.height,
                                        onChange: (e)=>setProfile((prev)=>({
                                                    ...prev,
                                                    height: e.target.value
                                                })),
                                        className: "w-full pl-12 pr-4 py-3 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400/50 transition-colors",
                                        placeholder: "e.g., 5'8\" or 173 cm"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                                        lineNumber: 135,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                                lineNumber: 133,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-label text-white/80 mb-2",
                                children: "Gender"
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                                lineNumber: 147,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: profile.gender,
                                onChange: (e)=>setProfile((prev)=>({
                                            ...prev,
                                            gender: e.target.value
                                        })),
                                className: "w-full p-3 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/30 rounded-xl text-white focus:outline-none focus:border-blue-400/50 transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        className: "bg-slate-800",
                                        children: "Select gender"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                                        lineNumber: 153,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "male",
                                        className: "bg-slate-800",
                                        children: "Male"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                                        lineNumber: 154,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "female",
                                        className: "bg-slate-800",
                                        children: "Female"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                                        lineNumber: 155,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "non-binary",
                                        className: "bg-slate-800",
                                        children: "Non-binary"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                                        lineNumber: 156,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "prefer-not-to-say",
                                        className: "bg-slate-800",
                                        children: "Prefer not to say"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                                        lineNumber: 157,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                                lineNumber: 148,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                        lineNumber: 146,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-label text-white/80 mb-2",
                                children: "Birthday"
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                                lineNumber: 163,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                        className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                                        lineNumber: 165,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "date",
                                        value: profile.birthday,
                                        onChange: (e)=>setProfile((prev)=>({
                                                    ...prev,
                                                    birthday: e.target.value
                                                })),
                                        className: "w-full pl-12 pr-4 py-3 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/30 rounded-xl text-white focus:outline-none focus:border-blue-400/50 transition-colors"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                                        lineNumber: 166,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                                lineNumber: 164,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                        lineNumber: 162,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-label text-white/80 mb-2",
                                children: "About Me"
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                                lineNumber: 177,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: profile.aboutMe,
                                onChange: (e)=>setProfile((prev)=>({
                                            ...prev,
                                            aboutMe: e.target.value
                                        })),
                                rows: 4,
                                className: "w-full p-3 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400/50 transition-colors resize-none",
                                placeholder: "Tell us about yourself and your solar journey..."
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                                lineNumber: 178,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                        lineNumber: 176,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center mt-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onPrev,
                        className: "px-6 py-3 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-400/30 rounded-xl text-white hover:from-blue-500/30 hover:to-indigo-500/30 transition-all duration-300",
                        children: "Back"
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                        lineNumber: 190,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleNext,
                        className: "inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-bold rounded-xl transition-all duration-300",
                        children: [
                            "Continue",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                                lineNumber: 202,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                        lineNumber: 197,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
                lineNumber: 189,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
_s(UserProfileForm, "vmMrb0VSYoO18UxNaOozigcDHzE=");
_c = UserProfileForm;
var _c;
__turbopack_context__.k.register(_c, "UserProfileForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EncouragementSlides.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EncouragementSlides",
    ()=>EncouragementSlides
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const slides = [
    {
        title: "You Have Incredible Potential",
        subtitle: "Based on your responses, you have exceptional potential to crush your transformation goals",
        description: "Your commitment level and readiness indicate you're destined for breakthrough results",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"],
        gradient: "from-yellow-400/20 to-amber-500/20"
    },
    {
        title: "Thank You for Your Trust",
        subtitle: "Thank you for trusting us with your health and transformation journey",
        description: "We take this responsibility seriously and are committed to your success. Thousands of others have transformed their lives through our guidance",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"],
        gradient: "from-blue-400/20 to-indigo-500/20"
    }
];
function EncouragementSlides(param) {
    let { onNext } = param;
    _s();
    const [currentSlide, setCurrentSlide] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const handleNext = ()=>{
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        } else {
            onNext();
        }
    };
    const currentSlideData = slides[currentSlide];
    const IconComponent = currentSlideData.icon;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-2xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-center gap-2",
                    children: slides.map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-2 h-2 rounded-full transition-all duration-300 ".concat(index === currentSlide ? 'bg-blue-400' : 'bg-white/30')
                        }, index, false, {
                            fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EncouragementSlides.tsx",
                            lineNumber: 52,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EncouragementSlides.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EncouragementSlides.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br ".concat(currentSlideData.gradient, " flex items-center justify-center"),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconComponent, {
                            className: "w-12 h-12 text-white"
                        }, void 0, false, {
                            fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EncouragementSlides.tsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EncouragementSlides.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-display-2xl text-white font-bold mb-4",
                        children: currentSlideData.title
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EncouragementSlides.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-title-md text-white/90 mb-6",
                        children: currentSlideData.subtitle
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EncouragementSlides.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-body-lg text-white/70 mb-8 max-w-lg mx-auto",
                        children: currentSlideData.description
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EncouragementSlides.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleNext,
                        className: "inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30 border border-blue-400/30 rounded-xl text-white transition-all duration-300",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-body-md font-medium",
                                children: currentSlide < slides.length - 1 ? 'Continue' : 'Begin My Journey'
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EncouragementSlides.tsx",
                                lineNumber: 89,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EncouragementSlides.tsx",
                                lineNumber: 92,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EncouragementSlides.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EncouragementSlides.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 -z-10 overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl"
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EncouragementSlides.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl"
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EncouragementSlides.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EncouragementSlides.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EncouragementSlides.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
_s(EncouragementSlides, "VQw0KpRgltXDNPWBgmV3GhZXdQE=");
_c = EncouragementSlides;
var _c;
__turbopack_context__.k.register(_c, "EncouragementSlides");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SUNGAZE APP/package.json/src/app/components/onboarding/RatingRequest.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RatingRequest",
    ()=>RatingRequest
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function RatingRequest(param) {
    let { data, updateData, onNext } = param;
    _s();
    const [rating, setRating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [comment, setComment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [hoveredRating, setHoveredRating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const handleSubmit = ()=>{
        updateData('rating', rating);
        if (comment.trim()) {
            updateData('ratingComment', comment);
        }
        onNext();
    };
    const handleSkip = ()=>{
        onNext();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-2xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-display-2xl text-white font-bold mb-2",
                        children: "Help Others Discover Transformation"
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/RatingRequest.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-body-md text-white/70",
                        children: "Your feedback helps other seekers find their path"
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/RatingRequest.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/RatingRequest.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-8 shadow-lg mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-title-lg text-white font-semibold mb-6 text-center",
                        children: "How likely are you to recommend Solar Oracle to others?"
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/RatingRequest.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-center gap-2 mb-6",
                        children: [
                            1,
                            2,
                            3,
                            4,
                            5
                        ].map((star)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setRating(star),
                                onMouseEnter: ()=>setHoveredRating(star),
                                onMouseLeave: ()=>setHoveredRating(0),
                                className: "transition-all duration-200 hover:scale-110",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                    className: "w-12 h-12 ".concat(star <= (hoveredRating || rating) ? 'text-yellow-400 fill-yellow-400' : 'text-white/30')
                                }, void 0, false, {
                                    fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/RatingRequest.tsx",
                                    lineNumber: 57,
                                    columnNumber: 15
                                }, this)
                            }, star, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/RatingRequest.tsx",
                                lineNumber: 50,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/RatingRequest.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between text-caption text-white/60 mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Not likely"
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/RatingRequest.tsx",
                                lineNumber: 70,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Extremely likely"
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/RatingRequest.tsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/RatingRequest.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this),
                    rating > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-label text-white/80",
                                children: "Share what excites you most about this journey (optional)"
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/RatingRequest.tsx",
                                lineNumber: 77,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                        className: "absolute left-3 top-3 w-5 h-5 text-white/60"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/RatingRequest.tsx",
                                        lineNumber: 81,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        value: comment,
                                        onChange: (e)=>setComment(e.target.value),
                                        className: "w-full pl-10 pr-4 py-3 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400/50 transition-colors resize-none",
                                        rows: 4,
                                        placeholder: "What are you most excited about? What drew you to solar practices?"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/RatingRequest.tsx",
                                        lineNumber: 82,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/RatingRequest.tsx",
                                lineNumber: 80,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/RatingRequest.tsx",
                        lineNumber: 76,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/RatingRequest.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-4",
                children: [
                    rating > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSubmit,
                        className: "w-full p-4 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30 border border-blue-400/30 rounded-xl text-white transition-all duration-300 flex items-center justify-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-body-md font-medium",
                                children: "Submit Rating"
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/RatingRequest.tsx",
                                lineNumber: 101,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/RatingRequest.tsx",
                                lineNumber: 102,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/RatingRequest.tsx",
                        lineNumber: 97,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSkip,
                        className: "w-full p-3 text-caption text-white/60 hover:text-white/80 transition-colors",
                        children: "Skip for now"
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/RatingRequest.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/RatingRequest.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 -z-10 overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-1/3 left-1/3 w-24 h-24 bg-yellow-400/10 rounded-full blur-2xl"
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/RatingRequest.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-1/3 right-1/3 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl"
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/RatingRequest.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/RatingRequest.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/RatingRequest.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_s(RatingRequest, "xUwiAzCU7yK+P2RrMDn+ZrdhkDs=");
_c = RatingRequest;
var _c;
__turbopack_context__.k.register(_c, "RatingRequest");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SUNGAZE APP/package.json/src/app/components/onboarding/ProgressChart.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProgressChart",
    ()=>ProgressChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function ProgressChart(param) {
    let { currentDay, totalDays, className = '' } = param;
    const progress = currentDay / totalDays * 100;
    const days = Array.from({
        length: totalDays
    }, (_, i)=>i + 1);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6 ".concat(className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-title-sm text-white font-semibold mb-4 text-center",
                children: "Your 273-Day Transformation Journey"
            }, void 0, false, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/ProgressChart.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-caption text-white/60",
                                children: [
                                    "Day ",
                                    currentDay,
                                    " of ",
                                    totalDays
                                ]
                            }, void 0, true, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/ProgressChart.tsx",
                                lineNumber: 22,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-caption text-white/60",
                                children: [
                                    Math.round(progress),
                                    "% Complete"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/ProgressChart.tsx",
                                lineNumber: 23,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/ProgressChart.tsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-3 bg-blue-500/20 rounded-full overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full bg-gradient-to-r from-yellow-400 to-amber-500 transition-all duration-1000 ease-out",
                            style: {
                                width: "".concat(progress, "%")
                            }
                        }, void 0, false, {
                            fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/ProgressChart.tsx",
                            lineNumber: 26,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/ProgressChart.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/ProgressChart.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-10 gap-1 mb-4",
                children: days.map((day)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-2 rounded-sm transition-all duration-300 ".concat(day <= currentDay ? 'bg-gradient-to-r from-yellow-400 to-amber-500' : day === currentDay + 1 ? 'bg-blue-400/60' : 'bg-white/20')
                    }, day, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/ProgressChart.tsx",
                        lineNumber: 36,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/ProgressChart.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-3 gap-4 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-number-display text-yellow-400 font-bold",
                                children: "10s"
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/ProgressChart.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-caption text-white/60",
                                children: "Day 1"
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/ProgressChart.tsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/ProgressChart.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-number-display text-orange-400 font-bold",
                                children: "15m"
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/ProgressChart.tsx",
                                lineNumber: 56,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-caption text-white/60",
                                children: "Day 90"
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/ProgressChart.tsx",
                                lineNumber: 57,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/ProgressChart.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-number-display text-amber-400 font-bold",
                                children: "44m"
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/ProgressChart.tsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-caption text-white/60",
                                children: "Day 273"
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/ProgressChart.tsx",
                                lineNumber: 61,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/ProgressChart.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/ProgressChart.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/ProgressChart.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_c = ProgressChart;
var _c;
__turbopack_context__.k.register(_c, "ProgressChart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EnergyChart.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EnergyChart",
    ()=>EnergyChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function EnergyChart(param) {
    let { currentEnergy, targetEnergy, className = '' } = param;
    const energyPercentage = currentEnergy / targetEnergy * 100;
    const energyLevels = [
        {
            level: 'Low',
            value: 25,
            color: 'from-red-500 to-orange-500'
        },
        {
            level: 'Moderate',
            value: 50,
            color: 'from-orange-500 to-yellow-500'
        },
        {
            level: 'Good',
            value: 75,
            color: 'from-yellow-500 to-green-500'
        },
        {
            level: 'Optimal',
            value: 100,
            color: 'from-green-500 to-emerald-500'
        }
    ];
    const currentLevel = energyLevels.find((level)=>currentEnergy <= level.value) || energyLevels[energyLevels.length - 1];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6 ".concat(className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-title-sm text-white font-semibold mb-4 text-center",
                children: "Your Energy Transformation"
            }, void 0, false, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EnergyChart.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-display-2xl text-white font-bold mb-2",
                        children: [
                            currentEnergy,
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EnergyChart.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-body-md text-white/70",
                        children: "Current Energy Level"
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EnergyChart.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-body-sm font-semibold mt-1 bg-gradient-to-r ".concat(currentLevel.color, " bg-clip-text text-transparent"),
                        children: currentLevel.level
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EnergyChart.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EnergyChart.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-32 h-32 mx-auto mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-32 h-32 transform -rotate-90",
                        viewBox: "0 0 120 120",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                cx: "60",
                                cy: "60",
                                r: "50",
                                stroke: "rgba(255,255,255,0.2)",
                                strokeWidth: "8",
                                fill: "none"
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EnergyChart.tsx",
                                lineNumber: 39,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                cx: "60",
                                cy: "60",
                                r: "50",
                                stroke: "url(#energyGradient)",
                                strokeWidth: "8",
                                fill: "none",
                                strokeLinecap: "round",
                                strokeDasharray: "".concat(2 * Math.PI * 50),
                                strokeDashoffset: "".concat(2 * Math.PI * 50 * (1 - energyPercentage / 100)),
                                className: "transition-all duration-1000 ease-out"
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EnergyChart.tsx",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                    id: "energyGradient",
                                    x1: "0%",
                                    y1: "0%",
                                    x2: "100%",
                                    y2: "0%",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "0%",
                                            stopColor: "#ef4444"
                                        }, void 0, false, {
                                            fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EnergyChart.tsx",
                                            lineNumber: 62,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "33%",
                                            stopColor: "#f97316"
                                        }, void 0, false, {
                                            fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EnergyChart.tsx",
                                            lineNumber: 63,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "66%",
                                            stopColor: "#eab308"
                                        }, void 0, false, {
                                            fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EnergyChart.tsx",
                                            lineNumber: 64,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                            offset: "100%",
                                            stopColor: "#22c55e"
                                        }, void 0, false, {
                                            fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EnergyChart.tsx",
                                            lineNumber: 65,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EnergyChart.tsx",
                                    lineNumber: 61,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EnergyChart.tsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EnergyChart.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 flex items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-title-md text-white font-bold",
                                    children: [
                                        targetEnergy,
                                        "%"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EnergyChart.tsx",
                                    lineNumber: 71,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-caption text-white/60",
                                    children: "Target"
                                }, void 0, false, {
                                    fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EnergyChart.tsx",
                                    lineNumber: 72,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EnergyChart.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EnergyChart.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EnergyChart.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-3",
                children: energyLevels.map((level, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-3 h-3 rounded-full bg-gradient-to-r ".concat(level.color)
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EnergyChart.tsx",
                                lineNumber: 81,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-caption text-white/70",
                                children: level.level
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EnergyChart.tsx",
                                lineNumber: 82,
                                columnNumber: 13
                            }, this)
                        ]
                    }, index, true, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EnergyChart.tsx",
                        lineNumber: 80,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EnergyChart.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EnergyChart.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_c = EnergyChart;
var _c;
__turbopack_context__.k.register(_c, "EnergyChart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SUNGAZE APP/package.json/src/app/components/onboarding/PlanGenerationLoading.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlanGenerationLoading",
    ()=>PlanGenerationLoading
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/lucide-react/dist/esm/icons/target.js [app-client] (ecmascript) <export default as Target>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$components$2f$onboarding$2f$ProgressChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/src/app/components/onboarding/ProgressChart.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$components$2f$onboarding$2f$EnergyChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EnergyChart.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const loadingSteps = [
    {
        title: "Analyzing your unique profile...",
        description: "Processing your responses and energy patterns",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"],
        duration: 2000
    },
    {
        title: "Setting up your optimal practice schedule...",
        description: "Calibrating timing based on your lifestyle",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"],
        duration: 2500
    },
    {
        title: "Calibrating safety protocols...",
        description: "Ensuring your journey is safe and effective",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"],
        duration: 2000
    },
    {
        title: "Integrating ancient wisdom with your modern lifestyle...",
        description: "Creating your personalized solar nutrition blueprint",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"],
        duration: 3000
    }
];
function PlanGenerationLoading(param) {
    let { onNext } = param;
    _s();
    const [currentStep, setCurrentStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isComplete, setIsComplete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlanGenerationLoading.useEffect": ()=>{
            let stepTimer;
            let progressTimer;
            const startStep = {
                "PlanGenerationLoading.useEffect.startStep": (stepIndex)=>{
                    if (stepIndex >= loadingSteps.length) {
                        setIsComplete(true);
                        setTimeout({
                            "PlanGenerationLoading.useEffect.startStep": ()=>onNext()
                        }["PlanGenerationLoading.useEffect.startStep"], 1000);
                        return;
                    }
                    setCurrentStep(stepIndex);
                    setProgress(0);
                    // Progress animation
                    const step = loadingSteps[stepIndex];
                    const progressInterval = 50;
                    const totalIntervals = step.duration / progressInterval;
                    let currentInterval = 0;
                    progressTimer = setInterval({
                        "PlanGenerationLoading.useEffect.startStep": ()=>{
                            currentInterval++;
                            const newProgress = currentInterval / totalIntervals * 100;
                            setProgress(newProgress);
                            if (currentInterval >= totalIntervals) {
                                clearInterval(progressTimer);
                                setTimeout({
                                    "PlanGenerationLoading.useEffect.startStep": ()=>startStep(stepIndex + 1)
                                }["PlanGenerationLoading.useEffect.startStep"], 500);
                            }
                        }
                    }["PlanGenerationLoading.useEffect.startStep"], progressInterval);
                }
            }["PlanGenerationLoading.useEffect.startStep"];
            // Start the first step
            startStep(0);
            return ({
                "PlanGenerationLoading.useEffect": ()=>{
                    clearTimeout(stepTimer);
                    clearInterval(progressTimer);
                }
            })["PlanGenerationLoading.useEffect"];
        }
    }["PlanGenerationLoading.useEffect"], [
        onNext
    ]);
    const currentStepData = loadingSteps[currentStep];
    const IconComponent = (currentStepData === null || currentStepData === void 0 ? void 0 : currentStepData.icon) || __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-2xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-display-2xl text-white font-bold mb-2",
                        children: isComplete ? "Your Plan is Ready!" : "Generating Your Custom Plan"
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/PlanGenerationLoading.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-body-md text-white/70",
                        children: isComplete ? "Your personalized solar transformation roadmap is complete" : "This usually takes 30-60 seconds for optimal customization"
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/PlanGenerationLoading.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/PlanGenerationLoading.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-8 shadow-lg mb-8",
                children: [
                    !isComplete && currentStepData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconComponent, {
                                            className: "w-8 h-8 text-white animate-pulse"
                                        }, void 0, false, {
                                            fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/PlanGenerationLoading.tsx",
                                            lineNumber: 115,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/PlanGenerationLoading.tsx",
                                        lineNumber: 114,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-title-lg text-white font-semibold mb-2",
                                        children: currentStepData.title
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/PlanGenerationLoading.tsx",
                                        lineNumber: 117,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-body-md text-white/70",
                                        children: currentStepData.description
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/PlanGenerationLoading.tsx",
                                        lineNumber: 120,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/PlanGenerationLoading.tsx",
                                lineNumber: 113,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-caption text-white/60",
                                                children: [
                                                    "Step ",
                                                    currentStep + 1,
                                                    " of ",
                                                    loadingSteps.length
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/PlanGenerationLoading.tsx",
                                                lineNumber: 128,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-caption text-white/60",
                                                children: [
                                                    Math.round(progress),
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/PlanGenerationLoading.tsx",
                                                lineNumber: 129,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/PlanGenerationLoading.tsx",
                                        lineNumber: 127,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-2 bg-blue-500/20 rounded-full overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 ease-out",
                                            style: {
                                                width: "".concat(progress, "%")
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/PlanGenerationLoading.tsx",
                                            lineNumber: 132,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/PlanGenerationLoading.tsx",
                                        lineNumber: 131,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/PlanGenerationLoading.tsx",
                                lineNumber: 126,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true),
                    isComplete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                    className: "w-8 h-8 text-green-400"
                                }, void 0, false, {
                                    fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/PlanGenerationLoading.tsx",
                                    lineNumber: 145,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/PlanGenerationLoading.tsx",
                                lineNumber: 144,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-title-lg text-white font-semibold mb-2",
                                children: "Customization Complete!"
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/PlanGenerationLoading.tsx",
                                lineNumber: 147,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-body-md text-white/70",
                                children: "Your personalized solar transformation plan is ready"
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/PlanGenerationLoading.tsx",
                                lineNumber: 150,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/PlanGenerationLoading.tsx",
                        lineNumber: 143,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-caption text-white/60",
                                        children: "Overall Progress"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/PlanGenerationLoading.tsx",
                                        lineNumber: 159,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-caption text-white/60",
                                        children: [
                                            Math.round((currentStep + progress / 100) / loadingSteps.length * 100),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/PlanGenerationLoading.tsx",
                                        lineNumber: 160,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/PlanGenerationLoading.tsx",
                                lineNumber: 158,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-1 bg-blue-500/20 rounded-full overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-full bg-gradient-to-r from-yellow-400 to-amber-500 transition-all duration-500 ease-out",
                                    style: {
                                        width: "".concat((currentStep + progress / 100) / loadingSteps.length * 100, "%")
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/PlanGenerationLoading.tsx",
                                    lineNumber: 165,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/PlanGenerationLoading.tsx",
                                lineNumber: 164,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/PlanGenerationLoading.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/PlanGenerationLoading.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-6 mt-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$components$2f$onboarding$2f$ProgressChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProgressChart"], {
                        currentDay: 1,
                        totalDays: 273
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/PlanGenerationLoading.tsx",
                        lineNumber: 175,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$components$2f$onboarding$2f$EnergyChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EnergyChart"], {
                        currentEnergy: 35,
                        targetEnergy: 85
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/PlanGenerationLoading.tsx",
                        lineNumber: 176,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/PlanGenerationLoading.tsx",
                lineNumber: 174,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 -z-10 overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/PlanGenerationLoading.tsx",
                        lineNumber: 181,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl animate-pulse"
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/PlanGenerationLoading.tsx",
                        lineNumber: 182,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-400/5 rounded-full blur-3xl animate-pulse"
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/PlanGenerationLoading.tsx",
                        lineNumber: 183,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/PlanGenerationLoading.tsx",
                lineNumber: 180,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/PlanGenerationLoading.tsx",
        lineNumber: 94,
        columnNumber: 5
    }, this);
}
_s(PlanGenerationLoading, "gxcAtZe/MdsAK3FUpD+i9NSagSI=");
_c = PlanGenerationLoading;
var _c;
__turbopack_context__.k.register(_c, "PlanGenerationLoading");
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
const stripePromise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f40$stripe$2f$stripe$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadStripe"])(("TURBOPACK compile-time value", "pk_live_51NW2s0GIDaitR9oVGRMVtMCR2RST9d4dVd8H7gfqnUO8MyWJ3Y3HPEFGRiAD2CzC4CEVL1UhFIfsD9uyTptsYg5M00Tk7i1f4Y"));
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
"[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OnboardingPaywall",
    ()=>OnboardingPaywall
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/lucide-react/dist/esm/icons/crown.js [app-client] (ecmascript) <export default as Crown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/lucide-react/dist/esm/icons/shield.js [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$components$2f$onboarding$2f$ProgressChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/src/app/components/onboarding/ProgressChart.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$payments$2f$stripe$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/src/app/lib/payments/stripe.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$types$2f$subscription$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/src/app/types/subscription.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const plans = [
    {
        id: 'monthly',
        name: 'Monthly',
        price: '$4.99',
        period: '/month',
        popular: false,
        features: [
            'Daily solar wisdom & guidance',
            'Personalized practice schedules',
            'Safety protocols & monitoring',
            'Progress tracking',
            'Community access'
        ]
    },
    {
        id: 'yearly',
        name: 'Yearly',
        price: '$29.99',
        period: '/year',
        popular: true,
        originalPrice: '$59.88',
        savings: 'Save 50%',
        features: [
            'Everything in Monthly',
            'Advanced analytics & insights',
            'Priority customer support',
            'Exclusive content & updates',
            'Early access to new features'
        ]
    },
    {
        id: 'lifetime',
        name: 'Founder 444',
        price: '$99',
        period: 'one-time',
        popular: false,
        limited: true,
        features: [
            'Lifetime access to all features',
            'All future updates included',
            'Priority customer support',
            'Exclusive content & updates',
            'No recurring payments ever',
            'Founder badge & recognition',
            'Early access to new features'
        ]
    }
];
const valueProps = [
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"],
        title: '100+ Expert Responses',
        description: 'Get answers to every question from ancient masters'
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"],
        title: 'Personalized Daily Guidance',
        description: 'AI-powered recommendations based on your profile'
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"],
        title: 'Safety Protocols',
        description: 'Proven methods from ancient solar masters'
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
        title: 'Progress Tracking',
        description: 'Monitor your transformation journey'
    }
];
function OnboardingPaywall(param) {
    let { data, onNext } = param;
    _s();
    const [selectedPlan, setSelectedPlan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('yearly');
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleSubscribe = async ()=>{
        setIsLoading(true);
        setError(null);
        try {
            var _data_profile, _data_profile1;
            // Map plan IDs to Stripe tiers
            const planToTierMap = {
                'monthly': 'monthly',
                'yearly': 'yearly',
                'lifetime': 'founder_444'
            };
            const tier = planToTierMap[selectedPlan];
            const product = __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$types$2f$subscription$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PAYMENT_PRODUCTS"].find((p)=>p.tier === tier);
            if (!(product === null || product === void 0 ? void 0 : product.stripePriceId)) {
                throw new Error('Invalid plan selected');
            }
            // Create checkout session
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$payments$2f$stripe$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCheckoutSession"])({
                priceId: product.stripePriceId,
                tier: tier,
                userId: ((_data_profile = data.profile) === null || _data_profile === void 0 ? void 0 : _data_profile.email) || 'temp-user-' + Date.now(),
                email: ((_data_profile1 = data.profile) === null || _data_profile1 === void 0 ? void 0 : _data_profile1.email) || 'temp@sungaze.com',
                successUrl: "".concat(window.location.origin, "/?success=true"),
                cancelUrl: "".concat(window.location.origin, "/?canceled=true")
            });
            if (result.error) {
                throw new Error(result.error);
            }
            if (result.url) {
                // Redirect to Stripe Checkout
                window.location.href = result.url;
            } else if (result.sessionId) {
                // Fallback to redirectToCheckout if URL not available
                const redirectResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$lib$2f$payments$2f$stripe$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["redirectToCheckout"])(result.sessionId);
                if (redirectResult.error) {
                    throw new Error(redirectResult.error);
                }
            } else {
                throw new Error('No checkout URL or session ID received');
            }
        } catch (err) {
            console.error('Checkout error:', err);
            setError(err instanceof Error ? err.message : 'Payment failed. Please try again.');
            setIsLoading(false);
        }
    };
    const selectedPlanData = plans.find((plan)=>plan.id === selectedPlan);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-4xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-display-2xl text-white font-bold mb-2",
                        children: "Your Custom Solar Transformation Plan Is Ready"
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-body-md text-white/70",
                        children: "Based on your profile, here's what we've created for you:"
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 border border-yellow-400/30 rounded-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__["Crown"], {
                                className: "w-4 h-4 text-yellow-400"
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                                lineNumber: 161,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-body-sm text-yellow-400 font-semibold",
                                children: "Join the First 444 Solar Founders"
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                                lineNumber: 162,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                        lineNumber: 160,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                lineNumber: 155,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6 shadow-lg mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-title-md text-white font-semibold mb-4",
                        children: "Your Personalized Insights:"
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                        lineNumber: 168,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-body-sm text-white/80",
                                        children: "• Sungazing progression: 10 seconds daily, increasing by 10 seconds each day"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                                        lineNumber: 171,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-body-sm text-white/80",
                                        children: "• General practice time: 10-20 minutes (candle gazing, cloud gazing, sungazing)"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                                        lineNumber: 172,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-body-sm text-white/80",
                                        children: "• Optimal timing based on your location"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                                        lineNumber: 173,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                                lineNumber: 170,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-body-sm text-white/80",
                                        children: "• Safety protocols tailored to your experience level"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                                        lineNumber: 176,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-body-sm text-white/80",
                                        children: "• Expected transformation timeline: 90-273 days"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                                        lineNumber: 177,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-body-sm text-white/80",
                                        children: "• Energy optimization focus areas"
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                                        lineNumber: 178,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                                lineNumber: 175,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                        lineNumber: 169,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                lineNumber: 167,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-8",
                children: valueProps.map((prop, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-3 p-4 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center flex-shrink-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(prop.icon, {
                                    className: "w-4 h-4 text-white"
                                }, void 0, false, {
                                    fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                                    lineNumber: 188,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                                lineNumber: 187,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-body-md text-white font-semibold mb-1",
                                        children: prop.title
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                                        lineNumber: 191,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-body-sm text-white/70",
                                        children: prop.description
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                                        lineNumber: 192,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                                lineNumber: 190,
                                columnNumber: 13
                            }, this)
                        ]
                    }, index, true, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                        lineNumber: 186,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                lineNumber: 184,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$components$2f$onboarding$2f$ProgressChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProgressChart"], {
                    currentDay: 1,
                    totalDays: 273
                }, void 0, false, {
                    fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                    lineNumber: 200,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                lineNumber: 199,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-title-lg text-white font-semibold text-center mb-6",
                        children: "Choose Your Transformation Plan"
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                        lineNumber: 205,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                        children: plans.map((plan)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>setSelectedPlan(plan.id),
                                className: "relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ".concat(selectedPlan === plan.id ? 'border-blue-400/50 bg-gradient-to-br from-blue-500/20 to-indigo-500/20' : 'border-blue-400/20 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 hover:border-blue-400/30'),
                                children: [
                                    plan.popular && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute -top-3 left-1/2 transform -translate-x-1/2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "px-3 py-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full text-xs font-semibold text-black",
                                            children: "Most Popular"
                                        }, void 0, false, {
                                            fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                                            lineNumber: 220,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                                        lineNumber: 219,
                                        columnNumber: 17
                                    }, this),
                                    plan.limited && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute -top-3 left-1/2 transform -translate-x-1/2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "px-3 py-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full text-xs font-semibold text-black",
                                            children: "Founder 444"
                                        }, void 0, false, {
                                            fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                                            lineNumber: 229,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                                        lineNumber: 228,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-title-md text-white font-semibold mb-2",
                                                children: plan.name
                                            }, void 0, false, {
                                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                                                lineNumber: 237,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-baseline justify-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-display-2xl text-white font-bold",
                                                        children: plan.price
                                                    }, void 0, false, {
                                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                                                        lineNumber: 239,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-body-sm text-white/60",
                                                        children: plan.period
                                                    }, void 0, false, {
                                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                                                        lineNumber: 240,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                                                lineNumber: 238,
                                                columnNumber: 17
                                            }, this),
                                            plan.originalPrice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-center gap-2 mt-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-body-sm text-white/50 line-through",
                                                        children: plan.originalPrice
                                                    }, void 0, false, {
                                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                                                        lineNumber: 244,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-body-sm text-green-400 font-semibold",
                                                        children: plan.savings
                                                    }, void 0, false, {
                                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                                                        lineNumber: 245,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                                                lineNumber: 243,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                                        lineNumber: 236,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2 mb-6",
                                        children: plan.features.map((feature, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                        className: "w-4 h-4 text-green-400 mt-0.5 flex-shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                                                        lineNumber: 254,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-body-sm text-white/80",
                                                        children: feature
                                                    }, void 0, false, {
                                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                                                        lineNumber: 255,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, index, true, {
                                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                                                lineNumber: 253,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                                        lineNumber: 251,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "w-full py-3 rounded-xl font-semibold transition-all duration-300 ".concat(selectedPlan === plan.id ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white' : 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-white/80 hover:from-blue-500/30 hover:to-indigo-500/30'),
                                        children: selectedPlan === plan.id ? 'Selected' : 'Select Plan'
                                    }, void 0, false, {
                                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                                        lineNumber: 261,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, plan.id, true, {
                                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                                lineNumber: 208,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                        lineNumber: 206,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                lineNumber: 204,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-red-400 text-center",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                    lineNumber: 278,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                lineNumber: 277,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSubscribe,
                        disabled: isLoading,
                        className: "inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
                        children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                                    lineNumber: 291,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Processing..."
                                }, void 0, false, {
                                    fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                                    lineNumber: 292,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Start My Transformation"
                                }, void 0, false, {
                                    fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                                    lineNumber: 296,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                                    lineNumber: 297,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                        lineNumber: 284,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-caption text-white/60 mt-4",
                        children: "Secure payment • Cancel anytime • 30-day money-back guarantee"
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                        lineNumber: 302,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 p-4 bg-gradient-to-r from-yellow-400/10 to-amber-500/10 border border-yellow-400/20 rounded-xl",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-body-sm text-yellow-400 font-semibold mb-2",
                                    children: "Limited Time: Founder 444 Status"
                                }, void 0, false, {
                                    fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                                    lineNumber: 309,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-caption text-white/70",
                                    children: "Only the first 444 users will receive founder recognition, exclusive badges, and lifetime access at this special price."
                                }, void 0, false, {
                                    fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                                    lineNumber: 310,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                            lineNumber: 308,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                        lineNumber: 307,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
                lineNumber: 283,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx",
        lineNumber: 153,
        columnNumber: 5
    }, this);
}
_s(OnboardingPaywall, "4ZA3D+t0+wl8dv800hVcNJapgCc=");
_c = OnboardingPaywall;
var _c;
__turbopack_context__.k.register(_c, "OnboardingPaywall");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingFlow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OnboardingFlow",
    ()=>OnboardingFlow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$components$2f$onboarding$2f$OnboardingQuestions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingQuestions.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$components$2f$onboarding$2f$AuthenticationScreen$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/src/app/components/onboarding/AuthenticationScreen.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$components$2f$onboarding$2f$UserProfileForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/src/app/components/onboarding/UserProfileForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$components$2f$onboarding$2f$EncouragementSlides$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/src/app/components/onboarding/EncouragementSlides.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$components$2f$onboarding$2f$RatingRequest$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/src/app/components/onboarding/RatingRequest.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$components$2f$onboarding$2f$PlanGenerationLoading$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/src/app/components/onboarding/PlanGenerationLoading.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$components$2f$onboarding$2f$OnboardingPaywall$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingPaywall.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
function OnboardingFlow() {
    let { onComplete } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    _s();
    const [currentStep, setCurrentStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [onboardingData, setOnboardingData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        questions: {
            q1_interest: '',
            q2_energy: '',
            q3_sleep: '',
            q4_goal: '',
            q5_experience: '',
            q6_time: '',
            q7_learning: '',
            q8_safety: '',
            q9_transformation: '',
            q10_support: '',
            q11_lifestyle: '',
            q12_investment: '',
            q13_motivation: ''
        },
        authMethod: null,
        profile: {
            age: 0,
            height: '',
            gender: '',
            referralSource: ''
        }
    });
    const steps = [
        {
            component: __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$components$2f$onboarding$2f$OnboardingQuestions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OnboardingQuestions"],
            title: "Solar Oracle Assessment"
        },
        {
            component: __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$components$2f$onboarding$2f$AuthenticationScreen$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthenticationScreen"],
            title: "Secure Your Journey"
        },
        {
            component: __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$components$2f$onboarding$2f$UserProfileForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserProfileForm"],
            title: "Complete Your Profile"
        },
        {
            component: __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$components$2f$onboarding$2f$EncouragementSlides$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EncouragementSlides"],
            title: "Your Potential"
        },
        {
            component: __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$components$2f$onboarding$2f$RatingRequest$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RatingRequest"],
            title: "Help Others"
        },
        {
            component: __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$components$2f$onboarding$2f$PlanGenerationLoading$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlanGenerationLoading"],
            title: "Generating Your Plan"
        },
        {
            component: __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$components$2f$onboarding$2f$OnboardingPaywall$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OnboardingPaywall"],
            title: "Your Transformation Plan"
        }
    ];
    const updateData = (section, data)=>{
        setOnboardingData((prev)=>{
            const currentSection = prev[section];
            return {
                ...prev,
                [section]: {
                    ...currentSection,
                    ...data
                }
            };
        });
    };
    const nextStep = ()=>{
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            // Onboarding complete - call onComplete callback
            onComplete === null || onComplete === void 0 ? void 0 : onComplete();
        }
    };
    const prevStep = ()=>{
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };
    const CurrentComponent = steps[currentStep].component;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed top-6 left-6 z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400/90 to-amber-500/90 flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.5)] border border-yellow-300/30",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-black text-sm font-bold tracking-tight",
                        children: "44"
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingFlow.tsx",
                        lineNumber: 119,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingFlow.tsx",
                    lineNumber: 118,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingFlow.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed top-0 left-0 right-0 z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-1 bg-blue-500/20",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 ease-out",
                        style: {
                            width: "".concat((currentStep + 1) / steps.length * 100, "%")
                        }
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingFlow.tsx",
                        lineNumber: 126,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingFlow.tsx",
                    lineNumber: 125,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingFlow.tsx",
                lineNumber: 124,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pt-20 pb-24 px-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CurrentComponent, {
                    data: onboardingData,
                    updateData: updateData,
                    onNext: nextStep,
                    onPrev: prevStep,
                    currentStep: currentStep,
                    totalSteps: steps.length
                }, void 0, false, {
                    fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingFlow.tsx",
                    lineNumber: 135,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingFlow.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, this),
            currentStep > 0 && currentStep < steps.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-6 left-6 right-6 z-40",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: prevStep,
                            className: "flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-xl border border-blue-400/30 rounded-2xl text-white hover:from-blue-500/30 hover:to-indigo-500/30 transition-all duration-300",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingFlow.tsx",
                                    lineNumber: 153,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-body-sm font-medium",
                                    children: "Back"
                                }, void 0, false, {
                                    fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingFlow.tsx",
                                    lineNumber: 154,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingFlow.tsx",
                            lineNumber: 149,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-caption text-white/60",
                            children: [
                                currentStep + 1,
                                " of ",
                                steps.length
                            ]
                        }, void 0, true, {
                            fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingFlow.tsx",
                            lineNumber: 157,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingFlow.tsx",
                    lineNumber: 148,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingFlow.tsx",
                lineNumber: 147,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingFlow.tsx",
        lineNumber: 115,
        columnNumber: 5
    }, this);
}
_s(OnboardingFlow, "Wpk/kPg7aAsGp8NstNg3q3nnyaU=");
_c = OnboardingFlow;
var _c;
__turbopack_context__.k.register(_c, "OnboardingFlow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SUNGAZE APP/package.json/src/app/demo-onboarding/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DemoOnboardingPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$components$2f$onboarding$2f$OnboardingFlow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SUNGAZE APP/package.json/src/app/components/onboarding/OnboardingFlow.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function DemoOnboardingPage() {
    _s();
    const [showOnboarding, setShowOnboarding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const handleOnboardingComplete = ()=>{
        setShowOnboarding(false);
        // Redirect to main app after onboarding
        window.location.href = '/';
    };
    const resetDemo = ()=>{
        setShowOnboarding(true);
    };
    if (showOnboarding) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$src$2f$app$2f$components$2f$onboarding$2f$OnboardingFlow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OnboardingFlow"], {
            onComplete: handleOnboardingComplete
        }, void 0, false, {
            fileName: "[project]/SUNGAZE APP/package.json/src/app/demo-onboarding/page.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 p-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-4xl mx-auto",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-4xl font-bold text-white mb-4",
                        children: "Onboarding Complete!"
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/demo-onboarding/page.tsx",
                        lineNumber: 29,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xl text-blue-300 mb-8",
                        children: "Welcome to your personalized SUNGAZE journey!"
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/demo-onboarding/page.tsx",
                        lineNumber: 30,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SUNGAZE__APP$2f$package$2e$json$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: resetDemo,
                        className: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-yellow-400 hover:to-orange-400 transition-all",
                        children: "Try Onboarding Again"
                    }, void 0, false, {
                        fileName: "[project]/SUNGAZE APP/package.json/src/app/demo-onboarding/page.tsx",
                        lineNumber: 31,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/SUNGAZE APP/package.json/src/app/demo-onboarding/page.tsx",
                lineNumber: 28,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/SUNGAZE APP/package.json/src/app/demo-onboarding/page.tsx",
            lineNumber: 27,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/SUNGAZE APP/package.json/src/app/demo-onboarding/page.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_s(DemoOnboardingPage, "6SZULuPty8l2KHbbJMfGXOAr8zA=");
_c = DemoOnboardingPage;
var _c;
__turbopack_context__.k.register(_c, "DemoOnboardingPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=SUNGAZE%20APP_package_json_src_app_90310f52._.js.map