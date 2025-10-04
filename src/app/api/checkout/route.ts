import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { founderTracker } from '../../lib/founder-tracker';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

export async function POST(request: NextRequest) {
  try {
    const { priceId, userId, tier } = await request.json();

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID is required' }, { status: 400 });
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: tier === 'founder_444' ? 'payment' : 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/?success=true&tier=${tier}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/?canceled=true`,
      client_reference_id: userId,
      metadata: {
        userId,
        tier,
      },
    });

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    });

  } catch (error: any) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: error.message || 'Payment setup failed' },
      { status: 500 }
    );
  }
}