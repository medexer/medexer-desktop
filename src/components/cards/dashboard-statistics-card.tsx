import { Paper, Flex, Stack, Box, Group, Title, Divider, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export default function MainStatsCard({
  label,
  caption,
  color,
  value,
  valueCaption,
}: {
  label: string;
  value: string;
  valueCaption: React.ReactNode;
  caption: string;
  color: string;
}) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <Paper
      shadow="0px"
      p="md"
      withBorder
      radius="md"
      style={{
        minWidth: isMobile ? 260 : 'auto',
        flex: isMobile ? '0 0 auto' : 1,
        // height: isMobile ? '132px' : '144px',
      }}
    >
      <Flex direction="column" justify="space-between" style={{ height: '100%' }}>
        <Stack gap={'xs'}>
          <Box flex={1}>
            <Text size="sm" c="dimmed">
              {label}
            </Text>
          </Box>
          <Box>
            <Group align="flex-end" gap="4px">
              <Title order={1} style={{ fontSize: 32 }} fw={700} c={color ?? 'inherit'}>
                {value}
              </Title>
              <Text size="sm" pb={2}>
                {valueCaption}
              </Text>
            </Group>
            <Box>
              <Divider />
              <Text size="xs" c="dimmed" mt={'xs'}>
                {caption}
              </Text>
            </Box>
          </Box>
        </Stack>
      </Flex>
    </Paper>
  );
}
