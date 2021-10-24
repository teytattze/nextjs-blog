import * as React from 'react';
import { Container } from '@mui/material';
import { useAuth } from '../modules/auth/auth.context';
import { Navbar } from './navbar';

type LayoutProps = {
	children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
	const { loading } = useAuth();

	return (
		<>
			{!loading && (
				<>
					<Navbar />
					<Container maxWidth="xl" sx={{ mt: 15, mb: { xs: 12, md: 5 } }}>
						{children}
					</Container>
				</>
			)}
		</>
	);
}
