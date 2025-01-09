import {
	DollarCircleIcon,
	BloodIcon,
	BloodBagIcon,
	BloodPressureIcon,
	PackageAddIcon,
	PackageRemoveIcon,
} from 'hugeicons-react';
import React, {useState} from 'react';
import {useAppContext} from '@/core/context';
import PageShell from '@/presentation/shell/page-shell';
import {rem, Flex, Menu, Badge, Paper, Table, Button} from '@mantine/core';
import useGetBloodInventoryQuery from '@/core/hooks/inventory/useGetBloodInventoryQuery';
import {useDisclosure} from '@mantine/hooks';
import AddBloodInventoryItemModal from '@/components/modals/inventory/add-blood-inventory-item-modal';
import {BloodInventoryInfo} from '@/core/sdk/donation-center';
import DispenseBloodInventoryItemModal from '@/components/modals/inventory/dispense-blood-inventory-item-modal';
import UpdateBloodInventoryItemPriceModal from '@/components/modals/inventory/update-blood-inventory-item-price-modal';

const InventoryPage = () => {
	useGetBloodInventoryQuery();

	const {bloodInventory} = useAppContext();

	const [selectedItem, setSelectedItem] = useState<BloodInventoryInfo | null>(
		null
	);

	const [
		openedAddBloodInventoryItemModal,
		{
			open: openAddBloodInventoryItemModal,
			close: closeAddBloodInventoryItemModal,
		},
	] = useDisclosure(false);
	const [
		openedDispenseBloodInventoryItemModal,
		{
			open: openDispenseBloodInventoryItemModal,
			close: closeDispenseBloodInventoryItemModal,
		},
	] = useDisclosure(false);
	
	const [
		openedUpdateBloodInventoryItemPriceModal,
		{
			open: openUpdateBloodInventoryItemPriceModal,
			close: closeUpdateBloodInventoryItemPriceModal,
		},
	] = useDisclosure(false);

	return (
		<React.Fragment>
			<PageShell
				title='Inventory'
				caption='Manage and track all blood inventory in one place.'
			>
				<Paper p={'md'}>
					<Table
						stickyHeader
						stickyHeaderOffset={60}
						verticalSpacing={20}
					>
						<Table.Thead>
							<Table.Tr>
								<Table.Th>Name</Table.Th>
								<Table.Th>Description</Table.Th>
								<Table.Th>Status</Table.Th>
								<Table.Th>Quantity</Table.Th>
								<Table.Th>Price</Table.Th>
								<Table.Th></Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							{bloodInventory.map((item) => (
								<Table.Tr key={item.id}>
									<Table.Td fw={600}>
										<Flex align='center' gap={5}>
											<BloodBagIcon /> {item.bloodGroup}
										</Flex>{' '}
									</Table.Td>
									<Table.Td>{item.description}</Table.Td>
									<Table.Td>
										{' '}
										<Badge
											px={10}
											py={15}
											variant='light'
											color={
												parseInt(item.units) > 0
													? 'green'
													: 'red'
											}
										>
											{parseInt(item.units) > 0
												? 'In Stock'
												: 'Out of Stock'}
										</Badge>
									</Table.Td>
									<Table.Td>{item.units}</Table.Td>
									<Table.Td>{item.price}</Table.Td>
									<Table.Td w={100}>
										<Menu shadow='md' width={200}>
											<Menu.Target>
												<Button
													type='button'
													color='white'
													w='fit-content'
													variant='filled'
													styles={{
														root: {
															color: 'black',
															backgroundColor:
																'white',
															border: '1px solid #11111120',
															'&:hover': {
																backgroundColor:
																	'white',
															},
														},
													}}
												>
													Actions...
												</Button>
											</Menu.Target>

											<Menu.Dropdown>
												<Menu.Label>Actions</Menu.Label>
												<Menu.Item
													leftSection={
														<PackageAddIcon
															style={{
																width: rem(14),
																height: rem(14),
															}}
														/>
													}
													onClick={() => {
														setSelectedItem(item);

														openAddBloodInventoryItemModal();
													}}
												>
													Add Item
												</Menu.Item>
												<Menu.Item
													leftSection={
														<PackageRemoveIcon
															style={{
																width: rem(14),
																height: rem(14),
															}}
														/>
													}
													onClick={() => {
														setSelectedItem(item);

														openDispenseBloodInventoryItemModal();
													}}
												>
													Dispense Item
												</Menu.Item>
												<Menu.Item
													leftSection={
														<DollarCircleIcon
															style={{
																width: rem(14),
																height: rem(14),
															}}
														/>
													}
													onClick={() => {
														setSelectedItem(item);

														openUpdateBloodInventoryItemPriceModal();
													}}
												>
													Update Price
												</Menu.Item>
											</Menu.Dropdown>
										</Menu>
									</Table.Td>
								</Table.Tr>
							))}
						</Table.Tbody>
					</Table>
				</Paper>
			</PageShell>

			<AddBloodInventoryItemModal
				bloodInventoryItem={selectedItem!}
				onClose={() => {
					setSelectedItem(null);
					closeAddBloodInventoryItemModal();
				}}
				opened={openedAddBloodInventoryItemModal}
			/>

			<DispenseBloodInventoryItemModal
				bloodInventoryItem={selectedItem!}
				onClose={() => {
					setSelectedItem(null);
					closeDispenseBloodInventoryItemModal();
				}}
				opened={openedDispenseBloodInventoryItemModal}
			/>

			<UpdateBloodInventoryItemPriceModal
				bloodInventoryItem={selectedItem!}
				onClose={() => {
					setSelectedItem(null);
					closeUpdateBloodInventoryItemPriceModal();
				}}
				opened={openedUpdateBloodInventoryItemPriceModal}
			/>
		</React.Fragment>
	);
};

export default InventoryPage;
