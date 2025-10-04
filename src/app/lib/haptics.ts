// Haptic feedback utilities for mobile app
export const triggerHaptic = (type: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error') => {
  // For iOS WebView - trigger native haptic through custom message
  if (window.webkit?.messageHandlers?.haptic) {
    window.webkit.messageHandlers.haptic.postMessage({ type });
    return;
  }

  // Fallback to Vibration API for Android
  if ('vibrate' in navigator) {
    const patterns = {
      light: [10],
      medium: [20],
      heavy: [30],
      success: [10, 50, 10],
      warning: [15, 25, 15],
      error: [20, 100, 20, 100, 20]
    };
    navigator.vibrate(patterns[type]);
  }
};

// Add haptic to ritual start/stop
export const useHapticFeedback = () => {
  const onRitualStart = () => triggerHaptic('success');
  const onRitualComplete = () => triggerHaptic('success');
  const onButtonPress = () => triggerHaptic('light');
  const onError = () => triggerHaptic('error');

  return { onRitualStart, onRitualComplete, onButtonPress, onError };
};

declare global {
  interface Window {
    webkit?: {
      messageHandlers?: {
        haptic?: {
          postMessage: (message: { type: string }) => void;
        };
      };
    };
  }
}