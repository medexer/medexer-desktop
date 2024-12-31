import {
	Box,
	Button,
	Center,
	Flex,
	PinInput,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import {useForm} from '@mantine/form';
import {useLocation} from 'react-router-dom';
import {showNotification} from '@mantine/notifications';
import {ResetPasswordVerificationDTO} from '@/core/sdk/auth';
import LeftAuthPanel from '@/components/panels/left-auth-panel';
import {validateForgotPasswordVerificationForm} from './auth.validations';
import useForgotPasswordVerificationMutation from '@/core/hooks/auth/useForgotPasswordVerificationMutation';
import useForgotPasswordMutation from '@/core/hooks/auth/useForgotPasswordMutation';
import {useEffect, useState} from 'react';

export default function ForgotPasswordVerificationPage() {
	const [timer, setTimer] = useState(0);

	const resendVerificationCode = useForgotPasswordMutation();

	const {mutate, isPending} = useForgotPasswordVerificationMutation();

	const {email} = useLocation().state as {email: string};

	const form = useForm<ResetPasswordVerificationDTO>({
		mode: 'uncontrolled',
		initialValues: {
			otp: '',
			email: email,
		},
		validate: {
			email: (value) =>
				/^\S+@\S+$/.test(value ?? '') ? null : 'Invalid email',
		},
	});

	useEffect(() => {
        if (timer > 0) {
            const intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [timer]);

	const submitHandler = async (values: ResetPasswordVerificationDTO) => {
		const message = validateForgotPasswordVerificationForm(values);

		if (message) {
			return showNotification({
				message,
				color: 'red',
				title: 'Error',
			});
		}

		mutate(values as unknown as ResetPasswordVerificationDTO);
	};

	return (
		<Flex h='100vh' w='100%'>
			<LeftAuthPanel />

			<Box style={{flex: 1, padding: '40px', alignContent: 'center'}}>
				<Box maw={'70%'} mx='auto'>
					<Box mb={40}>
						<Title order={2} mb={30}>
							Enter verification code
						</Title>
						<Text c='dimmed' span>
							Enter the verification code sent to{' '}
							<Text span fw={700} c='black'>
								{email}
							</Text>{' '}
							via email.
						</Text>
					</Box>

					<form
						onSubmit={form.onSubmit(async (values) =>
							submitHandler(values)
						)}
					>
						<Stack>
							<Center>
								<PinInput
									size='xl'
									radius='lg'
									inputMode='numeric'
									{...form.getInputProps('otp')}
								/>
							</Center>

							<Center>
								<Text size='sm' c='dimmed'>
									Didn't receive the code?{' '}
									{timer > 0 ? (
										<Text span c='dimmed'>
											Wait {timer} seconds to resend
										</Text>
									) : (
										<Text
											span
											c='medexer'
											style={{cursor: 'pointer'}}
											onClick={() => {
												setTimer(60);
												resendVerificationCode.mutate({
													email,
												});
											}}
										>
											Resend verification code
										</Text>
									)}
								</Text>
							</Center>

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
