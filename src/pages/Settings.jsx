import React from 'react'
import {
  Box,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Container,
  Card,
  CardHeader,
  CardBody,
  Switch,
  FormControl,
  FormLabel,
  Select,
  Button,
  HStack,
  useToast,
  RadioGroup,
  Radio,
  Stack,
  Badge
} from '@chakra-ui/react'
import { useAppTheme } from '../contexts/ThemeContext'

function Settings() {
  const toast = useToast()
  const { currentTheme, changeTheme, themes } = useAppTheme()
  const [autopilot, setAutopilot] = React.useState({
    enabled: false,
    interval: 'weekly',
    minAmount: '5',
    notification: true
  })

  const handleAutopilotChange = (field, value) => {
    setAutopilot(prev => ({
      ...prev,
      [field]: value
    }))
    
    toast({
      title: 'Settings updated',
      status: 'success',
      duration: 2000,
    })
  }

  return (
    <Container maxW="container.xl">
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="lg">Settings</Heading>
          <Text color="gray.600">Customize your experience</Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <Card>
            <CardHeader>
              <Heading size="md">Theme</Heading>
              <Text fontSize="sm" color="gray.600">
                Choose your visual style
              </Text>
            </CardHeader>
            <CardBody>
              <RadioGroup value={currentTheme} onChange={changeTheme}>
                <Stack spacing={3}>
                  {Object.entries(themes).map(([key, theme]) => (
                    <Box 
                      key={key}
                      p={3} 
                      borderWidth="1px" 
                      borderRadius="md" 
                      borderColor={currentTheme === key ? 'brand.500' : 'gray.200'}
                    >
                      <Radio value={key}>
                        <HStack>
                          <Text>{theme.name}</Text>
                          {key === 'default' && (
                            <Badge colorScheme="purple">Default</Badge>
                          )}
                        </HStack>
                      </Radio>
                    </Box>
                  ))}
                </Stack>
              </RadioGroup>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <Heading size="md">Settlement Autopilot</Heading>
              <Text fontSize="sm" color="gray.600">
                Configure automatic expense settlements
              </Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">Enable Autopilot</FormLabel>
                  <Switch 
                    colorScheme="brand" 
                    isChecked={autopilot.enabled}
                    onChange={(e) => handleAutopilotChange('enabled', e.target.checked)}
                  />
                </FormControl>

                {autopilot.enabled && (
                  <>
                    <FormControl>
                      <FormLabel>Settlement Interval</FormLabel>
                      <Select 
                        value={autopilot.interval}
                        onChange={(e) => handleAutopilotChange('interval', e.target.value)}
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="biweekly">Bi-weekly</option>
                        <option value="monthly">Monthly</option>
                      </Select>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Minimum Amount (ATOM)</FormLabel>
                      <Select 
                        value={autopilot.minAmount}
                        onChange={(e) => handleAutopilotChange('minAmount', e.target.value)}
                      >
                        <option value="1">1 ATOM</option>
                        <option value="5">5 ATOM</option>
                        <option value="10">10 ATOM</option>
                        <option value="20">20 ATOM</option>
                      </Select>
                    </FormControl>

                    <FormControl display="flex" alignItems="center">
                      <FormLabel mb="0">Pre-settlement Notifications</FormLabel>
                      <Switch 
                        colorScheme="brand" 
                        isChecked={autopilot.notification}
                        onChange={(e) => handleAutopilotChange('notification', e.target.checked)}
                      />
                    </FormControl>

                    <Box 
                      mt={2} 
                      p={3} 
                      bg="gray.50" 
                      borderRadius="md"
                    >
                      <Text fontSize="sm" color="gray.600">
                        Next automatic settlement: {' '}
                        <Text as="span" fontWeight="bold" color="brand.500">
                          {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                        </Text>
                      </Text>
                    </Box>
                  </>
                )}
              </VStack>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <Heading size="md">Notifications</Heading>
              <Text fontSize="sm" color="gray.600">
                Manage your alerts
              </Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">New Expenses</FormLabel>
                  <Switch colorScheme="brand" defaultChecked />
                </FormControl>
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">Settlement Reminders</FormLabel>
                  <Switch colorScheme="brand" defaultChecked />
                </FormControl>
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">Group Invites</FormLabel>
                  <Switch colorScheme="brand" defaultChecked />
                </FormControl>
              </VStack>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <Heading size="md">Display</Heading>
              <Text fontSize="sm" color="gray.600">
                Customize your view
              </Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <FormControl>
                  <FormLabel>Default Currency</FormLabel>
                  <Select defaultValue="atom">
                    <option value="atom">ATOM</option>
                    <option value="usd">USD</option>
                    <option value="eur">EUR</option>
                  </Select>
                </FormControl>
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">Show Fiat Values</FormLabel>
                  <Switch colorScheme="brand" defaultChecked />
                </FormControl>
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>
      </VStack>
    </Container>
  )
}

export default Settings
