import { NextRequest, NextResponse } from 'next/server';

// This API is disabled - returning 410 Gone
export async function POST(request: NextRequest) {
  return NextResponse.json(
    { 
      error: 'This endpoint has been disabled.',
      code: 'ENDPOINT_DISABLED'
    },
    { status: 410 }
  );
}
