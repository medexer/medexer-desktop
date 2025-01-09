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
	AddDispenseBloodInventoryItemDTO,
} from '@/core/sdk/donation-center/api';
import {useAppContext} from '@/core/context';
import useAddDispenseBloodInventoryItemMutation from '@/core/hooks/inventory/useAddDispenseBloodInventoryItemMutation';

interface AddBloodInventoryItemModalProps {
	opened: boolean;
	onClose: () => void;
	bloodInventoryItem: BloodInventoryInfo;
}

export default function AddBloodInventoryItemModal({
	opened,
	onClose,

	bloodInventoryItem,
}: AddBloodInventoryItemModalProps) {
	const {donationCenterProfile} = useAppContext();

	const {mutate: addDispenseBloodInventoryItem, isPending} =
		useAddDispenseBloodInventoryItemMutation();

	const form = useForm<AddDispenseBloodInventoryItemDTO>({
		initialValues: {
			quantity: 0,
			isAddInventory: true,
			inventoryItemId: '',
			donationCenterId: '',
		},
		validate: {
			quantity: (value) =>
				value <= 0 ? 'Units must be greater than 0' : null,
		},
	});

	useEffect(() => {
		form.setFieldValue('inventoryItemId', bloodInventoryItem?.id!);
		form.setFieldValue('donationCenterId', donationCenterProfile?.id!);
	}, [bloodInventoryItem, donationCenterProfile]);

	const submitHandler = (values: AddDispenseBloodInventoryItemDTO) => {
		addDispenseBloodInventoryItem(values, {
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
						Add {bloodInventoryItem?.bloodGroup} Inventory Item
					</Text>
				}
			>
				<Stack pb={10}>
					<form onSubmit={form.onSubmit(submitHandler)}>
						<Group w={'100%'} gap={10}>
							<NumberInput
								size='lg'
								w={'100%'}
								radius={'lg'}
								withAsterisk
								label='Units to Add'
								placeholder='Enter number of units'
								error={form.errors.quantity}
								{...form.getInputProps('quantity')}
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
								color={form.isValid() ? 'medexer' : '#007AFF40'}
							>
								{isPending ? <Loader /> : 'Add Units'}
							</Button>
						</Group>
					</form>
				</Stack>
			</Modal>
		</>
	);
}
