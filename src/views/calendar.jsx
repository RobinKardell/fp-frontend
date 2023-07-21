import { Box, Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import FullCalendar from "@fullcalendar/react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import svLocale from "@fullcalendar/core/locales/sv";
import React, { useEffect } from "react";

function Calendar() {
  const axiosPrivate = useAxiosPrivate();

  return (
    <Flex direction="column" flex="1" overflow="auto" px="10" pt="8">
      <Flex align="center" justify="space-between">
        <Heading pt="2.5" size="lg" fontWeight="extrabold" mb="6">
          Kalender
        </Heading>
      </Flex>

      <Box
        flex="1"
        borderColor="gray.100"
        borderWidth="3px"
        borderStyle="solid"
        rounded="xl"
      >
        <Box
          bg={useColorModeValue("gray.100", "gray.800")}
          px={{
            base: "6",
            md: "8",
          }}
          h="full"
          py="4"
        >
          <Box as="section" mx="auto">
            <FullCalendar
              plugins={[timeGridPlugin]}
              locales={[svLocale]}
              initialView="timeGridWeek"
              locale={"sv"}
              timeZone="UTC"
              slotMinTime="05:00:00"
              slotMaxTime="19:00:00"
            />
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}

export default Calendar;
