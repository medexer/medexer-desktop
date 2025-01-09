
import { meApi } from '@/core/api/sdk';
import { useAppContext } from '@/core/context';
import { useQuery } from '@tanstack/react-query';

export default function useGetUserProfileQuery() {
  const {setProfile} = useAppContext();

  return useQuery({
    queryKey: ['get-me'],
    queryFn: async () => {
      const response = await meApi.accountControllerGetDetailedAccountInfo();

      setProfile(response.data);

      return response.data;
    },
  });
}
