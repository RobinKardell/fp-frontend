import { Grid, GridItem, Box, Button, Checkbox, Divider, Flex, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, VStack, Heading } from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik'
import React from 'react'
import * as Yup from "yup"
import * as API from '../../api/api';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function CustomersAddForm(props) {
  const { isOpen, onClose, onOpen, getCustomers, pageSize, setCurrentPage } = props;

  const addCustomerForm = useFormik({
    initialValues: {
      identityNumber: "",
      name: "",
      clientNumber: "",
      payment: "",
      streetAdress: "",
      zip: "",
      city: "",
      phone: "",
      fax: "",
      clientNumberFX: "",
      business: false,
      webpage: "",
      invoicemail: "",
      contactname:"",
      contactemail: "",
      contactphone: "",
      conatactcellphone: "",      
      
    },

    validationSchema: Yup.object({
      identityNumber: Yup.string().required("Org./pers. nummer krävs."),
      name: Yup.string().required("Namn krävs."),
      clientNumber: Yup.string().required("kundnummer behövs"),
      streetAdress: Yup.string().required("Adress krävs"),
      zip: Yup.number("Endast siffror").integer("Endast siffor.").required("Postnummer number"),
      city: Yup.string().required("Stad krävs"),
      phone: Yup.string(),
      fax: Yup.string(),
      clientNumberFX: Yup.string(),
      webpage: Yup.string(),
      invoicemail: Yup.string().email("Inte en giltlig email."),

      contactname: Yup.string().required("Stad krävs"),
      contactemail: Yup.string().required("Kontaktmail krävs.").email("Inte en giltlig email."),
      contactphone: Yup.string(),
      conatactcellphone: Yup.string(),
    }),

    onSubmit: async (values, actions) => {
      try {
        //console.log(values);
        await API.createClient(values);
        await getCustomers()
        onClose()
      } catch {

      }
      actions.resetForm();
    }
  })

  return (
    <>
      <Modal scrollBehavior={"inside"} isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Lägg till kund</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormikProvider value={addCustomerForm}>
                <Stack width="full">
                  <Grid
                    templateColumns='repeat(2, 1fr)'
                    gap={4}
                  >
                    <GridItem>
                      {/* Namn */}
                      <FormControl isInvalid={addCustomerForm.errors.identityNumber && addCustomerForm.touched.identityNumber}>
                        <FormLabel>Org./pers. nummer</FormLabel>
                        <Field name="identityNumber">
                          {({ field }) => (
                            <Input border="1px solid black" {...field} />
                          )}
                        </Field>
                        <FormErrorMessage>{addCustomerForm.errors.identityNumber}</FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      {/* Namn */}
                      <FormControl isInvalid={addCustomerForm.errors.name && addCustomerForm.touched.name}>
                        <FormLabel>Namn</FormLabel>
                        <Field name="name">
                          {({ field }) => (
                            <Input border="1px solid black" {...field} />
                          )}
                        </Field>
                        <FormErrorMessage>{addCustomerForm.errors.name}</FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      {/* Namn */}
                      <FormControl isInvalid={addCustomerForm.errors.clientNumber && addCustomerForm.touched.clientNumber}>
                        <FormLabel>Kundnummer</FormLabel>
                        <Field name="clientNumber">
                          {({ field }) => (
                            <Input border="1px solid black" {...field} />
                          )}
                        </Field>
                        <FormErrorMessage>{addCustomerForm.errors.clientNumber}</FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      {/* Namn */}
                      <FormControl>
                        <FormLabel>Betalning</FormLabel>
                        <Field name="payment">
                          {({ field }) => (
                            <Input border="1px solid black" {...field} />
                          )}
                        </Field>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      {/* Adress */}
                      <FormControl isInvalid={addCustomerForm.errors.streetAdress && addCustomerForm.touched.streetAdress}>
                        <FormLabel>Adress</FormLabel>
                        <Field name="streetAdress">
                          {({ field }) => (
                            <Input border="1px solid black" {...field} />
                          )}
                        </Field>
                        <FormErrorMessage>{addCustomerForm.errors.streetAdress}</FormErrorMessage>
                      </FormControl>
                    </GridItem><GridItem>
                      <FormControl isInvalid={addCustomerForm.errors.zip && addCustomerForm.touched.zip}>
                        <FormLabel>Postnummer</FormLabel>
                        <Field name="zip">
                          {({ field }) => (
                            <Input border="1px solid black" type="number" {...field} />
                          )}
                        </Field>
                        <FormErrorMessage>{addCustomerForm.errors.zip}</FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                      <FormControl isInvalid={addCustomerForm.errors.city && addCustomerForm.touched.city}>
                        <FormLabel>Stad</FormLabel>
                        <Field name="city">
                          {({ field }) => (
                            <Input border="1px solid black" {...field} />
                          )}
                        </Field>
                        <FormErrorMessage>{addCustomerForm.errors.city}</FormErrorMessage>
                      </FormControl></GridItem>
                    <GridItem>
                      {/* Phone */}
                      <FormControl isInvalid={addCustomerForm.errors.phone && addCustomerForm.touched.phone}>
                        <FormLabel>Telefon</FormLabel>
                        <Field name="phone">
                          {({ field }) => (
                            <Input border="1px solid black" {...field} />
                          )}
                        </Field>
                        <FormErrorMessage>{addCustomerForm.errors.phone}</FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      {/* Phone */}
                      <FormControl isInvalid={addCustomerForm.errors.fax && addCustomerForm.touched.fax}>
                        <FormLabel>Fax</FormLabel>
                        <Field name="fax">
                          {({ field }) => (
                            <Input border="1px solid black" {...field} />
                          )}
                        </Field>
                        <FormErrorMessage>{addCustomerForm.errors.fax}</FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      {/* Bussiness */}
                      <FormControl isInvalid={addCustomerForm.errors.clientNumberFX && addCustomerForm.touched.clientNumberFX}>
                        <FormLabel>Kundnummer Fortnox</FormLabel>
                        <Field name="clientNumberFX">
                          {({ field }) => (
                            <Input border="1px solid black" {...field} />
                          )}
                        </Field>
                        <FormErrorMessage>{addCustomerForm.errors.clientNumberFX}</FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      {/* Bussiness */}
                      <FormControl isInvalid={addCustomerForm.errors.business && addCustomerForm.touched.business}>
                        <FormLabel>Företag</FormLabel>
                        <Field name="business">
                          {({ field }) => (
                            <Checkbox colorScheme={"brand"} {...field}>Ja / Nej</Checkbox>
                          )}
                        </Field>
                        <FormErrorMessage>{addCustomerForm.errors.business}</FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      {/* Phone */}
                      <FormControl isInvalid={addCustomerForm.errors.webpage && addCustomerForm.touched.webpage}>
                        <FormLabel>Hemsida</FormLabel>
                        <Field name="webpage">
                          {({ field }) => (
                            <Input border="1px solid black" {...field} />
                          )}
                        </Field>
                        <FormErrorMessage>{addCustomerForm.errors.webpage}</FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      {/* Phone */}
                      <FormControl isInvalid={addCustomerForm.errors.invoicemail && addCustomerForm.touched.invoicemail}>
                        <FormLabel>Fakturamail</FormLabel>
                        <Field name="invoicemail">
                          {({ field }) => (
                            <Input border="1px solid black" {...field} />
                          )}
                        </Field>
                        <FormErrorMessage>{addCustomerForm.errors.invoicemail}</FormErrorMessage>
                      </FormControl>
                    </GridItem>


                    {/*Kontakt personon*/}
                    <GridItem colSpan={2}><Heading fontSize={"md"}>Kontaktperson</Heading></GridItem>
                    <GridItem>
                      {/* Email */}
                      <FormControl isInvalid={addCustomerForm.errors.contactname && addCustomerForm.touched.contactname}>
                        <FormLabel>Namn</FormLabel>
                        <Field name="contactname">
                          {({ field }) => (
                            <Input border="1px solid black" {...field} />
                          )}
                        </Field>
                        <FormErrorMessage>{addCustomerForm.errors.contactname}</FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      {/* Email */}
                      <FormControl isInvalid={addCustomerForm.errors.contactemail && addCustomerForm.touched.contactemail}>
                        <FormLabel>Email</FormLabel>
                        <Field name="contactemail">
                          {({ field }) => (
                            <Input border="1px solid black" {...field} />
                          )}
                        </Field>
                        <FormErrorMessage>{addCustomerForm.errors.contactemail}</FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      {/* Email */}
                      <FormControl isInvalid={addCustomerForm.errors.contactphone && addCustomerForm.touched.contactphone}>
                        <FormLabel>Telefon</FormLabel>
                        <Field name="contactphone">
                          {({ field }) => (
                            <Input border="1px solid black" {...field} />
                          )}
                        </Field>
                        <FormErrorMessage>{addCustomerForm.errors.contactphone}</FormErrorMessage>
                      </FormControl>
                    </GridItem><GridItem>
                      {/* Email */}
                      <FormControl isInvalid={addCustomerForm.errors.conatactcellphone && addCustomerForm.touched.conatactcellphone}>
                        <FormLabel>Mobil</FormLabel>
                        <Field name="conatactcellphone">
                          {({ field }) => (
                            <Input border="1px solid black" {...field} />
                          )}
                        </Field>
                        <FormErrorMessage>{addCustomerForm.errors.conatactcellphone}</FormErrorMessage>
                      </FormControl>
                    </GridItem>


                  </Grid>
                </Stack>
              </FormikProvider>
            </ModalBody>
            <ModalFooter>
              <Button onClick={addCustomerForm.handleSubmit} _hover={{ bg: "brand.secondary" }} bg="brand.primary" textColor="white" mr={3}>
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

export default CustomersAddForm