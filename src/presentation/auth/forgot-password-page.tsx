import {
	Box,
	Button,
	Center,
	Flex,
	Stack,
	Text,
	TextInput,
	Title,
} from '@mantine/core';
import {useForm} from '@mantine/form';
import {useNavigate} from 'react-router-dom';
import {ForgotPasswordDTO} from '@/core/sdk/auth';
import LeftAuthPanel from '@/components/panels/left-auth-panel';
import useForgotPasswordMutation from '@/core/hooks/auth/useForgotPasswordMutation';
import AuthBackButton from '@/components/buttons/auth-back-button';

export default function ForgotPasswordPage() {
	const navigate = useNavigate();

	const {mutate, isPending} = useForgotPasswordMutation();

	const form = useForm<ForgotPasswordDTO>({
		mode: 'uncontrolled',
		initialValues: {
			email: '',
		},
		validate: {
			email: (value) =>
				/^\S+@\S+$/.test(value ?? '') ? null : 'Invalid email',
		},
	});

	return (
		<Flex h='100vh' w='100%'>
			<LeftAuthPanel />

			<Box style={{flex: 1, padding: '40px', alignContent: 'center'}}>
				<Box maw={'70%'} mx='auto'>
					<Box mb={40}>
						<Flex align='center' gap='md' mb={30}>
							<AuthBackButton />
							<Title order={2}>Forgot your password?</Title>
						</Flex>
						<Title order={2} mb={30}>
							Forgot your password?
						</Title>
						<Text c='dimmed' span>
							Confirm your email and you will receive an otp to
							reset password.
						</Text>
					</Box>

					<form
						onSubmit={form.onSubmit((values) =>
							mutate(values as unknown as ForgotPasswordDTO)
						)}
					>
						<Stack>
							<TextInput
								size='lg'
								label='Email address'
								placeholder='admin@juth.com'
								styles={{
									root: {fontSize: '14px'},
									input: {fontSize: '14px'},
								}}
								{...form.getInputProps('email')}
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
