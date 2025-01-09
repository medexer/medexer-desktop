import { useAppContext } from '@/core/context';
import { appointmentsApi } from '@/core/api/sdk';
import { useQuery } from '@tanstack/react-query';

export default function useGetAppointmentsHistoryQuery() {
  const { authToken, setAppointmentsHistory } = useAppContext();

  return useQuery({
    queryKey: ['get-appointments-history', authToken],
    queryFn: async () => {
      const response = await appointmentsApi.appointmentControllerGetCompletedAppointments();
      
      setAppointmentsHistory(response.data);
      
      return response.data;
    },
    enabled: !!authToken
  });
}
