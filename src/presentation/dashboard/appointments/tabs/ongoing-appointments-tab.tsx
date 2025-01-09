import {useMemo, useState} from 'react';
import {useMediaQuery} from '@mantine/hooks';
import {Search01Icon} from 'hugeicons-react';
import {useAppContext} from '@/core/context';
import {CalendarBlock01Icon} from 'hugeicons-react';
import TabButton from '@/components/buttons/tab-button';
import {AppointmentSection, AppointmentTab} from '@/core/types';
import {Box, Card, Divider, Group, Input, Text} from '@mantine/core';
import {DonationCenterAppointmentInfo} from '@/core/sdk/donation-center';
import useGetOngoingAppointmentsQuery from '@/core/hooks/appointments/useGetOngoingAppointmentsQuery';
import RenderActiveAppointmentsSection from '@/components/sections/render-active-appointments-section';

const OngoingAppointmentsTab = () => {
	useGetOngoingAppointmentsQuery();

	const {appointments} = useAppContext();

	const [searchTerm, setSearchTerm] = useState<string>('');
	const [activeTab, setActiveTab] = useState<string>('all');
	const isMobile = useMediaQuery('(max-width: 768px)');

	const appointmentSections: AppointmentSection[] = useMemo(
		() => [
			{
				title: 'NEW APPOINTMENTS',
				appointments: [],
				statuses: ['pending'],
				arrangement: 0,
			},
			{
				title: 'ACCEPTED APPOINTMENTS',
				appointments: [],
				statuses: ['accepted'],
				arrangement: 1,
			},
			{
				title: 'READY FOR PROCESSING',
				appointments: [],
				statuses: ['processing'],
				arrangement: 2,
			},
		],
		[]
	);

	const tabs: AppointmentTab[] = useMemo(
		() => [
			{value: 'all', label: 'All', count: 0},
			{value: 'pending', label: 'Pending', count: 0},
			{value: 'accepted', label: 'Accepted', count: 0},
			{value: 'processing', label: 'Processing', count: 0},
		],
		[]
	);

	const filteredAppointments = useMemo(() => {
		if (!appointments) return [];

		const normalizedSearchTerm = searchTerm.replace('#', '').toLowerCase();

		return (appointments ?? []).filter(
			(appointment: DonationCenterAppointmentInfo) =>
				appointment.appointmentId
					?.replace('#', '')
					.toLowerCase()
					.includes(normalizedSearchTerm) ||
				appointment.donorName
					?.toLowerCase()
					.includes(normalizedSearchTerm)
		);
	}, [appointments, searchTerm]);

	useMemo(() => {
		appointmentSections.forEach((section) => {
			section.appointments =
				filteredAppointments?.filter(
					(appointment: DonationCenterAppointmentInfo) => {
						return section.statuses.includes(
							appointment.status.toLowerCase() ?? ''
						);
					}
				) ?? [];
		});

		tabs.forEach((tab) => {
			if (tab.value === 'all') {
				tab.count = filteredAppointments.length;
			} else {
				const section = appointmentSections.find((_section) =>
					_section.statuses.includes(tab.value)
				);

				tab.count = section ? section.appointments.length : 0;
			}
		});
	}, [filteredAppointments, appointmentSections, tabs]);

	return (
		<Card
			p={0}
			radius='md'
			withBorder
			w='100%'
			style={{overflow: 'visible'}}
		>
			<Box px='lg' pt='lg'>
				<Group justify='space-between' mb={20}>
					<Input
						size='lg'
						style={{
							width: isMobile ? '200px' : '340px',
							fontSize: '16px',
							opacity: isMobile ? 1 : undefined,
						}}
						styles={{
							input: {
								fontSize: '16px',
								'::placeholder': {
									fontSize: '16px',
								},
							},
						}}
						value={searchTerm}
						leftSection={<Search01Icon size={20} />}
						placeholder='Search by appointment ID or name'
						onChange={(e) => setSearchTerm(e.currentTarget.value)}
					/>
					<Group align='center' justify='space-between' gap='xl'>
						<Group
							style={{
								width: '100%',
								padding: '3px',
								borderRadius: '8px',
								border: '1px solid #ECECEC',
							}}
						>
							{tabs.map((tab) => (
								<TabButton
									key={tab.value}
									tab={tab}
									activeTab={activeTab}
									setActiveTab={setActiveTab}
								/>
							))}
						</Group>
					</Group>
				</Group>
			</Box>
			<Divider />
			<Box>
				<RenderActiveAppointmentsSection
					activeTab={activeTab}
					appointmentSections={appointmentSections}
				/>
				{activeTab &&
					appointmentSections.find((section) =>
						section.statuses.includes(activeTab)
					)?.appointments.length === 0 && (
						<Box
							ta='center'
							py='xl'
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<CalendarBlock01Icon size={60} />
							<Text fw={700} fz='xl' mb='md'>
								No appointments found
							</Text>
							<Text c='dimmed'>
								There are no appointments in this category at
								the moment. Please check back later.
							</Text>
						</Box>
					)}

				{filteredAppointments.length === 0 && activeTab === 'all' && (
					<Box
						ta='center'
						py='xl'
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<CalendarBlock01Icon size={60} />
						<Text fw={700} fz='xl' mb='md'>
							No appointments
						</Text>
						<Text c='dimmed'>
							There are no appointments at this moment. Please
							check back later.
						</Text>
					</Box>
				)}
			</Box>
		</Card>
	);
};

export default OngoingAppointmentsTab;
