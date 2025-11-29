import { Captain } from '@/types/captain';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface CaptainCardProps {
  captain: Captain;
  isSelected?: boolean;
  isInHand?: boolean;
  onClick?: () => void;
  showClickHint?: boolean;
  className?: string;
  showPowerLevel?: boolean;
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
  showClickHint = true,
  showPowerLevel = true,
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
          <div className="p-3 h-2/5 flex flex-col justify-between gap-1 text-center">
            <div>
              <h3 className="text-xs sm:text-lg font-bold text-foreground mb-1 truncate">
                {captain.name}
              </h3>
              {showClickHint && (
                      <p className="text-xs text-muted-foreground">
                        Click for stats
                      </p>
              )}
            </div>
            
            {/* Power Level Indicator */}
            {showPowerLevel && (
                <div className="flex items-center justify-center bg-muted rounded-lg">
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">Power Level</div>
                    <div className="text-base font-bold text-primary">
                      {Math.round((captain.stats.power + captain.stats.flare + captain.stats.defense + captain.stats.instinct + captain.stats.luck + captain.stats.leadership) / 6)}
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>

        {/* Card Back (Stats) */}
  <div
  className={cn(
    "absolute w-full h-full backface-hidden [transform:rotateY(180deg)]",
    "rounded-lg overflow-hidden",
    "bg-card border-2",
    rarityBorderClasses[captain.rarity],
    rarityGlowClasses[captain.rarity],
    "p-2 sm:p-4 flex flex-col"
  )}
>

 {/* Stats container – no scrolling on desktop */}
  <div className="flex-1 flex flex-col justify-between gap-1 sm:gap-1 overflow-y-auto lg:overflow-visible pr-1">
    {Object.entries(captain.stats).map(([stat, value]) => (
      <div 
        key={stat} 
        className="flex flex-col items-center gap-1"
      >
        {/* Label - centered */}
        <span className="text-[10px] sm:text-xs text-muted-foreground capitalize text-center">
          {stat}
        </span>

        {/* Bar + Value */}
        <div className="flex items-center gap-2 w-full">
          
          {/* Progress bar */}
          <div className="flex-1 h-[6px] sm:h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${Math.min(value, 100)}%` }}
            />
          </div>

          {/* Value */}
          <span className="text-[10px] sm:text-xs font-bold text-foreground w-6 text-right flex-shrink-0">
            {value}
          </span>
        </div>
      </div>
    ))}
  </div>

  {/* Footer */}
  <div className="mt-2 sm:mt-3 text-center text-[10px] sm:text-xs text-muted-foreground">
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
