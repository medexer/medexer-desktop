import {useEffect, useState} from 'react';
import {useMediaQuery} from '@mantine/hooks';
import {useAppContext} from '@/core/context';
import {ArrowDown01Icon} from 'hugeicons-react';
import {generateDateRange} from '@/core/middlewares';
import {Box, Flex, Group, ScrollArea, Select, Text} from '@mantine/core';
import DashboardStatisticsCard from '@/components/cards/dashboard-statistics-card';
import useGetDashboardInfoQuery from '@/core/hooks/dashboard/useGetDashboardInfoQuery';

const DashboardOverviewStatsSection = () => {
	const {dashboardInfo} = useAppContext();

	const isMobile = useMediaQuery('(max-width: 768px)');
	const [selectedPeriod, setSelectedPeriod] = useState<string>('Yearly');

	const {startDate, endDate} = generateDateRange(selectedPeriod.toUpperCase() as 'MONTHLY' | 'WEEKLY' | 'DAILY' | 'YEARLY');

	console.log('DASHBOARD-OVERVIEW-STATS-SECTION-START-DATE', startDate);
	console.log('DASHBOARD-OVERVIEW-STATS-SECTION-END-DATE', endDate);

	useGetDashboardInfoQuery(startDate, endDate);

	const summaryCards = [
		{
			label: 'Appointments',
			value: dashboardInfo?.summary?.appointments!.toString(),
			change: Number(dashboardInfo?.summary?.appointmentsChange),
			prevValue: `${dashboardInfo?.summary?.previousMonthAppointments} in previous month`,
			color: dashboardInfo?.summary?.appointments > 3 ? '#1c1c1c' : '#dc7526',
		},
		{
			label: 'Pints',
			value: dashboardInfo?.summary?.pints!.toString(),
			change: Number(dashboardInfo?.summary?.pintsChange),
			prevValue: `${dashboardInfo?.summary?.previousMonthPints} in previous month`,
			color: dashboardInfo?.summary?.pints > 3 ?'#1c1c1c1c' : '#dc7526',
		},
		{
			label: 'Appointments Cancelled',
			value: dashboardInfo?.summary?.appointmentsCancelled!.toString(),
			change: Number(dashboardInfo?.summary?.appointmentsCancelledChange),
			prevValue: `${dashboardInfo?.summary?.previousMonthAppointmentsCancelled} in previous month`,
			color: dashboardInfo?.summary?.appointmentsCancelled > 3 ? '#1c1c1c' : '#dc7526',
		},
		{
			label: 'Donors Reached',
			value: dashboardInfo?.summary?.donorsReached!.toString(),
			change: Number(dashboardInfo?.summary?.donorsReachedChange),
			prevValue: `${dashboardInfo?.summary?.previousMonthDonorsReached} in previous month`,
			color: dashboardInfo?.summary?.donorsReached > 3 ? '#1c1c1c' : '#dc7526',
		},
	];

	return (
		<>
			<Box>
				<Group justify='flex-end' mb='xs' mt='xs'>
					<Text c='dimmed'>{dashboardInfo?.period}</Text>
					<Group>
						<Select
							placeholder='Monthly'
							rightSection={<ArrowDown01Icon size={16} />}
							rightSectionWidth={30}
							style={{width: 102}}
							data={['Monthly', 'Weekly', 'Daily', 'Yearly']}
							comboboxProps={{width: 140}}
							value={selectedPeriod}
							onChange={(value) => {
								setSelectedPeriod(value || 'Monthly');
							}}
						/>
					</Group>
				</Group>
			</Box>
			<ScrollArea mb='xl'>
				<Flex
					gap='md'
					style={{
						overflowX: isMobile ? 'auto' : 'visible',
						paddingBottom: isMobile ? 16 : 0,
					}}
				>
					{summaryCards.map((item, idx) => (
						<DashboardStatisticsCard
							key={idx}
							caption={`${item.prevValue}`}
							label={item.label}
							color={item.color || 'inherit'}
							value={item.value}
							valueCaption={
								<Text>
									{item.label === 'Charges'
										? item.change !== 0
											? `${item.change}%`
											: ''
										: item.change > 0
										? `↑${item.change}%`
										: item.change < 0
										? `↓${Math.abs(item.change)}%`
										: '0%'}
								</Text>
							}
						/>
					))}
				</Flex>
			</ScrollArea>
		</>
	);
};

export default DashboardOverviewStatsSection;
