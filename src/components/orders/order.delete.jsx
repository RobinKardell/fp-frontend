import { Button, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import React from 'react'
import { Field, FormikProvider, useFormik } from 'formik';
import * as Yup from "yup"
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

function OrderDelete(props) {
  const { isOpen, onClose, deleteOrder } = props;
  const axiosPrivate = useAxiosPrivate();

  const deleteForm = useFormik({
    initialValues: {
      repeat: "",
    },

    validationSchema: Yup.object({
      repeat: Yup.string().test('same', 'Måste vara "THEA"', val => val === "THEA")
    }),

    onSubmit: async (values, actions) => {
      try {
        deleteOrder();
      } catch (error) {
        console.log(error)
      } finally {
        actions.resetForm()
      }
    }
  })

  return (

    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <FormikProvider value={deleteForm}>
          <ModalHeader>Ta bort arbetsorder</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Är du säker på att du vill ta bort arbetsordern?

            <FormControl isInvalid={deleteForm.errors.repeat && deleteForm.touched.repeat}>
              <FormLabel>Bekräfta genom att ange THEA</FormLabel>
              <Field name="repeat">
                {({ field }) => (
                  <Input placeholder="THEA" {...field} />
                )}
              </Field>
              <FormErrorMessage>{deleteForm.errors.repeat}</FormErrorMessage>
            </FormControl>

          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={deleteForm.handleSubmit}>
              Ja
            </Button>
            <Button onClick={onClose} bg="brand.primary" _hover={{ bg: "brand.secondary" }} textColor="white">Avbryt</Button>
          </ModalFooter>
        </FormikProvider>
      </ModalContent>
    </Modal>
  )
}

export default OrderDelete