import React, { useEffect, useState } from 'react'
import { Box, Button, Flex, Heading, IconButton, SimpleGrid, Skeleton, Stack, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { CardWithAvatar } from "../components/employees/CardWithAvatar"
import { EmployeeInfo } from "../components/employees/EmployeeInfo"
import { useNavigate } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import EmployeeAddForm from '../components/employees/employees.add.form'
import { motion } from 'framer-motion'
import { HiPlus } from 'react-icons/hi'
import * as API from "../api/api";

function Employees() {
  const [isLoading, setIsLoading] = useState(true);
  const [employees, setEmployees] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate();

  const getEmployees = async () => {
    setIsLoading(true)
    try {
      const response = await API.getUsers();
      setEmployees(response.users)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Flex direction="column" flex="1" overflow="auto" px="10" pt="8">
        <Flex align="center" justify="space-between">
          <Heading pt="2.5" size="lg" fontWeight="extrabold" mb="6">
            Anställda
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
                    {employees?.map((employee) => {
                      //console.log(employee)
                      const { id, firstname, lastname, team, roleid, roleName} = employee
                      return (
                        <CardWithAvatar
                          initial={{ opacity: 0.3 }} animate={{ opacity: 1 }} as={motion.div}
                          key={id}
                          aName={firstname + " " + lastname}
                          aSrc={""}
                        >
                          <EmployeeInfo mt="3" name={firstname + " " + lastname} teamDeleted={team?.deleted} teamName={team?.name} roleName={roleName} />
                          <Button onClick={() => navigate(`/employees/${id}`)} mt="3" variant="outline" borderColor="brand.primary" textColor="brand.primary" rounded="full" size="sm" width="full">
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

      {/* Add Employee */}
      <EmployeeAddForm getEmployees={() => getEmployees()} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  )
}

export default Employees