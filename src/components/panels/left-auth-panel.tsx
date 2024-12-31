import {Box, Container, Text, Title} from '@mantine/core';

const LeftAuthPanel = () => {
	return (
		<Container size='lg' style={{flex: 1, padding: 0}}>
			<Box
				style={{
					height: '100%',
					backgroundImage: 'url(/src/assets/images/image_auth_1.jpg)',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
					padding: '40px',
					color: 'white',
					position: 'relative',
					'&::before': {
						content: '""',
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: 'rgba(0, 0, 0, 0.6)',
					},
				}}
			>
				<Text
					size='lg'
					fw={500}
					mb='xl'
					style={{position: 'relative', zIndex: 1}}
				>
					medexer
				</Text>
				<Title
					order={1}
					size='48px'
					mb='md'
					style={{position: 'relative', zIndex: 1}}
				>
					Unlock access to
					<br />
					blood units with
					<br />
					Medexer.
				</Title>
				<Text
					size='lg'
					maw={400}
					style={{position: 'relative', zIndex: 1}}
				>
					Connecting your business to a wider range of blood donors
					through our platform.
				</Text>
			</Box>
		</Container>
	);
};

export default LeftAuthPanel;
