import {FileUploadIcon} from 'hugeicons-react';
import {showNotification} from '@mantine/notifications';
import {AspectRatio, Button, Group, Stack, Text} from '@mantine/core';
import {Dropzone, DropzoneProps, IMAGE_MIME_TYPE} from '@mantine/dropzone';
import {useImageUploadMutation} from '@/core/hooks/upload/useImageUploadMutation';

export default function ImageDropzoneBox(
	props: Partial<DropzoneProps> & {
		onUploaded: (url: string) => void;
		url?: string;
	}
) {
	const {mutateAsync} = useImageUploadMutation();

	const handleDrop = async (files: File[]) => {
		if (files[0]) {
			try {
				const url = await mutateAsync(files[0]);
				props.onUploaded(url ?? '');

				showNotification({
					title: 'Image uploaded',
					message: 'Your image has been successfully uploaded.',
					color: 'green',
				});
			} catch (error) {
				showNotification({
					title: 'Upload failed',
					message: 'There was an error uploading the image.',
					color: 'red',
				});
			}
		}
	};

	return (
		<Dropzone
			onDrop={(files) => handleDrop(files as File[])}
			onReject={(files) => {
				console.log('rejected files', files);

				showNotification({
					title: 'File rejected',
					message: files[0].errors[0]?.message || 'File not accepted',
					color: 'red',
				});
			}}
			maxSize={10 * 1024 ** 2}
			radius='lg'
			maxFiles={1}
			style={{overflow: 'hidden'}}
			p='0px'
			accept={[...IMAGE_MIME_TYPE]}
			{...props}
		>
			<AspectRatio
				ratio={1 / 0.3}
				style={{
					backgroundImage: `url(${props.url})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			>
				<Stack
					h='100%'
					w='100%'
					justify='center'
					align='center'
					ta='center'
					gap='xs'
					style={{pointerEvents: 'none'}}
				>
					{props.url ? (
						<Button
							style={{
								position: 'absolute',
								top: '50%',
								left: '50%',
								transform: 'translate(-40%, -40%)',
								fontSize: '14px',
								padding: '12px 16px',
								border: '1px solid #ECECEC',
								borderRadius: 8,
								color: '#ffff',
								backgroundColor: 'rgba(258, 258, 255, 0.1)',
								width: '132px',
								height: '40px',
							}}
						>
							Change Photo
						</Button>
					) : (
						<>
							<Dropzone.Idle>
								<FileUploadIcon
									size={30}
									style={{
										color: 'var(--mantine-color-gray-6)',
									}}
								/>
							</Dropzone.Idle>
							<Group gap='xs'>
								<Text c='red' size='sm'>
									Click to upload
								</Text>
								<Text c='dimmed'>or drag and drop.</Text>
							</Group>
						</>
					)}
				</Stack>
			</AspectRatio>
		</Dropzone>
	);
}
