import { Select, Button, Checkbox, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Stack, Textarea, useDisclosure, VStack } from '@chakra-ui/react'
import { Field, FormikProvider, useFormik } from 'formik'
import * as Yup from "yup";
import React, { useEffect, useState } from 'react'
import * as API from "../../api/api";

function EditArtikelForm(props){
  const { isOpen, onOpen, onClose, getArticels } = props;
  const [checkedValues, setCheckedValues] = useState([]);

  const handleCheckBoxChange = (value) => {
    if (checkedValues.includes(value)) {
      // Remove value from checkedValues
      setCheckedValues(checkedValues.filter((item) => item !== value));
    } else {
      // Add value to checkedValues
      setCheckedValues([...checkedValues, value]);
    }
  };
    const addOrderForm = useFormik({
      initialValues: {
        name: "",
        price: 100,
        artikelnr: "",
        type: ""
      },
  
      validationSchema: Yup.object({
        name: Yup.string().required("Namn krävs."),
        artikelnr: Yup.string().required("Artikelnummer krävs."),
        type: Yup.string().required("Type krävs."),
        price: Yup.number("Detta måste vara ett heltals nummer tex 10").required("Pris krävs")
      }),
  
      onSubmit: async (values, actions) => {
        try {
          const objectToPost = {
            name: values.name,
            artikelnr: values.artikelnr,
            price: values.price,
            type:values.type,
            for:checkedValues
          };
          console.log(objectToPost);
          await API.addArticels(objectToPost)
          await getArticels();
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
              <ModalContent bgColor={"lightgray"} >
                <ModalHeader borderBottom="1px">Lägg till artikel</ModalHeader>
                {/*<ModalCloseButton />*/}
                <ModalBody>
                  <FormikProvider value={addOrderForm}>
                    <Stack width="full">
                      <FormControl isInvalid={addOrderForm.errors.name && addOrderForm.touched.name}>
                        <FormLabel>Namn</FormLabel>
                        <Field name="name">
                          {({ field }) => (
                            <Input border="1px solid black" {...field} />
                          )}
                        </Field>
                        <FormErrorMessage>{addOrderForm.errors.name}</FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={addOrderForm.errors.artikelnr && addOrderForm.touched.artikelnr}>
                        <FormLabel>ArtikelNr</FormLabel>
                        <Field name="artikelnr">
                          {({ field }) => (
                            <Input border="1px solid black" {...field} />
                          )}
                        </Field>
                        <FormErrorMessage>{addOrderForm.errors.artikelnr}</FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={addOrderForm.errors.type && addOrderForm.touched.type}>
                        <FormLabel>Type</FormLabel>
                        <Field name="type">
                          {({ field }) => (
                            <Select border="1px solid black" bgColor={"white"} {...field} >
                              <option>Vad för typ är detta?</option>
                              <option value="h">Timmar</option>
                              <option value="st">Styck</option>
                            </Select>
                          )}
                        </Field>
                        <FormErrorMessage>{addOrderForm.errors.type}</FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={addOrderForm.errors.price && addOrderForm.touched.price}>
                        <FormLabel>Pris</FormLabel>
                        <Field name="price">
                          {({ field }) => (
                            <Input border="1px solid black" {...field} type="number" />
                          )}
                        </Field>
                        <FormErrorMessage>{addOrderForm.errors.price}</FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={addOrderForm.errors.price && addOrderForm.touched.price}>
                        <FormLabel>Artikel för?</FormLabel>
                        <Stack spacing={[1, 5]} direction={['column']}>
                            <Checkbox 
                            value='Bohag'
                            onChange={() => handleCheckBoxChange("Bohag")}
                            isChecked={checkedValues.includes("Bohag")}
                            >Bohag</Checkbox>
                            <Checkbox
                            value='Evakuering'
                            onChange={() => handleCheckBoxChange("Evakuering")}
                            isChecked={checkedValues.includes("Evakuering")}
                            >Evakuering</Checkbox>
                            <Checkbox
                            value='Kontorsflytt'
                            onChange={() => handleCheckBoxChange("Kontorsflytt")}
                            isChecked={checkedValues.includes("Kontorsflytt")}
                            >Kontorsflytt</Checkbox>
                            <Checkbox 
                            value="Transport"
                            onChange={() => handleCheckBoxChange("Transport")}
                            isChecked={checkedValues.includes("Transport")}
                            >Transport</Checkbox>
                            <Checkbox 
                            value="UtPer"
                            onChange={() => handleCheckBoxChange("UtPer")}
                            isChecked={checkedValues.includes("UtPer")}
                            >Uthyrning personal</Checkbox>
                      </Stack>
                      </FormControl>
                      
                    </Stack>
                  </FormikProvider>
                </ModalBody>
                <ModalFooter borderTop="1px">
                  <Button disabled={addOrderForm.isSubmitting} isLoading={addOrderForm.isSubmitting} onClick={() => addOrderForm.handleSubmit()} mr={3}>
                    Lägg till
                  </Button>
                  <Button onClick={onClose}>Avbryt</Button>
                </ModalFooter>
              </ModalContent>
            </ModalOverlay>
          </Modal>
        </>);
}
export default EditArtikelForm