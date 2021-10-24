import { Stack, Typography } from '@mui/material';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import Image from 'next/image';

export function GoogleSignUpButton({ ...props }: LoadingButtonProps) {
	return (
		<LoadingButton {...props} sx={{ color: 'text.secondary' }}>
			<Stack direction="row" alignItems="center" spacing={2}>
				<Image src="/images/google.svg" alt="Google logo" width={24} height={24} />
				<Typography variant="body2">Sign In with Google</Typography>
			</Stack>
		</LoadingButton>
	);
}
