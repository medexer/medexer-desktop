
import { meApi } from '@/core/api/sdk';
import { useQuery } from '@tanstack/react-query';

export default function useGetUserProfileQuery() {
  return useQuery({
    queryKey: ['get-me'],
    queryFn: () => {
      return meApi.accountControllerGetDetailedAccountInfo();
    },
  });
}
