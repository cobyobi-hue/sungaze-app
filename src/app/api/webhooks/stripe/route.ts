import { NextRequest, NextResponse } from 'next/server';

// This endpoint has been removed - Stripe payments are no longer used
// Use RevenueCat for in-app subscriptions instead
export async function POST(request: NextRequest) {
  return NextResponse.json(
    { 
      error: 'This endpoint has been removed. Please use RevenueCat for in-app subscriptions.',
      code: 'ENDPOINT_REMOVED'
    },
    { status: 410 }
  );
}
