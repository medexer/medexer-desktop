import {Grid} from '@mantine/core';
import {Stack} from '@mantine/core';
import PageShell from '@/presentation/shell/page-shell';
import DashboardInventorySection from './section/dashboard-inventory-section';
import DashboardAppointmentsSection from './section/dashboard-appointments-section';
import DashboardOverviewStatsSection from './section/dashboard-overview-stat-section';
import DashboardAnalyticsChartSection from './section/dashboard-analytics-chart-section';
import DashboardFulfillmentRateSection from './section/dashboard-fulfillment-rate-section';

export default function DashboardPage() {
	return (
		<PageShell
			title='Dashboard'
			caption='Track your business performance and stay informed.'
		>
			<Stack mx='auto'>
				<DashboardOverviewStatsSection />
				<Grid>
					<Grid.Col span={{base: 12, md: 8}} mih='324px'>
						<DashboardAnalyticsChartSection />
					</Grid.Col>
					<Grid.Col span={{base: 12, md: 4}}>
						<DashboardInventorySection />
					</Grid.Col>
				</Grid>
				<Grid>
					<Grid.Col span={{base: 12, md: 8}}>
						<DashboardAppointmentsSection />
					</Grid.Col>
					<Grid.Col span={{base: 12, md: 4}} mih='324px'>
						<DashboardFulfillmentRateSection />
					</Grid.Col>
				</Grid>
			</Stack>
		</PageShell>
	);
}
