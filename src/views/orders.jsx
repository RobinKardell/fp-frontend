import {
  Flex,
  Heading,
  Button,
  Box,
  useColorModeValue,
  Text,
  Stack,
  Center,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  FormControl,
  FormLabel,
  Input,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Next,
  PageGroup,
  Paginator,
  Previous,
  usePaginator,
} from "chakra-paginator";
import "moment/locale/sv";
import React, { useState } from "react";
import { useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { HiArrowLeft, HiArrowRight, HiPlus } from "react-icons/hi";
import OrderCard from "../components/orders/OrderCard";
import orderReccurencyOptions from "../components/orders/orderReccurencyOptions";
import { Select } from "chakra-react-select";
import OrderAddForm from "../components/orders/orders.add.form";
import OrderDelete from "../components/orders/order.delete";
import * as API from "../api/api";
import OrderView from "../components/orders/orderview";
import { Link } from "react-router-dom";

function Orders() {
  const [isLoading, setIsLoading] = useState(true);
  const {
    isOpen: addIsOpen,
    onOpen: addOnOpen,
    onClose: addOnClose,
  } = useDisclosure();
  const [selectedOrder, setSelectedOrder] = useState({});
  const {
    isOpen: deleteIsOpen,
    onOpen: deleteOnOpen,
    onClose: deleteOnClose,
  } = useDisclosure();
  const [orders, setOrders] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [teams, setTeams] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [searchFilter, setSearchFilter] = useState({
    name: null,
    customer: null,
    teams: null,
    users: null,
    recurring: null,
  });

  const getOrders = async () => {
    setIsLoading(true);
    const ordersResponse = await API.getOrders(searchFilter);
    setOrders(ordersResponse);
    setIsLoading(false);
  };

  const baseStyles = {
    w: 10,
    fontSize: "md",
  };
  const activeStyles = {
    ...baseStyles,
    bg: "white",
  };

  const clearFilter = async () => {
    await setSearchFilter({
      name: "",
      customer: null,
      teams: null,
      users: null,
      recurring: null,
    });
    await getOrders();
  };

  const openDeleteModal = (order) => {
    setSelectedOrder(order);
    deleteOnOpen();
  };

  const deleteOrder = async () => {
    await API.deleteOrder(selectedOrder);
    await getOrders();
    deleteOnClose();
  };

  const getNeededFilterFormData = async () => {
    const responseEmployees = await API.getUsers();
    const responseTeams = await API.getTeams();
    const responseCustomers = await API.getClients();

    setEmployees(responseEmployees.users);
    setTeams(responseTeams.data);
    setCustomers(responseCustomers.data);
  };

  useEffect(() => {
    getNeededFilterFormData();
    getOrders();
  }, []);

  return (
    <>
      <Flex direction="column" flex="1" overflow="auto" px="10" pt="8">
        <Flex align="center" justify="space-between">
          <Heading pt="2.5" size="lg" fontWeight="extrabold" mb="6">
            Arbetsordrar
          </Heading>
          <Link to="/orders/new">
            <IconButton
              mt="2.5"
              icon={<HiPlus />}
              text="text"
              mb="6"
              size="md"
            />
          </Link>
        </Flex>
        <Flex>
          <Box
            flex="1"
            borderColor="gray.100"
            borderWidth="3px"
            borderStyle="solid"
            rounded="xl"
          >
            <Box as="section" mx="auto">
              {/* Filter */}
              <Accordion pb="6" allowToggle>
                <AccordionItem>
                  <AccordionButton bg="white">
                    <Box flex="1" textAlign="left">
                      <Text fontWeight="medium" fontSize="lg">
                        Filtrering
                      </Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel bg="whiteAlpha.800" pb={4}>
                    <Stack>
                      <FormControl>
                        <FormLabel>Namn</FormLabel>
                        <Input
                          name="name"
                          value={searchFilter.name}
                          onChange={(e) =>
                            setSearchFilter({
                              ...searchFilter,
                              name: e.target.value,
                            })
                          }
                          placeholder="Sök på namnet"
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Kund</FormLabel>
                        <Select
                          value={searchFilter.customer}
                          onChange={(e) =>
                            setSearchFilter({ ...searchFilter, customer: e })
                          }
                          menuPortalTarget={document.body}
                          menuPosition={"fixed"}
                          styles={{ zIndex: 1000 }}
                          name="customer"
                          focusBorderColor={"brand.primary"}
                          selectedOptionColor={"brand"}
                          size="md"
                          placeholder="Kund?"
                          options={customers.map((customer) => ({
                            label: customer.Name,
                            value: customer.id,
                          }))}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Återkommande / Engång</FormLabel>
                        <Select
                          value={searchFilter.recurring}
                          onChange={(e) =>
                            setSearchFilter({ ...searchFilter, recurring: e })
                          }
                          menuPortalTarget={document.body}
                          menuPosition={"fixed"}
                          styles={{ zIndex: 1000 }}
                          name="reccurency"
                          focusBorderColor={"brand.primary"}
                          selectedOptionColor={"brand"}
                          size="md"
                          placeholder="Återkommande?"
                          options={orderReccurencyOptions}
                        />
                      </FormControl>
                      <Button
                        bg="brand.primary"
                        textColor="white"
                        onClick={() => {
                          getOrders();
                        }}
                      >
                        sök
                      </Button>
                      <Button onClick={clearFilter}>Rensa</Button>
                    </Stack>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              {isLoading ? (
                <></>
              ) : (
                <>
                  {orders.data.length < 1 && (
                    <Box colSpan="4">
                      <Center>
                        <Text>
                          Inga arbetsordrar hittades, testa ändra ditt filter
                          eller lägg till en ny arbetsoder.
                        </Text>
                      </Center>
                    </Box>
                  )}

                  <Stack spacing={3}>
                    {orders.data?.map((order) => (
                      <OrderCard
                        openDeleteModal={openDeleteModal}
                        order={order}
                      />
                    ))}
                  </Stack>
                </>
              )}
            </Box>
          </Box>
        </Flex>
      </Flex>

      <OrderAddForm
        getOrders={getOrders}
        isOpen={addIsOpen}
        onOpen={addOnOpen}
        onClose={addOnClose}
      />
      <OrderDelete
        deleteOrder={deleteOrder}
        isOpen={deleteIsOpen}
        onClose={deleteOnClose}
        onOpen={deleteOnOpen}
      />
    </>
  );
}

export default Orders;
