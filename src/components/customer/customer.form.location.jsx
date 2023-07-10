import { AlertDescription, AlertIcon, Button, Alert, AlertTitle, FormControl, FormErrorMessage, FormLabel, Input, VStack } from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';
import * as Yup from "yup";
import React, { useEffect, useState } from 'react'
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import * as API from "../../api/api";

function CustomerLocationForm(props) {
  const axiosPrivate = useAxiosPrivate();
  const { customerData, getCustomer } = props;
  const [serverError, setServerError] = useState({ show: false, message: "" });
  const [serverSuccess, setServerSuccess] = useState({ show: false, message: "" });

  const personalForm = useFormik({
    initialValues: {
      streetAdress: "",
      zip: "",
      city: "",
    },

    validationSchema: Yup.object({
      streetAdress: Yup.string().required("Adress krävs."),
      zip: Yup.number().typeError("Endast siffror.").required("Postkod krävs."),
      city: Yup.string().required("Stad krävs.")
    }),

    onSubmit: async (values, actions) => {
      try {
        console.log(JSON.stringify(values));
        /*const updateCustomerLocationResponse = await axiosPrivate.patch(`/customer/location/${customerData.id}`, JSON.stringify({
          streetAdress: values.streetAdress,
          city: values.city,
          postalCode: values.zip
        }))*/
        const updateCustomerLocationResponse = await API.updateClientlocation(JSON.stringify({
          id: customerData.id,
          streetAdress: values.streetAdress,
          city: values.city,
          zip: values.zip
        }));

        if (updateCustomerLocationResponse) {
          setServerError({ show: false, message: ""});
          setServerSuccess({ show: true, message: "Anställd sparad." })
          getCustomer();
        }
      } catch {
        setServerError({ show: true, message: "Anställd ej sparad."});
      }
      actions.resetForm();
    },
  })

  useEffect(() => {
    personalForm.setValues({
      streetAdress: customerData.Adress,
      zip: customerData.PostCode,
      city: customerData.City
    })
  }, [customerData])

  return (
    <VStack width="full" spacing="6">
      {/* Fel vid sparande */}
      {serverError.show && (
        <Alert variant="left-accent" status="error">
          <AlertIcon />
          <AlertTitle>Kund Plats:</AlertTitle>
          <AlertDescription>Fel vid sparande</AlertDescription>
        </Alert>
      )}
      {/* Lyckades vid sparanade */}
      {serverSuccess.show && (
        <Alert variant="left-accent" status="success">
          <AlertIcon />
          <AlertTitle>Kund Plats:</AlertTitle>
          <AlertDescription>Sparad</AlertDescription>
        </Alert>
      )}
      <FormikProvider value={personalForm}>
        {/* Adress */}
        <FormControl isInvalid={personalForm.errors.streetAdress && personalForm.touched.streetAdress}>
          <FormLabel>Adress</FormLabel>
          <Field name="streetAdress">
            {({ field }) => (
              <Input {...field} />
            )}
          </Field>
          <FormErrorMessage>{personalForm.errors.streetAdress}</FormErrorMessage>
        </FormControl>
        {/* City */}
        <FormControl isInvalid={personalForm.errors.city && personalForm.touched.city}>
          <FormLabel>Stad</FormLabel>
          <Field name="city">
            {({ field }) => (
              <Input {...field} />
            )}
          </Field>
          <FormErrorMessage>{personalForm.errors.city}</FormErrorMessage>
        </FormControl>
        {/* Phone */}
        <FormControl isInvalid={personalForm.errors.zip && personalForm.touched.zip}>
          <FormLabel>Postkod</FormLabel>
          <Field name="zip">
            {({ field }) => (
              <Input {...field} />
            )}
          </Field>
          <FormErrorMessage>{personalForm.errors.zip}</FormErrorMessage>
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

export default CustomerLocationForm