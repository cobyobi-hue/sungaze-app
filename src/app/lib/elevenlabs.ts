// ElevenLabs voice synthesis service

export interface VoiceSettings {
  stability: number;
  similarityBoost: number;
  style: number;
  useSpeakerBoost: boolean;
}

export interface ElevenLabsConfig {
  apiKey: string;
  voiceId: string;
  modelId?: string;
  voiceSettings?: VoiceSettings;
}

export class ElevenLabsService {
  private config: ElevenLabsConfig;

  constructor(config: ElevenLabsConfig) {
    this.config = {
      modelId: 'eleven_monolingual_v1',
      voiceSettings: {
        stability: 0.5,
        similarityBoost: 0.75,
        style: 0.0,
        useSpeakerBoost: true,
      },
      ...config,
    };
  }

  async generateSpeech(text: string): Promise<ArrayBuffer> {
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${this.config.voiceId}`;
    
    const payload = {
      text,
      model_id: this.config.modelId,
      voice_settings: this.config.voiceSettings,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.config.apiKey,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('ElevenLabs API Error Response:', errorText);
        
        if (response.status === 401) {
          throw new Error('ElevenLabs API key is invalid or expired. Please check your credentials.');
        } else if (response.status === 429) {
          throw new Error('ElevenLabs API rate limit exceeded. Please try again later.');
        } else if (response.status >= 500) {
          throw new Error('ElevenLabs service is temporarily unavailable. Please try again later.');
        } else {
          throw new Error(`ElevenLabs API error: ${response.status} ${response.statusText}`);
        }
      }

      return response.arrayBuffer();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to connect to ElevenLabs API. Please check your internet connection.');
    }
  }

  async generateSpeechUrl(text: string): Promise<string> {
    try {
      const audioBuffer = await this.generateSpeech(text);
      const blob = new Blob([audioBuffer], { type: 'audio/mpeg' });
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Error generating speech:', error);
      throw error;
    }
  }
}

// Sacred preparation message text
export const SACRED_PREPARATION_TEXT = 
  "Place your phone on the ground, on your shoes. Step barefoot onto the earth. The phone is not your master here. The sun is.";

// Session completion message text
export const SESSION_COMPLETION_TEXT = "Your gazing session is over.";

// Palming instructions message text
export const PALMING_INSTRUCTIONS_TEXT = "Rub your palms together vigorously. Place them over your eyes. The light is sealed inside. See the inner sun glowing on your eyelids.";

// Detailed palming ritual voice scripts
export const PALM_WARMING_TEXT = "Now, rub your palms together with intention. Feel the friction building warmth. This sacred heat will become your gateway to the inner sun. Keep rubbing until your palms glow with energy.";

export const EYE_SANCTUARY_TEXT = "Gently place your warm palms over your closed eyes. Create a perfect seal of darkness. This is your eye sanctuary. The light from the sun is now sealed within. Allow your eyes to rest in this sacred darkness.";

export const INNER_SUN_MEDITATION_TEXT = "Breathe deeply and look into the darkness behind your eyelids. You may see colors, patterns, or light. This is your inner sun awakening. Watch without judgment. Let the solar energy you absorbed flow through your being. You are becoming one with the light.";

// Barefoot walking voice scripts
export const BAREFOOT_PROMPT_TEXT = "Do you want to walk barefoot now?";
export const BAREFOOT_OPENING_TEXT = "The sun has given you light. Now let the earth hold you. Begin walking slowly, barefoot, each step touching Mother Earth.";
export const BAREFOOT_MID_WALK_1 = "Breathe in. Feel the current rising from the ground into your body.";
export const BAREFOOT_MID_WALK_2 = "The sun gives magnetic energy. The earth gives electrical energy. Together, they complete your circuit of life.";
export const BAREFOOT_CLOSING_TEXT = "Pause. Stand still. Let the light of the sun and the charge of the earth merge within you. You are a solar being.";

// Initialize ElevenLabs service with environment variables
export const initializeElevenLabs = (): ElevenLabsService | null => {
  if (typeof window === 'undefined') {
    // During SSR, return null to avoid accessing env vars
    return null;
  }
  
  const apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;
  const voiceId = process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID;

  if (!apiKey || !voiceId) {
    console.warn('ElevenLabs API key or Voice ID not found in environment variables');
    return null;
  }

  try {
    return new ElevenLabsService({
      apiKey,
      voiceId,
      voiceSettings: {
        stability: 0.95, // Maximum stability for calm, steady voice
        similarityBoost: 0.95, // Higher similarity for natural voice
        style: 0.0, // Minimal style for slower, more meditative pace
        useSpeakerBoost: true,
      },
    });
  } catch (error) {
    console.warn('Failed to initialize ElevenLabs service:', error);
    return null;
  }
};

// Initialize ElevenLabs service for completion messages (slower pace)
export const initializeCompletionVoice = (): ElevenLabsService | null => {
  if (typeof window === 'undefined') {
    // During SSR, return null to avoid accessing env vars
    return null;
  }
  
  const apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;
  const voiceId = process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID;

  if (!apiKey || !voiceId) {
    console.warn('ElevenLabs API key or Voice ID not found in environment variables');
    return null;
  }

  return new ElevenLabsService({
    apiKey,
    voiceId,
    voiceSettings: {
      stability: 0.98, // Maximum stability for very controlled, slow speech
      similarityBoost: 0.98, // Highest similarity for natural voice consistency
      style: 0.0, // Zero style for slowest, most meditative pace
      useSpeakerBoost: true,
    },
  });
};