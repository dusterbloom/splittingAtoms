import React, { createContext, useContext, useState, useEffect } from 'react'
import { useTheme as useChakraTheme } from '@chakra-ui/react'
import { themes } from '../theme'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('default')

  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme')
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme)
    }
  }, [])

  const changeTheme = (themeKey) => {
    if (themes[themeKey]) {
      setCurrentTheme(themeKey)
      localStorage.setItem('app-theme', themeKey)
      window.location.reload()
    }
  }

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useAppTheme = () => useContext(ThemeContext)
