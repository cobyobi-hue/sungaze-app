import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Check if request has body
    const body = await req.text();
    if (!body) {
      return NextResponse.json({ error: 'Request body is required' }, { status: 400 });
    }
    
    let parsedBody;
    try {
      parsedBody = JSON.parse(body);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 });
    }
    
    const { storagePath } = parsedBody;
    
    if (!storagePath) {
      return NextResponse.json({ error: 'Storage path is required' }, { status: 400 });
    }

    // Since the bucket is public, we can construct the direct URL
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    
    if (!supabaseUrl) {
      return NextResponse.json({ error: 'Supabase URL not configured' }, { status: 500 });
    }

    // Extract just the filename from the path
    const fileName = storagePath.includes('/') 
      ? storagePath.split('/').pop() 
      : storagePath;
    
    console.log('Generating public URL for:', fileName);
    console.log('Full storage path:', storagePath);
    
    // Construct the public URL for the file
    const publicUrl = `${supabaseUrl}/storage/v1/object/public/audio/${encodeURIComponent(fileName!)}`;
    
    console.log('Public URL:', publicUrl);

    return NextResponse.json({ url: publicUrl });
  } catch (error: any) {
    console.error('Error in audio URL endpoint:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}