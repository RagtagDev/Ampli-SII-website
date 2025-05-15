<script lang="ts">
  import { onMount } from 'svelte';
  let showModal = false;
</script>

<div class="relative min-h-[60vh] flex flex-col md:flex-row justify-center items-start md:items-center px-8 pt-16 pb-16 rounded-3xl overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 shadow-xl animate-fade-in">
  <div class="z-10 flex-1 md:max-w-xl">
    <h1 class="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg leading-tight whitespace-nowrap">
      Permissionless platform
      <br class="hidden md:inline" /> for on-demand leverage
    </h1>
    <p class="text-lg md:text-xl text-purple-200 mb-8 max-w-xl leading-relaxed">
      Ampli is the most expressive, composable, and frictionless margin protocol. Built on Uniswap v4 for DeFi power users.
    </p>
    <button class="bg-purple-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-purple-700 transition focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg" on:click={() => showModal = true}>Launch App</button>
  </div>
  <div class="hidden md:flex flex-1 justify-center items-center relative h-[320px]">
    <!-- Abstract animated SVG graphic -->
    <svg width="320" height="320" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg" class="animate-graphic-spin">
      <defs>
        <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stop-color="#a78bfa" stop-opacity="0.7" />
          <stop offset="100%" stop-color="#6366f1" stop-opacity="0.2" />
        </radialGradient>
        <linearGradient id="grad2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#f472b6" stop-opacity="0.7" />
          <stop offset="100%" stop-color="#a5b4fc" stop-opacity="0.3" />
        </linearGradient>
      </defs>
      <circle cx="160" cy="160" r="110" fill="url(#grad1)" />
      <ellipse cx="160" cy="160" rx="80" ry="30" fill="url(#grad2)" opacity="0.7">
        <animate attributeName="rx" values="80;100;80" dur="4s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="160" cy="160" rx="30" ry="80" fill="url(#grad2)" opacity="0.5">
        <animate attributeName="ry" values="80;100;80" dur="5s" repeatCount="indefinite" />
      </ellipse>
      <circle cx="160" cy="160" r="50" fill="#fff" fill-opacity="0.08">
        <animate attributeName="r" values="50;65;50" dur="6s" repeatCount="indefinite" />
      </circle>
      <circle cx="160" cy="160" r="20" fill="#a5b4fc" fill-opacity="0.15">
        <animate attributeName="r" values="20;35;20" dur="3s" repeatCount="indefinite" />
      </circle>
    </svg>
  </div>
  {#if showModal}
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div class="bg-white rounded-2xl shadow-2xl px-8 py-10 flex flex-col items-center max-w-xs w-full relative animate-fade-in-modal">
        <button class="absolute top-3 right-3 text-gray-400 hover:text-purple-600 text-2xl font-bold focus:outline-none" on:click={() => showModal = false} aria-label="Close">&times;</button>
        <div class="text-2xl font-bold text-purple-700 mb-2">Coming 2025</div>
        <div class="text-gray-600 text-center">Ampli is launching in 2025. Stay tuned!</div>
      </div>
    </div>
  {/if}
</div>

<style>
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: none; }
  }
  .animate-fade-in {
    animation: fade-in 1.2s cubic-bezier(.4,0,.2,1) both;
  }
  @keyframes graphic-spin {
    0% { transform: rotate(0deg) scale(1); }
    50% { transform: rotate(8deg) scale(1.04); }
    100% { transform: rotate(0deg) scale(1); }
  }
  .animate-graphic-spin {
    animation: graphic-spin 12s ease-in-out infinite;
    will-change: transform;
  }
  @keyframes fade-in-modal {
    from { opacity: 0; transform: scale(0.96) translateY(24px); }
    to { opacity: 1; transform: none; }
  }
  .animate-fade-in-modal {
    animation: fade-in-modal 0.4s cubic-bezier(.4,0,.2,1) both;
  }
</style> 