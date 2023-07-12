import * as API from "../api/api";
import {
  Tr,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalContent,
  ModalBody,
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
  Th,
  Td,
  Tbody,
  Thead,
} from "@chakra-ui/react";
import {
  Next,
  PageGroup,
  Paginator,
  Previous,
  usePaginator,
} from "chakra-paginator";
import "moment/locale/sv";
import React, { useState, useEffect } from "react";
import InspectionCard from "../components/inspection/inspectionCard";
function Inspections() {
  const [volym, setVolym] = useState(0);
  const [Eid, setEid] = useState(0);
  const {
    isOpen: addInspectionIsOpen,
    onOpen: addInspectionOnOpen,
    onClose: addInspectionOnClose,
  } = useDisclosure();
  const {
    isOpen: viewInspectionIsOpen,
    onOpen: viewInspectionOnOpen,
    onClose: viewInspectionOnClose,
  } = useDisclosure();

  const [inspections, setInspections] = useState();

  const getInspections = async () => {
    const response = await API.getInspectionList();
    setInspections(response.data);
  };

  console.log("Eid: ", Eid);
  console.log("inspections: ", inspections);

  useEffect(() => {
    getInspections();
  }, []);

  return (
    <>
      <Flex direction="column" flex="1" overflow="auto" px="10" pt="8">
        <Flex align="center" justify="space-between">
          <Heading pt="2.5" size="lg" fontWeight="extrabold" mb="6">
            Besikningslista
          </Heading>
          <Button onClick={addInspectionOnOpen}>Skapa besiktning</Button>
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
              <Table>
                <Thead>
                  <Th>Namn</Th>
                  <Th>Skapad</Th>
                  <Th>Skapare</Th>
                  <Th>Ändrad</Th>
                  <Th>Andrad av</Th>
                </Thead>
                <Tbody>
                  {inspections?.map((inspection) => (
                    <Tr>
                      <Td>
                        <Text
                          onClick={() => {
                            setEid(inspection.Id);
                            viewInspectionOnOpen();
                          }}
                        >
                          {inspection.Name}
                        </Text>
                      </Td>
                      <Td>{inspection.CreatedAt}</Td>
                      <Td>{inspection.CreatedBy}</Td>
                      <Td>{inspection.EditAt}</Td>
                      <Td>{inspection.EditBy}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Box>
        </Flex>
      </Flex>
      <Modal
        size={"full"}
        isOpen={addInspectionIsOpen}
        onClose={addInspectionOnClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Skapa en Besiktning</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InspectionCard
              getList={getInspections}
              close={addInspectionOnClose}
              create={true}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={viewInspectionIsOpen} onClose={viewInspectionOnClose}>
        <ModalOverlay />
        <ModalContent bgColor={"gray"} size={"full"}>
          <ModalHeader>Visa en Besiktning</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InspectionCard
              Eid={Eid}
              getList={getInspections}
              close={viewInspectionOnClose}
              edit={true}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Inspections;
