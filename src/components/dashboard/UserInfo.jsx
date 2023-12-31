import { Avatar, Box, HStack, Text, useColorModeValue as mode } from '@chakra-ui/react'
import * as React from 'react'

export const UserInfo = (props) => {
  const { name, image, email } = props
  return (
    <HStack display="inline-flex">
      <Avatar size="sm" name={name} src={image} />
      <Box lineHeight="1">
        <Text fontSize="md" fontWeight="semibold">{name}</Text>
        <Text fontSize="sm" mt="1" color={mode('whiteAlpha.700', 'gray.400')}>
          {email}
        </Text>
      </Box>
    </HStack>
  )
}
