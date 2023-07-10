import { Select, Button, Checkbox, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Stack, Textarea, useDisclosure, VStack } from '@chakra-ui/react'
import { Field, FormikProvider, useFormik } from 'formik'
import * as Yup from "yup";
import React, { useEffect, useState } from 'react'
import * as API from "../../api/api";

function AddStuffForm(props){
  const { isOpen, onOpen, onClose, getProducts } = props;

    const addOrderForm = useFormik({
      initialValues: {
        name: "",
        volym: 0.2
      },
  
      validationSchema: Yup.object({
        name: Yup.string().required("Namn krävs."),
        volym: Yup.number("Detta måste vara ett nummer tex 0.2").required("Volym krävs")
      }),
  
      onSubmit: async (values, actions) => {
        try {
          const objectToPost = {
            name: values.name,
            volym: values.volym,
          };
          //console.log(objectToPost);
          await API.addProduct(objectToPost)
          await getProducts();
          onClose();
        } catch (error) {
          console.log(error)
        } finally {
          actions.resetForm();
        }
      }
    })
    return (
        <>
          <Modal scrollBehavior={"inside"} isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay>
              <ModalContent>
                <ModalHeader borderBottom="1px">Lägg till Sak</ModalHeader>
                {/*<ModalCloseButton />*/}
                <ModalBody>
                  <FormikProvider value={addOrderForm}>
                    <Stack width="full">
                      <FormControl isInvalid={addOrderForm.errors.name && addOrderForm.touched.name}>
                        <FormLabel>Namn</FormLabel>
                        <Field name="name">
                          {({ field }) => (
                            <Input {...field} />
                          )}
                        </Field>
                        <FormErrorMessage>{addOrderForm.errors.name}</FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={addOrderForm.errors.volym && addOrderForm.touched.volym}>
                        <FormLabel>Volym</FormLabel>
                        <Field name="volym">
                          {({ field }) => (
                            <Input {...field} type="number" step="0.1" />
                          )}
                        </Field>
                        <FormErrorMessage>{addOrderForm.errors.volym}</FormErrorMessage>
                      </FormControl>
                    </Stack>
                  </FormikProvider>
                </ModalBody>
                <ModalFooter borderTop="1px">
                  <Button disabled={addOrderForm.isSubmitting} isLoading={addOrderForm.isSubmitting} onClick={() => addOrderForm.handleSubmit()} colorScheme="brand" mr={3}>
                    Lägg till
                  </Button>
                  <Button onClick={onClose}>Avbryt</Button>
                </ModalFooter>
              </ModalContent>
            </ModalOverlay>
          </Modal>
        </>);
}
export default AddStuffForm