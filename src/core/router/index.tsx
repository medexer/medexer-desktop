import { AppRoutes } from './app-routes';
import { AuthRoutes } from './auth-routes';
import { useAppContext } from '../context';
import { useEffect, useState } from 'react';
import { Image, Loader, Stack } from '@mantine/core';
import MedexerClifIcon from '@/assets/icons/icon_medexer_clif.png';

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
        {/* <Loader /> */}
        <Image src={MedexerClifIcon} w={60}/>
      </Stack>
    );
  }

  return <div>{authToken !== undefined ? <AppRoutes /> : <AuthRoutes />}</div>;
}
