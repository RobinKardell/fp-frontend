import { Image, useMediaQuery, Flex, Box, Text, Heading, useColorModeValue, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState, useRef } from 'react';
import * as API from "../api/api";
import { TimeInfo } from '../components/timereport/TimeInfo';
import TimelogForm from '../components/timereport/edit.TimeLog';
import { motion } from 'framer-motion'
import Travelcard from '../components/driver/travelcard';
function DriveJournal() {
    const [travels, setTravels] = useState([])
    const getTravelsList = async () => {
        //setIsLoading(true)
        try {
          const response = await API.getTravels();
          console.log("re",response);
          setTravels(response)
         // setIsLoading(false)
        } catch (error) {
          console.log(error)
        }
      }
    
    
      useEffect(() => {
        getTravelsList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

      console.log("resor", travels);
    const property = {
        startaddress: "testgatan 1 5712 test Sverige",
        stopaddress: "testgatan 14 5712 test Sverige",
        driver: 'Test Testsson',
        starttid: "2023-03-10 23:00:00",
        stoptid:  "2023-03-10 21:00:00",
        distance: 4,
      }
    return (
        <Flex direction="column" flex="1" overflow="auto" px="10" pt="8">
            <Flex align="center" justify="space-between">
                <Heading pt="2.5" size="lg" fontWeight="extrabold" mb="6">
                    Körjournal
                </Heading>
            </Flex>
            <Box flex="1" p="2" rounded="xl" h="full">
                <Box
                    as="section"
                    mx="auto"
                >
                    <SimpleGrid
                    columns={{
                        base: 1,
                        sm: 1,
                        md: 1,
                        lg: 1,
                        xl: 1,
                    }}
                    spacing="6"
                    >
                        {travels?.travels?.map((travel) => {
                            const { id, tracker, begin, end, distance, duration, points} = travel;
                            return (
                                <Travelcard 
                                startaddress={"test börajn"}
                                stopaddress={"test slut"}
                                starttid={begin}
                                stoptid={end}
                                driver={tracker}
                                distance={distance}
                                duration={duration}
                                points={points.lenght}
                                /> 
                            )
                        })}
                    </SimpleGrid>
                </Box>
            </Box>
      </Flex>
    );
}
export default DriveJournal