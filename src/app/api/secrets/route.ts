import { NextRequest, NextResponse } from 'next/server';
import { getSecret, setSecret, deleteSecret, rotateSecret, listSecrets, getSecretInfo } from '../../lib/secrets-vault';

// Simple auth - in production you'd use proper authentication
const ADMIN_TOKEN = process.env.SECRETS_ADMIN_TOKEN || 'sungaze-admin-change-me';

function isAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');
  return token === ADMIN_TOKEN;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  try {
    if (key) {
      // Get specific secret info (not the actual value)
      const info = getSecretInfo(key);
      if (!info) {
        return NextResponse.json({ error: 'Secret not found' }, { status: 404 });
      }
      return NextResponse.json({ secret: info });
    } else {
      // List all secret keys
      const keys = listSecrets();
      const secretsInfo = keys.map(k => getSecretInfo(k)).filter(Boolean);
      return NextResponse.json({ secrets: secretsInfo });
    }
  } catch (error) {
    console.error('Secrets API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { key, value, encrypt = true } = await request.json();

    if (!key || !value) {
      return NextResponse.json({ error: 'Key and value are required' }, { status: 400 });
    }

    await setSecret(key, value, encrypt);
    return NextResponse.json({ message: 'Secret stored successfully', key });
  } catch (error) {
    console.error('Store secret error:', error);
    return NextResponse.json({ error: 'Failed to store secret' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { key, value } = await request.json();

    if (!key || !value) {
      return NextResponse.json({ error: 'Key and value are required' }, { status: 400 });
    }

    await rotateSecret(key, value);
    return NextResponse.json({ message: 'Secret rotated successfully', key });
  } catch (error) {
    console.error('Rotate secret error:', error);
    return NextResponse.json({ error: 'Failed to rotate secret' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  if (!key) {
    return NextResponse.json({ error: 'Key is required' }, { status: 400 });
  }

  try {
    const deleted = await deleteSecret(key);
    if (!deleted) {
      return NextResponse.json({ error: 'Secret not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Secret deleted successfully', key });
  } catch (error) {
    console.error('Delete secret error:', error);
    return NextResponse.json({ error: 'Failed to delete secret' }, { status: 500 });
  }
}