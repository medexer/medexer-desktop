import {Center, Flex} from '@mantine/core';
import {ImageUpload01Icon} from 'hugeicons-react';

const FileUploadBadge = () => {
	return (
		<Flex
			h={50}
			w={50}
			align={'center'}
			justify={'center'}
			style={{
				borderRadius: '100px',
				backgroundColor: 'white',
				border: '1px solid #11111160',
			}}
		>
			<Center>
				<ImageUpload01Icon />
			</Center>
		</Flex>
	);
};

export default FileUploadBadge;
