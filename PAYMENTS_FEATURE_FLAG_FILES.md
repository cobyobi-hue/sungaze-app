# Files to Update for PAYMENTS_ENABLED Feature Flag

## 1. Create/Update Config File
**File:** `src/app/lib/config.ts` or create new `src/app/lib/featureFlags.ts`
- Add: `export const PAYMENTS_ENABLED = false;`

## 2. Onboarding Flow
**File:** `src/app/components/onboarding/OnboardingFlow.tsx`
- Skip the paywall step (index 6) if PAYMENTS_ENABLED is false
- Filter out OnboardingPaywall from steps array

## 3. Onboarding Paywall Component
**File:** `src/app/components/onboarding/OnboardingPaywall.tsx`
- Conditionally render or return null if PAYMENTS_ENABLED is false
- Or skip this step entirely in OnboardingFlow

## 4. Paywall Modal
**File:** `src/app/components/PaywallModal.tsx`
- Return null early if PAYMENTS_ENABLED is false
- Hide all payment options

## 5. Membership Screen
**File:** `src/app/components/settings/MembershipScreen.tsx`
- Hide upgrade/cancel buttons if PAYMENTS_ENABLED is false
- Show message that payments are disabled
- Or hide entire screen from ProfileScreen

## 6. Profile Screen
**File:** `src/app/components/ProfileScreen.tsx`
- Conditionally hide "Membership" settings item if PAYMENTS_ENABLED is false

## 7. Upgrade Prompt Modal
**File:** `src/app/components/premium/UpgradePromptModal.tsx`
- Return null early if PAYMENTS_ENABLED is false
- Hide upgrade buttons

## 8. Premium Gate Component
**File:** `src/app/components/PremiumGate.tsx`
- Hide upgrade button if PAYMENTS_ENABLED is false
- Still show the gate message but without upgrade option

## 9. Premium Ritual Timer
**File:** `src/app/components/PremiumRitualTimer.tsx`
- Don't show upgrade prompts if PAYMENTS_ENABLED is false
- Hide UpgradePromptModal

## 10. Solar Orbs System
**File:** `src/app/components/SolarOrbsSystem.tsx`
- Hide upgrade button if PAYMENTS_ENABLED is false

## 11. Truth Scrolls
**File:** `src/app/components/TruthScrollsNew.tsx`
- Hide upgrade button if PAYMENTS_ENABLED is false

## 12. Main App Page
**File:** `src/app/page.tsx`
- Conditionally hide PaywallModal if PAYMENTS_ENABLED is false
- Don't show paywall modals

## 13. Other Components with Upgrade Prompts
**Files to check:**
- `src/app/components/audio/PremiumSoundscapes.tsx` - hide upgrade prompts
- `src/app/components/premium/WeeklyMeditationScroll.tsx` - hide upgrade prompts
- Any other components that call `showUpgradePrompt` or `onUpgrade`

## Summary
Total files to update: ~13-15 files
Main areas:
1. Config file (create flag)
2. Onboarding flow (skip paywall step)
3. All paywall/subscription modals (return null if disabled)
4. All upgrade buttons/prompts (hide if disabled)
5. Membership screen (hide or disable if disabled)


