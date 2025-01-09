import {
	Card,
	Group,
	Text,
	Stack,
	Button,
	Progress,
	Tooltip,
	Box,
} from '@mantine/core';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppContext} from '@/core/context';
import {ArrowDown01Icon} from 'hugeicons-react';

const FulfillmentRateCard: React.FC = () => {
	const {dashboardInfo} = useAppContext();
	const navigate = useNavigate();

	// Extracting fulfillment rate data from the API response
	const fulfillmentRate =
		dashboardInfo?.fulfillmentRate?.currentRate ?? '0.00%';
	const completedAppointments =
		dashboardInfo?.fulfillmentRate?.completedAppointments ?? 0;
	const rejectedAppointments =
		dashboardInfo?.fulfillmentRate?.rejectedAppointments ?? 0;
	const cancelledAppointments =
		dashboardInfo?.fulfillmentRate?.cancelledAppointments ?? 0;

	// Calculate total orders and percentages
	const totalAppointments =
		completedAppointments + rejectedAppointments + cancelledAppointments;
	const onTimePercentage = (
		(completedAppointments / totalAppointments) *
		100
	).toFixed(2);
	const rejectedPercentage = (
		(rejectedAppointments / totalAppointments) *
		100
	).toFixed(2);
	const cancelledPercentage = (
		(cancelledAppointments / totalAppointments) *
		100
	).toFixed(2);

	return (
		<Card withBorder p='lg' radius='md'>
			<Group justify='space-between'>
				<Text size='xl' fw={500}>
					Fulfillment Rate
				</Text>

				<Button
					variant='default'
					rightSection={<ArrowDown01Icon size={14} />}
					onClick={() => navigate('/appointments')}
				>
					View all
				</Button>
			</Group>

			<Group mt='md'>
				<Text
					size='32px'
					c='#111113'
					fw={700}
					style={{lineHeight: '40px', letterSpacing: '-1px'}}
				>
					{fulfillmentRate}
				</Text>
			</Group>
			<Text c='#111113'>Fulfillment Rate</Text>

			<Progress.Root w='100%' h='10px' mt='md'>
				<Tooltip label={`Completed appointments: ${onTimePercentage}%`}>
					<Progress.Section
						value={Number(onTimePercentage)}
						color='#16A34A'
					/>
				</Tooltip>
				<Tooltip
					label={`Rejected appointments: ${rejectedPercentage}%`}
				>
					<Progress.Section
						value={Number(rejectedPercentage)}
						color='orange'
					/>
				</Tooltip>
				<Tooltip
					label={`Cancelled appointments: ${cancelledPercentage}%`}
				>
					<Progress.Section
						value={Number(cancelledPercentage)}
						color='red.6'
					/>
				</Tooltip>
			</Progress.Root>
			<Stack mt='md' gap='xs'>
				<Group justify='space-between'>
					<Group>
						<Box
							w={8}
							h={24}
							bg='#16A34A'
							style={{
								backgroundColor: 'green',
								border: '1px solid #16A34A',
								borderRadius: '19px',
							}}
						/>
						<Text>Completed appointments</Text>
					</Group>
					<Text
						fw={500}
					>{`${completedAppointments} — ${fulfillmentRate}`}</Text>
				</Group>
				<Group justify='space-between'>
					<Group>
						<Box
							w={8}
							h={24}
							bg='orange'
							style={{
								backgroundColor: 'orange',
								border: '1px solid orange',
								borderRadius: '19px',
							}}
						/>
						<Text>Rejected appointments</Text>
					</Group>
					<Text
						fw={500}
					>{`${rejectedAppointments} — ${fulfillmentRate}`}</Text>
				</Group>
				<Group justify='space-between'>
					<Group>
						<Box
							w={8}
							h={24}
							bg='red'
							style={{
								backgroundColor: 'red',
								border: '1px solid red',
								borderRadius: '19px',
							}}
						/>
						<Text>Cancelled appointments</Text>
					</Group>
					<Text
						fw={500}
					>{`${cancelledAppointments} — ${fulfillmentRate}`}</Text>
				</Group>
			</Stack>
		</Card>
	);
};

export default FulfillmentRateCard;
