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
  Card,
  Table,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
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
import * as API from "../api/api";
import OrderView from "../components/orders/orderview";
import { Link } from "react-router-dom";
import AddArtikelForm from "../components/settings/add.artikel.form";
import AddStuffForm from "../components/settings/add.stuff.form";

function Settings() {
  const {
    isOpen: deleteIsOpen,
    onOpen: deleteOnOpen,
    onClose: deleteOnClose,
  } = useDisclosure();
  const {
    isOpen: addArikelIsOpen,
    onOpen: addArikelOnOpen,
    onClose: addArikelOnClose,
  } = useDisclosure();
  const {
    isOpen: addStuffIsOpen,
    onOpen: addStuffOnOpen,
    onClose: addStuffOnClose,
  } = useDisclosure();
  const [products, setProducts] = useState();
  const [articels, setArticels] = useState();

  const getProducts = async () => {
    const response = await API.getThings();
    setProducts(response.things);
  };
  const getArticels = async () => {
    const response = await API.getArticels();
    setArticels(response.data);
  };
  useEffect(() => {
    getProducts();
    getArticels();
  }, []);

  return (
    <>
      <Flex direction="column" flex="1" overflow="auto" px="10" pt="8">
        <Flex align="center" justify="space-between">
          <Heading pt="2.5" size="lg" fontWeight="extrabold" mb="6">
            Inställningar
          </Heading>
        </Flex>
        <Flex>
          <Box
            flex="1"
            p={4}
            borderColor="gray.100"
            borderWidth="3px"
            borderStyle="solid"
            rounded="xl"
          >
            <Box as="section" mx="auto">
              <Box>
                <Heading>
                  Lägg till saker för besiktingslistan
                  <Button onClick={addStuffOnOpen}>lägg till saker</Button>
                </Heading>
                <Table>
                  <Thead>
                    <Th>Namn</Th>
                    <Th>Volym</Th>
                  </Thead>
                  <Tbody>
                    {products &&
                      products.map((product) => (
                        <Tr>
                          <Td>{product.name}</Td>
                          <Td>{product.volym} m3</Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </Box>
              <Box>
                <Heading>
                  Lägg till saker för ARIKLAR
                  <Button onClick={addArikelOnOpen}>lägg till arikle</Button>
                </Heading>
                <Table>
                  <Thead>
                    <Th>Namn</Th>
                    <Th>Arikelnr</Th>
                    <Th>Typ</Th>
                    <Th>Pris</Th>
                  </Thead>
                  <Tbody>
                    {articels &&
                      articels.map((articel, pi) => (
                        <Tr>
                          <Td>{articel.name}</Td>
                          <Td>{articel.artikelnr}</Td>
                          <Td>{articel.type}</Td>
                          <Td>{articel.price}</Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Flex>
      <AddArtikelForm
        getArticels={getArticels}
        isOpen={addArikelIsOpen}
        onOpen={addArikelOnOpen}
        onClose={addArikelOnClose}
      />
      <AddStuffForm
        getProducts={getProducts}
        isOpen={addStuffIsOpen}
        onOpen={addStuffOnOpen}
        onClose={addStuffOnClose}
      />
    </>
  );
}

export default Settings;
