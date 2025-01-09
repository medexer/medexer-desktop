import {
	BloodInventoryInfo,
	AddDispenseBloodInventoryItemDTO,
} from '@/core/sdk/donation-center';
import {nprogress} from '@mantine/nprogress';
import {useAppContext} from '@/core/context';
import {bloodInventoryApi} from '@core/api/sdk';
import {useMutation} from '@tanstack/react-query';
import {showNotification} from '@mantine/notifications';

export default function useAddDispenseBloodInventoryItemMutation() {
	const {bloodInventory, setBloodInventory} = useAppContext();

	return useMutation({
		mutationFn: async (values: AddDispenseBloodInventoryItemDTO) => {
			nprogress.start();

			const response =
				await bloodInventoryApi.bloodInventoryControllerAddBloodInventoryItem(
					values
				);

			nprogress.reset();

			return response.data;
		},
		onError: () => {
			nprogress.reset();
		},
		onSuccess(data: BloodInventoryInfo) {
			console.log('ADD-DISPENSE-BLOOD-INVENTORY-ITEM-SUCCESS :: ', data);

			setBloodInventory(
				bloodInventory.map((item) => {
					if (item.id === data.id) {
						return data;
					}

					return item;
				})
			);

			showNotification({
				color: 'green',
				title: 'Success',
				message: 'Blood inventory updated successfully',
			});

			nprogress.reset();

			return data;
		},
	});
}
