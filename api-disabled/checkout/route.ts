import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { priceId, tier, userId, email, successUrl, cancelUrl } = body;

    console.log('Checkout API called with:', { priceId, tier, userId, email });

    if (!priceId || !tier || !userId || !email) {
      console.error('Missing required fields:', { priceId, tier, userId, email });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create or retrieve customer
    let customer;
    const existingCustomers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({
        email: email,
        metadata: {
          userId: userId,
          tier: tier,
        },
      });
    }

    // Determine mode based on tier
    const isOneTime = tier === 'founder_444';
    const mode = isOneTime ? 'payment' : 'subscription';

    console.log('Creating checkout session:', { tier, priceId, mode, isOneTime });

    // Create checkout session
    const sessionConfig: any = {
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: mode,
      success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
      metadata: {
        userId: userId,
        tier: tier,
      },
    };

    // Only add subscription_data for subscription mode
    if (!isOneTime) {
      sessionConfig.subscription_data = {
        metadata: {
          userId: userId,
          tier: tier,
        },
      };
    }

    console.log('Session config:', JSON.stringify(sessionConfig, null, 2));

    console.log('Creating Stripe session with config:', JSON.stringify(sessionConfig, null, 2));
    
    const session = await stripe.checkout.sessions.create(sessionConfig);
    
    console.log('Stripe session created successfully:', { id: session.id, url: session.url });

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.json(
      { error: 'Failed to create checkout session', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}