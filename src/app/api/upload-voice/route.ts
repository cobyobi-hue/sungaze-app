import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file received' }, { status: 400 });
    }

    // Ensure the directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'audio', 'personal');
    await mkdir(uploadDir, { recursive: true });

    // Convert the file to a buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Write the file
    const filePath = path.join(uploadDir, file.name);
    await writeFile(filePath, buffer);

    return NextResponse.json({ 
      success: true, 
      filename: file.name,
      path: `/audio/personal/${file.name}` 
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}