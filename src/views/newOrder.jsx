import {
  Flex,
  Heading,
  Box,
  Text,
  Button,
  Card,
  Input,
} from "@chakra-ui/react";
import OrderView from "../components/orders/orderview";
import React, { useState } from "react";
import { useEffect } from "react";
import * as API from "../api/api";
import InspectionCard from "../components/inspection/inspectionCard";
function NewOrder() {
  const [volym, setVolym] = useState(0);
  const [orderID, setOrderID] = useState(0);
  useEffect(() => {
    !orderID && console.log("neworder");
  }, []);
  return (
    <Flex direction="column" flex="1" overflow="auto" px="10" pt="8">
      <Flex align="center" justify="space-between">
        <Heading pt="2.5" size="lg" fontWeight="extrabold" mb="6">
          Arbetsordrar
        </Heading>
      </Flex>
      <Flex>
        <Box
          flex="1"
          borderColor="gray.100"
          borderWidth="3px"
          borderStyle="solid"
          rounded="xl"
        >
          <Box
            //bg={useColorModeValue('gray.100', 'gray.800')}
            px={{
              base: "6",
              md: "8",
            }}
            h="full"
            py="4"
          >
            <Flex>
              <Box px={4} flex={0.6}>
                <InspectionCard select={true} volym={setVolym} />
              </Box>
              <Box flex={"1"}>
                <OrderView totalVolume={volym} onCustomer={2} />
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default NewOrder;
