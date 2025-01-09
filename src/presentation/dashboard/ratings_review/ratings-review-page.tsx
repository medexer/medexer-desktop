import React from 'react';
import {Box} from '@mantine/core';
import {Grid} from '@mantine/core';
import PageShell from '@/presentation/shell/page-shell';
import RatingsSection from './sections/ratings-sections';
import RatingsAnalyticsSection from './sections/ratings-analytics-section';
import useGetDonationCenterRatingsQuery from '@/core/hooks/ratings/useGetDonationCenterRatingsQuery';

const RatingsReviewPage = () => {
	const {data} = useGetDonationCenterRatingsQuery();

	return (
		<React.Fragment>
			<PageShell
				title='Ratings Review'
				caption='Review and manage ratings from donors.'
			>
				<Box>
					<Grid>
						<Grid.Col span={{md: 6}}>
							<RatingsAnalyticsSection ratingsInfo={data!} />
						</Grid.Col>
						<Grid.Col span={{md: 6}}>
							<RatingsSection ratingsInfo={data!} />
						</Grid.Col>
					</Grid>
				</Box>
			</PageShell>
		</React.Fragment>
	);
};

export default RatingsReviewPage;
