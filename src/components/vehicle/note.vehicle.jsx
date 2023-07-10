import { Text,Textarea, Button, Flex} from "@chakra-ui/react";
import { useState } from "react";
import * as API from '../../api/api';

function VehicleNote(props){
    const { infoData } = props
    const [ newValue, setNewValue] = useState();

    const saveNote = () => {
        const save = {regnr: infoData?.regNr, note: newValue}
        console.log("save", save)
    }
    return(<>
        Anteckning<br />
        <Textarea bgColor={"white"} value={infoData?.note} onChange={(e)=>setNewValue(e.target.value)}/>
        <Button onClick={saveNote}>Spara</Button>
        </>)
}
export default VehicleNote