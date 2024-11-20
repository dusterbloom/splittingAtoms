import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  VStack,
  HStack,
  Checkbox,
  useToast,
  Text
} from '@chakra-ui/react'
import { QRCodeSVG } from 'qrcode.react'

function CreateExpenseModal({ isOpen, onClose, groupMembers = [] }) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [paidBy, setPaidBy] = useState('')
  const [splitType, setSplitType] = useState('equal')
  const [showQR, setShowQR] = useState(false)
  const toast = useToast()

  const handleSubmit = async () => {
    try {
      const expenseData = {
        title,
        amount,
        paidBy,
        splitType,
        timestamp: new Date().toISOString()
      }
      
      setShowQR(true)
    } catch (error) {
      toast({
        title: 'Error creating expense',
        description: error.message,
        status: 'error',
        duration: 3000,
      })
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Expense</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {!showQR ? (
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What's this expense for?"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Amount (ATOM)</FormLabel>
                <NumberInput min={0}>
                  <NumberInputField 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                  />
                </NumberInput>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Paid By</FormLabel>
                <Select 
                  placeholder="Select member"
                  value={paidBy}
                  onChange={(e) => setPaidBy(e.target.value)}
                >
                  {groupMembers.map(member => (
                    <option key={member.address} value={member.address}>
                      {member.name || member.address}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Split Type</FormLabel>
                <Select 
                  value={splitType}
                  onChange={(e) => setSplitType(e.target.value)}
                >
                  <option value="equal">Split Equally</option>
                  <option value="percentage">Split by Percentage</option>
                  <option value="custom">Custom Split</option>
                </Select>
              </FormControl>
            </VStack>
          ) : (
            <VStack spacing={4} align="center" py={4}>
              <Text>Scan QR to view expense details</Text>
              <QRCodeSVG 
                value={JSON.stringify({
                  title,
                  amount,
                  paidBy,
                  splitType
                })}
                size={200}
              />
              <Button 
                colorScheme="blue" 
                variant="link"
                onClick={() => {/* TODO: Implement email sharing */}}
              >
                Share via Email
              </Button>
            </VStack>
          )}
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            {showQR ? 'Close' : 'Cancel'}
          </Button>
          {!showQR && (
            <Button colorScheme="purple" onClick={handleSubmit}>
              Create Expense
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CreateExpenseModal
