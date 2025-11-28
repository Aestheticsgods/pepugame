import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Header } from '@/components/Header';
import { DeckGrid } from '@/components/DeckGrid';
import { Hand } from '@/components/Hand';
import { Battlefield } from '@/components/Battlefield';
import { Footer } from '@/components/Footer';
import { CosmicBackground } from '@/components/CosmicBackground';
import { useGameStore } from '@/store/gameStore';
import { generateMockCaptains } from '@/utils/mockData';
import { Button } from '@/components/ui/button';
import { ConnectWithMetaMask } from '@/components/ConnectWithMetaMask';
import { 
  DndContext, 
  DragEndEvent, 
  useSensor, 
  useSensors, 
  PointerSensor,
  TouchSensor,
  MouseSensor
} from "@dnd-kit/core";


const Index = () => {
  const { isConnected } = useAccount();
  const { deck, setDeck, resetGame, addToHand, hand } = useGameStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;

    // If dropped over the Hand component
    if (over?.id === "hand-dropzone") {
      const captain = active.data.current?.captain;
      
      // Check validation (not already in hand, hand limit not reached)
      // Note: addToHand usually handles duplication checks, but good to check size here
      if (captain && hand.length < 5) {
        addToHand(captain);
      }
    }
  };
  
  useEffect(() => {
    if (isConnected && deck.length === 0) {
      // Load mock captains for testing
      // In production, this would fetch from blockchain
      const mockCaptains = generateMockCaptains(24);
      setDeck(mockCaptains);
    }
  }, [isConnected, deck.length, setDeck]);

