
import { List, ListItem, ListIcon, Modal, Select, ModalContent, ModalHeader, ModalOverlay, ModalBody, Box, Text, Input, FormControl, FormLabel, Button } from "@chakra-ui/react";
import { Field, FormikProvider, useFormik } from 'formik'
import * as Yup from "yup";
import { useState } from "react";
import { FaCheck } from 'react-icons/fa';
import { useEffect } from "react";

function AddArticleRow(props) {
    const { setOrderRows, ordersRows, isOpen, onOpen, onClose, articels } = props;
    const [fromTime, setFromTime] = useState("07:30");
    const [toTime, setToTime] = useState("15:00");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [pbreak, setPBreak] = useState(0);
    const [totalt, setTotalt] = useState(0);
    const [count, setCount] = useState(0)
    const [when, setWhen] = useState("");
    const [info, setInfo] = useState("");
    const [timeDifference, setTimeDifference] = useState(null);

    const [isOpen1, setIsOpen1] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        setSelectedProduct(null);
        setIsOpen1(true);
    };

    console.log("finns redan sparat: ", fromTime);
    const handleProductSelect = (product) => {
        setSelectedProduct(product);
        setInputValue(product.name); // Update input field with selected product name
        setIsOpen1(false);
    };
    const handleStartTimeChange = (event) => {
        setFromTime(event.target.value);
        updateTimeDifference(event.target.value, toTime);
    };

    const handleEndTimeChange = (event) => {
        setToTime(event.target.value);
        updateTimeDifference(fromTime, event.target.value);
    };
   /* const handleFromTimeChange = (event) => {
        const newFromTime = event.target.value;
        setFromTime(newFromTime);
        
    };

    const handleToTimeChange = (event) => {
        const newToTime = event.target.value;
        setToTime(newToTime);
        updateTimeDifference(fromTime, event.target.value);
    };*/
    const handleCountChange = (e) => {
        const newCount = e.target.value;
        setCount(newCount);
        const totalT = (selectedProduct.type === "h") ? (((timeDifference - pbreak) * newCount) * selectedProduct.price) : selectedProduct.price * newCount

        setTotalt(totalT)

    }
    const filteredProducts = articels?.filter((product) =>
        product.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    const updateTimeDifference = (fromValue, toValue) => {
        const fromTime = new Date(`2000-01-01T${fromValue}:00Z`);
        const toTime = new Date(`2000-01-01T${toValue}:00Z`);
        const diffInMinutes = (toTime - fromTime) / 60000;
        const hours = Math.floor(diffInMinutes / 60);
        const minutes = diffInMinutes % 60;
        const diffInHours = diffInMinutes / 60;
        setTimeDifference(diffInHours.toFixed(1));
    };
    const addToList = () => {
        const length = ordersRows.length;
        updateTimeDifference(fromTime, toTime);
        //setTimeDifference(fromTime, toTime)
        const totalT = (selectedProduct.type === "h") ? (((timeDifference - pbreak) * selectedProduct.price) * count) : selectedProduct.price * count

        const newlist = [{
            artnr: selectedProduct.artikelnr,
            when: when,
            count: count,
            info: info,
            category: selectedProduct.name,
            from: fromTime,
            pbreak: pbreak,
            to: toTime,
            workedHour: timeDifference - pbreak,
            price: selectedProduct.price,
            total: totalT,
            type: selectedProduct.type
        }]

        if (typeof ordersRows === "undefined") {
            setOrderRows(newlist);
        } else {
            setOrderRows([...ordersRows, ...newlist]);
        }


        /*
        setToTime("");
         setFromTime("");
         setTotalt("");
         setTimeDifference("");
         setWhen("");*/
        //onClose();
    }



    const times = [];
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
            times.push(time);
        }
    }



    return (
        <>
            <Modal scrollBehavior={"inside"} isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay>
                    <ModalContent borderRadius={0}>
                        <ModalHeader borderBottom={"1px"}>Lägg till resurs</ModalHeader>
                        <ModalBody>
                            <Input
                                value={inputValue}
                                onChange={handleInputChange}
                                placeholder="Select a product"
                                border="1px solid black"
                                borderRadius={0}
                            />
                            {isOpen1 && filteredProducts.length > 0 && (
                                <Box borderWidth="1px" borderRadius="md" overflow="hidden" mt={2}>
                                    <List spacing={0}>
                                        {filteredProducts.map((product) => (
                                            <ListItem
                                                borderRadius={0}
                                                key={product.name}
                                                px={3}
                                                py={2}
                                                cursor="pointer"
                                                _hover={{ bg: 'gray.100' }}
                                                onClick={() => handleProductSelect(product)}
                                            >
                                                <ListIcon
                                                    as={FaCheck}
                                                    color={product === selectedProduct ? 'green.500' : 'gray.400'}
                                                />
                                                <Text>#{product.artikelnr} : {product.name}</Text>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            )}
                            {selectedProduct && (
                                <>
                                    <Box>
                                        <FormControl>
                                            <FormLabel>Datum</FormLabel>
                                            <Input border="1px solid black" name="when" type="date" value={when} onChange={(e) => { setWhen(e.target.value) }} />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Antal</FormLabel>
                                            <Input border="1px solid black" name="count" value={count} onChange={handleCountChange} />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Info</FormLabel>
                                            <Input border="1px solid black" name="info" value={info} onChange={(e) => { setInfo(e.target.value) }} />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Kategori</FormLabel>
                                            <Input border="1px solid black" name="category" value={selectedProduct.name} readOnly />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Från kl</FormLabel>
                                            {/*<Input border="1px solid black" name="from" type="time" value={fromTime} onChange={handleFromTimeChange} />*/}
                                            <Select border="1px solid black" placeholder="From" value={fromTime} onChange={handleStartTimeChange}>
                                                {times.map((time) => (
                                                    <option key={time} value={time}>
                                                        {time}
                                                    </option>
                                                ))}
                                            </Select>

                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Rast</FormLabel>
                                            <Input border="1px solid black" name="break" value={pbreak} onChange={(e) => { setPBreak(e.target.value) }} />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Till kl</FormLabel>
                                            {/*<Input border="1px solid black" name="to" type="time" value={toTime} onChange={handleToTimeChange} />*/}
                                            <Select border="1px solid black" placeholder="To" value={toTime} onChange={handleEndTimeChange}>
                                                {times
                                                    .filter((time) => time > fromTime)
                                                    .map((time) => (
                                                        <option key={time} value={time}>
                                                            {time}
                                                        </option>
                                                    ))}
                                            </Select>
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Timpris</FormLabel>
                                            <Input border="1px solid black" name="hourprice" value={selectedProduct.price} />
                                        </FormControl>
                                    </Box>
                                    <Button onClick={addToList}>Lägg till rad</Button>
                                </>
                            )}
                        </ModalBody>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </>
    );
}
export default AddArticleRow;