import {
  useTab,
  useMultiStyleConfig,
  Button,
  Tab,
  TabPanel,
  TabPanels,
  TabList,
  Tabs,
  Box,
  Card,
  SimpleGrid,
  Stack,
  Text,
  Table,
  TableCaption,
  TableContainer,
  Tfoot,
  Tr,
  Thead,
  Td,
  Th,
  Tbody,
  Flex,
  Heading,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Stat } from "./Stat";
import { StatLabel } from "./StatLabel";
import { StatNumber } from "./StatNumber";
import { Link } from "react-router-dom";

import * as API from "../../api/api";
import InfoBox from "./InfoBox";
import MaterialLista from "./Marteriallista";
import RedskapLista from "./redskapslista";
import Franvaro from "./franvaro";
import FranvaroHistory from "./franvaroHistory";
import Avvikelser from "./avvikelser";
import Tasks from "./Tasks";
import Order from "./Order";

function HomeAdmin() {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalBookings: 0,
    totalOrders: 0,
    totalTeams: 0,
    totalEmployees: 0,
    todayBookings: 0,
  });

  const getTotalBookings = async () => {
    //const response = await axiosPrivate.get("/Stat/all");
    const response = await API.getStats();
    setStats(response);
  };
  useEffect(() => {
    getTotalBookings();
  }, []);

  return (
    <Stack>
      {/* Idag */}
      <Box>
        <SimpleGrid
          columns={{
            sm: 4,
            md: 4,
            lg: 4,
          }}
          spacing="2"
          pt="4"
        >
          <InfoBox
            title={"Offert"}
            bg={"lightblue"}
            data={{
              items: ["Egna", "Övriga"],
              datafalt: [<Order />, "övriga"],
            }}
          />
          <InfoBox
            title={"Order / Offert"}
            bg={"lightgreen"}
            data={{
              items: ["Egna", "Övriga"],
              datafalt: [<Order />, "övriga"],
            }}
          />
          <InfoBox
            title={"Order utförd"}
            bg={"turquoise"}
            data={{
              items: ["Egna", "Övriga"],
              datafalt: [<Order />, "övriga"],
            }}
          />
          <InfoBox
            title={"Nyförsäljning"}
            bg={"lightgray"}
            data={{
              items: ["Egna", "Övriga"],
              datafalt: [<Tasks />, "övriga"],
            }}
          />
          <InfoBox
            title={"Avvikelser och Skador"}
            bg={"white"}
            data={{ items: ["Egna"], datafalt: [<Avvikelser />] }}
          />
          <InfoBox
            title={"Ledig - Sjukdom"}
            bg={"red.200"}
            data={{
              items: ["Nu och framåt", "Tidigare"],
              datafalt: [<Franvaro />, <FranvaroHistory />],
            }}
          />
          <InfoBox
            title={"Redskap - Verktyg"}
            bg={"purple.200"}
            data={{ datafalt: [<RedskapLista />] }}
          />
          <InfoBox
            title={"Material - Utlånat"}
            bg={"beige"}
            data={{ datafalt: [<MaterialLista />] }}
          />
        </SimpleGrid>
      </Box>
    </Stack>
  );
}

export default HomeAdmin;
