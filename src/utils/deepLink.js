export const handleMobileDeepLink = () => {
    const userAgent = navigator.userAgent.toLowerCase()
    
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      // Deep link to Keplr mobile app with callback URL
      const currentUrl = window.location.origin
      const deepLink = `keplr://wallet/suggest-chain?callback=${encodeURIComponent(currentUrl)}`
      window.location.href = deepLink
      
      // Fallback to app store if Keplr is not installed (after 3 seconds)
      setTimeout(() => {
        if (document.visibilityState !== 'hidden') {
          if (userAgent.includes('android')) {
            window.location.href = 'https://play.google.com/store/apps/details?id=com.chainapsis.keplr'
          } else if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
            window.location.href = 'https://apps.apple.com/app/keplr-wallet/id1567851089'
          }
        }
      }, 3000)
    }
  }