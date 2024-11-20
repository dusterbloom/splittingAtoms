import React from 'react'
import {
  Box,
  SimpleGrid,
  VStack,
  Text,
  useRadio,
  useRadioGroup,
  Circle
} from '@chakra-ui/react'
import { useTheme } from '../contexts/ThemeContext'

function ThemeCard(props) {
  const { getInputProps, getRadioProps } = useRadio(props)
  const { colors } = themePresets[props.value]

  return (
    <Box as="label">
      <input {...getInputProps()} />
      <Box
        {...getRadioProps()}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        p={3}
        _checked={{
          borderColor: 'brand.500',
          boxShadow: 'md',
        }}
        _hover={{
          borderColor: 'brand.300',
        }}
      >
        <VStack spacing={2}>
          <HStack spacing={2}>
            <Circle size="20px" bg={colors.brand[500]} />
            <Circle size="20px" bg={colors.accent[500]} />
          </HStack>
          <Text fontSize="sm" fontWeight="medium">
            {themePresets[props.value].name}
          </Text>
        </VStack>
      </Box>
    </Box>
  )
}

function ThemeSelector() {
  const { currentTheme, changeTheme } = useTheme()
  
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'theme',
    defaultValue: currentTheme,
    onChange: changeTheme,
  })

  return (
    <SimpleGrid 
      columns={[2, 3]} 
      spacing={4} 
      {...getRootProps()}
    >
      {Object.keys(themePresets).map((theme) => (
        <ThemeCard
          key={theme}
          value={theme}
          {...getRadioProps({ value: theme })}
        />
      ))}
    </SimpleGrid>
  )
}

export default ThemeSelector
