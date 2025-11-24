import { Captain } from '@/types/captain';
import { CaptainCard } from './CaptainCard';
import { useGameStore } from '@/store/gameStore';
import { Button } from './ui/button';
import { useState } from 'react';
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

// 1. Create a wrapper component for the draggable logic
const DraggableCaptainCard = ({ captain, isSelected, toggleSelection, canDrawMore }: any) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: captain.id,
    data: { captain }, // Pass the captain data to access it in onDragEnd
    disabled: isSelected // Optional: Disable dragging if already selected/in hand logic requires it
  });

  const style = transform ? {
    transform: CSS.Translate.toString(transform),
    zIndex: 50, // Ensure it floats above other elements while dragging
    cursor: 'grabbing'
  } : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="touch-none">
      <CaptainCard
        captain={captain}
        isSelected={isSelected}
        onClick={() => {
            // Check logic inside the wrapper to prevent click-through issues
            if (canDrawMore || isSelected) {
              toggleSelection(captain.id);
            }
        }}
      />
    </div>
  );
};

interface DeckGridProps {
  captains: Captain[];
}

export const DeckGrid = ({ captains }: DeckGridProps) => {
  const { selectedCards, toggleCardSelection, addToHand, hand } = useGameStore();
  const [filter, setFilter] = useState<string>('all');

  const filteredCaptains = captains.filter((captain) => {
    if (filter === 'all') return true;
    return captain.rarity === filter;
  });

  const handleDrawSelectedCards = () => {
    const cardsToAdd = captains.filter((c) => selectedCards.has(c.id));
    cardsToAdd.forEach((card) => addToHand(card));
  };

  const canDrawMore = hand.length < 5;
  const hasSelection = selectedCards.size > 0;

  return (
    <div className="space-y-4">
      {/* Filter Bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex gap-2 flex-wrap">
          {['all', 'common', 'uncommon', 'rare', 'epic', 'legendary'].map((rarity) => (
            <Button
              key={rarity}
              variant={filter === rarity ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(rarity)}
              className="capitalize"
            >
              {rarity}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Selected: {selectedCards.size}/5 | In Hand: {hand.length}/5
          </div>
          <div className="flex gap-2">
            {hasSelection && canDrawMore && (
              <Button
                onClick={handleDrawSelectedCards}
                className="bg-primary hover:bg-primary/90"
              >
                Draw Selected Cards
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
            >
              Reset Cards
            </Button>
          </div>
        </div>
      </div>

      {/* Deck Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredCaptains.map((captain) => (
            // 2. Use the wrapper here
          <DraggableCaptainCard
            key={captain.id}
            captain={captain}
            isSelected={selectedCards.has(captain.id)}
            toggleSelection={toggleCardSelection}
            canDrawMore={canDrawMore}
          />
        ))}
      </div>

      {filteredCaptains.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No captains found with this filter</p>
        </div>
      )}
    </div>
  );
};