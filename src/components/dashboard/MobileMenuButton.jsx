import { Box } from '@chakra-ui/react'
import * as React from 'react'
import { HiMenu, HiX } from 'react-icons/hi'

export const MobileMenuButton = (props) => {
  const { onClick, isOpen } = props
  return (
    <Box
      display={{
        base: 'block',
        md: 'none',
      }}
      ml="-8"
      mr="2"
      as="button"
      type="button"
      rounded="md"
      p="1"
      fontSize="2xl"
      color="gray.500"
      _hover={{
        bg: 'gray.100',
      }}
      onClick={onClick}
    >
      <Box srOnly>{isOpen ? 'Close Menu' : 'Open Menu'}</Box>
      {isOpen ? <HiX /> : <HiMenu />}
    </Box>
  )
}
