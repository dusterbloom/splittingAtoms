import React from 'react'
import {
  VStack,
  HStack,
  Text,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton
} from '@chakra-ui/react'

function MemberList({ members, onRemoveMember }) {
  return (
    <VStack align="stretch" spacing={3}>
      {members.map(member => (
        <HStack key={member.address} justify="space-between" p={2} borderWidth="1px" borderRadius="md">
          <HStack>
            <Avatar size="sm" name={member.name} />
            <VStack align="start" spacing={0}>
              <Text fontWeight="bold">{member.name}</Text>
              <Text fontSize="sm" color="gray.500">
                {member.address.slice(0, 6)}...{member.address.slice(-4)}
              </Text>
            </VStack>
          </HStack>
          
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              variant="ghost"
            >
              •••
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => onRemoveMember(member.address)}>
                Remove Member
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      ))}
    </VStack>
  )
}

export default MemberList
