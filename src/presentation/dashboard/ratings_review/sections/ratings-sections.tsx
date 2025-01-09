import {IconStar, IconStarFilled} from '@tabler/icons-react';
import {DonationCenterRatingsInfo} from '@/core/sdk/donation-center';
import {Paper, Flex, Text, Divider, Stack, Title} from '@mantine/core';
import {dateFormatterWithToday} from '@/core/middlewares';

export default function RatingsSection({
	ratingsInfo,
}: {
	ratingsInfo: DonationCenterRatingsInfo;
}) {
	return (
		<Paper bg='white' withBorder radius={'lg'} p={'md'} w={'100%'}>
			<Flex justify={'space-between'} align={'center'}>
				<Text fw={600}>Donor Ratings</Text>
			</Flex>

			<Divider my={25} />

			<Stack>
				{ratingsInfo?.ratings?.map((rating) => (
					<Stack key={rating.id} gap={5}>
						<Flex align={'center'} gap={5}>
							{[...Array(parseInt(rating.rating!))].map(
								(_, index) => (
									<IconStarFilled
										key={index}
										size={14}
										color='#34c759'
									/>
								)
							)}
							{[...Array(5 - parseInt(rating.rating!))].map(
								(_, index) => (
									<IconStar
										key={index}
										size={14}
										color='#34c759'
									/>
								)
							)}
						</Flex>
						<Flex gap={15}>
							<Text fw={600} fz={14}>
								{rating.donorName!}
							</Text>
							<Text>-</Text>{' '}
							<Text fz={14}>
								{dateFormatterWithToday(rating.createdAt!)}
							</Text>
						</Flex>
						<Text fz={14}>{rating.comment!}</Text>
						<Divider my={10} variant='dashed' />
					</Stack>
				))}
			</Stack>
		</Paper>
	);
}
