import {
	Loader,
	Flex,
	Divider,
	Paper,
	Stack,
	Text,
	TextInput,
	Group,
	Box,
	Button,
} from '@mantine/core';
import {useForm} from '@mantine/form';
import {useEffect, useState} from 'react';
import {useAppContext} from '@/core/context';
import {showNotification} from '@mantine/notifications';
import {validateAccountSettingsForm} from '../settings.validations';
import PhoneNumberInput from '@/components/input/phone-number-input';
import BoxedImageDropzoneBox from '@/components/upload/boxed-image-dropzone';
import useGetUserProfileQuery from '@/core/hooks/profile/useGetUserProfileQuery';
import {UpdateDonationCenterAccountProfileDTO} from '@/core/sdk/donation-center';
import useUpdateAccountProfileMutation from '@/core/hooks/settings/useUpdateAccountProfileMutation';

export default function AccountSettingsTab() {
	useGetUserProfileQuery();

	const {mutate: updateAccountProfile, isPending} =
		useUpdateAccountProfileMutation();

	const {profile} = useAppContext();

	const [formValues, setFormValues] = useState<{
		countryCode: string;
		confirmPassword: string;
	}>({
		countryCode: '+234',
		confirmPassword: '',
	});

	const form = useForm<UpdateDonationCenterAccountProfileDTO>({
		mode: 'uncontrolled',
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			profilePhoto: '',
		},
		validate: {},
	});

	useEffect(() => {
		if (profile) {
			form.setValues({
				...profile,
				phone: profile.phone?.replace('+234', ''),
			});
		}
	}, []);

	const submitHandler = (values: UpdateDonationCenterAccountProfileDTO) => {
		const message = validateAccountSettingsForm(values);

		if (message) {
			showNotification({
				title: 'Error',
				message,
				color: 'red',
			});

			return;
		}

		updateAccountProfile(values);
	};

	return (
		<Paper bg='white' withBorder radius={'lg'} p={'md'} w={'60%'}>
			<Stack gap={5}>
				<Text fw={600}>Account Settings</Text>
				<Text fz={14}>
					Manage your account settings and preferences.
				</Text>
			</Stack>

			<Divider my={10} variant='dashed' />

			<form onSubmit={form.onSubmit(submitHandler)}>
				<Stack gap={10}>
					<Group my='md'>
						<Box w={80}>
							<BoxedImageDropzoneBox
								onUploaded={(url) => {
									form.setFieldValue('profilePhoto', url);
								}}
								url={form.getValues().profilePhoto}
							/>
						</Box>
						<Box flex={1}>
							<Text fw={'bold'}>Profile photo </Text>
						</Box>
					</Group>
					<TextInput
						size='lg'
						label='First name'
						styles={{
							label: {fontSize: '16px'},
							root: {fontSize: '16px'},
							input: {fontSize: '16px'},
						}}
						placeholder='enter first name'
						{...form.getInputProps('firstName')}
					/>
					<TextInput
						size='lg'
						label='Last name'
						styles={{
							label: {fontSize: '16px'},
							root: {fontSize: '16px'},
							input: {fontSize: '16px'},
						}}
						placeholder='enter last name'
						{...form.getInputProps('lastName')}
					/>
					<TextInput
						size='lg'
						label='Email address'
						styles={{
							label: {fontSize: '16px'},
							root: {fontSize: '16px'},
							input: {fontSize: '16px'},
						}}
						placeholder='admin@binghamth.com'
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
