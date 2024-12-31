import {nprogress} from '@mantine/nprogress';
import {useMutation} from '@tanstack/react-query';
import {addressHelperApi} from '@core/api/sdk';
import { GooglePlacePrediction } from '@/core/sdk/donation-center';

export default function useGooglePlacePredictionQuery() {
	return useMutation({
		mutationFn: async (searchQuery: string): Promise<GooglePlacePrediction[]> => {
			try {
				nprogress.start();
				const response =
					await addressHelperApi.addressHelperControllerGetGooglePlaceAutocomplete(
						searchQuery
					);
				nprogress.reset();
				return response.data;
			} catch (error) {
				nprogress.reset();
				console.log('[FETCH-PLACE-PREDICTIONS-ERROR] : ', error);
				return [];
			}
		},
	});
}
