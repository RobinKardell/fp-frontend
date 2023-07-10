import { useMediaQuery, Flex, Box, Text, Heading, useColorModeValue, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState, useRef } from 'react';
import * as API from "../api/api";
import { TimeInfo } from '../components/timereport/TimeInfo';
import TimelogForm from '../components/timereport/edit.TimeLog';
import { motion } from 'framer-motion'
function TimeReport() {
  const [isMobile] = useMediaQuery("(max-width: 1068px)")
  const [isDesktop] = useMediaQuery("(min-width: 1069px)")
  const [bookings, setBookings] = useState([]);
  const [Abookings, setABookings] = useState([]);
  const [clickedEvent, setClickedEvent] = useState({});
  //Fetch the events for the current calendar view
  const fetchBookingsInView = async () => {
    const response = await API.getTimelogs()
    console.log(response)
    setBookings(response.logs);
    setABookings(response.dt);
  }

  useEffect(() => {
    fetchBookingsInView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <Flex direction="column" flex="1" overflow="auto" px="10" pt="8">
        <Flex align="center" justify="space-between">
          <Heading pt="2.5" size="lg" fontWeight="extrabold" mb="6">
            Tidsrapportering
          </Heading>
        </Flex>
        <Box flex="1" p="2" rounded="xl" h="full">
          <Box
            as="section"
            mx="auto"
          >
            <Heading pt="1" size="lg" fontWeight="extrabold" mb="6">
              Oattesterade
            </Heading>
            <SimpleGrid
              columns={{
                base: 1,
                sm: 2,
                md: 2,
                lg: 3,
                xl: 4,
              }}
              spacing="6"
            >
              {bookings?.map((employee) => {
                const { id, OrderName, BookingTitle, ClockIn, ClockOut, ClientName, workedTimeString, attest } = employee
                return (
                  <Flex
                    direction="column"
                    alignItems="center"
                    rounded="md"
                    padding="8"
                    position="relative"
                    shadow={{
                      md: 'base',
                    }}
                  >
                    <TimeInfo mt="4" attestState={attest} getlogs={fetchBookingsInView} id={id} name={OrderName} workedTotal={workedTimeString} booking={BookingTitle} client={ClientName} clockin={ClockIn} clockout={ClockOut} />
                  </Flex>
                )
              })}
            </SimpleGrid>
          </Box>
          <Box
            marginTop={"1em"}
            as="section"
            mx="auto"
          >
            <Heading pt="1" size="lg" fontWeight="extrabold" mb="6">
              Attesterade
            </Heading>
            <SimpleGrid
              columns={{
                base: 1,
                sm: 2,
                md: 2,
                lg: 3,
                xl: 4,
              }}
              spacing="6"
            >
              {Abookings?.map((employee) => {
                const { id, OrderName, BookingTitle, ClockIn, ClockOut, ClientName, workedTimeString, attest } = employee
                return (
                  <Flex
                    direction="column"
                    alignItems="center"
                    rounded="md"
                    padding="8"
                    position="relative"
                    shadow={{
                      md: 'base',
                    }}
                  >
                    <TimeInfo mt="4" attestState={attest} getlogs={fetchBookingsInView} id={id} name={OrderName} workedTotal={workedTimeString} booking={BookingTitle} client={ClientName} clockin={ClockIn} clockout={ClockOut} />
                  </Flex>
                )
              })}
            </SimpleGrid>
          </Box>
        </Box>
      </Flex>
    </>
  )
}

export default TimeReport