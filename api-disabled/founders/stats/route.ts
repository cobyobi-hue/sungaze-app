import { NextResponse } from 'next/server';

// This API is disabled - returning 410 Gone
export async function GET() {
  return NextResponse.json(
    { 
      error: 'This endpoint has been disabled.',
      code: 'ENDPOINT_DISABLED'
    },
    { status: 410 }
  );
}

export async function POST() {
  return NextResponse.json(
    { 
      error: 'This endpoint has been disabled.',
      code: 'ENDPOINT_DISABLED'
    },
    { status: 410 }
  );
}