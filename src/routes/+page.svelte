<script lang="ts">
  import HeroSection from '$lib/components/HeroSection.svelte';
  import FeaturesSection from '$lib/components/FeaturesSection.svelte';
  import FAQSection from '$lib/components/FAQSection.svelte';
</script>

<div class="fixed top-6 left-8 z-50 text-white text-2xl font-bold tracking-tight select-none">
  Ampli
</div>

<main class="bg-gradient-to-br from-purple-950 via-indigo-950 to-gray-950 min-h-screen text-gray-900 dark:text-white">
  <div class="max-w-6xl mx-auto space-y-16 pt-24">
    <HeroSection />
    <FeaturesSection />
    <FAQSection />
  </div>
</main>

<footer class="w-full py-8 text-center text-gray-400 text-sm">
  © 2025 Ampli Finance. All rights reserved.
</footer>
