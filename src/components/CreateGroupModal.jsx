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
  VStack,
  useToast
} from '@chakra-ui/react'

function CreateGroupModal({ isOpen, onClose }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const toast = useToast()

  const handleSubmit = () => {
    if (!name.trim()) {
      toast({
        title: 'Error',
        description: 'Group name is required',
        status: 'error',
        duration: 3000,
      })
      return
    }

    // TODO: Handle group creation
    toast({
      title: 'Success',
      description: 'Group created successfully',
      status: 'success',
      duration: 3000,
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Group</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Group Name</FormLabel>
              <Input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter group name"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter group description"
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="purple" onClick={handleSubmit}>
            Create Group
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CreateGroupModal
