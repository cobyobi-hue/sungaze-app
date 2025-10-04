// Personal Voice Audio System - Using your own recorded mystical transmissions
// Zero API costs, maximum authenticity ✨

export interface PersonalAudioClip {
  id: string;
  name: string;
  description: string;
  audioPath: string;
  duration?: number; // in seconds
  category: 'preparation' | 'completion' | 'palming' | 'grounding' | 'transition';
}

// Audio file mappings - replace with your actual recordings
export const PERSONAL_AUDIO_CLIPS: PersonalAudioClip[] = [
  // Preparation & Sacred Setup
  {
    id: 'sacred_preparation',
    name: 'Sacred Preparation',
    description: 'Mystical guidance for sungazing preparation',
    audioPath: '/audio/personal/sacred-preparation.mp3',
    duration: 25,
    category: 'preparation'
  },

  // Session Completion
  {
    id: 'session_complete',
    name: 'Session Complete',
    description: 'Sacred acknowledgment of completed practice',
    audioPath: '/audio/personal/session-complete.mp3', 
    duration: 8,
    category: 'completion'
  },

  // Palming Ritual Stages
  {
    id: 'palming_intro',
    name: 'Palming Introduction',
    description: 'Introduction to the sacred palming ritual',
    audioPath: '/audio/personal/palming-intro.mp3',
    duration: 15,
    category: 'palming'
  },
  {
    id: 'palm_warming',
    name: 'Palm Warming',
    description: 'Guidance for generating sacred heat in palms',
    audioPath: '/audio/personal/palm-warming.mp3',
    duration: 20,
    category: 'palming'
  },
  {
    id: 'eye_sanctuary',
    name: 'Eye Sanctuary',
    description: 'Creating the sacred darkness for inner vision',
    audioPath: '/audio/personal/eye-sanctuary.mp3',
    duration: 18,
    category: 'palming'
  },
  {
    id: 'inner_sun',
    name: 'Inner Sun Meditation',
    description: 'Witnessing the inner sun awakening',
    audioPath: '/audio/personal/inner-sun.mp3',
    duration: 25,
    category: 'palming'
  },

  // Grounding & Earth Connection
  {
    id: 'barefoot_invitation',
    name: 'Barefoot Walking Invitation',
    description: 'Sacred invitation to connect with Mother Earth',
    audioPath: '/audio/personal/barefoot-invitation.mp3',
    duration: 12,
    category: 'grounding'
  },
  {
    id: 'earth_connection',
    name: 'Earth Connection',
    description: 'Guidance for grounding solar energy through the earth',
    audioPath: '/audio/personal/earth-connection.mp3',
    duration: 30,
    category: 'grounding'
  },

  // Ritual Transitions
  {
    id: 'transition_blessing',
    name: 'Transition Blessing',
    description: 'Sacred transition between ritual stages',
    audioPath: '/audio/personal/transition-blessing.mp3',
    duration: 10,
    category: 'transition'
  }
];

export class PersonalVoiceService {
  private audioCache = new Map<string, HTMLAudioElement>();
  
  constructor() {
    this.preloadAudio();
  }

  // Preload audio files for smooth playback
  private async preloadAudio() {
    if (typeof window === 'undefined') return;
    
    PERSONAL_AUDIO_CLIPS.forEach(clip => {
      try {
        const audio = new Audio(clip.audioPath);
        audio.preload = 'metadata';
        this.audioCache.set(clip.id, audio);
      } catch (error) {
        console.warn(`Could not preload audio: ${clip.name}`, error);
      }
    });
  }

  // Play a specific audio clip by ID
  async playClip(clipId: string, volume: number = 0.8): Promise<void> {
    return new Promise((resolve, reject) => {
      const clip = PERSONAL_AUDIO_CLIPS.find(c => c.id === clipId);
      if (!clip) {
        console.warn(`Audio clip not found: ${clipId}`);
        reject(new Error(`Audio clip not found: ${clipId}`));
        return;
      }

      let audio = this.audioCache.get(clipId);
      
      // Create new audio element if not cached
      if (!audio) {
        audio = new Audio(clip.audioPath);
        this.audioCache.set(clipId, audio);
      }

      // Set up event handlers
      const handleEnded = () => {
        audio!.removeEventListener('ended', handleEnded);
        audio!.removeEventListener('error', handleError);
        resolve();
      };

      const handleError = () => {
        audio!.removeEventListener('ended', handleEnded);
        audio!.removeEventListener('error', handleError);
        console.error(`Error playing audio: ${clip.name}`);
        reject(new Error(`Error playing audio: ${clip.name}`));
      };

      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('error', handleError);

      // Set volume and play
      audio.volume = volume;
      audio.currentTime = 0; // Reset to beginning
      
      audio.play().catch(error => {
        console.error(`Failed to play audio: ${clip.name}`, error);
        handleError();
      });
    });
  }

  // Get clip information
  getClip(clipId: string): PersonalAudioClip | undefined {
    return PERSONAL_AUDIO_CLIPS.find(c => c.id === clipId);
  }

  // Get clips by category
  getClipsByCategory(category: PersonalAudioClip['category']): PersonalAudioClip[] {
    return PERSONAL_AUDIO_CLIPS.filter(c => c.category === category);
  }

  // Pause all currently playing audio
  pauseAll(): void {
    this.audioCache.forEach(audio => {
      if (!audio.paused) {
        audio.pause();
      }
    });
  }

  // Stop all audio and reset to beginning
  stopAll(): void {
    this.audioCache.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
  }

  // Check if audio file exists (for development)
  async checkAudioExists(clipId: string): Promise<boolean> {
    const clip = this.getClip(clipId);
    if (!clip) return false;

    try {
      const response = await fetch(clip.audioPath, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  }
}

// Export singleton instance
export const personalVoice = new PersonalVoiceService();