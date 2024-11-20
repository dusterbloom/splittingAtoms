import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { WalletProvider } from './contexts/WalletContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { themes } from './theme'

const savedTheme = localStorage.getItem('app-theme')
const initialTheme = savedTheme && themes[savedTheme] ? themes[savedTheme].config : themes.default.config

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={initialTheme}>
        <ThemeProvider>
          <WalletProvider>
            <App />
          </WalletProvider>
        </ThemeProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
)
