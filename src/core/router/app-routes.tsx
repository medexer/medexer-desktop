import {Box} from '@mantine/core';
import {Suspense, useEffect} from 'react';
import {LoadingOverlay} from '@mantine/core';
import {OnboardingRoutes} from './onboarding-routes';
import {Navigate, Route, Routes} from 'react-router-dom';
import DashboardShell from '@/presentation/shell/dashboard-shell';
import DashboardPage from '@/presentation/dashboard/root/dashboard-page';
import SettingsPage from '@/presentation/dashboard/settings/settings-page';
import InventoryPage from '@/presentation/dashboard/inventory/inventory-page';
import AvailabilityPage from '@/presentation/dashboard/availability/availability-page';
import RatingsReviewPage from '@/presentation/dashboard/ratings_review/ratings-review-page';
import useDonationCenterProfileInitHook from '../hooks/profile/useDonationCenterProfileInitHook';
import AppointmentsPage from '@/presentation/dashboard/appointments/appointment-management-page';

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
						<Route path='/' index element={<DashboardPage />} />
						<Route
							path='/appointments/*'
							index
							element={<AppointmentsPage />}
						/>
						<Route
							path='/inventory'
							index
							element={<InventoryPage />}
						/>
						<Route
							path='/availability'
							index
							element={<AvailabilityPage />}
						/>
						<Route
							path='/ratings-review'
							index
							element={<RatingsReviewPage />}
						/>
						<Route path='/settings' index element={<SettingsPage />} />
						<Route path='/home' index element={<DashboardPage />} />
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
