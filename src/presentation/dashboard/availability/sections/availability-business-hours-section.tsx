import {
	Badge,
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
import {TimeInput} from '@mantine/dates';
import {Moon02Icon} from 'hugeicons-react';
import {useAppContext} from '@/core/context';
import {UpdateDonationCenterWorkingHoursConfigDTO} from '@/core/sdk/donation-center';
import useUpdateDonationCenterOperationsWorkingHoursMutation from '@/core/hooks/availability/useUpdateDonationCenterOperationsWorkingHoursMutation';

export default function AvailabilityBusinessHoursConfigSection() {
	const {operationsConfig} = useAppContext();

	const {mutate: updateDonationCenterOperationsWorkingHours, isPending} =
		useUpdateDonationCenterOperationsWorkingHoursMutation();

	const form = useForm<UpdateDonationCenterWorkingHoursConfigDTO>({
		mode: 'uncontrolled',
		initialValues: {
			daysOfWork: [],
		},
		validate: {},
	});

	useEffect(() => {
		if (operationsConfig?.daysOfWork) {
			// Create a new array with all required properties
			const formattedDaysOfWork = operationsConfig.daysOfWork.map(
				(day) => ({
					id: day.id,
					day: day.day,
					closed: day.closed || false,
					open: day.open || '',
					close: day.close || '',
				})
			);
			form.setValues({daysOfWork: formattedDaysOfWork});
		}
	}, []);

	const submitHandler = (
		values: UpdateDonationCenterWorkingHoursConfigDTO
	) => {
		console.log('SUBMIT-HANDLER :: ', values);

		updateDonationCenterOperationsWorkingHours(values);
	};

	return (
		<Paper bg='white' withBorder radius={'lg'} p={'md'} w={'100%'}>
			<Flex justify={'space-between'} align={'center'}>
				<Text fw={600}>Business Hours</Text>
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
				{operationsConfig.daysOfWork?.map((dayOfWork, index) => (
					<Flex
						key={dayOfWork.id!}
						justify={'space-between'}
						align={'center'}
					>
						<Flex gap={10} align={'center'}>
							<Switch
								styles={{
									thumb: {
										cursor: 'pointer',
									},
								}}
								checked={
									!form.getValues().daysOfWork[index]?.closed
								}
								size='sm'
								color='green'
								onChange={(event) => {
									form.setFieldValue(
										`daysOfWork.${index}.closed`,
										!event.currentTarget.checked
									);
								}}
								// {...form.getInputProps(
								// 	`daysOfWork.${index}.closed`
								// )}
							/>
							<Text fw={600} fz={14} tt={'uppercase'}>
								{dayOfWork.day}
							</Text>
						</Flex>

						{form
							.getValues()
							.daysOfWork.find((d) => d.day === dayOfWork.day)
							?.closed === true ? (
							<Badge
								px={10}
								py={20}
								w={'30%'}
								leftSection={<Moon02Icon size={16} />}
								color={'gray'}
								variant='light'
								styles={{
									root: {
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									},
								}}
							>
								CLOSED
							</Badge>
						) : (
							<Flex gap={10} align={'center'}>
								<Text fz={13}>From</Text>
								<TimeInput
									value={
										form.getValues().daysOfWork[index]
											?.open || ''
									}
									placeholder='Select time'
									styles={{
										label: {fontSize: '16px'},
										input: {fontSize: '16px'},
									}}
									onChange={(event) => {
										const newValue =
											event.currentTarget.value;

										console.log('NEW-VALUE :: ', newValue);

										form.setFieldValue(
											`daysOfWork.${index}.open`,
											newValue
										);
									}}
								/>
								<Text fz={13}>To</Text>
								<TimeInput
									value={
										form.getValues().daysOfWork[index]
											?.close || ''
									}
									placeholder='Select time'
									styles={{
										label: {fontSize: '16px'},
										input: {fontSize: '16px'},
									}}
									onChange={(event) => {
										const newValue =
											event.currentTarget.value;
										form.setFieldValue(
											`daysOfWork.${index}.close`,
											newValue
										);
									}}
								/>
							</Flex>
						)}
					</Flex>
				))}
			</Stack>
		</Paper>
	);
}
