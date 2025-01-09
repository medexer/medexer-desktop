import {
	UpdateAppointmentStatusDTO,
	DonationCenterAppointmentInfo,
	DonationCenterAppointmentInfoStatusEnum,
} from '@/core/sdk/donation-center';
import {appointmentApi} from '@core/api/sdk';
import {nprogress} from '@mantine/nprogress';
import {useMutation} from '@tanstack/react-query';
import {showNotification} from '@mantine/notifications';
import { useAppContext } from '@/core/context';

export default function useUpdateAppointmentStatusMutation() {
	const {appointments, setAppointments} = useAppContext();

	return useMutation({
		mutationFn: async (values: UpdateAppointmentStatusDTO) => {
			nprogress.start();

			const response =
				await appointmentApi.appointmentControllerUpdateAppointmentStatus(
					values
				);

			nprogress.reset();

			return response.data;
		},
		onError: () => {
			nprogress.reset();
		},
		onSuccess(data: DonationCenterAppointmentInfo) {
			console.log('UPDATE-APPOINTMENT-STATUS-SUCCESS :: ', data);

			if (
				data.status === DonationCenterAppointmentInfoStatusEnum.Accepted
			) {
				showNotification({
					color: 'green',
					title: 'Message',
					message: 'Appointment accepted successfully',
				});
			} else if (
				data.status === DonationCenterAppointmentInfoStatusEnum.Rejected
			) {
				showNotification({
					color: 'red',
					title: 'Message',
					message: 'Appointment rejected',
				});
			} else if (
				data.status ===
				DonationCenterAppointmentInfoStatusEnum.Processing
			) {
				showNotification({
					color: 'yellow',
					title: 'Message',
					message: 'Appointment processing',
				});
			}

			nprogress.reset();

			setAppointments(appointments.map((appointment) => {
				if (appointment.id === data.id) {
					return data;
				}
				
				return appointment;
			}));

			return data;
		},
	});
}
