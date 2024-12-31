<script setup lang="ts">
import { ref } from 'vue'
import { connectMetaMask, shortenAddress } from '../utils/wallet'
import FormButton from './ui/FormButton.vue'

interface Props {
  userEmail: string
  onLogout: () => void
}

const props = defineProps<Props>()
const walletAddress = ref<string>('')
const connecting = ref(false)
const error = ref('')

async function handleConnectWallet() {
  connecting.value = true
  error.value = ''
  
  try {
    const address = await connectMetaMask()
    walletAddress.value = address
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to connect wallet'
  } finally {
    connecting.value = false
  }
}
</script>

<template>
  <div class="w-full max-w-md p-8 bg-rtfkt-dark rounded-lg shadow-xl border border-gray-800">
    <div class="text-center">
      <h2 class="text-2xl font-bold mb-2 text-white">Welcome!</h2>
      <p class="text-gray-400 mb-6">{{ userEmail }}</p>
      
      <div v-if="!walletAddress" class="mb-6">
        <FormButton 
          @click="handleConnectWallet" 
          :disabled="connecting"
          class="w-full"
        >
          {{ connecting ? 'Connecting...' : 'Connect MetaMask' }}
        </FormButton>
        <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
      </div>
      
      <div v-else class="mb-6">
        <p class="text-green-500 font-medium">Wallet Connected</p>
        <p class="text-gray-400 text-sm">{{ shortenAddress(walletAddress) }}</p>
      </div>

      <FormButton @click="onLogout" variant="secondary">
        Logout
      </FormButton>
    </div>
  </div>
</template> 