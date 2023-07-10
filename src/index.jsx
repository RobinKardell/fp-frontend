import React from 'react';
import ReactDOM from 'react-dom/client';
import { border, ChakraProvider, extendTheme } from '@chakra-ui/react'
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import { HashRouter, BrowserRouter, Routes, Route } from 'react-router-dom';

const theme = extendTheme({
  fonts: {
    body: 'Times New Roman, sans-serif',
    heading: 'Times New Roman, sans-serif',
    mono: 'Times New Roman, sans-serif',
  },
  components: {
    Input: {

      defaultProps: {
        size: 'sm', // default is md
        variant: 'sm', // default is solid
        //colorScheme: 'white', // default is gray
        //color:"white",
      }, baseStyle: {
        border: "1px solid black",
        color: "black",
      },
    },
    Select: {

      defaultProps: {
        size: 'sm', // default is md
        variant: 'sm', // default is solid
        //colorScheme: 'white', // default is gray
        //color:"white",
      }, baseStyle: {
        border: "1px solid black",
        color: "black",
      },
    },
    Table: {
      variants: {
        custom: {
          // Define your custom table styles here
          bg: "gray.50",
          color: "gray.900",
          borderRadius: "md",
          boxShadow: "md",
          th: {
            bg: "gray.200",
            fontWeight: "bold",
          },
          td: {
            bg: "white",
          },
        },
      },
    },
    Button: {
      defaultProps: {
        size: "sm",
        fontWeight: "normal", // change the font weight to normal
      },
      baseStyle: {
        borderRadius: "0",
      },
    },
    Checkbox: {
      defaultProps: {
        bgColor: "white",
        size: 'sm', // default is md
      },

    },
    Stat: {
      rounded: "sm"
    }
  },
  colors: {
    brand: {
      //primary: "#000000",
      primary: "#FFA500",
      //secondary: "#83C5BE",
      //secondary: "#840ce8",
      secondary: "#000000",
      /* 50: "#006D77",
       100: "#006D77",
       200: "#006D77",
       300: "#006D77",
       400: "#006D77",
       500: "#006D77",
       600: "#006D77",
       700: "#006D77",
       800: "#FFFFFF",
       900: "#006D77",*/
      50: "#840fff",
      100: "#840fff",
      200: "#840fff",
      300: "#840fff",
      400: "#840fff",
      500: "#840fff",
      600: "#840fff",
      700: "#840fff",
      800: "#FFFFFF",
      900: "#840fff",
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ChakraProvider theme={theme}>
        <HashRouter>
          <AuthProvider>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </AuthProvider>
        </HashRouter>
      </ChakraProvider>
  </React.StrictMode>
);