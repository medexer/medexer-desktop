import {useAppContext} from '@/core/context';
import {operationsApi} from '@/core/api/sdk';
import {useQuery} from '@tanstack/react-query';

export default function useGetDonationCenterOperationsConfigQuery() {
	const {authToken, donationCenterProfile, setOperationsConfig} =
		useAppContext();

	return useQuery({
		queryKey: ['get-donation-center-operations-config', authToken],
		queryFn: async () => {
			const response =
				await operationsApi.operationsControllerGetDonationCenterOperationsInfo(
					Number(donationCenterProfile?.id!)
				);

			setOperationsConfig(response.data);

			return response.data;
		},
		enabled: !!authToken,
	});
}
