import { HTML5Backend } from "react-dnd-html5-backend";

import React, { useState, memo } from 'react'
import { Box, Container, Heading, SimpleGrid, Grid,GridItem } from "@chakra-ui/react";
import WeekView from "../components/scheduler3/weekview";

function Scheduler3() {

    return (
        <>
            <Heading
                fontSize={{ base: '4xl', sm: '5xl', md: '6xl' }}
                fontWeight="bold"
                textAlign="center"
                bgGradient="linear(to-l, #000000, #000000)"
                bgClip="text"
                mt={4}
            >
                Planeringsschema
            </Heading>
            <WeekView />
        </>
    )

}
export default Scheduler3;