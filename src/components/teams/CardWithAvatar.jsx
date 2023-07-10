import { Avatar, Box, Flex, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'

export const CardWithAvatar = (props) => {
  const { children, aName, aSrc, ...rest } = props
  return (
    <Flex
      direction="column"
      alignItems="center"
      rounded="md"
      padding="8"
      position="relative"
      bg={useColorModeValue('white', 'gray.700')}
      shadow={{
        md: 'base',
      }}
      {...rest}
    >
      <Box position="absolute" inset="0" height="20" bg="brand.secondary" roundedTop="inherit" />
      <Avatar size="xl" name={aName} src={aSrc} />
      {children}
    </Flex>
  )
}
