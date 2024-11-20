import React from 'react'
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  HStack,
  useColorModeValue,
  Flex,
  Badge,
  Stack,
  useToast
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useWallet } from '../contexts/WalletContext'

function Home() {
  const navigate = useNavigate()
  const { address, connectWallet, isConnecting, error } = useWallet()
  const toast = useToast()
  
  const bgGradient = useColorModeValue(
    'linear(to-b, purple.50, white)',
    'linear(to-b, purple.900, gray.900)'
  )

  const handleConnect = async () => {
    try {
      await connectWallet()
      navigate('/groups')
    } catch (err) {
      toast({
        title: 'Connection Error',
        description: error || 'Failed to connect wallet',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  // Mock stats
  const stats = [
    { label: 'Active Users', value: '10K+' },
    { label: 'Total Settlements', value: '$2M+' },
    { label: 'Groups Created', value: '50K+' }
  ]

  // Features
  const features = [
    { 
      title: 'Crypto Native', 
      description: 'Split expenses using ATOM and other Cosmos tokens',
      icon: '🌍'
    },
    { 
      title: 'On-chain History', 
      description: 'Transparent and immutable expense tracking',
      icon: '⛓️'
    },
    { 
      title: 'Instant Settlements', 
      description: 'No more chasing friends for payments',
      icon: '⚡'
    }
  ]

  // Use cases
  const useCases = [
    {
      title: 'Roommates',
      description: 'Split rent, utilities, and groceries hassle-free',
      icon: '🏠'
    },
    {
      title: 'Travel Groups',
      description: 'Track expenses for trips and adventures',
      icon: '✈️'
    },
    {
      title: 'Events & Parties',
      description: 'Organize group expenses for celebrations',
      icon: '🎉'
    }
  ]

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        bgGradient={bgGradient}
        pt={20} 
        pb={12}
        px={4}
      >
        <Container maxW="container.xl">
          <Stack 
            direction={{ base: 'column', lg: 'row' }} 
            spacing={8} 
            align="center"
            justify="space-between"
          >
            <VStack align="start" spacing={6} maxW="600px">
              <Badge colorScheme="purple" fontSize="sm" px={2} py={1}>
                Web3 Native Expense Sharing
              </Badge>
              <Heading 
                size="2xl" 
                bgGradient="linear(to-r, purple.500, pink.500)"
                bgClip="text"
              >
                Split Expenses with Friends, Powered by Cosmos
              </Heading>
              <Text fontSize="xl" color="gray.600">
                The easiest way to track, split, and settle group expenses using crypto. 
                No more awkward money talks or payment delays.
              </Text>
              {!address ? (
                <Button 
                  size="lg" 
                  colorScheme="purple"
                  onClick={handleConnect}
                  isLoading={isConnecting}
                  loadingText="Connecting"
                  px={8}
                >
                  Connect Wallet to Start
                </Button>
              ) : (
                <Button 
                  size="lg" 
                  colorScheme="purple"
                  onClick={() => navigate('/groups')}
                  px={8}
                >
                  View My Groups
                </Button>
              )}
            </VStack>

            {/* Stats */}
            <SimpleGrid 
              columns={{ base: 1, md: 3 }} 
              gap={4}
              p={6}
              bg="white"
              rounded="xl"
              shadow="xl"
              borderWidth="1px"
            >
              {stats.map((stat, idx) => (
                <Box key={idx} textAlign="center" px={4}>
                  <Text fontSize="3xl" fontWeight="bold" color="purple.500">
                    {stat.value}
                  </Text>
                  <Text color="gray.500">{stat.label}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxW="container.xl" py={16}>
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
            <Heading size="xl">Why Choose SplittingAtoms?</Heading>
            <Text color="gray.600" maxW="2xl">
              Experience the future of expense sharing with blockchain technology
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
            {features.map((feature, idx) => (
              <Box 
                key={idx}
                p={6}
                borderWidth="1px"
                borderRadius="lg"
                textAlign="center"
                _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
                transition="all 0.2s"
                bg="white"
              >
                <Text fontSize="3xl" mb={4}>{feature.icon}</Text>
                <Heading size="md" mb={2}>{feature.title}</Heading>
                <Text color="gray.600">{feature.description}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* Use Cases Section */}
      <Box bg="purple.50" py={16}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center">
              <Heading size="xl">Perfect for Every Group</Heading>
              <Text color="gray.600" maxW="2xl">
                Whether you're traveling with friends or sharing a home, SplittingAtoms makes expense management effortless
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
              {useCases.map((useCase, idx) => (
                <Box 
                  key={idx}
                  p={6}
                  bg="white"
                  borderRadius="lg"
                  shadow="md"
                  textAlign="center"
                >
                  <Text fontSize="3xl" mb={4}>{useCase.icon}</Text>
                  <Heading size="md" mb={2}>{useCase.title}</Heading>
                  <Text color="gray.600">{useCase.description}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box py={16}>
        <Container maxW="container.xl" textAlign="center">
          <VStack spacing={6}>
            <Heading size="xl">Ready to Get Started?</Heading>
            <Text color="gray.600" maxW="2xl">
              Join thousands of users who are already managing their group expenses with crypto
            </Text>
            {!address ? (
              <Button 
                size="lg" 
                colorScheme="purple" 
                onClick={handleConnect}
                isLoading={isConnecting}
                loadingText="Connecting"
                px={8}
              >
                Connect Wallet
              </Button>
            ) : (
              <Button 
                size="lg" 
                colorScheme="purple"
                onClick={() => navigate('/groups')}
                px={8}
              >
                Create Your First Group
              </Button>
            )}
          </VStack>
        </Container>
      </Box>
    </Box>
  )
}

export default Home
