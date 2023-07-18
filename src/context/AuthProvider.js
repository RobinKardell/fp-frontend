import { createContext, useEffect, useState } from "react";
import * as API from "../api/api";
import { set } from "date-fns";
import { Flex, Spinner } from "@chakra-ui/react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")) || false
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("user"));
    if (authData) {
      const fetchUser = async () => {
        const response = await API.stillloggedin();
        console.log("response: ", response);
        if (response.status === true) {
          setAuth(authData);
        }
        setIsLoading(false);
      };
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {isLoading ? (
        <Flex justifyContent="center" alignItems="center" height="100vh">
          <Spinner size="xl" />
        </Flex>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthContext;
