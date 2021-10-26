import * as React from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

export type LoadingWrapperProps = {
	loading?: boolean;
	type?: 'skeleton' | 'disable';
	renderSkeleton?: () => React.ReactElement<any, any> | null;
	children: React.ReactNode;
};

export function LoadingWrapper({
	loading = false,
	type = 'disable',
	renderSkeleton,
	children,
}: LoadingWrapperProps) {
	if (type === 'skeleton' && renderSkeleton && loading) {
		return renderSkeleton();
	}

	return (
		<Box
			sx={{
				pointerEvents: loading ? 'none' : 'auto',
				opacity: loading ? 0.74 : 1,
			}}
		>
			{children}
		</Box>
	);
}
