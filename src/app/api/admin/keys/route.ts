import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const { openai, stripe, stripeWebhook } = await request.json();

    // Read current .env.local
    const envPath = join(process.cwd(), '.env.local');
    let envContent = '';
    
    try {
      envContent = readFileSync(envPath, 'utf8');
    } catch {
      // File doesn't exist, start fresh
      envContent = '';
    }

    // Update or add the keys
    const updateEnvKey = (content: string, key: string, value: string) => {
      const regex = new RegExp(`^${key}=.*$`, 'm');
      if (regex.test(content)) {
        return content.replace(regex, `${key}=${value}`);
      } else {
        return content + `\n${key}=${value}`;
      }
    };

    if (openai) {
      envContent = updateEnvKey(envContent, 'OPENAI_API_KEY', openai);
    }
    if (stripe) {
      envContent = updateEnvKey(envContent, 'STRIPE_SECRET_KEY', stripe);
    }
    if (stripeWebhook) {
      envContent = updateEnvKey(envContent, 'STRIPE_WEBHOOK_SECRET', stripeWebhook);
    }

    // Write back to .env.local
    writeFileSync(envPath, envContent.trim());

    console.log('API keys updated successfully');
    return NextResponse.json({ success: true, message: 'Keys saved successfully' });

  } catch (error) {
    console.error('Failed to save keys:', error);
    return NextResponse.json({ error: 'Failed to save keys' }, { status: 500 });
  }
}