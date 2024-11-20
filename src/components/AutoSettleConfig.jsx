import React from 'react'
import {
  Box,
  VStack,
  HStack,
  Switch,
  Text,
  Select,
  FormControl,
  FormLabel,
  Badge,
  Tooltip,
  Icon,
  useToast
} from '@chakra-ui/react'

function AutoSettleConfig({ groupId, isEnabled = false, interval = 'weekly' }) {
  const toast = useToast()

  const handleToggle = (enabled) => {
    // TODO: Implement blockchain transaction
    toast({
      title: enabled ? 'Auto-settlement enabled' : 'Auto-settlement disabled',
      description: enabled 
        ? `Expenses will be automatically settled ${interval}` 
        : 'Auto-settlement has been turned off',
      status: 'success',
      duration: 3000,
    })
  }

  const handleIntervalChange = (newInterval) => {
    // TODO: Implement blockchain transaction
    toast({
      title: 'Settlement interval updated',
      description: `Auto-settlement will occur ${newInterval}`,
      status: 'success',
      duration: 3000,
    })
  }

  return (
    <Box 
      p={4} 
      borderWidth="1px" 
      borderRadius="lg" 
      bg="white"
    >
      <VStack align="stretch" spacing={4}>
        <HStack justify="space-between">
          <Text fontWeight="bold">Auto Settlement</Text>
          <Switch 
            colorScheme="purple"
            isChecked={isEnabled}
            onChange={(e) => handleToggle(e.target.checked)}
          />
        </HStack>

        {isEnabled && (
          <FormControl>
            <FormLabel>Settlement Interval</FormLabel>
            <Select 
              defaultValue={interval}
              onChange={(e) => handleIntervalChange(e.target.value)}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="biweekly">Bi-weekly</option>
              <option value="monthly">Monthly</option>
            </Select>
          </FormControl>
        )}

        <Box>
          <Text fontSize="sm" color="gray.600">
            Next settlement:
          </Text>
          <HStack spacing={2} mt={1}>
            <Badge colorScheme="purple">
              {isEnabled 
                ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()
                : 'Not scheduled'}
            </Badge>
            {isEnabled && (
              <Tooltip label="Estimated based on current interval">
                <Text fontSize="sm" color="gray.500">
                  (Estimated)
                </Text>
              </Tooltip>
            )}
          </HStack>
        </Box>
      </VStack>
    </Box>
  )
}

export default AutoSettleConfig
