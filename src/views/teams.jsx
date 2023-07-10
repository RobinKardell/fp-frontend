import React, { useEffect, useState } from 'react'
import { Box, Button, Flex, Heading, SimpleGrid, useColorModeValue, useDisclosure, Skeleton, Stack, IconButton } from '@chakra-ui/react'
import { CardWithAvatar } from "../components/teams/CardWithAvatar"
import { TeamInfo } from "../components/teams/TeamInfo"
import { useNavigate } from 'react-router-dom'
import TeamsAddForm from '../components/teams/teams.add.form'
import { motion } from 'framer-motion'
import { HiPlus } from 'react-icons/hi'
import { axiosPrivate } from "../api/axios";
import * as API from "../api/api";

function Teams() {
  //const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true)
  const [teams, setTeams] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate();

  const getWareHouse = async () => {
    setIsLoading(true);
    try {
      //const response = await axiosPrivate.get('/team')
      const response = await API.getTeams();
      setTeams(response.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getWareHouse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Flex direction="column" flex="1" overflow="auto" px="10" pt="8">
        <Flex align="center" justify="space-between">
          <Heading pt="2.5" size="lg" fontWeight="extrabold" mb="6">
            Teams
          </Heading>
          <IconButton mt="2.5" icon={<HiPlus/>} mb="6" size="md" onClick={onOpen}/>
        </Flex>

        <Box flex="1" borderColor="gray.100" borderWidth="3px" borderStyle="solid" rounded="xl">
          <Box
            bg={useColorModeValue('gray.100', 'gray.800')}
            px={{
              base: '6',
              md: '8',
            }}
            h="full"
            py="4"
          >
            <Box
              as="section"
              mx="auto"
            >
              <SimpleGrid
                columns={{
                  base: 1,
                  sm: 2,
                  md: 2,
                  lg: 3,
                  xl: 4,
                }}
                spacing="6"
              >
                {isLoading ?
                  <>
                    <Stack>
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                    </Stack>
                    <Stack>
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                    </Stack>
                    <Stack>
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                    </Stack>
                    <Stack>
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                    </Stack>
                  </>
                  :
                  <>
                    {teams?.map((employee) => {
                      const { id, Name, Description } = employee
                      
                      return (
                        <CardWithAvatar
                          initial={{ opacity: 0.3 }} animate={{ opacity: 1 }} as={motion.div}
                          key={id}
                          aName={Name}
                          aSrc={""}
                        >
                          <TeamInfo mt="3" name={Name} description={Description} />
                          <Button onClick={() => navigate(`/teams/${id}`)} mt="3" variant="outline" borderColor="brand.primary" textColor="brand.primary" rounded="full" size="sm" width="full">
                            Ändra
                          </Button>
                        </CardWithAvatar>
                      )
                    })}
                  </>
                }
              </SimpleGrid>
            </Box>
          </Box>
        </Box>
      </Flex>

      {/* Add Team*/}
      <TeamsAddForm getWareHouse={() => getWareHouse()} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  )
}

export default Teams