# Email Verification Setup Guide

This guide explains how to set up email verification using Resend for the Sungaze app.

## Prerequisites

1. **Install Resend package:**
   ```bash
   npm install resend
   ```

2. **Get Resend API Key:**
   - Sign up at [resend.com](https://resend.com)
   - Create an API key in your dashboard
   - Add it to your `.env.local` file

3. **Configure Supabase (Optional but Recommended):**
   - Get your Supabase Service Role Key from your Supabase dashboard
   - This allows generating proper verification links

## Environment Variables

Add these to your `.env.local` file:

```bash
# Resend API Key (Required)
RESEND_API_KEY=re_your_resend_api_key_here

# From Email Address (Required)
# Must be a verified domain in Resend, or use Resend's test domain
SENDGRID_FROM_EMAIL=Sungaze <noreply@sungaze.app>
# OR for testing:
# SENDGRID_FROM_EMAIL=onboarding@resend.dev

# Supabase Service Role Key (Optional - for better verification links)
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# App URL (Required for verification links)
NEXT_PUBLIC_APP_URL=https://app.sungazeapp.com
# OR for local development:
# NEXT_PUBLIC_APP_URL=http://localhost:3001
```

## How It Works

1. **User Signs Up:**
   - User creates an account in `AuthScreen.tsx`
   - Account is created in Supabase
   - User profile is created in the database

2. **Verification Email Sent:**
   - `AuthScreen` calls `/api/auth/send-verification-email`
   - API route generates a verification link using Supabase admin API
   - Email is sent via Resend with a beautiful HTML template

3. **User Verifies Email:**
   - User clicks the verification link in their email
   - Link goes to `/auth/callback` (Supabase's standard callback)
   - Supabase handles the verification automatically
   - User is redirected to the app

## Email Template

The verification email includes:
- Beautiful gradient design matching the app theme
- Clear call-to-action button
- Fallback link if button doesn't work
- 24-hour expiration notice

## Testing

1. **Test Email Sending:**
   - Sign up with a real email address
   - Check your inbox for the verification email
   - Click the verification link

2. **Test with Resend Test Domain:**
   - For development, you can use `onboarding@resend.dev` as the from address
   - This works without domain verification

3. **Check Logs:**
   - Check browser console for any errors
   - Check server logs for API route errors
   - Check Resend dashboard for email delivery status

## Troubleshooting

### Emails Not Sending

1. **Check RESEND_API_KEY:**
   - Make sure it's set in `.env.local`
   - Restart your dev server after adding it
   - Verify the key is valid in Resend dashboard

2. **Check From Email:**
   - Must be a verified domain in Resend
   - Or use `onboarding@resend.dev` for testing

3. **Check Supabase Service Key:**
   - If not set, verification links will still work but may be less secure
   - The system will fall back to basic callback links

### Verification Links Not Working

1. **Check NEXT_PUBLIC_APP_URL:**
   - Must match your actual app URL
   - For localhost, use `http://localhost:3001`
   - For production, use your actual domain

2. **Check Supabase Configuration:**
   - Make sure `NEXT_PUBLIC_SUPABASE_URL` is set
   - Make sure `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set

## Developer Bypass

The email verification is automatically bypassed for `cobyobi@gmail.com` for development purposes.

## Production Checklist

- [ ] Install `resend` package
- [ ] Set `RESEND_API_KEY` in production environment
- [ ] Verify your domain in Resend
- [ ] Set `SENDGRID_FROM_EMAIL` to your verified domain
- [ ] Set `NEXT_PUBLIC_APP_URL` to your production URL
- [ ] Set `SUPABASE_SERVICE_ROLE_KEY` for better security
- [ ] Test email delivery in production
- [ ] Monitor Resend dashboard for delivery rates

## Alternative: Using SendGrid

If you prefer SendGrid instead of Resend:

1. Install SendGrid: `npm install @sendgrid/mail`
2. Update the API route to use SendGrid instead of Resend
3. Set `SENDGRID_API_KEY` in your environment variables

The current implementation uses Resend for simplicity and modern API design.

