import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    Flex,
    Text,
    Table,
    Thead,
    Th,
    Tbody,
    Tr,
    Td
} from '@chakra-ui/react';
import * as API from "../../api/api";


function AbsenceForm(props) {
    const { id } = props;
    const [reason, setReason] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [absences, setAbsences] = useState([]);
    const getAbsences = async () => {
        const response = await API.getAbsence(id);
        setAbsences(response.data)
    }
    useEffect(()=>{
        getAbsences();
    },[])
    const handleSubmit = async (e) => {
        e.preventDefault();
        const absenceFormData = {
            id,
            reason,
            startDate,
            endDate,
        }
        console.log(absenceFormData)
        await API.logAbsence(absenceFormData)
        getAbsences();
    };

    return (
        <Flex>
            <Box p={4}>
                <form onSubmit={handleSubmit}>
                    <FormControl id="reason" isRequired mb="4">
                        <FormLabel>Reason for absence</FormLabel>
                        <Select
                            placeholder="Select reason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        >
                            <option value="vacation">Vacation</option>
                            <option value="sick">Sick</option>
                            <option value="personal">Personal</option>
                        </Select>
                    </FormControl>
                    <FormControl id="startDate" isRequired mb="4">
                        <FormLabel>Start Date</FormLabel>
                        <Input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="endDate" isRequired mb="4">
                        <FormLabel>End Date</FormLabel>
                        <Input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </FormControl>
                    <Button type="submit" colorScheme="blue">
                        Submit
                    </Button>
                </form>
            </Box>
            <Box p={2}>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Anledning</Th>
                            <Th>Från</Th>
                            <Th>Till</Th>
                            <Th>Rappoterad av</Th>
                            <Th>Inrappoterad</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                    {absences && absences.map((absence) => (
                        <Tr key={absence.id}>
                            <Td>{absence.reason}</Td>
                            <Td>{absence.startDate}</Td>
                            <Td>{absence.endDate}</Td>
                            <Td>{absence.createdBy}</Td>
                            <Td>{absence.createdAt}</Td>
                        </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Flex>
    );
};

export default AbsenceForm;