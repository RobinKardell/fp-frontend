import React, { useState } from "react";
import {
  Box,
  Flex,
  Stack,
  useColorModeValue as mode,
  Image,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { BsFillInboxFill } from "react-icons/bs";
import { HiOfficeBuilding } from "react-icons/hi";
import { MobileMenuButton } from "./dashboard/MobileMenuButton";
import NavBreadcrumb from "./dashboard/NavBreadcrumb";
import { NavSectionTitle } from "./dashboard/NavSectionTitle";
import { ScrollArea } from "./dashboard/ScrollArea";
import { SidebarLink } from "./dashboard/SidebarLink";
import { useMobileMenuState } from "./dashboard/useMobileMenuState";
import { UserInfo } from "./dashboard/UserInfo";
import useAuth from "../hooks/useAuth";
import { Outlet } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import {
  HiBriefcase,
  HiCalendar,
  HiCollection,
  HiLogout,
  HiUserGroup,
  HiUsers,
  HiDocumentReport,
  HiTruck,
  HiOutlineCog,
} from "react-icons/hi";
import TeamList from "./dashboard/TeamList";
import { useEffect } from "react";
import { Roles } from "./roles";
import * as API from "../api/api";
import TimeStampLog from "./dashboard/TimeStampLog";

//ROLES
const ROLES = Roles;

function DashboardLayout() {
  const {
    isOpen: timeIsOpen,
    onOpen: timeOnOpen,
    onClose: timeOnClose,
  } = useDisclosure();
  const [mod, setModules] = useState([]);
  const { auth } = useAuth();
  const logout = useLogout();
  //const firstName = auth.accessTokenData.firstName;
  //const lastName = auth.accessTokenData.lastName;
  //const fullName = firstName + " " + lastName;
  const fullName = auth.user;
  const email = auth.user;
  //const roleId = auth.accessTokenData.roleId;
  const roleId = auth.roles;
  const [avatar, setAvatar] = useState("");
  /*const fetchAvatar = async () => {
    const response = await axiosPrivate("Me/User")
    setAvatar(response.data.data.avatarUrl)
  }*/

  const fetchModuels = async () => {
    const response = await API.getModules("Me/User");
    setModules(response.modules);
  };

  const timelog = async () => {
    const response = await API.logUserTimeStamp();
  };

  const { isOpen, toggle } = useMobileMenuState();
  useEffect(() => {
    //fetchAvatar();
    fetchModuels();
  }, []);

  return (
    <>
      <Flex
        height="100vh"
        bg={mode("black")}
        overflow="hidden"
        sx={{
          "--sidebar-width": "16rem",
        }}
      >
        <Box flex="1" position="relative" transition="left 0.2s">
          <Box maxW="2560px" bg={mode("lightgray")} height="100%">
            <Flex direction="column" height="full">
              <Flex w="full" justify="space-between" align="center">
                <Flex
                  align="center"
                  minH="8"
                  bg="black"
                  textColor={"white"}
                  w="full"
                >
                  <Flex p={"2"} height={"50"} justifyContent={"left"}>
                    <Image
                      height={"100%"}
                      src="./FlyttPoolen_logo_orange_flag_right.png"
                    />
                  </Flex>

                  {roleId === ROLES.Admin && (
                    <>
                      <SidebarLink destination={"/"} icon={<BsFillInboxFill />}>
                        Översikt
                      </SidebarLink>
                      <SidebarLink
                        destination={"/warehouses"}
                        icon={<HiOfficeBuilding />}
                      >
                        Lager
                      </SidebarLink>
                      <SidebarLink
                        destination={"/scheduler3"}
                        icon={<HiCalendar />}
                      >
                        Planeringsschema
                      </SidebarLink>
                      <SidebarLink
                        destination={"/orders"}
                        icon={<HiBriefcase />}
                      >
                        Arbetsordrar
                      </SidebarLink>
                      <SidebarLink
                        destination={"/inspections"}
                        icon={<HiOutlineCog />}
                      >
                        Besiktningar
                      </SidebarLink>
                      <SidebarLink
                        destination={"/customers"}
                        icon={<HiCollection />}
                      >
                        Kunder
                      </SidebarLink>
                      <SidebarLink
                        destination={"/employees"}
                        icon={<HiUsers />}
                      >
                        Anställda
                      </SidebarLink>
                      <SidebarLink destination={"/vehicles"} icon={<HiTruck />}>
                        Fordon
                      </SidebarLink>
                      <SidebarLink
                        destination={"/stats"}
                        icon={<HiDocumentReport />}
                      >
                        Statestik
                      </SidebarLink>
                      <SidebarLink
                        destination={"/settings"}
                        icon={<HiOutlineCog />}
                      >
                        Inställningar
                      </SidebarLink>
                    </>
                  )}
                  {roleId === ROLES.Leader && (
                    <>
                      <SidebarLink destination={"/"} icon={<BsFillInboxFill />}>
                        Översikt
                      </SidebarLink>
                      <SidebarLink
                        destination={"/schedule"}
                        icon={<HiCalendar />}
                      >
                        Mitt Schema
                      </SidebarLink>
                      <SidebarLink
                        destination={"/scheduler"}
                        icon={<HiCalendar />}
                      >
                        Schemaöversikt
                      </SidebarLink>
                      <SidebarLink
                        destination={"/orders"}
                        icon={<HiBriefcase />}
                      >
                        Arbetsordrar
                      </SidebarLink>
                      <SidebarLink
                        destination={"/customers"}
                        icon={<HiCollection />}
                      >
                        Kunder
                      </SidebarLink>
                      <SidebarLink
                        destination={"/teams"}
                        icon={<HiUserGroup />}
                      >
                        Teams
                      </SidebarLink>
                    </>
                  )}
                  {roleId === ROLES.Employee && (
                    <>
                      <SidebarLink destination={"/"} icon={<BsFillInboxFill />}>
                        Översikt
                      </SidebarLink>
                      <SidebarLink
                        destination={"/schedule"}
                        icon={<HiCalendar />}
                      >
                        Mitt Schema
                      </SidebarLink>
                    </>
                  )}
                  {roleId === ROLES.User && (
                    <>
                      <SidebarLink destination={"/"} icon={<BsFillInboxFill />}>
                        Översikt
                      </SidebarLink>
                      <SidebarLink
                        destination={"/schedule"}
                        icon={<HiCalendar />}
                      >
                        Mitt Schema
                      </SidebarLink>
                    </>
                  )}
                  <Stack>
                    <SidebarLink onClick={logout} icon={<HiLogout />}>
                      Logga ut
                    </SidebarLink>
                  </Stack>
                  <Flex>
                    <MobileMenuButton onClick={toggle} isOpen={isOpen} />
                  </Flex>
                </Flex>
              </Flex>
              <Box overflow={"auto"} height={"100%"}>
                <Outlet />
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </>
  );
}

export default DashboardLayout;
