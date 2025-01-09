import {
	Box,
	Title,
	Text,
	Divider,
	Paper,
	Stack,
	Button,
	Loader,
	Flex,
} from '@mantine/core';
import {useForm} from '@mantine/form';
import {useAppContext} from '@/core/context';
import {OnboardingContext} from '../onboarding-page';
import {showNotification} from '@mantine/notifications';
import {useContext, useState, useRef} from 'react';
import FileEditBadge from '@/components/badges/file-edit-badge';
import FileUploadBadge from '@/components/badges/file-upload-badge';
import CustomBackButton from '@/components/buttons/custom-back-button';
import {validateOnboardingCredentialsForm} from '../onboarding.validations';
import {useFileUploadMutation} from '@/core/hooks/upload/useFileUploadMutation';
import {DonationCenterComplianceCredentialsDTO} from '@/core/sdk/donation-center';
import useUploadDonationCenterComplianceCredentialsMutation from '@/core/hooks/compliance/useUploadDonationCenterComplianceCredentialsMutation';

const OnboardingCenterCredentialsStepper = () => {
	const cacCertificateInputRef = useRef<HTMLInputElement>(null);
	const proofOfAddressInputRef = useRef<HTMLInputElement>(null);

	const {theme} = useAppContext();
	const {back} = useContext(OnboardingContext);

	const {mutateAsync: uploadFile} = useFileUploadMutation();

	const {mutate, isPending} =
		useUploadDonationCenterComplianceCredentialsMutation();

	const [formValues, setFormValues] = useState({
		cacCertificateDocumentName: '',
		proofOfAddressDocumentName: '',
	});

	const form = useForm<DonationCenterComplianceCredentialsDTO>({
		initialValues: {
			cacCertificate: '',
			proofOfAddress: '',
		},
		validateInputOnChange: true,
	});

	const handleFileUpload = async (files: File, field: string) => {
		const url = await uploadFile(files);

		form.setFieldValue(field, url ?? '');
	};

	const submitHandler = async (
		values: DonationCenterComplianceCredentialsDTO
	) => {
		console.log(values, 'values');

		const message = validateOnboardingCredentialsForm(values);

		if (message) {
			return showNotification({
				message,
				color: 'red',
				title: 'Message',
				position: 'top-right',
			});
		}

		mutate(values);
	};

	return (
		<Paper bg='white' withBorder radius={'lg'}>
			<Flex align='center' ml={20}>
				<CustomBackButton onTapHandler={back} />
				<Box p='md'>
					<Title order={3}>Center documentation</Title>
					<Text c={'dimmed'} size='sm'>
						Upload the required document to verify your business.
					</Text>
				</Box>
			</Flex>
			<Divider />

			<form
				onSubmit={form.onSubmit(async (values) => {
					await submitHandler(values);
				})}
			>
				<Stack p='md' gap='md'>
					<Paper
						p={20}
						w={'100%'}
						bg={theme?.colors.gray[1]}
						style={{borderRadius: '20px'}}
					>
						<Stack gap={2}>
							<FileUploadBadge />

							<Title order={4}>CAC Certificate</Title>
							<Text size='sm'>
								Please provide a copy of your CAC business
								registration.
							</Text>

							<input
								type='file'
								accept='image/jpeg, image/jpg, .pdf'
								ref={cacCertificateInputRef}
								style={{display: 'none'}}
								onChange={async (e) => {
									const file = e.target.files?.[0];

									if (file) {
										const fileName = file.name;

										await handleFileUpload(
											file,
											'cacCertificate'
										);

										setFormValues((prev) => ({
											...prev,
											cacCertificateDocumentName:
												fileName,
										}));
									}
								}}
							/>

							<Flex
								gap={20}
								align={'center'}
								justify={'space-between'}
							>
								{formValues.cacCertificateDocumentName && (
									<Flex align={'center'} gap={10} w='40%'>
										<FileEditBadge />
										<Text>
											{
												formValues.cacCertificateDocumentName
											}
										</Text>
									</Flex>
								)}

								<Button
									h={48}
									mt={15}
									type='button'
									color='white'
									w='fit-content'
									variant='filled'
									onClick={() => {
										cacCertificateInputRef.current?.click();
									}}
									loading={isPending}
									// disabled={isPending}
									styles={{
										root: {
											color: 'black',
											backgroundColor: 'white',
											border: '1px solid #11111120',
											'&:hover': {
												backgroundColor: 'white',
											},
										},
									}}
								>
									{isPending ? (
										<Loader color='white' size={30} />
									) :	 formValues.proofOfAddressDocumentName ? (
										'Change document'
									) : (
										'Upload document'
									)}
								</Button>
							</Flex>
						</Stack>
					</Paper>

					<Paper
						p={20}
						w={'100%'}
						bg={theme?.colors.gray[1]}
						style={{borderRadius: '20px'}}
					>
						<Stack gap={2}>
							<FileUploadBadge />

							<Title order={4}>Proof of Address</Title>
							<Text size='sm'>
								Submit a recent utility bill or lease agreement.
							</Text>

							<input
								type='file'
								accept='image/jpeg, image/jpg, .pdf'
								ref={proofOfAddressInputRef}
								style={{display: 'none'}}
								onChange={async (e) => {
									const file = e.target.files?.[0];

									if (file) {
										const fileName = file.name;

										await handleFileUpload(
											file,
											'proofOfAddress'
										);

										setFormValues((prev) => ({
											...prev,
											proofOfAddressDocumentName:
												fileName,
										}));
									}
								}}
							/>

							<Flex
								gap={20}
								align={'center'}
								justify={'space-between'}
							>
								{formValues.proofOfAddressDocumentName && (
									<Flex align={'center'} gap={10} w='40%'>
										<FileEditBadge />
										<Text>
											{
												formValues.proofOfAddressDocumentName
											}
										</Text>
									</Flex>
								)}

								<Button
									h={48}
									mt={15}
									type='button'
									color='white'
									w='fit-content'
									variant='filled'
									onClick={() => {
										proofOfAddressInputRef.current?.click();
									}}
									loading={isPending}
									// disabled={isPending}
									styles={{
										root: {
											color: 'black',
											backgroundColor: 'white',
											border: '1px solid #11111120',
											'&:hover': {
												backgroundColor: 'white',
											},
										},
									}}
								>
									{isPending ? (
										<Loader color='white' size={30} />
									) :	 formValues.proofOfAddressDocumentName ? (
										'Change document'
									) : (
										'Upload document'
									)}
								</Button>
							</Flex>
						</Stack>
					</Paper>

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

export default OnboardingCenterCredentialsStepper;
