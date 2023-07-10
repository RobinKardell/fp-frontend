import { Flex,Box, Heading,Table, Thead,Tr,Th, Tbody, Td, IconButton, useDisclosure} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { HiPlus } from "react-icons/hi"
import VehicleAddForm from "../components/vehicle/add.vehicle"
import * as API from "../api/api";
import { useState } from "react";
import { useEffect } from "react";
function Vehicles() {
    const [vehicles, setVehicles] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const getVehiclesLoad = async () => {
        console.log("get");
        const res = await API.getVehicles();
        console.log(res);
        setVehicles(res.data);
    }
    useEffect(() => {
        getVehiclesLoad();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
    return (
        <>
        <Flex direction="column" flex="1" overflow="auto" px="10" pt="8">
            <Flex align="center" justify="space-between">
                <Heading pt="2.5" size="lg" fontWeight="extrabold" mb="6">
                    Fordon
                </Heading>
                <IconButton onClick={onOpen} mt="2.5" icon={<HiPlus />} mb="6" size="md" />
            </Flex>

          <Box flex="1">
            <Box
              h="full"
            >
                <Box
                as="section"
                mx="auto"
                >
                    <Box>
                        <Table variant={"custom"}>
                            <Thead>
                                <Tr>
                                    <Th>Regnr</Th>
                                    <Th>Märke</Th>
                                    <Th>Modell</Th>
                                    <Th>Typ</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {vehicles && vehicles.map((vehicle)=>{
                                    const { regNr, brand, model, type} = vehicle
                                    return( 
                                    <Tr>
                                        <Td><Link to={'/vehicle/'+regNr}>{regNr}</Link></Td>
                                        <Td>{brand}</Td>
                                        <Td>{model}</Td>
                                        <Td>{type}</Td>
                                    </Tr>)
                                })}
                            </Tbody>
                        </Table>
                    </Box>
                </Box>
            </Box>
          </Box>
        </Flex>
        <VehicleAddForm isOpen={isOpen} onOpen={onOpen} onClose={onClose} getVehiclesLoad={getVehiclesLoad} />
        </>
      )
}
export default Vehicles