import { ConnectButton } from '@rainbow-me/rainbowkit';

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

        {/* Wallet Button with State Handling */}
        <div className="flex items-center">
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              // 1. Ensure component is mounted and auth is ready
              const ready = mounted && authenticationStatus !== 'loading';
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === 'authenticated');

              return (
                <div
                  {...(!ready && {
                    'aria-hidden': true,
                    'style': {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {(() => {
                    // State 1: Not Connected -> Show Yellow Button
                    if (!connected) {
                      return (
                        <button 
                          onClick={openConnectModal}
                          className="
                            px-6 py-2 rounded-xl 
                            bg-yellow-400 
                            text-[#003366] 
                            font-semibold
                            shadow-md
                            hover:bg-yellow-500 
                            transition-all
                          "
                        >
                          Connect Wallet
                        </button>
                      );
                    }

                    // State 2: Wrong Network -> Show Red Button
                    if (chain.unsupported) {
                      return (
                        <button 
                          onClick={openChainModal}
                          className="px-4 py-2 rounded-xl bg-red-500 text-white font-bold shadow-md hover:bg-red-600 transition-all"
                        >
                          Wrong network
                        </button>
                      );
                    }

                    // State 3: Connected -> Show Chain & Account Info
                    return (
                      <div className="flex items-center gap-3">

                        <button 
                          onClick={openAccountModal} 
                          type="button"
                          className="                            
                            px-6 py-2 rounded-xl 
                            bg-yellow-400 
                            text-[#003366] 
                            font-semibold
                            shadow-md
                            hover:bg-yellow-500 
                            transition-all"
                        >
                          {account.displayName}
                          {account.displayBalance
                            ? ` (${account.displayBalance})`
                            : ''}
                        </button>
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </div>

      </div>
    </header>
  );
};