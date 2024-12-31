import {
	Box,
	Button,
	Center,
	Flex,
	PasswordInput,
	PinInput,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import {useForm} from '@mantine/form';
import {useLocation} from 'react-router-dom';
import {showNotification} from '@mantine/notifications';
import {
	ResetPasswordDTO,
	ResetPasswordOTPVerificationResponsePayload,
} from '@/core/sdk/auth';
import LeftAuthPanel from '@/components/panels/left-auth-panel';
import useResetPasswordMutation from '@/core/hooks/auth/useResetPasswordMutation';
import {useState} from 'react';

export default function ResetPasswordPage() {
	const {mutate, isPending} = useResetPasswordMutation();

	const {data} = useLocation().state as {
		data: ResetPasswordOTPVerificationResponsePayload;
	};

	const [confirmPassword, setConfirmPassword] = useState<string>('');

	const form = useForm<ResetPasswordDTO>({
		mode: 'uncontrolled',
		initialValues: {
			passwordResetToken: data.passwordResetToken,
			accountId: data.accountId,
			newPassword: '',
		},
		validate: {},
	});

	const submitHandler = async (values: ResetPasswordDTO) => {
		if (values.newPassword.length < 8) {
			return showNotification({
				color: 'red',
				title: 'Error',
				message: 'Password must be at least 8 characters',
			});
		} else if (values.newPassword !== confirmPassword) {
			return showNotification({
				message: 'Passwords do not match',
				color: 'red',
				title: 'Error',
			});
		}

		mutate(values as unknown as ResetPasswordDTO);
	};

	return (
		<Flex h='100vh' w='100%'>
			<LeftAuthPanel />

			<Box style={{flex: 1, padding: '40px', alignContent: 'center'}}>
				<Box maw={'70%'} mx='auto'>
					<Box mb={40}>
						<Title order={2} mb={30}>
							Reset your password
						</Title>
						<Text c='dimmed' span>
							Enter a new password to secure your account
						</Text>
					</Box>

					<form
						onSubmit={form.onSubmit(async (values) =>
							submitHandler(values)
						)}
					>
						<Stack>
							<PasswordInput
								size='lg'
								label='Password'
								placeholder='Enter password'
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
								onChange={(
									e: React.ChangeEvent<HTMLInputElement>
								) => setConfirmPassword(e.target.value)}
							/>

							<Button
								h={56}
								fullWidth
								type='submit'
								loading={isPending}
								variant='filled'
								color='medexer'
								mt={10}
							>
								Continue
							</Button>
						</Stack>
					</form>
				</Box>
			</Box>
		</Flex>
	);
}
