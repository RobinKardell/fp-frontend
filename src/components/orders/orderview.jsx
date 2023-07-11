import { useDisclosure, Center, Button, GridItem, IconButton, Flex, Box, Text, Heading, FormControl, Input, FormHelperText, FormLabel, Card, Stack, CheckboxGroup, Checkbox, Select, Table, Thead, Th, Tbody, Tr, Td, Divider, Textarea } from "@chakra-ui/react"
import { useState, useEffect } from "react";
import * as API from "../../api/api";

import { DeleteIcon, ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";

import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import AddArticleRow from "./add.article.row";
import EditArtikelForm from "../settings/edit.artikel.from";
import EditArticleRow from "./edit.article.row";

function OrderView(props) {
    const [fromCity, setFromCity] = useState("Från")
    const [toCity, setToCity] = useState("Till")
    const [fromZip, setFromZip] = useState("5")
    const [toZip, setToZip] = useState("6")
    const [fromAdress, setFromAdress] = useState("FrånAd")
    const [toAdress, setToAdress] = useState("TillAd")
    const [fromCity2, setFromCity2] = useState("Från2")
    const [toCity2, setToCity2] = useState("Till2")
    const [fromZip2, setFromZip2] = useState("52")
    const [toZip2, setToZip2] = useState("62")
    const [fromAdress2, setFromAdress2] = useState("FrånAd2")
    const [toAdress2, setToAdress2] = useState("TillAd2")
    const [km, setKM] = useState("12")
    const [movingDate, setMovingDate] = useState("");
    const [packDate, setPackDate] = useState();
    const [lossDate, setLossDate] = useState();
    const [cardboardLeaving, setCardboardLeavingDate] = useState();
    const [cardboardGetting, setCardboardGettingDate] = useState();
    const [inspectionDate, setInspectionDate] = useState();
    const [articels, setArticels] = useState();
    const [ordersRows, setOrderRows] = useState([]);
    const { orderid, totalVolume, onCustomer } = props;

    const { isOpen: addRowIsOpen, onOpen: addRowOnOpen, onClose: addRowOnClose } = useDisclosure()

    const { isOpen: editRowIsOpen, onOpen: editRowOnOpen, onClose: editRowOnClose } = useDisclosure()



    const swapInputs = () => {
        const fromCityTemp = fromCity;
        const fromZipTemp = fromZip;
        const fromAdressTemp = fromAdress;

        setFromCity(toCity)
        setToCity(fromCityTemp)

        setFromZip(toZip)
        setToZip(fromZipTemp)

        setFromAdress(toAdress)
        setToAdress(fromAdressTemp)
    }
    const swapInputs2 = () => {
        const fromCityTemp2 = fromCity2;
        const fromZipTemp2 = fromZip2;
        const fromAdressTemp2 = fromAdress2;

        setFromCity2(toCity2)
        setToCity2(fromCityTemp2)

        setFromZip2(toZip2)
        setToZip2(fromZipTemp2)

        setFromAdress2(toAdress2)
        setToAdress2(fromAdressTemp2)
    }

    //useEffect(console.log("du har nu valt, flyttdag"),[movingDate])
    const handleMovingDateChange = (e) => {
        setMovingDate(e.target.value);
    };
    const handlePackDateChange = (e) => {
        setPackDate(e.target.value);
    };
    const handleLossDateChange = (e) => {
        setLossDate(e.target.value);
    };
    const handleInspectionDateChange = (e) => {
        setInspectionDate(e.target.value);
    };
    const handleCardboardLeavingDateChange = (e) => {
        setCardboardLeavingDate(e.target.value);
    };
    const handleCardboardGettingDateChange = (e) => {
        setCardboardGettingDate(e.target.value);
    };
    const getArticels = async () => {
        const res = await API.getArticels();
        setArticels(res.data);
    }
    useEffect(() => {
        getArticels()
    }, []);

    const [selectedRow, setSelectedRow] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleRowClick = (rowData) => {
        setSelectedRow(rowData);
        //console.log("Klicka rad: ", rowData)
        editRowOnOpen()
    };


    return (
        <>
            <Flex direction="column" >
                <Flex>
                    <Heading fontSize={"2xl"}>
                        {(orderid) ? "Order: " + orderid : "Skapa Offert"}
                    </Heading>
                </Flex>
                <Flex >
                    <Box flex={"1"} px="2">
                        <FormControl>
                            <FormLabel>Flyttdag </FormLabel>
                            <Input
                                border="1px solid black"
                                type="datetime-local"
                                value={movingDate}
                                onChange={handleMovingDateChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Packdag</FormLabel>
                            <Input
                                border="1px solid black"
                                type='datetime-local'
                                value={packDate}
                                onChange={handlePackDateChange} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Lossning</FormLabel>
                            <Input
                                border="1px solid black"
                                type='datetime-local'
                                value={lossDate}
                                onChange={handleLossDateChange} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Besiktning</FormLabel>
                            <Input
                                border="1px solid black"
                                type='datetime-local'
                                value={inspectionDate}
                                onChange={handleInspectionDateChange} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Städning</FormLabel>
                            <Input
                                border="1px solid black"
                                type='datetime-local'
                                value={cardboardLeaving}
                                onChange={handleCardboardLeavingDateChange} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Kontaktperson</FormLabel>
                            <Input border="1px solid black" type='text' />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Telefonnummer</FormLabel>
                            <Input border="1px solid black" type='text' />
                        </FormControl>
                    </Box>
                    <Box flex={"1"} px="2">
                        <Flex>
                            <Box flex={1}><FormControl>
                                <FormLabel>Beställare</FormLabel>
                                <Input border="1px solid black" type='email' />
                            </FormControl></Box>
                            <Box flex={1} w={"20%"}>
                                <FormControl>
                                    <FormLabel>Telefon</FormLabel>
                                    <Input border="1px solid black" type='email' />
                                </FormControl>
                            </Box>
                        </Flex>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input border="1px solid black" type='email' />
                        </FormControl>

                        <Flex>
                            <Box flex={1}>
                                <FormControl>
                                    <FormLabel>Namn / Företag</FormLabel>
                                    <Input border="1px solid black" type='email' />
                                </FormControl>
                            </Box>
                            <Box flex={1}>
                                <FormControl>
                                    <FormLabel>Org/Pers</FormLabel>
                                    <Input border="1px solid black" type='email' />
                                </FormControl>
                            </Box>
                        </Flex>
                        <Flex>
                            <Box flex={1}><FormControl>
                                <FormLabel>Fakturamottagare / Person</FormLabel>
                                <Input border="1px solid black" type='email' />
                            </FormControl></Box>
                            <Box flex={1}>
                                <FormControl>
                                    <FormLabel>Kundnr / Märke</FormLabel>
                                    <Input border="1px solid black" type='email' />
                                </FormControl>
                            </Box>
                        </Flex>
                        <FormControl>
                            <FormLabel>Fakturamail</FormLabel>
                            <Input border="1px solid black" type='email' />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Adress</FormLabel>
                            <Input border="1px solid black" type='email' />
                        </FormControl>
                        <Flex>
                            <Box flex={1}><FormControl>
                                <FormLabel>Postnummer</FormLabel>
                                <Input border="1px solid black" type='email' />
                            </FormControl></Box>
                            <Box flex={1} w={"20%"}>
                                <FormControl>
                                    <FormLabel>Stad</FormLabel>
                                    <Input border="1px solid black" type='email' />
                                </FormControl>
                            </Box>
                        </Flex>

                    </Box>
                </Flex>
                <Flex>
                    <Box>
                        <FormControl>
                            <FormLabel>Adress</FormLabel>
                            <Input border="1px solid black" value={fromAdress} onChange={(e) => setFromAdress(e.target.value)} type='text' />
                        </FormControl>
                        <Flex>
                            <Box px={2}><FormControl>
                                <FormLabel>Postnummer</FormLabel>
                                <Input border="1px solid black" value={fromZip} onChange={(e) => setFromZip(e.target.value)} type='text' />
                            </FormControl></Box>
                            <Box px={2}>
                                <FormControl>
                                    <FormLabel>Stad</FormLabel>
                                    <Input border="1px solid black" value={fromCity} onChange={(e) => setFromCity(e.target.value)} type='text' />
                                </FormControl>
                            </Box>
                        </Flex>
                    </Box>
                    <Center p={4}><Button onClick={swapInputs}><HiOutlineSwitchHorizontal /></Button></Center>
                    <Box>
                        <FormControl>
                            <FormLabel>Adress</FormLabel>
                            <Input border="1px solid black" value={toAdress} onChange={(e) => setToAdress(e.target.value)} type='text' />
                        </FormControl>
                        <Flex>
                            <Box px={2}><FormControl>
                                <FormLabel>Postnummer</FormLabel>
                                <Input border="1px solid black" value={toZip} onChange={(e) => setToZip(e.target.value)} type='text' />
                            </FormControl></Box>
                            <Box px={2}>
                                <FormControl>
                                    <FormLabel>Stad</FormLabel>
                                    <Input border="1px solid black" value={toCity} onChange={(e) => setToCity(e.target.value)} type='text' />
                                </FormControl>
                            </Box>
                        </Flex>
                    </Box>
                </Flex>
                <Flex>
                    <Box>
                        <FormControl>
                            <FormLabel>Adress</FormLabel>
                            <Input border="1px solid black" value={fromAdress2} onChange={(e) => setFromAdress2(e.target.value)} type='text' />
                        </FormControl>
                        <Flex>
                            <Box px={2}><FormControl>
                                <FormLabel>Postnummer</FormLabel>
                                <Input border="1px solid black" value={fromZip2} onChange={(e) => setFromZip2(e.target.value)} type='text' />
                            </FormControl></Box>
                            <Box px={2}>
                                <FormControl>
                                    <FormLabel>Stad</FormLabel>
                                    <Input border="1px solid black" value={fromCity2} onChange={(e) => setFromCity2(e.target.value)} type='text' />
                                </FormControl>
                            </Box>
                        </Flex>
                    </Box>
                    <Center p={4}><Button onClick={swapInputs2}><HiOutlineSwitchHorizontal /></Button></Center>
                    <Box>
                        <FormControl>
                            <FormLabel>Adress</FormLabel>
                            <Input border="1px solid black" value={toAdress2} onChange={(e) => setToAdress2(e.target.value)} type='text' />
                        </FormControl>
                        <Flex>
                            <Box px={2}><FormControl>
                                <FormLabel>Postnummer</FormLabel>
                                <Input border="1px solid black" value={toZip2} onChange={(e) => setToZip2(e.target.value)} type='text' />
                            </FormControl></Box>
                            <Box px={2}>
                                <FormControl>
                                    <FormLabel>Stad</FormLabel>
                                    <Input border="1px solid black" value={toCity2} onChange={(e) => setToCity2(e.target.value)} type='text' />
                                </FormControl>
                            </Box>
                        </Flex>
                    </Box>


                </Flex>
                <Box>
                    <FormControl>
                        <FormLabel>Arbetsbeskrivning</FormLabel>
                        <Textarea borderRadius={0} bgColor={'white'} border="1px solid black" type='text' />
                    </FormControl>
                </Box>
                <CheckboxGroup colorScheme='brand.primary' defaultValue={['Bohag']}>
                    <Text>Typ av uppdrag</Text>
                    <Stack spacing={[1, 5]} direction={['column', 'row']}>
                        <Checkbox value='Bohag'>Bohag</Checkbox>
                        <Checkbox value='Evakuering'>Evakuering</Checkbox>
                        <Checkbox value='Kontorsflytt'>Kontorsflytt</Checkbox>
                        <Checkbox value="Transport">Transport</Checkbox>
                        <Checkbox value="UtPer">Uthyrning personal</Checkbox>
                    </Stack>
                </CheckboxGroup>
                <Box>
                    <Button onClick={addRowOnOpen}>Lägg till resurs</Button>
                    <Divider />

                    <Table>
                        <Thead textColor={'black'} fontWeight={"bold"}>
                            <Th>Artnr.</Th>
                            <Th>Datum</Th>
                            <Th>Antal</Th>
                            <Th>Info</Th>
                            <Th>Kategori</Th>
                            <Th>Från Kl</Th>
                            <Th>Rast</Th>
                            <Th>Till Kl</Th>
                            <Th>Timmar</Th>
                            <Th>Timpris</Th>
                            <Th>Totalt</Th>
                            <Th>Summa RUT</Th>
                            <Th></Th>
                        </Thead>
                        <Tbody>
                            {ordersRows && ordersRows.map((row, index) => (
                                <Tr>
                                    <Td>{row.artnr}</Td>
                                    <Td>{row.when}</Td>
                                    <Td>{row.count}</Td>
                                    <Td>{row.info}</Td>
                                    <Td>{row.category}</Td>
                                    <Td>{row.from}</Td>
                                    <Td>{row.pbreak}</Td>
                                    <Td>{row.to}</Td>
                                    <Td>{row.workedHour}</Td>
                                    <Td>{row.price}</Td>
                                    <Td>{row.total}</Td>
                                    <Td></Td>
                                    <Td>
                                        <IconButton
                                            icon={<ChevronUpIcon />}
                                            disabled={index === 0}
                                            onClick={() => {
                                                const newData = [...ordersRows];
                                                newData[index] = ordersRows[index - 1];
                                                newData[index - 1] = ordersRows[index];
                                                setOrderRows(newData);
                                            }}
                                        />
                                        <IconButton
                                            icon={<ChevronDownIcon />}
                                            disabled={index === ordersRows.length - 1}
                                            onClick={() => {
                                                if (index !== ordersRows.length - 1) {
                                                const newData = [...ordersRows];
                                                newData[index] = ordersRows[index + 1];
                                                newData[index + 1] = ordersRows[index];
                                                setOrderRows(newData);
                                            }
                                            }}
                                        />
                                        <IconButton
                                            icon={<DeleteIcon />}
                                            onClick={() => {
                                                const newData = [...ordersRows];
                                                newData.splice(index, 1);
                                                setOrderRows(newData);
                                            }}
                                        />
                                        {/*<Button onClick={() => (handleRowClick(row))}>Ändra</Button>*/}
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                    <Flex>
                        <Box flex={1}>
                            <FormControl>
                                <FormLabel>Beskrivning - Internt</FormLabel>
                                <Textarea borderRadius={0} bgColor={'white'} border="1px solid black" type='text' />
                            </FormControl>
                        </Box>
                    </Flex>
                </Box>
            </Flex>
            <AddArticleRow setOrderRows={setOrderRows} ordersRows={ordersRows} isOpen={addRowIsOpen} onOpen={addRowOnOpen} onClose={addRowOnClose} articels={articels} />
            <EditArticleRow rowData={selectedRow} ordersRows={ordersRows} setOrderRows={setOrderRows} isOpen={editRowIsOpen} onOpen={editRowOnOpen} onClose={editRowOnClose} articels={articels} />
        </>
    )
}
export default OrderView