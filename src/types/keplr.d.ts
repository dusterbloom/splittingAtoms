interface Window {
    keplr?: {
      enable: (chainId: string) => Promise<void>
      getOfflineSigner: (chainId: string) => Promise<any>
      experimentalSuggestChain: (chainInfo: any) => Promise<void>
    }
  }