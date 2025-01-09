import { appointmentsApi } from '@/core/api/sdk';
import { useAppContext } from '@/core/context';
import { useQuery } from '@tanstack/react-query';

export default function useGetOngoingAppointmentsQuery() {
  const { authToken, setAppointments } = useAppContext();

  return useQuery({
    queryKey: ['get-ongoing-appointments', authToken],
    queryFn: async () => {
      const response = await appointmentsApi.appointmentControllerGetPendingAppointments();
      
      setAppointments(response.data);
      return response.data;
    },
    enabled: !!authToken
  });
}
