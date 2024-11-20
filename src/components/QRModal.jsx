import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  Text,
  Button,
  useClipboard
} from '@chakra-ui/react'
import { QRCodeSVG } from 'qrcode.react'

function QRModal({ isOpen, onClose, data, title }) {
  const { hasCopied, onCopy } = useClipboard(JSON.stringify(data))

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={6} py={4} align="center">
            <QRCodeSVG 
              value={JSON.stringify(data)}
              size={300}
              level="H"
              includeMargin
            />
            <Button 
              colorScheme="brand" 
              onClick={onCopy}
              size="sm"
            >
              {hasCopied ? 'Copied!' : 'Copy Data'}
            </Button>
            <Text fontSize="sm" color="gray.500" textAlign="center">
              Scan with any QR code reader or share the copied data
            </Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default QRModal
