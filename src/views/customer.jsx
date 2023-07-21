import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  StackDivider,
  TableContainer,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import CustomerDelete from "../components/customer/customer.delete";
import CustomerForm from "../components/customer/customer.form";
import CustomerLocationForm from "../components/customer/customer.form.location";
import CustomerNotesForm from "../components/customer/customer.form.notes";
import FieldGroup from "../components/customer/FieldGroup";
import * as API from "../api/api";
import { Select } from "@chakra-ui/react";
import Tasks from "../components/customer/customer.task";
import {
  AiFillStar,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { useTable } from "react-table";
import ContactPersonModal from "../components/customers/ContactPerson";
import HistoryTable from "../components/customers/HistoryTable";

function Customer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState({});
  const [fillPercentage, setFillPercentage] = useState(0);
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOpen, setIsOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const [tableData, setTableData] = useState([
    {
      id: 1,
      name: "John Doe",
      phone: "123456789",
      mobile: "258147369",
      email: "user@gmail.com",
    },
  ]);

  const [historyData, setHistoryData] = useState([
    {
      id: 1,
      title: "This is title",
      person: "Jan Jansson",
      coWorker: "Niclas Glysing",
      summary: "Har pratat med Jan som bad mig aterkomma i december",
      history: "This is a History",
      newHistory: "This is new History",
      currentDate: "21/07/2023",
    },
  ]);

  const onOpen = () => {
    setIsOpen(true);
  };
  const openHistoryModal = () => {
    setIsHistoryModalOpen(true);
  };

  const handleRemove = (id) => {
    setTableData((prevData) => prevData.filter((contact) => contact.id !== id));
  };

  const getCustomer = async () => {
    try {
      const response = await API.getClientInfo(id);
      setCustomer(response.data);
      //setCustomer({ ...response.data })
    } catch (error) {}
  };

  const handlePlusClick = () => {
    if (fillPercentage < 100) {
      // Increment the fill percentage by 20%
      setFillPercentage(Math.min(fillPercentage + 20, 100));
    }
  };

  const handleMinusClick = () => {
    if (fillPercentage > 0) {
      // Decrement the fill percentage by 20%
      setFillPercentage(Math.max(fillPercentage - 20, 0));
    }
  };

  useEffect(() => {
    getCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box p={10}>
        {/* Input Section */}
        <Box border="1px solid grey" p={10}>
          <Flex
            direction={{ base: "column", md: "column", lg: "row", xl: "row" }}
            justifyContent="space-between"
            alignItems={{
              base: "center",
              md: "stretch",
              lg: "stretch",
              xl: "stretch",
            }}
            gap={{
              base: "15px",
              md: "0px",
            }}
          >
            <Box>
              <Flex gap={10} direction={{ base: "column", xl: "row" }}>
                <FormControl>
                  <FormLabel>Namn</FormLabel>
                  <Input w="auto" />
                </FormControl>
                <FormControl>
                  <FormLabel>Kundnummer</FormLabel>
                  <Input w="auto" />
                </FormControl>
                <FormControl>
                  <FormLabel>Telefon</FormLabel>
                  <Input w="auto" />
                </FormControl>
                <FormControl>
                  <FormLabel>Fax</FormLabel>
                  <Input w="auto" />
                </FormControl>
              </Flex>
              <Flex gap={10} direction={{ base: "column", xl: "row" }}>
                <FormControl>
                  <FormLabel>Adress</FormLabel>
                  <Input w="auto" />
                </FormControl>
                <FormControl>
                  <FormLabel>Kundnr Fortnox</FormLabel>
                  <Input w="auto" />
                </FormControl>
                <FormControl>
                  <FormLabel>Mail</FormLabel>
                  <Input w="auto" />
                </FormControl>
                <FormControl>
                  <FormLabel>Hemsida</FormLabel>
                  <Input w="auto" />
                </FormControl>
              </Flex>
              <Flex gap={10} direction={{ base: "column", xl: "row" }}>
                <FormControl>
                  <FormLabel>Postadress</FormLabel>
                  <Input w="auto" />
                </FormControl>
                <FormControl>
                  <FormLabel>Betalning</FormLabel>
                  <Input w="auto" />
                </FormControl>
                <FormControl>
                  <FormLabel>Fakturamail</FormLabel>
                  <Input w="auto" />
                </FormControl>
                <FormControl>
                  <FormLabel>Kontaktperson</FormLabel>
                  <Input w="auto" />
                </FormControl>
              </Flex>
              <Flex gap={10} direction={{ base: "column", xl: "row" }}>
                <FormControl width="auto">
                  <FormLabel>Org./pers. nummer</FormLabel>
                  <Input w="auto" />
                </FormControl>
                <FormControl>
                  <FormLabel>Telefonnr. kontaktperson</FormLabel>
                  <Input w="auto" />
                </FormControl>
              </Flex>
            </Box>
            <Box>
              <Flex direction="row" gap={5} alignItems="center">
                <Box>
                  <Text>Dold</Text>
                  <Select placeholder="Nej">
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                </Box>
                <Box
                  sx={{
                    width: "35px",
                    height: "35px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      clipPath: `inset(0 ${100 - fillPercentage}% 0 0)`,
                    }}
                  >
                    <AiFillStar size={35} style={{ fill: "gold" }} />
                  </Box>
                  <AiFillStar size={35} style={{ fill: "white" }} />
                </Box>
                <Flex direction="column" gap={2}>
                  <Button bg="transparent" onClick={handlePlusClick}>
                    <AiOutlinePlusCircle />
                  </Button>
                  <Button bg="transparent" onClick={handleMinusClick}>
                    <AiOutlineMinusCircle />
                  </Button>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Box>
        {/* Contact Person Table */}
        <Box py={10}>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            direction={{ base: "column", md: "column", lg: "row", xl: "row" }}
          >
            <Box my={5}>
              <Text>Kontaktpersoner</Text>
              <Box
                sx={{
                  overflowX: "auto",
                  width: "80vw",
                }}
              >
                <Table
                  variant="simple"
                  size="sm"
                  borderWidth="1px"
                  borderColor="black"
                  backgroundColor="white"
                >
                  <Thead>
                    <Tr>
                      <Th>Kontaktpersoner</Th>
                      <Th>Telefon</Th>
                      <Th>Mobil</Th>
                      <Th>Mail</Th>
                      <Th>Remove</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {tableData.length === 0 ? (
                      <Flex
                        justifyContent="center"
                        alignItems="center"
                        height="50px"
                      >
                        <Tr colSpan={5}>There is no data</Tr>
                      </Flex>
                    ) : (
                      tableData.map((contact) => (
                        <Tr key={contact.id}>
                          <Td>{contact.name}</Td>
                          <Td>{contact.phone}</Td>
                          <Td>{contact.mobile}</Td>
                          <Td>{contact.email}</Td>
                          <Td>
                            <Button onClick={() => handleRemove(contact.id)}>
                              Ta bort
                            </Button>
                          </Td>
                        </Tr>
                      ))
                    )}
                  </Tbody>
                </Table>
              </Box>
              <Box my={2}>
                <Button onClick={onOpen}>Ny</Button>
              </Box>
            </Box>
            <Flex
              direction={{
                base: "row",
                md: "column",
                lg: "column",
                xl: "column",
              }}
              gap={10}
            >
              <Button>Skapa order</Button>
              <Button>Skapa offert</Button>
            </Flex>
          </Flex>
        </Box>
        <ContactPersonModal
          toggle={() => {
            setIsOpen(!isOpen);
          }}
          tableData={tableData}
          setTableData={setTableData}
          isOpen={isOpen}
        />
        {/* Prices Table */}
        <Box>
          <Flex
            alignItems="center"
            direction={{ base: "column", md: "column", lg: "row", xl: "row" }}
          >
            <Box>
              <Text>Priser</Text>
              <Box
                sx={{
                  overflowX: "auto",
                }}
              >
                <Box
                  sx={{
                    overflowX: "auto",
                    width: "80vw",
                  }}
                >
                  <Table
                    maxWidth="100%"
                    size="sm"
                    borderWidth="1px"
                    borderColor="black"
                    backgroundColor="white"
                  >
                    <Thead>
                      <Tr>
                        <Th>Uppdaterad</Th>
                        <Th>Alias</Th>
                        <Th>Tjanst</Th>
                        <Th>Pris</Th>
                        <Th>Enhet</Th>
                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>2014-08-01</Td>
                        <Td>CH</Td>
                        <Td>Chauffor</Td>
                        <Td>520</Td>
                        <Td>Tim</Td>
                        <Td></Td>
                      </Tr>
                      <Tr>
                        <Td>2014-08-01</Td>
                        <Td>CH</Td>
                        <Td>Chauffor</Td>
                        <Td>520</Td>
                        <Td>Tim</Td>
                        <Td></Td>
                      </Tr>
                      <Tr>
                        <Td>2014-08-01</Td>
                        <Td>CH</Td>
                        <Td>Chauffor</Td>
                        <Td>520</Td>
                        <Td>Tim</Td>
                        <Td></Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </Box>
              </Box>
            </Box>
          </Flex>
        </Box>
        {/* Dropdown and Button */}
        <Box my={5}>
          <Flex
            gap={10}
            alignItems={{
              base: "center",
              md: "flex-end",
              lg: "flex-end",
              xl: "flex-end",
            }}
            direction={{ base: "column", md: "column", lg: "row", xl: "row" }}
          >
            <Box>
              <Text>Valj prislista</Text>
              <Select
                placeholder="2022"
                styles={{
                  control: {
                    backgroundColor: "white",
                  },
                }}
              >
                <option value="option1">Option 1</option>
              </Select>
            </Box>
            <Box>
              <Text>Rabatt %</Text>
              <Input />
            </Box>
            <Button>Ny prislista</Button>
            <Button>Ta bort</Button>
          </Flex>
        </Box>
        {/* Checkbox Section */}
        <Box borderBottom="1px solid grey">
          <Text>Typ av uppdrag:</Text>
          <Flex
            gap={5}
            my={2}
            direction={{ base: "column", md: "column", lg: "row", xl: "row" }}
            alignItems={{
              base: "center",
              md: "stretch",
              lg: "stretch",
              xl: "stretch",
            }}
          >
            <Checkbox>Bohag</Checkbox>
            <Checkbox>Evakuering</Checkbox>
            <Checkbox>kontors flytt</Checkbox>
            <Checkbox>Transport</Checkbox>
            <Checkbox>Uthyrning personal</Checkbox>
          </Flex>
        </Box>
        {/* To Go Inputs */}
        <Box my={3} borderBottom="1px solid grey">
          <Text>Att Gora</Text>
          <Flex
            gap={1}
            direction={{ base: "column", md: "column", lg: "row", xl: "row" }}
          >
            <FormControl>
              <FormLabel>Beskrivning</FormLabel>
              <Input />
            </FormControl>
            <FormControl>
              <FormLabel>Datum</FormLabel>
              <Input />
            </FormControl>
            <FormControl>
              <FormLabel>Tid</FormLabel>
              <Input />
            </FormControl>
            <FormControl>
              <FormLabel>Person</FormLabel>
              <Input />
            </FormControl>
            <FormControl>
              <FormLabel>Medarbetare</FormLabel>
              <Input />
            </FormControl>
          </Flex>
          <Box my={2}>
            <Button>Ta bort</Button>
          </Box>
        </Box>
        {/* Historik Table */}
        <Box borderBottom="1px solid grey">
          <Text>Historik</Text>
          {historyData.map((history) => {
            return (
              <Box p={2} bg="white" border="1px solid grey" key={history.id}>
                <Flex
                  justifyContent="space-between"
                  direction={{
                    base: "column",
                    md: "column",
                    lg: "row",
                    xl: "row",
                  }}
                  gap={{
                    base: "15px",
                    md: "0px",
                  }}
                >
                  <Box>
                    <Text>
                      <b>Pratat med</b> - {history.person}
                    </Text>
                    <Text>{history.summary}</Text>
                  </Box>
                  <Box
                    sx={{
                      opacity: 0.5,
                    }}
                  >
                    <Text>{history.coWorker}</Text>
                    <Text>{history.currentDate}</Text>
                  </Box>
                </Flex>
              </Box>
            );
          })}
          <Box my={2}>
            <Button onClick={openHistoryModal}>Skapa ny histonik</Button>
          </Box>
        </Box>
        <HistoryTable
          toggle={() => {
            setIsHistoryModalOpen(!isHistoryModalOpen);
          }}
          historyData={historyData}
          setHistoryData={setHistoryData}
          isOpen={isHistoryModalOpen}
        />

        {/* Dokument Table */}
        <Box my={3} borderBottom="1px solid grey">
          <Text>Dokument</Text>
          <Box
            sx={{
              overflowX: "auto",
              width: "80vw",
            }}
          >
            <Table
              maxWidth="100%"
              size="sm"
              borderWidth="1px"
              borderColor="black"
              backgroundColor="white"
              overflowX={{ base: "auto", lg: "initial" }}
            >
              <Thead>
                <Tr>
                  <Th>Datum</Th>
                  <Th>Ref.</Th>
                  <Th>Dokument</Th>
                  <Th>kommentar</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
                <Tr>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
                <Tr>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
                <Tr>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
          <Box my={2}>
            <Button>Bifoga ny fil</Button>
          </Box>
        </Box>
        {/* Uppdrag Table */}
        <Box>
          <Text>Uppdrag</Text>
          <Box
            sx={{
              overflowX: "auto",
              width: "80vw",
            }}
          >
            <Table
              maxWidth="100%"
              size="sm"
              borderWidth="1px"
              borderColor="black"
              backgroundColor="white"
            >
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>Datum</Th>
                  <Th>Kategori</Th>
                  <Th>Uppdrag</Th>
                  <Th></Th>
                  <Th></Th>
                  <Th></Th>
                  <Th>Ovrigt</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
                <Tr>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
                <Tr>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
                <Tr>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
                <Tr>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
                <Tr>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Customer;
