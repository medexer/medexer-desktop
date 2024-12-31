import {authApi} from '@core/api/sdk';
import {useAppContext} from '../../context';
import {nprogress} from '@mantine/nprogress';
import {useMutation} from '@tanstack/react-query';
import {SigninAsDTO, SigninAsDTOAccountTypeEnum} from '@core/sdk/auth/api';

export default function useLoginMutation() {
	const {setAuthToken} = useAppContext();

	return useMutation({
		mutationFn: async (values: SigninAsDTO) => {
			nprogress.start();

			return await authApi.authControllerSigninAs({
				...values,
				accountType: SigninAsDTOAccountTypeEnum.DonationCenter,
			});
		},
		onError: () => {
			nprogress.reset();
		},
		onSuccess(values) {
			nprogress.reset();

			console.log('USER-LOGIN-SUCCESS :: ', values);

			setAuthToken(values.data.token);
		},
	});
}
