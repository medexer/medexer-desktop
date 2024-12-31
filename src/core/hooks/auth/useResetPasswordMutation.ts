import {passwordApi} from '@core/api/sdk';
import {useNavigate} from 'react-router-dom';
import {useMutation} from '@tanstack/react-query';
import {ResetPasswordDTO} from '@core/sdk/auth/api';
import {showNotification} from '@mantine/notifications';
import { nprogress } from '@mantine/nprogress';

export default function useResetPasswordMutation() {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: async (values: ResetPasswordDTO) => {
            nprogress.start();

			return await passwordApi.authControllerResetPassword(values);
		},
		onError: () => {
			nprogress.reset();
		},
		onSuccess() {
			nprogress.reset();

			showNotification({
				color: 'green',
				title: 'Success',
				message: 'Password reset successful',
			});

			return navigate('/login');
		},
	});
}
