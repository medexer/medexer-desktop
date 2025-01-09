import {Box, Divider, Stack, Text} from '@mantine/core';
import {
	BloodPressureIcon,
	StarCircleIcon,
	Time04Icon,
	Calendar03Icon,
	Analytics02Icon,
	CustomerService01Icon,
	AccountSetting01Icon,
} from 'hugeicons-react';
import DashboardNavigationLink from './dashboard-navigation-link';
import {useDisclosure} from '@mantine/hooks';
import SupportInquiryModal from '../modals/support/support-inquiry-modal';

interface DashboardSideNavigationProps {
	pendingOrderCount: number;
}

export default function DashboardSideNavigation({
	pendingOrderCount,
}: DashboardSideNavigationProps) {
	const [
		openedSupportInquiryModal,
		{open: openSupportInquiryModal, close: closeSupportInquiryModal},
	] = useDisclosure(false);

	return (
		<>
			<Stack gap={0} h={'100%'}>
				<Box>
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
						Icon={Analytics02Icon}
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
						path='/ratings-review'
					/>
					<DashboardNavigationLink
						Icon={AccountSetting01Icon}
						label='Settings'
						path='/settings'
					/>
				</Stack>
				<Divider />
				<Box
					p='md'
					py='xs'
					onClick={() => {
						openSupportInquiryModal();
					}}
				>
					<DashboardNavigationLink
						Icon={CustomerService01Icon}
						label='Customer support'
						path='#'
					/>
				</Box>
			</Stack>
			
			<SupportInquiryModal
				opened={openedSupportInquiryModal}
				onClose={closeSupportInquiryModal}
			/>
		</>
	);
}
