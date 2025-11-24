import { create } from 'zustand';
import { Captain, GameState } from '@/types/captain';

interface GameStore extends GameState {
  setDeck: (deck: Captain[]) => void;
  addToHand: (card: Captain) => void;
  removeFromHand: (cardId: string) => void;
  addToBattlefield: (card: Captain) => void;
  removeFromBattlefield: (cardId: string) => void;
  toggleCardSelection: (cardId: string) => void;
  toggleCardFlip: (cardId: string) => void;
  resetGame: () => void;
}

const initialState: GameState = {
  deck: [],
  hand: [],
  battlefield: [],
  selectedCards: new Set(),
  isCardFlipped: {},
};

export const useGameStore = create<GameStore>((set) => ({
  ...initialState,

  setDeck: (deck) => set({ deck }),

  addToHand: (card) =>
    set((state) => ({
      hand: [...state.hand, card],
      deck: state.deck.filter((c) => c.id !== card.id),
    })),

  removeFromHand: (cardId) =>
    set((state) => ({
      hand: state.hand.filter((c) => c.id !== cardId),
    })),

  addToBattlefield: (card) =>
    set((state) => ({
      battlefield: [...state.battlefield, card],
      hand: state.hand.filter((c) => c.id !== card.id),
    })),

  removeFromBattlefield: (cardId) =>
    set((state) => ({
      battlefield: state.battlefield.filter((c) => c.id !== cardId),
    })),

  toggleCardSelection: (cardId) =>
    set((state) => {
      const newSelected = new Set(state.selectedCards);
      if (newSelected.has(cardId)) {
        newSelected.delete(cardId);
      } else {
        if (newSelected.size < 5) {
          newSelected.add(cardId);
        }
      }
      return { selectedCards: newSelected };
    }),

  toggleCardFlip: (cardId) =>
    set((state) => ({
      isCardFlipped: {
        ...state.isCardFlipped,
        [cardId]: !state.isCardFlipped[cardId],
      },
    })),

  resetGame: () => set(initialState),
}));
