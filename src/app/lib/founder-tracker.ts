// Founder tracking system for accurate counts and founder management

export interface FounderInfo {
  id: string;
  founderNumber: number; // 1-444
  email: string;
  name?: string;
  purchaseDate: string;
  stripeCustomerId?: string;
  stripePaymentId?: string;
  region: 'us' | 'africa' | 'europe' | 'asia' | 'other';
  ritualEmail?: string; // Email they provided for ritual access
  status: 'active' | 'refunded';
}

class FounderTracker {
  private founders = new Map<string, FounderInfo>();
  private foundersByNumber = new Map<number, FounderInfo>();
  private nextFounderNumber = 1;
  private readonly MAX_FOUNDERS = 444;

  constructor() {
    this.initializeFounders();
  }

  private initializeFounders() {
    // Initialize with you as the first founder
    const firstFounder: FounderInfo = {
      id: 'test-user-1', // Your user ID
      founderNumber: 1,
      email: 'test@sungaze.com', // Founder #1 email
      name: 'Founder #1',
      purchaseDate: new Date().toISOString(),
      region: 'us',
      status: 'active'
    };
    
    this.founders.set('test-user-1', firstFounder);
    this.foundersByNumber.set(1, firstFounder);
    this.nextFounderNumber = 2;
    
    console.log('Initialized founder system with Founder #1');
  }

  // Register a new founder (called after successful payment)
  async registerFounder(userId: string, email: string, paymentInfo: {
    stripeCustomerId?: string;
    stripePaymentId?: string;
    region?: string;
  }): Promise<{ success: boolean; founderNumber?: number; error?: string }> {
    
    // Check if already a founder
    if (this.founders.has(userId)) {
      const existing = this.founders.get(userId)!;
      return { success: true, founderNumber: existing.founderNumber };
    }

    // Check if we've reached the limit
    if (this.nextFounderNumber > this.MAX_FOUNDERS) {
      return { 
        success: false, 
        error: 'All 444 Founder spots have been claimed worldwide!' 
      };
    }

    // Create new founder
    const founderNumber = this.nextFounderNumber;
    const newFounder: FounderInfo = {
      id: userId,
      founderNumber,
      email,
      purchaseDate: new Date().toISOString(),
      region: (paymentInfo.region as any) || 'us',
      stripeCustomerId: paymentInfo.stripeCustomerId,
      stripePaymentId: paymentInfo.stripePaymentId,
      status: 'active'
    };

    // Store founder
    this.founders.set(userId, newFounder);
    this.foundersByNumber.set(founderNumber, newFounder);
    this.nextFounderNumber++;

    console.log(`New Founder #${founderNumber} registered:`, newFounder);
    
    // Save to persistent storage (in production, this would be a database)
    this.saveToStorage();
    
    return { success: true, founderNumber };
  }

  // Get founder info by user ID
  getFounder(userId: string): FounderInfo | null {
    return this.founders.get(userId) || null;
  }

  // Get founder by number
  getFounderByNumber(founderNumber: number): FounderInfo | null {
    return this.foundersByNumber.get(founderNumber) || null;
  }

  // Get current founder stats
  getFounderStats() {
    const totalClaimed = this.founders.size;
    const remaining = this.MAX_FOUNDERS - totalClaimed;
    
    return {
      totalClaimed,
      remaining: Math.max(0, remaining),
      maxFounders: this.MAX_FOUNDERS,
      nextFounderNumber: this.nextFounderNumber <= this.MAX_FOUNDERS ? this.nextFounderNumber : null,
      isFullySubscribed: totalClaimed >= this.MAX_FOUNDERS
    };
  }

  // Get all founders (for admin purposes)
  getAllFounders(): FounderInfo[] {
    return Array.from(this.founders.values()).sort((a, b) => a.founderNumber - b.founderNumber);
  }

  // Get founders with ritual emails (who can be contacted)
  getFoundersWithRitualEmails(): FounderInfo[] {
    return this.getAllFounders().filter(f => f.ritualEmail && f.status === 'active');
  }

  // Update founder's ritual email
  updateFounderRitualEmail(userId: string, ritualEmail: string): boolean {
    const founder = this.founders.get(userId);
    if (founder) {
      founder.ritualEmail = ritualEmail;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Export founder data for admin
  exportFounderData() {
    const founders = this.getAllFounders();
    const stats = this.getFounderStats();
    
    return {
      summary: stats,
      founders: founders.map(f => ({
        founderNumber: f.founderNumber,
        email: f.email,
        ritualEmail: f.ritualEmail || 'Not provided',
        purchaseDate: f.purchaseDate,
        region: f.region,
        status: f.status
      }))
    };
  }

  // Save to localStorage (in production, use proper database)
  private saveToStorage() {
    if (typeof window === 'undefined') return;
    
    try {
      const data = {
        founders: Array.from(this.founders.entries()),
        foundersByNumber: Array.from(this.foundersByNumber.entries()),
        nextFounderNumber: this.nextFounderNumber
      };
      localStorage.setItem('sungaze_founders', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save founder data:', error);
    }
  }

  // Load from localStorage (in production, load from database)
  private loadFromStorage() {
    if (typeof window === 'undefined') return;
    
    try {
      const stored = localStorage.getItem('sungaze_founders');
      if (stored) {
        const data = JSON.parse(stored);
        this.founders = new Map(data.founders);
        this.foundersByNumber = new Map(data.foundersByNumber);
        this.nextFounderNumber = data.nextFounderNumber;
      }
    } catch (error) {
      console.error('Failed to load founder data:', error);
    }
  }
}

// Export singleton instance
export const founderTracker = new FounderTracker();