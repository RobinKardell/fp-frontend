import { Box, Flex, Stack, Text, Textarea, Button, Badge, useDisclosure } from '@chakra-ui/react'
import { motion } from 'framer-motion';
import React from 'react'
import { BsArrowRepeat } from "react-icons/bs"
import { HiOutlineCalendar, HiOutlineClock, HiOutlineCollection, HiOutlineColorSwatch, HiOutlineMap, HiOutlineSun, HiOutlineUserGroup, HiOutlineUsers, HiUser, HiUsers } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/sv';

function OrderCard(props) {
    
    const { order, openDeleteModal } = props;
    const navigate = useNavigate();

    const translateInterval = {
        "once": "Aldrig",
        "every-day": "Dagligen",
        "every-week": "Varje vecka",
        "every-second-week": "Varannan vecka",
        "every-third-week": "Var tredje vecka",
        "every-fourth-week": "Var fjärde vecka",
    }

    return (
        <>
            <Box border="4px" borderColor={order.active <= 0 ? "red.200" : "brand.primary"} initial={{ opacity: 0.3 }} animate={{ opacity: 1 }} as={motion.div} boxShadow="base" bg="white" rounded="xl" p="4" key={order.id}>
                <Stack>
                    <Text fontSize={"xl"} fontWeight="semibold">{order.title}</Text>
                    <Stack direction={{ sm: "column", md: "row" }} spacing="2">
                        {order.recurrencyInterval.id > 1 && <Badge p="1">Återkommande</Badge>}
                        {order.recurrencyInterval.id === 1 && <Badge p="1">Engång</Badge>}
                        {order.recurrencyInterval.id > 1 && <Badge p="1">{translateInterval[`${order.recurrencyInterval.identifier}`]}</Badge>}
                        {/*order.active ? <Badge p="1" colorScheme="green">Aktiv</Badge> : <Badge p="1" colorScheme="red">Inaktiv</Badge>*/}
                    </Stack>
                    <Flex align="center">
                        <BsArrowRepeat size="22" />
                        <Text ml="1.5">{translateInterval[`${order.recurrencyInterval.identifier}`]}</Text>
                    </Flex>

                    {/* Non recurring, single */}
                    {order.recurrencyInterval.id == 1 ? (
                        <Flex align="center">
                            <HiOutlineCalendar size="22" />
                            {order.allDay ? (
                                <Text ml="1.5">{moment(order.start).locale("sv").format("LL")} - heldag</Text>
                            ) : (
                                <Text ml="1.5">{moment(order.start).locale("sv").format("LLLL")} → {moment(order.end).locale("sv").format("LT")}</Text>
                            )}

                        </Flex>
                    ) : (
                        <Flex align="center">
                            <HiOutlineCalendar size="22" />
                            {order.allDay ? (
                                <Text ml="1.5">{moment(order.start).locale("sv").format("dddd")} - heldag</Text>
                            ) : (
                                <Text ml="1.5">{moment(order.start).locale("sv").format("dddd LT")} → {moment(order.end).locale("sv").format("LT")}</Text>
                            )}

                        </Flex>
                    )}


                    <Flex align="center">
                        <HiOutlineCollection size="22" />
                        <Text ml="1.5">{order.customer?.name}</Text>
                    </Flex>
                    {/*{order.users.length > 0 && (
                        <Flex align="center">
                            <HiOutlineUsers size="22" />
                            <Text ml="1.5">{order.users?.map(user =>
                                <Text>{user.firstName + " " + user.lastName}, </Text>
                            )}</Text>
                        </Flex>
                    )}
                    {order.teams.length > 0 && (
                        <Flex align="center">
                            <HiOutlineUserGroup size="22" />
                            <Text ml="1.5">{order.teams?.map(team =>
                                <Text>{team?.name}, </Text>
                            )}</Text>
                        </Flex>
                    )}*/}
                    <Flex align="center">
                        <HiOutlineMap size="22" />
                        <Text ml="1.5">{order.customer.location.streetAdress}, {order.customer.location.postalCode}, {order.customer.location.city}</Text>
                    </Flex>
                    <Flex align="center">
                        <HiOutlineColorSwatch size="22" />
                        <Box ml="1.5" bg={order.color} height={5} width={5} rounded="full" />
                    </Flex>
                    {order.notes.length > 0 && (
                        <Flex flexDir="column">
                            <Textarea value={order.notes} readOnly />
                        </Flex>
                    )}
                    <Button colorScheme={"red"} onClick={() => openDeleteModal(order.id)} size="sm">Ta Bort</Button>
                </Stack>
            </Box>
            
        </>
    )
}

export default OrderCard