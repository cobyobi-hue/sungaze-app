// Script to test the complete onboarding → Founders → Solar Orbs flow
// Run this in browser console to see the full flow

if (typeof window !== 'undefined') {
  console.log('🧪 Testing Solar Orbs Flow...');
  
  // Clear all onboarding and consent data
  localStorage.removeItem('sungaze_consent');
  localStorage.removeItem('solar_oracle_onboarding');
  localStorage.removeItem('sungaze_permissions');
  localStorage.removeItem('sungaze_location');
  
  console.log('✅ Cleared onboarding data!');
  console.log('🔄 Refreshing page to start fresh flow...');
  console.log('');
  console.log('📋 Expected Flow:');
  console.log('1. Onboarding Screen (futuristic blue theme)');
  console.log('2. Founders Paywall (existing)');
  console.log('3. Solar Orbs System (144 orbs, OPEN app aesthetic)');
  console.log('');
  
  setTimeout(() => {
    window.location.reload();
  }, 2000);
} else {
  console.log('This script should be run in the browser console');
}
