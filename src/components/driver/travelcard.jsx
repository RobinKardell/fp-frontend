import { Image, useMediaQuery, Flex, Box, Text, Heading, useColorModeValue, SimpleGrid, useDisclosure } from '@chakra-ui/react';
function Travelcard(props) {
    return (
        <>
        <Box borderWidth='1px' borderRadius='lg'>
      <Box p='6'>
        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
        >
          Start: {props.startaddress}
          <br />
          Stop: {props.stopaddress}
        </Box>
        <Box>
          <Box as='span' color='gray.600' fontSize='sm'>
          Tid: {props.starttid} - {props.stoptid}
          </Box>
        </Box>
        <Box>
          <Box as='span' color='gray.600' fontSize='sm'>
          Förare: {props.driver} &bull;  Avstånd {props.distance} km 
          </Box>
        </Box>
      </Box>
    </Box>
        </>
    );
}
export default Travelcard