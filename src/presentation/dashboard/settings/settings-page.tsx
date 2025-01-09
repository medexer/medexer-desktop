import React from 'react';
import {Box, Tabs} from '@mantine/core';
import PageShell from '../../shell/page-shell';
import AccountSettingsTab from './tabs/account-settings-tab';
import {useNavigate, useSearchParams} from 'react-router-dom';
import BusinessSettingsTab from './tabs/business-settings-tab';
import PasswordSettingsTab from './tabs/password-settings-tab';

export default function SettingsPage() {
	const navigate = useNavigate();
	const [params] = useSearchParams();

	return (
		<React.Fragment>
			<Tabs
				color='dark'
				defaultValue={params.get('tabId') ?? 'account-settings'}
				onChange={(value) => navigate(`?tabId=${value}`)}
			>
				<PageShell
					title='Settings'
					caption='Manage your account settings and preferences.'
					tabs={
						<Box bg='white'>
							<Tabs.List px={'md'}>
								<Tabs.Tab value='account-settings'>
									Account Settings
								</Tabs.Tab>
								<Tabs.Tab value='business-settings'>
									Business Profile
								</Tabs.Tab>
								<Tabs.Tab value='password-settings'>
									Password Settings
								</Tabs.Tab>
							</Tabs.List>
						</Box>
					}
				>
					<Box mb={20}>
						<Tabs.Panel value='account-settings'>
							<AccountSettingsTab />
						</Tabs.Panel>
						<Tabs.Panel value='business-settings'>
							<BusinessSettingsTab />
						</Tabs.Panel>
						<Tabs.Panel value='password-settings'>
							<PasswordSettingsTab />
						</Tabs.Panel>
					</Box>
				</PageShell>
			</Tabs>
		</React.Fragment>
	);
}
