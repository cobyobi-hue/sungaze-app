export interface TruthScroll {
  id: number;
  myth: string;
  truth: string;
  category: string;
  vibe: string; // Gen Z rebellious tone
}

export const truthScrolls: TruthScroll[] = [
  {
    id: 1,
    myth: "The sun will blind you",
    truth: "Safe gazing is possible only at sunrise/sunset when UV index is 0",
    category: "Safety",
    vibe: "The medical establishment wants you scared of your own star ☀️"
  },
  {
    id: 2,
    myth: "Sungazing is New Age nonsense",
    truth: "It's in the Rig Veda, Upanishads, Taoist texts, Egyptian hymns",
    category: "Ancient Wisdom",
    vibe: "Your ancestors knew what Big Pharma doesn't want you to know 📜"
  },
  {
    id: 3,
    myth: "Humans need artificial supplements",
    truth: "The sun is the original source of vitamin D, circadian alignment, and pineal activation",
    category: "Health",
    vibe: "Nature is the ultimate pharmacy. No cap. 💊➡️☀️"
  },
  {
    id: 4,
    myth: "You need sunscreen all day",
    truth: "Morning and evening sun exposure builds natural protection and melanin",
    category: "Protection",
    vibe: "They sold you fear, not freedom ✨"
  },
  {
    id: 5,
    myth: "Only food gives you energy",
    truth: "Light is the primary energy source - mitochondria literally eat photons",
    category: "Energy",
    vibe: "You're not just what you eat, you're what you absorb 🌅"
  },
  {
    id: 6,
    myth: "Depression needs medication",
    truth: "Light deficiency is the real epidemic - sun exposure regulates serotonin naturally",
    category: "Mental Health",
    vibe: "The cure was always free and literally hanging in the sky 🌞"
  },
  {
    id: 7,
    myth: "Staring at screens all day is normal",
    truth: "Your eyes were designed for horizon gazing and natural light cycles",
    category: "Vision",
    vibe: "They trapped your gaze in a rectangle. Break free. 📱❌"
  },
  {
    id: 8,
    myth: "Sleep pills fix insomnia",
    truth: "Morning sun exposure sets your circadian clock naturally",
    category: "Sleep",
    vibe: "Wake up with the sun, sleep like your ancestors did 🌙"
  },
  {
    id: 9,
    myth: "Meditation requires apps and courses",
    truth: "Solar gazing is the original mindfulness practice",
    category: "Consciousness",
    vibe: "The ultimate app is literally a star. No subscription required ⭐"
  },
  {
    id: 10,
    myth: "Only food contains nutrients",
    truth: "Sunlight provides information, energy, and healing frequencies your body craves",
    category: "Nutrition",
    vibe: "Light nutrition hits different. Your cells know. 🧬"
  }
];

export const getRandomTruthScroll = (): TruthScroll => {
  return truthScrolls[Math.floor(Math.random() * truthScrolls.length)];
};

export const getTruthScrollsByCategory = (category: string): TruthScroll[] => {
  return truthScrolls.filter(scroll => scroll.category === category);
};

export const getAllCategories = (): string[] => {
  return [...new Set(truthScrolls.map(scroll => scroll.category))];
};