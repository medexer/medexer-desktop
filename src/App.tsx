import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { NavigationProgress } from '@mantine/nprogress';
import { AppContextProvider } from './core/context';
import { queryClient } from './core/middlewares/query-client';
import { AppRouter } from './core/router';
import { theme } from './core/themes';

export default function App() {
  return (
    <BrowserRouter basename="/">
      <MantineProvider theme={theme}>
        <Notifications position="top-right" />
        <QueryClientProvider client={queryClient}>
          <AppContextProvider>
            <ModalsProvider>
              <NavigationProgress color="green" />
              <AppRouter />
            </ModalsProvider>
          </AppContextProvider>
        </QueryClientProvider>
      </MantineProvider>
    </BrowserRouter>
  );
}
