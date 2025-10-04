// Web Speech API fallback for when ElevenLabs is unavailable

export interface SpeechSettings {
  rate: number;
  pitch: number;
  volume: number;
  voice?: SpeechSynthesisVoice;
}

export class WebSpeechService {
  private settings: SpeechSettings;
  private utterance: SpeechSynthesisUtterance | null = null;

  constructor(settings?: Partial<SpeechSettings>) {
    this.settings = {
      rate: 0.7, // Slower, more meditative pace
      pitch: 0.9, // Slightly lower pitch for calming effect
      volume: 0.8,
      ...settings,
    };
  }

  async generateSpeechUrl(text: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!('speechSynthesis' in window)) {
        reject(new Error('Speech synthesis not supported in this browser'));
        return;
      }

      // Cancel any ongoing speech
      speechSynthesis.cancel();

      this.utterance = new SpeechSynthesisUtterance(text);
      
      // Apply settings
      this.utterance.rate = this.settings.rate;
      this.utterance.pitch = this.settings.pitch;
      this.utterance.volume = this.settings.volume;

      // Try to find a suitable voice (prefer female voices for Emily)
      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('female') ||
        voice.name.toLowerCase().includes('samantha') ||
        voice.name.toLowerCase().includes('victoria') ||
        voice.name.toLowerCase().includes('serena')
      ) || voices.find(voice => voice.lang.startsWith('en')) || voices[0];

      if (preferredVoice) {
        this.utterance.voice = preferredVoice;
      }

      // Create a data URL for audio (mock - Web Speech API doesn't provide actual audio files)
      // We'll return a special identifier that the voice hook can recognize
      resolve(`web-speech:${encodeURIComponent(text)}`);
    });
  }

  speak(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!('speechSynthesis' in window)) {
        reject(new Error('Speech synthesis not supported in this browser'));
        return;
      }

      // Cancel any ongoing speech
      speechSynthesis.cancel();

      this.utterance = new SpeechSynthesisUtterance(text);
      
      // Apply settings
      this.utterance.rate = this.settings.rate;
      this.utterance.pitch = this.settings.pitch;
      this.utterance.volume = this.settings.volume;

      // Find a suitable voice
      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('female') ||
        voice.name.toLowerCase().includes('samantha') ||
        voice.name.toLowerCase().includes('victoria') ||
        voice.name.toLowerCase().includes('serena')
      ) || voices.find(voice => voice.lang.startsWith('en')) || voices[0];

      if (preferredVoice) {
        this.utterance.voice = preferredVoice;
      }

      this.utterance.onend = () => resolve();
      this.utterance.onerror = (event) => reject(new Error('Speech synthesis failed'));

      speechSynthesis.speak(this.utterance);
    });
  }

  pause(): void {
    if (speechSynthesis.speaking) {
      speechSynthesis.pause();
    }
  }

  resume(): void {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
    }
  }

  stop(): void {
    speechSynthesis.cancel();
  }

  isPaused(): boolean {
    return speechSynthesis.paused;
  }

  isSpeaking(): boolean {
    return speechSynthesis.speaking;
  }
}

// Initialize Web Speech Service as fallback
export const initializeWebSpeech = (): WebSpeechService | null => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }

  return new WebSpeechService({
    rate: 0.7,
    pitch: 0.9,
    volume: 0.8,
  });
};