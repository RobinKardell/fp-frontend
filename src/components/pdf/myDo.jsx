import React from 'react';
import { Page, Text, View, Image, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  image: {
    width: '100%',
  },
});

const MyDocument = ({ data }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text>Form Data:</Text>
        <Text>{data}</Text>
      </View>
      <View style={styles.section}>
        <Text>Image:</Text>
        <Image style={styles.image} src="./FlyttPoolen_logo_orange_flag_right.png" />
      </View>
    </Page>
  </Document>
);

export default MyDocument;