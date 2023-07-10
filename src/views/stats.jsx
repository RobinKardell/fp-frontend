
import { Flex, Heading, Button, Box, useColorModeValue, Text, Stack, Center, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, FormControl, FormLabel, Input, IconButton, useDisclosure, Card } from '@chakra-ui/react'
import { Next, PageGroup, Paginator, Previous, usePaginator } from 'chakra-paginator';
import 'moment/locale/sv';
import React, { useState } from 'react'
import { useEffect } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { HiArrowLeft, HiArrowRight, HiPlus } from 'react-icons/hi'
import OrderCard from '../components/orders/OrderCard';
import orderReccurencyOptions from '../components/orders/orderReccurencyOptions';
import { Select } from 'chakra-react-select';
import * as API from "../api/api";
import OrderView from '../components/orders/orderview';
import { Link } from 'react-router-dom';
import AddArtikelForm from '../components/settings/add.artikel.form';

function Stats() {
    const { isOpen: deleteIsOpen, onOpen: deleteOnOpen, onClose: deleteOnClose } = useDisclosure()
    const { isOpen: addArikelIsOpen, onOpen: addArikelOnOpen, onClose: addArikelOnClose } = useDisclosure()
    const [products, setProducts] = useState();


    const getProducts = async () => {
        const response = await API.getThings();
        setProducts(response.things)
    }
    useEffect(() => {
        console.log("Inställningar")
        getProducts();
    }, [])

    return (
        <>
            <Flex direction="column" flex="1" overflow="auto" px="10" pt="8">
                <Flex align="center" justify="space-between">
                    <Heading pt="2.5" size="lg" fontWeight="extrabold" mb="6">
                        Statestisk
                    </Heading>
                </Flex>
                <Flex>
                    <Box flex="1" p={4} borderColor="gray.100" borderWidth="3px" borderStyle="solid" rounded="xl">

                        <Box
                            as="section"
                            mx="auto"
                        >
                            
                        </Box>
                    </Box>
                </Flex>
            </Flex>
        </>
    )
}

export default Stats