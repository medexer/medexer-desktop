import {
	DonationCenterInfo,
	UpdateDonationCenterProfileDTO,
} from '@/core/sdk/donation-center';
import {profileApi} from '@core/api/sdk';
import {nprogress} from '@mantine/nprogress';
import {useAppContext} from '@/core/context';
import {useMutation} from '@tanstack/react-query';
import {showNotification} from '@mantine/notifications';

export default function useUpdateBusinessProfileMutation() {
	const {setDonationCenterProfile} = useAppContext();

	return useMutation({
		mutationFn: async (values: UpdateDonationCenterProfileDTO) => {
			nprogress.start();

			const response =
				await profileApi.profileControllerUpdateDonationCenterProfile(
					values
				);

			nprogress.reset();

			return response.data;
		},
		onError: () => {
			nprogress.reset();
		},
		onSuccess(data: DonationCenterInfo) {
			console.log('UPDATE-BUSINESS-PROFILE-SUCCESS :: ', data);

			setDonationCenterProfile(data);

			showNotification({
				color: 'green',
				title: 'Success',
				message: 'Business profile updated successfully',
			});

			nprogress.reset();

			return data;
		},
	});
}
