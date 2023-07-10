import { Field, FormikProvider, useFormik } from 'formik';
import * as Yup from "yup";
import React from 'react'
import { Button, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Select, Grid, GridItem, SimpleGrid, Box } from '@chakra-ui/react';
import * as API from "../../api/api";
import NumberSelectBox from '../common/NumberSelectBox';
import AlfabethSelectBox from '../common/AlfabethSelectBox';

function AddPlaceModal(props) {
  const { getSpaces, warehouse, isOpen, onOpen, onClose } = props;

  const addTeamForm = useFormik({
    initialValues: {
      name: "",
      description: "",
      type: "1",
      rowTo: 1,
      rowFrom: 1,
      levelTo: 1,
      levelFrom: 1
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Namn krävs."),
      description: Yup.string(),
      rowFrom: Yup.number()
        .typeError("Row From must be a number.")
        .required("Row From is required.")
        .integer("Row From must be an integer."),
      rowTo: Yup.number()
        .typeError("Row To must be a number.")
        .required("Row To is required.")
        .integer("Row To must be an integer.")
        .min(Yup.ref('rowFrom'), "Row To must be greater than or equal to Row From."),
      levelFrom: Yup.number()
        .typeError("Level From must be a number.")
        .required("Level From is required.")
        .integer("Level From must be an integer."),
      levelTo: Yup.number()
        .typeError("Level To must be a number.")
        .required("Level To is required.")
        .integer("Level To must be an integer.")
        .min(Yup.ref('levelFrom'), "Level To must be greater than or equal to LevelFrom."),
    }),


    onSubmit: async (values, actions) => {
      try {
        onClose();
        console.log({ ...values, warehouse: warehouse })
        //const addTeamResponse = await axiosPrivate.post("/Team", JSON.stringify(values));
        await API.createWarehouseSpace({ ...values, warehouse: warehouse });
        //if(addTeamResponse.data.success) {
        getSpaces();
        //}
      } catch (error) {

      }
      actions.resetForm();
    }
});

return (
  <>
    <Modal scrollBehavior={"inside"} isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>Skapa Lagerplats</ModalHeader>
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
                <SimpleGrid columns={2} spacing={5}>
                  <Box>
                    <FormControl isInvalid={addTeamForm.errors.rowFrom && addTeamForm.touched.description}>
                      <FormLabel>Rad Från</FormLabel>
                      <Field name="rowFrom" component={NumberSelectBox} />
                      <FormErrorMessage>{addTeamForm.errors.rowFrom}</FormErrorMessage>
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl isInvalid={addTeamForm.errors.rowTo && addTeamForm.touched.description}>
                      <FormLabel>Rad Till</FormLabel>
                      <Field name="rowTo" component={NumberSelectBox} />
                      <FormErrorMessage>{addTeamForm.errors.rowTo}</FormErrorMessage>
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl isInvalid={addTeamForm.errors.levelFrom && addTeamForm.touched.description}>
                      <FormLabel>Nivå Från</FormLabel>
                      <Field name="levelFrom" component={NumberSelectBox} />
                      <FormErrorMessage>{addTeamForm.errors.levelFrom}</FormErrorMessage>
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl isInvalid={addTeamForm.errors.levelTo && addTeamForm.touched.description}>
                      <FormLabel>Nivå Till</FormLabel>
                      <Field name="levelTo" component={NumberSelectBox} />
                      <FormErrorMessage>{addTeamForm.errors.levelTo}</FormErrorMessage>
                    </FormControl>
                  </Box>
                </SimpleGrid>
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

export default AddPlaceModal