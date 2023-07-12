import {
  Flex,
  Heading,
  Button,
  Box,
  useColorModeValue,
  SimpleGrid,
  Text,
  Stack,
  useDisclosure,
  Select,
  Center,
  FormControl,
  FormLabel,
  Input,
  IconButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import {
  HiArrowLeft,
  HiArrowRight,
  HiOutlineHome,
  HiOutlineOfficeBuilding,
  HiOutlinePhone,
  HiPlus,
} from "react-icons/hi";
import {} from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import { HiOutlineMail } from "react-icons/hi";
import CustomersAddForm from "../components/customers/customers.add.form";
import {
  Paginator,
  Previous,
  Next,
  PageGroup,
  usePaginator,
} from "chakra-paginator";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import * as API from "../api/api";

function Customers() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [pageSize, setPageSize] = useState(4);
  const { currentPage, setCurrentPage } = usePaginator({
    initialState: { currentPage: 1 },
  });

  const [searchFilter, setSearchFilter] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
  });

  const getCustomers = async () => {
    setIsLoading(true);
    const customersResponse = await API.getClients(searchFilter);
    setCustomers(customersResponse);
    setIsLoading(false);
  };

  const handlePageSizeChange = (number) => {
    setPageSize(number);
    setCurrentPage(1);
  };

  const handleFilterChange = (e) => {
    setCurrentPage(1);
    setSearchFilter({ ...searchFilter, [e.target.name]: e.target.value });
  };

  const clearFilter = () => {
    setSearchFilter({
      name: "",
      email: "",
      phone: "",
      business: "",
    });
  };

  useEffect(() => {
    getCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const baseStyles = {
    w: 10,
    fontSize: "md",
  };
  const activeStyles = {
    ...baseStyles,
    bg: "white",
  };

  return (
    <>
      <Flex direction="column" flex="1" overflow="auto" px="10" pt="8">
        <Flex align="center" justify="space-between">
          <Heading pt="2.5" size="lg" fontWeight="extrabold" mb="6">
            Kunder
          </Heading>
          <IconButton
            onClick={onOpen}
            mt="2.5"
            icon={<HiPlus />}
            mb="6"
            size="md"
          />
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
                          onChange={(e) => handleFilterChange(e)}
                          placeholder="Theresas Städ"
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input
                          name="email"
                          value={searchFilter.email}
                          onChange={(e) => handleFilterChange(e)}
                          placeholder="theresa@theresasstad.se"
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Telefon</FormLabel>
                        <Input
                          name="phone"
                          value={searchFilter.phone}
                          onChange={(e) => handleFilterChange(e)}
                          placeholder="+4631518949"
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Företag / Privatperson</FormLabel>
                        <Select
                          name="business"
                          value={searchFilter.business}
                          onChange={(e) => handleFilterChange(e)}
                        >
                          <option value="">Båda</option>
                          <option value="true">Företag</option>
                          <option value="false">Privatperson</option>
                        </Select>
                      </FormControl>
                      <Button
                        bg="brand.primary"
                        textColor="white"
                        onClick={() => {
                          getCustomers();
                        }}
                      >
                        Sök
                      </Button>
                      <Button onClick={clearFilter}>Rensa</Button>
                    </Stack>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              {/* Customers Grid */}
              <Box minHeight={"md"}>
                {isLoading ? (
                  <></>
                ) : (
                  <>
                    {customers.data.length < 1 && (
                      <Box colSpan="4">
                        <Center>
                          <Text>
                            Inga kunder hittades, testa ändra ditt filter eller
                            lägg till en ny kund.
                          </Text>
                        </Center>
                      </Box>
                    )}
                    <SimpleGrid columns={{ sm: "1", md: "4" }} gap="2">
                      {customers.data?.map((customer) => {
                        //console.log(customer);
                        return (
                          <Box
                            key={customer.id}
                            initial={{ opacity: 0.3 }}
                            animate={{ opacity: 1 }}
                            as={motion.div}
                            boxShadow="base"
                            bg="white"
                            rounded="xl"
                            p="4"
                          >
                            <Stack>
                              <Box>
                                <Text fontWeight="semibold" fontSize="xl">
                                  {customer.Name}
                                </Text>
                              </Box>
                              <Flex align="center">
                                <HiOutlineOfficeBuilding size="22" />
                                <Text ml="1.5" fontSize="md">
                                  {customer.Adress} {customer.PostCode}{" "}
                                  {customer.City}
                                </Text>
                              </Flex>
                              <Flex align="center">
                                <HiOutlineMail size="22" />
                                <Text ml="1.5" fontSize="md">
                                  {customer.Email}
                                </Text>
                              </Flex>
                              <Flex align="center">
                                <HiOutlinePhone size="22" />
                                <Text ml="1.5" fontSize="md">
                                  {customer.Phone}
                                </Text>
                              </Flex>
                              <Button
                                onClick={() =>
                                  navigate(`/customers/${customer.id}`)
                                }
                                size={"sm"}
                              >
                                Visa
                              </Button>
                            </Stack>
                          </Box>
                        );
                      })}
                    </SimpleGrid>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Flex>
      {/* Add customer form */}
      <CustomersAddForm
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        getCustomers={getCustomers}
      />
    </>
  );
}

export default Customers;
