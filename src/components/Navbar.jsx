import React from 'react'
import { Box, Flex, Button, Text, HStack, Link as ChakraLink } from '@chakra-ui/react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useWallet } from '../contexts/WalletContext'

function Navbar() {
  const { address, connectWallet, disconnectWallet, isConnecting } = useWallet()
  const navigate = useNavigate()

  const handleConnect = async () => {
    await connectWallet()
    navigate('/groups')
  }

  return (
    <Flex 
      as="nav" 
      align="center" 
      justify="space-between" 
      wrap="wrap" 
      padding="1rem"
      bg="purple.600"
      color="white"
    >
      <ChakraLink as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
        <Text fontSize="xl" fontWeight="bold">
          SplittingAtoms
        </Text>
      </ChakraLink>
      
      <HStack spacing={6}>
        {address && (
          <>
            <ChakraLink as={RouterLink} to="/groups" color="white" _hover={{ textDecoration: 'none' }}>
              Groups
            </ChakraLink>
            <ChakraLink as={RouterLink} to="/expenses" color="white" _hover={{ textDecoration: 'none' }}>
              Expenses
            </ChakraLink>
            <ChakraLink as={RouterLink} to="/settings" color="white" _hover={{ textDecoration: 'none' }}>
              Settings
            </ChakraLink>
          </>
        )}
        
        {address ? (
          <Button 
            colorScheme="pink" 
            onClick={disconnectWallet}
          >
            {address.slice(0, 6)}...{address.slice(-4)}
          </Button>
        ) : (
          <Button 
            colorScheme="pink" 
            onClick={handleConnect}
            isLoading={isConnecting}
            loadingText="Connecting"
          >
            Connect Wallet
          </Button>
        )}
      </HStack>
    </Flex>
  )
}

export default Navbar
