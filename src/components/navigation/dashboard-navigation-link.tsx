import {Group, Paper, Text, useMantineTheme} from '@mantine/core';
import {NavLink, useLocation} from 'react-router-dom';
import {HugeiconsProps} from 'hugeicons-react';

export default function DashboardNavigationLink({
	Icon,
	label,
	rightIcon,
	path,
}: {
	Icon: React.FC<HugeiconsProps>;
	label: string;
	rightIcon?: React.ReactNode;
	path: string;
}) {
	const theme = useMantineTheme();
	const location = useLocation();

	// Special case for Customer Support
	const isCustomerSupport = label === 'Customer support';
	const isActive = isCustomerSupport
		? false
		: location.pathname.startsWith(path);

	return (
		<NavLink
			to={path}
			style={{color: 'inherit', textDecoration: 'none'}}
			end={path === '/home'} // Add this line to make the Dashboard link exact
		>
			{() => (
				<Paper
					bg={isActive ? theme.colors.gray[1] : undefined}
					radius={'sm'}
					py='xs'
					px={'xs'}
				>
					<Group>
						<Icon
							color={isActive ? theme.colors.gray[9] : undefined}
						/>
						<Text flex={1} fw={isActive ? 'bold' : undefined}>
							{label}
						</Text>
						{rightIcon}
					</Group>
				</Paper>
			)}
		</NavLink>
	);
}
