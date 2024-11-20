import React from 'react'
import { 
  Box, 
  Heading, 
  VStack, 
  HStack, 
  Button, 
  Text, 
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel,
  SimpleGrid,
  useDisclosure,
  Divider,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import ExpenseCard from '../components/ExpenseCard'
import CreateExpenseModal from '../components/CreateExpenseModal'
import SettlementCard from '../components/SettlementCard'
import MemberList from '../components/MemberList'
import TransactionHistory from '../components/TransactionHistory'

function GroupDetail() {
  const { groupId } = useParams()
  const { isOpen, onOpen, onClose } = useDisclosure()

  // Mock data
  const mockExpenses = [
    {
      id: '1',
      title: 'Dinner at Ocean Drive',
      amount: '12.5',
      paidBy: 'cosmos1...',
      splitType: 'equal',
      timestamp: '2023-08-20T10:00:00Z',
      participants: ['cosmos1...', 'cosmos2...', 'cosmos3...']
    },
    {
      id: '2',
      title: 'Beach Umbrellas',
      amount: '3.20',
      paidBy: 'cosmos2...',
      splitType: 'equal',
      timestamp: '2023-08-19T15:30:00Z',
      participants: ['cosmos1...', 'cosmos2...', 'cosmos3...']
    }
  ]

  const mockMembers = [
    { name: 'You', address: 'cosmos1...', balance: '+5.23' },
    { name: 'Alice', address: 'cosmos2...', balance: '-2.45' },
    { name: 'Bob', address: 'cosmos3...', balance: '-2.78' }
  ]

  return (
    <Box maxW="container.xl" mx="auto">
      <VStack align="stretch" spacing={6}>
        <HStack justify="space-between">
          <VStack align="start" spacing={1}>
            <Heading size="lg">Weekend Trip</Heading>
            <Text color="gray.600">Created Aug 18, 2023</Text>
          </VStack>
          <Button colorScheme="purple" onClick={onOpen}>Add Expense</Button>
        </HStack>

        <StatGroup>
          <Stat>
            <StatLabel>Total Expenses</StatLabel>
            <StatNumber>15.70 ATOM</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Your Balance</StatLabel>
            <StatNumber color="green.500">+5.23 ATOM</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Next Settlement</StatLabel>
            <StatNumber fontSize="lg">Aug 25, 2023</StatNumber>
          </Stat>
        </StatGroup>

        <Tabs>
          <TabList>
            <Tab>Expenses</Tab>
            <Tab>Members</Tab>
            <Tab>Settlements</Tab>
            <Tab>History</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <SimpleGrid columns={[1, 1, 2]} spacing={4}>
                {mockExpenses.map(expense => (
                  <ExpenseCard key={expense.id} expense={expense} />
                ))}
              </SimpleGrid>
            </TabPanel>

            <TabPanel>
              <MemberList members={mockMembers} />
            </TabPanel>

            <TabPanel>
              <VStack spacing={4} align="stretch">
                <Text fontWeight="bold">Pending Settlements</Text>
                <SimpleGrid columns={[1, 1, 2]} spacing={4}>
                  <SettlementCard 
                    settlement={{
                      from: 'cosmos2...',
                      to: 'cosmos1...',
                      amount: '2.45'
                    }}
                  />
                  <SettlementCard 
                    settlement={{
                      from: 'cosmos3...',
                      to: 'cosmos1...',
                      amount: '2.78'
                    }}
                  />
                </SimpleGrid>
              </VStack>
            </TabPanel>

            <TabPanel>
              <TransactionHistory 
                transactions={[
                  {
                    id: '1',
                    type: 'Settlement',
                    status: 'completed',
                    amount: '2.5',
                    timestamp: '2023-08-20T10:00:00Z',
                    hash: '0x1234567890abcdef1234567890abcdef'
                  }
                ]} 
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>

      <CreateExpenseModal 
        isOpen={isOpen} 
        onClose={onClose}
        groupMembers={mockMembers}
      />
    </Box>
  )
}

export default GroupDetail
