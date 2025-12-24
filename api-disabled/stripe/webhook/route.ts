import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { createClient } from '../../../lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = await createClient();

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        if (session.mode === 'subscription') {
          const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
          
          // Update user profile with subscription details
          await supabase
            .from('user_profiles')
            .update({
              tier: subscription.items.data[0].price.lookup_key === 'founder_444' ? 'founder_444' : 'monthly',
              stripe_customer_id: session.customer as string,
              subscription_id: subscription.id,
              subscription_status: subscription.status === 'active' ? 'active' : 'incomplete',
              purchase_date: new Date().toISOString(),
              expiration_date: new Date((subscription as any).current_period_end * 1000).toISOString(),
              updated_at: new Date().toISOString()
            })
            .eq('email', session.customer_email);

          // If it's a founder subscription, handle founder slot
          if (subscription.items.data[0].price.lookup_key === 'founder_444') {
            const { data: user } = await supabase
              .from('user_profiles')
              .select('id')
              .eq('email', session.customer_email)
              .single();

            if (user) {
              // Purchase founder slot
              const { data: slots } = await supabase
                .from('founder_slots')
                .select('*')
                .single();

              if (slots && slots.remaining > 0) {
                await supabase
                  .from('founder_slots')
                  .update({
                    sold: slots.sold + 1,
                    remaining: slots.remaining - 1,
                    last_updated: new Date().toISOString()
                  })
                  .eq('id', slots.id);

                // Update user with founder number
                await supabase
                  .from('user_profiles')
                  .update({
                    founder_number: slots.sold + 1,
                    badges: ['First Witness of the Flame', 'Solar Pioneer']
                  })
                  .eq('id', user.id);
              }
            }
          }
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        
        await supabase
          .from('user_profiles')
          .update({
            subscription_status: subscription.status === 'active' ? 'active' : 'canceled',
            expiration_date: new Date((subscription as any).current_period_end * 1000).toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('subscription_id', subscription.id);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        await supabase
          .from('user_profiles')
          .update({
            subscription_status: 'canceled',
            updated_at: new Date().toISOString()
          })
          .eq('subscription_id', subscription.id);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        
        if ((invoice as any).subscription) {
          await supabase
            .from('user_profiles')
            .update({
              subscription_status: 'past_due',
              updated_at: new Date().toISOString()
            })
            .eq('subscription_id', (invoice as any).subscription as string);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
