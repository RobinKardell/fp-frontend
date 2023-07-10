import { Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Unauthorized() {
  const navigate = useNavigate();

  const goBack = () => navigate(-1)

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
        401
      </Heading>
      <Text
        textColor="white"
        fontSize="xl"
        fontWeight="semibold"
        textAlign="center"
        onClick={goBack}
      >
        Unauthorized
      </Text>
    </Flex>
  )
}

export default Unauthorized