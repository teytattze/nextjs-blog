import * as React from 'react';
import { Container } from '@mui/material';
import { Navbar } from '../components/navbar';
import { NextComponentType } from 'next';

export const DefaultLayout: NextComponentType = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container
        component='main'
        maxWidth='md'
        sx={{ mt: 15, mb: { xs: 12, md: 5 } }}
      >
        {children}
      </Container>
    </>
  );
};
