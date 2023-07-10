import { useTab, useMultiStyleConfig, Button, Tab, TabPanel, TabPanels, TabList, Tabs, Box, Card, SimpleGrid, Stack, Text, Table, TableCaption, TableContainer, Tfoot, Tr, Thead, Td, Th, Tbody, Flex, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
function InfoBox(props) {
    const { title, bg,data} = props
    const CustomTab = React.forwardRef((props, ref) => {
        // 1. Reuse the `useTab` hook
        const tabProps = useTab({ ...props, ref })
        const isSelected = !!tabProps['aria-selected']

        // 2. Hook into the Tabs `size`, `variant`, props
        const styles = useMultiStyleConfig('Tabs', tabProps)
        const d = data ? data :"none";
        return (
            <Button textColor={isSelected && 'black'} bgColor={isSelected ? 'white' : bg} borderBottom={isSelected ? 'white' : ''} __css={styles.tab} {...tabProps}>
                {tabProps.children}
            </Button>
        )
    })
    return (
        <Box border={"1px"} bgColor={'white'}>
            <Box>
                <Heading p={2} bgColor={bg} >{title}</Heading>
                <Box >
                    {data 
                    ? 
                    <Tabs isFullWidth >
                        <TabList textColor={'black'}>
                            {data.items && data.items.map((i,In) => (
                                <CustomTab>{i}</CustomTab>
                            ))}
                        </TabList>
                        <Box overflow={'auto'} height="280px">
                        <TabPanels bgColor={'white'}>
                            {data.datafalt && data.datafalt.map((i,In) => (
                                <TabPanel>
                                    {i}
                            </TabPanel>
                            ))}
                            
                        </TabPanels>
                         </Box>
                    </Tabs> 
                    :
                    "ingen data"
                    }
                    
                </Box>
            </Box>
        </Box>
    );
}
export default InfoBox