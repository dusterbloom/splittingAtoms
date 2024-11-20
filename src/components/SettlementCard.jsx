import React from 'react'
import { Box, HStack, Text, Button, VStack } from '@chakra-ui/react'
import { useWallet } from '../contexts/WalletContext'

function SettlementCard({ settlement }) {
  const { address } = useWallet()
  const isPayee = settlement.to === address

  return (
    <Box 
      p={4} 
      borderWidth="1px" 
      borderRadius="lg"
      bg={isPayee ? 'green.50' : 'red.50'}
    >
      <VStack align="stretch" spacing={3}>
        <HStack justify="space-between">
          <Text fontWeight="bold">
            {isPayee ? 'You will receive' : 'You owe'}
          </Text>
          <Text fontWeight="bold" color={isPayee ? 'green.500' : 'red.500'}>
            {settlement.amount} ATOM
          </Text>
        </HStack>
        
        <Text fontSize="sm" color="gray.600">
          {isPayee ? `From: ${settlement.from.slice(0, 6)}...${settlement.from.slice(-4)}` 
            : `To: ${settlement.to.slice(0, 6)}...${settlement.to.slice(-4)}`}
        </Text>
        
        {!isPayee && (
          <Button colorScheme="purple" size="sm">
            Settle Now
          </Button>
        )}
      </VStack>
    </Box>
  )
}

export default SettlementCard
