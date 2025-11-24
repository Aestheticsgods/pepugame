import { useGameStore } from '@/store/gameStore';
import { Twitter, MessageCircle } from 'lucide-react';

export const Footer = () => {
  const { deck, hand } = useGameStore();

  return (
    <footer className="w-full border-t border-border/50 bg-gradient-to-r from-card/80 via-card/60 to-card/80 backdrop-blur-xl">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Game Stats */}
          <div className="space-y-3">
            <h4 className="font-bold text-foreground mb-3">Captain's Hub</h4>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">Deck:</span>{' '}
                <span className="text-foreground font-bold">{deck.length} cards</span>
              </div>
              <div>
                <span className="text-muted-foreground">Hand:</span>{' '}
                <span className="text-foreground font-bold">{hand.length}/5 cards</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-muted-foreground">TCG Coming Soon</span>
              </div>
            </div>
          </div>

          {/* Community Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-foreground mb-3">Join Community</h4>
            <div className="flex flex-col gap-3">
              <a 
                href="https://t.me/+nN2Y8C994ZI5OWNk" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                Telegram
              </a>
              <a 
                href="https://x.com/PepuStars" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Twitter className="w-4 h-4" />
                Twitter
              </a>
              <a 
                href="https://pepuswap.com/#/swap?outputCurrency=0x901db3533a321e64f3da4468138935ed01e19345" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors duration-300"
              >
                💫 Buy $PSTARS
              </a>
            </div>
          </div>

          {/* Project Info */}
          <div className="space-y-3">
            <h4 className="font-bold text-foreground mb-3">PepuStars</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>10,000 PepuStars NFT Collection</p>
              <p>500 Limited Edition Captains</p>
              <p>Trading Card Game Evolution</p>
            </div>
          </div>
        </div>

        <div className="text-center pt-6 border-t border-border/30">
          <p className="text-sm text-muted-foreground mb-2">
            A cosmic rift has shattered the Pepu Kingdom. Legends must rise to restore balance.
          </p>
          <p className="text-xs text-muted-foreground">
            pepustars.com 2025 • All rights reserved • Powered by{' '}
            <span className="text-accent font-semibold">$PSTARS</span>
            {' '}on{' '}
            <span className="text-primary font-semibold">Pepe Unchained L2</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
