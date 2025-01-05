<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { auth } from './utils/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const isAuthenticated = ref(false)

const checkAuth = async () => {
  isAuthenticated.value = auth.isAuthenticated()
  if (isAuthenticated.value && router.currentRoute.value.path === '/') {
    await router.push('/dashboard')
  }
}

onMounted(async () => {
  await checkAuth()
})

// Watch for route changes to recheck auth
watch(() => router.currentRoute.value.path, checkAuth)
</script>

<template>
  <div class="min-h-screen bg-rtfkt-dark">
    <header class="fixed w-full top-0 z-50 bg-rtfkt-dark/80 backdrop-blur-sm">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
          <div class="text-white font-bold text-xl">RTFKT</div>
          <div class="flex gap-4">
            <template v-if="!isAuthenticated">
              <a href="#about" class="text-gray-300 hover:text-white transition-colors">About</a>
              <a href="https://project-phoenix.gitbook.io/documentation" class="text-gray-300 hover:text-white transition-colors">Documentation</a>
              <a href="#auth" class="text-gray-300 hover:text-white transition-colors">Login</a>
            </template>
            <router-link
              v-else
              to="/dashboard"
              class="text-gray-300 hover:text-white transition-colors"
            >
              Dashboard
            </router-link>
          </div>
        </div>
      </nav>
    </header>

    <router-view @auth-change="isAuthenticated = auth.isAuthenticated()"></router-view>

    <footer class="bg-rtfkt-dark border-t border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p class="text-center text-gray-400">© {{ new Date().getFullYear() }} RTFKT. All rights reserved.</p>
        <p class="text-center text-gray-400">Phoenix Project - Creators Club under MIT License.</p>
      </div>
    </footer>
  </div>
</template>