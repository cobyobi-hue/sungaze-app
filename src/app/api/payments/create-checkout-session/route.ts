import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { priceId, tier, region, userId, email, successUrl, cancelUrl } = body;

    if (!priceId || !tier || !userId || !email) {
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
          region: region || 'us',
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
        region: region || 'us',
      },
    };

    // Only add subscription_data for subscription mode
    if (!isOneTime) {
      sessionConfig.subscription_data = {
        metadata: {
          userId: userId,
          tier: tier,
          region: region || 'us',
        },
      };
    }

    console.log('Session config:', JSON.stringify(sessionConfig, null, 2));

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

