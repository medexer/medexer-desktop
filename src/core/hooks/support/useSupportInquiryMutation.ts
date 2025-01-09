import {supportApi} from '@core/api/sdk';
import {nprogress} from '@mantine/nprogress';
import {useMutation} from '@tanstack/react-query';
import {ContactUsDTO} from '@/core/sdk/account/api';
import {showNotification} from '@mantine/notifications';

export default function useSupportInquiryMutation() {
	return useMutation({
		mutationFn: async (values: ContactUsDTO) => {
			nprogress.start();

			const response = await supportApi.supportControllerContactUs(
				values
			);

			return response.data;
		},
		onError: () => {
			nprogress.reset();
		},
		onSuccess() {
			console.log('SUPPORT-INQUIRY-SUCCESS :: ');

			nprogress.reset();

			showNotification({
				color: 'green',
				title: 'Success',
				message: 'Inquiry sent successfully',
			});
		},
	});
}
