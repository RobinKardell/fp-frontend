import { useMediaQuery, Flex, Box, useDisclosure } from '@chakra-ui/react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState, useRef } from 'react';
import "../FullCalendarStyle.css"
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import moment from 'moment';
import DeleteBookingModal from '../components/schedule/delete.booking';
import InfoBookingModal from '../components/schedule/info.booking';
import EditBookingModal from '../components/schedule/edit.booking';
import CalendarNavigation from "../components/schedule/calendar.navigation"
import * as API from "../api/api";

function Schedule() {
  const [isMobile] = useMediaQuery("(max-width: 1068px)")
  const [isDesktop] = useMediaQuery("(min-width: 1069px)")
  const calendarRef = useRef();
  const { isOpen: infoModalIsOpen, onOpen: infoModalOnOpen, onClose: infoModalOnClose } = useDisclosure()
  const { isOpen: editModalIsOpen, onOpen: editModalOnOpen, onClose: editModalOnClose } = useDisclosure()
  const { isOpen: deleteModalIsOpen, onOpen: deleteModalOnOpen, onClose: deleteModalOnClose } = useDisclosure()
  const [clickedEvent, setClickedEvent] = useState({});
  const [clickedEventEdit, setClickedEventEdit] = useState({})
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentView, setCurrentView] = useState("timeGridDay");
  const [currentDate, setCurrentDate] = useState(moment().format("YYYY-MM-DD"));
  const [dateRangeInView, setDateRangeInView] = useState({ start: null, end: null });
  const [bookings, setBookings] = useState([]);

  //Calendar Navigation
  const handleSetCurrentDate = (e) => { const newDate = moment(e.target.value).format("YYYY-MM-DD"); calendarRef.current.getApi().gotoDate(newDate); }
  const goToNext = () => { calendarRef.current.getApi().next(); }
  const goToPrev = () => { calendarRef.current.getApi().prev(); }

  useEffect(() => {
    calendarRef.current.getApi().changeView(currentView)
  }, [currentView])

  //Fetch the events for the current calendar view
  const fetchBookingsInView = async () => {
    const response = await API.getBookingSelf()
    setBookings(response.data)
  }

  useEffect(() => {
    if (dateRangeInView.start && dateRangeInView.end) {
      fetchBookingsInView();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRangeInView])

  //Event Click
  const handleEventClick = (clickInfo) => { setClickedEvent(clickInfo.event); infoModalOnOpen(); }

  /* Edit Booking */
  const openEditModal = () => {
    setClickedEventEdit({
      id: clickedEvent.id,
      start: moment(clickedEvent.start).format("YYYY-MM-DD[T]HH:mm:ss"),
      end: moment(clickedEvent.end).format("YYYY-MM-DD[T]HH:mm:ss"),
      color: clickedEvent.backgroundColor,
      customer: {label: clickedEvent.extendedProps.customer.name, value: clickedEvent.extendedProps.customer.id},
      users: clickedEvent.extendedProps.users.map(u => ({label: u.firstName + " " + u.lastName, value: u.id})),
      teams: clickedEvent.extendedProps.teams.map(t => ({label: t.name, value: t.id})),
      notes: clickedEvent.extendedProps.notes,
      clockedin: clickedEvent.clockedin,
      clockedout: clickedEvent.clockedout,
    })
    infoModalOnClose();
    editModalOnOpen();
  }
  
  const closeEditModal = () => { editModalOnClose(); infoModalOnOpen(); setClickedEventEdit({}) }

  const timeReport = async () => {
    const times = {
      id: clickedEvent.id,
      in: (clickedEvent.extendedProps.clockedin === null)?new Date(Date.now()):clickedEvent.extendedProps.clockedin,
      out: (clickedEvent.extendedProps.clockedout === null)?new Date(Date.now()):clickedEvent.extendedProps.clockedout
    }
      //console.log('timereoport ', clickedEvent.extendedProps.clockedout);
      await API.logTime(times);
      await fetchBookingsInView();
      infoModalOnClose();
  }


  const updateBooking = async () => {
    const objectToPatch = {
      id: clickedEventEdit.id,
      start: new Date(clickedEventEdit.start).toISOString(),
      end: new Date(clickedEventEdit.end).toISOString(),
      color: clickedEventEdit.color,
      notes: clickedEventEdit.notes,
      customerId: clickedEventEdit.customer.value,
      userIds: clickedEventEdit.users.map(u => u.value),
      teamIds: clickedEventEdit.teams.map(t => t.value),
    }
    //await axiosPrivate.put("/Booking", objectToPatch)
    await fetchBookingsInView();
    editModalOnClose(); 
  }
  /* Edit Booking End */

  /* Delete Booking */
  const openDeleteModal = () => { infoModalOnClose(); deleteModalOnOpen(); }
  const closeDeleteModal = () => { deleteModalOnClose(); infoModalOnOpen(); }
  //const deleteBooking = async () => { await axiosPrivate.delete(`/Booking/${clickedEvent.id}`); await fetchBookingsInView(); deleteModalOnClose(); }
  /* Delete Booking End */

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

            />
            <Box h="full" bg={"gray.100"}>
              <FullCalendar
                initialDate={currentDate}
                height={"100%"}
                events={bookings}
                displayEventEnd={true}
                defaultTimedEventDuration={"01:00"}
                forceEventDuration={true}
                //nextDayThreshold={"21:00:00"}
                ref={calendarRef}
                timeZoneParam="UTC"
                locale={"sv"}
                editable={false}
                eventClick={handleEventClick}
                //slotMinTime={"05:00"}
                //slotMaxTime={"21:00"}
                slotDuration={"00:30:00"}
                slotLabelFormat={{
                  hour: '2-digit',
                  minute: '2-digit',
                }}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={currentView}
                firstDay={1}
                datesSet={(args) => {
                  setDateRangeInView({ start: new Date(args.start).toISOString(), end: new Date(args.end).toISOString() });
                  setCurrentDate(moment(args.start).format("YYYY-MM-DD"))
                  setCurrentTitle(args.view.title)
                }}
                allDayText={"Heldag"}
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
      
      {/* Modals */}
      <InfoBookingModal
        event={clickedEvent}
        openDeleteModal={openDeleteModal}
        openEditModal={openEditModal}
        isOpen={infoModalIsOpen}
        onOpen={infoModalOnOpen}
        onClose={infoModalOnClose}
        clickReport={timeReport}
      />
      {/* Modals End */}
    </>
  )
}

export default Schedule