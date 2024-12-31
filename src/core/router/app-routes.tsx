import {Box} from '@mantine/core';
import {Suspense, useEffect} from 'react';
import {LoadingOverlay} from '@mantine/core';
import {OnboardingRoutes} from './onboarding-routes';
import {Navigate, Route, Routes} from 'react-router-dom';
import DashboardShell from '@/presentation/shell/dashboard-shell';
import useDonationCenterProfileInitHook from '../hooks/profile/useDonationCenterProfileInitHook';
import AppointmentManagementPage from '@/presentation/dashboard/appointments/appointment-management-pagee';

export function AppRoutes() {
	const {init} = useDonationCenterProfileInitHook();
	useEffect(() => {
		init();
	}, []);

	return (
		<Box>
			<Suspense fallback={<LoadingOverlay visible />}>
				<Routes>
					<Route path='onboarding/*' Component={OnboardingRoutes} />
					<Route path='' element={<DashboardShell />}>
						<Route
							path='/appointments/*'
							index
							element={<AppointmentManagementPage />}
						/>
						<Route
							path=''
							element={<AppointmentManagementPage />}
						/>
						<Route
							path='*'
							element={<Navigate to='/' relative='route' />}
						/>
					</Route>
				</Routes>
			</Suspense>
		</Box>
	);
}
