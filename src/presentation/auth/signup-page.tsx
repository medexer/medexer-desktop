import {
	Box,
	Flex,
	Text,
	Stack,
	Title,
	Loader,
	Anchor,
	Button,
	TextInput,
	PasswordInput,
} from '@mantine/core';
import {useState} from 'react';
import {useForm} from '@mantine/form';
import {Link} from 'react-router-dom';
import {validateSignupForm} from './auth.validations';
import {showNotification} from '@mantine/notifications';
import {CreateDonationCenterAccountDTO} from '@/core/sdk/auth';
import LeftAuthPanel from '@/components/panels/left-auth-panel';
import useSignupMutation from '@/core/hooks/auth/useSignupMutation';
import PhoneNumberInput from '@/components/input/phone-number-input';

export default function SigupPage() {
	const {mutate, isPending} = useSignupMutation();

	const form = useForm<CreateDonationCenterAccountDTO>({
		mode: 'uncontrolled',
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			name: '',
			password: '',
		},
		validate: {},
	});

	const [formValues, setFormValues] = useState<{
		countryCode: string;
		confirmPassword: string;
	}>({
		countryCode: '+234',
		confirmPassword: '',
	});

	const submitHandler = (values: CreateDonationCenterAccountDTO) => {
		const message = validateSignupForm(formValues.confirmPassword, values);

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
		<Flex h='100vh' w='100%'>
			<LeftAuthPanel />

			<Box style={{flex: 1, padding: '40px', alignContent: 'center'}}>
				<Box maw={'70%'} mx='auto'>
					<Title order={2} mb={30}>
						Get started
					</Title>

					<Box mb={40}>
						<Text c='dimmed' span>
							Already have an account?{' '}
						</Text>
						<Anchor
							component={Link}
							to='/login'
							underline='never'
							fw={500}
						>
							Sign in
						</Anchor>
					</Box>

					<form
						onSubmit={form.onSubmit(async (values) =>
							submitHandler(values)
						)}
					>
						<Stack gap={8}>
							<Flex justify='space-between' gap='md'>
								<TextInput
									size='lg'
									label='First name'
									styles={{
										label: {fontSize: '16px'},
										root: {fontSize: '16px'},
										input: {fontSize: '16px'},
									}}
									placeholder='enter first name'
									w='50%'
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
									w='50%'
									{...form.getInputProps('lastName')}
								/>
							</Flex>

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
								value={form.values.phone}
								onChange={(value) =>
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

							<Flex justify='space-between' gap='md'>
								<PasswordInput
									size='lg'
									w='50%'
									label='Password'
									placeholder='Enter password'
									styles={{
										label: {fontSize: '16px'},
										root: {fontSize: '16px'},
										input: {fontSize: '16px'},
									}}
									{...form.getInputProps('password')}
								/>
								<PasswordInput
									size='lg'
									w='50%'
									label='Confirm password'
									placeholder='Confirm password'
									styles={{
										label: {fontSize: '16px'},
										root: {fontSize: '16px'},
										input: {fontSize: '16px'},
									}}
									onChange={(
										event: React.ChangeEvent<HTMLInputElement>
									) => {
										setFormValues({
											...formValues,
											confirmPassword:
												event.currentTarget.value,
										});
									}}
								/>
							</Flex>

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

							<Text size='sm' c='dimmed' ta='center'>
								By continuing, you automatically accept our{' '}
								<Anchor href='#' underline='always'>
									Terms & Conditions
								</Anchor>
								,{' '}
								<Anchor href='#' underline='always'>
									Privacy Policy
								</Anchor>{' '}
								and{' '}
								<Anchor href='#' underline='always'>
									cookies policy
								</Anchor>
							</Text>
						</Stack>
					</form>
				</Box>
			</Box>
		</Flex>
	);
}
