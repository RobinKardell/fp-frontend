import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

const HistoryTable = ({ isOpen, toggle, setHistoryData }) => {
  const [newHistoryData, setNewHistoryData] = useState({
    title: "",
    person: "",
    coWorker: "",
    summary: "",
    history: "",
    newHistory: "",
    currentDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHistoryData((prevContact) => ({ ...prevContact, [name]: value }));
  };

  const handleSaveHistoryData = () => {
    setHistoryData((prevData) => [
      ...prevData,
      { ...newHistoryData, id: prevData.length + 1 },
    ]);
    setNewHistoryData({
      title: "",
      person: "",
      coWorker: "",
      summary: "",
      history: "",
      newHistory: "",
      currentDate: "",
    });
    toggle();
  };

  return (
    <Modal onClose={toggle} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent bg="lightgray">
        <ModalHeader>Kontaktpersoner</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" flexDirection="column" gap={2} mx="auto">
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              w="auto"
              name="title"
              value={newHistoryData.title}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Person</FormLabel>
            <Input
              w="auto"
              name="person"
              value={newHistoryData.person}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Co Worker</FormLabel>
            <Input
              w="auto"
              name="coWorker"
              value={newHistoryData.coWorker}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Summary</FormLabel>
            <Input
              w="auto"
              name="summary"
              value={newHistoryData.summary}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>History</FormLabel>
            <Input
              w="auto"
              name="history"
              value={newHistoryData.history}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>New History</FormLabel>
            <Input
              w="auto"
              name="newHistory"
              value={newHistoryData.newHistory}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Current Date</FormLabel>
            <Input
              w="auto"
              name="currentDate"
              value={newHistoryData.currentDate}
              onChange={handleInputChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSaveHistoryData}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default HistoryTable;
