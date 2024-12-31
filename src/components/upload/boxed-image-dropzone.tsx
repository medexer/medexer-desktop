import {FileUploadIcon} from 'hugeicons-react';
import {AspectRatio, Stack} from '@mantine/core';
import {showNotification} from '@mantine/notifications';
import {Dropzone, DropzoneProps, IMAGE_MIME_TYPE} from '@mantine/dropzone';
import {useImageUploadMutation} from '@/core/hooks/upload/useImageUploadMutation';

export default function BoxedImageDropzoneBox(
	props: Partial<DropzoneProps> & {
		onUploaded: (url: string) => void;
		url?: string;
		radius?: string;
	}
) {
	const {mutateAsync} = useImageUploadMutation();
	return (
		<Dropzone
			onDrop={async (files) => {
				console.log('accepted files', files);
				if (files[0]) {
					const url = await mutateAsync(files[0] as File);
					props.onUploaded(url ?? '');
				}
			}}
			onReject={(files) => {
				console.log('rejected files', files);
				const fileSizeLimit = 1 * 1024 ** 2;
				const readableLimit = `${(fileSizeLimit / 1024 ** 2).toFixed(
					1
				)}MB`;

				const errorMessage =
					files[0]?.errors[0]?.code === 'file-too-large'
						? `File is larger than ${readableLimit}`
						: files[0]?.errors[0]?.message || 'File not accepted';

				showNotification({
					color: 'red',
					position: 'top-right',
					title: 'File rejected',
					message: errorMessage,
				});
			}}
			maxSize={10 * 1024 ** 2}
			p={'0px'}
			style={{borderRadius: props.radius ?? '1000px', overflow: 'hidden'}}
			accept={[...IMAGE_MIME_TYPE]}
			{...props}
		>
			<AspectRatio
				ratio={1 / 1}
				style={{
					backgroundImage: `url(${props.url})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			>
				<Stack
					h={'100%'}
					w={'100%'}
					justify='center'
					align='center'
					ta={'center'}
					gap='xs'
					style={{pointerEvents: 'none'}}
				>
					{!props.url && (
						<Dropzone.Idle>
							<FileUploadIcon
								size={30}
								style={{color: 'var(--mantine-color-gray-6)'}}
							/>
						</Dropzone.Idle>
					)}
				</Stack>
			</AspectRatio>
		</Dropzone>
	);
}
