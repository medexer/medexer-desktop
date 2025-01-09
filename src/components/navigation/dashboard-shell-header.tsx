import {
	ActionIcon,
	AppShell,
	Avatar,
	Box,
	CloseIcon,
	Container,
	Divider,
	Drawer,
	Flex,
	Group,
	Indicator,
	Menu,
	Stack,
	Text,
} from '@mantine/core';
import {
	Logout01Icon,
	Menu01Icon,
	AccountSetting01Icon,
	UserIcon,
	Notification01Icon,
} from 'hugeicons-react';
import {useNavigate} from 'react-router-dom';
import {useDisclosure} from '@mantine/hooks';
import {useAppContext} from '@/core/context';
import useLoggedInUser from '@/core/hooks/useLoggedInUser';
import DashboardLogoSvg from '@/assets/icons/icon_dashboard.png';
import DashboardSideNavigation from './dashboard-side-navigation';

export default function DashboardShellHeader() {
	const {logout} = useLoggedInUser();

	const {profile, donationCenterProfile} = useAppContext();

	const navigate = useNavigate();

	return (
		<AppShell.Header>
			<Container size={'xl'} py='xs' fluid h={'100%'}>
				<Stack h={'100%'} justify='center'>
					<Group justify='space-between'>
						<Box visibleFrom='sm'>
							<img src={DashboardLogoSvg} width={100} />
						</Box>
						<Box hiddenFrom='sm'>
							<Group>
								<MobileNavigationDrawer />
								{/* <img src={LogoTextOnlyPrimary} height={30} /> */}
							</Group>
						</Box>
						<Flex align='center' gap={'xl'}>
							{/* <Menu>
								<Menu.Target>
									<Indicator
										inline
										size={16}
										offset={2}
										color='red'
										withBorder
										processing
										position='top-end'
									>
										<Notification01Icon
											size={24}
											style={{cursor: 'pointer'}}
										/>
									</Indicator>
								</Menu.Target>

								<Menu.Dropdown
									w={'25%'}
									style={{boxShadow: '0px 0px 10px 0px #00000020'}}
								>
									<Menu.Label>Notifications</Menu.Label>
									<Menu.Item>
										Settings
									</Menu.Item>
								</Menu.Dropdown>
							</Menu> */}

							<Menu>
								<Menu.Target>
									<Group
										gap={'sm'}
										style={{cursor: 'pointer'}}
									>
										<Avatar
											size={'sm'}
											color='blue'
											variant='filled'
											src={profile?.profilePhoto}
										>
											{profile?.firstName
												? profile?.firstName
														.charAt(0)
														.toUpperCase()
												: ''}
										</Avatar>

										<Box visibleFrom='sm'>
											<Text>
												{profile?.firstName}{' '}
												{profile?.lastName}
											</Text>
										</Box>
									</Group>
								</Menu.Target>
								<Menu.Dropdown w={180}>
									<Group gap={'sm'} px='xs' align='center'>
										<Box>
											<Text size='sm'>
												{profile?.firstName}{' '}
												{profile?.lastName}
											</Text>
											<Text
												size='xs'
												c={'dimmed'}
												style={{marginTop: -8}}
											>
												{'Donation Center'}
											</Text>
										</Box>
									</Group>
									<Menu.Divider />
									<Menu.Item
										leftSection={<UserIcon size={18} />}
										onClick={() => {
											if (
												!donationCenterProfile?.isComplianceApproved
											) {
												return;
											}

											navigate(
												'/settings?tabId=account-settings'
											);
										}}
									>
										Profile
									</Menu.Item>
									<Menu.Item
										leftSection={
											<AccountSetting01Icon size={18} />
										}
										onClick={() => {
											if (
												!donationCenterProfile?.isComplianceApproved
											) {
												return;
											}

											navigate(
												'/settings?tabId=business-settings'
											);
										}}
									>
										Settings
									</Menu.Item>
									<Menu.Item
										color='red'
										onClick={logout}
										leftSection={<Logout01Icon size={18} />}
									>
										Log Out
									</Menu.Item>
								</Menu.Dropdown>
							</Menu>
						</Flex>
					</Group>
				</Stack>
			</Container>
		</AppShell.Header>
	);
}

export function MobileNavigationDrawer() {
	const [opened, {open, close}] = useDisclosure(false);

	return (
		<>
			<Drawer
				opened={opened}
				position='left'
				onClose={close}
				withCloseButton={false}
				size={'70%'}
				p={0}
				styles={{body: {padding: 0}}}
			>
				<Group p={'sm'}>
					<ActionIcon
						size={'lg'}
						color='dark'
						onClick={close}
						variant='subtle'
					>
						<CloseIcon />
					</ActionIcon>
					{/* <img src={LogoTextOnlyPrimary} height={30} /> */}
				</Group>
				<Divider />
				<DashboardSideNavigation pendingOrderCount={0} />{' '}
			</Drawer>
			<ActionIcon variant='default' size={'lg'} onClick={open}>
				<Menu01Icon />
			</ActionIcon>
		</>
	);
}
