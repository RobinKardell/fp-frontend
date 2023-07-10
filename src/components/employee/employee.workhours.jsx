import { useState } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Box,
    Flex
} from "@chakra-ui/react";
import { de } from "date-fns/locale";
import * as API from "../../api/api";
import { useEffect } from "react";

function EmployeeWorkHours(props) {
    const {id, workhours} = props
    const [defaultHours, setDefaultHours] = useState({
        monday: { start: "", end: "", free: false },
        tuesday: { start: "", end: "", free: false },
        wednesday: { start: "", end: "", free: false },
        thursday: { start: "", end: "", free: false },
        friday: { start: "", end: "", free: false },
        saturday: { start: "", end: "", free: false },
        sunday: { start: "", end: "", free: false },
    });

    const handleDefaultHoursChange = (day, field, value) => {
        setDefaultHours(prevState => ({
            ...prevState,
            [day]: {
                ...prevState[day],
                [field]: value,
            },
        }));
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        // submit form data to server or process it here
        await API.saveEmployeeWorkHours(id,defaultHours)
    };

    useEffect(()=>{
        workhours && setDefaultHours(workhours)
    },[workhours])
    
    const daysOfWeek = [
        { name: "monday", label: "Monday" },
        { name: "tuesday", label: "Tuesday" },
        { name: "wednesday", label: "Wednesday" },
        { name: "thursday", label: "Thursday" },
        { name: "friday", label: "Friday" },
        { name: "saturday", label: "Saturday" },
        { name: "sunday", label: "Sunday" },
    ];
    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
                <Flex>
                    {daysOfWeek.map((day) => (
                        <Box>
                            <FormControl key={day.name} id={day.name}>
                                <FormLabel>{day.label}</FormLabel>
                                Start: <Input
                                    type="time"
                                    value={defaultHours[day.name].start}
                                    onChange={(event) => handleDefaultHoursChange(day.name, "start", event.target.value)}
                                />
                                Stop:<Input
                                    type="time"
                                    value={defaultHours[day.name].end}
                                    onChange={(event) => handleDefaultHoursChange(day.name, "end", event.target.value)}
                                />
                                <Checkbox
                                    isChecked={defaultHours[day.name].free}
                                    onChange={(event) => handleDefaultHoursChange(day.name, "free", event.target.checked)}
                                >
                                    Ledig
                                </Checkbox>
                            </FormControl>
                        </Box>
                    ))}
                </Flex>
                <Button bg={"brand.primary"} textColor={"white"} type="submit">Save</Button>
            </Stack>
        </form>
    );
}
export default EmployeeWorkHours