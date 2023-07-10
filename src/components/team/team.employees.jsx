import { Button, Box, VStack, Text, Flex, Divider } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import * as API from "../../api/api";

function TeamEmployees(props) {
  const axiosPrivate = useAxiosPrivate();
  const { employees, getTeam } = props;
  const navigate = useNavigate();

  const removeEmployee = async (employeeId) => {
    try {
      const removeEmployeeResponse = await axiosPrivate.delete(`User/${employeeId}/team`)
      await API.deleteUserFromTeam(employeeId);
      //if (removeEmployeeResponse.data.success) {
        getTeam();
      //}
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <VStack width="full" spacing="3">
        {employees?.length < 1 &&
          <Flex justify="center" width="full">
            <Text>
              Detta team saknar anställda.
            </Text>
          </Flex>
        }
        {employees?.map(employee => (
          <>
            {employee?.deleted ? (
              <>
                <Flex width="full" alignItems="center" justify="space-between" key={employee.id}>
                  <Box opacity="0.2">
                    <Text>{employee.firstname} {employee.lastname}</Text>
                  </Box>
                  <Box>
                    <Button onClick={() => removeEmployee(employee.id)} size="sm" colorScheme="red">Ta bort</Button>
                  </Box>
                </Flex>
                <Divider />
              </>
            ) : (
              <>
                <Flex width="full" alignItems="center" justify="space-between" key={employee.id}>
                  <Box>
                    <Text onClick={() => navigate(`/employees/${employee.id}`)} cursor={"pointer"}>{employee.firstname} {employee.lastname}</Text>
                  </Box>
                  <Box>
                    <Button onClick={() => removeEmployee(employee.id)} size="sm" colorScheme="red">Ta bort</Button>
                  </Box>
                </Flex>
                <Divider />
              </>
            )}
          </>
        ))}
      </VStack>
    </>
  )
}

export default TeamEmployees