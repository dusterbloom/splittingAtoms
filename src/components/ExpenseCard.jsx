import React from 'react'
import { 
  Box, 
  HStack, 
  VStack, 
  Text, 
  Badge, 
  Tooltip,
  Avatar,
  AvatarGroup,
  useDisclosure
} from '@chakra-ui/react'
import { QRCodeSVG } from 'qrcode.react'
import QRModal from './QRModal'

function ExpenseCard({ expense }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <>
      <Box 
        p={4} 
        borderWidth="1px" 
        borderRadius="lg"
        _hover={{ shadow: 'md' }}
        transition="all 0.2s"
        bg="white"
      >
        <VStack align="stretch" spacing={3}>
          <HStack justify="space-between">
            <VStack align="start" spacing={0}>
              <Text fontWeight="bold">{expense.title}</Text>
              <Text fontSize="sm" color="gray.500">{expense.group}</Text>
            </VStack>
            <Badge colorScheme="purple" fontSize="md" px={3} py={1}>
              {expense.amount} ATOM
            </Badge>
          </HStack>

          <HStack justify="space-between" fontSize="sm" color="gray.600">
            <Text>Paid by: {expense.paidBy.slice(0, 6)}...{expense.paidBy.slice(-4)}</Text>
            <Text>{formatDate(expense.timestamp)}</Text>
          </HStack>

          <HStack justify="space-between" align="center">
            <HStack spacing={2}>
              <Text fontSize="sm" color="gray.500">Split: {expense.splitType}</Text>
              <AvatarGroup size="xs" max={3}>
                {expense.participants.map((participant, idx) => (
                  <Avatar 
                    key={idx}
                    name={participant.slice(0, 6)}
                    size="xs"
                  />
                ))}
              </AvatarGroup>
            </HStack>
            <Tooltip label="View QR Code">
              <Box cursor="pointer" onClick={onOpen}>
                <QRCodeSVG 
                  value={JSON.stringify(expense)}
                  size={24}
                />
              </Box>
            </Tooltip>
          </HStack>
        </VStack>
      </Box>

      <QRModal 
        isOpen={isOpen}
        onClose={onClose}
        data={expense}
        title={`QR Code for ${expense.title}`}
      />
    </>
  )
}

export default ExpenseCard
