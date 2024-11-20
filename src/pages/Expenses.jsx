import React, { useState } from 'react'
import { 
  Box, 
  Heading, 
  VStack, 
  SimpleGrid, 
  Button, 
  useDisclosure,
  Select,
  HStack,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  StatArrow,
  Stack
} from '@chakra-ui/react'
import { useWallet } from '../contexts/WalletContext'
import ExpenseCard from '../components/ExpenseCard'
import CreateExpenseModal from '../components/CreateExpenseModal'

function Expenses() {
  const { address } = useWallet()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [filter, setFilter] = useState('all')

  // Enhanced mock data
  const mockExpenses = [
    {
      id: '1',
      title: 'Dinner at Ocean Drive',
      amount: '12.5',
      paidBy: address || 'cosmos1...',
      splitType: 'equal',
      timestamp: '2023-08-20T10:00:00Z',
      group: 'Weekend Trip to Miami',
      participants: ['cosmos1...', 'cosmos2...', 'cosmos3...']
    },
    {
      id: '2',
      title: 'Groceries from Whole Foods',
      amount: '8.75',
      paidBy: 'cosmos2...',
      splitType: 'percentage',
      timestamp: '2023-08-19T15:30:00Z',
      group: 'Apartment 4B Expenses',
      participants: ['cosmos1...', 'cosmos2...']
    },
    {
      id: '3',
      title: 'Beach Umbrellas',
      amount: '3.20',
      paidBy: address || 'cosmos1...',
      splitType: 'equal',
      timestamp: '2023-08-18T09:15:00Z',
      group: 'Weekend Trip to Miami',
      participants: ['cosmos1...', 'cosmos2...', 'cosmos3...', 'cosmos4...']
    },
    {
      id: '4',
      title: 'Party Decorations',
      amount: '5.00',
      paidBy: 'cosmos3...',
      splitType: 'custom',
      timestamp: '2023-08-17T14:20:00Z',
      group: 'Birthday Party',
      participants: ['cosmos1...', 'cosmos3...', 'cosmos4...']
    }
  ]

  return (
    <Box maxW="container.xl" mx="auto">
      <VStack spacing={6} align="stretch">
        <HStack justify="space-between">
          <VStack align="start" spacing={1}>
            <Heading size="lg">Expenses</Heading>
            <Text color="gray.600">Track and manage your shared expenses</Text>
          </VStack>
          <Button 
            colorScheme="purple" 
            onClick={onOpen}
            leftIcon={<span>+</span>}
          >
            Add Expense
          </Button>
        </HStack>

        <StatGroup>
          <Stat>
            <StatLabel>Total Owed to You</StatLabel>
            <StatNumber color="green.500">
              <StatArrow type="increase" />
              15.75 ATOM
            </StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Total You Owe</StatLabel>
            <StatNumber color="red.500">
              <StatArrow type="decrease" />
              8.25 ATOM
            </StatNumber>
          </Stat>
        </StatGroup>

        <Stack direction={['column', 'row']} justify="space-between" align="center">
          <Select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            maxW="200px"
          >
            <option value="all">All Expenses</option>
            <option value="paid">Paid by me</option>
            <option value="owed">Owed to me</option>
            <option value="settled">Settled</option>
          </Select>
          <Text color="gray.500" fontSize="sm">
            Showing {mockExpenses.length} expenses
          </Text>
        </Stack>
        
        <SimpleGrid columns={[1, 1, 2]} spacing={4}>
          {mockExpenses.map(expense => (
            <ExpenseCard key={expense.id} expense={expense} />
          ))}
        </SimpleGrid>
      </VStack>

      <CreateExpenseModal 
        isOpen={isOpen} 
        onClose={onClose}
        groupMembers={[
          { address: address || 'cosmos1...', name: 'You' },
          { address: 'cosmos2...', name: 'Alice' },
          { address: 'cosmos3...', name: 'Bob' }
        ]}
      />
    </Box>
  )
}

export default Expenses
