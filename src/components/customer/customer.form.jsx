import { AlertDescription, AlertIcon, Button, Alert, AlertTitle, FormControl, FormErrorMessage, FormLabel, Input, VStack, Select } from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';
import * as Yup from "yup";
import React, { useEffect, useState } from 'react'
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import * as API from "../../api/api";

function CustomerForm(props) {
  const axiosPrivate = useAxiosPrivate();
  const { customerData, getCustomer } = props;
  const [serverError, setServerError] = useState({ show: false, message: "" });
  const [serverSuccess, setServerSuccess] = useState({ show: false, message: "" });

  const personalForm = useFormik({
    initialValues: {
      id: "",
      name: "",
      email: "",
      phone: "",
      business: "",
      notes: "",
      streetAdress: "",
      postalCode: "",
      city: "",
    },

    validationSchema: Yup.object({

    }),

    onSubmit: async (values, actions) => {
      try {
        console.log("update",JSON.stringify(values));
        const updateCustomerResponse = await API.updateClientInfo(JSON.stringify(values))

        /*const updateCustomerResponse = await axiosPrivate.put("/customer", JSON.stringify({
          ...values,
          notes: customerData.notes,
          business: JSON.parse(values.business),
          location: {
            streetAdress: customerData.location.streetAdress,
            postalCode: customerData.location.postalCode,
            city: customerData.location.city
          }
        }))*/

        if (updateCustomerResponse) {
         // if (updateCustomerResponse.data.success) {
          setServerError({ show: false, message: ""});
          setServerSuccess({ show: true, message: "Kund sparad." })
          getCustomer();  
        }
      } catch {
        setServerError({ show: true, message: "Kund ej sparad."});
      }
      actions.resetForm();
    },
  })

  useEffect(() => {
    personalForm.setValues({
      id: customerData.id,
      name: customerData.Name,
      email: customerData.Email,
      phone: customerData.Phone,
      business: (customerData.Business === 1)?true:false,
      notes: customerData.Notes,
      streetAdress: customerData.Adress,
      postalCode: customerData.PostalCode,
      city: customerData.City
    })
  }, [customerData])

  return (
    <VStack width="full" spacing="6">
      {/* Fel vid sparande */}
      {serverError.show && (
        <Alert variant="left-accent" status="error">
          <AlertIcon />
          <AlertTitle>Kund Uppgifter:</AlertTitle>
          <AlertDescription>Fel vid sparande</AlertDescription>
        </Alert>
      )}
      {/* Lyckades vid sparanade */}
      {serverSuccess.show && (
        <Alert variant="left-accent" status="success">
          <AlertIcon />
          <AlertTitle>Kund Uppgifter:</AlertTitle>
          <AlertDescription>Sparade</AlertDescription>
        </Alert>
      )}
      <FormikProvider value={personalForm}>
        {/* Namn */}
        <FormControl isInvalid={personalForm.errors.name && personalForm.touched.name}>
          <FormLabel>Kundnr</FormLabel>
          <Field name="name">
            {({ field }) => (
              <Input {...field} />
            )}
          </Field>
          <FormErrorMessage>{personalForm.errors.name}</FormErrorMessage>
        </FormControl>
        {/* Namn */}
        <FormControl isInvalid={personalForm.errors.name && personalForm.touched.name}>
          <FormLabel>Namn</FormLabel>
          <Field name="name">
            {({ field }) => (
              <Input {...field} />
            )}
          </Field>
          <FormErrorMessage>{personalForm.errors.name}</FormErrorMessage>
        </FormControl>
        {/* Email */}
        <FormControl isInvalid={personalForm.errors.email && personalForm.touched.email}>
          <FormLabel>Email</FormLabel>
          <Field name="email">
            {({ field }) => (
              <Input {...field} />
            )}
          </Field>
          <FormErrorMessage>{personalForm.errors.email}</FormErrorMessage>
        </FormControl>
        {/* Phone */}
        <FormControl isInvalid={personalForm.errors.phone && personalForm.touched.phone}>
          <FormLabel>Telefon</FormLabel>
          <Field name="phone">
            {({ field }) => (
              <Input {...field} />
            )}
          </Field>
          <FormErrorMessage>{personalForm.errors.phone}</FormErrorMessage>
        </FormControl>
        {/* Business */}
        <FormControl isInvalid={personalForm.errors.business && personalForm.touched.business}>
          <FormLabel>Företag / Privatperson</FormLabel>
          <Field name="business">
            {({ field }) => (
              
              <Select {...field}>
                <option value={true}>Företag</option>
                <option value={false}>Privatperson</option>
              </Select>
            )}
          </Field>
          <FormErrorMessage>{personalForm.errors.business}</FormErrorMessage>
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

export default CustomerForm