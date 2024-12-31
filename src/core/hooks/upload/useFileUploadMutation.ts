import {uploadApi} from '@/core/api/sdk';
import {nprogress} from '@mantine/nprogress';
import {useMutation} from '@tanstack/react-query';

export function useFileUploadMutation() {
	return useMutation({
		mutationFn: async (file: File) => {
			try {
				nprogress.start();

				const {data} = await uploadApi.imageUploadControllerUploadFile(
					file
				);

				nprogress.reset();

				return data.url;
			} catch (error) {
				nprogress.reset();
        
				console.error('[ERROR-UPLOADING-FILE] :: ', error);
			}
		},
	});
}
