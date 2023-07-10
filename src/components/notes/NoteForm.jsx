import { Field, useFormik, FormikProvider } from 'formik';
import React, { useState, useEffect } from 'react'
import { FormErrorMessage, FormControl, FormLabel } from '@chakra-ui/react';
import {HiAnnotation } from 'react-icons/hi';
import * as Yup from "yup";
import {
    StackDivider,
    Heading,
    Box, Button, Textarea, Divider
  }from '@chakra-ui/react';

  import { Select, Card, CardHeader, CardBody, CardFooter, Stack, Text } from '@chakra-ui/react'
  import * as API from "../../api/api";
function NoteForm(props) {
    const { orderid, bookingid } = props;
    const [notes, setNotes] = useState({})
    const getNotes = async () => {
      const responseNotes = await API.getNotes(bookingid)
      setNotes(responseNotes)
    }
  
    useEffect(() => {
      getNotes();
    }, [])
    const NotesForm = useFormik({
        initialValues: {
          note: "",
          notetype: ""
        },
        validationSchema: Yup.object({
          note: Yup.string().required("Anteckning krävs."),
        }),
    
    
        onSubmit: async (values, actions) => {
          console.log("send",{...values, BID:bookingid})
          await API.addOrderNote({...values, BID:bookingid})
          getNotes();
          actions.resetForm();
        }
      })
    return (
    <>
        <Divider height="10px" orientation='horizontal' />
          <Card>
            <CardHeader>
              <Heading size='md'>Order anteckningar</Heading>
            </CardHeader>

            <CardBody>
              <Box>
                <Heading size='xs' marginBottom="20px" textTransform='uppercase'>
                  Lägg till anteckning
                </Heading>
                <Box spacing="24px">

                  <FormikProvider value={NotesForm}>
                    <FormControl isInvalid={NotesForm.errors.note && NotesForm.touched.note}>
                      <FormLabel>Anteckning</FormLabel>
                      <Field name="note">
                        {({ field }) => (
                          <Textarea {...field} placeholder='Vad vill du meddela' />
                        )}
                      </Field>
                      <FormErrorMessage>{NotesForm.errors.Note}</FormErrorMessage>
                    </FormControl>
                    <Stack direction={['column', 'row']} marginTop="15px" spacing="24px" >
                      <FormControl>
                        <Field selected="1" name="notetype">
                          {({ field }) => (
                            <Select selected={1} {...field}>
                              <option value="1">Anteckning</option>
                              <option value="2">Felanmälan</option>
                            </Select>
                          )}
                        </Field>
                      </FormControl>
                      <Button
                        type="submit"
                        isLoading={NotesForm.isSubmitting}
                        disabled={NotesForm.isSubmitting}
                        onClick={NotesForm.handleSubmit}
                        bg="brand.primary"
                        _hover={{ bg: "brand.secondary" }}
                        textColor="white"
                        w="full">
                        Lägg till
                      </Button>
                    </Stack>
                  </FormikProvider>
                </Box>
              </Box>
              <StackDivider height="20px" />
              <Stack divider={<StackDivider />} spacing='5'>
              {notes.notes?.map(note => (
                   
                   <Box>
                   <Heading size='xs' textTransform='uppercase'>
                     {note.notetype===1?"Anteckning":"Felanmälan"} : {note.user}<br /> {note.created} 
                   </Heading>
                   <Text pt='2' fontSize='sm'>
                   {note.note}
                   </Text>
                 </Box>      
            ))}
                
              </Stack>
            </CardBody>
          </Card>
          </>

    );
}

export default NoteForm