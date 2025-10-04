// Environment configuration utility
// This file helps manage environment variables and provides fallbacks

export interface AppConfig {
  // Payment configurations
  stripe: {
    publishableKey: string;
    secretKey: string;
    webhookSecret: string;
    founderPriceId: string;
    premiumPriceId: string;
    monthlyPriceId: string;
  };
  
  flutterwave: {
    publicKey: string;
    secretKey: string;
    encryptionKey: string;
  };
  
  // Voice synthesis
  elevenlabs: {
    apiKey: string;
    voiceId: string;
    meditationVoiceId: string;
    guidanceVoiceId: string;
  };
  
  // Database
  database: {
    url: string;
    supabaseUrl?: string;
    supabaseAnonKey?: string;
    supabaseServiceKey?: string;
  };
  
  // Authentication
  auth: {
    jwtSecret: string;
    nextAuthUrl: string;
    nextAuthSecret: string;
  };
  
  // External APIs
  apis: {
    solarApiKey: string;
    weatherApiKey: string;
  };
  
  // Storage
  storage: {
    awsAccessKeyId: string;
    awsSecretAccessKey: string;
    awsRegion: string;
    awsS3Bucket: string;
    cloudinaryCloudName?: string;
    cloudinaryApiKey?: string;
    cloudinaryApiSecret?: string;
  };
  
  // Email
  email: {
    sendgridApiKey: string;
    sendgridFromEmail: string;
    resendApiKey?: string;
  };
  
  // Analytics
  analytics: {
    gaId: string;
    sentryDsn: string;
  };
  
  // App settings
  app: {
    url: string;
    name: string;
    nodeEnv: string;
  };
  
  // Feature flags
  features: {
    enableVoiceSynthesis: boolean;
    enablePayments: boolean;
    enableAnalytics: boolean;
    enableDebugMode: boolean;
  };
  
  // Pricing
  pricing: {
    founder: {
      usd: number;
      ngn: number;
      kes: number;
    };
    premium: {
      usd: number;
      ngn: number;
      kes: number;
    };
    monthly: {
      usd: number;
      ngn: number;
      kes: number;
    };
  };
}

// Helper function to get environment variable with fallback
function getEnvVar(key: string, fallback?: string): string {
  const value = process.env[key];
  if (!value && !fallback) {
    throw new Error(`Environment variable ${key} is required but not set`);
  }
  return value || fallback!;
}

// Helper function to get boolean environment variable
function getBooleanEnvVar(key: string, fallback: boolean = false): boolean {
  const value = process.env[key];
  if (!value) return fallback;
  return value.toLowerCase() === 'true';
}

// Helper function to get number environment variable
function getNumberEnvVar(key: string, fallback: number): number {
  const value = process.env[key];
  if (!value) return fallback;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? fallback : parsed;
}

