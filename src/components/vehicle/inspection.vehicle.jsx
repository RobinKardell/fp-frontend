import { Box, Button, Flex, Input,Text } from "@chakra-ui/react"

function VehicleInspection(){
    return (<>
    <Flex>
        <Flex>
            <Box pr={2}>
                <Text>Fordonsbesikting</Text>
                <Input type="date" /><br/>
                <Button>Skapa Fordonsbesikting</Button>
            </Box>
            <Box pr={2}>
                <Text>Färdsskrivare</Text>
                <Input type="date" /><br/>
                <Button>Skapa Färdsskrivare</Button>
            </Box>
            <Box pr={2}>
                <Text>Bakgavellift</Text>
                <Input type="date" /><br/>
                <Button>Skapa Bakgavellift </Button>
            </Box>
            <Box pr={2}>
                <Text>Service</Text>
                <Input type="date" /><br/>
                <Button>Skapa Service </Button>
            </Box>
        </Flex>
    </Flex>
    <Flex p="1">Lås perioder</Flex>
    </>)
}
export default VehicleInspection