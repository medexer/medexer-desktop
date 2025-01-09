import {IconStar, IconStarFilled} from '@tabler/icons-react';
import {DonationCenterRatingsInfo} from '@/core/sdk/donation-center';
import {Paper, Flex, Text, Divider, Stack, Title} from '@mantine/core';

export default function RatingsAnalyticsSection({
	ratingsInfo,
}: {
	ratingsInfo: DonationCenterRatingsInfo;
}) {
	return (
		<Paper bg='white' withBorder radius={'lg'} p={'md'} w={'100%'}>
			<Flex justify={'space-between'} align={'center'}>
				<Text fw={600}>Ratings</Text>
			</Flex>

			<Divider my={25} />

			<Flex justify={'space-between'} align={'center'} gap={'xl'} px={'xl'}>
				<Flex direction={'column'} align={'center'} gap={2}>
					<Title order={1} size={60}>
						{ratingsInfo?.averageRating!}
					</Title>
					<Text> ratings</Text>
				</Flex>

				<Stack>
					<Flex align={'center'} gap={10}>
						<Flex align={'center'} gap={10}>
							{[...Array(5)].map((_, index) => (
								<IconStarFilled
									key={index}
									size={25}
									color='#34c759'
								/>
							))}
						</Flex>
						<Text>({ratingsInfo?.ratingFive!})</Text>
					</Flex>
					<Flex align={'center'} gap={10}>
						<Flex align={'center'} gap={10}>
							{[...Array(4)].map((_, index) => (
								<IconStarFilled
									key={index}
									size={25}
									color='#34c759'
								/>
							))}
							{[...Array(1)].map((_, index) => (
								<IconStar
									key={index}
									size={25}
									color='#34c759'
								/>
							))}
						</Flex>
						<Text>({ratingsInfo?.ratingFour!})</Text>
					</Flex>
					<Flex align={'center'} gap={10}>
						<Flex align={'center'} gap={10}>
							{[...Array(3)].map((_, index) => (
								<IconStarFilled
									key={index}
									size={25}
									color='#34c759'
								/>
							))}
							{[...Array(2)].map((_, index) => (
								<IconStar
									key={index}
									size={25}
									color='#34c759'
								/>
							))}
						</Flex>
						<Text>({ratingsInfo?.ratingThree!})</Text>
					</Flex>

					<Flex align={'center'} gap={10}>
						<Flex align={'center'} gap={10}>
							{[...Array(2)].map((_, index) => (
								<IconStarFilled
									key={index}
									size={25}
									color='#34c759'
								/>
							))}
							{[...Array(3)].map((_, index) => (
								<IconStar
									key={index}
									size={25}
									color='#34c759'
								/>
							))}
						</Flex>
						<Text>({ratingsInfo?.ratingTwo!})</Text>
					</Flex>

					<Flex align={'center'} gap={10}>
						<Flex align={'center'} gap={10}>
							<IconStarFilled size={25} color='#34c759' />
							{[...Array(4)].map((_, index) => (
								<IconStar
									key={index}
									size={25}
									color='#34c759'
								/>
							))}
						</Flex>
						<Text>({ratingsInfo?.ratingOne!})</Text>
					</Flex>
				</Stack>
			</Flex>
		</Paper>
	);
}
