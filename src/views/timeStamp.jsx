import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  useMediaQuery,
  Stack,
  Input,
  Flex,
  Box,
  Text,
  Heading,
  useColorModeValue,
  SimpleGrid,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import {
  HiOutlineCalendar,
  HiOutlineCollection,
  HiOutlineColorSwatch,
  HiOutlineMap,
  HiOutlineUserGroup,
  HiOutlineUsers,
  HiPencilAlt,
  HiTrash,
  HiX,
} from "react-icons/hi";
import * as API from "../api/api";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Field, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { set } from "date-fns";

function TimeStamp() {
  const [isMobile] = useMediaQuery("(max-width: 1068px)");
  const [isDesktop] = useMediaQuery("(min-width: 1069px)");
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState({});
  useEffect(() => {
    getBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const attest = async () => {
    await API.attestTimeStamp(id);
    navigate("/timereports");
  };
  const getBooking = async () => {
    const response = await API.getBook(id);
    setBooking(response.data);
  };
  const update = async () => {
    console.log("update", booking);
    const updateMomentObject = {
      id: id,
      ClockIn: booking.StampIn,
      ClockOut: booking.StampOut,
    };
    console.log(updateMomentObject);
    const res = await API.updateTimeStamp(updateMomentObject);
    console.log("res", res);
    getBooking();
  };

  return (
    <>
      <Flex direction="column" flex="1" overflow="auto" px="10" pt="8">
        <Flex align="center" justify="space-between">
          <Heading pt="2.5" size="lg" fontWeight="extrabold" mb="6">
            Tidrapport för arbete - {booking.Id} -
            <Button
              onClick={() => {
                attest();
              }}
            >
              Attestera Tidstämpel
            </Button>
          </Heading>
        </Flex>
        <Box flex="1" p="2" rounded="xl" h="full">
          <Box h="full" as="section" mx="auto">
            <Text>Arbetsorder: {booking.OrderId}</Text>
            <Text>Loggad arbetad tid: {booking.WorkedTime}</Text>
            <Stack>
              <Flex align="center">
                <HiOutlineCalendar size="22" />
                <Input
                  value={booking.StampIn}
                  ml="1.5"
                  type={"datetime-local"}
                  onChange={(e) =>
                    setBooking({ ...booking, StampIn: e.target.value })
                  }
                />
              </Flex>
              <Flex align="center">
                <HiOutlineCalendar size="22" />
                <Input
                  value={booking.StampOut}
                  ml="1.5"
                  type={"datetime-local"}
                  onChange={(e) =>
                    setBooking({ ...booking, StampOut: e.target.value })
                  }
                />
              </Flex>

              <Button onClick={update} mr={3} colorScheme={"brand"}>
                Uppdatera
              </Button>
            </Stack>

            <Stack spacing={5}></Stack>
          </Box>
        </Box>
      </Flex>
    </>
  );
}

export default TimeStamp;
