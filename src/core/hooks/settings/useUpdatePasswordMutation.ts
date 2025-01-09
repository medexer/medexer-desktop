
import {meApi} from '@core/api/sdk';
import {nprogress} from '@mantine/nprogress';
import {useAppContext} from '@/core/context';
import {useMutation} from '@tanstack/react-query';
import {showNotification} from '@mantine/notifications';
import { UpdateAccountPasswordDTO } from '@/core/sdk/account';

export default function useUpdatePasswordMutation() {

	return useMutation({
		mutationFn: async (values: UpdateAccountPasswordDTO) => {
			nprogress.start();

			const response = await meApi.accountControllerUpdateAccountPassword(
				values
			);

			nprogress.reset();

			return response.data;
		},
		onError: () => {
			nprogress.reset();
		},
		onSuccess() {

			showNotification({
				color: 'green',
				title: 'Success',
				message: 'Account password updated successfully',
			});

			nprogress.reset();
		},
	});
}
