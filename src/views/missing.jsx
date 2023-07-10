import { Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'

function Missing() {
  return (
    <Flex
      direction="column"
      minH="100vh"
      justify="center"
      align="center"
      bgGradient="linear(to-r, brand.primary, brand.secondary)"
      p="4"
    >
      <Heading
        fontSize="7xl"
        textColor="white"
        textAlign="center"
      >
        404
      </Heading>
      <Text
        textColor="white"
        fontSize="xl"
        fontWeight="semibold"
        textAlign="center"
      >
        Not Found
      </Text>
    </Flex>
  )
}

export default Missing