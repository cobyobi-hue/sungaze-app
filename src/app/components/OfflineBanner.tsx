import React, { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';

type OfflineBannerProps = {
  isOnline: boolean;
};

export function OfflineBanner({ isOnline }: OfflineBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setVisible(true);
      return;
    }
    // When coming back online, keep the banner briefly so the transition is noticeable.
    const t = setTimeout(() => setVisible(false), 1500);
    return () => clearTimeout(t);
  }, [isOnline]);

  if (!visible) return null;

  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 z-[9999] w-[min(92vw,560px)]">
      <div className="flex items-center gap-3 rounded-2xl border border-yellow-400/25 bg-black/70 backdrop-blur-xl px-4 py-3 shadow-[0_0_24px_rgba(255,215,0,0.18),0_8px_30px_rgba(0,0,0,0.55)]">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-400/10 border border-yellow-400/20">
          <WifiOff className="h-5 w-5 text-yellow-300" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-yellow-300">Offline mode</div>
          <div className="text-xs text-white/70 truncate">
            {isOnline ? 'Back online — syncing when possible.' : 'Some features are unavailable. Your progress stays saved locally.'}
          </div>
        </div>
      </div>
    </div>
  );
}



