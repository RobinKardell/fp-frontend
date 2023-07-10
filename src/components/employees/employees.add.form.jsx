import { Button,Select, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure, VStack } from '@chakra-ui/react'
import { Field, FormikProvider, useFormik } from 'formik'
import * as Yup from "yup";
import React from 'react';
import * as API from "../../api/api";

function EmployeeAddForm(props) {
  //const axiosPrivate = useAxiosPrivate();
  const { isOpen, onOpen, onClose, getEmployees } = props;

  const addEmployeeForm = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      roleid: "",
      //password: "",
      //passwordRepeat: ""
    },

    validationSchema: Yup.object({
      firstname: Yup.string().required("Förnamn krävs."),
      lastname: Yup.string().required("Efternamn krävs."),
      email: Yup.string().required("Email krävs").email("Inte en giltlig email."),
      phone: Yup.string().required("Telefon krävs."),
      //password: Yup.string().required("Lösenord krävs").min(6, "Lösenordet är för kort."),
      //passwordRepeat: Yup.string().required("Repetera lösenordet.").oneOf([Yup.ref("password")], "Lösenorden matchar inte.")
    }),

    onSubmit: async (values, actions) => {
      try {
        onClose();
        //console.log(JSON.stringify(values));
        //const addEmployeeResponse = await axiosPrivate.post("/Auth/register", JSON.stringify(values));
        const addEmployeeResponse = await API.createUser(JSON.stringify(values));
        //if(addEmployeeResponse.data.success) {
          getEmployees();
        //}
      } catch(error) {

      }
      actions.resetForm();
    }
  })

  return (
    <>
      <Modal scrollBehavior={"inside"} isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Lägg till anställd</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormikProvider value={addEmployeeForm}>
                <Stack width="full">
                  <FormControl isInvalid={addEmployeeForm.errors.firstname && addEmployeeForm.touched.firstname}>
                    <FormLabel>Förnamn</FormLabel>
                    <Field name="firstname">
                      {({ field }) => (
                        <Input {...field} />
                      )}
                    </Field>
                    <FormErrorMessage>{addEmployeeForm.errors.firstname}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={addEmployeeForm.errors.lastname && addEmployeeForm.touched.lastname}>
                    <FormLabel>Efternamn</FormLabel>
                    <Field name="lastname">
                      {({ field }) => (
                        <Input {...field} />
                      )}
                    </Field>
                    <FormErrorMessage>{addEmployeeForm.errors.lastname}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={addEmployeeForm.errors.email && addEmployeeForm.touched.email}>
                    <FormLabel>Email</FormLabel>
                    <Field name="email">
                      {({ field }) => (
                        <Input {...field} />
                      )}
                    </Field>
                    <FormErrorMessage>{addEmployeeForm.errors.email}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={addEmployeeForm.errors.phone && addEmployeeForm.touched.phone}>
                    <FormLabel>Telefonnummer</FormLabel>
                    <Field name="phone">
                      {({ field }) => (
                        <Input {...field} />
                      )}
                    </Field>
                    <FormErrorMessage>{addEmployeeForm.errors.phone}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={addEmployeeForm.errors.roleid && addEmployeeForm.touched.roleid}>
            <FormLabel>Behörighet</FormLabel>
            <Field name="roleid">
              {({ field }) => (
                <Select {...field}>
                  <option value="2">Admin</option>
                  <option value="1">Anställd</option>
                  <option value="3">TeamLeader</option>
                </Select>
              )}
            </Field>
          </FormControl>
{/*
                  <FormControl isInvalid={addEmployeeForm.errors.password && addEmployeeForm.touched.password}>
                    <FormLabel>Lösenord</FormLabel>
                    <Field name="password">
                      {({ field }) => (
                        <Input type="password" {...field} />
                      )}
                    </Field>
                    <FormErrorMessage>{addEmployeeForm.errors.password}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={addEmployeeForm.errors.passwordRepeat && addEmployeeForm.touched.passwordRepeat}>
                    <FormLabel>Lösenord</FormLabel>
                    <Field name="passwordRepeat">
                      {({ field }) => (
                        <Input type="password" {...field} />
                      )}
                    </Field>
                    <FormErrorMessage>{addEmployeeForm.errors.passwordRepeat}</FormErrorMessage>
                  </FormControl>*/}
                </Stack>
              </FormikProvider>
            </ModalBody>
            <ModalFooter>
              <Button onClick={addEmployeeForm.handleSubmit} _hover={{ bg: "brand.secondary" }} bg="brand.primary" textColor="white" mr={3}>
                Lägg till
              </Button>
              <Button onClick={onClose}>Avbryt</Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  )
}

export default EmployeeAddForm