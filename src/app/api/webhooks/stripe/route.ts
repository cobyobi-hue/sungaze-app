import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { founderTracker } from '../../../lib/founder-tracker';
import { subscriptionService } from '../../../lib/database/subscription-service';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_test';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature!, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Get metadata from the session
      const userId = session.metadata?.userId || session.client_reference_id;
      const tier = session.metadata?.tier;
      
      if (!userId || !tier) {
        console.error('Missing userId or tier in webhook metadata');
        break;
      }

      try {
        // Update user subscription in our database
        await subscriptionService.updateUserTier(userId, tier as any);
        
        // If this is a founder purchase, register them
        if (tier === 'founder_444' && session.customer_email) {
          const result = await founderTracker.registerFounder(userId, session.customer_email, {
            stripeCustomerId: session.customer as string,
            stripePaymentId: session.payment_intent as string,
            region: 'us' // Could be determined from customer info
          });
          
          if (result.success) {
            console.log(`Founder #${result.founderNumber} registered via webhook`);
          } else {
            console.error('Failed to register founder:', result.error);
          }
        }
        
        console.log(`Successfully processed payment for user ${userId}, tier: ${tier}`);
        
      } catch (error) {
        console.error('Error processing webhook:', error);
      }
      
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}