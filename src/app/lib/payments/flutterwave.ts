"use client";

export interface FlutterwavePaymentData {
  amount: number;
  currency: string;
  email: string;
  phone_number?: string;
  name: string;
  tx_ref: string;
  callback_url: string;
  return_url: string;
  customizations: {
    title: string;
    description: string;
    logo: string;
  };
  meta: {
    userId: string;
    tier: string;
    product: string;
  };
}

export interface FlutterwaveResponse {
  status: 'success' | 'error';
  message: string;
  data?: {
    link: string;
  };
}

declare global {
  interface Window {
    FlutterwaveCheckout: (options: any) => void;
  }
}

export const initializeFlutterwavePayment = async (data: FlutterwavePaymentData): Promise<FlutterwaveResponse> => {
  try {
    // Load Flutterwave script if not already loaded
    await loadFlutterwaveScript();
    
    // Check if we have the required environment variables
    const publicKey = process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY;
    
    if (!publicKey) {
      console.warn('Flutterwave public key not found in environment variables');
      return {
        status: 'error',
        message: 'Payment service not configured'
      };
    }
    
    // Initialize Flutterwave payment
    return new Promise((resolve) => {
      const paymentData = {
        public_key: publicKey,
        tx_ref: data.tx_ref,
        amount: data.amount,
        currency: data.currency,
        payment_options: 'card,mobilemoney,ussd',
        redirect_url: data.return_url,
        customer: {
          email: data.email,
          phone_number: data.phone_number,
          name: data.name,
        },
        customizations: data.customizations,
        meta: data.meta,
        callback: function(response: any) {
          if (response.status === 'successful') {
            resolve({
              status: 'success',
              message: 'Payment completed successfully'
            });
          } else {
            resolve({
              status: 'error',
              message: 'Payment failed'
            });
          }
        },
        onclose: function() {
          resolve({
            status: 'error',
            message: 'Payment cancelled'
          });
        }
      };
      
      // Use Flutterwave checkout
      if (window.FlutterwaveCheckout) {
        window.FlutterwaveCheckout(paymentData);
      } else {
        resolve({
          status: 'error',
          message: 'Flutterwave not loaded'
        });
      }
    });
  } catch (error) {
    console.error('Flutterwave initialization error:', error);
    return {
      status: 'error',
      message: 'Failed to initialize payment'
    };
  }
};

const loadFlutterwaveScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (document.querySelector('script[src*="flutterwave"]')) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.flutterwave.com/v3.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Flutterwave script'));
    document.head.appendChild(script);
  });
};

const verifyFlutterwavePayment = async (transactionId: string): Promise<boolean> => {
  try {
    const response = await fetch('/api/payments/verify-flutterwave', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ transaction_id: transactionId }),
    });

    const result = await response.json();
    return response.ok && result.verified;
  } catch (error) {
    console.error('Payment verification error:', error);
    return false;
  }
};

// Helper to convert USD to local African currencies
export const convertCurrency = (usdAmount: number, targetCurrency: string): number => {
  const rates = {
    'NGN': 1100, // Nigerian Naira (approximate)
    'KES': 150,  // Kenyan Shilling
    'GHS': 12,   // Ghana Cedi
    'ZAR': 18,   // South African Rand
    'EGP': 31,   // Egyptian Pound
  };
  
  return Math.round(usdAmount * (rates[targetCurrency as keyof typeof rates] || 1100));
};