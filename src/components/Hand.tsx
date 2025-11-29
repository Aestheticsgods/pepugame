import { useGameStore } from '@/store/gameStore';
import { CaptainCard } from './CaptainCard';
import { Button } from './ui/button';
import { useDroppable } from "@dnd-kit/core";

export const Hand = () => {
  const { hand, removeFromHand } = useGameStore();
  const { setNodeRef, isOver } = useDroppable({
    id: "hand-dropzone",
  });

  // Dynamic classes for visual feedback when dragging over
  const containerClasses = `space-y-4 p-4 rounded-lg transition-colors duration-200 border-2 ${
    isOver 
      ? "bg-primary/10 border-primary border-dashed" 
      : "border-transparent"
  }`;

  if (hand.length === 0) {
    return (
      <div
        ref={setNodeRef}
        className={`w-full p-8 rounded-lg border-2 border-dashed transition-colors duration-200 ${
          isOver 
            ? "bg-primary/10 border-primary" 
            : "border-border bg-card/50"
        }`}
      >
        <p className="text-center text-muted-foreground pointer-events-none">
          Your hand is empty. Swipe to drag cards here or select them from the deck below.
        </p>
      </div>
    );
  }

  return (
    <div ref={setNodeRef} className={containerClasses}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Your Hand</h2>
        <div className="text-sm text-muted-foreground">
          {hand.length}/5 cards
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {hand.map((captain) => (
          <div 
            key={captain.id} 
            // Added select-none and [&_img]:pointer-events-none to prevent native image dragging
            className="relative group select-none [&_img]:pointer-events-none"
          >
            <CaptainCard 
              captain={captain} 
              isInHand 
              showPowerLevel={false} // Hide power level in hand
            />
          <Button
            variant="destructive"
            size="sm"
            className="absolute -top-2 -right-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity z-10 pointer-events-auto flex items-center justify-center"
            onClick={() => removeFromHand(captain.id)}
          >
            {/* Desktop: full word */}
            <span className="hidden sm:block">Remove</span>

            {/* Mobile: X icon */}
            <span className="block sm:hidden text-lg leading-none">✕</span>
          </Button>
          </div>
        ))}
      </div>
    </div>
  );
};