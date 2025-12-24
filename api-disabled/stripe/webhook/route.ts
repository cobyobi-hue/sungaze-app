import { NextRequest, NextResponse } from 'next/server';

// This API is disabled - Stripe webhook is no longer used
export async function POST(request: NextRequest) {
  return NextResponse.json({ error: 'Stripe webhook is disabled' }, { status: 410 });
}
