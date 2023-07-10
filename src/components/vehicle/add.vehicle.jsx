import { Grid, GridItem, Box, Button, Checkbox, Divider, Flex, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, VStack, Heading } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { Field, FormikProvider, useFormik } from 'formik'
import React from 'react'
import * as Yup from "yup"
import * as API from '../../api/api';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function VehicleAddForm(props) {
  const { isOpen, onClose, onOpen, getVehiclesLoad } = props;

  const addCustomerForm = useFormik({
    initialValues: {
        licenseNumber: "",
        brand: "",
        model: "",
        type: ""   
    },

    validationSchema: Yup.object({
        licenseNumber: Yup.string().required("Regnr. krävs."),
        brand: Yup.string().required("Märke krävs."),
        model: Yup.string(),
        type: Yup.string()
    }),

    onSubmit: async (values, actions) => {
      try {
        console.log(values);
        await API.createVehicle(values);
        await getVehiclesLoad()
        onClose()
      } catch {
        console.log("adas");
      }
      actions.resetForm();
    }
  })

  return (
    <>
      <Modal scrollBehavior={"inside"} isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Lägg till fordon</ModalHeader>
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
                        <FormLabel>Regnr.</FormLabel>
                        <Field name="licenseNumber">
                          {({ field }) => (
                            <Input border={"1px solid #000"} {...field} />
                          )}
                        </Field>
                        <FormErrorMessage>{addCustomerForm.errors.identityNumber}</FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      {/* Namn */}
                      <FormControl isInvalid={addCustomerForm.errors.name && addCustomerForm.touched.name}>
                        <FormLabel>Märke</FormLabel>
                        <Field name="brand">
                          {({ field }) => (
                            <Input border={"1px solid #000"} {...field} />
                          )}
                        </Field>
                        <FormErrorMessage>{addCustomerForm.errors.name}</FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      {/* Namn */}
                      <FormControl isInvalid={addCustomerForm.errors.name && addCustomerForm.touched.name}>
                        <FormLabel>Modell</FormLabel>
                        <Field name="model">
                          {({ field }) => (
                            <Input border={"1px solid #000"} {...field} />
                          )}
                        </Field>
                        <FormErrorMessage>{addCustomerForm.errors.name}</FormErrorMessage>
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl isInvalid={addCustomerForm.errors.clientNumber && addCustomerForm.touched.clientNumber}>
                        <FormLabel>Type</FormLabel>
                        <Field name="type">
                          {({ field }) => (
                            <Input border={"1px solid #000"} {...field} />
                          )}
                        </Field>
                        <FormErrorMessage>{addCustomerForm.errors.clientNumber}</FormErrorMessage>
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

export default VehicleAddForm