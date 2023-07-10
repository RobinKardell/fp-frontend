import { Flex, Heading, IconButton, useDisclosure,Stack,Skeleton,Box,useColorModeValue,SimpleGrid } from "@chakra-ui/react";
import { HiPlus } from "react-icons/hi";
import { useEffect,useState } from "react";
import AddWareHouseModal from "../components/warehouses/add.warehouse";
import * as API from "../api/api";
import { WarehouseInfo } from "../components/warehouses/WarehoseInfo";

function Warehouses() {
    const [isLoading, setIsLoading] = useState(true)
    const [warehouses, setWarehouses] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()

  const getWareHouse = async () => {
    setIsLoading(true);
    try {
      //const response = await axiosPrivate.get('/team')
      const response = await API.getWarehouses();
      setWarehouses(response.result)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getWareHouse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
    return (
        <>
        <Flex direction="column" flex="1" overflow="auto" px="10" pt="8">
            <Flex align="center" justify="space-between">
                <Heading pt="2.5" size="lg" fontWeight="extrabold" mb="6">
                    Lagerställen
                </Heading>
                <IconButton onClick={onOpen} mt="2.5" icon={<HiPlus />} text="text" mb="6" size="md" />
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
                {isLoading ?
                  <>
                    <Stack>
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                    </Stack>
                    <Stack>
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                    </Stack>
                    <Stack>
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                    </Stack>
                    <Stack>
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                    </Stack>
                  </>
                  :
                  <>
                    {warehouses?.map((warehouse) => {
                      const { id, name, description } = warehouse
                      
                      return (
                        <WarehouseInfo id={id} name={name} description={description} />
                      )
                    })}
                  </>
                }
              </SimpleGrid>
            </Box>
          </Box>
        </Box>
        </Flex>

        <AddWareHouseModal getWareHouse={getWareHouse} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </>
    )
}
export default Warehouses;