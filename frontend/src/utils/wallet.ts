import { ethers } from 'ethers'

export async function connectMetaMask(): Promise<string> {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed')
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const accounts = await provider.send('eth_requestAccounts', [])
    return accounts[0]
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error('Failed to connect to MetaMask')
  }
}

export function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
} 