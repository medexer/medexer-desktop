import {AppOutlet} from '../root/app-outlet';
import {AppShell, useMantineTheme} from '@mantine/core';
import DashboardShellHeader from '@/components/navigation/dashboard-shell-header';
import TUIDashboardSideNavigation from '@/components/navigation/dashboard-side-navigation';

export default function DashboardShell() {
	const theme = useMantineTheme();

	return (
		<AppShell
			styles={{main: {margin: 0}}}
			header={{height: 60}}
			navbar={{width: 250, breakpoint: 'sm', collapsed: {mobile: true}}}
		>
			<DashboardShellHeader />
			<AppShell.Navbar>
				<TUIDashboardSideNavigation pendingOrderCount={0} />
			</AppShell.Navbar>
			<AppShell.Main bg={theme.colors.gray[0]}>
				<AppOutlet />
			</AppShell.Main>
		</AppShell>
	);
}
