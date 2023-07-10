import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, FormControl, FormErrorMessage, FormLabel, Input, VStack } from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';
import React, { useState } from 'react'
import { useEffect } from 'react';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import * as Yup from "yup";
import * as API from "../../api/api";

function TeamForm(props) {
  const axiosPrivate = useAxiosPrivate();
  const { teamData, getTeam } = props;
  const [serverError, setServerError] = useState(false);
  const [serverSuccess, setServerSuccess] = useState({ show: false, message: "" });

  const personalForm = useFormik({
    initialValues: {
      id: "",
      name: "",
      description: ""
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Namn krävs."),
      description: Yup.string(),
    }),

    onSubmit: async (values, actions) => {
      try {
        //const updateTeamResponse = await axiosPrivate.put("/Team", JSON.stringify(values));
        await API.updateTeam(JSON.stringify(values));
        //if (updateTeamResponse.data.success) {
          setServerError(false);
          setServerSuccess({ show: true, message: "Anställd sparad." })
          getTeam();
        //}
      } catch (error) {
        setServerError(true);
      }
      actions.resetForm();
    }
  });

  useEffect(() => {
    personalForm.setValues({id: teamData.id, name: teamData.Name, description: teamData.Description})
  }, [teamData])

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
          <FormControl isInvalid={personalForm.errors.name && personalForm.touched.name}>
            <FormLabel>Namn</FormLabel>
            <Field name="name">
              {({ field }) => (
                <Input {...field} />
              )}
            </Field>
            <FormErrorMessage>{personalForm.errors.name}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={personalForm.errors.description && personalForm.touched.description}>
            <FormLabel>Beskrivning</FormLabel>
            <Field name="description">
              {({ field }) => (
                <Input {...field} />
              )}
            </Field>
            <FormErrorMessage>{personalForm.errors.description}</FormErrorMessage>
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

export default TeamForm