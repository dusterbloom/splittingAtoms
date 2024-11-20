import { extendTheme } from '@chakra-ui/react'

const baseStyles = {
  fonts: {
    heading: "'Space Grotesk', sans-serif",
    body: "'Inter', sans-serif",
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'md',
        fontWeight: '500',
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: 'lg',
          transition: 'all 0.2s',
        },
      },
    },
    Modal: {
      baseStyle: {
        dialog: {
          borderRadius: 'lg',
        },
      },
    },
    Tabs: {
      variants: {
        line: {
          tab: {
            fontWeight: '500',
            _selected: {
              color: 'brand.500',
              borderColor: 'brand.500',
            },
          },
        },
      },
    },
    Badge: {
      baseStyle: {
        borderRadius: 'md',
      },
    },
  },
}

export const themes = {
  default: {
    name: 'Default',
    config: extendTheme({
      ...baseStyles,
      colors: {
        brand: {
          50: '#f3e6ff',
          100: '#e1c4ff',
          200: '#c28dff',
          300: '#a35eff',
          400: '#8e35ff',
          500: '#2B0C5C',  // Deep Purple
          600: '#830E63',  // Rich Magenta
          700: '#C3385B',  // Coral Red
          800: '#ED7350',  // Salmon
          900: '#FFB54E',  // Golden
        },
        accent: {
          50: '#fffff0',
          100: '#ffffd1',
          200: '#ffffa3',
          300: '#ffff75',
          400: '#ffff47',
          500: '#F9F871',  // Bright Yellow
          600: '#FFB54E',  // Golden
          700: '#ED7350',  // Salmon
          800: '#C3385B',  // Coral Red
          900: '#830E63',  // Rich Magenta
        }
      },
      styles: {
        global: {
          body: {
            bg: '#fafaf9',
            color: 'gray.800',
          }
        }
      },
    }),
  },
  dark: {
    name: 'Dark Mode',
    config: extendTheme({
      ...baseStyles,
      colors: {
        brand: {
          50: '#f3e8ff',
          100: '#e4ccff',
          200: '#d1adff',
          300: '#b579ff',
          400: '#9646ff',
          500: '#7c12ff',
          600: '#6500ef',
          700: '#5200bd',
          800: '#40009b',
          900: '#2a0066',
        },
      },
      styles: {
        global: {
          body: {
            bg: '#1a1a1a',
            color: 'whiteAlpha.900',
          }
        }
      },
      components: {
        Card: {
          baseStyle: {
            container: {
              bg: 'gray.800',
              borderColor: 'whiteAlpha.100',
            },
          },
        },
      },
    }),
  },
  comet: {
    name: 'Comet',
    config: extendTheme({
      ...baseStyles,
      colors: {
        brand: {
          50: '#e5f7ff',
          100: '#b8e7ff',
          200: '#8ad8ff',
          300: '#5cc9ff',
          400: '#2ebaff',
          500: '#00abff',
          600: '#0087cc',
          700: '#006399',
          800: '#003f66',
          900: '#001b33',
        },
      },
      styles: {
        global: {
          body: {
            bg: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
            color: 'whiteAlpha.900',
          }
        }
      },
      components: {
        Card: {
          baseStyle: {
            container: {
              bg: 'whiteAlpha.100',
              backdropFilter: 'blur(10px)',
              borderColor: 'whiteAlpha.200',
            },
          },
        },
      },
    }),
  },
}

export default themes.default.config
