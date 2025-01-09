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
	PasswordInput,
} from '@mantine/core';
import {useState} from 'react';
import {useForm} from '@mantine/form';
import {useAppContext} from '@/core/context';
import {showNotification} from '@mantine/notifications';
import {UpdateAccountPasswordDTO} from '@/core/sdk/account';
import {validatePasswordSettingsForm} from '../settings.validations';
import useUpdatePasswordMutation from '@/core/hooks/settings/useUpdatePasswordMutation';

export default function PasswordSettingsTab() {
	const {mutate: updatePassword, isPending} = useUpdatePasswordMutation();

	const [confirmPassword, setConfirmPassword] = useState<string>('');

	const form = useForm<UpdateAccountPasswordDTO>({
		mode: 'uncontrolled',
		initialValues: {
			newPassword: '',
			currentPassword: '',
		},
		validate: {},
	});

	const submitHandler = (values: UpdateAccountPasswordDTO) => {
		const message = validatePasswordSettingsForm(confirmPassword, values);

		if (message) {
			showNotification({
				title: 'Error',
				message,
				color: 'red',
			});

			return;
		}

		updatePassword(values, {
			onSuccess: () => {
				form.reset();
				setConfirmPassword('');
				form.setFieldValue('newPassword', '');
			},
		});
	};

	return (
		<Paper bg='white' withBorder radius={'lg'} p={'md'} w={'60%'}>
			<Stack gap={5}>
				<Text fw={600}>Change Password</Text>
				<Text fz={14}>Change your account password.</Text>
			</Stack>

			<Divider my={10} variant='dashed' />

			<form onSubmit={form.onSubmit(submitHandler)}>
				<Stack gap={10}>
					<PasswordInput
						size='lg'
						label='Current password'
						placeholder='enter current password'
						styles={{
							label: {fontSize: '16px'},
							root: {fontSize: '14px'},
							input: {fontSize: '14px'},
						}}
						{...form.getInputProps('currentPassword')}
					/>

					<PasswordInput
						size='lg'
						label='New password'
						placeholder='enter new password'
						styles={{
							label: {fontSize: '16px'},
							root: {fontSize: '14px'},
							input: {fontSize: '14px'},
						}}
						{...form.getInputProps('newPassword')}
					/>

					<PasswordInput
						size='lg'
						label='Confirm password'
						placeholder='Confirm password'
						styles={{
							label: {fontSize: '16px'},
							root: {fontSize: '14px'},
							input: {fontSize: '14px'},
						}}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setConfirmPassword(e.target.value)
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
