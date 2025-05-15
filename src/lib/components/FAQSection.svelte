<script lang="ts">
import { writable } from 'svelte/store';

const faqs = [
  {
    q: 'What is Ampli?',
    a: 'Ampli is a permissionless, composable margin protocol built on Uniswap v4, designed for DeFi power users seeking leverage and yield optimization.'
  },
  {
    q: 'Are positions custodial?',
    a: 'No, Ampli is self-custodial. Users retain sole access and full control of their assets at all times.'
  },
  {
    q: 'How does autocompounding work?',
    a: 'Yield earned is automatically reinvested into your position, maximizing returns without manual intervention.'
  },
  {
    q: 'What are risks managed?',
    a: 'Ampli offers varying and configurable margin markets, allowing user to pick the ones that meet their risk and exposure preferences.'
  }
];

const openIdx = writable<number | null>(null);
</script>

<section class="py-16 px-4 max-w-2xl mx-auto">
  <h2 class="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
  <div class="space-y-4">
    {#each faqs as faq, i}
      <div class="rounded-xl bg-white/90 dark:bg-gray-900/80 shadow border border-purple-100 dark:border-gray-800 overflow-hidden transition-all">
        <button
          class="w-full flex justify-between items-center px-6 py-5 text-lg font-medium text-left text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors"
          on:click={() => openIdx.update(v => v === i ? null : i)}
          aria-expanded={$openIdx === i}
        >
          <span>{faq.q}</span>
          <svg class="w-6 h-6 ml-2 transition-transform duration-300" style="transform: rotate({$openIdx === i ? 45 : 0}deg)" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
        </button>
        <div class="px-6 pb-5 text-gray-700 dark:text-gray-300 transition-all duration-300" style="max-height: {$openIdx === i ? '200px' : '0'}; opacity: {$openIdx === i ? 1 : 0}; overflow: hidden;">
          {#if $openIdx === i}
            <div class="pt-4 animate-fade-in">
              {faq.a}
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</section>

<style>
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: none; }
  }
  .animate-fade-in {
    animation: fade-in 0.5s cubic-bezier(.4,0,.2,1) both;
  }
</style> 