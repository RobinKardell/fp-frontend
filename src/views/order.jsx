import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  StackDivider,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import FieldGroup from "../components/customer/FieldGroup";
import orderAllDayOptions from "../components/order/orderAllDayOptions";
import orderReccurencyOptions from "../components/order/orderReccurencyOptions";
import { Field, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { Select } from "chakra-react-select";
import OrderDelete from "../components/order/order.delete";

function Order() {
  const axiosPrivate = useAxiosPrivate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = useParams();
  const [requiredFormData, setRequiredFormData] = useState({
    customers: [],
    teams: [],
    employees: [],
  });
  const [order, setOrder] = useState({});

  const updateOrderForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: order?.id,
      title: order?.title,
      start: moment(order?.start).format("HH:MM"),
      end: moment(order?.end).add(1, "hours").format("HH:MM"),
      allDay: order?.allDay
        ? { label: "Ja", value: true }
        : { label: "Nej", value: false },
      reccuring: orderReccurencyOptions.find(
        (x) => x.value == order.recurrencyInterval?.id
      ),
      customer: { label: order?.customer?.name, value: order?.customer?.id },
      employees: order?.users?.map((u) => ({
        label: u.firstName + " " + u.lastName,
        value: u.id,
      })),
      teams: order?.teams?.map((t) => ({ label: t.name, value: t.id })),
      color: order?.color,
      notes: order?.notes,
    },

    validationSchema: Yup.object({
      title: Yup.string().required("Namn krävs."),
      start: Yup.string("Måste vara datum & tid.").required("Start tid krävs."),
      end: Yup.string()
        .required("Slut tid krävs.")
        .test(
          "is-greater",
          "Slut tid måste vara efter start tid",
          function (value) {
            const { start } = this.parent;
            return moment(value, "HH:mm").isSameOrAfter(moment(start, "HH:mm"));
          }
        ),
      notes: Yup.string(),
      customer: Yup.object().shape({
        label: Yup.string().required("Kund krävs"),
        value: Yup.number().required("Kund krävs"),
      }),
    }),

    onSubmit: async (values, actions) => {
      try {
        console.log(values);
      } catch (error) {
        console.log(error);
      } finally {
        actions.resetForm();
      }
    },
  });

  const init = async () => {
    const getRequiredFormData = async () => {
      const responseEmployees = await axiosPrivate.get("/User");
      const responseTeams = await axiosPrivate.get("/Team");
      const responseCustomers = await axiosPrivate.get(
        "/Customer?PageSize=10000000"
      );

      setRequiredFormData({
        customers: responseCustomers.data.data,
        teams: responseTeams.data.data,
        employees: responseEmployees.data.data,
      });
    };

    const getOrder = async () => {
      try {
        const response = await axiosPrivate.get(`Order/${id}`);
        setOrder({ ...response.data.data });
      } catch (error) {}
    };

    await getOrder();
    await getRequiredFormData();
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Flex direction="column" flex="1" overflow="auto" px="10" pt="8">
        <Flex align="center" justify="space-between">
          <Heading pt="2.5" size="lg" fontWeight="extrabold" mb="6">
            {order.title}
          </Heading>
        </Flex>
        <Box
          flex="1"
          borderColor="gray.100"
          borderWidth="3px"
          borderStyle="solid"
          rounded="xl"
        >
          <Box
            bg={useColorModeValue("gray.100", "gray.800")}
            px={{
              base: "6",
              md: "8",
            }}
            h="full"
            py="4"
          >
            <Box as="section" mx="auto">
              <Stack spacing="4" divider={<StackDivider />}>
                <FormikProvider value={updateOrderForm}>
                  <FieldGroup title={"Allmänt"}>
                    <FormControl
                      isInvalid={
                        updateOrderForm.errors.title &&
                        updateOrderForm.touched.title
                      }
                    >
                      <FormLabel>Namn</FormLabel>
                      <Field name="title">
                        {({ field }) => (
                          <Input {...field} placeholder="Städ hos Theresa" />
                        )}
                      </Field>
                      <FormErrorMessage>
                        {updateOrderForm.errors.title}
                      </FormErrorMessage>
                    </FormControl>
                  </FieldGroup>

                  <FieldGroup title={"Tid"}>
                    <Stack w="full">
                      <FormControl
                        isInvalid={
                          updateOrderForm.errors.start &&
                          updateOrderForm.touched.start
                        }
                      >
                        <FormLabel>Start</FormLabel>
                        <Field name="start">
                          {({ field }) => <Input {...field} type={"time"} />}
                        </Field>
                        <FormErrorMessage>
                          {updateOrderForm.errors.start}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isInvalid={
                          updateOrderForm.errors.end &&
                          updateOrderForm.touched.end
                        }
                      >
                        <FormLabel>Slut</FormLabel>
                        <Field name="end">
                          {({ field }) => <Input {...field} type={"time"} />}
                        </Field>
                        <FormErrorMessage>
                          {updateOrderForm.errors.end}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isInvalid={updateOrderForm.errors.allDay?.label}
                      >
                        <FormLabel>Heldag</FormLabel>
                        <Select
                          placeholder="Tar arbetsorder en heldag?"
                          focusBorderColor={"brand.primary"}
                          selectedOptionColor={"brand"}
                          isInvalid={updateOrderForm.errors.allDay?.label}
                          value={updateOrderForm.values.allDay}
                          onChange={(o) =>
                            updateOrderForm.setFieldValue("allDay", o)
                          }
                          options={orderAllDayOptions}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>Återkommande</FormLabel>
                        <Select
                          name="reccuring"
                          placeholder="Är arbetsordern återkommande?"
                          focusBorderColor={"brand.primary"}
                          selectedOptionColor={"brand"}
                          value={updateOrderForm.values.reccuring}
                          onChange={(o) =>
                            updateOrderForm.setFieldValue("reccuring", o)
                          }
                          options={orderReccurencyOptions}
                        />
                      </FormControl>
                    </Stack>
                  </FieldGroup>

                  <FieldGroup title={"Kund, Team & Anställda"}>
                    <Stack w="full">
                      <FormControl
                        isInvalid={updateOrderForm.errors.customer?.label}
                      >
                        <FormLabel>Kund</FormLabel>
                        <Select
                          placeholder="Välj kund för arbetsorder.."
                          focusBorderColor={"brand.primary"}
                          selectedOptionColor={"brand"}
                          value={updateOrderForm.values.customer}
                          onChange={(o) =>
                            updateOrderForm.setFieldValue("customer", o)
                          }
                          options={requiredFormData.customers.map((c) => ({
                            label: c.name,
                            value: c.id,
                          }))}
                        />
                        <FormErrorMessage>
                          {updateOrderForm.errors.customer?.label}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl>
                        <FormLabel>Anställda</FormLabel>
                        <Select
                          placeholder="Välj anställda för utförande.."
                          isMulti
                          focusBorderColor={"brand.primary"}
                          onChange={(o) =>
                            updateOrderForm.setFieldValue("employees", o)
                          }
                          value={updateOrderForm.values.employees}
                          options={requiredFormData.employees.map((e) => ({
                            label: `${e?.firstName} ${e.lastName}`,
                            value: e.id,
                          }))}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>Teams</FormLabel>
                        <Select
                          placeholder="Välj team för utförande.."
                          isMulti
                          focusBorderColor={"brand.primary"}
                          onChange={(o) =>
                            updateOrderForm.setFieldValue("teams", o)
                          }
                          value={updateOrderForm.values.teams}
                          options={requiredFormData.teams.map((t) => ({
                            label: t?.name,
                            value: t.id,
                          }))}
                        />
                      </FormControl>
                    </Stack>
                  </FieldGroup>

                  <FieldGroup title={"Övrigt"}>
                    <Stack w="full">
                      <FormControl
                        isInvalid={
                          updateOrderForm.errors.notes &&
                          updateOrderForm.touched.notes
                        }
                      >
                        <FormLabel>Anteckningar</FormLabel>
                        <Field name="notes">
                          {({ field }) => (
                            <Textarea
                              {...field}
                              placeholder="* Kod till dörr: 5050&#10;* Släpp inte ut Diesel & Reina"
                            />
                          )}
                        </Field>
                        <FormErrorMessage>
                          {updateOrderForm.errors.notes}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl>
                        <FormLabel>Färg</FormLabel>
                        <Field name="color">
                          {({ field }) => <Input {...field} type="color" />}
                        </Field>
                      </FormControl>
                    </Stack>
                  </FieldGroup>
                  <FieldGroup title={"Spara"}>
                    <Stack w="full">
                      <Button
                        onClick={updateOrderForm.handleSubmit}
                        w="full"
                        colorScheme="brand"
                      >
                        Spara ändringar
                      </Button>
                      <Text opacity={0.5} pt="1">
                        Notera att dessa ändringar bara tillämpas när det skapas
                        nya bokningar av denna arbetsordern.
                      </Text>
                    </Stack>
                  </FieldGroup>
                </FormikProvider>
                <FieldGroup title={"Ta bort"}>
                  <Button onClick={onOpen} w="full" colorScheme={"red"}>
                    Ta bort arbetsorder
                  </Button>
                </FieldGroup>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Flex>

      <OrderDelete id={id} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
}

export default Order;
