import {
	Avatar,
	Box,
	Button,
	CheckIcon,
	Divider,
	Drawer,
	Flex,
	Grid,
	Group,
	Pill,
	Stack,
	Stepper,
	Text,
} from '@mantine/core';
import {
	dateFormatter,
	dateFormatterWithToday,
	generateAppointmentSteps,
} from '@/core/middlewares';
import {DonationCenterAppointmentInfo} from '@/core/sdk/donation-center';
import {useDisclosure} from '@mantine/hooks';
import {Cancel01Icon, MoreVerticalIcon} from 'hugeicons-react';

export default function CompletedAppointmentEntry({
	appointment,
}: {
	appointment: DonationCenterAppointmentInfo;
}) {
	const isPending = appointment.status === 'pending';
	const [opened, {open, close}] = useDisclosure(false);

	const trackingNumberFontWeight = isPending ? 500 : 400;
	const trackingNumberColor = isPending ? 'red' : '#3C3C3D';

	const appointmentSteps = generateAppointmentSteps(appointment);

	return (
		<Box mx={5} style={{}}>
			<Stack pt={10} p='xs' mb={10} gap='xs' hiddenFrom='sm'>
				<Group justify='space-between'>
					<Text
						size='16'
						c={trackingNumberColor}
						fw={trackingNumberFontWeight}
					>
						{/* #{order.trackingNumber} */}
					</Text>
					<MoreVerticalIcon
						onClick={() => {
							open();
						}}
					/>
				</Group>
				<Box>
					<Text fw={500} c='#111113'>
						{appointment.donorName}
					</Text>
				</Box>
				{/* {orderItemsTexts} */}
				<Divider my={3} variant='dashed' />

				<Group justify='space-between'>
					<Box>
						{/* <Text size="sm">{time}</Text> */}
						<Text size='sm' c='dimmed'>
							{/* {date} */}
						</Text>
					</Box>
					<Text fw={500} c='#3C3C3D'>
						{/* {formatToNGN(order.totalPrice)} */}
					</Text>
				</Group>
			</Stack>

			<Grid p={'md'} visibleFrom='sm'>
				<Grid.Col span={4}>
					<Group>
						<Box flex={1}>
							<Text
								fw={trackingNumberFontWeight}
								c={trackingNumberColor}
								size='16'
							>
								#{appointment.appointmentId}
							</Text>
						</Box>
						<Box flex={1}>
							<Text fw={500} c='#111113'>
								{appointment.donorName}
							</Text>
						</Box>
					</Group>
				</Grid.Col>
				<Grid.Col span={6}>
					<Group>
						<Box flex={1}>
							<Pill size='lg' tt={'capitalize'}>
								Appointment
							</Pill>
						</Box>
						<Text fw={500} c='#3C3C3D' flex={1}>
							{appointment.time} -{' '}
							{dateFormatter(appointment.date)}
						</Text>
					</Group>
				</Grid.Col>
				<Grid.Col span={2}>
					<Group justify='flex-end'>
						<Button
							onClick={() => {
								open();
							}}
							variant='default'
							size='sm'
						>
							View details
						</Button>
					</Group>
				</Grid.Col>
			</Grid>

			{opened && (
				// <TrackingModal opened={opened} close={close} trackingNumber={appointment.trackingNumber ?? ''} /<>

				<Drawer
					onClose={close}
					opened={true}
					closeOnClickOutside
					closeOnEscape
					withCloseButton={false}
					styles={{
						root: {padding: 0},
						content: {padding: 0},
						body: {padding: 0, height: '100%'},
					}}
				>
					<Flex
						h={'100%'}
						direction={'column'}
						justify={'space-between'}
					>
						<Stack flex={1} h={'100%'} gap={0}>
							<Group
								justify='space-between'
								px={'sm'}
								pt='sm'
								pb='sm'
								align='center'
								pos='sticky'
								top={0}
								bg='white'
								style={{
									zIndex: 100,
									// borderBottom: '1px solid #eee'
								}}
							>
								<Text>
									#Appointment ID -{' '}
									<Text span fw={700}>
										{appointment.appointmentId}
									</Text>
								</Text>
								<Avatar
									color='dark'
									variant='filled'
									bg={'#FAFAFA'}
									radius={'xl'}
									size={30}
									style={{cursor: 'pointer'}}
									onClick={close}
								>
									<Cancel01Icon size={14} />
								</Avatar>
							</Group>
							<Stack
								flex={1}
								px={'sm'}
								mt={20}
								gap={'lg'}
								style={{overflow: 'hidden'}}
							>
								<Flex
									justify={'space-between'}
									align={'center'}
								>
									<Text fw={700}>1 pint</Text>
									<Pill size='lg' tt={'capitalize'}>
										Donation
									</Pill>
								</Flex>

								<Flex
									justify={'space-between'}
									align={'center'}
								>
									<Text>{appointment.time}</Text>
									<Text>
										{dateFormatterWithToday(
											appointment.date
										)}
									</Text>
								</Flex>

								<Text tt={'uppercase'} c={'#11111140'}>
									Appointment Details
								</Text>
								<Flex gap={20} w={'100%'}>
									<Avatar
										size={'lg'}
										color='blue'
										variant='filled'
										src={appointment.donorProfilePhoto}
										style={{border: '1px solid #11111140'}}
									>
										{appointment.donorName?.charAt(0)}
									</Avatar>

									<Stack gap={20} w={'100%'}>
										<Text>{appointment.donorName}</Text>

										<Stack gap={2}>
											<Text c={'#11111140'}>
												Contact information
											</Text>
											<Flex justify='space-between'>
												<Text>Phone </Text>
												<Text>
													{appointment.donorPhone.slice(
														0,
														6
													)}
													<span
														style={{
															filter: 'blur(4px)',
														}}
														onMouseLeave={(e) =>
															(e.currentTarget.style.filter =
																'blur(4px)')
														}
													>
														{appointment.donorPhone.slice(
															6
														)}
													</span>
												</Text>
											</Flex>
											<Flex justify='space-between'>
												<Text>Email </Text>
												<Text>
													{appointment.donorEmail}
												</Text>
											</Flex>
										</Stack>
									</Stack>
								</Flex>

								<Stack gap={10}>
									<Text c={'#11111140'}>Options</Text>
									<Flex justify='space-between'>
										<Text>H1V1 test</Text>
										<Pill variant='contrast' color={'red'}>
											Required
										</Pill>
									</Flex>
									<Flex justify='space-between'>
										<Text>H1V2 test</Text>
										<Pill variant='contrast' color={'red'}>
											Required
										</Pill>
									</Flex>
									<Flex justify='space-between'>
										<Text>Hepatitis B</Text>
										<Pill variant='contrast' color={'red'}>
											Required
										</Pill>
									</Flex>
									<Flex justify='space-between'>
										<Text>Hepatitis C</Text>
										<Pill variant='contrast' color={'red'}>
											Required
										</Pill>
									</Flex>
									<Flex justify='space-between'>
										<Text>Syphillis</Text>
										<Pill variant='contrast' color={'red'}>
											Required
										</Pill>
									</Flex>
									<Flex justify='space-between'>
										<Text>Genotype</Text>
										<Pill variant='contrast' color={'red'}>
											Required
										</Pill>
									</Flex>
									<Flex justify='space-between'>
										<Text>Blood group</Text>
										<Pill variant='contrast' color={'red'}>
											Required
										</Pill>
									</Flex>
								</Stack>
							</Stack>
						</Stack>

						<Stack gap={2} px={'sm'} mt={50} w={'100%'}>
							<Divider />
							<Text tt={'uppercase'} c={'#11111140'}>
								Timeline
							</Text>

							<Stepper
								size='xs'
								color='gray'
								w={'100%'}
								active={
									appointmentSteps.filter((step) => step.date)
										.length
								}
								orientation='vertical'
								allowNextStepsSelect={false}
							>
								{appointmentSteps.map((step, index) => {
									return (
										<Stepper.Step
											w={'100%'}
											key={index}
											color={step.date ? 'green' : ''}
											icon={
												step.date ? (
													<CheckIcon size={14} />
												) : (
													' '
												)
											}
											completedIcon={
												step.date ? (
													<CheckIcon size={14} />
												) : (
													' '
												)
											}
											styles={{
												stepBody: {
													width: '100%',
												},
												stepLabel: {
													width: '100%',
												},
												stepIcon: {
													color: 'green',
												},
											}}
											label={
												<Flex
													w={'100%'}
													align='center'
													justify='space-between'
												>
													<Text>{step.label}</Text>
													<Text size='sm' fw={600}>
														{step.time
															? step.time
															: ''}{' '}
														-{' '}
														{step.date
															? step.date
															: ''}
													</Text>
												</Flex>
											}
										/>
									);
								})}
							</Stepper>
						</Stack>
					</Flex>
				</Drawer>
			)}
		</Box>
	);
}