if (!isConnected) {
  return (
    <CosmicBackground>
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-4 relative">
        <div className="max-w-7xl w-full">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-20">
            {/* Left Side - Text and Buttons */}
            <div className="space-y-6 text-center lg:text-left order-1">
              <div className="space-y-4">
                <div className="mb-8">
                  <h1 className="text-6xl md:text-8xl font-black text-accent drop-shadow-[0_0_30px_hsl(var(--accent))] animate-fade-in leading-tight mb-4 flex items-end gap-4">
                    PepuStars
                    <span className="
                      text-xs 
                      md:text-sm 
                      font-bold 
                      px-2 
                      py-1 
                      rounded-md 
                      bg-accent/20 
                      text-accent 
                      border 
                      border-accent/40 
                      drop-shadow-[0_0_6px_hsl(var(--accent))]
                    ">
                      BETA
                    </span>
                  </h1>

                  <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
                    The Stars Are Lost.{' '}
                    <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
                      Legends Must Rise
                    </span>
                  </h2>
                </div>

                <p className="text-xl md:text-2xl font-bold text-foreground/90 leading-relaxed">
                  A cosmic rift has torn through the Pepu Kingdom, scattering its stars across the universe. Only 10,000 living PepuStars remain—rare, on-chain NFTs you can collect, battle, and evolve.
                </p>
                <p className="text-lg text-muted-foreground">
                  Guided by the Captain, your quest is to reclaim the lost stars and restore balance to the realm.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 items-center lg:items-start justify-center lg:justify-start pt-8">
                <ConnectWithMetaMask />
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-bold px-8 py-4 text-lg rounded-xl shadow-[0_0_20px_hsl(var(--accent)/0.3)] hover:shadow-[0_0_40px_hsl(var(--accent)/0.6)] transition-all duration-300"
                  onClick={() => window.open('https://t.me/+nN2Y8C994ZI5OWNk', '_blank')}
                >
                  📱 Join Telegram
                </Button>
              </div>

              {/* Hero Image - Mobile Only (below buttons) */}
              <div className="flex justify-center pt-8 lg:hidden">
                <div className="relative max-w-sm mx-auto">
                  <div className="relative rounded-3xl overflow-hidden border-4 border-accent/30 shadow-[0_0_60px_hsl(var(--accent)/0.4)] hover:shadow-[0_0_80px_hsl(var(--accent)/0.6)] transition-all duration-500 hover:scale-105">
                    <img 
                    decoding="async"
                    width="683"
                    height="1024"
                    src="https://pepustars.com/wp-content/uploads/2025/09/c5646078-f432-40e5-bb66-9efed260d701-683x1024.webp"
                    alt="PepuStars Captain"
                    srcSet="https://pepustars.com/wp-content/uploads/2025/09/c5646078-f432-40e5-bb66-9efed260d701-683x1024.webp 683w, https://pepustars.com/wp-content/uploads/2025/09/c5646078-f432-40e5-bb66-9efed260d701-200x300.webp 200w, https://pepustars.com/wp-content/uploads/2025/09/c5646078-f432-40e5-bb66-9efed260d701-768x1152.webp 768w, https://pepustars.com/wp-content/uploads/2025/09/c5646078-f432-40e5-bb66-9efed260d701-800x1200.webp 800w, https://pepustars.com/wp-content/uploads/2025/09/c5646078-f432-40e5-bb66-9efed260d701.webp 1024w"
                    sizes="(max-width: 683px) 100vw, 683px"
                    className="w-full h-auto object-cover"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none"></div>
                  </div>
                  {/* Glow Effect */}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 blur-3xl rounded-3xl"></div>
                </div>
              </div>
            </div>

            {/* Right Side - Hero Image (Desktop Only) */}
            <div className="hidden lg:block relative order-2">
              <div className="relative rounded-3xl overflow-hidden border-4 border-accent/30 shadow-[0_0_60px_hsl(var(--accent)/0.4)] hover:shadow-[0_0_80px_hsl(var(--accent)/0.6)] transition-all duration-500 hover:scale-105 max-w-sm mx-auto">
                <img 
                  decoding="async"
                  width="683"
                  height="1024"
                  src="https://pepustars.com/wp-content/uploads/2025/09/c5646078-f432-40e5-bb66-9efed260d701-683x1024.webp"
                  alt="PepuStars Captain"
                  srcSet="https://pepustars.com/wp-content/uploads/2025/09/c5646078-f432-40e5-bb66-9efed260d701-683x1024.webp 683w, https://pepustars.com/wp-content/uploads/2025/09/c5646078-f432-40e5-bb66-9efed260d701-200x300.webp 200w, https://pepustars.com/wp-content/uploads/2025/09/c5646078-f432-40e5-bb66-9efed260d701-768x1152.webp 768w, https://pepustars.com/wp-content/uploads/2025/09/c5646078-f432-40e5-bb66-9efed260d701-800x1200.webp 800w, https://pepustars.com/wp-content/uploads/2025/09/c5646078-f432-40e5-bb66-9efed260d701.webp 1024w"
                  sizes="(max-width: 683px) 100vw, 683px"
                  className="w-full h-auto object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none"></div>
              </div>
              {/* Glow Effect */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 blur-3xl rounded-3xl"></div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 mb-5">
            <div className="group p-8 rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm hover:border-primary/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_hsl(var(--primary)/0.4)]">
  <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="w-16 h-16 text-yellow-400 drop-shadow-[0_0_12px_#FFD700]"
    fill="currentColor"
  >
    <path d="M12 2.5l2.9 6.2 6.6.9-4.8 4.7 1.1 6.6L12 17.8l-5.8 3 1.1-6.6-4.8-4.7 6.6-.9L12 2.5z" />
  </svg>
</div>


  <h3 className="text-2xl font-bold text-foreground mb-4">10,000 PepuStars NFT's</h3>
  <p className="text-base text-muted-foreground leading-relaxed">
    Living fragments of power and destiny. From humble Embers to ultra-rare Shooting Stars, each one holds a spark of balance.
  </p>
</div>

            
<div className="group p-8 rounded-2xl border-2 border-secondary/30 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm hover:border-secondary/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_hsl(var(--secondary)/0.4)]">
  {/* Compass Icon */}
  <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="w-16 h-16 text-accent drop-shadow-[0_0_8px_hsl(var(--accent))]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="12" cy="12" r="9" className="stroke-current" />
      <path d="M7.5 16.5l6-3 3-6-6 3-3 6z" className="fill-current text-accent/90" />
      <circle cx="12" cy="12" r="1.2" className="fill-current text-accent" />
    </svg>
  </div>

  <h3 className="text-2xl font-bold text-foreground mb-4">500 Captain NFT's (Limited Edition)</h3>
  <p className="text-base text-muted-foreground leading-relaxed">
    500-NFT Captain Collection guiding the community to recover fallen stars and wield their strength in battles to come.
  </p>
</div>

            
<div className="group p-8 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm hover:border-accent/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_hsl(var(--accent)/0.4)]">

  {/* Playing Card Icon */}
  <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor"
      className="w-16 h-16 text-accent drop-shadow-[0_0_8px_hsl(var(--accent))]"
    >
      <rect x="4" y="2" width="16" height="20" rx="3" ry="3" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M12 7c-2 2-3 3.5-3 5.5a3 3 0 0 0 6 0C15 10.5 14 9 12 7z" fill="currentColor"/>
    </svg>
  </div>

  <h3 className="text-2xl font-bold text-foreground mb-4">
    Trading Card Game
  </h3>

  <p className="text-base text-muted-foreground leading-relaxed">
Collect, battle, and evolve your PepuStars & PepuStars Captains. On-chain gameplay with progression, tournaments, and seasonal updates.  </p>
</div>

          </div>
        </div>
      </main>
    </CosmicBackground>
  );
}

  return (
         <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <CosmicBackground>
        <div className="min-h-screen flex flex-col">
          <Header />
        
          <main className="flex-1 container px-4 py-8 space-y-12">
            {/* Battlefield Section */}
            <section>
              <Battlefield />
            </section>

            {/* Hand Section - This is our Drop Zone */}
            <section>
              <Hand />
            </section>

            {/* Deck Section - This contains our Draggables */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Your Deck</h2>
                <Button
                  variant="outline"
                  onClick={resetGame}
                >
                  Reset Game
                </Button>
              </div>
              <DeckGrid captains={deck} />
            </section>
          </main>

          <Footer />
        </div>
      </CosmicBackground>
    </DndContext>
  );
};

export default Index;
