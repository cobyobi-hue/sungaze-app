'use client';

import { useState } from 'react';

export default function UploadVoicePage() {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setMessage('');

    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload-voice', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          setMessage(prev => prev + `✅ ${file.name} uploaded successfully\n`);
        } else {
          setMessage(prev => prev + `❌ Failed to upload ${file.name}\n`);
        }
      } catch (error) {
        setMessage(prev => prev + `❌ Error uploading ${file.name}: ${error}\n`);
      }
    }

    setUploading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-amber-900 mb-8 text-center">
          Upload Your Sacred Voice Recordings
        </h1>
        
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <div className="mb-6">
            <label 
              htmlFor="audio-files" 
              className="block text-lg font-medium text-amber-800 mb-4"
            >
              Select your MP3/WAV recordings:
            </label>
            <input
              id="audio-files"
              type="file"
              accept="audio/*"
              multiple
              onChange={handleFileUpload}
              disabled={uploading}
              className="block w-full text-sm text-amber-700
                file:mr-4 file:py-3 file:px-6
                file:rounded-full file:border-0
                file:text-sm file:font-medium
                file:bg-amber-100 file:text-amber-800
                hover:file:bg-amber-200
                disabled:opacity-50"
            />
          </div>

          {uploading && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-amber-500 border-t-transparent mx-auto"></div>
              <p className="text-amber-700 mt-2">Uploading your sacred recordings...</p>
            </div>
          )}

          {message && (
            <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <pre className="text-sm text-amber-800 whitespace-pre-wrap">{message}</pre>
            </div>
          )}

          <div className="mt-8 text-sm text-amber-700">
            <h3 className="font-medium mb-2">Expected file names:</h3>
            <ul className="space-y-1 text-xs">
              <li>• sacred-preparation.mp3 (~25 seconds)</li>
              <li>• session-complete.mp3 (~8 seconds)</li>
              <li>• palming-intro.mp3 (~15 seconds)</li>
              <li>• palm-warming.mp3 (~20 seconds)</li>
              <li>• eye-sanctuary.mp3 (~18 seconds)</li>
              <li>• inner-sun.mp3 (~25 seconds)</li>
              <li>• barefoot-invitation.mp3 (~12 seconds)</li>
              <li>• earth-connection.mp3 (~30 seconds)</li>
              <li>• transition-blessing.mp3 (~10 seconds)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}