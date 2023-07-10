import { AlertDescription, Alert, AlertIcon, AlertTitle, Avatar, Box, Button, ButtonGroup, Flex, HStack, Image, Input, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useFilePicker } from 'use-file-picker';
import { axiosPrivate } from '../../api/axios';

function EmployeeAvatar(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState({ show: false, message: "" });
  const [serverSuccess, setServerSuccess] = useState({ show: false, message: "" });
  const { employeeData, getEmployee } = props;
  const [openFileSelector, { filesContent, loading, plainFiles, clear }] = useFilePicker({
    accept: [".png", ".jpg", ".gif"],
    readAs: 'DataURL',
    limitFilesConfig: { max: 1 },
  });

  const uploadAvatar = async () => {
    setIsLoading(true)
    setServerError({ show: false, message: "" })
    try {
      const formData = new FormData();
      formData.append("file", plainFiles[0])
      const uploadAvatar = await axiosPrivate.post(`User/avatar/${employeeData.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setServerSuccess({ show: true, message: "Profilbild uppdaterad."})
      getEmployee();
    } catch (error) {
      setServerError({ show: true, message: "Error"})
    } finally {
      clear()
      setIsLoading(false)
    }
  }

  const removeAvatar = async () => {
    try {
      setServerError()
      const removeAvatar = await axiosPrivate.delete(`User/avatar/${employeeData.id}`)
      getEmployee();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Stack spacing="6" align="center" width="full">
        {serverError.show && (
          <Alert variant="left-accent" status="error">
            <AlertIcon />
            <AlertTitle>Profilbild:</AlertTitle>
            <AlertDescription>Fel vid sparande.</AlertDescription>
          </Alert>
        )}
        {/* Lyckades vid sparanade */}
        {serverSuccess.show && (
          <Alert variant="left-accent" status="success">
            <AlertIcon />
            <AlertTitle>Profilbild:</AlertTitle>
            <AlertDescription>Sparad</AlertDescription>
          </Alert>
        )}
        <Box>
          <Avatar
            size="xl"
            name={`${employeeData.firstName} ${employeeData.lastName}`}
            src={employeeData.avatarUrl}
          />

        </Box>
        <Box cursor="pointer" rounded="xl" bg="white" width="full">
          <Flex onClick={openFileSelector} w="full" alignItems="center" rounded={"md"}>
            <Button bg="white" mr="4">Välj Fil</Button>
            <Text>{filesContent[0]?.name ? filesContent[0].name : "Ingen fil vald..."}</Text>
          </Flex>
        </Box>
        <Button isLoading={isLoading} disabled={filesContent.length == 0} w="full" onClick={() => uploadAvatar()} bg="brand.primary" _hover={{ bg: "brand.secondary" }} textColor="white">
          Spara
        </Button>
      </Stack>
    </>
  )
}

export default EmployeeAvatar