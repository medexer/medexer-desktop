import {
	Box,
	Text,
	Paper,
	Stack,
	Group,
	Loader,
	Button,
	Divider,
	TextInput,
} from '@mantine/core';
import {useForm} from '@mantine/form';
import {useEffect, useState} from 'react';
import {useAppContext} from '@/core/context';
import {showNotification} from '@mantine/notifications';
import ImageDropzoneBox from '@/components/upload/ImageDropzoneBox';
import {validateBusinessSettingsForm} from '../settings.validations';
import PhoneNumberInput from '@/components/input/phone-number-input';
import {UpdateDonationCenterProfileDTO} from '@/core/sdk/donation-center';
import useUpdateBusinessProfileMutation from '@/core/hooks/settings/useUpdateBusinessProfileMutation';

export default function BusinessSettingsTab() {
    const {donationCenterProfile} = useAppContext();

	const {mutate: updateBusinessProfile, isPending} =
		useUpdateBusinessProfileMutation();


	const [formValues, setFormValues] = useState<{
		countryCode: string;
		confirmPassword: string;
	}>({
		countryCode: '+234',
		confirmPassword: '',
	});

	const form = useForm<UpdateDonationCenterProfileDTO>({
		mode: 'uncontrolled',
		initialValues: {
			name: '',
			email: '',
			phone: '',
			coverPhoto: '',
		},
		validate: {},
	});

	useEffect(() => {
		if (donationCenterProfile) {
			form.setValues({
				...donationCenterProfile,
				phone: donationCenterProfile.phone?.replace('+234', ''),
			});
		}
	}, []);

	const submitHandler = (values: UpdateDonationCenterProfileDTO) => {
		const message = validateBusinessSettingsForm(values);

		if (message) {
			showNotification({
				title: 'Error',
				message,
				color: 'red',
			});

			return;
		}

		updateBusinessProfile(values);
	};

	return (
		<Paper bg='white' withBorder radius={'lg'} p={'md'} w={'60%'}>
			<Stack gap={5}>
				<Text fw={600}>Business Settings</Text>
				<Text fz={14}>
					Manage your business settings and preferences.
				</Text>
			</Stack>

			<Divider my={10} variant='dashed' />

			<form onSubmit={form.onSubmit(submitHandler)}>
				<Stack gap={10}>
					<Stack>
						<Box>
							<Text fw={'bold'}>Cover photo</Text>
							<Text size='sm' c={'dimmed'}>
								Add a cover photo to highlight your center.
								<span style={{color: 'red'}}>*</span>
							</Text>
						</Box>
						<ImageDropzoneBox
							onUploaded={(url) => {
								form.setFieldValue('coverPhoto', url);
							}}
							url={form.getValues().coverPhoto}
						/>
					</Stack>

					<TextInput
						size='lg'
						label='Business name'
						styles={{
							label: {fontSize: '16px'},
							root: {fontSize: '16px'},
							input: {fontSize: '16px'},
						}}
						placeholder='enter business name'
						{...form.getInputProps('name')}
					/>
					<TextInput
						size='lg'
						label='Business email'
						styles={{
							label: {fontSize: '16px'},
							root: {fontSize: '16px'},
							input: {fontSize: '16px'},
						}}
						placeholder='enter business email'
						{...form.getInputProps('email')}
					/>

					<PhoneNumberInput
						value={form.getValues().phone}
						onChangeHandler={(value) =>
							form.setFieldValue('phone', value)
						}
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
							'Update'
						)}
					</Button>
				</Stack>
			</form>
		</Paper>
	);
}
