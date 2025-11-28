import { ConnectWithMetaMask } from './ConnectWithMetaMask';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-transparent border-none">
      <div className="container flex h-20 items-center justify-between px-4">
        
        {/* Logo */}
        <div className="flex items-center gap-4">
          <div className="text-3xl font-bold text-accent drop-shadow-[0_0_8px_hsl(var(--accent))]">
            PepuStars
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6 ml-8">
            <a 
              href="https://pepustars.com" 
              target="_blank" 
              className="text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
            >
              Website
            </a>

            <a 
              href="https://t.me/+nN2Y8C994ZI5OWNk" 
              target="_blank"
              className="text-sm text-white hover:text-accent transition-colors"
            >
              Telegram
            </a>

            <a 
              href="https://pepuswap.com/#/swap?outputCurrency=0x901db3533a321e64f3da4468138935ed01e19345" 
              target="_blank" 
              className="text-sm text-white hover:text-accent transition-colors"
            >
              Buy $PSTARS
            </a>
          </nav>
        </div>

        {/* Wallet Button with State Handling (MetaMask only) */}
        <div className="flex items-center">
          <ConnectWithMetaMask />
        </div>

      </div>
    </header>
  );
};