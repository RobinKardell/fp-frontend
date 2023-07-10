import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Select, Stack } from '@chakra-ui/react';

function KundForm() {
  const [selectedKund, setSelectedKund] = useState('');
  const [avtalFile, setAvtalFile] = useState(null);

  const handleKundChange = (event) => {
    setSelectedKund(event.target.value);
  };

  const handleAvtalChange = (event) => {
    setAvtalFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lägg till kod för att spara kund och avtal här
    console.log('Kund:', selectedKund);
    console.log('Avtal:', avtalFile);
  };

  const handleDelete = () => {
    // Lägg till kod för att ta bort kund här
    console.log('Kund borttagen');
  };

  return (
    <Box p={4}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Välj kund:</FormLabel>
            <Select border="1px solid black" value={selectedKund} onChange={handleKundChange}>
              <option value="">Välj kund</option>
              <option value="kund1">Kund 1</option>
              <option value="kund2">Kund 2</option>
              <option value="kund3">Kund 3</option>
              {/* Lägg till fler kunder efter behov */}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Ladda upp avtal:</FormLabel>
            <input type="file" onChange={handleAvtalChange} />
          </FormControl>

          <FormControl>
            <FormLabel>Avtal:</FormLabel>
            <input type="file" onChange={handleAvtalChange} />
          </FormControl>

          <Button type="submit" colorScheme="teal">Spara kund</Button>
        </Stack>
      </form>

      <Box mt={4}>
        <Button onClick={handleDelete} colorScheme="red">Ta bort kund</Button>
      </Box>
    </Box>
  );
}

export default KundForm;
