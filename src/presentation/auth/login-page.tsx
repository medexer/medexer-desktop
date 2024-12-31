import {
    Anchor,
	Box,
	Button,
	Flex,
	PasswordInput,
	Stack,
	Text,
	TextInput,
	Title,
} from '@mantine/core';
import {useForm} from '@mantine/form';
import {Link} from 'react-router-dom';
import {SigninAsDTO, SigninAsDTOAccountTypeEnum} from '@/core/sdk/auth';
import useLoginMutation from '@/core/hooks/auth/useLoginMutation';
import LeftAuthPanel from '@/components/panels/left-auth-panel';

export default function LoginPage() {
	const {mutate, isPending} = useLoginMutation();

	const form = useForm<SigninAsDTO>({
		mode: 'uncontrolled',
		initialValues: {
			email: '',
			password: '',
			accountType: SigninAsDTOAccountTypeEnum.DonationCenter,
		},
		validate: {
			email: (value) =>
				/^\S+@\S+$/.test(value ?? '') ? null : 'Invalid email',
		},
	});

	return (
		<Flex h='100vh' w='100%'>
			<LeftAuthPanel/>

			<Box style={{flex: 1, padding: '40px', alignContent: 'center'}}>
				<Box maw={'70%'} mx='auto'>
					<Title order={2} mb={30}>
						Welcome back
					</Title>

					<Box mb={40}>
						<Text c='dimmed' span>
							Don't have an account?{' '}
						</Text>
						<Anchor
							component={Link}
							to='/register'
							underline='never'
							fw={500}
						>
							Sign up
						</Anchor>
					</Box>

					<form
						onSubmit={form.onSubmit((values) =>
							mutate(values as unknown as SigninAsDTO)
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

							<PasswordInput
								size='lg'
								label='Password'
								placeholder='Enter password'
								styles={{
									label: {fontSize: '16px'},
									root: {fontSize: '14px'},
									input: {fontSize: '14px'},
								}}
								{...form.getInputProps('password')}
							/>
							<Box mt={-5}>
								<Anchor
									component={Link}
									to='/forgot-password'
									underline='never'
									size='sm'
									style={{
										display: 'block',
										textAlign: 'right',
									}}
								>
									Forgot password?
								</Anchor>
							</Box>
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
