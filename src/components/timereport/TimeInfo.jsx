import { HStack, Icon, Text, useColorModeValue, VStack, Button } from '@chakra-ui/react'
import * as React from 'react'
import { HiBadgeCheck } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import moment from 'moment';
import * as API from "../../api/api";

export const TimeInfo = (props) => {
  const {getlogs, id, name, booking, clockin, clockout, client, workedTotal, attestState, click, ...stackProps } = props
  const navigate = useNavigate();
  const attest = async () => {
    await API.attestTimeStamp(id)
    await getlogs();
  }
  return (
    <VStack spacing="2" flex="1" {...stackProps}>
      <HStack>
        <Text align="center" fontWeight="bold">{booking} / {client}</Text>
      </HStack>
      <Text
        fontSize="sm"
        textAlign="center"
        //noOfLines={2}
        color={useColorModeValue('gray.600', 'gray.400')}
      >
        Arbetadtid: {workedTotal} <br />In: {clockin} <br /> Ut: {clockout}
        {attestState}
      </Text>
      {(attestState === 0) && (<>
      <Button bg="brand.primary" textColor="white" onClick={() => attest()}>Attest</Button>
      <Button onClick={() => navigate(`/timereport/` + id)} >Ändra</Button>
      </>
      )} 
    </VStack>
  )
}
