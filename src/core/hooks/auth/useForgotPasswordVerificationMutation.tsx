import {
	ResetPasswordVerificationDTO,
	ResetPasswordOTPVerificationResponsePayload,
} from '@core/sdk/auth/api';
import {passwordApi} from '@core/api/sdk';
import {useNavigate} from 'react-router-dom';
import {nprogress} from '@mantine/nprogress';
import {useMutation} from '@tanstack/react-query';

export default function useForgotPasswordVerificationMutation() {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: async (values: ResetPasswordVerificationDTO) => {
			nprogress.start();

			const response =
				await passwordApi.authControllerResetPasswordOtpVerification(
					values
				);

			return response.data;
		},
		onError: () => {
			nprogress.reset();
		},
		onSuccess(response: ResetPasswordOTPVerificationResponsePayload) {
			nprogress.reset();

			return navigate('/reset-password', {
				state: {
					data: response,
				},
			});
		},
	});
}
