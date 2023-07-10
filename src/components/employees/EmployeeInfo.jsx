import { HStack, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import * as React from 'react'

export const EmployeeInfo = (props) => {
  const { name, teamDeleted, teamName, roleName, ...stackProps } = props

  return (
    <VStack spacing="1" flex="1" {...stackProps}>
      <HStack>
        <Text align="center" fontWeight="bold">{name}</Text>
      </HStack>
        {teamDeleted && (
          <Text
            opacity={0.4}
            fontSize="sm"
            textAlign="center"
          >
            {teamName}
          </Text>
        )} 
        
        {!teamDeleted && (
          <Text
            fontSize="sm"
            textAlign="center"
          >
            {teamName}
          </Text>
        )}
        
        <Text
            fontSize="sm"
            textAlign="center"
          >
            {roleName}
          </Text>
    </VStack>
  )
}
