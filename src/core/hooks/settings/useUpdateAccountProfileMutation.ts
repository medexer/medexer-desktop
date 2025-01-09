import {
	AccountInfo,
	UpdateDonationCenterAccountProfileDTO,
} from '@/core/sdk/donation-center';
import {profileApi} from '@core/api/sdk';
import {nprogress} from '@mantine/nprogress';
import {useAppContext} from '@/core/context';
import {useMutation} from '@tanstack/react-query';
import {showNotification} from '@mantine/notifications';

export default function useUpdateAccountProfileMutation() {
	const {setProfile} = useAppContext();

	return useMutation({
		mutationFn: async (values: UpdateDonationCenterAccountProfileDTO) => {
			nprogress.start();

			const response =
				await profileApi.profileControllerUpdateDonationCenterAccountProfile(
					values
				);

			nprogress.reset();

			return response.data;
		},
		onError: () => {
			nprogress.reset();
		},
		onSuccess(data: AccountInfo) {
			console.log('UPDATE-ACCOUNT-PROFILE-SUCCESS :: ', data);

			setProfile(data);

			showNotification({
				color: 'green',
				title: 'Success',
				message: 'Account profile updated successfully',
			});

			nprogress.reset();

			return data;
		},
	});
}
