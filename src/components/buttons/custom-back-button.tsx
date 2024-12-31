import {Button} from '@mantine/core';
import {ArrowLeft04Icon} from 'hugeicons-react';

const CustomBackButton = ({onTapHandler}: {onTapHandler: () => void}) => {
	return (
		<Button
			color='black'
			variant='transparent'
			onClick={onTapHandler}
			styles={{
				root: {
					width: 45,
					padding: 0,
					height: 45,
					background: '#11111120',
					borderRadius: 1000,
					'&:hover': {
						background: 'transparent',
					},
				},
			}}
		>
			<ArrowLeft04Icon />
		</Button>
	);
};

export default CustomBackButton;
