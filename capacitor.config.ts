import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sungazeapp.sungaze',
  appName: 'Sungaze',
  webDir: 'out',  // ← MAKE SURE THIS SAYS 'out'
  server: {
    androidScheme: 'https'
  }
};

export default config;
