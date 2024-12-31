import {AppOutlet} from '../root/app-outlet';
import {AppShell, Overlay, useMantineTheme} from '@mantine/core';
import DashboardShellHeader from '@/components/navigation/dashboard-shell-header';
import DashboardSideNavigation from '@/components/navigation/dashboard-side-navigation';

export default function OnboardingDashboardShell() {
	const theme = useMantineTheme();

	return (
		<AppShell
			padding='md'
			header={{height: 60}}
			styles={{main: {margin: 0}}}
			navbar={{width: 250, breakpoint: 'sm', collapsed: {mobile: true}}}
		>
			<DashboardShellHeader />
			<AppShell.Navbar>
				<Overlay
					color={theme.colors.gray[6]}
					backgroundOpacity={0.1}
					blur={0.5}
					h={'100%'}
					w={'100%'}
					// style={{cursor: 'wait'}}
					pos={'absolute'}
					left={0}
					top={0}
				/>
				<DashboardSideNavigation pendingOrderCount={0} />{' '}
			</AppShell.Navbar>
			<AppShell.Main bg={theme.colors.gray[1]}>
				<AppOutlet />
			</AppShell.Main>
		</AppShell>
	);
}
