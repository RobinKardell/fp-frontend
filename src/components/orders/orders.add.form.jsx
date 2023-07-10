import { Button, Checkbox, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Stack, Textarea, useDisclosure, VStack } from '@chakra-ui/react'
import { Field, FormikProvider, useFormik } from 'formik'
import * as Yup from "yup";
import React, { useEffect, useState } from 'react'
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import moment from 'moment/moment';
import { Select } from 'chakra-react-select';
import orderReccurencyOptions from './orderReccurencyOptions';
import orderAllDayOptions from "./orderAllDayOptions";
import * as API from "../../api/api";

function OrderAddForm(props) {
  const axiosPrivate = useAxiosPrivate();
  const [requiredFormData, setRequiredFormData] = useState({ customers: [], teams: [], employees: [] })
  const { isOpen, onOpen, onClose, getOrders } = props;

  const addOrderForm = useFormik({
    initialValues: {
      title: "",
      //start: moment().format("YYYY-MM-DD[T]HH:mm"),
      //end: moment().add(1, 'hours').format("YYYY-MM-DD[T]HH:mm"),
      start: moment().format("YYYY-MM-DD HH:mm"),
      end: moment().add(1, 'hours').format("YYYY-MM-DD HH:mm"),
      allDay: orderAllDayOptions[0],
      reccuring: orderReccurencyOptions[0],
      customer: {},
      employees: [],
      teams: [],
      color: "#3788d8",
      notes: "",
    },

    validationSchema: Yup.object({
      title: Yup.string().required("Namn krävs."),
      start: Yup.date("Måste vara datum & tid.").required("Start datum & tid krävs."),
      end: Yup.date("Måste vara datum & tid.").min(Yup.ref("start"), "Slut datum & tiden kan inte vara mindre än start datum & tiden.").required("Slut datum & tid krävs."),
      notes: Yup.string(),
      customer: Yup.object().shape({
        label: Yup.string().required("Kund krävs"),
        value: Yup.number().required("Kund krävs"),
      }),
    }),

    onSubmit: async (values, actions) => {
      try {
        const objectToPost = {
          title: values.title,
          notes: values.notes,
          allDay: values.allDay.value,
          color: values.color,
          start: values.start,
          end: values.end,
          recurrencyIntervalId: Number(values.reccuring.value),
          customerId: Number(values.customer.value),
          userIds: values.employees.map(x => x.value),
          teamIds: values.teams.map(x => x.value)
        };
        console.log(objectToPost);
        await API.createOrder(objectToPost);
        await getOrders();
        onClose();
      } catch (error) {
        console.log(error)
      } finally {
        actions.resetForm();
      }
    }
  })

  const getRequiredFormData = async () => {
    const responseEmployees = await API.getUsers();
    const responseTeams = await API.getTeams();
    const responseCustomers = await API.getClients();

    setRequiredFormData({ customers: responseCustomers.data, teams: responseTeams.data, employees: responseEmployees.users })
  }

  useEffect(() => {
    getRequiredFormData();
  }, [])

  return (
    <>
      <Modal scrollBehavior={"inside"} isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader borderBottom="1px">Lägg till arbetsorder</ModalHeader>
            {/*<ModalCloseButton />*/}
            <ModalBody>
              <FormikProvider value={addOrderForm}>
                <Stack width="full">
                  <FormControl isInvalid={addOrderForm.errors.title && addOrderForm.touched.title}>
                    <FormLabel>Namn</FormLabel>
                    <Field name="title">
                      {({ field }) => (
                        <Input {...field} placeholder="Städ hos Theresa" />
                      )}
                    </Field>
                    <FormErrorMessage>{addOrderForm.errors.title}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={addOrderForm.errors.start && addOrderForm.touched.start}>
                    <FormLabel>Start</FormLabel>
                    <Field name="start">
                      {({ field }) => (
                        <Input {...field} type={"datetime-local"} />
                      )}
                    </Field>
                    <FormErrorMessage>{addOrderForm.errors.start}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={addOrderForm.errors.end && addOrderForm.touched.end}>
                    <FormLabel>Slut</FormLabel>
                    <Field name="end">
                      {({ field }) => (
                        <Input {...field} type={"datetime-local"} />
                      )}
                    </Field>
                    <FormErrorMessage>{addOrderForm.errors.end}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={addOrderForm.errors.allDay?.label}>
                    <FormLabel>Heldag</FormLabel>
                    <Select
                      placeholder="Tar arbetsorder en heldag?"
                      focusBorderColor={"brand.primary"}
                      selectedOptionColor={"brand"}
                      isInvalid={addOrderForm.errors.allDay?.label}
                      value={addOrderForm.values.allDay}
                      onChange={o => addOrderForm.setFieldValue("allDay", o)}
                      options={orderAllDayOptions}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Återkommande</FormLabel>
                    <Select
                      name="recurring"
                      placeholder="Är arbetsordern återkommande?"
                      focusBorderColor={"brand.primary"}
                      selectedOptionColor={"brand"}
                      value={addOrderForm.values.reccuring}
                      onChange={o => addOrderForm.setFieldValue("reccuring", o)}
                      options={orderReccurencyOptions}
                    />
                  </FormControl>

                  <FormControl isInvalid={addOrderForm.errors.customer?.label}>
                    <FormLabel>Kund</FormLabel>
                    <Select
                      placeholder="Välj kund för arbetsorder.."
                      focusBorderColor={"brand.primary"}
                      selectedOptionColor={"brand"}
                      onChange={o => addOrderForm.setFieldValue("customer", o)}
                      options={requiredFormData.customers.map(c => ({ label: c.Name, value: c.id }))}
                    />
                    <FormErrorMessage>{addOrderForm.errors.customer?.label}</FormErrorMessage>
                  </FormControl>

                  {/*<FormControl>
                    <FormLabel>Projekt</FormLabel>
                    <Field>
                      {({ field }) => (
                        <Input  placeholder="Coming soon" />
                      )}
                    </Field>
                    <FormErrorMessage>{addOrderForm.errors.title}</FormErrorMessage>
                  </FormControl>*/}

                  <FormControl>
                    <FormLabel>Anställda</FormLabel>
                    <Select
                      placeholder="Välj anställda för utförande.."
                      isMulti
                      focusBorderColor={"brand.primary"}
                      onChange={o => addOrderForm.setFieldValue("employees", o)}
                      options={requiredFormData.employees.map(e => ({ label: `${e?.firstname} ${e.lastname}`, value: e.id }))}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Teams</FormLabel>
                    <Select
                      placeholder="Välj team för utförande.."
                      isMulti
                      focusBorderColor={"brand.primary"}
                      onChange={o => addOrderForm.setFieldValue("teams", o)}
                      options={requiredFormData.teams.map(t => ({ label: t?.Name, value: t.id }))}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Färg</FormLabel>
                    <Field name="color">
                      {({ field }) => (
                        <Input {...field} type="color" />
                      )}
                    </Field>
                  </FormControl>
                  <FormControl isInvalid={addOrderForm.errors.notes && addOrderForm.touched.notes}>
                    <FormLabel>Anteckningar</FormLabel>
                    <Field name="notes">
                      {({ field }) => (
                        <Textarea {...field} placeholder="* Kod till dörr: 5050&#10;* Släpp inte ut Diesel & Reina" />
                      )}
                    </Field>
                    <FormErrorMessage>{addOrderForm.errors.notes}</FormErrorMessage>
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
    </>
  )
}

export default OrderAddForm