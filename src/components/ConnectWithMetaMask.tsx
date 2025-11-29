import React from 'react';
import { 
  useConnect, 
  useAccount, 
  useDisconnect, 
  useChainId, 
  useChains, 
  useSwitchChain 
} from 'wagmi';

function shorten(address = '') {
  return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';
}

export const ConnectWithMetaMask: React.FC<{ buttonClass?: string; variant?: 'header' | 'hero' }> = ({
  buttonClass,
  variant = 'header',
}) => {  const { connectors, connect, status, error } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const availableChains = useChains();
  const { switchChain } = useSwitchChain();

  const [pendingId, setPendingId] = React.useState<string | null>(null);
  const meta = connectors.find(c => c.id === 'metaMask' || c.name === 'MetaMask');

  const baseClassHeader =
  'px-3 py-1 sm:px-6 sm:py-2 text-sm sm:text-base rounded-xl bg-yellow-400 text-[#003366] font-semibold shadow-md hover:bg-yellow-500 transition-all';

const baseClassHero =
  'px-8 py-2 text-lg rounded-xl bg-yellow-400 text-[#003366] font-semibold shadow-md hover:bg-yellow-500 transition-all';

const finalClass = buttonClass ?? (variant === 'hero' ? baseClassHero : baseClassHeader);


  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    console.log('connectors:', connectors.map(c => ({ id: c.id, name: c.name })));
    console.log('MetaMask found:', !!meta);
  }, [connectors, meta]);

  const handleConnect = async () => {
    if (!meta) {
      alert('MetaMask not detected. Please install the browser extension.');
      return;
    }

    try {
      setPendingId(meta.id);
      await connect({ connector: meta });
    } catch (err) {
      console.error(err);
      alert('Failed to connect MetaMask.');
    } finally {
      setPendingId(null);
    }
  };

  const currentChain = availableChains.find(c => c.id === chainId);
  const unsupported = !!(chainId && !currentChain);

  if (!isConnected) {
    return (
      <button
        onClick={handleConnect}
        className={finalClass}
        disabled={status === 'pending'}
      >
        {status === 'pending' && pendingId === meta?.id ? 'Connecting...' : 'Connect Wallet'}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {unsupported ? (
        <button
          onClick={async () => {
            try {
              await switchChain({ chainId: 1 });
            } catch (e) {
              console.error(e);
              alert('Could not switch network. Please change it manually in MetaMask.');
            }
          }}
          className={finalClass}
        >
          Wrong network
        </button>
      ) : (
        <>
          <button
            onClick={() => navigator.clipboard?.writeText(address ?? '')}
            className={finalClass}
            title="Click to copy address"
          >
            {shorten(address)}
          </button>

          <button
            onClick={() => disconnect()}
            className="px-2 py-1 sm:px-3 sm:py-2 text-sm sm:text-base rounded-xl bg-[#222] text-white font-semibold shadow-sm hover:opacity-90 transition-all"
          >
            Disconnect
          </button>
        </>
      )}
    </div>
  );
};

export default ConnectWithMetaMask;
