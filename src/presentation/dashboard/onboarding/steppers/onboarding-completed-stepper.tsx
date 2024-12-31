import {Paper, Image, Title, Text, Box, Flex, Button} from '@mantine/core';
import {Time04Icon} from 'hugeicons-react';
import {useAppContext} from '@/core/context';
import {useContext, useState, useRef} from 'react';
import {OnboardingContext} from '../onboarding-page';
import OnboardingCompletedImage from '@/assets/images/image_onboarding_completed.jpg';

const OnboardingCompletedStepper = () => {
	const {theme} = useAppContext();
	const {setStep} = useContext(OnboardingContext);

	return (
		<Paper bg='white' withBorder radius={'lg'}>
			<Image
				height={160}
				width={'100%'}
				src={OnboardingCompletedImage}
				alt='Onboarding completed'
				style={{
					objectFit: 'cover',
					borderRadius: '15px 15px 0 0',
				}}
			/>

			<Box pl={20} pr={20} pb={20} mt={10}>
				<Title order={2} mt={20}>
					Account Pending Verification
				</Title>
				<Text mt={10}>
					Thank you for submitting your details. Our team will review
					your information, which may take two to three days. Once
					approved, you can start accepting appointments from donors
					on our blood donor app. We appreciate your patience.
				</Text>

				<Flex align={'center'} gap={20} mt={20}>
					<Button
						h={48}
						type='button'
						color='white'
						w='fit-content'
						variant='filled'
						fw={'bold'}
						onClick={() => {
							setStep(0);
						}}
						// loading={isPending}
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
						Edit details
					</Button>

					<Box h={48}>
						<Flex
							p={10}
							align={'center'}
							justify={'center'}
							gap={10}
							bg={'#007AFF40'}
							style={{borderRadius: '8px'}}
						>
							<Time04Icon color='#007AFF' />
							<Text c='#007AFF'>Pending approval</Text>
						</Flex>
					</Box>
				</Flex>
			</Box>
		</Paper>
	);
};

export default OnboardingCompletedStepper;
