import {
	UploadTestResultsDTO,
	DonationCenterAppointmentInfo,
} from '@/core/sdk/donation-center';
import {appointmentApi} from '@core/api/sdk';
import {nprogress} from '@mantine/nprogress';
import {useAppContext} from '@/core/context';
import {useMutation} from '@tanstack/react-query';
import {showNotification} from '@mantine/notifications';

export default function useUploadAppointmentMedicalReportMutation() {
	const {appointments, setAppointments} = useAppContext();

	return useMutation({
		mutationFn: async ({
			appointmentId,
			values,
		}: {
			appointmentId: number;
			values: UploadTestResultsDTO;
		}) => {
			nprogress.start();

			const response =
				await appointmentApi.appointmentControllerUploadTestResults(
					appointmentId,
					values
				);

			return response.data;
		},
		onError: () => {
			nprogress.reset();
		},
		onSuccess(data: DonationCenterAppointmentInfo) {
			console.log('UPLOAD-APPOINTMENT-MEDICAL-REPORT-SUCCESS :: ', data);

			nprogress.reset();

			showNotification({
				color: 'green',
				title: 'Message',
				message: 'Medical report uploaded successfully',
			});

			setAppointments(
				appointments.map((appointment) => {
					if (appointment.id === data.id) {
						return data;
					}

					return appointment;
				})
			);

			return data;
		},
	});
}
