import {useAppContext} from '@/core/context';
import {Card, Loader, Text, Paper, AspectRatio} from '@mantine/core';
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	ResponsiveContainer,
} from 'recharts';

const AnalyticsChart = () => {
	const {dashboardInfo} = useAppContext();

	const chartData =
		dashboardInfo?.analytics?.map((item) => ({
			date: item.month,
			Orders: item.value,
		})) || [];

	return (
		<Paper withBorder p='sm' h={'100%'}>
			<Text size='16px' fw={500} mb='md'>
				Analytics
			</Text>
			<AspectRatio ratio={1 / 0.5}>
				<ResponsiveContainer width='100%' height={'100%'}>
					<AreaChart data={chartData}>
						<CartesianGrid
							horizontal={true}
							vertical={false}
							stroke='#E5E7EB'
						/>
						<XAxis
							dataKey='date'
							axisLine={false}
							tickLine={false}
							tick={{fontSize: 12}}
						/>
						<YAxis
							axisLine={false}
							ticks={[0, 10, 20, 30, 40, 50, 60, 70]}
							// domain={['auto', 'auto']}
							tickLine={false}
						/>
						<Tooltip />
						<defs>
							<linearGradient
								id='colorGradient'
								x1='0'
								y1='0'
								x2='0'
								y2='1'
							>
								<stop
									offset='0%'
									stopColor='rgba(22, 163, 74, 0.2)'
								/>
								<stop
									offset='100%'
									stopColor='rgba(22, 163, 74, 0)'
								/>
							</linearGradient>
						</defs>
						<Area
							type='monotone'
							dataKey='Appointments'
							stroke='#16A34A'
							strokeWidth={2}
							fill='url(#colorGradient)'
							fillOpacity={1}
						/>
					</AreaChart>
				</ResponsiveContainer>
			</AspectRatio>
		</Paper>
	);
};

export default AnalyticsChart;
