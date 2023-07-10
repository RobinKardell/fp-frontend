import React from 'react'
import { Alert, AlertIcon, AlertTitle, AlertDescription, VStack, FormControl, FormLabel, Input, Button, Select } from "@chakra-ui/react"
import { Field, useFormik, FormikProvider } from 'formik';
import * as Yup from "yup";
import { useState } from 'react'
import { FormErrorMessage } from '@chakra-ui/react';
import { useEffect } from 'react';
import { axiosPrivate } from '../../api/axios';
import {Roles} from '../roles';
import * as API from "../../api/api";

function EmployeeForm(props) {
  const { employeeData, teamsData, getEmployee } = props;
  const [serverError, setServerError] = useState(false);
  const [serverSuccess, setServerSuccess] = useState({ show: false, message: "" });

  const personalForm = useFormik({
    initialValues: {
      id: "",
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      roleid: "",
      teamid: "",
    },

    validationSchema: Yup.object({
      firstname: Yup.string().required("Förnamn krävs."),
      lastname: Yup.string().required("Efternamn krävs."),
      email: Yup.string().required("Email krävs.").email("Inte en giltlig email."),
      phone: Yup.string().required("Telefon krävs."),
    }),

    onSubmit: async (values, actions) => {
      try {
        //console.log(JSON.stringify(values))
        const updateUserResponse = await API.updateUserInfo(JSON.stringify(values))
        setServerSuccess({ show: true, message: "Anställd sparad." })
        getEmployee();
        /*if (updateUserResponse.data.success) {
          //setServerError(false);
          setServerSuccess({ show: true, message: "Anställd sparad." })
          getEmployee();
        }*/
      } catch {
        setServerError(true);
      }
      actions.resetForm();
    },
  })

  useEffect(() => {
    personalForm.setValues({ id: employeeData.id, firstname: employeeData.firstname, lastname: employeeData.lastname, email: employeeData.email, phone: employeeData.phone, roleid: employeeData.roleid?.toString(), teamid: employeeData.teamid })
  }, [employeeData])

  return (
    <>
      <VStack width="full" spacing="6">
        {/* Fel vid sparande */}
        {serverError && (
          <Alert variant="left-accent" status="error">
            <AlertIcon />
            <AlertTitle>Anställd:</AlertTitle>
            <AlertDescription>Fel vid sparande.</AlertDescription>
          </Alert>
        )}
        {/* Lyckades vid sparanade */}
        {serverSuccess.show && (
          <Alert variant="left-accent" status="success">
            <AlertIcon />
            <AlertTitle>Anställd:</AlertTitle>
            <AlertDescription>Ändring sparad.</AlertDescription>
          </Alert>
        )}
        <FormikProvider value={personalForm}>

          <FormControl isInvalid={personalForm.errors.firstname && personalForm.touched.firstname}>
            <FormLabel>Förnamn</FormLabel>
            <Field name="firstname">
              {({ field }) => (
                <Input {...field} />
              )}
            </Field>
            <FormErrorMessage>{personalForm.errors.firstname}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={personalForm.errors.lastname && personalForm.touched.lastname}>
            <FormLabel>Efternamn</FormLabel>
            <Field name="lastname">
              {({ field }) => (
                <Input {...field} />
              )}
            </Field>
            <FormErrorMessage>{personalForm.errors.lastname}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={personalForm.errors.email && personalForm.touched.email}>
            <FormLabel>Email</FormLabel>
            <Field name="email">
              {({ field }) => (
                <Input {...field} />
              )}
            </Field>
            <FormErrorMessage>{personalForm.errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={personalForm.errors.phone && personalForm.touched.phone}>
            <FormLabel>Telefonnummer</FormLabel>
            <Field name="phone">
              {({ field }) => (
                <Input {...field} />
              )}
            </Field>
            <FormErrorMessage>{personalForm.errors.phone}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={personalForm.errors.teamid && personalForm.touched.teamid}>
            <FormLabel>Team</FormLabel>
            <Field name="teamid">
              {({ field }) => (
                <Select {...field}>
                  <option value="0">Inget team</option>
                  {teamsData.map(team => (
                    <option key={team.id} value={team.id}>{team.Name}</option>
                  ))}
                </Select>
              )}
            </Field>
          </FormControl>

          <FormControl isInvalid={personalForm.errors.roleid && personalForm.touched.roleid}>
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

          <Button
            type="submit"
            isLoading={personalForm.isSubmitting}
            disabled={personalForm.isSubmitting}
            onClick={personalForm.handleSubmit}
            bg="brand.primary"
            _hover={{ bg: "brand.secondary" }}
            textColor="white"
            w="full"
          >
            Spara
          </Button>
        </FormikProvider>
      </VStack>
    </>
  )
}

export default EmployeeForm