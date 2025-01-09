import { bloodInventoryApi } from '@/core/api/sdk';
import { useAppContext } from '@/core/context';
import { useQuery } from '@tanstack/react-query';

export default function useGetBloodInventory() {
  const { authToken, setBloodInventory } = useAppContext();

  return useQuery({
    queryKey: ['get-ongoing-appointments', authToken],
    queryFn: async () => {
      const response = await bloodInventoryApi.bloodInventoryControllerGetBloodInventory();
      
      setBloodInventory(response.data);

      return response.data;
    },
    enabled: !!authToken
  });
}
