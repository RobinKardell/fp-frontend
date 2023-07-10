import { Checkbox, useTab, useMultiStyleConfig, Button, Tab, TabPanel, TabPanels, TabList, Tabs, Box, Card, SimpleGrid, Stack, Text, Table, TableCaption, TableContainer, Tfoot, Tr, Thead, Td, Th, Tbody, Flex, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import moment from 'moment';
function InfoBoxPlan(props) {
    const { title, man, fordon, lev, bookings, viewDate } = props
    const CustomTab = React.forwardRef((props, ref) => {
        // 1. Reuse the `useTab` hook
        const tabProps = useTab({ ...props, ref })
        const isSelected = !!tabProps['aria-selected']

        // 2. Hook into the Tabs `size`, `variant`, props
        const styles = useMultiStyleConfig('Tabs', tabProps)

        return (
            <Button textColor={isSelected && 'black'} bgColor={isSelected ? 'white' : 'lightblue'} borderBottom={isSelected ? 'white' : ''} __css={styles.tab} {...tabProps}>
                {tabProps.children}
            </Button>
        )
    })
    const [checkedItems, setCheckedItems] = React.useState([false, false])

    const allChecked = checkedItems.every(Boolean)
    const isIndeterminate = checkedItems.some(Boolean) && !allChecked
    return (
        <Box>
            <Box>
                <Box border={"1px"} >
                    <Tabs isFullWidth >
                        <TabList textColor={'black'}>
                            <CustomTab>Manskap</CustomTab>
                            <CustomTab>Fordon</CustomTab>
                            <CustomTab>Lev.</CustomTab>
                        </TabList>
                        <Box overflow={'auto'} height="280px">
                            <TabPanels>
                                <TabPanel m={0} p={0}><Flex>
                                    <Box p={0} w={"50%"} bgColor={'white'}>
                                    <Table>
                                        {man && man?.map((employee) => {
                                //console.log(employee)
                                const { id, firstname, lastname, team, roleid, roleName } = employee
                                const selectedDayUserBookings = bookings.filter(booking =>
                                    moment(booking.start).isSame(viewDate, 'day') &&
                                    booking.users.some(user => user.id === id)
                                );
                                const backgroundColor = (viewDate && selectedDayUserBookings.length > 0) ? "green" : "white";

                                return (
                                    <Tr key={id} backgroundColor={backgroundColor}>
                                        <Td>{firstname + " " + lastname}</Td>
                                    </Tr>
                                )
                            })}</Table>
                                    </Box>
                                    <Box>
                                        <Stack pl={6} mt={4} spacing={1}>
                                            <Checkbox
                                                isChecked={checkedItems['fast']}
                                                onChange={(e) => setCheckedItems([checkedItems['fast'], e.target.checked])}
                                            >
                                                Fast anställda
                                            </Checkbox>
                                            <Checkbox
                                                isChecked={checkedItems[18]}
                                                onChange={(e) => setCheckedItems([checkedItems[18], e.target.checked])}
                                            >
                                                Inhyrd
                                            </Checkbox>
                                            <Checkbox
                                                isChecked={checkedItems[2]}
                                                onChange={(e) => setCheckedItems([checkedItems[2], e.target.checked])}
                                            >
                                                Sökt jobb
                                            </Checkbox>
                                            <Checkbox
                                                isChecked={checkedItems[3]}
                                                onChange={(e) => setCheckedItems([checkedItems[3], e.target.checked])}
                                            >
                                                Svarte Petter
                                            </Checkbox>
                                        </Stack>
                                        <Stack pl={6} mt={4} spacing={1}>
                                            <Checkbox
                                                isChecked={checkedItems[4]}
                                                onChange={(e) => setCheckedItems([checkedItems[4], e.target.checked])}
                                            >
                                                Packmästare
                                            </Checkbox>
                                            <Checkbox
                                                isChecked={checkedItems[5]}
                                                onChange={(e) => setCheckedItems([checkedItems[5], e.target.checked])}
                                            >
                                                Bohag
                                            </Checkbox>
                                            <Checkbox
                                                isChecked={checkedItems[6]}
                                                onChange={(e) => setCheckedItems([checkedItems[6], e.target.checked])}
                                            >
                                                Kontor
                                            </Checkbox>
                                            <Checkbox
                                                isChecked={checkedItems[7]}
                                                onChange={(e) => setCheckedItems([checkedItems[7], e.target.checked])}
                                            >
                                                Tungarbetare
                                            </Checkbox>
                                        </Stack>
                                        <Stack pl={6} mt={4} spacing={1}>
                                            <Checkbox
                                                isChecked={checkedItems[8]}
                                                onChange={(e) => setCheckedItems([checkedItems[8], e.target.checked])}
                                            >Truckkort
                                            </Checkbox>
                                            <Checkbox
                                                isChecked={checkedItems[9]}
                                                onChange={(e) => setCheckedItems([checkedItems[9], e.target.checked])}
                                            >
                                                Har körkort
                                            </Checkbox> <Checkbox
                                                isChecked={checkedItems[10]}
                                                onChange={(e) => setCheckedItems([checkedItems[10], e.target.checked])}
                                            >
                                                Har lastbilskort
                                            </Checkbox>
                                        </Stack>
                                        <Stack pl={6} mt={4} spacing={1}>
                                            <Checkbox
                                                isChecked={checkedItems[11]}
                                                onChange={(e) => setCheckedItems([checkedItems[11], e.target.checked])}
                                            >
                                                Kan jobba helg
                                            </Checkbox>
                                            <Checkbox
                                                isChecked={checkedItems[12]}
                                                onChange={(e) => setCheckedItems([checkedItems[12], e.target.checked])}
                                            >
                                                Visa dolda
                                            </Checkbox>
                                        </Stack>

                                    </Box>
                                </Flex>
                                </TabPanel>
                                <TabPanel>
                                    {fordon && fordon}
                                </TabPanel>
                                <TabPanel>
                                    {lev && lev}
                                </TabPanel>
                            </TabPanels>
                        </Box>
                    </Tabs>
                </Box>
            </Box>
        </Box>
    );
}
export default InfoBoxPlan