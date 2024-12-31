import {authApi} from '@core/api/sdk';
import {useAppContext} from '../../context';
import { nprogress } from '@mantine/nprogress';
import {useMutation} from '@tanstack/react-query';
import {showNotification} from '@mantine/notifications';
import {CreateDonationCenterAccountDTO} from '@core/sdk/auth/api';

export default function useSignupMutation() {
	const {setAuthToken} = useAppContext();
	return useMutation({
		mutationFn: async (values: CreateDonationCenterAccountDTO) => {
			nprogress.start();

			return await authApi.authControllerSignupDonationCenter(values);
		},
		onError: () => {
			nprogress.reset();
		},
		onSuccess(values) {
			nprogress.reset();

			showNotification({
				color: 'green',
				title: 'Message',
				position: 'top-right',
				message: 'Signup successful',
			});

			setAuthToken(values.data.token);
		},
	});
}
