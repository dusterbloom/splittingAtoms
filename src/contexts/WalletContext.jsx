import React, { createContext, useContext, useState } from 'react'

const WalletContext = createContext()

// Mock address for development
const MOCK_ADDRESS = 'cosmos1mock123456789abcdefghijklmnopqrstuvwxyz'

export function WalletProvider({ children }) {
  const [address, setAddress] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState(null)

  const connectWallet = async () => {
    setIsConnecting(true)
    setError(null)

    try {
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 500))
      setAddress(MOCK_ADDRESS)
    } catch (err) {
      console.error('Error connecting wallet:', err)
      setError('Failed to connect wallet. Please try again.')
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setAddress('')
    setError(null)
  }

  return (
    <WalletContext.Provider 
      value={{ 
        address, 
        isConnecting,
        error,
        connectWallet, 
        disconnectWallet 
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => useContext(WalletContext)
