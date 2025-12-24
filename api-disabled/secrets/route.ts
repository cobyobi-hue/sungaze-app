import { NextRequest, NextResponse } from 'next/server';

// This API is disabled - returning 410 Gone
export async function GET(request: NextRequest) {
  return NextResponse.json(
    { 
      error: 'This endpoint has been disabled.',
      code: 'ENDPOINT_DISABLED'
    },
    { status: 410 }
  );
}

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { 
      error: 'This endpoint has been disabled.',
      code: 'ENDPOINT_DISABLED'
    },
    { status: 410 }
  );
}

export async function PUT(request: NextRequest) {
  return NextResponse.json(
    { 
      error: 'This endpoint has been disabled.',
      code: 'ENDPOINT_DISABLED'
    },
    { status: 410 }
  );
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json(
    { 
      error: 'This endpoint has been disabled.',
      code: 'ENDPOINT_DISABLED'
    },
    { status: 410 }
  );
}