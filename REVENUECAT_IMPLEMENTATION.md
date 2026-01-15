# RevenueCat In-App Subscriptions Implementation

## Overview
This implementation adds RevenueCat-powered in-app subscriptions that work on both iOS (App Store) and Android (Google Play).

## Files Created/Updated

### 1. RevenueCat Service
**File:** `src/app/services/revenuecat.service.ts`
- Initializes RevenueCat SDK
- Fetches subscription offerings
- Handles purchases
- Restores purchases
- Checks subscription status
- Opens platform subscription management

### 2. Subscription Context
**File:** `src/app/contexts/SubscriptionContext.tsx`
- Provides subscription status throughout the app
- Auto-initializes RevenueCat on app start
- Listens for auth state changes
- Exports `useSubscription()` hook

### 3. Updated Onboarding Paywall
**File:** `src/app/components/onboarding/OnboardingPaywall.tsx`
- Fetches real subscription options from RevenueCat
- Displays three subscription tiers with real prices
- Handles purchase flow with loading states
- Shows restore purchases option
- Handles errors gracefully

### 4. Updated Membership Screen
**File:** `src/app/components/settings/MembershipScreen.tsx`
- Shows current subscription status from RevenueCat
- "Manage Subscription" button (opens App Store/Google Play)
- "Restore Purchases" button
- Displays subscription details

### 5. Layout Update
**File:** `src/app/layout.tsx`
- Wrapped with `SubscriptionProviderWrapper` to provide subscription context

### 6. Provider Wrapper
**File:** `src/app/providers/SubscriptionProviderWrapper.tsx`
- Client component wrapper for SubscriptionProvider

### 7. Example Component
**File:** `src/app/components/examples/SubscriptionExample.tsx`
- Shows how to use subscription context
- Example of premium feature gating

## Setup Instructions

### 1. Add RevenueCat API Key
Add to your `.env.local` or environment variables:
```
NEXT_PUBLIC_REVENUECAT_API_KEY=your_revenuecat_api_key_here
```

### 2. Configure RevenueCat Dashboard
1. Go to https://app.revenuecat.com
2. Create/select your project
3. Add your app (iOS and Android)
4. Create products (must match App Store Connect product IDs):
   - `com.sungaze.premium.monthly` - Monthly subscription
   - `com.sungaze.premium.yearly` - Annual subscription  
   - `com.sungaze.founder44` - One-time purchase
5. Create an entitlement: `premium`
6. Attach products to the entitlement
7. Get your API key from Settings → API Keys

### 3. Enable Payments
Update `src/app/lib/featureFlags.ts`:
```typescript
export const PAYMENTS_ENABLED = true;
```

## Usage Examples

### Check Subscription Status
```typescript
import { useSubscription } from '../contexts/SubscriptionContext';

function MyComponent() {
  const { isPremium, isLoading, subscriptionStatus } = useSubscription();

  if (isLoading) return <div>Loading...</div>;
  
  if (!isPremium) {
    return <div>Upgrade to premium</div>;
  }

  return <div>Premium content</div>;
}
```

### Lock Premium Features
```typescript
import { PremiumFeature } from '../components/examples/SubscriptionExample';

function MyFeature() {
  return (
    <PremiumFeature>
      <div>This is premium content</div>
    </PremiumFeature>
  );
}
```

### Purchase Subscription
The OnboardingPaywall component handles purchases automatically. Users can:
1. Select a plan
2. Click "Start My Transformation"
3. Complete purchase through App Store/Google Play
4. Automatically get premium access

### Restore Purchases
Users can restore purchases from:
- Onboarding paywall screen (bottom link)
- Membership settings screen (button)

### Manage Subscription
Users can manage subscriptions from:
- Membership settings screen → "Manage Subscription" button
- Opens App Store (iOS) or Google Play (Android) subscription management

## Subscription Products

### Monthly Premium
- **Product ID:** `monthly_premium`
- **Price:** $4.99/month
- **Features:** All premium features, billed monthly

### Annual Premium  
- **Product ID:** `annual_premium`
- **Price:** $29.99/year
- **Features:** All premium features, save 40%
- **Badge:** "MOST POPULAR"

### Lifetime
- **Product ID:** `lifetime_premium`
- **Price:** $99 one-time
- **Features:** Lifetime access, all future updates
- **Badge:** "FOUNDER 444"

## Testing

### Sandbox Testing
RevenueCat automatically uses sandbox for testing:
- iOS: Use sandbox test accounts in App Store Connect
- Android: Use test accounts in Google Play Console

### Test Mode
The service logs all events to console for debugging:
- Purchase attempts
- Subscription status checks
- Restore operations
- Errors

## Error Handling

All functions include try/catch blocks and:
- Log errors to console
- Show user-friendly error messages
- Handle cancellation gracefully
- Provide fallback states

## Platform Support

- ✅ iOS (App Store)
- ✅ Android (Google Play)
- ⚠️ Web (shows "Coming Soon" if payments disabled)

## Next Steps

1. Add your RevenueCat API key to environment variables
2. Configure products in RevenueCat dashboard
3. Test purchases in sandbox mode
4. Update `PAYMENTS_ENABLED` to `true` when ready
5. Test on real devices before production

## Troubleshooting

### "No subscription offerings available"
- Check RevenueCat dashboard has products configured
- Verify API key is correct
- Check products are attached to entitlements

### "RevenueCat not initialized"
- Ensure `PAYMENTS_ENABLED = true`
- Check API key is set
- Verify running on native platform (not web)

### Purchase fails
- Check sandbox test account is set up
- Verify products exist in App Store Connect/Google Play Console
- Check RevenueCat dashboard for errors


