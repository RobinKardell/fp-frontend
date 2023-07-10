import { Field, FormikProvider, useFormik } from 'formik';
import * as Yup from "yup";
import React from 'react'
import { Button, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, VStack } from '@chakra-ui/react';
import * as API from "../../api/api";

function TimelogForm(props) {
  const { isOpen, onOpen, onClose, getTimelogs } = props;

  
  const addTeamForm = useFormik({
    initialValues: {
      name: "",
      description: ""
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Namn krävs."),
      description: Yup.string(),
    }),

    onSubmit: async (values, actions) => {
      try {
        onClose();
        //console.log(JSON.stringify(values))
        //const addTeamResponse = await axiosPrivate.post("/Team", JSON.stringify(values));
       // await API.createTeam(JSON.stringify(values));
        //if(addTeamResponse.data.success) {
           // getTimelogs();
        //}
      } catch(error) {

      }
      actions.resetForm();
    }
  });

  return (
    <>
      <Modal scrollBehavior={"inside"} isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Lägg till team</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormikProvider value={addTeamForm}>
                <Stack>
                  <FormControl isInvalid={addTeamForm.errors.name && addTeamForm.touched.name}>
                    <FormLabel>Namn</FormLabel>
                    <Field name="name">
                      {({ field }) => (
                        <Input {...field} />
                      )}
                    </Field>
                    <FormErrorMessage>{addTeamForm.errors.name}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={addTeamForm.errors.description && addTeamForm.touched.description}>
                    <FormLabel>Beskrivning</FormLabel>
                    <Field name="description">
                      {({ field }) => (
                        <Input {...field} />
                      )}
                    </Field>
                    <FormErrorMessage>{addTeamForm.errors.description}</FormErrorMessage>
                  </FormControl>
                </Stack>
              </FormikProvider>
            </ModalBody>
            <ModalFooter>
              <Button onClick={addTeamForm.handleSubmit} _hover={{ bg: "brand.secondary" }} bg="brand.primary" textColor="white" mr={3}>
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

export default TimelogForm