// Sacred meditation chimes using Web Audio API
// Creates beautiful, calming sound alternatives to voice guidance

export class MeditativeChimes {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.masterGain = this.audioContext.createGain();
        this.masterGain.connect(this.audioContext.destination);
        this.masterGain.gain.value = 0.3; // Gentle volume
      } catch (error) {
        console.warn('Web Audio API not supported:', error);
      }
    }
  }

  private async ensureAudioContext() {
    if (!this.audioContext || this.audioContext.state === 'suspended') {
      try {
        await this.audioContext?.resume();
      } catch (error) {
        console.warn('Could not resume audio context:', error);
      }
    }
  }

  // Sacred preparation chime - gentle awakening
  async playPreparationChime(): Promise<void> {
    if (!this.audioContext || !this.masterGain) return;
    
    await this.ensureAudioContext();

    const now = this.audioContext.currentTime;
    
    // Create a series of ascending bell-like tones
    const frequencies = [220, 330, 440]; // A3, E4, A4 - harmonious intervals
    
    for (let i = 0; i < frequencies.length; i++) {
      setTimeout(() => {
        this.playBellTone(frequencies[i], 1.5, 0.2);
      }, i * 800); // 800ms between each tone
    }
  }

  // Session completion chime - three descending tones for closure
  async playCompletionChime(): Promise<void> {
    if (!this.audioContext || !this.masterGain) return;
    
    await this.ensureAudioContext();

    // Descending sacred tones for completion
    const frequencies = [528, 396, 256]; // Solfeggio-inspired frequencies
    
    for (let i = 0; i < frequencies.length; i++) {
      setTimeout(() => {
        this.playBellTone(frequencies[i], 2.0, 0.25);
      }, i * 1000); // 1 second between each tone
    }
  }

  // Palming chime - single deep resonant tone
  async playPalmingChime(): Promise<void> {
    if (!this.audioContext || !this.masterGain) return;
    
    await this.ensureAudioContext();

    // Deep, grounding tone for palming
    this.playBowlTone(136.1, 4.0, 0.3); // C# - Earth frequency
  }

  // Sacred transition chime - for ritual mode changes
  async playTransitionChime(): Promise<void> {
    if (!this.audioContext || !this.masterGain) return;
    
    await this.ensureAudioContext();

    // Quick, gentle confirmation chime
    this.playBellTone(440, 0.8, 0.15);
    setTimeout(() => {
      this.playBellTone(880, 0.8, 0.15);
    }, 300);
  }

  private playBellTone(frequency: number, duration: number, volume: number = 0.2): void {
    if (!this.audioContext || !this.masterGain) return;

    const now = this.audioContext.currentTime;
    
    // Create oscillator for fundamental frequency
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    
    // Add harmonics for bell-like quality
    const osc2 = this.audioContext.createOscillator();
    const gain2 = this.audioContext.createGain();
    
    // Connect nodes
    osc.connect(gain);
    osc2.connect(gain2);
    gain.connect(this.masterGain);
    gain2.connect(this.masterGain);
    
    // Set frequencies (fundamental + harmonic)
    osc.frequency.setValueAtTime(frequency, now);
    osc2.frequency.setValueAtTime(frequency * 2.5, now); // Higher harmonic
    
    // Bell envelope - quick attack, slow decay
    gain.gain.setValueAtTime(0, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    
    // Harmonic envelope - softer
    gain2.gain.setValueAtTime(0, now);
    gain2.gain.exponentialRampToValueAtTime(volume * 0.3, now + 0.02);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.7);
    
    // Sine wave for pure, meditative tone
    osc.type = 'sine';
    osc2.type = 'sine';
    
    // Play and stop
    osc.start(now);
    osc2.start(now);
    osc.stop(now + duration);
    osc2.stop(now + duration);
  }

  private playBowlTone(frequency: number, duration: number, volume: number = 0.25): void {
    if (!this.audioContext || !this.masterGain) return;

    const now = this.audioContext.currentTime;
    
    // Create multiple oscillators for singing bowl effect
    const oscillators = [];
    const gains = [];
    
    // Fundamental + harmonics for rich bowl sound
    const harmonics = [1, 2.4, 4.2, 6.8]; // Non-integer ratios for bowl-like timbre
    
    for (let i = 0; i < harmonics.length; i++) {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      
      osc.connect(gain);
      gain.connect(this.masterGain);
      
      osc.frequency.setValueAtTime(frequency * harmonics[i], now);
      osc.type = 'sine';
      
      // Each harmonic has different envelope and volume
      const harmVolume = volume * Math.pow(0.4, i);
      gain.gain.setValueAtTime(0, now);
      gain.gain.exponentialRampToValueAtTime(harmVolume, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      
      oscillators.push(osc);
      gains.push(gain);
    }
    
    // Start all oscillators
    oscillators.forEach(osc => {
      osc.start(now);
      osc.stop(now + duration);
    });
  }

  // Single confirmation chime for UI interactions
  async playConfirmationChime(): Promise<void> {
    if (!this.audioContext || !this.masterGain) return;
    
    await this.ensureAudioContext();
    this.playBellTone(660, 0.5, 0.1); // Quick, gentle confirmation
  }

  // Error/warning chime - gentle but noticeable
  async playWarningChime(): Promise<void> {
    if (!this.audioContext || !this.masterGain) return;
    
    await this.ensureAudioContext();
    
    // Two-tone gentle warning
    this.playBellTone(300, 0.6, 0.15);
    setTimeout(() => {
      this.playBellTone(200, 0.6, 0.15);
    }, 200);
  }
}
