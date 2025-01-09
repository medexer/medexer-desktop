import {Box, Button, Center, Container, Stepper} from '@mantine/core';
import {createContext, useContext, useEffect} from 'react';
import {useLocalStorage} from '@mantine/hooks';
import OnboardingCenterDetailsStepper from './steppers/onboarding-center-details-stepper';
import OnboardingCenterAddressStepper from './steppers/onboarding-center-address-stepper';
import OnboardingCenterCredentialsStepper from './steppers/onboarding-center-credentials-stepper';
import OnboardingCompletedStepper from './steppers/onboarding-completed-stepper';
import {useAppContext} from '@/core/context';
import { useNavigate } from 'react-router-dom';

interface OnboardingContextType {
	step: number;
	setStep: (step: number) => void;
	next: () => void;
	back: () => void;
}
export const OnboardingContext = createContext<OnboardingContextType>({
	setStep: () => {},
	step: 1,
	next: () => {},
	back: () => {},
});

export default function OnboardingPage() {
	const [step, setStep] = useLocalStorage({
		key: 'onboardingStep',
		defaultValue: 0,
	});
	//   const { onSubmitSuccessful } = useSuccessModal();

	const handleStepChange = (nextStep: number) => {
		console.log('next step about to');
		const isOutOfBounds = nextStep > 4 || nextStep < 0;
		if (isOutOfBounds) {
			return;
		}
		setStep(nextStep);
		console.log(nextStep, ' next step added');
	};

	return (
		<OnboardingContext.Provider
			value={{
				setStep: setStep,
				step: step,
				next: () => {
					console.log(step, 'init');
					handleStepChange(step + 1);
				},
				back: () => {
					handleStepChange(step - 1);
				},
			}}
		>
			<PageRoot />
		</OnboardingContext.Provider>
	);
}

function PageRoot() {
	const navigate = useNavigate();
	const {step, setStep} = useContext(OnboardingContext);
	const {donationCenterComplianceDetails} = useAppContext();

	useEffect(() => {
		if (
			donationCenterComplianceDetails?.isComplianceUploaded &&
			donationCenterComplianceDetails?.isComplianceApproved
		) {
			navigate('/appointments');
		} else if (
			donationCenterComplianceDetails?.isComplianceUploaded &&
			!donationCenterComplianceDetails?.isComplianceApproved
		) {
			setStep(3);
		} else {
			setStep(0);
		}
	}, []);

	return (
		<>
			<Box mt={50}>
				<Container size={'sm'}>
					<Stepper active={step} color='dark' size='xs' iconSize={18}>
						<Stepper.Step label='Center details'>
							<OnboardingCenterDetailsStepper />
						</Stepper.Step>
						<Stepper.Step label='Address'>
							<OnboardingCenterAddressStepper />
						</Stepper.Step>
						<Stepper.Step label='Documents'>
							<OnboardingCenterCredentialsStepper />
						</Stepper.Step>
						<Stepper.Completed>
							<OnboardingCompletedStepper />
						</Stepper.Completed>
					</Stepper>
				</Container>
			</Box>
		</>
	);
}
