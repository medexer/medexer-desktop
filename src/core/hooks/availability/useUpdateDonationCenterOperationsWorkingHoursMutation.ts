import {
	DonationCenterOperationsInfo,
	UpdateDonationCenterWorkingHoursConfigDTO,
} from '@/core/sdk/donation-center';
import {nprogress} from '@mantine/nprogress';
import {useAppContext} from '@/core/context';
import {operationsApi} from '@core/api/sdk';
import {useMutation} from '@tanstack/react-query';
import {showNotification} from '@mantine/notifications';

export default function useUpdateDonationCenterOperationsWorkingHoursMutation() {
	const {donationCenterProfile, setOperationsConfig} = useAppContext();

	return useMutation({
		mutationFn: async (
			values: UpdateDonationCenterWorkingHoursConfigDTO
		) => {
			nprogress.start();

			const response =
				await operationsApi.operationsControllerUpdateDonationCenterWorkingHoursConfig(
					Number(donationCenterProfile?.id!),
					values
				);

			nprogress.reset();

			return response.data;
		},
		onError: () => {
			nprogress.reset();
		},
		onSuccess(data: DonationCenterOperationsInfo) {
			console.log(
				'UPDATE-DONATION-CENTER-WORKING-HOURS-CONFIG-SUCCESS :: ',
				data
			);

			setOperationsConfig(data);

			showNotification({
				color: 'green',
				title: 'Success',
				message: 'Donation center working hours updated successfully',
			});

			nprogress.reset();

			return data;
		},
	});
}
