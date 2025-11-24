export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface CaptainStats {
  power: number;
  flare: number;
  defense: number;
  instinct: number;
  luck: number;
  leadership: number;
}

export interface Captain {
  id: string;
  tokenId: number;
  name: string;
  image: string;
  rarity: Rarity;
  stats: CaptainStats;
  owner: string;
}

export interface GameState {
  deck: Captain[];
  hand: Captain[];
  battlefield: Captain[];
  selectedCards: Set<string>;
  isCardFlipped: Record<string, boolean>;
}
