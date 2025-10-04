// Script to reset onboarding data for testing
// Run this in browser console to see onboarding again

if (typeof window !== 'undefined') {
  // Clear all onboarding and consent data
  localStorage.removeItem('sungaze_consent');
  localStorage.removeItem('solar_oracle_onboarding');
  localStorage.removeItem('sungaze_permissions');
  localStorage.removeItem('sungaze_location');
  
  console.log('✅ Onboarding data cleared! Refresh the page to see onboarding.');
  console.log('🔄 Refreshing page in 2 seconds...');
  
  setTimeout(() => {
    window.location.reload();
  }, 2000);
} else {
  console.log('This script should be run in the browser console');
}
