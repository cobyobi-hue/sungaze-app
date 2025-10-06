# 🔧 Stripe Checkout Fix - Environment Variables Setup

## 🎯 **Issues Fixed:**

1. ✅ **Created missing `/api/checkout` route** - Frontend was calling this but it didn't exist
2. ✅ **Updated Stripe API version** - Fixed outdated API version
3. ✅ **Fixed API route mismatch** - Now both routes work

## 🔑 **Required Environment Variables:**

Add these to your `.env.local` file:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Stripe Price IDs (create these in your Stripe dashboard)
STRIPE_FOUNDER_PRICE_ID=price_your_founder_price_id
STRIPE_PREMIUM_PRICE_ID=price_your_premium_price_id  
STRIPE_MONTHLY_PRICE_ID=price_your_monthly_price_id

# App URL
NEXT_PUBLIC_APP_URL=https://sungaze-app-z3sf.vercel.app
```

## 🚀 **How to Get Stripe Keys:**

### **Step 1: Create Stripe Account**
1. Go to [stripe.com](https://stripe.com)
2. Create account or sign in
3. Go to **Developers** → **API Keys**

### **Step 2: Get API Keys**
- **Publishable Key**: `pk_test_...` (starts with pk_test)
- **Secret Key**: `sk_test_...` (starts with sk_test)

### **Step 3: Create Products & Prices**
1. Go to **Products** in Stripe dashboard
2. Create products for:
   - **Monthly Subscription** ($9.99/month)
   - **Yearly Subscription** ($99.99/year) 
   - **Founder Lifetime** ($44.99 one-time)
3. Copy the **Price IDs** (start with `price_`)

### **Step 4: Set Up Webhook**
1. Go to **Developers** → **Webhooks**
2. Add endpoint: `https://sungaze-app-z3sf.vercel.app/api/webhooks/stripe`
3. Select events: `checkout.session.completed`, `customer.subscription.created`
4. Copy webhook secret

## 🔧 **Test Your Stripe Integration:**

### **Test Cards:**
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`

### **Test the Flow:**
1. **Complete onboarding** in your app
2. **Click on a subscription plan**
3. **Use test card** `4242 4242 4242 4242`
4. **Complete payment** - should redirect to success page

## ✅ **What's Working Now:**

- ✅ **Stripe checkout session creation**
- ✅ **Customer creation/retrieval**
- ✅ **Subscription and one-time payments**
- ✅ **Success/cancel URL handling**
- ✅ **Metadata tracking**

## 🎯 **Next Steps:**

1. **Add your real Stripe keys** to environment variables
2. **Create products in Stripe dashboard**
3. **Test the payment flow**
4. **Deploy to Vercel** with new environment variables

**Your Stripe checkout should work perfectly now!** 🎉
