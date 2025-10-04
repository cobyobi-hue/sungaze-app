"use client";

export default function TestApp() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Sungaze App</h1>
        <p className="text-lg">Basic app is working. Testing for errors...</p>
        <div className="mt-8 p-4 bg-green-600/20 rounded-lg">
          <p className="text-green-300">✅ No internal server error</p>
        </div>
      </div>
    </div>
  );
}