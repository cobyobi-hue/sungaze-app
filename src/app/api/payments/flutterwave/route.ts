import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { 
      amount, 
      currency, 
      email, 
      name, 
      userId, 
      tier 
    } = await request.json();

    if (!amount || !currency || !email || !name || !userId || !tier) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Generate unique transaction reference
    const tx_ref = `sungaze_${tier}_${userId}_${Date.now()}`;
    
    // Determine callback URLs
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';
    const callback_url = `${baseUrl}/api/webhooks/flutterwave`;
    const return_url = `${baseUrl}/?success=true&tier=${tier}`;

    // Prepare Flutterwave payment data
    const paymentData = {
      tx_ref,
      amount,
      currency,
      redirect_url: return_url,
      payment_options: 'card,mobilemoney,ussd',
      customer: {
        email,
        name,
      },
      customizations: {
        title: 'Sungaze App',
        description: `${tier} subscription`,
        logo: `${baseUrl}/logo.png`,
      },
      meta: {
        userId,
        tier,
        product: 'sungaze_subscription',
      },
    };

    // For now, return the payment data for client-side initialization
    // In production, you might want to create a payment link server-side
    return NextResponse.json({
      success: true,
      paymentData,
      message: 'Payment data prepared successfully'
    });

  } catch (error: any) {
    console.error('Flutterwave checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Payment setup failed' },
      { status: 500 }
    );
  }
}















