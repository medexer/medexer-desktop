import { useEffect } from 'react';
import {Route, Routes} from 'react-router-dom';
import OnboardingPage from '@/presentation/dashboard/onboarding/onboarding-page';
import OnboardingDashboardShell from '@/presentation/shell/onboarding-dashboard-shell';
import useDonationCenterComplianceInitHook from '../hooks/compliance/useDonationCenterComplianceInitHook';

export function OnboardingRoutes() {
	const {initializeComplianceInfo} = useDonationCenterComplianceInitHook();

	useEffect(() => {
		initializeComplianceInfo();
	}, []);

	return (
		<Routes>
			<Route element={<OnboardingDashboardShell />}>
				<Route path='' index Component={OnboardingPage} />
			</Route>
		</Routes>
	);
}
