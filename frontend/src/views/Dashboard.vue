<script setup lang="ts">
import { useAccount } from '@wagmi/vue'
import { useRouter } from 'vue-router'
import { auth } from '../utils/auth'
import WalletConnect from '../components/wallet/WalletConnect.vue'
import WalletInfo from '../components/wallet/WalletInfo.vue'
import Download3DFiles from '../components/download/Download3DFiles.vue'

const router = useRouter()
const { isConnected } = useAccount()

const handleLogout = () => {
  auth.logout()
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen pt-20 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-bold text-white">Dashboard</h1>
        <button
          @click="handleLogout"
          class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
      
      <div class="bg-gray-900 rounded-lg p-6">
        <WalletInfo v-if="isConnected" />
        <WalletConnect v-else />
        <Download3DFiles />
      </div>
    </div>
  </div>
</template> 