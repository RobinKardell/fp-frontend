import { useMediaQuery, Flex, Box, useDisclosure, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, ModalCloseButton, Button, Stack, FormControl, Input, Select, FormLabel } from '@chakra-ui/react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState, useRef } from 'react';
import "../FullCalendarStyle.css"
import * as API from "../api/api";
import moment from 'moment';
import DeleteBookingModal from '../components/scheduler/delete.booking';
import InfoBookingModal from '../components/scheduler/info.booking';
import EditBookingModal from '../components/scheduler/edit.booking';
import CalendarNavigation from "../components/scheduler/calendar.navigation"

function Scheduler() {
  const [isMobile] = useMediaQuery("(max-width: 1068px)")
  const [isDesktop] = useMediaQuery("(min-width: 1069px)")
  const calendarRef = useRef();
  const { isOpen: infoModalIsOpen, onOpen: infoModalOnOpen, onClose: infoModalOnClose } = useDisclosure()
  const { isOpen: editModalIsOpen, onOpen: editModalOnOpen, onClose: editModalOnClose } = useDisclosure()
  const { isOpen: deleteModalIsOpen, onOpen: deleteModalOnOpen, onClose: deleteModalOnClose } = useDisclosure()
  const { isOpen: filterModalIsOpen, onOpen: filterModalOnOpen, onClose: filterModalOnClose } = useDisclosure()
  const [clickedEvent, setClickedEvent] = useState({});
  const [clickedEventEdit, setClickedEventEdit] = useState({})
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentView, setCurrentView] = useState("timeGridWeek");
  const [currentDate, setCurrentDate] = useState(moment().format("YYYY-MM-DD"));
  const [dateRangeInView, setDateRangeInView] = useState({ start: null, end: null });
  const [bookings, setBookings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [Remployees, setEmployees] = useState([]);
  const [Rteams, setTeams] = useState([]);
  const [Rcustomers, setCustomers] = useState([]);

  //Calendar Navigation
  const handleSetCurrentDate = (e) => { const newDate = moment(e.target.value).format("YYYY-MM-DD"); calendarRef.current.getApi().gotoDate(newDate); }
  const goToNext = () => { calendarRef.current.getApi().next(); }
  const goToPrev = () => { calendarRef.current.getApi().prev(); }

  useEffect(() => {
    calendarRef.current.getApi().changeView(currentView)
  }, [currentView])

  //Fetch the events for the current calendar view
  const fetchBookingsInView = async () => {
    console.log("Sök: " ,searchFilter);
    const response = await API.getBooking(searchFilter)
    setBookings(response.data);
    console.log(response.data)
  }

  useEffect(() => {
    //if (dateRangeInView.start && dateRangeInView.end) {
    fetchBookingsInView();
    
    getNeededFilterFormData();
    //}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRangeInView])
  const getNeededFilterFormData = async () => {
    const responseEmployees = await API.getUsers();
    const responseTeams = await API.getTeams();
    const responseCustomers = await API.getClients()

    setEmployees(responseEmployees.users)
    setTeams(responseTeams.data)
    setCustomers(responseCustomers.data)
  }

  //Handle event dragged around!
  const handleEventChange = async (changeInfo) => {
    //console.log(changeInfo);
    const updateMomentObject = {
      id: changeInfo.event.id,
      start: changeInfo.event.start ? new Date(changeInfo.event.start) : null,
      end: changeInfo.event.end ? new Date(changeInfo.event.end) : null,
      allDay: changeInfo.event.allDay,
    }
    //console.log("updte", updateMomentObject)
    try {
      await API.updateTimeBooking(updateMomentObject)
    } catch (err) {
      console.log(err)
    } finally {
      await fetchBookingsInView();
    }
  }

  //Event Click
  const handleEventClick = (clickInfo) => {setClickedEvent(clickInfo.event); infoModalOnOpen(); }

  /* Edit Booking */
  const openEditModal = () => {
    //console.log("update", clickedEvent);
    setClickedEventEdit({
      id: clickedEvent.id,
      start: moment(clickedEvent.start).format("YYYY-MM-DD[T]HH:mm:ss"),
      end: moment(clickedEvent.end).format("YYYY-MM-DD[T]HH:mm:ss"),
      color: clickedEvent.backgroundColor,
      customer: { label: clickedEvent.extendedProps.customer.name, value: clickedEvent.extendedProps.customer.id },
      users: clickedEvent.extendedProps.users.map(u => ({ label: u.firstname + " " + u.lastname, value: u.id })),
      teams: clickedEvent.extendedProps.team.map(t => ({ label: t.Name, value: t.id })),
      notes: clickedEvent.extendedProps.notes
    })
    infoModalOnClose();
    editModalOnOpen();
  }

  const closeEditModal = () => { editModalOnClose(); infoModalOnOpen(); setClickedEventEdit({}) }

  const updateBooking = async () => {

    const objectToPatch = {
      id: clickedEventEdit.id,
      start: new Date(clickedEventEdit.start),
      end: new Date(clickedEventEdit.end),
      color: clickedEventEdit.color,
      notes: clickedEventEdit.notes,
      userIds: clickedEventEdit.users?.map(u => u.value),
      teamIds: clickedEventEdit.teams?.map(t => t.value),
    }
    await API.updateBooking(objectToPatch)
    await fetchBookingsInView();
    editModalOnClose();
  }
  /* Edit Booking End */

  /* Delete Booking */
  const openDeleteModal = () => { infoModalOnClose(); deleteModalOnOpen(); }
  const closeDeleteModal = () => { deleteModalOnClose(); infoModalOnOpen(); }
  const deleteBooking = async () => { await API.deleteBooking(clickedEvent.id); await fetchBookingsInView(); deleteModalOnClose(); }
  /* Delete Booking End */


  /*filter*/
  const [searchFilter, setSearchFilter] = useState({
    name: "",
    customer: "",
    teams: "",
    users: "",
    business: "",
  })
  const handleFilterChange = (e) => {
    console.log("event ",e.target.name)
    setSearchFilter({ ...searchFilter, [e.target.name]: e.target.value })
  }

  const clearFilter = () => {
    setSearchFilter({
      name: "",
      customer: "",
      teams: "",
      users: "",
      business: "",
    })
    
  }
  return (
    <>
      <Flex direction="column" flex="1" overflow="auto" p="2">
        <Box flex="1" p="2" rounded="xl" h="full">
          <Box
            h="full"
            as="section"
            mx="auto"
          >
            <CalendarNavigation
              currentTitle={currentTitle}
              currentDate={currentDate}
              currentView={currentView}
              handleSetCurrentDate={handleSetCurrentDate}
              setCurrentView={setCurrentView}
              goToNext={goToNext}
              goToPrev={goToPrev}
              isDesktop={isDesktop}
              isMobile={isMobile}
              bookings={fetchBookingsInView}
              filter={filterModalOnOpen}
            />
            <Box h="full" bg={"gray.100"}>
              <FullCalendar
                initialDate={currentDate}
                height={"100%"}
                events={bookings}
                //displayEventStart={false}
                //displayEventEnd={true}
                ref={calendarRef}
                //timeZoneParam="UTC+1"
                locale={"sv"}
                editable={true}
                eventClick={handleEventClick}
                eventChange={handleEventChange}
                /*slotDuration={"00:30:00"}
                slotLabelFormat={{
                  hour: '2-digit',
                  minute: '2-digit',
                }}*/
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={currentView}
                firstDay={1}
                datesSet={(args) => {
                  //setDateRangeInView({ start: new Date(args.start), end: new Date(args.end) });
                  //setCurrentDate(moment(args.start).format("YYYY-MM-DD"))
                  setCurrentTitle(args.view.title)
                }}
                //allDayText={"Heldag"}
                headerToolbar={false}
                buttonText={{
                  today: "Idag",
                  month: "Månad",
                  week: "Vecka",
                  day: "Dag"
                }}
              />
            </Box>
          </Box>
        </Box>
      </Flex>

      <Modal isOpen={filterModalIsOpen} onClose={filterModalOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filtrera Bokningar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <FormControl>
                <FormLabel>Namn</FormLabel>
                {/*<Input name="name" value={searchFilter.name} onChange={(e) => handleFilterChange(e)} placeholder="Sök på namn på bokning" />*/}
                <Input name="name" value={searchFilter.name} onChange={(e) => setSearchFilter({ ...searchFilter, name: e.target.value })} />
              </FormControl>
              <FormControl>
                <FormLabel>Kund</FormLabel>
                <Select
                  value={searchFilter.customer}
                  onChange={(e) => handleFilterChange(e)}
                  menuPortalTarget={document.body}
                  menuPosition={'fixed'}
                  styles={{ zIndex: 1000 }}
                  name="customer"
                  focusBorderColor={"brand.primary"}
                  selectedOptionColor={"brand"}
                  size="md"

                  placeholder='Välj kund'
                  >
                  {Rcustomers.map(c => (
                      <option value={c.id}>{c.Name}</option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Teams</FormLabel>
                <Select
                  value={searchFilter.teams}
                  onChange={(e) => handleFilterChange(e)}
                  //onChange={(e) => {console.log(e);setSearchFilter({ ...searchFilter, teams: e })}}
                  isMulti
                  menuPortalTarget={document.body}
                  menuPosition={'fixed'}
                  styles={{ zIndex: 1000 }}
                  name="teams"
                  focusBorderColor={"brand.primary"}
                  selectedOptionColor={"brand"}
                  size="md"
                  placeholder='Välj team'
                >
                  {Rteams.map(team => (
                      <option value={team.id}>{team.Name}</option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Anställda</FormLabel>
                <Select
                  value={searchFilter.users}
                  onChange={(e) => handleFilterChange(e)}
                  isMulti
                  menuPortalTarget={document.body}
                  menuPosition={'fixed'}
                  styles={{ zIndex: 1000 }}
                  name="users"
                  focusBorderColor={"brand.primary"}
                  selectedOptionColor={"brand"}
                  size="md"
                  placeholder='Välj anställd'
                >
                  {Remployees.map(em => (
                      <option value={em.id}>{em.firstname + " " + em.lastname}</option>
                  ))}
                </Select>
              </FormControl>
              {/*<FormControl>
                <FormLabel>Företag / Privatperson</FormLabel>
                <Select name="business" value={searchFilter.business} onChange={(e) => handleFilterChange(e)} >
                  <option value="">Båda</option>
                  <option value="true">Företag</option>
                  <option value="false">Privatperson</option>
                </Select>
              </FormControl>*/}
              <Button bg="brand.primary" textColor="white" onClick={() => { fetchBookingsInView() }}>Sök</Button>
              <Button onClick={() => {console.log("rensa");clearFilter(); filterModalOnClose();}}>Rensa</Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Modals */}
      <InfoBookingModal
        event={clickedEvent}
        openDeleteModal={openDeleteModal}
        openEditModal={openEditModal}
        isOpen={infoModalIsOpen}
        onOpen={infoModalOnOpen}
        onClose={infoModalOnClose}
      />

      <EditBookingModal
        event={clickedEvent}
        eventEdited={clickedEventEdit}
        setEventEdited={setClickedEventEdit}
        updateBooking={updateBooking}
        handleClose={closeEditModal}
        isOpen={editModalIsOpen}
        onOpen={editModalOnOpen}
        onClose={editModalOnClose}
      />

      <DeleteBookingModal
        event={clickedEvent}
        deleteBooking={deleteBooking}
        handleClose={closeDeleteModal}
        isOpen={deleteModalIsOpen}
        onOpen={deleteModalOnOpen}
        onClose={deleteModalOnClose}
      />
      {/* Modals End */}

    </>
  )
}

export default Scheduler