// Configuration object
export const config: AppConfig = {
  stripe: {
    publishableKey: getEnvVar('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY', 'pk_test_mock'),
    secretKey: getEnvVar('STRIPE_SECRET_KEY', 'sk_test_mock'),
    webhookSecret: getEnvVar('STRIPE_WEBHOOK_SECRET', 'whsec_mock'),
    founderPriceId: getEnvVar('STRIPE_FOUNDER_PRICE_ID', 'price_mock_founder'),
    premiumPriceId: getEnvVar('STRIPE_PREMIUM_PRICE_ID', 'price_mock_premium'),
    monthlyPriceId: getEnvVar('STRIPE_MONTHLY_PRICE_ID', 'price_mock_monthly'),
  },
  
  flutterwave: {
    publicKey: getEnvVar('NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY', 'FLWPUBK_TEST_mock'),
    secretKey: getEnvVar('FLUTTERWAVE_SECRET_KEY', 'FLWSECK_TEST_mock'),
    encryptionKey: getEnvVar('FLUTTERWAVE_ENCRYPTION_KEY', 'mock_encryption_key'),
  },
  
  elevenlabs: {
    apiKey: getEnvVar('NEXT_PUBLIC_ELEVENLABS_API_KEY', 'mock_api_key'),
    voiceId: getEnvVar('NEXT_PUBLIC_ELEVENLABS_VOICE_ID', 'mock_voice_id'),
    meditationVoiceId: getEnvVar('ELEVENLABS_MEDITATION_VOICE_ID', 'mock_meditation_voice'),
    guidanceVoiceId: getEnvVar('ELEVENLABS_GUIDANCE_VOICE_ID', 'mock_guidance_voice'),
  },
  
  database: {
    url: getEnvVar('DATABASE_URL', 'postgresql://mock:mock@localhost:5432/mock'),
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  },
  
  auth: {
    jwtSecret: getEnvVar('JWT_SECRET', 'mock_jwt_secret_minimum_32_characters'),
    nextAuthUrl: getEnvVar('NEXTAUTH_URL', 'http://localhost:3001'),
    nextAuthSecret: getEnvVar('NEXTAUTH_SECRET', 'mock_nextauth_secret'),
  },
  
  apis: {
    solarApiKey: getEnvVar('SOLAR_API_KEY', 'mock_solar_api_key'),
    weatherApiKey: getEnvVar('WEATHER_API_KEY', 'mock_weather_api_key'),
  },
  
  storage: {
    awsAccessKeyId: getEnvVar('AWS_ACCESS_KEY_ID', 'mock_aws_access_key'),
    awsSecretAccessKey: getEnvVar('AWS_SECRET_ACCESS_KEY', 'mock_aws_secret_key'),
    awsRegion: getEnvVar('AWS_REGION', 'us-east-1'),
    awsS3Bucket: getEnvVar('AWS_S3_BUCKET', 'mock-bucket'),
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  
  email: {
    sendgridApiKey: getEnvVar('SENDGRID_API_KEY', 'mock_sendgrid_key'),
    sendgridFromEmail: getEnvVar('SENDGRID_FROM_EMAIL', 'noreply@sungaze.app'),
    resendApiKey: process.env.RESEND_API_KEY,
  },
  
  analytics: {
    gaId: getEnvVar('NEXT_PUBLIC_GA_ID', 'G-MOCK'),
    sentryDsn: getEnvVar('SENTRY_DSN', 'mock_sentry_dsn'),
  },
  
  app: {
    url: getEnvVar('NEXT_PUBLIC_APP_URL', 'http://localhost:3001'),
    name: getEnvVar('NEXT_PUBLIC_APP_NAME', 'Sungaze App'),
    nodeEnv: getEnvVar('NODE_ENV', 'development'),
  },
  
  features: {
    enableVoiceSynthesis: getBooleanEnvVar('NEXT_PUBLIC_ENABLE_VOICE_SYNTHESIS', true),
    enablePayments: getBooleanEnvVar('NEXT_PUBLIC_ENABLE_PAYMENTS', true),
    enableAnalytics: getBooleanEnvVar('NEXT_PUBLIC_ENABLE_ANALYTICS', false),
    enableDebugMode: getBooleanEnvVar('NEXT_PUBLIC_ENABLE_DEBUG_MODE', true),
  },
  
  pricing: {
    founder: {
      usd: getNumberEnvVar('FOUNDER_PRICE_USD', 44),
      ngn: getNumberEnvVar('FOUNDER_PRICE_NGN', 48400),
      kes: getNumberEnvVar('FOUNDER_PRICE_KES', 6600),
    },
    premium: {
      usd: getNumberEnvVar('PREMIUM_PRICE_USD', 19),
      ngn: getNumberEnvVar('PREMIUM_PRICE_NGN', 20900),
      kes: getNumberEnvVar('PREMIUM_PRICE_KES', 2850),
    },
    monthly: {
      usd: getNumberEnvVar('MONTHLY_PRICE_USD', 9),
      ngn: getNumberEnvVar('MONTHLY_PRICE_NGN', 9900),
      kes: getNumberEnvVar('MONTHLY_PRICE_KES', 1350),
    },
  },
};

// Validation function to check if all required environment variables are set
export function validateEnvironment(): { isValid: boolean; missingVars: string[] } {
  const missingVars: string[] = [];
  
  // Check critical variables
  const criticalVars = [
    'STRIPE_SECRET_KEY',
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
    'JWT_SECRET',
    'NEXTAUTH_SECRET',
  ];
  
  criticalVars.forEach(varName => {
    if (!process.env[varName] || process.env[varName]?.includes('mock')) {
      missingVars.push(varName);
    }
  });
  
  return {
    isValid: missingVars.length === 0,
    missingVars,
  };
}

// Helper function to check if we're in development mode
export function isDevelopment(): boolean {
  return config.app.nodeEnv === 'development';
}

// Helper function to check if we're in production mode
export function isProduction(): boolean {
  return config.app.nodeEnv === 'production';
}

// Helper function to get the appropriate payment provider based on region
export function getPaymentProvider(region: 'us' | 'africa'): 'stripe' | 'flutterwave' {
  return region === 'africa' ? 'flutterwave' : 'stripe';
}

// Helper function to get pricing for a specific region and tier
export function getPricing(tier: 'founder' | 'premium' | 'monthly', region: 'us' | 'africa' = 'us') {
  const pricing = config.pricing[tier];
  
  if (region === 'africa') {
    // Return African pricing (NGN for Nigeria, KES for Kenya, etc.)
    return {
      amount: pricing.ngn,
      currency: 'NGN',
      displayAmount: `₦${pricing.ngn.toLocaleString()}`,
    };
  } else {
    // Return US pricing
    return {
      amount: pricing.usd,
      currency: 'USD',
      displayAmount: `$${pricing.usd}`,
    };
  }
}

export default config;














