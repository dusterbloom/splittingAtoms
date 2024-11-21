import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { chainConfig } from '../config/keplr'
import { SigningStargateClient } from '@cosmjs/stargate'
import { handleMobileDeepLink } from '../utils/deepLink'

const WalletContext = createContext()

export function WalletProvider({ children }) {
  const [address, setAddress] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState(null)
  const [isMobile] = useState(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
  const [isKeplrMobileAvailable, setIsKeplrMobileAvailable] = useState(false)

  // Check if Keplr mobile is installed
  useEffect(() => {
    if (isMobile) {
      const checkKeplrMobile = async () => {
        try {
          const response = await fetch('keplr://');
          setIsKeplrMobileAvailable(true);
        } catch (err) {
          setIsKeplrMobileAvailable(false);
        }
      };
      checkKeplrMobile();
    }
  }, [isMobile]);

  const connectWallet = useCallback(async () => {
    setIsConnecting(true)
    setError(null)

    try {
      // Handle mobile connection
      if (isMobile) {
        if (!window.keplr) {
          handleMobileDeepLink()
          return
        }
      } else if (!window.keplr) {
        throw new Error('Please install Keplr extension')
      }

      // Suggest the chain to Keplr
      try {
        await window.keplr.experimentalSuggestChain(chainConfig)
      } catch (err) {
        console.error('Failed to suggest chain:', err)
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
  }, [isMobile])

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
      const client = await SigningStargateClient.connectWithSigner(
        chainConfig.rpc,
        offlineSigner
      )

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

  // Handle Keplr account changes
  useEffect(() => {
    if (window.keplr) {
      const handleKeystoreChange = () => {
        connectWallet()
      }
      window.addEventListener('keplr_keystorechange', handleKeystoreChange)
      return () => {
        window.removeEventListener('keplr_keystorechange', handleKeystoreChange)
      }
    }
  }, [connectWallet])

  // Handle returning from mobile wallet
  useEffect(() => {
    if (isMobile) {
      const handleVisibilityChange = async () => {
        if (document.visibilityState === 'visible' && !address) {
          // Add a small delay to ensure the wallet has time to initialize
          setTimeout(async () => {
            try {
              if (window.keplr) {
                await connectWallet()
              }
            } catch (error) {
              console.error('Failed to connect after returning from Keplr mobile:', error)
            }
          }, 1000)
        }
      }

      document.addEventListener('visibilitychange', handleVisibilityChange)
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange)
      }
    }
  }, [isMobile, address, connectWallet])

  return (
    <WalletContext.Provider 
      value={{ 
        address,
        isConnecting,
        error,
        isMobile,
        isKeplrMobileAvailable,
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