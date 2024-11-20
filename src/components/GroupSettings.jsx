import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  Divider,
  Text
} from '@chakra-ui/react'
import AutoSettleConfig from './AutoSettleConfig'

function GroupSettings({ isOpen, onClose, group }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Group Settings</ModalHeader>
        <ModalCloseButton />
        
        <ModalBody>
          <VStack spacing={6} align="stretch">
            <VStack align="start" spacing={1}>
              <Text fontWeight="bold">Auto Settlement</Text>
              <Text fontSize="sm" color="gray.600">
                Configure automatic expense settlements
              </Text>
            </VStack>
            
            <AutoSettleConfig 
              groupId={group?.id}
              isEnabled={group?.autoSettle?.enabled}
              interval={group?.autoSettle?.interval}
            />
            
            <Divider />
            
            <Text fontSize="sm" color="gray.500">
              Auto settlements will be executed on-chain based on your configured schedule.
              All members will be notified before each settlement.
            </Text>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default GroupSettings
