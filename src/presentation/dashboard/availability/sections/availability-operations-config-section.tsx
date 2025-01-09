import {
	Box,
	Button,
	Divider,
	Flex,
	Group,
	Loader,
	NumberInput,
	Paper,
	Stack,
	Switch,
	Text,
} from '@mantine/core';
import {useEffect} from 'react';
import {useForm} from '@mantine/form';
import {useAppContext} from '@/core/context';
import {UpdateDonationCenterOperationsConfigDTO} from '@/core/sdk/donation-center';
import useUpdateDonationCenterOperationsConfigMutation from '@/core/hooks/availability/useUpdateDonationCenterOperationsConfigMutation';

export default function AvailabilityOperationsConfigSection() {
	const {operationsConfig} = useAppContext();

	const {mutate: updateDonationCenterOperationsConfig, isPending} =
		useUpdateDonationCenterOperationsConfigMutation();

	const form = useForm<UpdateDonationCenterOperationsConfigDTO>({
		mode: 'uncontrolled',
		initialValues: {
			maxAppointmentsPerDay: 10,
			isAcceptingAppointments: false,
			newAppointmentRequiresAction: false,
			isAppointmentNotificationsEnabled: false,
		},
		validate: {},
	});

	useEffect(() => {
		form.setFieldValue(
			'maxAppointmentsPerDay',
			operationsConfig?.maxAppointmentsPerDay!
		);
		form.setFieldValue(
			'isAcceptingAppointments',
			operationsConfig?.isAcceptingAppointments!
		);
		form.setFieldValue(
			'newAppointmentRequiresAction',
			operationsConfig?.newAppointmentRequiresAction!
		);
		form.setFieldValue(
			'isAppointmentNotificationsEnabled',
			operationsConfig?.isAppointmentNotificationsEnabled!
		);
	}, []);

	const submitHandler = (values: UpdateDonationCenterOperationsConfigDTO) => {
		console.log('SUBMIT-HANDLER :: ', values);
		updateDonationCenterOperationsConfig(values);
	};

	return (
		<Paper bg='white' withBorder radius={'lg'} p={'md'} w={'100%'}>
			<Flex justify={'space-between'} align={'center'}>
				<Text fw={600}>Configuration</Text>
				<Button
					type='button'
					color='white'
					w='fit-content'
					variant='filled'
					loading={isPending}
					styles={{
						root: {
							color: 'black',
							backgroundColor: 'white',
							border: '1px solid #11111120',
							'&:hover': {
								backgroundColor: 'white',
							},
						},
					}}
					onClick={() => {
						form.onSubmit(submitHandler)();
					}}
				>
					{isPending ? <Loader c='black' /> : 'Save Changes'}
				</Button>
			</Flex>

			<Divider my={20} />

			<Stack gap={25}>
				<Flex justify={'space-between'} align={'center'}>
					<Box>
						<Text fw={600} fz={16}>
							Appointment notifications
						</Text>
						<Text fz={14}>Receive alerts for new appointments</Text>
					</Box>
					<Switch
						styles={{
							thumb: {
								cursor: 'pointer',
							},
						}}
						checked={
							form.getValues().isAppointmentNotificationsEnabled
						}
						size='lg'
						color='green'
						{...form.getInputProps(
							'isAppointmentNotificationsEnabled'
						)}
					/>
				</Flex>

				<Flex justify={'space-between'} align={'center'}>
					<Box>
						<Text fw={600} fz={16}>
							Auto accept appointments
						</Text>
						<Text fz={14}>
							Automatically accept new appointments
						</Text>
					</Box>
					<Switch
						styles={{
							thumb: {
								cursor: 'pointer',
							},
						}}
						checked={form.getValues().newAppointmentRequiresAction}
						size='lg'
						color='green'
						{...form.getInputProps('newAppointmentRequiresAction')}
					/>
				</Flex>

				<Flex justify={'space-between'} align={'center'}>
					<Box>
						<Text fw={600} fz={16}>
							Currently accepting appointments
						</Text>
						<Text fz={14}>
							Set whether you are currently accepting appointments
						</Text>
					</Box>
					<Switch
						styles={{
							thumb: {
								cursor: 'pointer',
							},
						}}
						checked={form.getValues().isAcceptingAppointments}
						size='lg'
						color='green'
						{...form.getInputProps('isAcceptingAppointments')}
					/>
				</Flex>

				<Flex justify={'space-between'} align={'center'}>
					<Box>
						<Text fw={600} fz={16}>
							Max appointments per day
						</Text>
						<Text fz={14}>
							Set the maximum number of appointments per day
						</Text>
					</Box>
					<NumberInput
						h={'100%'}
						w={'15%'}
						min={0}
						value={form.getValues().maxAppointmentsPerDay}
						{...form.getInputProps('maxAppointmentsPerDay')}
					/>
				</Flex>
			</Stack>
		</Paper>
	);
}
