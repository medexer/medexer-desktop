import {Center, Flex} from '@mantine/core';
import {IconFileFilled} from '@tabler/icons-react';

const FileEditBadge = () => {
	return (
		<Flex
			h={30}
			w={30}
			align={'center'}
			justify={'center'}
			style={{
				borderRadius: '5px',
				backgroundColor: 'white',
				border: '1px solid #11111120',
			}}
		>
			<Center>
				<IconFileFilled color='green'/>
			</Center>
		</Flex>
	);
};

export default FileEditBadge;
