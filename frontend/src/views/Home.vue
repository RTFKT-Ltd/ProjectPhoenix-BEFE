<script setup lang="ts">
import Hero from '../components/Hero.vue'
import About from '../components/About.vue'
import AuthForm from '../components/AuthForm.vue'
</script>

<template>
  <main>
    <Hero />
    <About />
    <section id="auth" class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <AuthForm />
      </div>
    </section>
  </main>
</template> 