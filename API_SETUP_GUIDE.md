# SUNGAZE APP - API INTEGRATION SETUP GUIDE

## 🚀 Quick Setup Instructions

### Step 1: Create Environment File
Create a `.env.local` file in your project root with the following variables:

```bash
# Copy this template and replace with your actual API keys
```

## 📋 Required Environment Variables

### 🔥 STRIPE PAYMENT INTEGRATION
```bash
# Get these from: https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Stripe Price IDs for different tiers
STRIPE_FOUNDER_PRICE_ID=price_your_founder_price_id_here
STRIPE_PREMIUM_PRICE_ID=price_your_premium_price_id_here
STRIPE_MONTHLY_PRICE_ID=price_your_monthly_price_id_here
```

### 🌍 FLUTTERWAVE PAYMENT INTEGRATION (Africa)
```bash
# Get these from: https://dashboard.flutterwave.com/settings/api-keys
FLUTTERWAVE_SECRET_KEY=FLWSECK_TEST_your_flutterwave_secret_key_here
NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_TEST_your_flutterwave_public_key_here
FLUTTERWAVE_ENCRYPTION_KEY=your_flutterwave_encryption_key_here
```

### 🎤 ELEVENLABS VOICE SYNTHESIS
```bash
# Get these from: https://elevenlabs.io/app/settings/api-keys
NEXT_PUBLIC_ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
NEXT_PUBLIC_ELEVENLABS_VOICE_ID=your_elevenlabs_voice_id_here

# Voice settings for different meditation types
ELEVENLABS_MEDITATION_VOICE_ID=your_meditation_voice_id_here
ELEVENLABS_GUIDANCE_VOICE_ID=your_guidance_voice_id_here
```

### 🗄️ DATABASE CONFIGURATION
```bash
# Option 1: Supabase (Recommended for quick setup)
DATABASE_URL=postgresql://username:password@db.supabase.co:5432/postgres
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Option 2: PlanetScale (MySQL)
# DATABASE_URL=mysql://username:password@host:port/database

# Option 3: MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sungaze
```

### 🔐 AUTHENTICATION & SECURITY
```bash
# JWT Secret for session management
JWT_SECRET=your_super_secret_jwt_key_here_minimum_32_characters

# NextAuth.js configuration
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your_nextauth_secret_here
```

## 🔑 Supabase Password Reset (Required for “Forgot Password”)

If “Forgot Password → Send Reset Link” errors or no email arrives, it’s almost always because **the reset redirect URL is not allowlisted** in Supabase.

### 1) Set a stable app URL

In `.env.local` (and in Vercel env vars), set:

```bash
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

The app uses `NEXT_PUBLIC_APP_URL` to build redirect URLs for Supabase emails (avoids `window.location.origin` differences on mobile/Capacitor).

### 2) Allowlist reset redirect URL(s) in Supabase

In **Supabase Dashboard → Authentication → URL Configuration**:

- **Site URL**: `https://yourdomain.com`
- **Additional Redirect URLs**: add the routes you use:
  - `https://yourdomain.com/reset-password`
  - `https://www.yourdomain.com/reset-password` (if you use `www`)
  - `http://localhost:3001/reset-password` (local dev)

If testing inside a **Capacitor Android** WebView, also allowlist common WebView origins:
- `https://localhost/reset-password`
- `http://localhost/reset-password`
- `capacitor://localhost/reset-password`

### 3) Confirm email delivery is enabled

In **Supabase Dashboard → Authentication**:
- Ensure an **Email provider** is enabled (default provider or SMTP configured).
- In **Email Templates → Reset Password**, ensure it’s enabled and uses the default reset link.
- Check **Auth logs** after a reset attempt to confirm whether it was blocked by redirect allowlist or email provider.

### ☀️ SOLAR DATA APIS
```bash
# Sun position and timing data
SOLAR_API_KEY=your_solar_api_key_here
WEATHER_API_KEY=your_weather_api_key_here
```

### 📁 FILE STORAGE & CDN
```bash
# For storing user uploads and voice recordings
AWS_ACCESS_KEY_ID=your_aws_access_key_here
AWS_SECRET_ACCESS_KEY=your_aws_secret_key_here
AWS_REGION=us-east-1
AWS_S3_BUCKET=sungaze-app-uploads

# Alternative: Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 📊 ANALYTICS & MONITORING
```bash
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Sentry for error tracking
SENTRY_DSN=your_sentry_dsn_here
```

### 📧 EMAIL SERVICES
```bash
# SendGrid for transactional emails
SENDGRID_API_KEY=your_sendgrid_api_key_here
SENDGRID_FROM_EMAIL=noreply@sungaze.app

# Alternative: Resend
RESEND_API_KEY=your_resend_api_key_here
```

### ⚙️ APP CONFIGURATION
```bash
# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=Sungaze App

# Feature flags
NEXT_PUBLIC_ENABLE_VOICE_SYNTHESIS=true
NEXT_PUBLIC_ENABLE_PAYMENTS=true
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_DEBUG_MODE=true

# Development settings
NODE_ENV=development
DEBUG=sungaze:*
```

### 💰 PRICING CONFIGURATION
```bash
# Founder tier pricing (USD)
FOUNDER_PRICE_USD=44
FOUNDER_PRICE_NGN=48400
FOUNDER_PRICE_KES=6600

# Premium tier pricing (USD)
PREMIUM_PRICE_USD=19
PREMIUM_PRICE_NGN=20900
PREMIUM_PRICE_KES=2850

# Monthly subscription pricing (USD)
MONTHLY_PRICE_USD=9
MONTHLY_PRICE_NGN=9900
MONTHLY_PRICE_KES=1350
```

## 🛠️ API Setup Instructions

### 1. Stripe Setup
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Copy your test keys
3. Create products and price IDs for your tiers
4. Set up webhook endpoints

### 2. Flutterwave Setup
1. Go to [Flutterwave Dashboard](https://dashboard.flutterwave.com/settings/api-keys)
2. Copy your test keys
3. Set up webhook URLs

### 3. ElevenLabs Setup
1. Go to [ElevenLabs](https://elevenlabs.io/app/settings/api-keys)
2. Create an API key
3. Choose or create voice IDs for meditation

### 4. Database Setup (Supabase Recommended)
1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Copy the connection details
4. Set up tables for users, subscriptions, etc.

## 🔧 Next Steps

1. **Create `.env.local`** file with your actual API keys
2. **Update API integrations** to use real endpoints instead of mocks
3. **Set up database tables** for user data and subscriptions
4. **Test payment flows** with test cards
5. **Configure webhooks** for payment confirmations

## 🚨 Security Notes

- Never commit `.env.local` to version control
- Use test keys for development
- Rotate keys regularly
- Use environment-specific configurations
- Enable webhook signature verification

## 📞 Support

If you need help setting up any of these integrations, I can help you:
- Configure the actual API calls
- Set up database schemas
- Implement webhook handlers
- Test payment flows
- Debug integration issues














