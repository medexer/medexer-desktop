import React from 'react';
import {Box, Grid} from '@mantine/core';
import PageShell from '@/presentation/shell/page-shell';
import AvailabilityOperationsConfigSection from './sections/availability-operations-config-section';
import AvailabilityBusinessHoursConfigSection from './sections/availability-business-hours-section';
import useGetDonationCenterOperationsConfigQuery from '@/core/hooks/availability/useGetDonationCenterOperationsConfigQuery';

const AvailabilityPage = () => {
	useGetDonationCenterOperationsConfigQuery();

	return (
		<React.Fragment>
			<PageShell
				title='Availability'
				caption='Manage and track business configurations and operating hours.'
			>
				<Box>
					<Grid>
						<Grid.Col span={{md: 6}}>
							<AvailabilityOperationsConfigSection />
						</Grid.Col>
						<Grid.Col span={{md: 6}}>
							<AvailabilityBusinessHoursConfigSection />
						</Grid.Col>
					</Grid>
				</Box>
			</PageShell>
		</React.Fragment>
	);
};

export default AvailabilityPage;
