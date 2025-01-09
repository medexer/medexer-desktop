import {
	BloodInventoryInfo,
	UpdateBloodInventoryItemPriceDTO,
} from '@/core/sdk/donation-center';
import {nprogress} from '@mantine/nprogress';
import {useAppContext} from '@/core/context';
import {bloodInventoryApi} from '@core/api/sdk';
import {useMutation} from '@tanstack/react-query';
import {showNotification} from '@mantine/notifications';

export default function useUpdateBloodInventoryItemPriceMutation() {
	const {bloodInventory, setBloodInventory} = useAppContext();

	return useMutation({
		mutationFn: async (values: UpdateBloodInventoryItemPriceDTO) => {
			nprogress.start();

			const response =
				await bloodInventoryApi.bloodInventoryControllerUpdateBloodInventoryItemPrice(
					values
				);

			nprogress.reset();

			return response.data;
		},
		onError: () => {
			nprogress.reset();
		},
		onSuccess(data: BloodInventoryInfo) {
			console.log('UPDATE-BLOOD-INVENTORY-ITEM-PRICE-SUCCESS :: ', data);

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
				message: 'Blood inventory price updated successfully',
			});

			nprogress.reset();

			return data;
		},
	});
}
