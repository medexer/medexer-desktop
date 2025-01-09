import {
	DonationCenterOperationsInfo,
	UpdateDonationCenterOperationsConfigDTO,
} from '@/core/sdk/donation-center';
import {nprogress} from '@mantine/nprogress';
import {useAppContext} from '@/core/context';
import {operationsApi} from '@core/api/sdk';
import {useMutation} from '@tanstack/react-query';
import {showNotification} from '@mantine/notifications';

export default function useUpdateDonationCenterOperationsConfigMutation() {
	const {donationCenterProfile, setOperationsConfig} = useAppContext();

	return useMutation({
		mutationFn: async (values: UpdateDonationCenterOperationsConfigDTO) => {
			nprogress.start();

			const response =
				await operationsApi.operationsControllerUpdateDonationCenterOperationsConfig(
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
				'UPDATE-DONATION-CENTER-OPERATIONS-CONFIG-SUCCESS :: ',
				data
			);

			setOperationsConfig(data);

			showNotification({
				color: 'green',
				title: 'Success',
				message:
					'Donation center operations config updated successfully',
			});

			nprogress.reset();

			return data;
		},
	});
}
