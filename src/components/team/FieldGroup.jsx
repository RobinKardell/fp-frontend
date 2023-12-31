import { Box, Heading, Stack } from '@chakra-ui/react'
import * as React from 'react'

export const FieldGroup = (props) => {
  const { title, children, ...flexProps } = props
  return (
    <Stack
      direction={{
        base: 'column',
        md: 'column',
        lg: "row"
      }}
      spacing="6"
      py="4"
      {...flexProps}
    >
      <Box minW="3xs">
        {title && (
          <Heading as="h2" fontWeight="semibold" fontSize="lg" flexShrink={0}>
            {title}
          </Heading>
        )}
      </Box>
      {children}
    </Stack>
  )
}
