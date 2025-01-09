import { AppointmentTab } from '@/core/types';
import { ActionIcon, Box, Text } from '@mantine/core';
import { Menu08Icon } from 'hugeicons-react';


export interface MobileMenuProps {
    tabs: AppointmentTab[];
    activeTab: string;
    setActiveTab: (value: string) => void;
    menuOpen: boolean;
    setMenuOpen: (open: boolean) => void;
  }
  

const MobileMenu: React.FC<MobileMenuProps> = ({
  tabs,
  activeTab,
  setActiveTab,
  menuOpen,
  setMenuOpen,
}) => {
  console.log('MobileMenu rendered', { menuOpen, tabs });

  return (
    <Box style={{ position: 'relative' }}>
      <ActionIcon
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
        variant="default"
      >
        <Menu08Icon />
      </ActionIcon>
      {menuOpen && (
        <Box
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            zIndex: 1000000,
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '8px',
            width: '200px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          {tabs.length > 0 ? (
            tabs.map((tab: AppointmentTab) => (
              <Box
                key={tab.value}
                onClick={() => {
                  console.log('Tab clicked', tab.value); // Debugging log
                  setActiveTab(tab.value);
                  setMenuOpen(false);
                }}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  backgroundColor: activeTab === tab.value ? 'black' : 'transparent',
                  color: activeTab === tab.value ? 'white' : 'black',
                  marginBottom: '4px',
                }}
              >
                <Text>{tab.label}</Text>
                <Box
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: activeTab === tab.value ? 'white' : '#F3F4F6',
                    color: activeTab === tab.value ? 'black' : '#6B7280',
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}
                >
                  {tab.count}
                </Box>
              </Box>
            ))
          ) : (
            <Text>No tabs available</Text>
          )}
        </Box>
      )}
    </Box>
  );
};

export default MobileMenu;
