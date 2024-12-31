import {
	Box,
	Title,
	Text,
	Divider,
	Paper,
	Stack,
	Group,
	TextInput,
	Textarea,
	Button,
	Loader,
	Flex,
	Autocomplete,
} from '@mantine/core';
import {useForm} from '@mantine/form';
import {useContext, useEffect, useState} from 'react';
import {useAppContext} from '@/core/context';
import {showNotification} from '@mantine/notifications';
import {validateOnboardingAddressForm} from '../onboarding.validations';
import {
	DonationCenterComplianceAddressDTO,
	GooglePlacePrediction,
} from '@/core/sdk/donation-center';
import useUploadDonationCenterComplianceAddressMutation from '@/core/hooks/compliance/useUploadDonationCenterComplianceAddressMutation';
import CustomBackButton from '@/components/buttons/custom-back-button';
import {OnboardingContext} from '../onboarding-page';
import {nigerianStates} from '@/core/utilities';
import useGooglePlacePredictionQuery from '@/core/hooks/address/useGooglePlacePredictionMutation';

const OnboardingCenterAddressStepper = () => {
	const {back} = useContext(OnboardingContext);

	const {donationCenterComplianceDetails} = useAppContext();

	const {mutate, isPending} =
		useUploadDonationCenterComplianceAddressMutation();

	const [placePredictions, setPlacePredictions] = useState<
		GooglePlacePrediction[]
	>([]);

	const {mutate: predictPlaces} = useGooglePlacePredictionQuery();

	const form = useForm<DonationCenterComplianceAddressDTO>({
		initialValues: {
			address: '',
			buildingNumber: '',
			state: '',
			placeId: '',
			nearestLandMark: '',
		},
		validateInputOnChange: true,
	});

	useEffect(() => {
		if (donationCenterComplianceDetails) {
			form.setValues({
				...donationCenterComplianceDetails,
			});
		}
	}, [donationCenterComplianceDetails]);

	const submitHandler = async (
		values: DonationCenterComplianceAddressDTO
	) => {
		const message = validateOnboardingAddressForm(values);

		if (message) {
			return showNotification({
				message,
				color: 'red',
				title: 'Message',
				position: 'top-right',
			});
		}

		mutate(values);
	};

	return (
		<Paper bg='white' withBorder radius={'lg'}>
			<Flex align='center' ml={20}>
				<CustomBackButton onTapHandler={back} />
				<Box p='md'>
					<Title order={3}>Center address</Title>
					<Text c={'dimmed'} size='sm'>
						Provide the address of your center.
					</Text>
				</Box>
			</Flex>
			<Divider />

			<form
				onSubmit={form.onSubmit(async (values) => {
					await submitHandler(values);
				})}
			>
				<Stack p='md' gap='md'>
					<Autocomplete
						size='lg'
						styles={{
							label: {fontSize: '16px'},
							root: {fontSize: '16px'},
							input: {fontSize: '16px'},
						}}
						label='Search Address'
						placeholder={
							form.values.address
								? form.values.address
								: 'Start typing to search address...'
						}
						data={
							placePredictions?.map((prediction) => ({
								value: prediction.place_id,
								label: prediction.description,
							})) ?? []
						}
						onChange={(searchQuery) => {
							predictPlaces(searchQuery, {
								onSuccess: (data) => {
									setPlacePredictions(data ?? []);
								},
							});
						}}
						onOptionSubmit={(value) => {
							const option = placePredictions.find(
								(pred) => pred.place_id === value
							);

							if (option) {
								form.setFieldValue('placeId', option.place_id);
								form.setFieldValue(
									'address',
									option.description
								);
							}
						}}
					/>

					<TextInput
						size='lg'
						label='Building number'
						styles={{
							label: {fontSize: '16px'},
							root: {fontSize: '16px'},
							input: {fontSize: '16px'},
						}}
						placeholder='No 3A'
						{...form.getInputProps('buildingNumber')}
					/>

					<TextInput
						size='lg'
						label='Nearest landmark'
						styles={{
							label: {fontSize: '16px'},
							root: {fontSize: '16px'},
							input: {fontSize: '16px'},
						}}
						placeholder='Tender Hearts Academy'
						{...form.getInputProps('nearestLandMark')}
					/>

					<Autocomplete
						size='lg'
						label='State'
						placeholder='Abia'
						data={nigerianStates}
						{...form.getInputProps('state')}
					/>

					<Button
						h={56}
						mt={30}
						fullWidth
						type='submit'
						loading={isPending}
						variant='filled'
						color='medexer'
						disabled={isPending}
					>
						{isPending ? (
							<Loader color='white' size={30} />
						) : (
							'Continue'
						)}
					</Button>
				</Stack>
			</form>
		</Paper>
	);
};

export default OnboardingCenterAddressStepper;
