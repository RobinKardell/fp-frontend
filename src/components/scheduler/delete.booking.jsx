import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import React from 'react'

function DeleteBookingModal(props) {
  const { deleteBooking, event, onOpen, onClose, isOpen, handleClose } = props;
  return (
    <Modal
      isCentered={true}
      scrollBehavior="inside"
      isOpen={isOpen}
      onClose={handleClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Ta bort bokning</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Är du säker på att du vill ta bort bokningen ({event.title}) ?</Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={deleteBooking} mr={3} colorScheme={"brand"}>
            Ja
          </Button>
          <Button onClick={handleClose} colorScheme={"red"}>
            Avbryt
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DeleteBookingModal