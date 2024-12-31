import { AppRoutes } from './app-routes';
import { AuthRoutes } from './auth-routes';
import { useAppContext } from '../context';
import { useEffect, useState } from 'react';
import { Loader, Stack } from '@mantine/core';

export function AppRouter() {
  const [show, setShow] = useState(false);
  const { authToken } = useAppContext();

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 500);
  }, []);

  if (show == false) {
    return (
      <Stack h={'100vh'} justify="center" align="center">
        <Loader />
      </Stack>
    );
  }

  return <div>{authToken !== undefined ? <AppRoutes /> : <AuthRoutes />}</div>;
}
