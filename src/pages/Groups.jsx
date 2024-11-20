import React from 'react'
import { 
  Box, 
  Heading, 
  Button, 
  VStack, 
  SimpleGrid, 
  useDisclosure, 
  Text,
  HStack
} from '@chakra-ui/react'
import { useWallet } from '../contexts/WalletContext'
import GroupCard from '../components/GroupCard'
import CreateGroupModal from '../components/CreateGroupModal'

function Groups() {
  const { address } = useWallet()
  const { isOpen, onOpen, onClose } = useDisclosure()

  // Enhanced mock data
  const mockGroups = [
    {
      id: '1',
      name: 'Weekend Trip to Miami',
      balance: '5.23',
      creator: address || 'cosmos1...',
      lastActivity: '2023-08-20T10:00:00Z',
      members: [
        { name: 'You', address: address || 'cosmos1...' },
        { name: 'Alice', address: 'cosmos2...' },
        { name: 'Bob', address: 'cosmos3...' },
        { name: 'Carol', address: 'cosmos4...' }
      ]
    },
    {
      id: '2',
      name: 'Apartment 4B Expenses',
      balance: '-2.45',
      creator: 'cosmos2...',
      lastActivity: '2023-08-19T15:30:00Z',
      members: [
        { name: 'You', address: address || 'cosmos1...' },
        { name: 'Alice', address: 'cosmos2...' },
        { name: 'Bob', address: 'cosmos3...' }
      ]
    },
    {
      id: '3',
      name: 'Birthday Party',
      balance: '0.00',
      creator: address || 'cosmos1...',
      lastActivity: '2023-08-18T20:00:00Z',
      members: [
        { name: 'You', address: address || 'cosmos1...' },
        { name: 'Dave', address: 'cosmos5...' },
        { name: 'Eve', address: 'cosmos6...' },
        { name: 'Frank', address: 'cosmos7...' },
        { name: 'Grace', address: 'cosmos8...' }
      ]
    }
  ]

  return (
    <Box maxW="container.xl" mx="auto">
      <VStack spacing={6} align="stretch">
        <HStack justify="space-between">
          <VStack align="start" spacing={1}>
            <Heading size="lg">My Groups</Heading>
            <Text color="gray.600">Manage your shared expenses</Text>
          </VStack>
          <Button 
            colorScheme="purple" 
            onClick={onOpen}
            leftIcon={<span>+</span>}
          >
            Create New Group
          </Button>
        </HStack>
        
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {mockGroups.map(group => (
            <GroupCard key={group.id} group={group} />
          ))}
        </SimpleGrid>
      </VStack>

      <CreateGroupModal isOpen={isOpen} onClose={onClose} />
    </Box>
  )
}

export default Groups
