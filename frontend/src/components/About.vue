<script setup lang="ts">
const features = [
  {
    title: 'Open Source',
    description: 'Built by the community, for the community. Our codebase is fully open source, allowing developers to contribute and build upon the foundation.',
    icon: '🌟'
  },
  {
    title: 'Blockchain Enabled',
    description: 'Using blockchain to safely check assets ownership.',
    icon: '🔒'
  },
  {
    title: 'Community Driven',
    description: 'Join a thriving ecosystem of developers and creators shaping the future of digital asset management.',
    icon: '🤝'
  },
  {
    title: 'Extensible',
    description: 'Built with modern technologies and a plugin system that allows endless customization and integration possibilities.',
    icon: '🔌'
  }
]
</script>

<template>
  <section id="about" class="py-20 bg-rtfkt-dark/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-white mb-4">About Phoenix Project</h2>
        <p class="text-xl text-gray-400 max-w-3xl mx-auto">
          An open-source initiative empowering the next generation of digital creators and collectors.
          Built with transparency and community collaboration at its core.
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="p-6 bg-rtfkt-dark rounded-lg border border-gray-800 hover:border-rtfkt-purple transition-colors"
        >
          <div class="text-4xl mb-4">{{ feature.icon }}</div>
          <h3 class="text-xl font-semibold text-white mb-2">{{ feature.title }}</h3>
          <p class="text-gray-400">{{ feature.description }}</p>
        </div>
      </div>

      <div class="mt-16 text-center">
        <h3 class="text-2xl font-bold text-white mb-4">Join the Community</h3>
        <p class="text-gray-400 mb-8">
          Contribute to the future of digital asset management. Check out our GitHub repository
          and join our Discord community.
        </p>
        <div class="flex justify-center gap-4">
          <a
            href="https://github.com/RTFKT-Ltd/ProjectPhoenix-UE5"
            target="_blank"
            rel="noopener noreferrer"
            class="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://discord.gg/rtfkt"
            target="_blank"
            rel="noopener noreferrer"
            class="px-6 py-2 bg-rtfkt-purple text-white rounded-md hover:bg-opacity-90 transition-colors"
          >
            Discord
          </a>
        </div>
      </div>
    </div>
  </section>
</template>