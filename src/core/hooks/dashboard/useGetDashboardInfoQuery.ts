import {dashboardApi} from '@/core/api/sdk';
import {useAppContext} from '@/core/context';
import {useQuery} from '@tanstack/react-query';

export default function useGetDashboardInfoQuery(
	startDate?: string,
	endDate?: string
) {
	const {authToken, setDashboardInfo} = useAppContext();

	return useQuery({
		queryKey: ['get-dashboard-info', authToken, startDate, endDate],
		queryFn: async () => {
			console.log('DASHBOARD-INFO-QUERY-START-DATE', startDate);
			console.log('DASHBOARD-INFO-QUERY-END-DATE', endDate);

			const response =
				await dashboardApi.dashboardControllerGetDashboardData(
					startDate,
					endDate
				);

			console.log('DASHBOARD-INFO-QUERY-DATA', response.data);

			setDashboardInfo(response.data);

			return response.data;
		},
		enabled: !!authToken,
	});
}
