import { useEffect, useMemo, useState } from 'react';

export type NetworkStatus = {
  isOnline: boolean;
  lastChangedAt: number;
};

function readNavigatorOnline(): boolean {
  // In browsers, navigator.onLine is the simplest signal (not perfect, but good enough for UI gating).
  if (typeof navigator === 'undefined') return true;
  if (typeof navigator.onLine !== 'boolean') return true;
  return navigator.onLine;
}

export function useNetworkStatus(): NetworkStatus {
  const [isOnline, setIsOnline] = useState<boolean>(() => readNavigatorOnline());
  const [lastChangedAt, setLastChangedAt] = useState<number>(() => Date.now());

  useEffect(() => {
    const update = () => {
      setIsOnline(readNavigatorOnline());
      setLastChangedAt(Date.now());
    };

    // Initialize once on mount (in case SSR/hydration differs).
    update();

    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, []);

  return useMemo(() => ({ isOnline, lastChangedAt }), [isOnline, lastChangedAt]);
}

export async function withTimeout<T>(promise: Promise<T>, ms: number, label?: string): Promise<T> {
  let t: any;
  const timeout = new Promise<T>((_resolve, reject) => {
    t = setTimeout(() => reject(new Error(label ? `Timeout: ${label}` : 'Timeout')), ms);
  });
  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(t);
  }
}



