import { Box, Button, Center, Flex, GridItem, Text } from "@chakra-ui/react";
import React from "react";

const ProductList = ({ product, index, updateProduct }) => {
  return (
    <GridItem key={product.id}>
      <Box width={"200px"}>
        <Center
          bg="gray"
          h="100px"
          color="white"
          width={"200px"}
          height={"150px"}
        >
          {product.name}
        </Center>
        <Flex
          justifyContent={"space-between"}
          my={"10px"}
          alignItems={"center"}
        >
          <Button
            isDisabled={product.count === 0 ? true : false}
            onClick={() => updateProduct(index, "MINUS")}
          >
            -
          </Button>
          <Text>{product.count}</Text>
          <Button onClick={() => updateProduct(index, "ADD")}>+</Button>
        </Flex>
      </Box>
    </GridItem>
  );
};

export default ProductList;
