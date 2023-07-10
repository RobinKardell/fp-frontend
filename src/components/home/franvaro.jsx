import {
    Table,
    Thead,
    Th,
    Tbody,
    Tr,
    Td
} from "@chakra-ui/react";
import { set } from "date-fns/esm";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as API from "../../api/api"

function Franvaro(props) {
    const [list, setList] = useState([])

    const getA = async () => {
        const today = new Date();
        const res = await API.getAbsenceAll({'get':today.toDateString()});
        setList(res.data)
        
    }

    useEffect(() => {
        getA()
    }, [])

    return (<>

            <Table>
                <Thead>
                    <Tr>
                        <Th>Man</Th>
                        <Th>Från</Th>
                        <Th>Till</Th>
                        <Th>Anledning</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {list && list.map((absence) => (
                        <Tr key={absence.id}>
                            <Td><Link to={"/employees/" + absence.userId}>{absence.userId}</Link></Td>
                            <Td>{absence.startDate}</Td>
                            <Td>{absence.endDate}</Td>
                            <Td>{absence.reason}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
    </>)
}
export default Franvaro;