import {useContext} from 'react';
import {
	DonationCenterComplianceInfo,
	DonationCenterComplianceCredentialsDTO,
} from '@/core/sdk/donation-center';
import {complianceApi} from '@core/api/sdk';
import {nprogress} from '@mantine/nprogress';
import {useAppContext} from '@/core/context';
import {useMutation} from '@tanstack/react-query';
import { showNotification } from '@mantine/notifications';
import {OnboardingContext} from '@/presentation/dashboard/onboarding/onboarding-page';

export default function useUploadDonationCenterComplianceCredentialsMutation() {
	const {next} = useContext(OnboardingContext);

	const {setDonationCenterComplianceDetails} = useAppContext();

	return useMutation({
		mutationFn: async (values: DonationCenterComplianceCredentialsDTO) => {
			nprogress.start();

			const response =
				await complianceApi.donationCenterControllerUploadComplianceCredentials(
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
				'UPLOAD-DONATION-CENTER-COMPLIANCE-CREDENTIALS-SUCCESS :: ',
				data
			);

			setDonationCenterComplianceDetails(data);

			showNotification({
				color: 'green',
				title: 'Success',
				message: 'Center credentials uploaded successfully',
			});

			nprogress.reset();

			next();

			return data;
		},
	});
}
