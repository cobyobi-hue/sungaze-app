"use client";

import React, { useState, useEffect } from 'react';

interface FounderStatsProps {
  className?: string;
}

interface FounderStatsData {
  totalClaimed: number;
  remaining: number;
  maxFounders: number;
  isFullySubscribed: boolean;
  percentageClaimed: number;
}

export function FounderStats({ className = '' }: FounderStatsProps) {
  const [stats, setStats] = useState<FounderStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/founders/stats');
      const data = await response.json();
      
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch founder stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`text-center ${className}`}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-32 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-48 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className={`text-center ${className}`}>
        <p className="text-gray-500">Unable to load founder stats</p>
      </div>
    );
  }

  return (
    <div className={`text-center ${className}`}>
      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-amber-100 px-4 py-2 rounded-full border border-yellow-300 shadow-sm">
        <span className="text-2xl font-bold text-orange-600">
          {stats.remaining}
        </span>
        <span className="text-sm text-gray-700 font-medium">
          / {stats.maxFounders} spots remaining
        </span>
      </div>
      
      <p className="text-xs text-gray-500 mt-2">
        {stats.totalClaimed} founders claimed worldwide ({stats.percentageClaimed}%)
      </p>
      
      {stats.isFullySubscribed && (
        <p className="text-sm font-bold text-red-600 mt-2">
          🔥 All Founder spots claimed! 
        </p>
      )}
    </div>
  );
}