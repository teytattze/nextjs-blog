import * as React from 'react';
import { Container } from '@mui/material';
import { useAuth } from '../modules/auth/auth.context';
import { Navbar } from '../components/navbar';
import { NextComponentType } from 'next';

export const DefaultLayout: NextComponentType = ({ children }) => {
	return (
		<>
			<Navbar />
			<Container component="main" maxWidth="xl" sx={{ mt: 15, mb: { xs: 12, md: 5 } }}>
				{children}
			</Container>
		</>
	);
};
