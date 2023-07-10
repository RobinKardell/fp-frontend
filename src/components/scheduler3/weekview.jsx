import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { DndProvider, DragSource, DropTarget, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from "react-dnd-html5-backend";
import { Stack, Flex, Box, SimpleGrid, Grid, Button, Input, Heading, Text, GridItem, Table, Tr, Td, useDisclosure, Checkbox, Th, Tbody, Thead } from '@chakra-ui/react';
import * as API from "../../api/api";
import BookingModal from './booking.modal';
import InfoBoxPlan from './InfoBoxPlan';


const dataDragType = 'data';

function getDayName(dateStr) {
    var date = new Date(dateStr);
    return capitalizeFirstLetter(date.toLocaleDateString("sv", { weekday: 'long' }));
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const Day = ({ bookings, setDate, handleEventClick, selectedDay, date }) => {
    const [dayData, setDayData] = useState(bookings);
    const [boxValue, setBoxValue] = useState("");

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem(date));
        if (savedData) {
            setDayData(savedData);
        }
    }, [date]);


    const [{ isOver }, dropRef] = useDrop({
        accept: dataDragType,
        drop: (item, monitor) => {
            setDayData([...dayData, item.data]);
            localStorage.setItem(date, JSON.stringify([...dayData, item.data]));
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    const addBox = () => {
        if (boxValue) {
            setDayData([...dayData, boxValue]);
            localStorage.setItem(date, JSON.stringify([...dayData, boxValue]));
            setBoxValue("");
        }
    };
    return (

        <Box bg={'white'} ref={dropRef} >
            {selectedDay === date ?
                <Text fontSize={"18px"} bgColor={'orange'} textAlign={"center"} onClick={() => { setDate(date) }}> {getDayName(date)} {date}</Text>
                :
                <Text fontSize={"18px"} bgColor={'lightgreen'} textAlign={"center"} onClick={() => { setDate(date) }}> {getDayName(date)} {date}</Text>
            }
            <Box height={"100vh"} overflow="auto">
                {bookings && bookings.map((data) => (
                    <>
                        <Box bgColor={"lightblue"} rounded={'sm'} onClick={() => handleEventClick(data)} m={1} p={1} border='1px' borderColor='black.200' >
                            <Text fontWeight={"bold"} letterSpacing={1} >{data.title}</Text>
                            Kund: {data.customer.name}<br />
                            <strong>Anställda:</strong><br/>
                            {data.users.map((user) => (<>{user.firstname}, </>))}<br/>
                            <strong>Fordon:</strong><br/>
                            ABC123 lLastbil
                        </Box>
                    </>
                ))}
            </Box>
        </Box>
    );
};

const WeekView = () => {
    const [workers, setWorkers] = useState([]);
    const [viewDate, setViewDate] = useState();
    const [bookings, setBookings] = useState([]);
    const { isOpen: infoModalIsOpen, onOpen: infoModalOnOpen, onClose: infoModalOnClose } = useDisclosure()
    const [clickedEvent, setClickedEvent] = useState({});
    const [clickedEventEdit, setClickedEventEdit] = useState({})
    //Event Click
    const handleEventClick = (clickInfo) => { setClickedEvent(clickInfo); infoModalOnOpen(); }

    //Fetch the events for the current calendar view
    const [searchFilter, setSearchFilter] = useState({
        name: null,
        customer: null,
        teams: null,
        users: null,
        recurring: null,
    })
    const fetchBookingsInView = async () => {
        const response = await API.getBooking(searchFilter)
        setBookings(response.data);
    }
    const getEmployees = async () => {
        try {
            const response = await API.getUsers();
            setWorkers(response.users)
        } catch (error) {
            console.log(error)
        }
    }
    /*useEffect(() => {
        fetchBookingsInView();
    });*/
    useEffect(() => {
        fetchBookingsInView();
        getEmployees();
    }, [searchFilter]);
    const [currentWeek, setCurrentWeek] = useState(moment());

    const previousWeek = () => {
        setCurrentWeek(currentWeek.clone().subtract(1, 'week'));
    }

    const nextWeek = () => {
        setCurrentWeek(currentWeek.clone().add(1, 'week'));
    }

    const renderDays = () => {
        const startOfWeek = currentWeek.clone().startOf('week');
        const endOfWeek = currentWeek.clone().endOf('week');
        const days = [];

        for (let day = startOfWeek; day <= endOfWeek; day = day.clone().add(1, 'day')) {
            const dayBookings = bookings.filter(booking => moment(booking.start).isSame(day, 'day'));
            const backgroundColor = days.length % 2 === 0 ? 'lightgray' : 'lightgray'; // alternate background color

            days.push(
                <Box p={2} key={day.format('YYYY-MM-DD')} style={{ backgroundColor }}>
                    <Day bookings={dayBookings} handleEventClick={handleEventClick} setDate={setViewDate} selectedDay={viewDate} date={day.format('YYYY-MM-DD')} />
                </Box>
            );
        }

        return days;
    }
    
    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <div>
                    <Button onClick={previousWeek}>Föregående Vecka</Button>
                    <Button onClick={nextWeek}>Nästa Vecka</Button>
                </div>
                <Grid spacing={2}
                    templateColumns='repeat(4, 1fr)'
                    gap={3}
                >

                    <GridItem colSpan={3} ><SimpleGrid columns={7}>

                        {renderDays()}
                    </SimpleGrid>
                    </GridItem>
                    <GridItem colSpan={1} ><Text fontWeight={"bold"} fontSize={'x-large'}>Vald Dag: {viewDate}</Text>
                        <Box mb={2}>
                            <Table bgColor={'white'} padding={"2px"} fontWeight={'semibold'}>
                                <Thead>
                                    <Tr>
                                        <Td>Dag</Td>
                                        <Td>Bil</Td>
                                        <Td>l-bil</Td>
                                        <Td>Man</Td>
                                        <Td>Mtrl</Td>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td>Måndag</Td>
                                        <Td>0</Td>
                                        <Td>0</Td>
                                        <Td>0</Td>
                                        <Td>0</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Tisdag</Td>
                                        <Td>0</Td>
                                        <Td>0</Td>
                                        <Td>0</Td>
                                        <Td>0</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Onsdag</Td>
                                        <Td>0</Td>
                                        <Td>0</Td>
                                        <Td>0</Td>
                                        <Td>0</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Torsdag</Td>
                                        <Td>0</Td>
                                        <Td>0</Td>
                                        <Td>0</Td>
                                        <Td>0</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Fredag</Td>
                                        <Td>0</Td>
                                        <Td>0</Td>
                                        <Td>0</Td>
                                        <Td>0</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Lördag</Td>
                                        <Td>0</Td>
                                        <Td>0</Td>
                                        <Td>0</Td>
                                        <Td>0</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Söndag</Td>
                                        <Td>0</Td>
                                        <Td>0</Td>
                                        <Td>0</Td>
                                        <Td>0</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Totalt</Td>
                                        <Td>0</Td>
                                        <Td>0</Td>
                                        <Td>0</Td>
                                        <Td>0</Td>
                                    </Tr>
                                </Tbody>
                                
                            </Table>
                        </Box>
                        <InfoBoxPlan title="" man={workers} bookings={bookings} viewDate={viewDate} />
                        
                    </GridItem>
                </Grid >
            </DndProvider >
            <BookingModal event={clickedEvent}
                isOpen={infoModalIsOpen}
                onOpen={infoModalOnOpen}
                onClose={infoModalOnClose} />
        </>
    );
}

export default WeekView;
