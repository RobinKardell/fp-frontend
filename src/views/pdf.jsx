import React, { useState } from "react";
import {
  PDFViewer,
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import { FormControl, FormLabel, Input, Button, Stack } from "@chakra-ui/react";

// Ladda in en extern typsnitt
//Font.register({ family: 'Roboto', src: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxM.woff2' });

// Definiera stilar för dokumentet
const styles = StyleSheet.create({
  page: {
    padding: 10,
    //fontFamily: 'Roboto',
    fontSize: 12,
  },
  header: {
    marginBottom: 20,
  },
  logo: {
    width: "100%",
    height: 100,
    marginBottom: 10,
  },
});

// Skapa PDF-komponenten
const MyDocument = ({ name, age, coment }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image style={styles.logo} src="./PDFloggaFP.png" />
        <Text>Personuppgifter</Text>
      </View>
      <View>
        <Text>Namn: {name}</Text>
        <Text>Ålder: {age}</Text>
        <Text>Gillar du ost? KOmmenteera: {coment}</Text>
      </View>
    </Page>
  </Document>
);

// Skapa en formulärkomponent för att mata in data
const MyForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [coment, setComent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, age, coment });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <FormControl id="name">
          <FormLabel>Namn</FormLabel>
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </FormControl>
        <FormControl id="age">
          <FormLabel>Ålder</FormLabel>
          <Input value={age} onChange={(event) => setAge(event.target.value)} />
        </FormControl>
        <FormControl id="Comment">
          <FormLabel>KOmmmerntar varför du gilalr ost</FormLabel>
          <Input
            value={coment}
            onChange={(event) => setComent(event.target.value)}
          />
        </FormControl>
        <Button type="submit">Ladda ner PDF</Button>
      </Stack>
    </form>
  );
};

// Skapa en huvudkomponent som innehåller både formulär och PDF
const Pdfv = () => {
  const [data, setData] = useState(null);

  const handleFormSubmit = (formData) => {
    setData(formData);
  };

  return (
    <>
      <MyForm onSubmit={handleFormSubmit} />
      {data && (
        <>
          <PDFViewer width="100%" height={500}>
            <MyDocument {...data} />
          </PDFViewer>
          <PDFDownloadLink
            document={<MyDocument {...data} />}
            fileName="personuppgifter.pdf"
          >
            {({ loading }) => (loading ? "Laddar ner PDF..." : "Ladda ner PDF")}
          </PDFDownloadLink>
        </>
      )}
    </>
  );
};

export default Pdfv;
