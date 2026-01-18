
export interface Word {
  id: number;
  spanish: string;
  transliteration: string;
  malaysian?: string;
  meaning: string;
  category: string;
  mnemonic?: string;
}

export type ViewMode = 'grid' | 'list' | 'flashcard';

export interface UserStats {
  learnedIds: number[];
  favoriteIds: number[];
}
