import React from 'react'
import {
  Flex,
  Box,
  Heading,
  Stack,
  StackDivider,
  useColorModeValue,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useState } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useParams } from 'react-router-dom';
import { FieldGroup } from '../components/team/FieldGroup'
import TeamForm from '../components/team/team.form';
import TeamDelete from '../components/team/team.delete';
import TeamEmployees from '../components/team/team.employees';
import * as API from "../api/api";

function Team() {
  const { id } = useParams();
  const [team, setTeam] = useState({});
  const axiosPrivate = useAxiosPrivate();

  const getTeam = async () => {
    try {
      //const response = await axiosPrivate.get(`Team/${id}`);
      const response = await API.getTeam(id);
      setTeam({ ...response.data })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTeam()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <Flex direction="column" flex="1" overflow="auto" px="10" pt="8">
        <Flex align="center" justify="space-between">
          <Heading pt="2.5" size="lg" fontWeight="extrabold" mb="6">
            {team?.name}
          </Heading>
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
              <Stack spacing="4" divider={<StackDivider />}>
                <FieldGroup title="Team Information">
                  <TeamForm getTeam={() => getTeam()} teamData={team} />
                </FieldGroup>

                <FieldGroup title="Medlemmar">
                  <TeamEmployees getTeam={() => getTeam()} employees={team.users} />
                </FieldGroup>

                <FieldGroup title="Ta bort team">
                  <TeamDelete id={id} />
                </FieldGroup>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Flex>
    </>
  )
}

export default Team