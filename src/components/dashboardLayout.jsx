import React, { useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  useDisclosure,
  Collapse,
  useColorModeValue as mode,
  Image,
  Stack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import useAuth from "../hooks/useAuth";
import { BsFillInboxFill } from "react-icons/bs";
import { HiOfficeBuilding } from "react-icons/hi";
import { MobileMenuButton } from "./dashboard/MobileMenuButton";
import NavBreadcrumb from "./dashboard/NavBreadcrumb";
import { NavSectionTitle } from "./dashboard/NavSectionTitle";
import { ScrollArea } from "./dashboard/ScrollArea";
import { SidebarLink } from "./dashboard/SidebarLink";
import { useMobileMenuState } from "./dashboard/useMobileMenuState";
import { UserInfo } from "./dashboard/UserInfo";
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

const DashboardLayout = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update isMobile when the window is resized
  window.addEventListener("resize", () => {
    setIsMobile(window.innerWidth <= 768);
  });

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
        direction="column"
        sx={{
          "--sidebar-width": "16rem",
        }}
      >
        <Box bg="black" textColor={"white"} px={4}>
          <Flex h={16} alignItems="center" justifyContent="space-evenly">
            {/* Logo */}
            <Box>
              <Flex p={"2"} height={"50"} justifyContent={"left"}>
                <Image
                  height={"100%"}
                  src="./FlyttPoolen_logo_orange_flag_right.png"
                />
              </Flex>
            </Box>

            {/* Hamburger menu for mobile */}
            {isMobile ? (
              <IconButton
                size="md"
                icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                aria-label="Open menu"
                display={{ md: "none" }}
                onClick={onToggle}
                background="transparent"
              />
            ) : null}

            {/* Navigation links for large screens */}
            <Flex alignItems="center" display={{ base: "none", md: "flex" }}>
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
                  <SidebarLink destination={"/orders"} icon={<HiBriefcase />}>
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
                  <SidebarLink destination={"/employees"} icon={<HiUsers />}>
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
                  <SidebarLink destination={"/schedule"} icon={<HiCalendar />}>
                    Mitt Schema
                  </SidebarLink>
                  <SidebarLink destination={"/scheduler"} icon={<HiCalendar />}>
                    Schemaöversikt
                  </SidebarLink>
                  <SidebarLink destination={"/orders"} icon={<HiBriefcase />}>
                    Arbetsordrar
                  </SidebarLink>
                  <SidebarLink
                    destination={"/customers"}
                    icon={<HiCollection />}
                  >
                    Kunder
                  </SidebarLink>
                  <SidebarLink destination={"/teams"} icon={<HiUserGroup />}>
                    Teams
                  </SidebarLink>
                </>
              )}
              {roleId === ROLES.Employee && (
                <>
                  <SidebarLink destination={"/"} icon={<BsFillInboxFill />}>
                    Översikt
                  </SidebarLink>
                  <SidebarLink destination={"/schedule"} icon={<HiCalendar />}>
                    Mitt Schema
                  </SidebarLink>
                </>
              )}
              {roleId === ROLES.User && (
                <>
                  <SidebarLink destination={"/"} icon={<BsFillInboxFill />}>
                    Översikt
                  </SidebarLink>
                  <SidebarLink destination={"/schedule"} icon={<HiCalendar />}>
                    Mitt Schema
                  </SidebarLink>
                </>
              )}
              <Stack>
                <SidebarLink onClick={logout} icon={<HiLogout />}>
                  Logga ut
                </SidebarLink>
              </Stack>
            </Flex>
          </Flex>
        </Box>

        {/* Sidebar for mobile */}
        <Drawer placement="left" onClose={onToggle} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent bg="black" textColor="white">
            <DrawerHeader>
              <DrawerCloseButton />
            </DrawerHeader>
            <DrawerBody>
              {roleId === ROLES.Admin && (
                <>
                  <SidebarLink
                    destination={"/"}
                    icon={<BsFillInboxFill />}
                    onLinkClick={onToggle}
                  >
                    Översikt
                  </SidebarLink>
                  <SidebarLink
                    destination={"/warehouses"}
                    icon={<HiOfficeBuilding />}
                    onLinkClick={onToggle}
                  >
                    Lager
                  </SidebarLink>
                  <SidebarLink
                    destination={"/scheduler3"}
                    icon={<HiCalendar />}
                    onLinkClick={onToggle}
                  >
                    Planeringsschema
                  </SidebarLink>
                  <SidebarLink
                    destination={"/orders"}
                    icon={<HiBriefcase />}
                    onLinkClick={onToggle}
                  >
                    Arbetsordrar
                  </SidebarLink>
                  <SidebarLink
                    destination={"/inspections"}
                    icon={<HiOutlineCog />}
                    onLinkClick={onToggle}
                  >
                    Besiktningar
                  </SidebarLink>
                  <SidebarLink
                    destination={"/customers"}
                    icon={<HiCollection />}
                    onLinkClick={onToggle}
                  >
                    Kunder
                  </SidebarLink>
                  <SidebarLink
                    destination={"/employees"}
                    icon={<HiUsers />}
                    onLinkClick={onToggle}
                  >
                    Anställda
                  </SidebarLink>
                  <SidebarLink
                    destination={"/vehicles"}
                    icon={<HiTruck />}
                    onLinkClick={onToggle}
                  >
                    Fordon
                  </SidebarLink>
                  <SidebarLink
                    destination={"/stats"}
                    icon={<HiDocumentReport />}
                    onLinkClick={onToggle}
                  >
                    Statestik
                  </SidebarLink>
                  <SidebarLink
                    destination={"/settings"}
                    icon={<HiOutlineCog />}
                    onLinkClick={onToggle}
                  >
                    Inställningar
                  </SidebarLink>
                </>
              )}
              {roleId === ROLES.Leader && (
                <>
                  <SidebarLink
                    destination={"/"}
                    icon={<BsFillInboxFill />}
                    onLinkClick={onToggle}
                  >
                    Översikt
                  </SidebarLink>
                  <SidebarLink
                    destination={"/schedule"}
                    icon={<HiCalendar />}
                    onLinkClick={onToggle}
                  >
                    Mitt Schema
                  </SidebarLink>
                  <SidebarLink
                    destination={"/scheduler"}
                    icon={<HiCalendar />}
                    onLinkClick={onToggle}
                  >
                    Schemaöversikt
                  </SidebarLink>
                  <SidebarLink
                    destination={"/orders"}
                    icon={<HiBriefcase />}
                    onLinkClick={onToggle}
                  >
                    Arbetsordrar
                  </SidebarLink>
                  <SidebarLink
                    destination={"/customers"}
                    icon={<HiCollection />}
                    onLinkClick={onToggle}
                  >
                    Kunder
                  </SidebarLink>
                  <SidebarLink
                    destination={"/teams"}
                    icon={<HiUserGroup />}
                    onLinkClick={onToggle}
                  >
                    Teams
                  </SidebarLink>
                </>
              )}
              {roleId === ROLES.Employee && (
                <>
                  <SidebarLink
                    destination={"/"}
                    icon={<BsFillInboxFill />}
                    onLinkClick={onToggle}
                  >
                    Översikt
                  </SidebarLink>
                  <SidebarLink
                    destination={"/schedule"}
                    icon={<HiCalendar />}
                    onLinkClick={onToggle}
                  >
                    Mitt Schema
                  </SidebarLink>
                </>
              )}
              {roleId === ROLES.User && (
                <>
                  <SidebarLink
                    destination={"/"}
                    icon={<BsFillInboxFill />}
                    onLinkClick={onToggle}
                  >
                    Översikt
                  </SidebarLink>
                  <SidebarLink
                    destination={"/schedule"}
                    icon={<HiCalendar />}
                    onLinkClick={onToggle}
                  >
                    Mitt Schema
                  </SidebarLink>
                </>
              )}
            </DrawerBody>
            <DrawerFooter borderTopWidth="1px">
              <Stack>
                <SidebarLink onClick={logout} icon={<HiLogout />}>
                  Logga ut
                </SidebarLink>
              </Stack>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <Box bg={mode("lightgray")} overflow={"auto"} height={"100%"}>
          <Outlet />
        </Box>
      </Flex>
    </>
  );
};

export default DashboardLayout;
