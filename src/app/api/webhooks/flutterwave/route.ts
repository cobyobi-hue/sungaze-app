import { NextRequest, NextResponse } from 'next/server';
import { founderTracker } from '../../../lib/founder-tracker';
import { subscriptionService } from '../../../lib/database/subscription-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Verify Flutterwave webhook signature
    const signature = request.headers.get('verif-hash');
    const secretHash = process.env.FLUTTERWAVE_SECRET_HASH;
    
    if (secretHash && signature !== secretHash) {
      console.error('Flutterwave webhook signature verification failed');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const { 
      event, 
      data 
    } = body;

    // Handle successful payment
    if (event === 'charge.completed' && data.status === 'successful') {
      const {
        tx_ref,
        customer,
        amount,
        currency,
        meta
      } = data;

      const userId = meta?.userId;
      const tier = meta?.tier;

      if (!userId || !tier) {
        console.error('Missing userId or tier in Flutterwave webhook metadata');
        return NextResponse.json({ error: 'Missing metadata' }, { status: 400 });
      }

      try {
        // Update user subscription in our database
        await subscriptionService.updateUserTier(userId, tier as any);
        
        // If this is a founder purchase, register them
        if (tier === 'founder_444' && customer.email) {
          const result = await founderTracker.registerFounder(userId, customer.email, {
            stripeCustomerId: tx_ref,
            stripePaymentId: data.id,
            region: 'africa' // Flutterwave is primarily for African markets
          });
          
          if (result.success) {
            console.log(`Founder #${result.founderNumber} registered via Flutterwave webhook`);
          } else {
            console.error('Failed to register founder:', result.error);
          }
        }
        
        console.log(`Successfully processed Flutterwave payment for user ${userId}, tier: ${tier}`);
        
        return NextResponse.json({ received: true });
        
      } catch (error) {
        console.error('Error processing Flutterwave webhook:', error);
        return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
      }
    }

    // Handle other events if needed
    console.log(`Unhandled Flutterwave event: ${event}`);
    return NextResponse.json({ received: true });

  } catch (error: any) {
    console.error('Flutterwave webhook error:', error);
    return NextResponse.json(
      { error: error.message || 'Webhook processing failed' },
      { status: 500 }
    );
  }
}














