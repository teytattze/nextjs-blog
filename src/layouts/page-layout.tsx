import { Box } from '@mui/system';
import { NextComponentType } from 'next';
import React from 'react';
import { PageTitle } from '../components/page-title';

type PageLayoutProps = {
	title: string;
};

export const PageLayout: NextComponentType<{}, {}, PageLayoutProps> = ({ children, title }) => {
	return (
		<>
			<PageTitle title={title} />
			<Box sx={{ mt: 4 }}>{children}</Box>
		</>
	);
};
