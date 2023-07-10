import { Button, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup"
import React from 'react'
import { Field, FormikProvider, useFormik } from 'formik';

function CustomerDelete(props) {
  const axiosPrivate = useAxiosPrivate();
  const { id } = props;
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate();

  const deleteForm = useFormik({
    initialValues: {
      repeat: "",
    },

    validationSchema: Yup.object({
      repeat: Yup.string().test('same', 'Måste vara "THERESA"', val => val === "THERESA")
    }),

    onSubmit: async (values, actions) => {
      try {
        const deleteCustomerResponse = await axiosPrivate.delete(`Customer/${id}`);
        if(deleteCustomerResponse.data.success) {
          navigate("/customers");
        } 
      } catch(error) {
        console.log(error)
      } finally {
        actions.resetForm()
      }
    }
  })

  return (
    <>
      <Button onClick={onOpen} colorScheme="red" w="full">Ta bort</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <FormikProvider value={deleteForm}>
            <ModalHeader>Ta bort kund</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Är du säker på att du vill ta bort kunden?

              <FormControl isInvalid={deleteForm.errors.repeat && deleteForm.touched.repeat}>
                <FormLabel>Bekräfta genom att ange THERESA</FormLabel>
                <Field name="repeat">
                  {({ field }) => (
                    <Input placeholder="THERESA" {...field} />
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
    </>
  )
}

export default CustomerDelete