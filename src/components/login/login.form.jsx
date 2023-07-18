import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Alert,
  FormErrorMessage,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import * as API from "../../api/api";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

//API LOGIN ENDPOINT
//const LOGIN_URL = "/Auth/login"
const LOGIN_URL = "/auth";

function LoginForm() {
  const { setAuth, persist, setPersist } = useAuth();
  const [serverError, setServerError] = useState(false);
  const [credentialsError, setCredentialsError] = useState(false);
  const navigate = useNavigate();

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email krävs.")
        .email("Inte en giltlig email."),
      password: Yup.string()
        .required("Lösenord krävs")
        .min(3, "Lösenordet är för kort."),
    }),

    onSubmit: async (values, actions) => {
      try {
        /*const response = await axios.post(LOGIN_URL, JSON.stringify({ email: values.email, password: values.password }), {
          headers: { "Content-Type": "application/json" },
          //withCredentials: true,
        });*/
        const response = await API.login(
          JSON.stringify({ email: values.email, password: values.password })
        );
        if (response.status === "nok") {
          setCredentialsError(true);
          setServerError(false);
        } else {
          const accessToken = response?.accessToken;
          //const accessToken = response.data.accessToken
          //const accessTokenData = jwt_decode(accessToken);
          //const roles = response?.data?.roles;
          const roles = response?.roles;

          const user = values.email;

          const authData = {
            user: user,
            accessToken: accessToken,
            roles: roles,
          };

          // setAuth({ user, accessToken, roles });
          setAuth(authData);
          localStorage.setItem("user", JSON.stringify(authData));
          localStorage.setItem("token", accessToken);
          //setAuth({ accessToken, accessTokenData })
          navigate("/");
        }
      } catch (error) {
        //console.log(error)
        if (error.response.status === 400) {
          setCredentialsError(true);
          setServerError(false);
        }
        if (error.code === "ERR_NETWORK") {
          setServerError(true);
          setCredentialsError(false);
        }
      } finally {
        loginForm.setFieldValue("password", "");
        loginForm.setFieldError("password", "");
        loginForm.setFieldTouched("password", false);
      }
    },
  });

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <>
      {serverError && (
        <Alert variant="left-accent" status="error">
          <AlertIcon />
          <AlertTitle>Server</AlertTitle>
        </Alert>
      )}
      {credentialsError && (
        <Alert variant="left-accent" status="error">
          <AlertIcon />
          <AlertTitle>Fel email eller lösenord</AlertTitle>
        </Alert>
      )}
      <form onSubmit={loginForm.handleSubmit}>
        <FormControl
          isInvalid={loginForm.errors.email && loginForm.touched.email}
          mb="4"
        >
          <FormLabel textColor={"white"}>Email</FormLabel>
          <Input
            onBlur={loginForm.handleBlur}
            value={loginForm.values.email}
            onChange={loginForm.handleChange}
            id="email"
            name="email"
            type="email"
          />
          <FormErrorMessage>{loginForm.errors.email}</FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={loginForm.errors.password && loginForm.touched.password}
          mb="4"
        >
          <FormLabel textColor={"white"}>Lösenord</FormLabel>
          <Input
            onBlur={loginForm.handleBlur}
            value={loginForm.values.password}
            onChange={loginForm.handleChange}
            id="password"
            name="password"
            type="password"
          />
          <FormErrorMessage>{loginForm.errors.password}</FormErrorMessage>
        </FormControl>

        {/*<FormControl>
          <Checkbox colorScheme="brand" id="persist" onChange={togglePersist} isChecked={persist} mb="4">Kom ihåg mig</Checkbox>
        </FormControl>*/}

        <Button
          type="submit"
          disable={loginForm.isSubmitting}
          isLoading={loginForm.isSubmitting}
          variant="solid"
          size="lg"
          width="full"
        >
          Logga In
        </Button>
      </form>
    </>
  );
}

export default LoginForm;
