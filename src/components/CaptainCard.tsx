import { Captain } from '@/types/captain';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface CaptainCardProps {
  captain: Captain;
  isSelected?: boolean;
  isInHand?: boolean;
  onClick?: () => void;
  className?: string;
}

const rarityGlowClasses = {
  common: 'shadow-[0_0_15px_rgba(153,153,153,0.3)]',
  uncommon: 'shadow-[0_0_15px_rgba(74,222,128,0.4)]',
  rare: 'shadow-[0_0_20px_rgba(96,165,250,0.5)]',
  epic: 'shadow-[0_0_25px_rgba(167,139,250,0.6)]',
  legendary: 'shadow-[0_0_30px_rgba(251,191,36,0.7)]',
};

const rarityBorderClasses = {
  common: 'border-rarity-common',
  uncommon: 'border-rarity-uncommon',
  rare: 'border-rarity-rare',
  epic: 'border-rarity-epic',
  legendary: 'border-rarity-legendary',
};

export const CaptainCard = ({ 
  captain, 
  isSelected, 
  isInHand, 
  onClick,
  className 
}: CaptainCardProps) => {
  // Start with front side visible (false = front, true = back/stats)
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div
      className={cn(
        'group relative w-full aspect-[2/3] cursor-pointer transition-all duration-300',
        'hover:scale-105 hover:-translate-y-2 user-select-none',
        isInHand && 'animate-card-draw',
        className
      )}
      onClick={handleCardClick}
      style={{ perspective: '1000px' }}
    >
      <div
        className={cn(
          'relative w-full h-full transition-transform duration-600',
          'transform-style-3d',
          isFlipped && '[transform:rotateY(180deg)]'
        )}
      >
        {/* Card Front */}
        <div
          className={cn(
            'absolute w-full h-full backface-hidden',
            'rounded-lg overflow-hidden',
            'bg-card border-2',
            rarityBorderClasses[captain.rarity],
            rarityGlowClasses[captain.rarity],
            isSelected && 'ring-4 ring-primary'
          )}
        >
          {/* Card Image */}
          <div className="relative h-3/5 overflow-hidden pointer-events-none select-none">
            <img
              src={captain.image}
              alt={captain.name}
              className="w-full h-full object-cover"
              draggable="false"
            />
            {/* Rarity Badge */}
            <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-background/80 backdrop-blur-sm z-20">
              <span className={cn(
                'text-xs font-bold uppercase',
                `text-rarity-${captain.rarity}`
              )}>
                {captain.rarity}
              </span>
            </div>
          </div>

          {/* Card Info */}
          <div className="p-5 h-2/5 flex flex-col justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-1 truncate">
                {captain.name}
              </h3>
              <p className="text-xs text-muted-foreground">
                Click to view stats
              </p>
            </div>
            
            {/* Power Level Indicator */}
            <div className="flex items-center justify-center bg-muted rounded-lg p-4 min-h-[56px]">
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Power Level</div>
                <div className="text-lg font-bold text-primary">
                  {Math.round((captain.stats.power + captain.stats.flare + captain.stats.defense + captain.stats.instinct + captain.stats.luck + captain.stats.leadership) / 6)}
                </div>
              </div>
            </div>
          </div>

          {/* Hover Hint */}
          <div className="absolute bottom-2 left-0 right-0 text-center text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
            Click to flip
          </div>
        </div>

        {/* Card Back (Stats) */}
        <div
          className={cn(
            'absolute w-full h-full backface-hidden [transform:rotateY(180deg)]',
            'rounded-lg overflow-hidden',
            'bg-card border-2',
            rarityBorderClasses[captain.rarity],
            rarityGlowClasses[captain.rarity],
            'p-4 flex flex-col'
          )}
        >
          <h3 className="text-lg font-bold text-foreground mb-4 text-center truncate">
            {captain.name}
          </h3>
          
          <div className="flex-1 space-y-2.5 min-h-0 overflow-y-auto">
            {Object.entries(captain.stats).map(([stat, value]) => (
              <div key={stat} className="flex items-center justify-between gap-2">
                <span className="text-xs text-muted-foreground capitalize min-w-0 flex-shrink-0">
                  {stat}:
                </span>
                <div className="flex items-center gap-1 flex-1 min-w-0">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden min-w-[40px]">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${Math.min((value / 100) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-foreground w-6 text-right flex-shrink-0">
                    {value}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 text-center text-xs text-muted-foreground">
            Click to flip back
          </div>
        </div>
      </div>

      {/* Selected Indicator */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center z-10 animate-glow-pulse">
          <span className="text-primary-foreground font-bold text-sm">✓</span>
        </div>
      )}
    </div>
  );
};
