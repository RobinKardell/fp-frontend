import { Box, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { Stat } from './Stat'
import { StatLabel } from './StatLabel'
import { StatNumber } from './StatNumber'
import { Link } from "react-router-dom"

function HomeEmployee() {
    const axiosPrivate = useAxiosPrivate();

    const [stats, setStats] = useState({
        totalCustomers: 0,
        totalBookings: 0,
        totalOrders: 0,
        totalTeams: 0,
        totalEmployees: 0,
        todayBookings: 0
    })

    const getTotalBookings = async () => {
        const response = await axiosPrivate.get("/Stat/all");
        setStats(response.data.data)
    }

    useEffect(() => {
        getTotalBookings();
    }, [])
    return (
        <Stack>
            {/* Idag */}
            <Box bg="white" rounded="xl" p="4">
                <Box pb="4">
                    <Text textColor="black" fontWeight="semibold" fontSize="3xl">Idag</Text>
                </Box>
                <SimpleGrid
                    columns={{
                        sm: 1,
                        md: 2,
                        lg: 4,
                    }}
                    spacing="6"
                >
                    <Link to="/schedule">
                      <Stat>
                        <StatLabel>Bokningar</StatLabel>
                        <StatNumber>{stats?.todayBookings}</StatNumber>
                    </Stat>
                    </Link>
                </SimpleGrid>
            </Box>

        </Stack>
    )
}

export default HomeEmployee