import { createWalletClient, custom, getAddress } from 'viem';
import { optimism, base } from 'viem/chains';

export const CHAINS = {
  optimism: {
    ...optimism,
    name: 'Optimism',
  },
  base: {
    ...base,
    name: 'Base',
  },
};

export function createClient() {
  if (typeof window === 'undefined' || !window.ethereum) {
    return null;
  }

  return createWalletClient({
    transport: custom(window.ethereum),
  });
}

export function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
} 