import { Flex, Heading, Box, useColorModeValue } from '@chakra-ui/react'
import useAuth from '../hooks/useAuth'
import HomeAdmin from '../components/home/homeAdmin'
import HomeEmployee from '../components/home/homeEmployee'
import { Roles } from '../components/roles'

//ROLES
const ROLES = Roles;

function Home() {
  const { auth } = useAuth();
  /*const firstName = auth.accessTokenData.firstName;
  const lastName = auth.accessTokenData.lastName;
  const fullName = firstName + " " + lastName;
  const roleId = auth.accessTokenData.roleId;*/
  const fullName = auth.user;
  const roleId = auth.roles;


 
  return (
    <Flex direction="column" flex="1" overflow="auto" px="10" pt="8">

      <Box flex="1">
        <Box
          h="full"
        >
          <Box
            as="section"
            mx="auto"
          >
            <HomeAdmin />
          </Box>
        </Box>
      </Box>
    </Flex>
  )
}

export default Home