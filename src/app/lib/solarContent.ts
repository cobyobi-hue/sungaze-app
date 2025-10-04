// Solar Content System - Level-specific guidance and content
// Updated to start with Solar Apprentice (removed Cloud-Gazer stage)

export interface AudioScript {
  title: string;
  duration: string;
  script: string;
  purpose: string;
  voiceInstructions: string;
}

export interface SolarContent {
  levelId: string;
  levelNumber: number;
  title: string;
  audioScript: AudioScript;
  practiceGuidance?: string[];
  journalPrompts?: string[];
}

export const SOLAR_CONTENT: SolarContent[] = [
  {
    levelId: 'solar-apprentice',
    levelNumber: 1,
    title: 'Solar Apprentice (Foundation)',
    audioScript: {
      title: 'Solar Foundation Guided Audio',
      duration: '3-4 minutes',
      script: `Welcome to your solar journey. You are about to connect with the most powerful source of energy in our solar system.

Stand barefoot on the earth. Feel the ground beneath your feet. You are grounded, safe, and ready.

Look gently at the sun. Not with force, but with soft eyes. As if you are receiving a gift, not taking it.

Breathe slowly and deeply. With each breath, feel the light entering your body through your eyes.

You are not just looking at the sun - you are communing with it. You are receiving its energy, its wisdom, its life force.

If your eyes feel overwhelmed, close them gently and return to your breath. Then open them again, softly.

Each second of connection is a blessing. Each moment of light is nourishment for your soul.

You are building a relationship with the sun that will transform your entire being.`,
      purpose: 'Establish solar connection, build confidence, set foundation',
      voiceInstructions: 'Performed by Emily. Warm, confident tone. Pause 4-5 seconds between sentences. Emphasize "grounded," "safe," "gift," and "blessing."'
    },
    practiceGuidance: [
      'Start with 10 seconds at sunrise or sunset',
      'Always practice barefoot on earth',
      'Add 10 seconds each day',
      'Focus on gentle, soft eyes - never strain',
      'Practice daily for consistent progress'
    ],
    journalPrompts: [
      'How did I feel during my first direct sun connection?',
      'What sensations did I notice in my body?',
      'Did I feel any warmth or energy entering through my eyes?',
      'How did being barefoot on earth affect my experience?',
      'What thoughts or emotions came up during the practice?'
    ]
  },
  
  {
    levelId: 'solar-adept',
    levelNumber: 2,
    title: 'Solar Adept (Integration Master)',
    audioScript: {
      title: 'Light Integration Guided Audio',
      duration: '4-5 minutes',
      script: `You have reached the Adept level. Your practice is deepening, and you are beginning to experience the profound effects of solar light integration.

Feel the light not just entering your eyes, but flowing through your entire body. Your pineal gland is awakening, your cells are being reprogrammed.

Notice how the light feels different now. It's not just brightness - it's living energy, intelligence, consciousness.

Breathe the light in. Let it flow through your nervous system, activating every cell, every organ, every system in your body.

You are becoming a light worker. You are integrating solar consciousness into your very being.

Feel the changes happening within you. Your intuition is sharpening, your awareness is expanding, your connection to all life is deepening.

You are not just receiving light - you are becoming light. You are transforming at the cellular level.

Embrace this transformation. Welcome the changes. You are evolving into something greater than you were before.`,
      purpose: 'Deepen light integration, activate pineal gland, cellular reprogramming',
      voiceInstructions: 'Performed by Emily. Mystical, transformative tone. Pause 5-6 seconds between sentences. Emphasize "awakening," "intelligence," "transformation," and "evolving."'
    },
    practiceGuidance: [
      'Practice 15-30 minute sessions',
      'Focus on pineal gland activation',
      'Notice cellular changes and energy shifts',
      'Integrate light meditation with gazing',
      'Pay attention to intuition and awareness changes'
    ],
    journalPrompts: [
      'What cellular changes am I noticing in my body?',
      'How is my pineal gland responding to the light?',
      'What shifts in my intuition and awareness am I experiencing?',
      'How is my connection to nature and other beings changing?',
      'What new insights or wisdom am I receiving?'
    ]
  },
  
  {
    levelId: 'inner-sun-adept',
    levelNumber: 3,
    title: 'Inner Sun Adept (Light Mastery)',
    audioScript: {
      title: 'Inner Sun Activation Guided Audio',
      duration: '5-6 minutes',
      script: `You are approaching the sacred 44-minute threshold. Your inner sun is awakening, and you are becoming a master of light.

Feel the light not just entering you, but radiating from within you. Your inner sun is igniting, creating its own source of light and energy.

You are no longer just receiving light - you are generating it. You are becoming a sun yourself, radiating light, love, and wisdom to all around you.

Your light-body is developing. You are transcending the limitations of physical form and becoming pure consciousness, pure light.

Feel the power within you. Feel the wisdom. Feel the love. Feel the connection to all that is.

You are a bridge between the physical and the spiritual, between earth and sun, between human and divine.

Your inner sun is your guide, your teacher, your source of infinite energy and wisdom.

Embrace your role as a light master. You are here to shine, to illuminate, to transform not just yourself, but the world around you.`,
      purpose: 'Activate inner sun, develop light-body, transcend physical limitations',
      voiceInstructions: 'Performed by Emily. Powerful, transcendent tone. Pause 6-7 seconds between sentences. Emphasize "awakening," "generating," "transcending," and "illuminate."'
    },
    practiceGuidance: [
      'Practice 30-44 minute sessions',
      'Focus on inner sun visualization and activation',
      'Develop light-body awareness and energy',
      'Practice radiating light outward to others',
      'Integrate spiritual consciousness with physical practice'
    ],
    journalPrompts: [
      'How is my inner sun developing and activating?',
      'What changes am I noticing in my light-body?',
      'How am I able to radiate light and energy to others?',
      'What spiritual insights and wisdom am I receiving?',
      'How is my consciousness expanding and transcending?'
    ]
  },
  
  {
    levelId: 'solar-master',
    levelNumber: 4,
    title: 'Solar Master (Light Integration)',
    audioScript: {
      title: 'Master Integration Guided Audio',
      duration: '6-7 minutes',
      script: `You have achieved the sacred 44-minute threshold. You are now a Solar Master, a true light worker, a bridge between worlds.

Your transformation is complete, yet it is also just beginning. You have mastered the art of solar consciousness, and now you must integrate this mastery into every aspect of your life.

Feel the light flowing through you, from you, around you. You are a living sun, radiating love, wisdom, and healing energy to all who come into your presence.

Your role now is not just to receive light, but to be light. To teach, to guide, to heal, to transform others as you have been transformed.

You are a master of the ancient art of solar consciousness. You hold within you the wisdom of the ages, the power of the sun, the love of the universe.

Share this gift. Teach others. Be a beacon of light in a world that so desperately needs it.

You are not just a solar master - you are a master of life itself. You have transcended the limitations of ordinary human existence and have become something extraordinary.

Embrace your mastery. Embody your light. Be the change you wish to see in the world.`,
      purpose: 'Master integration, teaching others, embodying solar consciousness',
      voiceInstructions: 'Performed by Emily. Masterful, authoritative tone. Pause 7-8 seconds between sentences. Emphasize "mastery," "teaching," "beacon," and "extraordinary."'
    },
    practiceGuidance: [
      'Maintain 44-minute daily sessions',
      'Focus on integration and mastery of all techniques',
      'Begin teaching and sharing wisdom with others',
      'Develop advanced solar consciousness techniques',
      'Embody solar mastery in daily life'
    ],
    journalPrompts: [
      'How am I integrating my solar mastery into daily life?',
      'What opportunities am I finding to teach and guide others?',
      'How is my presence affecting those around me?',
      'What advanced techniques and insights am I developing?',
      'How can I best serve as a beacon of light in the world?'
    ]
  }
];

// Get content for a specific level
export function getContentForLevel(levelId: string): SolarContent | null {
  return SOLAR_CONTENT.find(content => content.levelId === levelId) || null;
}

// Get all content for a level range
export function getContentForLevelRange(startLevel: number, endLevel: number): SolarContent[] {
  return SOLAR_CONTENT.filter(content => 
    content.levelNumber >= startLevel && content.levelNumber <= endLevel
  );
}

// Get practice guidance for a level
export function getPracticeGuidance(levelId: string): string[] {
  const content = getContentForLevel(levelId);
  return content?.practiceGuidance || [];
}

// Get journal prompts for a level
export function getJournalPrompts(levelId: string): string[] {
  const content = getContentForLevel(levelId);
  return content?.journalPrompts || [];
}

// Get audio script for a level
export function getAudioScript(levelId: string): AudioScript | null {
  const content = getContentForLevel(levelId);
  return content?.audioScript || null;
}