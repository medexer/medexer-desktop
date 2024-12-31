import {
	ActionIcon,
	AppShell,
	Avatar,
	Box,
	CloseIcon,
	Container,
	Divider,
	Drawer,
	Group,
	Menu,
	Stack,
	Text,
} from '@mantine/core';
import {useNavigate} from 'react-router-dom';
import {useDisclosure} from '@mantine/hooks';
import useLoggedInUser from '@/core/hooks/useLoggedInUser';
import DashboardLogoSvg from '@/assets/icons/icon_dashboard.png';
// import LogoTextOnlyPrimary from '@/ui/assets/LogoTextOnlyPrimary.svg';
import TUIDashboardSideNavigation from './dashboard-side-navigation';
import {
	Logout01Icon,
	Menu01Icon,
	Settings01Icon,
	UserIcon,
} from 'hugeicons-react';
import {useAppContext} from '@/core/context';

export default function DashboardShellHeader() {
	const {firstName, lastName, profile, logout} = useLoggedInUser();
	const {donationCenterCredential} = useAppContext();

	const navigate = useNavigate();

	const firstLetter = firstName ? firstName.charAt(0).toUpperCase() : '';
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
						<Box>
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
											{firstLetter}
										</Avatar>

										<Box visibleFrom='sm'>
											<Text>
												{firstName} {lastName}
											</Text>
										</Box>
									</Group>
								</Menu.Target>
								<Menu.Dropdown w={180}>
									<Group gap={'sm'} px='xs' align='center'>
										<Box>
											<Text size='sm'>
												{firstName} {lastName}
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
											navigate('/account');
										}}
									>
										Profile
									</Menu.Item>
									<Menu.Item
										leftSection={
											<Settings01Icon size={18} />
										}
										onClick={() => {
											navigate(
												'/account/settings?page_id=settings'
											);
										}}
									>
										Settings
									</Menu.Item>
									<Menu.Item
										leftSection={<Logout01Icon size={18} />}
										color='red'
										onClick={logout}
									>
										Log Out
									</Menu.Item>
								</Menu.Dropdown>
							</Menu>
						</Box>
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
						variant='subtle'
						color='dark'
						size={'lg'}
						onClick={close}
					>
						<CloseIcon />
					</ActionIcon>
					{/* <img src={LogoTextOnlyPrimary} height={30} /> */}
				</Group>
				<Divider />
				<TUIDashboardSideNavigation pendingOrderCount={0} />{' '}
			</Drawer>
			<ActionIcon variant='default' size={'lg'} onClick={open}>
				<Menu01Icon />
			</ActionIcon>
		</>
	);
}
