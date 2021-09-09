import React from 'react';
import { Container } from '@mui/material';
import { SxProperty } from './components/sx-property';
import { CustomTheme } from './components/custom-theme';

export const SystemPage: React.FC = () => {
  return (
    <Container sx={{ p: 5, mb: 40 }}>
      <CustomTheme />
      <SxProperty />
    </Container>
  );
};
