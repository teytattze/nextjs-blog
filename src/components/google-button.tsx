import { Box, Stack, Typography } from '@mui/material';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import Image from 'next/image';

type GoogleButtonProps = LoadingButtonProps & {
	title: string;
};

export const GoogleButton = ({ title, ...props }: GoogleButtonProps) => {
	return (
		<LoadingButton variant="text" {...props} sx={{ color: 'text.secondary' }}>
			<Image src="/images/google.svg" alt="Google logo" width={20} height={20} />
			<Box sx={{ mx: 1 }} />
			{title}
		</LoadingButton>
	);
};
