export interface VisualClue {
  trait: string; // e.g. "Sonrisa / Expresión facial"
  observation: string; // e.g. "Una sonrisa radiante de oreja a oreja y mirada juguetona"
  dogEquivalent: string; // e.g. "Igual que un Golden Retriever cuando le dices '¿vamos al parque?'"
}

export interface PersonalityProfile {
  energyLevel: number; // 0 - 100
  sociability: number; // 0 - 100
  sleepNeed: number; // 0 - 100
  dramaQuotient: number; // 0 - 100
  mischiefLevel: number; // 0 - 100
  loyalty: number; // 0 - 100
}

export interface DailyLifePrediction {
  morningRoutine: string;
  reactionToDoorbell: string;
  favoriteTreat: string;
  secretSuperpower: string;
}

export interface RunnerUpBreed {
  breedName: string;
  percentage: number;
  quickReason: string;
}

export interface DogMatchResult {
  id: string;
  breedName: string;
  breedOrigin: string;
  compatibilityPercentage: number;
  alterEgoTitle: string;
  summaryPunchline: string;
  whyThisBreed: string;
  visualClues: VisualClue[];
  personalityProfile: PersonalityProfile;
  dailyLifePrediction: DailyLifePrediction;
  dogAdvice: string;
  runnerUpBreeds: RunnerUpBreed[];
  dogBreedPhotoUrl?: string;
  dogEmoji: string;
  personVibeKeywords: string[];
  userImageBase64: string;
  createdAt: string;
}

export interface DogBreedCatalogItem {
  name: string;
  commonNames: string[];
  origin: string;
  imageUrl: string;
  fallbackImageUrl: string;
  emoji: string;
  personalityKeywords: string[];
  description: string;
}
