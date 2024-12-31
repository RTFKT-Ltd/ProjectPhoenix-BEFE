<script setup lang="ts">
import { useAccount, useDisconnect } from '@wagmi/vue'
import { onMounted } from 'vue'
import { useWallet } from '../../composables/useWallet'

const { address, connector } = useAccount()
const { disconnect } = useDisconnect()
const { updateWalletAddress } = useWallet()

onMounted(async () => {
  console.log(address.value)
  if (address.value) {
    try {
      await updateWalletAddress(address.value)
    } catch (error) {
      console.error('Failed to update wallet address:', error)
    }
  }
})
</script>

<template>
  <div class="flex flex-col gap-4 p-4 bg-gray-800 rounded-lg">
    <div class="text-white">
      <p class="text-sm text-gray-400">Connected Address</p>
      <p class="font-mono">{{ address }}</p>
    </div>
    <div class="text-white">
      <p class="text-sm text-gray-400">Wallet</p>
      <p>{{ connector?.name }}</p>
    </div>
    <button
      @click="disconnect()"
      class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
    >
      Disconnect
    </button>
  </div>
</template> 