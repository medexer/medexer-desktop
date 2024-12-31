import {AppRouter} from './core/router';
import {theme} from './core/themes';
import {MantineProvider} from '@mantine/core';
import {ModalsProvider} from '@mantine/modals';
import {BrowserRouter} from 'react-router-dom';
import {AppContextProvider} from './core/context';
import {Notifications} from '@mantine/notifications';
import {NavigationProgress} from '@mantine/nprogress';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from './core/middlewares/query-client';

export default function App() {
	return (
		<MantineProvider theme={theme}>
			<Notifications position='top-right' />
			<BrowserRouter basename='/'>
				<QueryClientProvider client={queryClient}>
					<AppContextProvider>
						<ModalsProvider>
							<NavigationProgress color='green' />
							<AppRouter />
						</ModalsProvider>
					</AppContextProvider>
				</QueryClientProvider>
			</BrowserRouter>
		</MantineProvider>
	);
}
