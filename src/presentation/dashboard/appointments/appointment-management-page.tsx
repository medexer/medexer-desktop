import React from 'react';
import {Box, Tabs} from '@mantine/core';
import PageShell from '../../shell/page-shell';
import {useNavigate, useSearchParams} from 'react-router-dom';
import OngoingAppointmentsTab from './tabs/ongoing-appointments-tab';
import CompletedAppointmentsTab from './tabs/completed-appointments-tab';

export default function AppointmentsPage() {
	const navigate = useNavigate();
	const [params] = useSearchParams();

	return (
		<React.Fragment>
			<Tabs
				defaultValue={params.get('tabId') ?? 'ongoing-appointments'}
				color='dark'
				onChange={(value) => navigate(`?tabId=${value}`)}
			>
				<PageShell
					title='Appointments'
					caption='Manage and track all donor appointments in one place.'
					tabs={
						<Box bg='white'>
							<Tabs.List px={'md'}>
								<Tabs.Tab value='ongoing-appointments'>
									Ongoing Appointments
								</Tabs.Tab>
								<Tabs.Tab value='completed-appointments'>
									Appointment History
								</Tabs.Tab>
							</Tabs.List>
						</Box>
					}
				>
					<Box>
						<Tabs.Panel value='ongoing-appointments'>
							<OngoingAppointmentsTab />
						</Tabs.Panel>
						<Tabs.Panel value='completed-appointments'>
							<CompletedAppointmentsTab />
						</Tabs.Panel>
					</Box>
				</PageShell>
			</Tabs>
		</React.Fragment>
	);
}
