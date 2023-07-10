import { Box, Button, Flex, FormControl, FormLabel, Grid, GridItem, Heading, Input, Stack, StackDivider, useColorModeValue } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import CustomerDelete from '../components/customer/customer.delete';
import CustomerForm from '../components/customer/customer.form';
import CustomerLocationForm from '../components/customer/customer.form.location';
import CustomerNotesForm from '../components/customer/customer.form.notes';
import FieldGroup from '../components/customer/FieldGroup';
import * as API from "../api/api";
import { Select } from 'chakra-react-select';
import Tasks from '../components/customer/customer.task';

function Customer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState({});

  const getCustomer = async () => {
    try {
      const response = await API.getClientInfo(id);
      setCustomer(response.data)
      //setCustomer({ ...response.data })
    } catch (error) {
    }
  }

  useEffect(() => {
    getCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Flex direction="column" flex="1" overflow="auto" px="10" pt="8">
        <Flex align="center" justify="space-between">
          <Heading pt="2.5" size="lg" fontWeight="extrabold" mb="6">
            {customer?.name}
          </Heading>
        </Flex>
        <Box flex="1" borderColor="gray.100" borderWidth="3px" borderStyle="solid" rounded="xl">
          <Box
            //bg={useColorModeValue('gray.100', 'gray.800')}
            px={{
              base: '6',
              md: '8',
            }}
            h="full"
            py="4"
          >
            <Box
              as="section"
              mx="auto"
            >
              <Stack spacing="4" divider={<StackDivider />}>
                <Grid
                  templateColumns='repeat(2, 1fr)'
                  gap={4}
                >
                  <GridItem>
                    {/* Customer Information Form */}
                    <FieldGroup title={"Uppgifter"}>
                      <CustomerForm customerData={customer} getCustomer={getCustomer} />
                    </FieldGroup>
                    {/* Customer Location Form */}
                    <FieldGroup title={"Plats"}>
                      <CustomerLocationForm customerData={customer} getCustomer={getCustomer} />
                    </FieldGroup>
                    {/* Customer Notes Form */}
                    <FieldGroup title={"Anteckningar"}>
                      <CustomerNotesForm customerData={customer} getCustomer={getCustomer} />
                    </FieldGroup>
                    <FieldGroup title={"Ta bort"}>
                      <CustomerDelete id={customer.id} />
                    </FieldGroup>
                  </GridItem>
                  <GridItem>
                    <Heading>Prislista</Heading>
                    <Table>
                      <Thead>
                        <Tr>
                          <Th>Aritkel</Th>
                          <Th>Pris</Th>
                          <Th>Typ</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr>
                          <Td>Chafför</Td>
                          <Td>250</Td>
                          <Td>tim</Td>
                        </Tr>
                        <Tr>
                          <Td>Express Arbetare</Td>
                          <Td>300</Td>
                          <Td>tim</Td>
                        </Tr>
                        <Tr>
                          <Td>Piano Tillägg</Td>
                          <Td>204</Td>
                          <Td>st</Td>
                        </Tr>
                      </Tbody>
                    </Table>

                    <Heading>Uppdragslista</Heading>
                    <Table>
                      <Thead>
                        <Tr>
                          <Th>Nummer</Th>
                          <Th>Age</Th>
                          <Th>Email</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr>
                          <Td>John</Td>
                          <Td>30</Td>
                          <Td>john@example.com</Td>
                        </Tr>
                        <Tr>
                          <Td>Jane</Td>
                          <Td>25</Td>
                          <Td>jane@example.com</Td>
                        </Tr>
                      </Tbody>
                    </Table>

                    <Tasks />
                    
                  </GridItem>
                </Grid>

              </Stack>
            </Box>
          </Box>
        </Box>
      </Flex>
    </>
  )
}

export default Customer