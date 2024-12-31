import {donationCenterApi} from '@/core/api/sdk';
import { DonationCenterInfo } from '@/core/sdk/donation-center';
import {useMutation} from '@tanstack/react-query';

export default function useDonationCenterProfileMutation() {
	return useMutation({
		mutationKey: ['donation-center-profile'],
		mutationFn: async () => {
			const response = await donationCenterApi.donationCenterControllerGetDonationCenterProfile();
		
			return response.data;
		},
		onSuccess(data: DonationCenterInfo) {
			return data;
		},
	});
}
