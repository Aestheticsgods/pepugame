import { useGameStore } from '@/store/gameStore';
import { Swords } from 'lucide-react';

export const Battlefield = () => {
  const { battlefield } = useGameStore();

  return (
    <div className="w-full p-12 rounded-lg border-2 border-primary/30 bg-gradient-to-br from-card/50 to-background/50 backdrop-blur relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_70%)]" />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[300px]">
        <Swords className="w-16 h-16 text-primary/50 mb-4 animate-float" />
        <h2 className="text-3xl font-bold text-foreground mb-2">Battlefield</h2>
        <p className="text-muted-foreground text-center max-w-md mb-4">
          Battle mode coming soon! This area will come alive when you're ready to duel with your captains.
        </p>
        
        {battlefield.length > 0 ? (
          <div className="text-sm text-primary">
            {battlefield.length} captain{battlefield.length !== 1 ? 's' : ''} ready for battle
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">
            No captains deployed yet
          </div>
        )}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-4 left-4 w-20 h-20 border-2 border-primary/20 rounded-full animate-glow-pulse" />
      <div className="absolute bottom-4 right-4 w-32 h-32 border-2 border-accent/20 rounded-full animate-glow-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );
};
