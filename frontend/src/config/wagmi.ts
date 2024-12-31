import { http, createConfig } from '@wagmi/vue'
import { mainnet, base } from '@wagmi/vue/chains'
import { injected, metaMask, walletConnect } from '@wagmi/vue/connectors'

// Replace with your WalletConnect project ID
const projectId = 'YOUR_WALLET_CONNECT_PROJECT_ID'

export const config = createConfig({
  chains: [mainnet, base],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    metaMask(),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
}) 