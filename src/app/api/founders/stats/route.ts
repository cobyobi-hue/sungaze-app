import { NextResponse } from 'next/server';
import { founderTracker } from '../../../lib/founder-tracker';

export async function GET() {
  try {
    const stats = founderTracker.getFounderStats();
    
    return NextResponse.json({
      success: true,
      data: {
        totalClaimed: stats.totalClaimed,
        remaining: stats.remaining,
        maxFounders: stats.maxFounders,
        isFullySubscribed: stats.isFullySubscribed,
        percentageClaimed: Math.round((stats.totalClaimed / stats.maxFounders) * 100)
      }
    });
  } catch (error) {
    console.error('Error getting founder stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get founder stats' },
      { status: 500 }
    );
  }
}

// Export founder data (admin only - add auth in production)
export async function POST() {
  try {
    const exportData = founderTracker.exportFounderData();
    
    return NextResponse.json({
      success: true,
      data: exportData
    });
  } catch (error) {
    console.error('Error exporting founder data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to export founder data' },
      { status: 500 }
    );
  }
}