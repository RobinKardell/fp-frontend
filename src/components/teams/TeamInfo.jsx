import { HStack, Icon, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import * as React from 'react'
import { HiBadgeCheck } from 'react-icons/hi'

export const TeamInfo = (props) => {
  const { name, description, ...stackProps } = props
  return (
    <VStack spacing="1" flex="1" {...stackProps}>
      <HStack>
        <Text align="center" fontWeight="bold">{name}</Text>
      </HStack>
      <Text
        fontSize="sm"
        textAlign="center"
        noOfLines={2}
        color={useColorModeValue('gray.600', 'gray.400')}
      >
        {description}
      </Text>
    </VStack>
  )
}