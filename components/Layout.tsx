import { AppShell } from '@mantine/core';
import React, { PropsWithChildren } from 'react';
import { Navbar } from './Navbar';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <AppShell navbar={<Navbar />}>
      {children}
    </AppShell>
  );
};

export default Layout;