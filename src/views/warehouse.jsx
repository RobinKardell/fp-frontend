import { Card, Flex, Heading, IconButton, useDisclosure, Stack, Skeleton, Box, useColorModeValue, SimpleGrid, CardBody, Button } from "@chakra-ui/react";
import { HiPlus } from "react-icons/hi";
import { useEffect, useState } from "react";
import * as API from "../api/api";
import { useParams } from 'react-router-dom';
import AddPlaceModal from "../components/warehouse/add.PlaceForm";
import Placeinfo from "../components/warehouse/Placeinfo";

function Warehouse() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true)
  const [pallets, setPallets] = useState([])
  const [shelfs, setShelf] = useState([])
  const [containers, setContainer] = useState([])
  const [storehouses, setStorehouse] = useState([])
  const [info, setWarehouseInfo] = useState([])
  const [clickedEvent, setClickedEvent] = useState({})

  const { isOpen: infoModalIsOpen, onOpen: infoModalOnOpen, onClose: infoModalOnClose } = useDisclosure()
  const { isOpen: addModalIsOpen, onOpen: addModalOnOpen, onClose: addModalOnClose } = useDisclosure()
  const getSpaces = async () => {
    const responsePallets = await API.getWarehouseSpace(id, 1); //pall
    const responseShelf = await API.getWarehouseSpace(id, 2); //shelf
    const responseContainer = await API.getWarehouseSpace(id, 4); //container
    const responseStorehouse = await API.getWarehouseSpace(id, 3); //storehouse
    setPallets(responsePallets?.places)
    setShelf(responseShelf?.places);
    setContainer(responseContainer?.places);
    setStorehouse(responseStorehouse?.places);
  }
  const getWarehouseInfo = async () =>{
    const response = await API.getWarehouseInfo(id); //storehouse
    setWarehouseInfo(response.data)
  }

  const handleEventClick = (clickInfo) => {getSpaceInfo(clickInfo.target.value); infoModalOnOpen(); }
  const getSpaceInfo = async (spaceid) => {
    const res = await API.getSpaceInfo(spaceid)
    setClickedEvent(res.data)
  }
  useEffect(() => {
    getSpaces();
    getWarehouseInfo();
  }, [])

  return (
    <>
      <Flex direction="column" flex="1" overflow="auto" px="10" pt="8">
        <Flex align="center" justify="space-between">
          <Heading pt="2.5" size="lg" fontWeight="extrabold" mb="6">
            {info.name}
          </Heading>
          <Button onClick={addModalOnOpen}><HiPlus /></Button>
        </Flex>
        <Box flex="1" borderColor="gray.100" borderWidth="3px" borderStyle="solid" rounded="xl">
          <Box
            bg={useColorModeValue('gray.100', 'gray.800')}
            px={{
              base: '6',
              md: '8',
            }}
            h="full"
            py="4"
          >
            <Box
              as="section"
              mx="auto"
            >
              <SimpleGrid columns={1} spacing={10}>
              <Card>
                  <CardBody>
                    <Heading>Containers </Heading>
                    <SimpleGrid columns={10} spacing={4} marginTop={3}>
                      {containers?.map(container => (
                        <Button value={container.id} onClick={
                          (e)=>
                          {
                            handleEventClick(e);
                          }
                        }>{container.name}</Button>
                      ))}
                    </SimpleGrid>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <Heading>Pallplats </Heading>
                    <SimpleGrid columns={10} spacing={4} marginTop={3}>
                      {pallets?.map(pallet => (
                        <Button value={pallet.id} onClick={
                          (e)=>
                          {
                            handleEventClick(e);
                          }
                        }>{pallet.name}</Button>
                      ))}
                    </SimpleGrid>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <Heading>Golvplats </Heading>
                    <SimpleGrid columns={10} spacing={4} marginTop={3}>
                      {shelfs?.map(shelf => (
                        <Button value={shelf.id} onClick={
                          (e)=>
                          {
                            handleEventClick(e);
                          }
                        }>{shelf.name}</Button>
                      ))}
                    </SimpleGrid>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <Heading>Förråd </Heading>
                    <SimpleGrid columns={10} spacing={4} marginTop={3}>
                      {storehouses?.map(storehouse => (
                        <Button value={storehouse.id} onClick={
                          (e)=>
                          {
                            handleEventClick(e);
                          }
                        }>{storehouse.name}</Button>
                      ))}
                    </SimpleGrid>
                  </CardBody>
                </Card>
                
              </SimpleGrid>
            </Box>
          </Box>
        </Box>
      </Flex>
      <AddPlaceModal getSpaces={getSpaces} warehouse={id} isOpen={addModalIsOpen} onOpen={addModalOnOpen} onClose={addModalOnClose} />
      <Placeinfo event={clickedEvent} isOpen={infoModalIsOpen} onOpen={infoModalOnOpen} onClose={infoModalOnClose} />
    </>
  )
}
export default Warehouse;