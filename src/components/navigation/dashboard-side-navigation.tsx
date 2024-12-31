import {Box, Divider, Stack, Text} from '@mantine/core';
import {
	Invoice02Icon,
	UserListIcon,
	Store01Icon,
	BloodPressureIcon,
	StarCircleIcon,
	Time04Icon,
	Calendar03Icon,
	Analytics01Icon,
  CustomerService01Icon,
} from 'hugeicons-react';
import React, {useEffect} from 'react';
import {useAppContext} from '@/core/context';
import DashboardNavigationLink from './dashboard-navigation-link';

interface TUIDashboardSideNavigationProps {
	pendingOrderCount: number;
}

export default function TUIDashboardSideNavigation({
	pendingOrderCount,
}: TUIDashboardSideNavigationProps) {
	const {donationCenterCredential} = useAppContext();

	return (
		<Stack gap={0} h={'100%'}>
			<Box>
				{/* <VendorSwitcher /> */}
				<Divider />
			</Box>
			<Stack p='md' gap={15} flex={1}>
				<Text size='sm' c={'dimmed'} mb='sm'>
					OPERATIONS
				</Text>
				<DashboardNavigationLink
					Icon={Calendar03Icon}
					label='Appointments'
					path='/appointments'
					rightIcon={
						<Stack
							//  bg={theme.colors.gray[2]}
							bg='white'
							w={25}
							h={25}
							align='center'
							justify='center'
							style={{
								borderRadius: 50,
								border: 'solid 1px #ECECEC',
							}}
						>
							<Text>{pendingOrderCount}</Text>
						</Stack>
					}
				/>
				<DashboardNavigationLink
					Icon={Analytics01Icon}
					label='Dashboard'
					path='/home'
				/>
				<DashboardNavigationLink
					Icon={BloodPressureIcon}
					label='Inventory'
					path='/inventory'
				/>
				<DashboardNavigationLink
					Icon={Time04Icon}
					label='Availability'
					path='/availability'
				/>
				<DashboardNavigationLink
					Icon={StarCircleIcon}
					label='Ratings & Reviews'
					path='/reviews'
				/>
			</Stack>
			<Divider />
			<Box
				p='md'
				py='xs'
				onClick={() => {
					// openModal(<CustomerSupportForm onClose={() => {}} />, 'Having issues?');
				}}
			>
				<DashboardNavigationLink
					Icon={CustomerService01Icon}
					label='Customer support'
					path='#'
				/>
			</Box>
		</Stack>
	);
}
