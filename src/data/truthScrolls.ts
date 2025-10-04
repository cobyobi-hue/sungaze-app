export interface TruthScroll {
  id: number;
  myth: string;
  truth: string;
  category: string;
  wisdom: string; // Ancient sage wisdom
}

export const truthScrolls: TruthScroll[] = [
  {
    id: 1,
    myth: "The sun will blind you",
    truth: "Safe gazing is possible only at sunrise/sunset when UV index is 0",
    category: "Safety",
    wisdom: "Ancient yogis knew the sun's gentle face appears at dawn and dusk, when its light becomes medicine rather than fire."
  },
  {
    id: 2,
    myth: "Sungazing is New Age nonsense",
    truth: "It's in the Rig Veda, Upanishads, Taoist texts, Egyptian hymns",
    category: "Ancient Wisdom",
    wisdom: "What the modern world calls 'fringe' was once the cornerstone of spiritual practice across civilizations."
  },
  {
    id: 3,
    myth: "Humans need artificial supplements",
    truth: "The sun is the original source of vitamin D, circadian alignment, and pineal activation",
    category: "Health",
    wisdom: "The wise ancients understood that the sun is the ultimate pharmacy, dispensing precisely what each soul requires."
  },
  {
    id: 4,
    myth: "Sungazing is fringe practice",
    truth: "Egyptians, yogis, Taoists all practiced it",
    category: "Ancient Wisdom",
    wisdom: "Across the great rivers of civilization - the Nile, Ganges, and Yellow River - masters gazed upon the same eternal sun."
  },
  {
    id: 5,
    myth: "Only food gives you energy",
    truth: "Light is the primary energy source - mitochondria literally consume photons",
    category: "Energy",
    wisdom: "The cellular temples within you remember their solar origins, drinking light as their ancestors drank from the cosmic fire."
  },
  {
    id: 6,
    myth: "Depression requires medication",
    truth: "Light deficiency is often the root - sun exposure naturally regulates mood",
    category: "Mental Health",
    wisdom: "The darkness of the soul mirrors the darkness of the body. Invite light, and both shall be illuminated."
  },
  {
    id: 7,
    myth: "Staring at screens all day is normal",
    truth: "Your eyes were designed for horizon gazing and natural light cycles",
    category: "Vision",
    wisdom: "The ancient gaze stretched to infinity, not confined to the prison of glowing rectangles."
  },
  {
    id: 8,
    myth: "Sleep pills fix insomnia",
    truth: "Morning sun exposure sets your natural circadian clock",
    category: "Sleep",
    wisdom: "The wise rise with the sun and rest with the moon, following rhythms older than memory."
  },
  {
    id: 9,
    myth: "Meditation requires complex techniques",
    truth: "Solar gazing is the original mindfulness practice",
    category: "Consciousness",
    wisdom: "Before apps and teachers, there was only you, your breath, and the eternal flame hanging in the sky."
  },
  {
    id: 10,
    myth: "Only food contains nutrients",
    truth: "Sunlight provides information, energy, and healing frequencies",
    category: "Nutrition",
    wisdom: "The sage feeds on light as others feed on grain, understanding that all nourishment flows from the solar source."
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