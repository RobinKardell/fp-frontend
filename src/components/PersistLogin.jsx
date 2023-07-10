import { Spinner, Flex } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import React from 'react'
import { Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useRefreshToken from '../hooks/useRefreshToken';

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, [])

  useEffect(() => {


  }, [isLoading])


  return (
    <>
      {!persist
        ? <Outlet />
        : isLoading
          ? <Flex direction="column" minH="100vh" justify="center" align="center" p="4"><Spinner size="xl" color="brand.primary" /></Flex>
          : <Outlet />
      }
    </>
  )
}

export default PersistLogin