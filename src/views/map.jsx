import {
  Image,
  useMediaQuery,
  Flex,
  Box,
  Text,
  Heading,
  useColorModeValue,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import * as API from "../api/api";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
function Map() {
  const position = [51.505, -0.09];
  return (
    <Flex direction="column" flex="1" px="10" pt="8">
      <Flex align="center" justify="space-between">
        <Heading pt="2.5" size="lg" fontWeight="extrabold" mb="6">
          Körjournal
        </Heading>
      </Flex>
      <Box flex="1" p="2" rounded="xl" h="full">
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
        ,
      </Box>
    </Flex>
  );
}
export default Map;
