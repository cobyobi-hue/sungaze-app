import { NextRequest, NextResponse } from 'next/server';

// Email verification API endpoint
// Currently disabled for app store review - kept for future use
export async function POST(request: NextRequest) {
  try {
    const { email, userId } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Email verification disabled for app store review
    // This endpoint is kept for future use but currently returns success without sending emails
    // To re-enable: uncomment the Resend import and email sending code below
    return NextResponse.json({ 
      success: true, 
      message: 'Email verification is currently disabled for app store review'
    });

    /* 
    // FUTURE USE: Uncomment below to re-enable email verification
    import { Resend } from 'resend';
    import { createClient } from '@supabase/supabase-js';

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json(
        { error: 'Email service not configured. Please set RESEND_API_KEY.' },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);
    
    // Generate verification link and send email...
    // (Full implementation code preserved in git history)
    */
  } catch (error) {
    console.error('Send verification email error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
