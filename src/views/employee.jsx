import React from 'react'
import { Flex, Box, Heading, Stack, StackDivider, useColorModeValue, Text } from '@chakra-ui/react'
import { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';
import { FieldGroup } from '../components/employee/FieldGroup'
import EmployeeForm from '../components/employee/employee.form';
import EmployeeDelete from '../components/employee/employee.delete';
import EmployeePasswordForm from '../components/employee/employee.form.password';
import EmployeeAvatar from '../components/employee/employee.avatar';
import * as API from "../api/api";
import EmployeeWorkHours from '../components/employee/employee.workhours';
import AbsenceForm from '../components/employee/employee.absence.form';

function Employee() {
  //const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [teams, setTeams] = useState([]);

  const getEmployee = async () => {
    try {
      //const response = await axiosPrivate.get(`User/${id}`);
      const response = await API.getUser(id);
      setEmployee({ ...response, role: response.roleid, team: response.team?.id })
    } catch (error) {
    }
  }

  const getTeams = async () => {
    try {
      const response = await API.getTeams();
      setTeams(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getEmployee()
    getTeams()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Flex direction="column" flex="1" overflow="auto" px="10" pt="8">
      <Flex align="center" justify="space-between">
        <Heading pt="2.5" size="lg" fontWeight="extrabold" mb="6">
          {employee?.firstname} {employee?.lastname}
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
              {/* Personal Employee Form */}
              <FieldGroup title="Personlig Information">
                <EmployeeForm getEmployee={() => getEmployee()} employeeData={employee} teamsData={teams} />
              </FieldGroup>
              <FieldGroup title="Dina arbetstider">
                <EmployeeWorkHours id={id} workhours={employee?.workHours} />
              </FieldGroup>
              <FieldGroup title="Rapporterad Arbetstid">
              </FieldGroup>
              <FieldGroup title="Frånvaro">
                <AbsenceForm id={id} />
              </FieldGroup>
              <FieldGroup title="Dina löner">
                <Text>Se dina löner</Text>
              </FieldGroup>
              {/*<FieldGroup title="Profile Bild">
                <EmployeeAvatar getEmployee={() => getEmployee()} employeeData={employee}/>
        </FieldGroup>*/}
              {/* Change Employee Password Form */}
              <FieldGroup title="Byt lösenord">
                <EmployeePasswordForm id={id} />
              </FieldGroup>
              {/* Delete employee button */}
              <FieldGroup title="Ta bort anställd">
                <EmployeeDelete id={id} />
              </FieldGroup>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Flex>
  )
}

export default Employee