import { Flex, Box, Heading, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react"
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import * as API from "../api/api";
import VehicleInfo from "../components/vehicle/info.vehicle";
import VehicleInspection from "../components/vehicle/inspection.vehicle";
import VehicleNote from "../components/vehicle/note.vehicle";
import VehicleNotes from "../components/vehicle/notes.vehicle";
import VehicleUsed from "../components/vehicle/usedDetatil.vehicle";

function Vehicle() {
  const [vehicleInfo, setVehicleInfo] = useState([])
  const { regnr } = useParams();
  useEffect(() => {
    getVInfo()
  }, [])
  const getVInfo = async () => {
    const res = await API.getVehicleInfo(regnr);
    setVehicleInfo(res.data)
  }
  return (
    <Flex direction="column" flex="1" overflow="auto" px="10" pt="8">
      <Box flex="1">
        <Box
          h="full"
        >
          <Box
            as="section"
            mx="auto"
          >
            <Heading>Fordon {regnr}</Heading>
            <Flex>
              <Box mt={4}>
                <VehicleInfo infoData={vehicleInfo} />
              </Box>
              <Box mt={4} ml={4}>
                <VehicleInspection />
              </Box>
              <Box mt={4} ml={4}>
                <VehicleUsed />
              </Box>
            </Flex>
            <Flex>
                <VehicleNote infoData={vehicleInfo} />
            </Flex>
            <Flex>
              <Box>
                <VehicleNotes  />
              </Box>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Flex>
  )
}
export default Vehicle