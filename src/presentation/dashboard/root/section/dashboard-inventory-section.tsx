import {
    Box,
    Button,
    Card,
    Center,
    Grid,
    Group,
    RingProgress,
    Stack,
    Text,
    Title,
  } from '@mantine/core';
  import { ArrowDown01Icon } from 'hugeicons-react';
  import React from 'react';
  import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@/core/context';
  
  const InventoryCard: React.FC = () => {
    const { dashboardInfo } = useAppContext();
    const navigate = useNavigate();
    const itemsInStock = dashboardInfo?.inventory?.itemsInStock ?? 0;
    const itemsOutOfStock = dashboardInfo?.inventory?.itemsOutOfStock ?? 0;
    const totalItems = dashboardInfo?.inventory?.totalItems ?? 0;
    const itemsInStockPercentage = totalItems > 0 ? (itemsInStock / totalItems) * 100 : 0;
    const itemsOutOfStockPercentage = totalItems > 0 ? (itemsOutOfStock / totalItems) * 100 : 0;
    return (
      <>
        <Card withBorder p="lg" radius="md" h={'100%'} w={'100%'}>
          <Stack h={'100%'}>
            <Group justify="space-between">
              <Text size="xl">Inventory</Text>
              <Button
                bg="#FFFFFF"
                c="#3C3C3D"
                bd="1px solid #ECECEC"
                fw={500}
                style={{ width: '100px' }}
                onClick={() => navigate('/inventory')}
              >
                View all
                <ArrowDown01Icon size={20} style={{ marginLeft: '6px' }} />
              </Button>
            </Group>
  
            <Stack flex={1} justify="center" align="center">
              <Grid justify="center" align="center" gutter={'xl'} w={'100%'}>
                <Grid.Col span={{ md: 5 }}>
                  <Center>
                    <RingProgress
                      sections={[
                        { value: itemsInStockPercentage, color: 'cyan' },
                        { value: itemsOutOfStockPercentage, color: 'orange' },
                      ]}
                      label={
                        <Stack align="center" justify="center" gap={0}>
                          <Title order={2}>{totalItems}</Title>
                          <Text size="sm" c="dimmed">
                            Items
                          </Text>
                        </Stack>
                      }
                      size={170}
                    />
                  </Center>
                </Grid.Col>
                <Grid.Col span={{ md: 7 }}>
                  <Stack gap="xs">
                    <Group justify="space-between" gap={"xs"}>
                      <Group gap={"xs"}>
                        <Box
                          w={8}
                          h={24}
                          bg="green"
                          style={{
                            backgroundColor: 'green',
                            border: '1px solid green',
                            borderRadius: '19px',
                          }}
                        />
                        <Text>In stock</Text>
                      </Group>
                      <Group>
                        <Text>{`${itemsInStock} — ${itemsInStockPercentage.toFixed(0)}%`}</Text>
                      </Group>
                    </Group>
                    <Group justify="space-between" gap={"xs"}>
                      <Group gap={"xs"}>
                        <Box
                          w={8}
                          h={24}
                          bg="red"
                          style={{
                            backgroundColor: 'red',
                            border: '1px solid red',
                            borderRadius: '19px',
                          }}
                        />
                        <Text>Out of stock</Text>
                      </Group>
  
                      <Group>
                        <Text>{`${itemsOutOfStock} — ${itemsOutOfStockPercentage.toFixed(0)}%`}</Text>
                      </Group>
                    </Group>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Stack>
          </Stack>
        </Card>
      </>
    );
  };
  
  export default InventoryCard;
  