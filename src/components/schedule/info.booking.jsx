import {
  Box, Button, Flex, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, Textarea, Divider
} from '@chakra-ui/react';
import moment from 'moment';
import React from 'react'
import { HiOutlineCalendar, HiOutlineCollection, HiOutlineColorSwatch, HiOutlineMap, HiOutlineUserGroup, HiOutlineUsers, HiPencilAlt, HiTrash, HiX, HiClock } from 'react-icons/hi';
import NoteForm from '../notes/NoteForm';
function InfoBookingModal(props) {
  const { event, onOpen, onClose, isOpen, openDeleteModal, openEditModal, clickReport } = props;
  const timeReportColor = () => {
    if (event.extendedProps?.clockedin === undefined) {
      return "brand"
    }
    return "teal"
  };

  const isDisabled = () => {
    if (event.extendedProps?.clocked === null) {
      return "disabled"
    }
  }
  timeReportColor();
  return (
    <Modal scrollBehavior="inside" size="xl" isCentered={true} isOpen={isOpen} onClose={onClose} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{event?.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack direction={['column', 'row']} spacing="24px">
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
                    <Text key={employee?.id} as="span">{employee?.firstName} {employee?.lastName}, </Text>
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
              <Flex align="center">
                <HiOutlineColorSwatch size="22" />
                <Text>Tidrapportering</Text>
              </Flex>
              {(event.extendedProps?.clockedout === null) ?
                (event.extendedProps?.clockedin === null) ?
                  <Button onClick={clickReport} spacing="10px" leftIcon={<HiClock />} colorScheme={timeReportColor()} variant='solid'>
                    Start
                  </Button>
                  :
                  <Button onClick={clickReport} spacing="10px" leftIcon={<HiClock />} colorScheme={timeReportColor()} variant='solid'>
                    Stope
                  </Button>

                :
                <Button spacing="10px" isDisabled leftIcon={<HiClock />} colorScheme={timeReportColor()} variant='solid'>
                  Tidrapportering stängd
                </Button>

              }
            </Box>
          </Stack>
          <NoteForm bookingid={event?.id} />
        </ModalBody>
        <ModalFooter>

          <IconButton onClick={onClose} icon={<HiX />} />
        </ModalFooter>
      </ModalContent>
    </Modal >
  )
}

export default InfoBookingModal