import { Box, ButtonGroup, Flex, HStack, IconButton, Input, Stack, Text, Button } from '@chakra-ui/react'
import React from 'react'
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi'

function CalendarNavigation(props) {
  const {
    currentTitle,
    currentDate,
    currentView,
    goToNext,
    goToPrev,
    handleSetCurrentDate,
    setCurrentView,
    isMobile,
    isDesktop
  } = props;
  return (
    <Box>
      {/* Desktop Header Toolbar */}
      {isDesktop && (
        <Flex py="3" flexDir={{ base: "column", md: "row" }} justifyContent={"space-between"}>
          <Text style={{ textTransform: "capitalize" }} fontWeight={"semibold"} fontSize={"2xl"}>{currentTitle}</Text>
          <HStack>
            <Input value={currentDate} onChange={e => handleSetCurrentDate(e)} mr="2" maxW={"52"} type={"date"} />
            <ButtonGroup isAttached variant='outline'>
              <Button onClick={() => setCurrentView("timeGridDay")} isActive={currentView === "timeGridDay"}>Dag</Button>
              <Button onClick={() => setCurrentView("timeGridWeek")} isActive={currentView === "timeGridWeek"}>Vecka</Button>
              <Button onClick={() => setCurrentView("dayGridMonth")} isActive={currentView === "dayGridMonth"}>Månad</Button>
            </ButtonGroup>
            <ButtonGroup isAttached variant='outline'>
              <IconButton onClick={() => goToPrev()} icon={<HiArrowLeft />} />
              <IconButton onClick={() => goToNext()} icon={<HiArrowRight />} />
            </ButtonGroup>
          </HStack>
        </Flex>
      )}
      {/* Mobile Header Toolbar */}
      {isMobile && (
        <Stack py="3">
          <Flex justifyContent={"space-between"}>
            <Text style={{ textTransform: "capitalize" }} fontWeight={"semibold"} fontSize={"2xl"}>{currentTitle}</Text>
            <ButtonGroup isAttached variant='outline'>
              <IconButton onClick={() => goToPrev()} icon={<HiArrowLeft />} />
              <IconButton onClick={() => goToNext()} icon={<HiArrowRight />} />
            </ButtonGroup>
          </Flex>
          <Input value={currentDate} onChange={e => handleSetCurrentDate(e)} mr="2" type={"date"} />
          <ButtonGroup w="full" isAttached variant='outline'>
            <Button w="full" onClick={() => setCurrentView("timeGridDay")} isActive={currentView === "timeGridDay"}>Dag</Button>
            <Button w="full" onClick={() => setCurrentView("timeGridWeek")} isActive={currentView === "timeGridWeek"}>Vecka</Button>
            <Button w="full" onClick={() => setCurrentView("dayGridMonth")} isActive={currentView === "dayGridMonth"}>Månad</Button>
          </ButtonGroup>
        </Stack>
      )}
    </Box>
  )
}

export default CalendarNavigation