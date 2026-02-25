// Mock data for Quantastro AI demo

export interface TarotCard {
  id: number;
  name: string;
  meaning: string;
  image: string; // emoji placeholder
  reversed: string;
}

export const tarotDeck: TarotCard[] = [
  { id: 0, name: "The Fool", meaning: "New beginnings, spontaneity, and a free spirit. Trust the journey ahead.", image: "🃏", reversed: "Recklessness, taken advantage of, inconsideration." },
  { id: 1, name: "The Magician", meaning: "Manifestation, resourcefulness. You have all the tools you need.", image: "🎩", reversed: "Manipulation, poor planning, untapped talents." },
  { id: 2, name: "The High Priestess", meaning: "Intuition, sacred knowledge, and the subconscious mind.", image: "🌙", reversed: "Secrets, disconnected from intuition, withdrawal." },
  { id: 3, name: "The Empress", meaning: "Femininity, beauty, nature, nurturing, and abundance.", image: "👑", reversed: "Creative block, dependence on others." },
  { id: 4, name: "The Emperor", meaning: "Authority, structure, control, and fatherhood.", image: "⚔️", reversed: "Domination, excessive control, lack of discipline." },
  { id: 5, name: "The Lovers", meaning: "Love, harmony, relationships, values alignment.", image: "💕", reversed: "Self-love, disharmony, imbalance." },
  { id: 6, name: "The Chariot", meaning: "Control, willpower, success, and determination.", image: "🏇", reversed: "Self-discipline, opposition, lack of direction." },
  { id: 7, name: "Wheel of Fortune", meaning: "Good luck, karma, life cycles, and destiny.", image: "☸️", reversed: "Bad luck, resistance to change, breaking cycles." },
  { id: 8, name: "Death", meaning: "Endings, change, transformation, and transition.", image: "🦋", reversed: "Resistance to change, personal transformation, inner purging." },
  { id: 9, name: "The Star", meaning: "Hope, faith, purpose, renewal, and spirituality.", image: "⭐", reversed: "Lack of faith, despair, self-trust, disconnection." },
];

export interface AkashicReading {
  pastLifeRole: string;
  era: string;
  karmicLesson: string;
  soulPurpose: string;
  soulGift: string;
  guidance: string;
}

export const akashicReadings: AkashicReading[] = [
  {
    pastLifeRole: "Healer in Ancient Egypt",
    era: "2500 BCE — Nile Delta",
    karmicLesson: "Learning patience in relationships and trusting divine timing.",
    soulPurpose: "To guide others through chaos with calm wisdom.",
    soulGift: "Empathic Healing",
    guidance: "Your soul carries ancient healing knowledge. Trust your hands and heart — they remember what the mind has forgotten.",
  },
  {
    pastLifeRole: "Scholar in the Gupta Empire",
    era: "400 CE — Northern India",
    karmicLesson: "Balancing intellect with emotional intelligence.",
    soulPurpose: "To bridge ancient wisdom with modern understanding.",
    soulGift: "Cosmic Knowledge",
    guidance: "You were once a keeper of Vedic manuscripts. Your thirst for knowledge is a soul memory — follow it fearlessly.",
  },
  {
    pastLifeRole: "Mystic Poet in Sufi Persia",
    era: "1200 CE — Isfahan",
    karmicLesson: "Expressing love without fear of vulnerability.",
    soulPurpose: "To inspire others through creative expression and devotion.",
    soulGift: "Divine Creativity",
    guidance: "Your soul danced with Rumi. The poetry within you is not learned — it is remembered. Write, sing, create without hesitation.",
  },
];

export interface LifeAdvice {
  title: string;
  details: string[];
}

export const lifeAdvice: Record<string, LifeAdvice[]> = {
  love: [
    {
      title: "Venus enters your 7th House",
      details: [
        "Relationship Status: Deep emotional bonding phase",
        "Advice: Good time for heartfelt conversations",
        "Warning: Avoid overthinking — trust the flow",
        "Mantra: 'Om Shukraya Namaha' for Venus blessings",
      ],
    },
    {
      title: "Moon-Jupiter conjunction favors connection",
      details: [
        "Relationship Status: Magnetic attraction energy",
        "Advice: Express your feelings openly today",
        "Warning: Don't confuse infatuation with love",
        "Mantra: 'Om Chandraya Namaha' for emotional clarity",
      ],
    },
  ],
  family: [
    {
      title: "4th House activated by Moon transit",
      details: [
        "Domestic Harmony: Strong nurturing energy",
        "Advice: Spend quality time with elders",
        "Tip: Cook a traditional meal together",
        "Remedy: Light a ghee lamp in the east corner",
      ],
    },
    {
      title: "Saturn stabilizes home foundations",
      details: [
        "Domestic Harmony: Time for long-term planning",
        "Advice: Resolve pending property matters",
        "Tip: Declutter your home for fresh energy",
        "Remedy: Place a Shani Yantra near the entrance",
      ],
    },
  ],
  fashion: [
    {
      title: "Venus-influenced styling day",
      details: [
        "Power Color: Royal Blue — enhances communication",
        "Avoid: Black — dampens your aura today",
        "Fabric: Silk to amplify Venus energy",
        "Gemstone: Pearl or Silver accessories",
        "Scent: Sandalwood & Jasmine to calm Mars energy",
        "Style Tip: Layered textures bring cosmic harmony",
      ],
    },
    {
      title: "Sun-dominated energy today",
      details: [
        "Power Color: Saffron Orange — radiates confidence",
        "Avoid: Dark Grey — blocks solar energy",
        "Fabric: Cotton or Linen for groundedness",
        "Gemstone: Ruby or Gold jewelry",
        "Scent: Citrus & Bergamot for vitality",
        "Style Tip: Minimalist elegance attracts success",
      ],
    },
  ],
  career: [
    {
      title: "Mercury in 10th House — Career Boost",
      details: [
        "Career Energy: Communication is your superpower",
        "Timing: Present ideas between 10 AM – 2 PM",
        "Warning: Avoid signing contracts on Tuesday",
        "Remedy: Chant 'Om Budhaya Namaha' 108 times",
      ],
    },
    {
      title: "Jupiter aspects your wealth house",
      details: [
        "Career Energy: Expansion and abundance incoming",
        "Timing: Thursday is your power day this week",
        "Warning: Don't overspend — save the surplus",
        "Remedy: Donate yellow foods on Thursday",
      ],
    },
  ],
  health: [
    {
      title: "Mars transit affects vitality",
      details: [
        "Body Focus: Core strength and digestion",
        "Diet: Warm, spiced foods — avoid cold drinks",
        "Exercise: Sun Salutations (Surya Namaskar)",
        "Ayurvedic Tip: Drink turmeric milk before bed",
        "Avoid: Excess caffeine — Mars is already fiery",
      ],
    },
    {
      title: "Moon in watery sign — emotional detox",
      details: [
        "Body Focus: Hydration and lymphatic system",
        "Diet: Fruits and cooling herbs (mint, cucumber)",
        "Exercise: Gentle yoga or swimming",
        "Ayurvedic Tip: Coconut oil self-massage (Abhyanga)",
        "Avoid: Heavy, fried foods today",
      ],
    },
  ],
};

export function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
