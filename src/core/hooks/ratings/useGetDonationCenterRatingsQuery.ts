import {ratingsApi} from '@/core/api/sdk';
import {useAppContext} from '@/core/context';
import {useQuery} from '@tanstack/react-query';

export default function useGetDonationCenterRatingsQuery() {
	const {authToken} = useAppContext();

	return useQuery({
		queryKey: ['get-donation-center-ratings', authToken],
		queryFn: async () => {
			const response =
				await ratingsApi.donationCenterControllerGetDonationCenterRatings();

			return response.data;
		},
		enabled: !!authToken,
	});
}
