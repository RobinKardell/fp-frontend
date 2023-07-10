import { FormControl, FormLabel, Input, VStack, Button, FormErrorMessage, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'
import { Field, FormikProvider, useFormik } from 'formik'
import * as Yup from "yup"
import React from 'react'
import { useState } from 'react'
import { axiosPrivate } from '../../api/axios'
import { useEffect } from 'react'
import * as API from "../../api/api";

function EmployeePasswordForm(props) {
  const { id } = props;
  const [serverError, setServerError] = useState(false);
  const [serverSuccess, setServerSuccess] = useState({ show: false, message: "" });

  const passwordForm = useFormik({
    initialValues: {
      id: id,
      password: "",
      passwordRepeat: ""
    },

    validationSchema: Yup.object({
      password: Yup.string().required("Lösenord krävs").min(6, "Lösenordet är för kort."),
      passwordRepeat: Yup.string().required("Repetera lösenordet.").oneOf([Yup.ref("password")], "Lösenorden matchar inte.")
    }),

    onSubmit: async (values, actions) => {
      try {
        //console.log(JSON.stringify(values));
        await API.updateUserPassword(JSON.stringify(values));
        setServerError(false);
        setServerSuccess({show: true, message: "Lösenord bytt"})
        /*const resetPasswordResponse = await axiosPrivate.post("/Auth/reset-password", JSON.stringify(values));
        
        if(resetPasswordResponse.data.success) {
          setServerError(false);
          setServerSuccess({show: true, message: "Lösenord bytt"})
        }*/
      } catch(error) {
        setServerError(true);
      }
      actions.resetForm();
    }
  });

  useEffect(() => {
    passwordForm.setFieldValue("id", id);
  }, [id])

  return (
    <>
      <VStack width="full" spacing="6">
        {/* Fel vid sparande */}
        {serverError && (
          <Alert variant="left-accent" status="error">
            <AlertIcon />
            <AlertTitle>Lösenord:</AlertTitle>
            <AlertDescription>Fel vid ändring.</AlertDescription>
          </Alert>
        )}
        {/* Lyckades vid sparanade */}
        {serverSuccess.show && (
          <Alert variant="left-accent" status="success">
            <AlertIcon />
            <AlertTitle>Lösenord:</AlertTitle>
            <AlertDescription>Lösenordet ändrat.</AlertDescription>
          </Alert>
        )}
        <FormikProvider value={passwordForm}>

          <FormControl isInvalid={passwordForm.errors.password && passwordForm.touched.password}>
            <FormLabel>Lösenord:</FormLabel>
            <Field name="password">
              {({ field }) => (
                <Input type="password" {...field} />
              )}
            </Field>
            <FormErrorMessage>{passwordForm.errors.password}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={passwordForm.errors.passwordRepeat && passwordForm.touched.passwordRepeat}>
            <FormLabel>Lösenord igen:</FormLabel>
            <Field name="passwordRepeat">
              {({ field }) => (
                <Input type="password" {...field} />
              )}
            </Field>
            <FormErrorMessage>{passwordForm.errors.passwordRepeat}</FormErrorMessage>
          </FormControl>

          <Button onClick={passwordForm.handleSubmit} bg="brand.primary" _hover={{ bg: "brand.secondary" }} textColor="white" w="full">Byt Lösenord</Button>
        </FormikProvider>
      </VStack>
    </>
  )
}

export default EmployeePasswordForm