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
} from '@mantine/core';
import {useForm} from '@mantine/form';
import {useEffect, useState} from 'react';
import {useAppContext} from '@/core/context';
import {showNotification} from '@mantine/notifications';
import ImageDropzoneBox from '@/components/upload/ImageDropzoneBox';
import PhoneNumberInput from '@/components/input/phone-number-input';
import {validateOnboardingDetailsForm} from '../onboarding.validations';
import BoxedImageDropzoneBox from '@/components/upload/boxed-image-dropzone';
import {DonationCenterComplianceDetailsDTO} from '@/core/sdk/donation-center';
import useUploadDonationCenterComplianceDetailsMutation from '@/core/hooks/compliance/useUploadDonationCenterComplianceDetailsMutation';

const OnboardingCenterDetailsStepper = () => {
	const {donationCenterComplianceDetails} = useAppContext();

	const {mutate, isPending} =
		useUploadDonationCenterComplianceDetailsMutation();

	const form = useForm<DonationCenterComplianceDetailsDTO>({
		initialValues: {
			email: '',
			phone: '',
			coverPhoto: '',
			logo: '',
			longDescription: '',
			shortDescription: '',
			name: '',
		},
		validateInputOnChange: true,
	});

	const [formValues, setFormValues] = useState<{
		countryCode: string;
	}>({
		countryCode: '+234',
	});

	useEffect(() => {
		if (donationCenterComplianceDetails) {
			form.setValues({
				...donationCenterComplianceDetails,
				phone: donationCenterComplianceDetails.phone?.replace(
					'+234',
					''
				),
			});
		}
	}, [donationCenterComplianceDetails]);

	const submitHandler = async (
		values: DonationCenterComplianceDetailsDTO
	) => {
		const message = validateOnboardingDetailsForm(values);

		if (message) {
			return showNotification({
				message,
				color: 'red',
				title: 'Message',
				position: 'top-right',
			});
		}

		mutate({...values, phone: formValues.countryCode + values.phone});
	};

	return (
		<Paper bg='white' withBorder radius={'lg'}>
			<Box p='md'>
				<Title order={3}>Setup your center profile</Title>
				<Text c={'dimmed'} size='sm'>
					Provide essential details to create a complete profile for
					your business.
				</Text>
			</Box>
			<Divider />

			<form
				onSubmit={form.onSubmit(async (values) => {
					await submitHandler(values);
				})}
			>
				<Stack p='md' gap='md'>
					<Group my='md'>
						<Box w={80}>
							<BoxedImageDropzoneBox
								onUploaded={(url) => {
									form.setFieldValue('logo', url);
								}}
								url={form.values.logo}
							/>
						</Box>
						<Box flex={1}>
							<Text fw={'bold'}>Upload business logo </Text>
							<Text size='sm' c={'dimmed'}>
								Display your business logo
								<span style={{color: 'red'}}>*</span>
							</Text>
						</Box>
					</Group>

					<Stack>
						<Box>
							<Text fw={'bold'}>Upload Cover photo</Text>
							<Text size='sm' c={'dimmed'}>
								Add a photo to highlight your center.
								<span style={{color: 'red'}}>*</span>
							</Text>
						</Box>
						<ImageDropzoneBox
							onUploaded={(url) => {
								form.setFieldValue('coverPhoto', url);
							}}
							url={form.values.coverPhoto}
						/>
					</Stack>

					<TextInput
						size='lg'
						label='Hospital name'
						styles={{
							label: {fontSize: '16px'},
							root: {fontSize: '16px'},
							input: {fontSize: '16px'},
						}}
						placeholder='enter hospital name'
						{...form.getInputProps('name')}
					/>

					<TextInput
						size='lg'
						label='Short description'
						styles={{
							label: {fontSize: '16px'},
							root: {fontSize: '16px'},
							input: {fontSize: '16px'},
						}}
						placeholder='enter short description'
						{...form.getInputProps('shortDescription')}
					/>

					<Textarea
						label='Long description'
						placeholder='enter long description'
						autosize
						minRows={4}
						maxRows={4}
						styles={{
							label: {fontSize: '16px'},
							root: {fontSize: '16px'},
							input: {fontSize: '16px'},
						}}
						{...form.getInputProps('longDescription')}
					/>

					<TextInput
						size='lg'
						label='Contact email'
						styles={{
							label: {fontSize: '16px'},
							root: {fontSize: '16px'},
							input: {fontSize: '16px'},
						}}
						placeholder='admin@binghamth.com'
						{...form.getInputProps('email')}
					/>

					<PhoneNumberInput
						value={form.values.phone}
						onChange={(value) => form.setFieldValue('phone', value)}
						countryCode={formValues.countryCode}
						onCountryCodeChange={(code) =>
							setFormValues({
								...formValues,
								countryCode: code,
							})
						}
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

export default OnboardingCenterDetailsStepper;
