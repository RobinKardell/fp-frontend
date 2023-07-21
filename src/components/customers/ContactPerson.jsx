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

const ContactPersonModal = ({ isOpen, toggle, setTableData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact((prevContact) => ({ ...prevContact, [name]: value }));
  };
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    mobile: "",
    email: "",
  });

  const handleSave = () => {
    setTableData((prevData) => [
      ...prevData,
      { ...newContact, id: prevData.length + 1 },
    ]);
    setNewContact({
      name: "",
      phone: "",
      mobile: "",
      email: "",
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
            <FormLabel>Kontaktpersoner</FormLabel>
            <Input
              w="auto"
              name="name"
              value={newContact.name}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Telefon</FormLabel>
            <Input
              w="auto"
              name="phone"
              value={newContact.phone}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Mobil</FormLabel>
            <Input
              w="auto"
              name="mobile"
              value={newContact.mobile}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Mail</FormLabel>
            <Input
              w="auto"
              name="email"
              value={newContact.email}
              onChange={handleInputChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSave}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ContactPersonModal;
