import {
	DonationCenterComplianceInfo,
} from '@/core/sdk/donation-center';
import {complianceApi} from '@core/api/sdk';
import {useMutation} from '@tanstack/react-query';

export default function useFetchDonationCenterComplianceDetailsMutation() {
	return useMutation({
		mutationFn: async () => {
			const response =
				await complianceApi.donationCenterControllerGetComplianceInfo();

			return response.data;
		},
		onError: () => {},
		onSuccess(data: DonationCenterComplianceInfo) {
			console.log(
				'FETCH-DONATION-CENTER-COMPLIANCE-DETAILS-SUCCESS :: ',
				data
			);

			return data;
		},
	});
}
