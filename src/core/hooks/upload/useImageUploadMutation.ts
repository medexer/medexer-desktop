
import { uploadApi } from '@/core/api/sdk';
import { nprogress } from '@mantine/nprogress';
import { useMutation } from '@tanstack/react-query';

export function useImageUploadMutation() {
  return useMutation({
    mutationFn: async (file: File) => {
      try {
        nprogress.start();

        const { data } = await uploadApi.imageUploadControllerUploadImage(
          undefined,
          file
        );
        //  console.log(data);
        nprogress.reset();

        return data.url;
      } catch (error) {
        nprogress.reset();
         console.error('[ERROR-UPLOADING-IMAGE] :: ', error);
      }
    },
  });
}