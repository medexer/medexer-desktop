import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Group,
  Text,
  Title,
} from '@mantine/core';
import { ArrowLeft01Icon } from 'hugeicons-react';
import { useNavigate } from 'react-router-dom';

export default function PageShell({
  children,
  right,
  title,
  caption,
  tabs,
  showGoBack = false,
}: {
  children: React.ReactNode;
  title: string;
  caption?: string;
  right?: React.ReactNode;
  tabs?: React.ReactNode;
  showGoBack?: boolean;
}) {
//   const { summary, reloadVendorSummary } = useActiveVendor();

  const navigate = useNavigate();
  return (
    <Box>
      <Box bg="white" px={'md'} py={'md'}>
        <Container fluid size={'xl'} px="0">
          <Grid>
            <Grid.Col span={{ md: 6 }}>
              {showGoBack && (
                <Button
                  mb={'xs'}
                  size="xs"
                  leftSection={<ArrowLeft01Icon />}
                  variant="default"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Go back
                </Button>
              )}
              <Title order={3}>{title}</Title>
              {caption && (
                <Text size="sm" c={'dimmed'}>
                  {caption}
                </Text>
              )}
            </Grid.Col>
            <Grid.Col span={{ md: 6 }}>
              <Group justify="right" visibleFrom="md">
                {right}
              </Group>
              <Group hiddenFrom="md">
                <Box flex={1}>{right}</Box>
              </Group>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>
{/* 
      {summary?.vendorQuickNoticeText && summary?.vendorQuickNoticeText !== '' && (
        <Box bg={'dark'}>
          <Container fluid size={'xl'} py={'lg'}>
            <Group align="flex-start">
              <Box flex={1}>
                <Text size="sm" c={'dimmed'}>
                  Admin notice
                </Text>
                <Text c={'white'}>{summary?.vendorQuickNoticeText}</Text>
              </Box>
              <ActionIcon
                radius={'xl'}
                variant="default"
                onClick={() => {
                  vendorApi
                    .vendorAdminControllerUpdateVendorProfile(summary.id, {
                      vendorQuickNoticeText: '',
                    })
                    .then(() => {
                      reloadVendorSummary();
                    });
                }}
              >
                <CloseIcon />
              </ActionIcon>
            </Group>
          </Container>
        </Box>
      )} */}

      {tabs == undefined ? <Divider /> : tabs}
      <Container fluid size={'xl'} mt={'md'}>
        {children}
      </Container>
    </Box>
  );
}
