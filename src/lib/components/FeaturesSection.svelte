<script lang="ts">
const features = [
  {
    icon: `<svg class='w-8 h-8 text-purple-500' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><path d='M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 11l5-5 5 5M12 17V6'/></svg>`,
    title: 'Yield Optimization',
    desc: 'Earn optimized returns with automatic yield compounding',
  },
  {
    icon: `<svg class='w-8 h-8 text-indigo-500' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><path d='M8 17l4-4 4 4M12 12V3'/></svg>`,
    title: 'Leverage Opportunities',
    desc: 'Amplify your exposure and potential returns through leverage',
  },
  {
    icon: `<svg class='w-8 h-8 text-pink-500' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><path d='M17 9V7a5 5 0 00-10 0v2M5 15h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2z'/></svg>`,
    title: 'Customizable Markets',
    desc: 'Configurable risk management and interest models to fit any risk profile',
  },
  {
    icon: `<svg class='w-8 h-8 text-yellow-500' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><path d='M12 2l4 4-4 4-4-4 4-4zm0 6v14'/></svg>`,
    title: 'Ecosystem Composability',
    desc: 'Interoperable with leading DeFi protocols for seamless integration and strategy layering.',
  },
];
</script>

<section class="py-16 px-4 max-w-5xl mx-auto">
  <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">Features and Benefits</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    {#each features as f, i}
      <div class="bg-white/90 dark:bg-gray-900/80 rounded-2xl shadow-lg p-8 flex flex-col items-start gap-4 border border-purple-100 dark:border-gray-800 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl animate-fade-in" style="animation-delay: {i * 120}ms">
        {@html f.icon}
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{f.title}</h3>
        <p class="text-gray-600 dark:text-gray-300">{f.desc}</p>
      </div>
    {/each}
  </div>
</section>

<style>
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: none; }
  }
  .animate-fade-in {
    animation: fade-in 1s cubic-bezier(.4,0,.2,1) both;
  }
</style> 