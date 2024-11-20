import React from 'react'
import {
  VStack,
  HStack,
  Text,
  Badge,
  Box
} from '@chakra-ui/react'

function TransactionHistory({ transactions }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <VStack align="stretch" spacing={3}>
      {transactions.map(tx => (
        <Box key={tx.id} p={3} borderWidth="1px" borderRadius="md">
          <HStack justify="space-between" mb={2}>
            <Text fontWeight="bold">{tx.type}</Text>
            <Badge colorScheme={tx.status === 'completed' ? 'green' : 'orange'}>
              {tx.status}
            </Badge>
          </HStack>
          
          <HStack justify="space-between" fontSize="sm" color="gray.600">
            <Text>{formatDate(tx.timestamp)}</Text>
            <Text>{tx.amount} ATOM</Text>
          </HStack>
          
          <Text fontSize="xs" color="gray.500" mt={1}>
            Tx: {tx.hash.slice(0, 8)}...{tx.hash.slice(-8)}
          </Text>
        </Box>
      ))}
    </VStack>
  )
}

export default TransactionHistory
