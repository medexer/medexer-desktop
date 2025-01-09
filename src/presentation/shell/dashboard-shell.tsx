import {AppOutlet} from '../root/app-outlet';
import {AppShell, useMantineTheme} from '@mantine/core';
import DashboardShellHeader from '@/components/navigation/dashboard-shell-header';
import DashboardSideNavigation from '@/components/navigation/dashboard-side-navigation';
import useGetOngoingAppointmentsQuery from '@/core/hooks/appointments/useGetOngoingAppointmentsQuery';

export default function DashboardShell() {
	const theme = useMantineTheme();

	const {data: pendingAppointments} = useGetOngoingAppointmentsQuery();

	return (
		<AppShell
			styles={{main: {margin: 0}}}
			header={{height: 60}}
			navbar={{width: 250, breakpoint: 'sm', collapsed: {mobile: true}}}
		>
			<DashboardShellHeader />
			<AppShell.Navbar>
				<DashboardSideNavigation pendingOrderCount={pendingAppointments?.length!} />
			</AppShell.Navbar>
			<AppShell.Main bg={theme.colors.gray[0]}>
				<AppOutlet />
			</AppShell.Main>
		</AppShell>
	);
}
