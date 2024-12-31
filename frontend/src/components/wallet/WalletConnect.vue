<script setup lang="ts">
import { useConnect, useChainId, useAccount } from '@wagmi/vue'
import { useWallet } from '../../composables/useWallet'

const chainId = useChainId()
const { connectors, connect } = useConnect()
const { updateWalletAddress } = useWallet()

const handleConnect = async (connector: any) => {
  try {
    await connect({ connector })
  } catch (error) {
    console.error('Error connecting wallet:', error)
  }
}

// Watch for account changes and update backend
const { address, isConnected } = useAccount({
  onConnect: async (data) => {
    if (data.address) {
      try {
        const result = await updateWalletAddress(data.address)
        if (!result.success) {
          console.error('Failed to update wallet address:', result.message)
        }
      } catch (error) {
        console.error('Error updating wallet address:', error)
      }
    }
  }
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <h2 class="text-xl font-bold text-white">Connect Wallet</h2>
    <div class="flex flex-col gap-2">
      <button
        v-for="connector in connectors"
        :key="connector.uid"
        @click="handleConnect(connector)"
        :disabled="isConnected"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ connector.name }}
      </button>
    </div>
  </div>
</template> 