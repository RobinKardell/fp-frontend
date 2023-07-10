import { Modal,ModalBody,ModalCloseButton,ModalContent,ModalOverlay,ModalHeader, Divider  } from "@chakra-ui/react";
import { eventTupleToStore } from "@fullcalendar/react";
import { useEffect } from "react";
import KundForm from "./KundForm";
function Placeinfo (props) {
    const { event, id, isOpen, onOpen, onClose } = props;
    console.log("event",event);


 return (
    <Modal scrollBehavior={"inside"} isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>{event.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            Skapad: {event.created}<br />
            Sammanfattad info om denna lager plats:<br />
            {event.description}
            <Divider spaceing={4} />
           <KundForm />
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
 )
}
export default Placeinfo;