import {
	Text,
	Modal,
	Stack,
	Loader,
	Button,
	TextInput,
	Textarea,
} from '@mantine/core';
import {useEffect} from 'react';
import {useForm} from '@mantine/form';
import {useAppContext} from '@/core/context';
import {ContactUsDTO} from '@/core/sdk/account/api';
import useSupportInquiryMutation from '@/core/hooks/support/useSupportInquiryMutation';

interface SupportInquiryModalProps {
	opened: boolean;
	onClose: () => void;
}

export default function SupportInquiryModal({
	opened,
	onClose,
}: SupportInquiryModalProps) {
	const {profile} = useAppContext();

	const {mutate: submitSupportInquiry, isPending} =
		useSupportInquiryMutation();

	const form = useForm<ContactUsDTO>({
		initialValues: {
			subject: '',
			message: '',
			name: '',
			email: '',
		},
		validate: {
			subject: (value) =>
				value.length < 3
					? 'Subject must be at least 3 characters'
					: null,
			message: (value) =>
				value.length < 50
					? 'Message must be at least 50 characters'
					: null,
		},
	});

	useEffect(() => {
		form.setFieldValue('email', profile?.email!);
		form.setFieldValue(
			'name',
			profile?.firstName?.concat(' ', profile?.lastName)
		);
	}, [profile]);

	const submitHandler = (values: ContactUsDTO) => {
		submitSupportInquiry(values, {
			onSuccess: () => {
				onClose();
			},
		});
	};

	return (
		<>
			<Modal
				centered
				size='lg'
				radius={'lg'}
				opened={opened}
				onClose={onClose}
				title={<Text fw={600}>Support Inquiry</Text>}
			>
				<form onSubmit={form.onSubmit(submitHandler)}>
					<Stack pb={10}>
						<TextInput
							size='lg'
							label='Subject'
							placeholder='enter subject'
							styles={{
								root: {fontSize: '14px'},
								input: {fontSize: '14px'},
							}}
							{...form.getInputProps('subject')}
						/>

						<Stack gap={2}>
							<Textarea
								minRows={4}
								rows={6}
								label='Message'
								maxLength={1000}
								styles={{
									root: {fontSize: '14px'},
									input: {fontSize: '14px'},
								}}
								placeholder='Enter your message'
								{...form.getInputProps('message')}
							/>
							<Text size='sm' c='dimmed' ta='right'>
								{form.values.message?.length || 0}/1000
							</Text>
						</Stack>

						<Button
							h={56}
							mt={20}
							fullWidth
							type='submit'
							variant='filled'
							radius={'lg'}
							loading={isPending}
							color={form.isValid() ? 'medexer' : '#007AFF40'}
						>
							{isPending ? <Loader /> : 'Submit'}
						</Button>
					</Stack>
				</form>
			</Modal>
		</>
	);
}


