import React from 'react';
import { useConnect, useAccount, useDisconnect, useChainId, useChains, useSwitchChain } from 'wagmi';

function shorten(address = '') {
  return address ? `${address.substring(0,6)}...${address.substring(address.length-4)}` : '';
}

export const ConnectWithMetaMask: React.FC<{ buttonClass?: string }> = ({ buttonClass }) => {
  const { connectors, connect, isLoading, pendingConnector } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const availableChains = useChains();
  const { switchChain } = useSwitchChain();

  // Try to find a MetaMask connector from the available connectors
  const meta = connectors.find(c => (c.name && c.name.toLowerCase().includes('meta')) || c.id === 'metaMask');

  React.useEffect(() => {
    // Debug: log available connectors to help diagnose when MetaMask isn't present
    // Open browser console to view these logs when you click Connect
    // eslint-disable-next-line no-console
    console.log('wagmi connectors:', connectors.map(c => ({ id: c.id, name: c.name }))); 
    // eslint-disable-next-line no-console
    console.log('found meta connector?', !!meta, meta?.id ?? meta?.name);
  }, [connectors, meta]);

  const handleConnect = async () => {
    if (!meta) return alert('MetaMask connector not available in this environment.');
    try {
      await connect({ connector: meta });
    } catch (err) {
      // connect will surface its own errors; show a simple alert for now
      console.error(err);
      alert('Failed to connect MetaMask. See console for details.');
    }
  };

  // determine if the current chain is supported by the app
  const currentChain = availableChains?.find((c: any) => c.id === chainId);
  const unsupported = !!(chainId && !currentChain);

  if (!isConnected) {
    return (
      <div>
        <button
          onClick={handleConnect}
          className={buttonClass ?? 'px-6 py-2 rounded-xl bg-yellow-400 text-[#003366] font-semibold shadow-md hover:bg-yellow-500 transition-all'}
          disabled={isLoading}
        >
          {isLoading && pendingConnector?.id === meta?.id ? 'Connecting...' : 'Connect Wallet'}
        </button>
      </div>
    );
  }

  // Connected state
  return (
    <div className="flex items-center gap-3">
      {unsupported ? (
        <button
          onClick={() => {
            // try to switch to mainnet (1) if available
            if (switchChain) switchChain(1);
            else alert('Please switch network in your wallet.');
          }}
          className={buttonClass ?? 'px-4 py-2 rounded-xl bg-red-500 text-white font-bold shadow-md hover:bg-red-600 transition-all'}
        >
          Wrong network
        </button>
      ) : (
        <>
          <button
            onClick={() => navigator.clipboard?.writeText(address ?? '')}
            className={buttonClass ?? 'px-6 py-2 rounded-xl bg-yellow-400 text-[#003366] font-semibold shadow-md hover:bg-yellow-500 transition-all'}
            title="Click to copy address"
          >
            {shorten(address)}
          </button>
          <button
            onClick={() => disconnect()}
            className="px-3 py-2 rounded-xl bg-[#222] text-white font-semibold shadow-sm hover:opacity-90 transition-all"
          >
            Disconnect
          </button>
        </>
      )}
    </div>
  );
};

export default ConnectWithMetaMask;
