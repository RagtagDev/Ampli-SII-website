<script lang="ts">
  import { onMount } from 'svelte';
  import { createClient, CHAINS, formatAddress } from '$lib/wallet';
  import type { WalletClient } from 'viem';
  import type { Chain } from 'viem';
  import { createPublicClient, http, parseEther } from 'viem';
  import { optimism } from 'viem/chains';
  import { agentAbi } from '../../abi/agentAbi';
  import { supplyCollateralCalldata } from '../../utils';

  const poolKey = {
    currency0: "0x9E357a7ee75914452f06DdFb9622f924276024a3",
    currency1: "0xb42Cfe81B72A2a3be27BA2f7D3D3eBD4Cc157661",
    fee: 100,
    tickSpacing: 1,
    hooks: "0x00D6aFb06576DEA356cBa9F44Ba71aB4eb780Ac0",
  } as const;

  const authorizedOperator = "0x934F58ADbda47765F81727894803D497fb7d68F3";

  const publicSpokeClient = createPublicClient({
    chain: optimism,
    transport: http("http://127.0.0.1:9545/"),
  });

  // Position-level action functions
  async function handleNewPosition() {
    // TODO: Implement new position creation
    console.log('Creating new position');
  }

  async function handleDeposit(positionId: number) {
    if (!isWalletConnected || !walletClient) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      // Ensure we're on the correct chain (Optimism) for the deposit
      if (selectedChain.id !== CHAINS.optimism.id) {
        await switchChain(CHAINS.optimism);
      }

      // Get the account address
      const [address] = await walletClient.getAddresses();
      if (!address) {
        throw new Error('No account found in wallet');
      }

      const execution = supplyCollateralCalldata(poolKey, BigInt(positionId), parseEther("1"));

      const { request } = await publicSpokeClient.simulateContract({
        account: address,
        address: "0x31842da3bc6eB9fe0Ba9F2b332B7965d75309041",
        abi: agentAbi,
        functionName: "initiate",
        args: [
          authorizedOperator,
          execution,
          [
            {
              currency: "0xb42Cfe81B72A2a3be27BA2f7D3D3eBD4Cc157661",
              amount: parseEther("1"),
            },
          ],
        ],
        chain: optimism,
      });

      const hash = await walletClient.writeContract(request);
      console.log(`AddFungibleCollateral Tx: ${hash}`);
    } catch (error) {
      console.error('Error depositing to position:', error);
      if (error instanceof Error) {
        alert(`Failed to deposit: ${error.message}`);
      } else {
        alert('Failed to deposit. Please try again.');
      }
    }
  }

  async function handleBorrow(positionId: number) {
    // TODO: Implement borrow functionality
    console.log('Borrowing from position:', positionId);
  }

  async function handleRepay(positionId: number) {
    // TODO: Implement repay functionality
    console.log('Repaying position:', positionId);
  }

  async function handleClosePosition(positionId: number) {
    // TODO: Implement position closing
    console.log('Closing position:', positionId);
  }

  // Asset-level action functions
  async function handleWithdraw(positionId: number, assetId: number) {
    // TODO: Implement asset withdrawal
    console.log('Withdrawing asset:', assetId, 'from position:', positionId);
  }

  async function handleSwap(positionId: number, assetId: number) {
    // TODO: Implement asset swap
    console.log('Swapping asset:', assetId, 'in position:', positionId);
  }

  // Mock data for positions and their assets
  let positions = [
    {
      id: 1,
      value: '$15,000',
      debt: '$5,000',
      marginRatio: '40%',
      minMarginRatio: '150%',
      isExpanded: false,
      assets: [
        {
          id: 1,
          name: 'ETH',
          symbol: 'ETH',
          value: '$7,000',
          marginRequirement: '$3,500',
          type: 'collateral',
          icon: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
        },
        {
          id: 2,
          name: 'USD Coin',
          symbol: 'USDC',
          value: '$3,000',
          marginRequirement: '$500',
          type: 'collateral',
          icon: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png',
        },
        {
          id: 3,
          name: 'Tether',
          symbol: 'USDT',
          value: '$5,000',
          marginRequirement: '$2,000',
          type: 'debt',
          icon: 'https://assets.coingecko.com/coins/images/325/large/tether.png',
        },
      ],
    },
    {
      id: 2,
      value: '$25,000',
      debt: '$15,000',
      marginRatio: '66%',
      minMarginRatio: '150%',
      isExpanded: false,
      assets: [
        {
          id: 1,
          name: 'Ethereum',
          symbol: 'ETH',
          value: '$15,000',
          marginRequirement: '$5,500',
          type: 'collateral',
          icon: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
        },
        {
          id: 2,
          name: 'USD Coin',
          symbol: 'USDC',
          value: '$10,000',
          marginRequirement: '$4,000',
          type: 'collateral',
          icon: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png',
        },
        {
          id: 3,
          name: 'Tether',
          symbol: 'USDT',
          value: '$15,000',
          marginRequirement: '$7,000',
          type: 'debt',
          icon: 'https://assets.coingecko.com/coins/images/325/large/tether.png',
        },
      ],
    },
  ];

  let selectedChain: Chain = CHAINS.optimism;
  let isWalletConnected = false;
  let walletAddress = '';
  let shortAddress = '';
  let isDropdownOpen = false;
  let isAddressDropdownOpen = false;
  let walletClient: WalletClient | null = null;

  let accountsChangedListener: ((accounts: string[]) => void) | null = null;
  let chainChangedListener: ((chainId: string) => void) | null = null;

  function togglePosition(positionId: number) {
    positions = positions.map(pos => {
      if (pos.id === positionId) {
        return { ...pos, isExpanded: !pos.isExpanded };
      }
      return pos;
    });
  }

  async function checkConnection() {
    // Reset state first
    isWalletConnected = false;
    walletAddress = '';
    shortAddress = '';

    walletClient = createClient();
    if (walletClient) {
      try {
        const [address] = await walletClient.getAddresses();
        if (address) {
          walletAddress = address;
          shortAddress = formatAddress(address);
          isWalletConnected = true;
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    }
  }

  async function disconnectWallet() {
    // Reset all state
    isWalletConnected = false;
    walletAddress = '';
    shortAddress = '';
    isAddressDropdownOpen = false;
    isDropdownOpen = false;
    walletClient = null;
  }

  // Update onMount to handle initial state and cleanup
  onMount(() => {
    // Reset state on mount
    checkConnection();

    if (typeof window.ethereum !== 'undefined') {
      // Create listeners
      accountsChangedListener = async (accounts: string[]) => {
        await checkConnection();
      };

      chainChangedListener = async (chainId: string) => {
        const chainIdNum = parseInt(chainId, 16);
        if (chainIdNum === CHAINS.optimism.id) {
          selectedChain = CHAINS.optimism;
        } else if (chainIdNum === CHAINS.base.id) {
          selectedChain = CHAINS.base;
        }
        await checkConnection();
      };

      // Add listeners
      window.ethereum.on('accountsChanged', accountsChangedListener);
      window.ethereum.on('chainChanged', chainChangedListener);
    }

    // Cleanup function
    return () => {
      if (typeof window.ethereum !== 'undefined') {
        if (accountsChangedListener) {
          window.ethereum.removeListener('accountsChanged', accountsChangedListener);
        }
        if (chainChangedListener) {
          window.ethereum.removeListener('chainChanged', chainChangedListener);
        }
      }
    };
  });

  async function switchChain(chain: Chain) {
    if (!walletClient) return;
    
    try {
      await walletClient.switchChain({ id: chain.id });
      selectedChain = chain;
    } catch (error: any) {
      // If the chain is not added to MetaMask, add it
      if (error.code === 4902) {
        try {
          await walletClient.addChain({
            chain,
          });
          selectedChain = chain;
        } catch (addError) {
          console.error('Error adding chain:', addError);
          alert('Failed to add the chain to MetaMask');
        }
      } else {
        console.error('Error switching chain:', error);
        alert('Failed to switch chain');
      }
    }
  }

  async function connectWallet() {
    try {
      // Reset state before connecting
      isWalletConnected = false;
      walletAddress = '';
      shortAddress = '';

      walletClient = createClient();
      if (!walletClient) {
        alert('Please install MetaMask or another Web3 wallet to use this feature');
        return;
      }

      // Request account access
      const [address] = await walletClient.getAddresses();
      
      if (!address) {
        throw new Error('No accounts found');
      }

      // Update state with new connection
      walletAddress = address;
      shortAddress = formatAddress(address);
      isWalletConnected = true;

      // Switch to selected chain after connecting
      await switchChain(selectedChain);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      if (error instanceof Error && error.message.includes('User rejected')) {
        alert('Please connect your wallet to continue');
      } else {
        alert('Failed to connect wallet. Please try again.');
      }
      // Reset state on error
      isWalletConnected = false;
      walletAddress = '';
      shortAddress = '';
      walletClient = null;
    }
  }

  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }

  function handleChainSelect(chain: Chain) {
    switchChain(chain);
    isDropdownOpen = false;
  }

  function toggleAddressDropdown() {
    isAddressDropdownOpen = !isAddressDropdownOpen;
  }
</script>

<div class="fixed top-6 left-8 z-50 text-white text-2xl font-bold tracking-tight select-none">
  Ampli
</div>

<div class="fixed top-6 right-8 z-50 flex items-center gap-4">
  {#if isWalletConnected}
    <div class="relative">
      <button
        on:click={toggleDropdown}
        class="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center gap-2"
      >
        {selectedChain.name}
        <svg
          class="w-4 h-4 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {#if isDropdownOpen}
        <div class="absolute top-full left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2">
          {#each Object.values(CHAINS) as chain}
            <button
              on:click={() => handleChainSelect(chain)}
              class="w-full px-4 py-2 text-left text-white hover:bg-gray-700 transition-colors flex items-center gap-2"
            >
              {#if chain.id === selectedChain.id}
                <span class="text-green-400">●</span>
              {/if}
              {chain.name}
            </button>
          {/each}
        </div>
      {/if}
    </div>

    <div class="relative">
      <button
        on:click={toggleAddressDropdown}
        class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2"
      >
        <span class="text-green-400">●</span>
        {shortAddress}
        <svg
          class="w-4 h-4 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {#if isAddressDropdownOpen}
        <div class="absolute top-full right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2">
          <button
            on:click={disconnectWallet}
            class="w-full px-4 py-2 text-left text-white hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Disconnect
          </button>
        </div>
      {/if}
    </div>
  {:else}
    <button
      on:click={connectWallet}
      class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2"
    >
      Connect Wallet
    </button>
  {/if}
</div>

<main class="bg-gradient-to-br from-purple-950 via-indigo-950 to-gray-950 min-h-screen text-gray-900 dark:text-white pt-24">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 shadow-xl">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-white">Positions</h1>
        <button 
          class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          on:click={handleNewPosition}
        >
          New Position
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="text-left border-b border-gray-700">
              <th class="pb-4 text-gray-400">Value</th>
              <th class="pb-4 text-gray-400">Margin</th>
              <th class="pb-4 text-gray-400">Margin Requirement</th>
              <th class="pb-4 text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {#each positions as position}
              <tr class="border-b border-gray-800">
                <td class="py-4 text-white">{position.value}</td>
                <td class="py-4 text-white">{position.debt}</td>
                <td class="py-4 text-white">${(parseFloat(position.value.replace('$', '').replace(',', '')) * (parseInt(position.marginRatio) / 100)).toLocaleString()}</td>
                <td class="py-4">
                  <div class="flex gap-2 justify-between">
                    <div class="flex gap-2">
                      <button 
                        class="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm transition-colors"
                        on:click={() => handleDeposit(position.id)}
                      >
                        Deposit
                      </button>
                      <button 
                        class="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm transition-colors"
                        on:click={() => handleBorrow(position.id)}
                      >
                        Borrow
                      </button>
                      <button 
                        class="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm transition-colors"
                        on:click={() => handleRepay(position.id)}
                      >
                        Repay
                      </button>
                      <button 
                        class="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-colors"
                        on:click={() => handleClosePosition(position.id)}
                      >
                        Close
                      </button>
                    </div>
                    <button
                      on:click={() => togglePosition(position.id)}
                      class="px-3 py-1 text-gray-400 hover:text-white transition-colors"
                    >
                      <svg
                        class="w-5 h-5 transform transition-transform {position.isExpanded ? 'rotate-180' : ''}"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              {#if position.isExpanded}
                <tr class="bg-gray-800/50">
                  <td colspan="4" class="p-4">
                    <div class="overflow-x-auto">
                      <table class="w-full">
                        <thead>
                          <tr class="text-left border-b border-gray-700">
                            <th class="pb-2 text-gray-400 w-12"></th>
                            <th class="pb-2 text-gray-400">Asset</th>
                            <th class="pb-2 text-gray-400">Value</th>
                            <th class="pb-2 text-gray-400">Margin Requirement</th>
                            <th class="pb-2 text-gray-400">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {#each position.assets as asset}
                            <tr class="border-b border-gray-700">
                              <td class="py-3">
                                <img
                                  src={asset.icon}
                                  alt={asset.name}
                                  class="w-8 h-8 rounded-full"
                                />
                              </td>
                              <td class="py-3">
                                <div class="flex flex-col">
                                  <span class="text-white">{asset.name}</span>
                                  <span class="text-gray-400 text-sm">{asset.symbol}</span>
                                </div>
                              </td>
                              <td class="py-3 text-white">{asset.value}</td>
                              <td class="py-3 text-white">{asset.marginRequirement}</td>
                              <td class="py-3">
                                <div class="flex gap-2">
                                  {#if asset.type === 'collateral'}
                                    <button 
                                      class="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm transition-colors"
                                      on:click={() => handleWithdraw(position.id, asset.id)}
                                    >
                                      Withdraw
                                    </button>
                                    <button 
                                      class="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm transition-colors"
                                      on:click={() => handleSwap(position.id, asset.id)}
                                    >
                                      Swap
                                    </button>
                                  {/if}
                                </div>
                              </td>
                            </tr>
                          {/each}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              {/if}
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</main>

<footer class="w-full py-8 text-center text-gray-400 text-sm">
  © 2025 Ampli Finance. All rights reserved.
</footer> 