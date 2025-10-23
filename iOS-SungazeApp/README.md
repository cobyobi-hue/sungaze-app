# SUNGAZE iOS App Setup Guide

## Overview
This SwiftUI iOS app integrates with your existing Next.js backend and uses Stripe's native iOS SDK for payments, replacing the web-based Stripe Checkout that Apple rejects.

## Features
- ✅ Native SwiftUI interface matching your web app design
- ✅ Stripe PaymentSheet with Apple Pay integration
- ✅ Authentication with your existing Next.js backend
- ✅ Apple Sign In and email/password authentication
- ✅ Premium subscription flow

## Setup Instructions

### 1. Install Stripe iOS SDK
Add the Stripe iOS SDK to your Xcode project:

**Option A: Swift Package Manager (Recommended)**
1. Open Xcode
2. File → Add Package Dependencies
3. Enter: `https://github.com/stripe/stripe-ios`
4. Select version 24.0.0 or later

**Option B: CocoaPods**
Add to your `Podfile`:
```ruby
pod 'StripePaymentSheet'
```

### 2. Configure Your Backend API
Update the API endpoints in the iOS app:

**In `APIService.swift`:**
```swift
private let backendURL = "https://your-nextjs-backend.com/api"
```

**In `StripePaymentService.swift`:**
```swift
private let backendURL = "https://your-nextjs-backend.com/api"
private let publishableKey = "pk_test_your_stripe_publishable_key_here"
```

### 3. Required Backend Endpoints
Your Next.js backend needs these endpoints:

#### Authentication Endpoints:
- `POST /api/auth/signin` - Email/password login
- `POST /api/auth/apple` - Apple Sign In
- `GET /api/auth/validate` - Token validation

#### Payment Endpoints:
- `POST /api/payments/create-payment-intent` - Create Stripe PaymentIntent

### 4. Apple Pay Configuration
1. **Apple Developer Account:**
   - Enable Apple Pay capability
   - Create Merchant ID: `merchant.com.sungaze.app`
   - Update in `StripePaymentService.swift`

2. **Stripe Dashboard:**
   - Add Apple Pay domain
   - Configure Apple Pay settings

### 5. Stripe Configuration
Update your Stripe keys:

```swift
// In StripePaymentService.swift
private let publishableKey = "pk_live_your_live_key_here" // For production
private let publishableKey = "pk_test_your_test_key_here" // For development
```

### 6. Bundle Identifier
Update the bundle identifier in Xcode:
- Target → General → Bundle Identifier: `com.sungaze.app`

## Backend Integration Example

### Payment Intent Endpoint (Next.js)
```javascript
// pages/api/payments/create-payment-intent.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const { amount, currency = 'usd', metadata = {} } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: currency,
      metadata: metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
}
```

### Authentication Endpoint (Next.js)
```javascript
// pages/api/auth/signin.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const { email, password } = req.body;
    
    // Your existing authentication logic
    const user = await authenticateUser(email, password);
    
    if (user) {
      const token = generateJWT(user);
      res.status(200).json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        token: token,
      });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

## Testing

### Test Cards (Stripe Test Mode)
- **Success:** 4242 4242 4242 4242
- **Decline:** 4000 0000 0000 0002
- **Requires Authentication:** 4000 0025 0000 3155

### Apple Pay Testing
- Use iOS Simulator with Apple Pay enabled
- Test with sandbox Apple ID

## App Store Submission

### Required Capabilities
1. **Apple Pay** - Enable in Xcode capabilities
2. **Push Notifications** - For payment confirmations
3. **Background Modes** - For payment processing

### App Store Review Notes
- Clearly explain the subscription model
- Provide test account credentials
- Include screenshots of payment flow
- Document Apple Pay integration

## Security Considerations

1. **API Keys:** Never commit publishable keys to version control
2. **Token Storage:** Use Keychain for sensitive data
3. **Certificate Pinning:** Consider for production
4. **Backend Validation:** Always validate payments server-side

## Troubleshooting

### Common Issues:
1. **Payment Sheet Not Showing:** Check Stripe configuration
2. **Apple Pay Not Available:** Verify Merchant ID setup
3. **Authentication Failing:** Check backend endpoints
4. **Build Errors:** Ensure Stripe SDK is properly linked

### Debug Mode:
Enable debug logging in `StripePaymentService.swift`:
```swift
StripeAPI.defaultPublishableKey = publishableKey
StripeAPI.logLevel = .debug
```

## Next Steps

1. **Customize UI:** Match your brand colors and fonts
2. **Add Features:** Implement meditation timers, progress tracking
3. **Analytics:** Add Firebase or Mixpanel
4. **Push Notifications:** Implement payment confirmations
5. **Testing:** Set up TestFlight for beta testing

## Support

For Stripe iOS SDK issues:
- [Stripe iOS Documentation](https://stripe.com/docs/payments/accept-a-payment?platform=ios)
- [Stripe iOS GitHub](https://github.com/stripe/stripe-ios)

For SwiftUI questions:
- [Apple SwiftUI Documentation](https://developer.apple.com/documentation/swiftui)
