import {
    Box, Button, Flex, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, Textarea, Divider
} from '@chakra-ui/react';
function BookingModal(props) {
    const { event, onOpen, onClose, isOpen } = props;
    return (
        <Modal scrollBehavior="inside" size="xl" isCentered={true} isOpen={isOpen} onClose={onClose} >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{event?.title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box>
                        <Flex align="center">
                            <Text ml="1.5">Kund: {event?.customer?.name}</Text>
                        </Flex>
                        {event?.users?.length > 0 && (<>
                            <Flex align="center">
                                <Text ml="1.5">Valda arbetare: {event?.users?.map(employee =>
                                    <Text key={employee?.id} as="span">{employee?.firstname} {employee?.lastname}, </Text>
                                )}</Text>
                            </Flex>
                        </>
                        )}
                        <Flex align="center">
                            <Text ml="1.5">Adress: {event?.customer?.location.streetAdress}, {event?.customer?.location.postalCode}, {event?.customer?.location.city}</Text>
                        </Flex>
                        <Flex align="center">
                            <Box ml="1.5" bg={event?.backgroundColor} height={5} width={5} rounded="full" />
                        </Flex>
                        <Textarea readOnly value={event?.notes} />
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal >
    )
}
export default BookingModal