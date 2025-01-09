import {
	Text,
	Modal,
	Group,
	Stack,
	Loader,
	Button,
	NumberInput,
} from '@mantine/core';
import {useEffect} from 'react';
import {useForm} from '@mantine/form';
import {
	BloodInventoryInfo,
	UpdateBloodInventoryItemPriceDTO,
} from '@/core/sdk/donation-center/api';
import {useAppContext} from '@/core/context';
import useUpdateBloodInventoryItemPriceMutation from '@/core/hooks/inventory/useUpdateBloodInventoryItemPriceMutation';

interface UpdateBloodInventoryItemPriceModalProps {
	opened: boolean;
	onClose: () => void;
	bloodInventoryItem: BloodInventoryInfo;
}

export default function UpdateBloodInventoryItemPriceModal({
	opened,
	onClose,

	bloodInventoryItem,
}: UpdateBloodInventoryItemPriceModalProps) {
	const {donationCenterProfile} = useAppContext();

	const {mutate: updateBloodInventoryItemPrice, isPending} =
		useUpdateBloodInventoryItemPriceMutation();

	const form = useForm<UpdateBloodInventoryItemPriceDTO>({
		initialValues: {
			price: '',
			inventoryItemId: '',
			donationCenterId: '',
		},
		validate: {
			price: (value) =>
				value <= '1000' ? 'Price must be greater than N1000' : null,
		},
	});

	useEffect(() => {
		form.setFieldValue('inventoryItemId', bloodInventoryItem?.id!);
		form.setFieldValue('donationCenterId', donationCenterProfile?.id!);
	}, [bloodInventoryItem, donationCenterProfile]);

	const submitHandler = (values: UpdateBloodInventoryItemPriceDTO) => {
		console.log('VALUES :: ', values);

		updateBloodInventoryItemPrice(values, {
			onSuccess: () => {
				onClose();
			},
		});
	};

	return (
		<>
			<Modal
				centered
				radius={'lg'}
				opened={opened}
				onClose={onClose}
				title={
					<Text fw={600}>
						Update {bloodInventoryItem?.bloodGroup} Inventory Item
						Price
					</Text>
				}
			>
				<Stack pb={10}>
					<form onSubmit={form.onSubmit(submitHandler)}>
						<Group w={'100%'} gap={10}>
							<NumberInput
								size='lg'
								w={'100%'}
								min={1000}
								radius={'lg'}
								withAsterisk
								label='Price'
								placeholder='Enter price'
								error={form.errors.price}
								onChange={(value) => {
									form.setFieldValue(
										'price',
										value.toString()
									);
								}}
								styles={{
									label: {fontSize: '16px'},
									input: {fontSize: '16px'},
								}}
							/>

							<Button
								h={56}
								mt={20}
								fullWidth
								type='submit'
								variant='filled'
								radius={'lg'}
								loading={isPending}
								color={form.isValid() ? 'orange' : '#ff3c0040'}
							>
								{isPending ? <Loader /> : 'Update Price'}
							</Button>
						</Group>
					</form>
				</Stack>
			</Modal>
		</>
	);
}
