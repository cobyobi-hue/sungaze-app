"use client";

import { SubscriptionProvider } from '../contexts/SubscriptionContext';

export function SubscriptionProviderWrapper({ children }: { children: React.ReactNode }) {
  return <SubscriptionProvider>{children}</SubscriptionProvider>;
}


