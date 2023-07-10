import { Box, Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Textarea } from '@chakra-ui/react'
import { HiOutlineCalendar, HiOutlineCollection, HiOutlineColorSwatch, HiOutlineMap, HiOutlineUserGroup, HiOutlineUsers, HiPencilAlt, HiTrash, HiX } from 'react-icons/hi';
import React, { useState } from 'react'
import { useEffect } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import moment from 'moment';
import { Select } from 'chakra-react-select';
import { useFormik } from 'formik';

function EditBookingModal(props) {
  const { updateBooking, event, eventEdited, setEventEdited, onOpen, onClose, isOpen, handleClose } = props;
  const axiosPrivate = useAxiosPrivate();
  const [editBookingFormData, setEditBookingFormData] = useState({})

  const getEditBookingFormData = async () => {
    const responseEmployees = await axiosPrivate.get("/User")
    const responseTeams = await axiosPrivate.get("/Team")
    const responseCustomers = await axiosPrivate.get("/Customer?PageSize=10000000")

    setEditBookingFormData({ employees: responseEmployees.data.data, teams: responseTeams.data.data, customers: responseCustomers.data.data })
  }

  useEffect(() => {
    getEditBookingFormData();
  }, [])


  return (
    <Modal
      isCentered={true}
      scrollBehavior="inside"
      isOpen={isOpen}
      onClose={handleClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Ändra bokning</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack>
            <Flex align="center">
              <HiOutlineCalendar size="22" />
              <Input value={eventEdited.start} onChange={(e) => setEventEdited({...eventEdited, start: e.target.value})} ml="1.5" type={"datetime-local"} />
            </Flex>
            <Flex align="center">
              <HiOutlineCalendar size="22" />
              <Input value={eventEdited.end} onChange={(e) => setEventEdited({...eventEdited, end: e.target.value})} ml="1.5" type={"datetime-local"} />
            </Flex>
            <Flex align="center">
              <HiOutlineCollection size="22" />
              <Box ml="1.5" w="full">
                <Select
                  focusBorderColor={"brand.primary"}
                  selectedOptionColor={"brand"}
                  placeholder="Kund?"
                  value={eventEdited.customer}
                  onChange={(e) => setEventEdited({...eventEdited, customer: e})}
                  options={editBookingFormData?.customers?.map(c => ({ label: c?.name, value: c.id }))}
                />
              </Box>
            </Flex>
            <Flex align="center">
              <HiOutlineUsers size="22" />
              <Box ml="1.5" w="full">
                <Select
                  isMulti
                  focusBorderColor={"brand.primary"}
                  selectedOptionColor={"brand"}
                  value={eventEdited.users}
                  placeholder="Anställda?"
                  onChange={(e) => setEventEdited({...eventEdited, users: e})}
                  options={editBookingFormData?.employees?.map(u => ({ label: u.firstName + " " + u.lastName, value: u.id }))}
                />
              </Box>
            </Flex>
            <Flex align="center">
              <HiOutlineUserGroup size="22" />
              <Box ml="1.5" w="full">
                <Select
                  isMulti
                  focusBorderColor={"brand.primary"}
                  selectedOptionColor={"brand"}
                  placeholder="Teams?"
                  value={eventEdited.teams}
                  onChange={(e) => setEventEdited({...eventEdited, teams: e})}
                  options={editBookingFormData?.teams?.map(t => ({ label: t.name, value: t.id }))}
                />
              </Box>
            </Flex>
            <Flex align="center">
              <HiOutlineColorSwatch size="22" />
              <Input value={eventEdited?.color} onChange={(e) => setEventEdited({...eventEdited, color: e.target.value})} ml="1.5" type={"color"} />
            </Flex>
            <Textarea value={eventEdited?.notes} onChange={(e) => setEventEdited({...eventEdited, notes: e.target.value})}/>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={updateBooking} mr={3} colorScheme={"brand"}>
            Spara
          </Button>
          <Button onClick={handleClose} colorScheme={"red"}>
            Avbryt
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EditBookingModal