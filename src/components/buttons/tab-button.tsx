import {Box, Text} from '@mantine/core';
import {AppointmentTab} from '@/core/types';

export interface TabButtonProps {
	tab: AppointmentTab;
	activeTab: string;
	setActiveTab: (value: string) => void;
}

const TabButton: React.FC<TabButtonProps> = ({
	tab,
	activeTab,
	setActiveTab,
}) => (
	<Box
		onClick={() => setActiveTab(tab.value)}
		style={(theme) => ({
			display: 'flex',
			alignItems: 'center',
			padding: '8px 12px',
			cursor: 'pointer',
			borderRadius: '8px',
			backgroundColor: activeTab === tab.value ? 'black' : 'transparent',
			color: activeTab === tab.value ? 'white' : 'black',
			'&:hover': {
				backgroundColor:
					activeTab === tab.value ? 'black' : theme.colors.gray[1],
			},
		})}
	>
		<Text size='sm' mr={4}>
			{tab.label}
		</Text>
		<Box
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				width: '20px',
				height: '20px',
				borderRadius: '50%',
				border: activeTab === tab.value ? '' : '1px solid #ECECEC',
				backgroundColor: activeTab === tab.value ? 'white' : 'white',
				color: activeTab === tab.value ? 'black' : 'black',
				fontSize: '12px',
			}}
		>
			{tab.count}
		</Box>
	</Box>
);

export default TabButton;
