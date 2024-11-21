import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { chainConfig } from '../config/keplr'

const WalletContext = createContext()

export function WalletProvider({ children }) {
  const [address, setAddress] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState(null)

  const connectWallet = useCallback(async () => {
    setIsConnecting(true)
    setError(null)

    try {
      // Check if Keplr is installed
      if (!window.keplr) {
        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
          window.location.href = 'keplr://wallet'
          return
        }
        throw new Error('Please install Keplr extension')
      }

      // Enable the chain
      await window.keplr.enable(chainConfig.chainId)

      // Get the offlineSigner for this chainId
      const offlineSigner = await window.keplr.getOfflineSigner(chainConfig.chainId)

      // Get the user's Cosmos address
      const accounts = await offlineSigner.getAccounts()
      setAddress(accounts[0].address)

    } catch (err) {
      console.error('Error connecting wallet:', err)
      setError(err.message)
      throw err
    } finally {
      setIsConnecting(false)
    }
  }, [])

  const disconnectWallet = useCallback(() => {
    setAddress('')
    setError(null)
  }, [])

  const signAndBroadcast = useCallback(async (messages) => {
    if (!window.keplr || !address) {
      throw new Error('Wallet not connected')
    }

    try {
      const offlineSigner = await window.keplr.getOfflineSigner(chainConfig.chainId)
      // Initialize SigningStargateClient
      const client = await SigningStargateClient.connectWithSigner(
        chainConfig.rpc,
        offlineSigner
      )

      // Sign and broadcast the transaction
      const result = await client.signAndBroadcast(
        address,
        messages,
        'auto'
      )

      return result
    } catch (err) {
      console.error('Transaction failed:', err)
      throw err
    }
  }, [address])

  useEffect(() => {
    if (window.keplr) {
      window.addEventListener('keplr_keystorechange', () => {
        connectWallet()
      })
    }
    
    return () => {
      if (window.keplr) {
        window.removeEventListener('keplr_keystorechange', () => {
          connectWallet()
        })
      }
    }
  }, [connectWallet])

  return (
    <WalletContext.Provider 
      value={{ 
        address, 
        isConnecting,
        error,
        connectWallet, 
        disconnectWallet,
        signAndBroadcast
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => useContext(WalletContext)