import {passwordApi} from '@core/api/sdk';
import {useNavigate} from 'react-router-dom';
import { nprogress } from '@mantine/nprogress';
import {useMutation} from '@tanstack/react-query';
import {ForgotPasswordDTO} from '@core/sdk/auth/api';
import { showNotification } from '@mantine/notifications';

export default function useForgotPasswordMutation() {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: async (values: ForgotPasswordDTO) => {
			nprogress.start();

			await passwordApi.authControllerForgotPassword(values);


			nprogress.reset();
			return values.email;
		},
		onError: () => {
			nprogress.reset();
		},
		onSuccess(email: string) {
			nprogress.reset();

			showNotification({
				color: 'green',
				title: 'Success',
				message: 'Verification code sent to email',
			});

			// console.log('FORGOT-PASSWORD-SUCCESS :: ', email);

			return navigate('/forgot-password-verification', {
				state: {
					email,
				},
			});
		},
	});
}
