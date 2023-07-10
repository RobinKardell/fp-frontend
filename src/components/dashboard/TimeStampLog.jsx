import { Modal,ModalOverlay, ModalHeader,ModalBody,ModalContent, ModalCloseButton, Divider,Button } from "@chakra-ui/react";
function TimeStampLog(props){
    const { isOpen, onOpen, onClose } = props;
    return (
        <Modal scrollBehavior={"inside"} isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>StämpelKlocka</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                Här loggar du din arbetstid:
                <Button>Stämpla in/ut</Button>
                <Button>Stämpla Lunch 30min</Button>

            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    );
}
export default TimeStampLog;