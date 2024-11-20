import React from 'react'
import { Box, Heading, Text, HStack, VStack, Badge, Avatar, AvatarGroup } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

function GroupCard({ group }) {
  const navigate = useNavigate()

  return (
    <Box 
      p={5} 
      shadow="md" 
      borderWidth="1px" 
      borderRadius="lg"
      onClick={() => navigate(`/groups/${group.id}`)}
      cursor="pointer"
      _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
      transition="all 0.2s"
      bg="white"
    >
      <VStack align="stretch" spacing={3}>
        <HStack justify="space-between">
          <Heading size="md">{group.name}</Heading>
          <Badge colorScheme={parseFloat(group.balance) > 0 ? 'green' : 'red'}>
            {parseFloat(group.balance) > 0 ? '+' : ''}{group.balance} ATOM
          </Badge>
        </HStack>

        <HStack justify="space-between">
          <AvatarGroup size="sm" max={3}>
            {group.members.map((member, idx) => (
              <Avatar 
                key={idx} 
                name={member.name} 
                size="sm"
              />
            ))}
          </AvatarGroup>
          <Text fontSize="sm" color="gray.500">
            {group.members.length} members
          </Text>
        </HStack>

        <Text fontSize="sm" color="gray.600">
          Last activity: {new Date(group.lastActivity).toLocaleDateString()}
        </Text>
      </VStack>
    </Box>
  )
}

export default GroupCard
