import { auth } from '../utils/auth'

interface WalletResponse {
  success: boolean;
  message?: string;
}

export function useWallet() {
  const updateWalletAddress = async (walletAddress: string): Promise<WalletResponse> => {
    try {
      const API_URL = import.meta.env.VITE_API_URL
      const token = auth.getToken()

      console.log(token)
      
      const response = await fetch(`${API_URL}/auth/update-wallet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ walletAddress })
      })

      if (!response.ok) {
        throw new Error('Failed to update wallet address')
      }

      const data = await response.json()
      return {
        success: true,
        message: 'Wallet address updated successfully'
      }
    } catch (error) {
      console.error('Error updating wallet address:', error)
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  return {
    updateWalletAddress
  }
} 