import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase admin client for generating verification links
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(request: NextRequest) {
  try {
    const { email, userId } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Dynamically import Resend
    let Resend: any;
    try {
      const resendModule = await import('resend');
      Resend = resendModule.Resend || resendModule.default?.Resend || resendModule.default;
    } catch (error) {
      console.error('Failed to import resend:', error);
      return NextResponse.json(
        { error: 'Email service not available. Please install resend package.' },
        { status: 500 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json(
        { error: 'Email service not configured. Please set RESEND_API_KEY.' },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    // Generate verification link using Supabase admin API
    let verificationLink = '';
    
    if (supabaseUrl && supabaseServiceKey) {
      try {
        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
          auth: {
            autoRefreshToken: false,
            persistSession: false
          }
        });

        // Generate a signup confirmation link
        const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
          type: 'signup',
          email: email,
        });

        if (!linkError && linkData?.properties?.action_link) {
          verificationLink = linkData.properties.action_link;
        } else {
          console.error('Error generating Supabase link:', linkError);
          // Fallback: create a verification link that will work with our custom handler
          const baseUrl = process.env.NEXT_PUBLIC_APP_URL || request.headers.get('origin') || 'http://localhost:3001';
          verificationLink = `${baseUrl}/auth/callback?token_hash=${crypto.randomUUID()}&type=email`;
        }
      } catch (error) {
        console.error('Supabase admin client error:', error);
        // Fallback: create a basic verification link
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || request.headers.get('origin') || 'http://localhost:3001';
        verificationLink = `${baseUrl}/auth/callback`;
      }
    } else {
      // Fallback if Supabase admin is not configured
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || request.headers.get('origin') || 'http://localhost:3001';
      verificationLink = `${baseUrl}/auth/callback`;
    }

    // Send email with Resend
    const fromEmail = process.env.SENDGRID_FROM_EMAIL || 'Sungaze <noreply@sungaze.app>';
    
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: 'Verify Your Sungaze Account',
      html: getVerificationEmailTemplate(verificationLink),
    });

    if (emailError) {
      console.error('Resend email error:', emailError);
      return NextResponse.json(
        { error: 'Failed to send verification email', details: emailError },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Verification email sent',
      emailId: emailData?.id 
    });

  } catch (error) {
    console.error('Send verification email error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

function getVerificationEmailTemplate(verificationLink: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Sungaze Account</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #1e293b 0%, #1e40af 50%, #312e81 100%);">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 40px 20px; text-align: center;">
            <table role="presentation" style="max-width: 600px; margin: 0 auto; background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(10px); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.1); padding: 40px;">
              <tr>
                <td style="text-align: center; padding-bottom: 30px;">
                  <div style="width: 80px; height: 80px; margin: 0 auto; border-radius: 50%; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 40px rgba(251, 191, 36, 0.5);">
                    <span style="color: #000; font-size: 32px; font-weight: bold;">44</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="text-align: center; padding-bottom: 20px;">
                  <h1 style="color: #fbbf24; font-size: 32px; font-weight: bold; margin: 0; text-shadow: 0 2px 10px rgba(251, 191, 36, 0.3);">SUNGAZE</h1>
                </td>
              </tr>
              <tr>
                <td style="color: #ffffff; font-size: 18px; line-height: 1.6; padding-bottom: 30px; text-align: center;">
                  <p style="margin: 0 0 20px 0;">Welcome to your solar transformation journey!</p>
                  <p style="margin: 0; opacity: 0.9;">Please verify your email address to activate your account and begin your path to enlightenment.</p>
                </td>
              </tr>
              <tr>
                <td style="text-align: center; padding-bottom: 30px;">
                  <a href="${verificationLink}" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #000000; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 16px rgba(251, 191, 36, 0.3); transition: all 0.3s;">
                    Verify Email Address
                  </a>
                </td>
              </tr>
              <tr>
                <td style="color: rgba(255, 255, 255, 0.7); font-size: 14px; line-height: 1.6; text-align: center; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                  <p style="margin: 0 0 10px 0;">If the button doesn't work, copy and paste this link into your browser:</p>
                  <p style="margin: 0; word-break: break-all;">
                    <a href="${verificationLink}" style="color: #fbbf24; text-decoration: underline;">${verificationLink}</a>
                  </p>
                  <p style="margin: 20px 0 0 0; font-size: 12px; opacity: 0.6;">This link will expire in 24 hours.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

