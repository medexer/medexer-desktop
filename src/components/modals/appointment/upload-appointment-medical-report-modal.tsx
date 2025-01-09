import {
	Modal,
	Button,
	Stack,
	Text,
	Group,
	Select,
	Flex,
	Divider,
} from '@mantine/core';
import {useForm} from '@mantine/form';
import {
	DonationCenterAppointmentInfo,
	UploadTestResultsDTO,
	UploadTestResultsDTOBloodGroupEnum,
	UploadTestResultsDTOGenotypeEnum,
} from '@/core/sdk/donation-center/api';
import useUploadAppointmentMedicalReportMutation from '@/core/hooks/appointments/useUploadAppointmentMedicalReportMutation';

interface UploadAppointmentMedicalReportModalProps {
	opened: boolean;
	onClose: () => void;
	appointment: DonationCenterAppointmentInfo;
}

export default function UploadAppointmentMedicalReportModal({
	opened,
	onClose,
	appointment,
}: UploadAppointmentMedicalReportModalProps) {
	const form = useForm<Partial<UploadTestResultsDTO>>({
		mode: 'uncontrolled',
		initialValues: {
			hiv1: false,
			hiv2: false,
			hepatitisB: false,
			hepatitisC: false,
			syphilis: false,
			genotype: undefined,
			bloodGroup: undefined,
		},
		validate: {
			genotype: (value) => {
				if (value === undefined) {
					return 'Genotype is required';
				}

				return null;
			},

			bloodGroup: (value) => {
				if (value === undefined) {
					return 'Blood group is required';
				}

				return null;
			},
		},
	});

	const {mutate: uploadAppointmentMedicalReport, isPending} =
		useUploadAppointmentMedicalReportMutation();

	const submitHandler = (values: Partial<UploadTestResultsDTO>) => {
		console.log('Form submitted with values:', values);

		uploadAppointmentMedicalReport(
			{
				appointmentId: Number(appointment.id),
				values: values as UploadTestResultsDTO,
			},
			{
				onSuccess: () => {
					onClose();
				},
			}
		);
	};

	return (
		<Modal
			size='xl'
			centered
			radius={'lg'}
			opened={opened}
			onClose={onClose}
			title={<Text fw={600}>Upload Medical Report</Text>}
		>
			<Stack pb={10}>
				<Text>
					Donor:{' '}
					<Text span fw={700}>
						{appointment.donorName}
					</Text>
				</Text>
				<Text>
					Appointment ID:{' '}
					<Text span fw={700}>
						{appointment.appointmentId}
					</Text>
				</Text>

				<Divider color='black' />

				<form onSubmit={form.onSubmit(submitHandler)}>
					<Group w={'100%'} gap={10}>
						<Select
							size='lg'
							w={'100%'}
							radius={'lg'}
							withAsterisk
							label='Syphilis'
							value={form.values.syphilis ? 'Active' : 'Inactive'}
							placeholder='Pick value'
							data={['Active', 'Inactive']}
							styles={{
								label: {fontSize: '16px'},
								input: {fontSize: '16px'},
							}}
							onChange={(value) => {
								form.setFieldValue(
									'syphilis',
									value === 'Active'
								);
							}}
						/>

						<Flex w={'100%'} justify='space-between'>
							<Select
								size='lg'
								w={'48%'}
								value={form.values.genotype}
								label='Genotype'
								radius={'lg'}
								placeholder='e.g AS'
								withAsterisk
								error={form.errors.genotype}
								data={Object.values(
									UploadTestResultsDTOGenotypeEnum
								)}
								styles={{
									input: {fontSize: '16px'},
									label: {fontSize: '16px'},
								}}
								onChange={(value) => {
									form.setFieldValue(
										'genotype',
										value as UploadTestResultsDTOGenotypeEnum
									);
								}}
							/>
							<Select
								size='lg'
								w={'48%'}
								radius={'lg'}
								withAsterisk
								error={form.errors.bloodGroup}
								value={form.values.bloodGroup}
								label='Blood group'
								placeholder='e.g AA'
								data={Object.values(
									UploadTestResultsDTOBloodGroupEnum
								)}
								styles={{
									input: {fontSize: '16px'},
									label: {fontSize: '16px'},
								}}
								onChange={(value) => {
									form.setFieldValue(
										'bloodGroup',
										value as UploadTestResultsDTOBloodGroupEnum
									);
								}}
							/>
						</Flex>
						<Flex w={'100%'} justify='space-between'>
							<Select
								size='lg'
								w={'48%'}
								label='HIV 1'
								radius={'lg'}
								value={form.values.hiv1 ? 'Active' : 'Inactive'}
								placeholder='e.g Active'
								data={['Active', 'Inactive']}
								styles={{
									input: {fontSize: '16px'},
									label: {fontSize: '16px'},
								}}
								onChange={(value) => {
									form.setFieldValue(
										'hiv1',
										value === 'Active'
									);
								}}
							/>
							<Select
								size='lg'
								w={'48%'}
								radius={'lg'}
								label='HIV 2'
								value={form.values.hiv2 ? 'Active' : 'Inactive'}
								placeholder='e.g Active'
								data={['Active', 'Inactive']}
								styles={{
									input: {fontSize: '16px'},
									label: {fontSize: '16px'},
								}}
								onChange={(value) => {
									form.setFieldValue(
										'hiv2',
										value === 'Active'
									);
								}}
							/>
						</Flex>
						<Flex w={'100%'} justify='space-between'>
							<Select
								size='lg'
								w={'48%'}
								radius={'lg'}
								label='Hepatitis B(HBV)'
								value={
									form.values.hepatitisB
										? 'Active'
										: 'Inactive'
								}
								placeholder='e.g Active'
								data={['Active', 'Inactive']}
								styles={{
									input: {fontSize: '16px'},
									label: {fontSize: '16px'},
								}}
								onChange={(value) => {
									form.setFieldValue(
										'hepatitisB',
										value === 'Active'
									);
								}}
							/>
							<Select
								size='lg'
								w={'48%'}
								radius={'lg'}
								label='Hepatitis C(HCV)'
								value={
									form.values.hepatitisC
										? 'Active'
										: 'Inactive'
								}
								placeholder='e.g Active'
								data={['Active', 'Inactive']}
								styles={{
									input: {fontSize: '16px'},
									label: {fontSize: '16px'},
								}}
								onChange={(value) => {
									form.setFieldValue(
										'hepatitisC',
										value === 'Active'
									);
								}}
							/>
						</Flex>

						<Button
							h={56}
							mt={20}
							fullWidth
							type='submit'
							variant='filled'
							loading={isPending}
							disabled={isPending}
							color={form.isValid() ? 'medexer' : '#007AFF40'}
							radius={'lg'}
						>
							Save
						</Button>
					</Group>
				</form>
			</Stack>
		</Modal>
	);
}
