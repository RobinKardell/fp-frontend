import {
  List,
  ListItem,
  ListIcon,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  Box,
  Text,
  Input,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import { Field, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useEffect } from "react";
import { useFetcher } from "react-router-dom";

function EditArticleRow(props) {
  const {
    rowData,
    setOrderRows,
    ordersRows,
    isOpen,
    onOpen,
    onClose,
    articels,
  } = props;
  const [fromTime, setFromTime] = useState(rowData?.from);
  const [toTime, setToTime] = useState(rowData?.to);
  const [pbreak, setPBreak] = useState(rowData?.pbreak);
  const [totalt, setTotalt] = useState(rowData?.totalt);
  const [count, setCount] = useState(rowData?.count);
  const [when, setWhen] = useState(rowData?.when);
  const [info, setInfo] = useState(rowData?.info);
  const [price, setPrice] = useState(rowData?.price);
  const [timeDifference, setTimeDifference] = useState(null);

  const [isOpen1, setIsOpen1] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setSelectedProduct(null);
    setIsOpen1(true);
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setInputValue(product.name); // Update input field with selected product name
    setIsOpen1(false);
  };
  const handleFromTimeChange = (event) => {
    const newFromTime = event.target.value;
    setFromTime(newFromTime);
    /* if (newFromTime <= toTime) {
            setFromTime(newFromTime);
        } else {
            setFromTime(toTime);
            setToTime(newFromTime);
        }*/
    updateTimeDifference(event.target.value, toTime);
  };

  useEffect(() => {
    console.log(rowData);
  }, []);

  const handleToTimeChange = (event) => {
    const newToTime = event.target.value;
    setFromTime(newToTime);
    /*if (newToTime >= fromTime) {
            setToTime(newToTime);
        } else {
            setToTime(fromTime);
            setFromTime(newToTime);
        }*/
    updateTimeDifference(fromTime, event.target.value);
  };
  const handleCountChange = (e) => {
    const newCount = e.target.value;
    setCount(newCount);
    const totalT =
      selectedProduct.type === "h"
        ? (timeDifference - pbreak) * newCount * selectedProduct.price
        : selectedProduct.price * newCount;

    setTotalt(totalT);
  };
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
    //setTimeDifference(`${hours} hours and ${minutes} minutes`);
  };
  const addToList = () => {
    const length = ordersRows.length;
    setTimeDifference(fromTime, toTime);
    //const totalT = (selectedProduct.type === "h") ?  ((timeDifference*selectedProduct.price)*count) : count*selectedProduct.price;
    const totalT =
      rowData.type === "h"
        ? (timeDifference - pbreak) * price * count
        : price * count;

    // Find the index of the item to update
    const index = ordersRows.findIndex(
      (row) => row.artnr === rowData.artikelnr
    );

    // Create a new array with the updated item
    const updatedItem = {
      artnr: rowData.artikelnr,
      when: when,
      count: count,
      info: info,
      category: rowData.category,
      from: fromTime,
      pbreak: pbreak,
      to: toTime,
      workedHour: timeDifference - pbreak,
      price: price,
      total: totalT,
      type: rowData.type,
    };
    const newRows = [
      ...ordersRows.slice(0, index),
      updatedItem,
      ...ordersRows.slice(index + 1),
    ];

    // Update the state with the new array
    setOrderRows(newRows);

    setToTime("");
    setFromTime("");
    setTotalt("");
    setTimeDifference("");
    setWhen("");
    onClose();
  };

  useEffect(() => {
    console.log(rowData);
    setFromTime(rowData?.from);
    setToTime(rowData?.to);
    setPBreak(rowData?.pbreak);
    setTotalt(rowData?.totalt);
    setCount(rowData?.count);
    setWhen(rowData?.when);
    setInfo(rowData?.info);
    setPrice(rowData?.price);
  }, [rowData]);
  return (
    <>
      <Modal
        scrollBehavior={"inside"}
        isCentered
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay>
          <ModalContent borderRadius={0}>
            <ModalHeader borderBottom={"1px"}>
              Ändra vald artikelrad
            </ModalHeader>
            <ModalBody>
              {rowData && (
                <>
                  <Box>
                    <FormControl>
                      <FormLabel>Datum</FormLabel>
                      <Input
                        border="1px solid black"
                        name="when"
                        type="date"
                        value={when}
                        onChange={(e) => {
                          setWhen(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Antal</FormLabel>
                      <Input
                        border="1px solid black"
                        name="count"
                        value={count}
                        onChange={handleCountChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Info</FormLabel>
                      <Input
                        border="1px solid black"
                        name="info"
                        value={info}
                        onChange={(e) => {
                          setInfo(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Kategori</FormLabel>
                      <Input
                        border="1px solid black"
                        name="category"
                        defaultValue={rowData.category}
                        readOnly
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Från kl</FormLabel>
                      <Input
                        border="1px solid black"
                        name="from"
                        type="time"
                        value={fromTime}
                        onChange={handleFromTimeChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Rast</FormLabel>
                      <Input
                        border="1px solid black"
                        name="break"
                        value={pbreak}
                        onChange={(e) => {
                          setPBreak(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Till kl</FormLabel>
                      <Input
                        border="1px solid black"
                        name="to"
                        type="time"
                        value={toTime}
                        onChange={handleToTimeChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Timpris</FormLabel>
                      <Input
                        border="1px solid black"
                        name="hourprice"
                        value={price}
                      />
                    </FormControl>
                  </Box>
                  <Button onClick={addToList}>Ändra rad</Button>
                </>
              )}
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
}
export default EditArticleRow;
