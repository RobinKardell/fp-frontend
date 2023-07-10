

import { Card,CardBody,Heading,Button } from '@chakra-ui/react'
import * as React from 'react'
import { HiBadgeCheck } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom' 
export const WarehouseInfo = (props) => {
  const {id, name, description } = props
  const navigate = useNavigate();
  return (
    <Card key={id} onClick={() => navigate(`/warehouses/${id}`)}>
    
   <CardBody>
    <Heading spacing="3" size='md'>{name}</Heading>
        {description} : Id:{id}
   </CardBody>
    </Card>
  )
}
