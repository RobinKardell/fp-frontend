import { Box, Text, Flex, Select,Tooltip,Input } from "@chakra-ui/react"

function VehicleInfo (props){
    const {infoData} = props
    return (
        <>
        <Flex>
            <Box>
                <Flex>
                    <Box p="1">
                        Regnr<br />
                        <Input />
                    </Box>
                    <Box p="1">
                        Krav 
                        <Tooltip label="Vad krävs för att använda fordonet" aria-label='A tooltip'>*</Tooltip>
                        <Select>
                            <option>B</option>
                            <option>BE</option>
                            <option>C</option>
                            <option>CE</option>
                        </Select>
                    </Box>
                </Flex>
                <Flex>
                    <Box p="1">Passageaste<br /><Input /></Box>
                    <Box p="1">m3<br /><Input /></Box>
                </Flex>
                <Flex>
                    <Box p="1">Dold<br /><Select>
                            <option>Ja</option>
                            <option>Nej</option>
                        </Select></Box>
                    <Box p="1">Höjd (m)<br /><Input /></Box>
                </Flex>
                
                <Text>Alias<Input /></Text>
                
            </Box>
        </Flex>
        </>
    )
}
export default VehicleInfo