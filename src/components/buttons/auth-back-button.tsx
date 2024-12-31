import {Button} from '@mantine/core';
import {useNavigate} from 'react-router-dom';
import {ArrowLeft04Icon} from 'hugeicons-react';

const AuthBackButton = () => {
	const navigate = useNavigate();

	return (
		<Button
			color='black'
			variant='transparent'
			onClick={() => navigate('/login')}
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

export default AuthBackButton;
