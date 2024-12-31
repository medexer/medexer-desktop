import {useContext} from 'react';
import {
	DonationCenterComplianceInfo,
	DonationCenterComplianceDetailsDTO,
} from '@/core/sdk/donation-center';
import {complianceApi} from '@core/api/sdk';
import {nprogress} from '@mantine/nprogress';
import {useAppContext} from '@/core/context';
import {useMutation} from '@tanstack/react-query';
import { showNotification } from '@mantine/notifications';
import {OnboardingContext} from '@/presentation/dashboard/onboarding/onboarding-page';

export default function useUploadDonationCenterComplianceDetailsMutation() {
	const {next, setStep} = useContext(OnboardingContext);

	const {setDonationCenterComplianceDetails} = useAppContext();

	return useMutation({
		mutationFn: async (values: DonationCenterComplianceDetailsDTO) => {
			nprogress.start();

			const response =
				await complianceApi.donationCenterControllerUploadComplianceDetails(
					values
				);

			nprogress.reset();

			return response.data;
		},
		onError: () => {
			nprogress.reset();
		},
		onSuccess(data: DonationCenterComplianceInfo) {
			console.log(
				'UPLOAD-DONATION-CENTER-COMPLIANCE-DETAILS-SUCCESS :: ',
				data
			);

			setDonationCenterComplianceDetails(data);

			showNotification({
				color: 'green',
				title: 'Success',
				message: 'Center details uploaded successfully',
			});

			nprogress.reset();

			setStep(1);

			return data;
		},
	});
}
