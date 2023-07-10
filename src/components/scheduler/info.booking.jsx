import { Box, Button, Flex, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, Textarea } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import moment from 'moment';
import React from 'react'
import { HiOutlineCalendar, HiOutlineCollection, HiOutlineColorSwatch, HiOutlineMap, HiOutlineUserGroup, HiOutlineUsers, HiPencilAlt, HiTrash, HiX } from 'react-icons/hi';
import NoteForm from '../notes/NoteForm';

function InfoBookingModal(props) {
  const { event, onOpen, onClose, isOpen, openDeleteModal, openEditModal } = props;
  return (
    <Modal scrollBehavior="inside" isCentered={true} isOpen={isOpen} onClose={onClose} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{event?.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack direction={['column', 'row']}>
          <Box>
            <Flex align="center">
              <HiOutlineCalendar size="22" />
              <Text style={{ textTransform: "capitalize" }} ml="1.5">{moment(event?.start).format("lll")}</Text>
            </Flex>
            <Flex align="center">
              <HiOutlineCalendar size="22" />
              <Text style={{ textTransform: "capitalize" }} ml="1.5">{moment(event?.end).format("lll")}</Text>
            </Flex>
            <Flex align="center">
              <HiOutlineCollection size="22" />
              <Text ml="1.5">{event?.extendedProps?.customer?.name}</Text>
            </Flex>
            {event?.extendedProps?.users?.length > 0 && (
              <Flex align="center">
                <HiOutlineUsers size="22" />
                <Text ml="1.5">{event?.extendedProps?.users?.map(employee =>
                  <Text key={employee?.id} as="span">{employee?.firstname} {employee?.lastname}, </Text>
                )}</Text>
              </Flex>
            )}
            {event?.extendedProps?.teams?.length > 0 && (
              <Flex align="center">
                <HiOutlineUserGroup size="22" />
                <Text ml="1.5">{event?.extendedProps?.teams.map(team =>
                  <Text key={team?.id} as="span">{team?.name}, </Text>
                )}</Text>
              </Flex>
            )}
            <Flex align="center">
              <HiOutlineMap size="22" />
              <Text ml="1.5">{event?.extendedProps?.customer?.location.streetAdress}, {event?.extendedProps?.customer?.location.postalCode}, {event?.extendedProps?.customer?.location.city}</Text>
            </Flex>
            <Flex align="center">
              <HiOutlineColorSwatch size="22" />
              <Box ml="1.5" bg={event?.backgroundColor} height={5} width={5} rounded="full" />
            </Flex>
            <Textarea readOnly value={event?.extendedProps?.notes} />
           

            </Box>
            <Box>
            </Box>
          </Stack>
          <NoteForm bookingid={event?.id} />
        </ModalBody>
        <ModalFooter>
          <Button onClick={openDeleteModal} colorScheme='red' mr="2">Ta Bort</Button>
          <Button onClick={openEditModal} mr="2">Ändra</Button>
          <IconButton onClick={onClose} icon={<HiX />} />
        </ModalFooter>
      </ModalContent>
    </Modal >
  )
}

export default InfoBookingModal