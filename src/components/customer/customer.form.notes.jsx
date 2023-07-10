import { Alert, AlertDescription, AlertIcon, AlertTitle, FormControl, FormLabel, Textarea, VStack, Button } from '@chakra-ui/react'
import { Field, FormikProvider, useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import * as API from "../../api/api";

function CustomerNotesForm(props) {
  const axiosPrivate = useAxiosPrivate();
  const { customerData, getCustomer } = props;
  const [serverError, setServerError] = useState({ show: false, message: "" });
  const [serverSuccess, setServerSuccess] = useState({ show: false, message: "" });

  const personalForm = useFormik({
    initialValues: {
      notes: "",
    },

    validationSchema: Yup.object({
      notes: Yup.string(),
    }),

    onSubmit: async (values, actions) => {
      try {
        //const updateCustomerLocationResponse = await axiosPrivate.patch(`/customer/notes/${customerData.id}`, JSON.stringify(values))
        const updateCustomerLocationResponse = await API.updateClientNotes(JSON.stringify({
          id: customerData.id,
          notes: values.notes
        }))

        if (updateCustomerLocationResponse) {
          setServerError({ show: false, message: ""});
          setServerSuccess({ show: true, message: "Anteckning sparad." })
          getCustomer();
        }
      } catch {
        setServerError({ show: true, message: "Anteckning ej sparad."});
      }
      actions.resetForm();
    },
  })

  useEffect(() => {
    personalForm.setValues({
      notes: customerData.Notes
    })
  }, [customerData])

  return (
    <VStack width="full" spacing="6">
      {/* Fel vid sparande */}
      {serverError.show && (
        <Alert variant="left-accent" status="error">
          <AlertIcon />
          <AlertTitle>Kund Anteckningar:</AlertTitle>
          <AlertDescription>Fel vid sparande</AlertDescription>
        </Alert>
      )}
      {/* Lyckades vid sparanade */}
      {serverSuccess.show && (
        <Alert variant="left-accent" status="success">
          <AlertIcon />
          <AlertTitle>Kund Anteckningar:</AlertTitle>
          <AlertDescription>Sparad</AlertDescription>
        </Alert>
      )}
      <FormikProvider value={personalForm}>
        <FormControl>
          <FormLabel>Anteckningar</FormLabel>
          <Field name="notes">
            {({ field }) => (
              <Textarea backgroundColor={"#FFF"} {...field} />
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
  )
}

export default CustomerNotesForm