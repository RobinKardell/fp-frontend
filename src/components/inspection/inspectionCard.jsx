import {
  Select,
  Flex,
  Heading,
  Box,
  Text,
  Button,
  Card,
  Input,
  Image,
  Grid,
  GridItem,
  Center,
} from "@chakra-ui/react";
import { set } from "date-fns/esm";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import * as API from "../../api/api";
import { id } from "date-fns/locale";
import ProductList from "../ProductList";

function InspectionCard(props) {
  const { volym, create, close, getList, edit, Eid, select } = props;
  const [inSpecList, setInspecList] = useState([]);
  const [selected, setSelected] = useState(0);
  const [totalV, setTotalV] = useState(0);
  const [inspectionName, setInspectionName] = useState("Besiktings underlag");
  const [selectedProductId, setSelectedProductId] = useState(0);
  const [optionValue, setOptionValue] = useState("");
  console.log("optionValue: ", optionValue);
  const [lists, setLists] = useState([]);
  const trucks = Math.ceil(totalV / 45);
  const expressWorker = Math.ceil(totalV / 50);
  const packMaster = Math.ceil(totalV / 25);
  const [products, setProducts] = useState([]);
  const [savedRooms, setSavedRooms] = useState([]);
  const [editIndexID, setEditIndexID] = useState(null);

  // const getProducts = async () => {
  //   const response = await API.getThings();
  //   setProducts(response.things);
  // };

  const getProducts = async () => {
    const response = await API.getThings();
    const updatedProducts = response.things.map((product) => ({
      ...product,
      count: 0,
    }));
    setProducts(updatedProducts);
  };

  const getInspecList = async () => {
    const response = await API.getInspectionList();
    console.log("Response", response);
    setInspecList(response.data);
  };

  const getInspec = async () => {
    console.log("get");
    const response = await API.getInspection(Eid);
    setInspectionName(response.Name);
    setLists(response.data);
  };

  const seted = async () => {
    const response = await API.getInspection(selected);
    setInspectionName(response.Name);
    setLists(response.data);
  };

  useEffect(() => {
    getProducts();
    select && getInspecList();
    edit && getInspec();
  }, []);

  useEffect(() => {
    selected && seted();
  }, [selected]);

  /* useEffect(() => {
        if (selected !== 0) {
          seted();
        }
      }, [selected])*/

  const totalVolume = useMemo(() => {
    return lists?.reduce((acc, list) => {
      const total =
        list &&
        acc + list?.items?.reduce((total, item) => total + item.volume, 0);
      setTotalV(total);
      !create && !edit && volym(total);
      return total;
    }, 0);
  }, [lists, create, edit, volym]);

  /*const totalVolume = lists && lists?.reduce((acc, list) => {
        const total = list && acc + list?.items?.reduce((total, item) => total + item.volume, 0);
        setTotalV(total);
        (!create && !edit ) && volym(total)
        return total;
    }, 0);*/

  /*const addNewList = () => {
        const length = lists ? lists.length : 0;
        const newlist = [{ name: 'List ' + length, items: [] }]
        lists && newlist.push(...lists)
        setLists(newlist)
    }
    
    const addNewList = () => {
        const length = lists ? lists.length : 0;
        const newlist = [{ name: 'List ' + length, items: [] }];
        lists && newlist.push(...lists);
        setLists(newlist);
    }*/

  const addNewList = useCallback(() => {
    const length = lists ? lists.length : 0;
    const newlist = [{ name: "List " + length, items: [] }];
    lists && newlist.push(...lists);
    setLists(newlist);
  }, [lists, setLists]);
  const addItem = (listIndex, item) => {
    const newLists = [...lists];
    const existingItemIndex = newLists[listIndex].items.findIndex(
      (i) => i.id === item.id
    );
    if (existingItemIndex !== -1) {
      //update

      newLists[listIndex].items[existingItemIndex].volume += item.volume;
      newLists[listIndex].items[existingItemIndex].count += item.count;
    } else {
      //add
      newLists[listIndex].items.push(item);
    }

    setLists(newLists);
  };

  const removeItem = (listIndex, itemIndex) => {
    const newLists = [...lists];
    const foundObj = products.find(
      (el) => el.id === newLists[listIndex].items[itemIndex].id
    );
    if (newLists[listIndex].items[itemIndex].count > 1) {
      newLists[listIndex].items[itemIndex].volume -= foundObj.volym;
      newLists[listIndex].items[itemIndex].count -= 1;
    } else {
      newLists[listIndex].items.splice(itemIndex, 1);
    }
    setLists(newLists);
  };

  const removeList = (listindex) => {
    const newLists = [...lists];
    newLists.splice(listindex, 1);
    setLists(newLists);
  };

  const addd = (list, id) => {
    const foundObj = products.find((el) => el.id === parseInt(id));
    if (foundObj) {
      addItem(list, {
        id: foundObj.id,
        name: foundObj.name,
        volume: foundObj.volym,
        count: 1,
      });
    } else {
      return null;
    }
  };

  const updateProduct = (index, type) => {
    const productTemp = [...products];
    if (type === "ADD") {
      productTemp[index].count += 1;
    } else {
      productTemp[index].count -= 1;
    }
    setProducts(productTemp);
  };

  // const handleSaveRoomData = () => {
  //   const filterCountProduct = products.filter((product) => product.count > 0);
  //   const roomData = {
  //     roomname: optionValue,
  //     products: filterCountProduct,
  //   };

  //   // Reset count to 0 for all products
  //   const updatedProducts = products.map((product) => ({
  //     ...product,
  //     count: 0,
  //   }));

  //   setSavedRooms([...savedRooms, roomData]);
  //   setOptionValue("");
  //   setProducts(updatedProducts);
  // };

  const handleSaveRoomData = () => {
    const filterCountProduct = products.filter((product) => product.count > 0);
    const roomData = {
      roomname: optionValue,
      products: filterCountProduct,
    };

    // Combine existing savedRooms and new roomData
    const updatedRooms = [...savedRooms, roomData];

    setSavedRooms(updatedRooms);
    setOptionValue("");
    setProducts(products.map((product) => ({ ...product, count: 0 })));
  };

  const handleEditProduct = (index) => {
    const selectedRoom = savedRooms[index];
    const updatedProducts = products.map((product) => {
      const foundProduct = selectedRoom.products.find(
        (p) => p.id === product.id
      );
      if (foundProduct) {
        return { ...product, count: foundProduct.count };
      }
      return product;
    });
    setEditIndexID(index);
    setProducts(updatedProducts);
  };

  // const handleSaveUpdateProduct = (index) => {
  //   if (index !== null) {
  //     const updatedRooms = [...savedRooms];
  //     console.log("updatedRooms: ", updatedRooms);
  //     const filterCountProduct = products.filter(
  //       (product) => product.count > 0
  //     );
  //     const updatedRoom = {
  //       roomname: optionValue,
  //       products: filterCountProduct,
  //     };
  //     console.log("updatedRoom: ", updatedRoom);
  //     updatedRooms[index] = updatedRoom;
  //     setSavedRooms(updatedRooms);
  //   }
  // };

  const handleSaveUpdateProduct = (index) => {
    if (editIndexID !== null) {
      const updatedRooms = [...savedRooms];
      const filterCountProduct = products.filter(
        (product) => product.count > 0
      );
      updatedRooms[editIndexID].products = filterCountProduct;
      setSavedRooms(updatedRooms);
    }
  };

  const SaveInspection = () => {
    const data = { InspectionName: inspectionName, InspectionData: lists };
    const response = API.addInspection(data);
    getList();
    close();
  };
  const EditInspection = () => {
    const data = {
      Id: Eid,
      InspectionName: inspectionName,
      InspectionData: lists,
    };
    const response = API.editInspection(data);
    getList();
    close();
  };

  return (
    <>
      <Box padding={"20px"}>
        <Heading>Besiktingsmall</Heading>
        <Text my={"10px"}>Sammanfattning</Text>

        {/* List Boxes */}
        <Flex gap={"20px"} sx={{ flexDirection: "row" }}>
          {savedRooms.length === 0 ? (
            <Box>
              <Text fontSize="xl" fontWeight="bold">
                No data Avalable
              </Text>
            </Box>
          ) : (
            savedRooms.map((room, index) => (
              <Card
                key={index}
                border={"1px solid black"}
                onClick={() => handleEditProduct(index)}
                padding={"10px"}
                backgroundColor={room.index === editIndexID ? "black" : "white"}
              >
                {console.log("room.index", room.index)}
                <Text fontSize="xl" fontWeight="bold">
                  {room.roomname}
                </Text>
                {room.products.map((product, productIndex) => (
                  <Box key={productIndex}>
                    {product.count > 0 && (
                      <Text>
                        {product.count} {product.name}
                      </Text>
                    )}
                  </Box>
                ))}
              </Card>
            ))
          )}
        </Flex>

        {/* Save Button and Select Room */}
        <Flex
          my={"10px"}
          gap={"100px"}
          alignItems={"center"}
          direction={"row"}
          sx={{
            "@media screen and (max-width: 768px)": {
              flexDirection: "column",
            },
          }}
        >
          <Box>
            <Text fontSize="md" fontWeight={"bold"}>
              Totalt: 28m<sup>3</sup>
            </Text>
            <Flex
              my={"10px"}
              direction={{ base: "column", md: "row" }}
              gap={"30px"}
            >
              <Flex gap={"20px"}>
                {/* <Button onClick={handleSaveUpdateProduct}>Save Room</Button> */}
                <Button onClick={handleSaveUpdateProduct}>Save Room</Button>
              </Flex>
              <Flex direction={{ base: "column", md: "row" }} gap={"20px"}>
                <Button onClick={handleSaveRoomData}>Add Room</Button>
                <Button>Reset</Button>
                <Select
                  placeholder="Select Room"
                  onChange={(e) => setOptionValue(e.target.value)}
                >
                  <option value="kok">kok</option>
                  <option value="vardagsrum">vardagsrum</option>
                  <option value="i lall">i lall</option>
                  <option value="sovrum">sovrum</option>
                  <option value="kallare">kallare</option>
                </Select>
              </Flex>
            </Flex>
          </Box>
          <Box>
            <Input type="file" />
          </Box>
        </Flex>

        {/* Image Render Box */}
        <Box my={"25px"}>
          <Grid templateColumns="repeat(5, 1fr)" gap={6}>
            <Box my={"25px"}>
              <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                {products.map((product, index) => {
                  return (
                    <ProductList
                      product={product}
                      index={index}
                      updateProduct={updateProduct}
                    />
                  );
                })}
              </Grid>
            </Box>
          </Grid>
        </Box>

        {/* {select && (
          <>
            <Select onChange={(e) => setSelected(e.target.value)}>
              <option value="">Select a product</option>
              {inSpecList &&
                inSpecList.map((is, i) => (
                  <option value={is.Id}>
                    {is.Id} {is.Name}
                  </option>
                ))}
            </Select>
          </>
        )}
        <Input
          value={inspectionName}
          onChange={(e) => setInspectionName(e.target.value)}
          type="text"
        /> */}

        <Box flex={"1"}>
          {/* <Button onClick={addNewList}>Lägg till rum</Button> */}

          {/* <Flex>
            {lists?.map((list, index) => (
              <Card p={4} m={3} key={index}>
                <h2>
                  {list.name}
                  <Button onClick={() => removeList(index)}>Ta bort rum</Button>
                </h2>
                {list.items.map((item, itemIndex) => (
                  <Card p="3" m="1" key={itemIndex}>
                    {item.name} - {item.volume} m3 . Antal {item.count}
                    <Button onClick={() => removeItem(index, itemIndex)}>
                      Ta bort
                    </Button>
                  </Card>
                ))}
                <p>
                  Total volym:{" "}
                  {list.items.reduce((acc, item) => acc + item.volume, 0)} m3
                </p>
                <Select
                  value={selectedProductId}
                  onChange={(event) => setSelectedProductId(event.target.value)}
                >
                  <option value="">Select a product</option>
                  {products &&
                    products.map((product, pi) => (
                      <option value={product.id}>{product.name}</option>
                    ))}
                </Select>
                <Button
                  disabled={!selectedProductId}
                  onClick={() => {
                    addd(index, selectedProductId);
                  }}
                >
                  Lägg till
                </Button>
              </Card>
            ))}
          </Flex> */}

          <p>Total volume across all lists: {totalVolume} m3</p>
          {create && <Button onClick={SaveInspection}>Spara</Button>}
          {edit && <Button onClick={EditInspection}>Uppdatera</Button>}
        </Box>
        <Box>
          <Card>Antal Lastbilar: {trucks}</Card>
          <Card>Antal chafförer: {trucks}</Card>
          <Card>Antal expressarbetare: {expressWorker}</Card>
          <Card>Antal PackMästare: {packMaster}</Card>
        </Box>
      </Box>
    </>
  );
}
export default InspectionCard;
