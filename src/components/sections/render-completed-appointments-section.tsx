import { Box, Divider, Stack, Text } from '@mantine/core';
import { AppointmentSection } from '@/core/types';
import { useMediaQuery } from '@mantine/hooks';
import CompletedAppointmentEntry from '../entries/completed-appointment-entry';

export default function RenderCompletedAppointmentsSection({
  appointmentSections,
  activeTab,
}: {
  appointmentSections: AppointmentSection[];
  activeTab: string;
}) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Box>
      {appointmentSections.map((section, index) => (
        <Box key={index}>
          {(activeTab === 'all' || section.statuses.includes(activeTab)) &&
            section.appointments.length > 0 && (
              <>
                <Stack
                  justify="center"
                  style={{
                    backgroundColor: '#F3F4F6',
                    padding: '10px 16px',
                    border: '1px solid #ECECEC',
                    height: isMobile ? '44px' : '56px',
                  }}
                >
                  <Text
                    size="16"
                    c="#7E7E80"
                    fw={400}
                    style={{ marginTop: isMobile ? '6px' : '8px' }}
                  >
                    {section.title}
                  </Text>
                </Stack>
                <Box>
                  {section.appointments.map((appointment, index) => (
                    <Box key={appointment.id}>
                      <CompletedAppointmentEntry appointment={appointment} />
                      {index !== section.appointments.length - 1 && <Divider />}
                    </Box>
                  ))}
                </Box>
              </>
            )}
        </Box>
      ))}
    </Box>
  );
}
