import React from 'react';
import {Box, Tabs} from '@mantine/core';
import {useNavigate, useSearchParams} from 'react-router-dom';
import PageShell from '../../shell/page-shell';

export default function AppointmentManagementPage() {
	const [params] = useSearchParams();
	const navigate = useNavigate();

	return (
		<React.Fragment>
			<Tabs
				defaultValue={params.get('tabId') ?? 'active'}
				color='dark'
				onChange={(value) => navigate(`?tabId=${value}`)}
			>
				<PageShell
					title='Appointments'
					caption='Manage and track all donor appointments in one place.'
					tabs={
						<Box bg='white'>
							<Tabs.List px={'md'}>
								<Tabs.Tab value='active'>
									Active Appointments
								</Tabs.Tab>
								<Tabs.Tab value='history'>
									Appointment History
								</Tabs.Tab>
							</Tabs.List>
						</Box>
					}
				>
					<Box>
						<Tabs.Panel value='active'>
							{/* <ActiveOrders /> */}
							<></>
						</Tabs.Panel>
						<Tabs.Panel value='history'>
							<></>
							{/* <OrderHistory /> */}
						</Tabs.Panel>
					</Box>
				</PageShell>
			</Tabs>
		</React.Fragment>
	);
}
