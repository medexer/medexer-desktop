import { AppShell } from '@mantine/core';
import { AppOutlet } from '../root/app-outlet';

export default function AuthShell() {
  return (
    <AppShell header={{ height: 0 }} padding={0} >
      <AppShell.Main
      
        style={{
          display: 'flex',
          justifyContent: 'stretch',
          justifyItems: 'stretch',
          alignItems: 'stretch',
          overflow:"hidden"
        }}
      >
        <AppOutlet />
      </AppShell.Main>
    </AppShell>
  );
}
