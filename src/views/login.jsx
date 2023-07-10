import { Box, Flex, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import LoginForm from '../components/login/login.form';

function Login() {

  return (
    <Flex
      minH="100vh"
      justify="center"
      align="center"
      bgColor={"lightgray"}
      //bgGradient="linear(to-r, brand.primary, brand.secondary)"
      p="4"
    >
      <Box
        shadow="md"
        bg="black"
        //textColor={"white"}
        rounded="md"
        w="100%"
        maxW={{ base: "full", md: "md" }}
        p="8"
      >
        <Flex mb="4" justifyContent={"center"}>
          <Image height={"70%"} src="./FlyttPoolen_logo_orange_flag_right.png" />
        </Flex>

        <Stack>
          <LoginForm/>
        </Stack>
      </Box>
      <Text textColor="purple" fontWeight="semibold" position="absolute" bottom="1">Skapad av Webvancy AB</Text>
    </Flex>
  )
}

export default Login